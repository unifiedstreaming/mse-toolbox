package mp4lib;
import haxe.io.UInt8Array;
class OriginalFormatBox extends Box{
  public var data_format:haxe.Int32;
  public function new(?size:Int = null) {
    super('frma', size);
  }
  override public function computeLength() {
    super.computeLength();
    this.size += Fields.FIELD_UINT32.getLength();
  };
  
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);
    this._writeData(data, Fields.FIELD_UINT32, this.data_format);
    return this.localPos;
  }
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    //TODO: Super?
    this.localPos = pos;
    this.localEnd = end;
    this.data_format = this._readData(data, Fields.FIELD_UINT32);
    return this.localPos;
  }
}
