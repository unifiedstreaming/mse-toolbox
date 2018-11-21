package uapi;

import haxe.io.Bytes;

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

	public static function GenerateUUID(?prefix:String = ''):String 
	{
		var t = Date.now().getTime();
		var b:Bytes = Bytes.alloc(16);
		var c:Int = 1;

		b.set(0, Std.int(t * 0xFF));
		while(c < (16)){
			b.set(c, Math.round(Math.random() * 0xFF));
			c += 1;
		}

		var retval = '${b.toHex()}';
		var r:EReg = ~/(.{7})(.{4})(.{4})(.{4})(.*)/gi;

		if(r.match(retval)){
			retval = r.replace(retval, "$1-$2-$3-$4-$5");
		}
		return '${prefix}${retval}';
	}

}
