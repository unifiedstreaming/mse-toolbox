package;
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
}