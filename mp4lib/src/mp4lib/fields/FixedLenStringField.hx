package mp4lib.fields;
import haxe.io.UInt8Array;
import haxe.Int64;
import haxe.io.BytesInput;

class FixedLenStringField implements IField<String>{
  private var size:Int = 0;
  public function new(size:Int) {
    this.size = size;
    
  }
  
  public function read(buf:UInt8Array, pos:Null<Int>, ?end:Null<Int>) {
      return buf.view.buffer.getString(pos, size);
  };

  public function write(buf:UInt8Array, pos:Null<Int>, val:String) {
    for (i in 0...size) {
        buf[pos + i] = val.charCodeAt(i);
    }
    return size;
  };

  public function getLength(?val:Dynamic = null):Int {
      return size;
  };
  
}
