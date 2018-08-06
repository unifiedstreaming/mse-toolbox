package mp4lib.utils;

class Utils {
    //https://github.com/google/shaka-player/blob/master/lib/util/string_utils.js
	public static function fromUtf8(data:haxe.io.UInt8Array):String{
		if (data == null) return '';
		
		// If present, strip off the UTF-8 BOM.
		if (data[0] == 0xef && data[1] == 0xbb && data[2] == 0xbf) {
			data = data.subarray(3);
		}

		// http://stackoverflow.com/a/13691499
		var ret ='';
		for(i in 0...data.length){
			ret += String.fromCharCode(data[i]);
		}
		// This converts each character in the string to an escape sequence.  If the
		// character is in the ASCII range, it is not converted; otherwise it is
		// converted to a URI escape sequence.
		// Example: '\x67\x35\xe3\x82\xac' -> 'g#%E3%82%AC'
 
		var escaped = StringTools.htmlEscape(ret);
		// Decode the escaped sequence.  This will interpret UTF-8 sequences into the
		// correct character.
		// Example: 'g#%E3%82%AC' -> 'g#€' 
		try {
    		escaped = StringTools.urlDecode(escaped);
		} catch (e:Dynamic) {
			throw 'mp4 box parser encountered bad bad string encoding';
		}
		return escaped;
	}

	public static function toUtf8(str:String):haxe.io.UInt8Array {
		// http://stackoverflow.com/a/13691499
		// Converts the given string to a URI encoded string.  If a character falls
		// in the ASCII range, it is not converted; otherwise it will be converted to
		// a series of URI escape sequences according to UTF-8.
		// Example: 'g#€' -> 'g#%E3%82%AC'
		var encoded = StringTools.urlEncode(str);
		// Convert each escape sequence individually into a character.  Each escape
		// sequence is interpreted as a code-point, so if an escape sequence happens
		// to be part of a multi-byte sequence, each byte will be converted to a
		// single character.
		// Example: 'g#%E3%82%AC' -> '\x67\x35\xe3\x82\xac'
		var utf8 = StringTools.htmlUnescape(encoded);
		var result = new haxe.io.UInt8Array(utf8.length);
		for (i in 0...utf8.length) 
			result[i] = utf8.charCodeAt(i);
		
		return result;
	}
}