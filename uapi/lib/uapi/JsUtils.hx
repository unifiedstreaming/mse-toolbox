package uapi;
import js.Browser;
import js.html.RequestCredentials;
import js.html.ReferrerPolicy;
import js.html.RequestMode;
import js.html.Response;
import uapi.Hooks;
class JsUtils {
	public static function HttpRequest(url):DeferredPipe{
        var pipe:String->Void = null;
        var retval:DeferredPipe = { pipe: function(func) {
                pipe = func;
            }
        };
		Browser.window.fetch(url,
        {   "credentials": RequestCredentials.OMIT,
            "headers":{},
            "referrerPolicy": ReferrerPolicy.NO_REFERRER_WHEN_DOWNGRADE,
            "body":null,
            "method":"GET",
            "mode": RequestMode.CORS
        }).then(function(response:Response){
            response.text().then(function(res){
                if(pipe != null)
                    pipe(res);
            });
        });
        return retval;
	}
}