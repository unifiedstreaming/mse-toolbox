package mp4lib.fields;
import haxe.io.UInt8Array;
import haxe.Int64;
import haxe.io.BytesInput;

class NumberField implements IField<Int>{
  public var signed:Bool;
  public var bits:Int;
  public var nbytes:Int;
  public function new(bits:Int, signed:Bool) {
    this.bits = bits;
    this.nbytes = Math.floor(this.bits/8);
    this.signed = signed;
    
  }
  
  public function read(buf:UInt8Array, pos:Null<Int>, ?end:Null<Int>) {
    /*
    var bi = new haxe.io.BytesInput(buf.view.buffer);
    bi.position = pos;
    var retval:Int = -1;
    switch(bits){
      case 8:  retval = bi.readInt8();
      case 16: retval = bi.readInt16();
      case 24: retval = bi.readInt24();
      case 32: retval = bi.readInt32();
    }
    return retval;
    */
   return mp4lib.Fields.readBytes(buf, pos, this.nbytes);
  };

  public function write(buf:UInt8Array, pos:Null<Int>, val:Null<Int>) {
    /*
      return bo.writeFullBytes(buf, pos, this.bits / 8);
     */
    return mp4lib.Fields.writeBytes(buf, pos, this.nbytes, val);
  };

  public function getLength(?val:Dynamic = null):Int {
      return Math.floor(this.bits / 8);
  };
  
}
