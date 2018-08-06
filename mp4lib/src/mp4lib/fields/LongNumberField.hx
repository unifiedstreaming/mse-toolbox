package mp4lib.fields;
import haxe.io.UInt8Array;
import haxe.Int64;

class LongNumberField implements IField<Int64>{

  public function new() {}
  
  public function read(buf:UInt8Array, pos:Null<Int>, ?end:Null<Int>) {
    //return buf.view.buffer.getInt64(pos);
    
    var high = Fields.readBytes(buf, pos, 4),
    low = Fields.readBytes(buf, pos + 4, 4);
    return Int64.make(high,low);
  };

  public function write(buf:UInt8Array, pos:Null<Int>, val:Null<Int64>):Int {
    //trace(pos + " " + val.high + " " + val.low + " " + buf.view.sub(pos, 8).buffer.toHex());
    //buf.view.buffer.setInt64(pos, val);
    //trace(pos + " " + buf.view.sub(pos, 8).buffer.toHex() + " " + Int64.toStr(val));
    
    Fields.writeBytes(buf, pos, 4, val.high);
    Fields.writeBytes(buf, pos + 4, 4, val.low);
    
    return 8;
  };

  public function getLength(?val:Dynamic = null):Int {
      return 8;
  };
  
}
