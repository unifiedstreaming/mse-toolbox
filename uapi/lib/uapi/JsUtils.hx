package uapi;
import js.Browser;
import js.html.RequestCredentials;
import js.html.ReferrerPolicy;
import js.html.RequestMode;
import js.html.Response;
import js.Promise;
import uapi.Hooks;
class JsUtils {
	public static function HttpRequest(url:String, binary:Bool = false, method:String = "GET", headers:Dynamic = null, body:Dynamic = null):DeferredPipe{
        var pipe:Dynamic->Void = null;
        var retval:DeferredPipe = { pipe: function(func) {
                pipe = func;
            }
        };
		Browser.window.fetch(url,
        {   "credentials": RequestCredentials.OMIT,
            "headers":headers,
            "referrerPolicy": ReferrerPolicy.NO_REFERRER_WHEN_DOWNGRADE,
            "body":body,
            "method": method,
            "mode": RequestMode.CORS
        }).then(function(response:Response){
            var p:Promise<Dynamic> = binary ? response.arrayBuffer() : response.text();
            p.then(function(res){
                if(pipe != null)
                    pipe(res);
            });
        });
        return retval;
	}

	public static function write(str:String){
		var it, last;
		it = last = js.Browser.document.body.lastElementChild;
		while(it != null)
			if((it = it.lastElementChild) != null)
				last = it;
		return last.parentElement.insertAdjacentHTML("afterbegin", str);
	}
}