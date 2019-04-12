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
                var pipe_ret:Dynamic = pipe != null ? Reflect.callMethod(js.Lib.nativeThis, pipe, [arguments, Reflect.callMethod.bind(js.Lib.nativeThis, method_original)]) : null;
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
            hookMethod(object, m).pipe(function(arguments, method_original){
                return Reflect.callMethod(js.Lib.nativeThis, pipe, [m, arguments, method_original]);
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
		var pipe:{ args:Map<String, String>, values:Array<String>, update:Map<String, String>->Array<String>->Bool->Bool->Bool->Void }->Dynamic = null;
        var _args = new Map<String, String>();
        var _values = new Array<String>();
        var updateHash = function(args:Map<String, String>, ?values:Array<String> = null, ?rewrite:Bool = false, ?toggle = true, ?replacestate:Bool){
            if(args != null){
                if(rewrite){
                    if(args != null)
                        _args = args;
                    if(values != null)
                        _values = values;
                }else{
                    for(k in args.keys())
                        if(toggle && args.get(k) == "") //toggle
                            args.remove(k);
                        else 
                            _args.set(k, args.get(k));
                    if(values != null)
                        for(v in values){
                            var str = Std.string(v);
                            if(_values.indexOf(str) == -1)
                                _values.push(str);
                            else if(toggle)
                                _values.splice(_values.indexOf(str), 1); //toggle
                        }
                }
                for(v in _values)
                    v = StringTools.urlEncode(v);
                
                for(k in _args.keys())
                    _values.push('$k=${StringTools.urlEncode(_args.get(k))}');

                var updated_hash = "!/"+_values.join("/");
                if(replacestate)
                    js.Browser.window.history.replaceState(null, null, "#" + updated_hash)
                else
                    js.Browser.window.location.hash = updated_hash;
            }
        }
        var hashChange = function(?e:js.html.Event = null){
            var hash = js.Browser.window.location.hash;
            var toggle_arguments = [];
            if(pipe != null)
                _args = Utils.KeyValueStringParser(hash, false); 
                for(k in _args.keys()){ 
                    if(_args.get(k) == null){ 
                        _args.remove(k); 
                        toggle_arguments.push(k); 
                    }
                };
                //callback pipe:
                pipe({
                    update: updateHash,
                    args: _args,
                    values: _values = toggle_arguments
                });
		};
        var retval:DeferredPipe = { pipe: function(func) {
                pipe = func;
                if(immediate)
                    hashChange();
                return {
                    args: function(){ return _args; },
                    values: function(){ return _values; },
                    update: updateHash
                }
            }
        };
		//js.Browser.window.addEventListener("popstate");
		js.Browser.window.addEventListener("hashchange", hashChange);

		return retval;
	}
}