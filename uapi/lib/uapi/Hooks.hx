package uapi;
import haxe.Constraints.Function;
typedef DeferredPipe = { 
    ?pipe:Function //loosely defined, we accept both Dynamic and Void as return values.
}; // { ?pipe:(Array<Dynamic>->Dynamic)->Void };

class Hooks {
    public static function hookMethod(object:Dynamic, methodPath:String):DeferredPipe{
        var method_original = null;
        var pipe:Array<Dynamic>->Dynamic = null;
        var retval:DeferredPipe = { pipe: function(func) {
                pipe = func;
            }
        };
        var sub_obj = methodPath.split(".");
        var methodName = sub_obj.pop();
        for(sub in sub_obj)
            object = Reflect.getProperty(object, sub);

        method_original = Reflect.getProperty(object, methodName);
        
        if(null != method_original){
            var method_new = makeVarArgs(function(arguments:Array<Dynamic>){
                var pipe_ret:Dynamic = pipe != null ? Reflect.callMethod(js.Lib.nativeThis, pipe, [arguments]) : null;
                if(pipe_ret != null)
                    return pipe_ret;
                else
                    return Reflect.callMethod(js.Lib.nativeThis, method_original, arguments);
            });
            Reflect.setProperty(object, methodName, method_new);
        }else{
            throw '$methodName() does not exist on $object';
        }
        return retval;
    }

    public static function hookMethods(object:Dynamic, methods:Array<String>):DeferredPipe{
        var pipe:String->Array<Dynamic>->Dynamic = null;
        var retval:DeferredPipe = { pipe: function(func) {
                pipe = func;
            }
        };
        for(m in methods)
            hookMethod(object, m).pipe(function(arguments){
                Reflect.callMethod(js.Lib.nativeThis, pipe, [m, arguments]);
            });

        return retval;
    }
    
    /**
     * replaces Reflect.makeVarArgs as that loses scope reference
     */
    @:overload(function( f : Array<Dynamic> -> Void ) : Dynamic {})
    public static function makeVarArgs( f : Array<Dynamic> -> Dynamic ) : Dynamic {
		return function() {
			var a = untyped Array.prototype.slice.call(__js__("arguments"));
			return Reflect.callMethod(js.Lib.nativeThis, f, [a]);
		};
	}

    public static function HashPipe(immediate:Bool = false):DeferredPipe{
		var pipe:{ args:Map<String, String>, values:Array<String>}->Dynamic = null;
        var _args = new Map<String, String>();
        var _values = new Array<String>();
        var hashChange = function(?e:js.html.Event = null){
            var hash = js.Browser.window.location.hash;
            var simple_arguments = [];
            if(pipe != null)
                pipe({
                    args: _args = Utils.KeyValueStringParser(hash.split("/").filter(function(s){
                        if(s.indexOf("=") > -1)
                            return true;
                        else if(s.indexOf("#") == -1 && s.length > 0)
                            simple_arguments.push(s);
                        return false;
                    })),
                    values: _values = simple_arguments
                });
		};
        var retval:DeferredPipe = { pipe: function(func) {
                pipe = func;
                if(immediate)
                    hashChange();
                return {
                    update:function(args:Map<String, String>, ?values:Array<String> = null, ?append:Bool = true){
                        if(args != null){
                            if(append){
                                for(k in _args.keys())
                                    if(!args.exists(k))
                                        args.set(k, _args.get(k));
                                if(values != null)
                                    for(v in values)
                                        if(_values.indexOf(v) == -1)
                                            _values.push(v);
                            }else{
                                if(values != null)
                                    _values = values;
                            }
                            _args = args;
                            for(k in _args.keys())
                                _values.push('$k=${_args.get(k)}');
                            js.Browser.window.location.hash = "!/"+_values.join("/");
                        }
                    }
                }
            }
        };
		//js.Browser.window.addEventListener("popstate");
		js.Browser.window.addEventListener("hashchange", hashChange);

		return retval;
	}
}