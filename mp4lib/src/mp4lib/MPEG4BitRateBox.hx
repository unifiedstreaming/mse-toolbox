package mp4lib;
import haxe.io.UInt8Array;
class MPEG4BitRateBox extends Box{
  public var bufferSizeDB:haxe.Int32;
  public var maxBitrate:haxe.Int32;
  public var avgBitrate:haxe.Int32;
  public function new(?size:Int = null) {
    super('btrt', size);
  }
  override public function computeLength() {
    super.computeLength();
    this.size += Fields.FIELD_UINT32.getLength() * 3;
  };
  
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);
    this._writeData(data, Fields.FIELD_UINT32, this.bufferSizeDB);
    this._writeData(data, Fields.FIELD_UINT32, this.maxBitrate);
    this._writeData(data, Fields.FIELD_UINT32, this.avgBitrate);
    return this.localPos;
  }
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    //TODO: Super?
    this.localPos = pos;
    this.localEnd = end;
    this.bufferSizeDB = this._readData(data, Fields.FIELD_UINT32);
    this.maxBitrate = this._readData(data, Fields.FIELD_UINT32);
    this.avgBitrate = this._readData(data, Fields.FIELD_UINT32);
    return this.localPos;
  }
}
