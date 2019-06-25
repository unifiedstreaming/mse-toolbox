package uapi;
import js.html.Event;
import js.html.EventTarget;
import js.Browser;
import js.html.RequestCredentials;
import js.html.ReferrerPolicy;
import js.html.RequestMode;
import js.html.Response;
import js.html.EventListener;
import js.html.AddEventListenerOptions;
import js.lib.Promise;
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


    static var cssElements:Map<js.html.Element, Array<js.html.StyleElement>> = new Map();
    public static function addStyleSheet(cssText:String = '', prepend:Bool = false, element:js.html.Element = null) : Void {
        //https://github.com/substack/insert-css/blob/master/index.js
        element = null == element ? Browser.document.querySelector('head') : element;
        
        var style_el = null;
        if(cssElements.exists(element)){
            style_el = cssElements.get(element)[prepend ? 0 : 1];
        }else{
            style_el = createStyleElement();
            if (prepend)
                element.insertBefore(style_el, element.childNodes[0]);
            else
                element.appendChild(style_el);
            cssElements.set(element, prepend ? [style_el, null] : [null, style_el]);
        }

        // strip potential UTF-8 BOM if css was read from a file
        if (cssText.charCodeAt(0) == 0xFEFF) { 
            cssText = cssText.substr(1, cssText.length); 
        }

        if (Reflect.hasField(style_el, 'styleSheet')) {
            var sheet = Reflect.field(style_el, 'styleSheet');
            Reflect.setField(sheet, 'cssText', Reflect.field(sheet, 'cssText') + cssText);
        } else {
            style_el.textContent += cssText;
        }
    }
    static function createStyleElement() {
        var styleElement = Browser.document.createStyleElement();
        styleElement.type = 'text/css';
        return styleElement;
    }
    public static function loadScript(src){
        var pipe:Dynamic->Void = null;
        var retval:DeferredPipe = { pipe: function(func) {
                pipe = func;
            }
        };
        var script = Browser.document.createScriptElement();
        script.type = 'text/javascript';
        script.src = src;
        script.defer = true;
        // Setting async = false is important to make sure the script is imported
        // before the 'load' event fires.
        script.async = false;
        script.addEventListener("load", (e:js.html.Event) -> {
            if(pipe != null) pipe(script);
        });
        Browser.document.head.appendChild(script);
        return retval;
    }
	public static function AddEventListeners(target:EventTarget, fields:Array<String>, func:haxe.Constraints.Function, ?opt:AddEventListenerOptions = null) : Void
		for (field in fields)
			target.addEventListener(field, func, opt);
    
	/**
	* set css styles to element.style, js style attribute names, supports multiple with ","
	* ```
	*	setCSSStyles(el.style, [ "width, height, minWidth, minHeight" => "0px" ]);
	* ```
	**/
	public static function setCSSStyles(style:haxe.extern.EitherType<js.html.CSSStyleDeclaration, Dynamic>, css:Map<String,String>):Dynamic{
		
		for(s in css.keys())
			if(s.indexOf(",") > -1)
				for(sub in s.split(","))
					Reflect.setField(style, StringTools.trim(sub), css[s]);
			else
				Reflect.setField(style, s, css[s]);
		return style;
	}

    public static function isIE():Bool {
        var ua = Browser.navigator.userAgent;
        return 
        ua.indexOf("Trident/") > -1 || // IE 11
        ua.indexOf("Edge/") > -1; // Edge
    }
}