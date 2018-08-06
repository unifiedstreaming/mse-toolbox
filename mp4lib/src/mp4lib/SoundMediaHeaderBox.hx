package mp4lib;
import haxe.io.UInt8Array;

class SoundMediaHeaderBox extends FullBox {
  public var balance :Int;
  public var reserved :Int;
  public function new(?size:Int = null) {
    super('smhd', size);
  }
  
  override public function computeLength() {
      super.computeLength();
      this.size += Fields.FIELD_INT16.getLength() + Fields.FIELD_UINT16.getLength();
  };
  
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);

    this._writeData(data, Fields.FIELD_INT16, this.balance);
    this._writeData(data, Fields.FIELD_UINT16, this.reserved);
    return this.localPos;
  }
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    super.read(data,pos,end);
    
    this.balance = this._readData(data, Fields.FIELD_INT16);
    this.reserved = this._readData(data, Fields.FIELD_UINT16);
    return this.localPos;
  }
}
