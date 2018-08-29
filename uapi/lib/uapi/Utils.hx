package uapi;

class Utils {
	public static function KeyValueStringParser(location:String = null, QueryString:Bool = true):Map<String, String> {
		
		if(location == null){ 
		#if js
			location = QueryString ? js.Browser.location.search : js.Browser.location.hash;
		#else
			throw "must set location string manually in non js browser target.";
		#end
		}
		while(QueryString == true ? location.charAt(0) == "?" : location.charAt(0) == "#" || location.charAt(0) == "!" )
			location = location.substr(1);
		
		var h:Array<String> = location.split(QueryString ? "&" : "/"), retval = new Map<String, String>(), t;
		for(l in 0...h.length)
			if(h[l].length > 0){
				var split = h[l].indexOf("=");
				t = [];
				if(split != -1){
					t[0] = h[l].substr(0, split);
					t[1] = h[l].substr(split + 1);
				}else{
					t[0] = h[l];
				}
				retval.set(t[0], t.length > 1 ? StringTools.urlDecode(t[1]) : null);
			}
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
