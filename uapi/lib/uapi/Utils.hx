package uapi;

class Utils {
	public static function KeyValueStringParser(location:String = null, QueryString:Bool = true, ?inArray:Array<String> = null):Map<String, String> {
		
		if(location == null){
		#if js
			location = QueryString ? js.Browser.location.search : js.Browser.location.hash;
		#else
			throw "must set location string manually in non js browser target.";
		#end
		}
		
		var h:Array<String> = inArray != null ? inArray : location.split(QueryString ? "&" : "/"), l = h.length, retval = new Map<String, String>(), t;
		while(l-->0){
		var split = h[l].indexOf("=");
		t = [];
		if(split != -1){
			t[0] = h[l].substr(0, split);
			t[1] = h[l].substr(split + 1);
		}else{
			t[0] = h[l];
		}
		if(l == 0){
			while(QueryString == true ? t[0].charAt(0) == "?" : t[0].charAt(0) == "#" || t[0].charAt(0) == "!" ){
			t[0] = t[0].substr(1);
			}
		}
		retval.set(t[0], t.length > 1 ? StringTools.urlDecode(t[1]) : null);
		}
		return retval;
	}
}
