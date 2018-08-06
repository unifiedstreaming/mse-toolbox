package ;

#if js

import js.Browser;
import haxe.Constraints.Function;

class JsUtils {
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
	
	/**
	 * Binds the given function to as event handler to the given fields (if they exist) of the given target.
	 * 
	 * @param	target - The target to look for the fields in.
	 * @param	fields - The fields we want to bind to.
	 * @param	func - The function that should be bound.
	 */
	public static function BindEventHandler(target:Dynamic, fields:Array<String>, func:Dynamic) : Void
	{
		// Go through all the given fields.
		for (field in fields)
		{
			// Use reflect to see whether we have the field.
			var hasField : Bool = untyped __js__("typeof(target[field]) != 'undefined'");
			
			// Set the field.
			if (hasField)
			{
				Reflect.setField(target, field, func);
				return;
			}
		}
	}
	
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


	


    
}

#end