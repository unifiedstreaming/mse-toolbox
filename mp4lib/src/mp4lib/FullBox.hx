package mp4lib;
import haxe.io.UInt8Array;

class FullBox extends Box{
  public var version:Int = 1; // version = 1  in order to have 64bits duration value;
  public var flags:Int = 0; //default value

  public function new(boxType:String = null, size:Int = null, uuid:UInt8Array = null, largesize:Int = null) {
    super(boxType, size, uuid);
  }
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    //no super, not implemented in abstract Box super class
    this.localPos = pos;
    this.localEnd = end;
    this.version = this._readData(data, Fields.FIELD_INT8);
    this.flags = this._readData(data, Fields.FIELD_BIT24);
    return localEnd;
  }
  
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);
    
    this._writeData(data, Fields.FIELD_INT8, this.version);
    this._writeData(data, Fields.FIELD_BIT24, this.flags);
    
    return this.localPos;
  };
  public function getFullBoxAttributesLength():Void {
    this.size += Fields.FIELD_INT8.getLength() + Fields.FIELD_BIT24.getLength(); //version and flags size
  };
  
  override public function computeLength():Void {
    super.computeLength();
    getFullBoxAttributesLength();
  };
}
