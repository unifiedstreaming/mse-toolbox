package mp4lib.fields;
import haxe.io.UInt8Array;
import mp4lib.utils.Utils;

//https://github.com/google/shaka-player/blob/master/lib/util/string_utils.js
//consult ISO/IEC 14496-12:2015(E) for when to use NULL‐terminated C string or UTF-8 strings in box fields
class StringField implements IField<String>{
  private var utf8:Bool = false;
  public function new(?utf8:Bool = false) {
    this.utf8 = utf8;
  }
  
  public function read(buf:UInt8Array, pos:Null<Int>, ?end:Null<Int>) {
    if(utf8){  
        //return new js.html.TextDecoder("utf-8").decode(cast buf.sub(pos,end - pos).get_view());
        return Utils.fromUtf8(buf.sub(pos, end - pos));
    }else{
        var res = "";
        for (i in pos...end) {
            res = res + String.fromCharCode(buf[i]);
            if (buf[i] == 0) {
                return res;
            }
        }
        
        if ((end - pos < 255) && (buf.view.buffer.getString(0,1) == String.fromCharCode(end - pos))) {
            res = res.substr(1, end - pos);
            #if debug
            trace('null-terminated string expected, ' +
                'but found a string "' + res + '", which seems to be ' +
                'length-prefixed instead. Conversion done.');
            #end
            return res;
        }

        throw ('expected null-terminated string, ' +
            'but end of field reached without termination. ' +
            'Read so far:"' + res + '"');
    }
  };

  public function write(buf:UInt8Array, pos:Null<Int>, val:String) {
    if(utf8){
        //var encoded = new js.html.TextEncoder().encode(val);
        var encoded = Utils.toUtf8(val);
        //todo:
        for(i in 0...encoded.length){
            buf[pos+i] = encoded[i];
        }
    }else{
        for (i in 0 ...val.length) {
            buf[pos + i] = val.charCodeAt(i);
        }
        buf[pos + val.length] = 0;
    }
    return val.length;
  };

  public function getLength(?val:Dynamic = null):Int {
      return val != null && Reflect.hasField(val, "length") ? val.length : 0;
  };
  
}
