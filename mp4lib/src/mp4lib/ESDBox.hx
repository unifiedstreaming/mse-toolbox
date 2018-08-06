package mp4lib;
import haxe.io.UInt8Array;
class ESDBox extends FullBox{
  public var ES_tag:Null<Int> = null;
  public var ES_length:Null<Int> = null;
  public var ES_data:UInt8Array = null;
  
  public function new(?size:Int=null) {
    super('esds', size);
  }
  override public function computeLength() {
    super.computeLength();
    this.size += Fields.FIELD_UINT8.getLength() * 2 + this.ES_length;
  };
  
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);

    this._writeData(data, Fields.FIELD_UINT8, this.ES_tag);
    this._writeData(data, Fields.FIELD_UINT8, this.ES_length);
    this._writeBuffer(data, this.ES_data, this.ES_length);
    return this.localPos;
  }
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    super.read(data, pos, end);
    this.ES_tag = this._readData(data, Fields.FIELD_UINT8);
    this.ES_length = this._readData(data, Fields.FIELD_UINT8);
    this.ES_data = UInt8Array.fromBytes(data.view.sub(this.localPos, this.localPos + this.ES_length).buffer);
    this.localPos += this.ES_length;
    return this.localPos;
  }
}
