package mp4lib;
import haxe.io.UInt8Array;
class HintMediaHeaderBox extends FullBox {
  public var maxPDUsize:Int;
  public var avgPDUsize:Int;
  public var maxbitrate:haxe.Int32;
  public var avgbitrate:haxe.Int32;
  public var reserved:haxe.Int32;
  public function new(?size:Int = null) {
    super('hmhd', size);
  }
  override public function computeLength() {
    super.computeLength();
    this.size += Fields.FIELD_UINT16.getLength() * 2; //maxPDUsize and avgPDUsize size
    this.size += Fields.FIELD_UINT32.getLength() * 3; //maxbitrate, avgbitrate and reserved size
  };
  
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);
    this._writeData(data, Fields.FIELD_UINT16, this.maxPDUsize);
    this._writeData(data, Fields.FIELD_UINT16, this.avgPDUsize);
    this._writeData(data, Fields.FIELD_UINT32, this.maxbitrate);
    this._writeData(data, Fields.FIELD_UINT32, this.avgbitrate);
    this._writeData(data, Fields.FIELD_UINT32, this.reserved);
    return this.localPos;
  }
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    super.read(data, pos, end);
    this.maxPDUsize = this._readData(data, Fields.FIELD_UINT16);
    this.avgPDUsize = this._readData(data, Fields.FIELD_UINT16);
    this.maxbitrate = this._readData(data, Fields.FIELD_UINT32);
    this.avgbitrate = this._readData(data, Fields.FIELD_UINT32);
    this.reserved = this._readData(data, Fields.FIELD_UINT32);
    return this.localPos;
  }
}
