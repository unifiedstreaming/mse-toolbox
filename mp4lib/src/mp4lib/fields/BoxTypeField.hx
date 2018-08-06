package mp4lib.fields;
import haxe.io.UInt8Array;

class BoxTypeField implements IField<String>{
  public function new() {}
  
  public function read(buf:UInt8Array, pos:Null<Int>, ?end:Null<Int> = null) {
    var res = "";
    for (i in 0...4) {
        res = res + String.fromCharCode(buf.get(pos + i));
    }
    return res;
  };

  public function write(buf:UInt8Array, pos:Null<Int>, val:String) {
    var i = 0;
     for (i in 0...4) {
       buf.set(pos + i, val.charCodeAt(i));
     }
     return val.length;
  };

  public function getLength(?val:Dynamic = null):Int {
      return 4;
  };
}