package mp4lib;
import haxe.io.UInt8Array;
class TrackExtendsBox extends FullBox {
  public var track_ID:haxe.Int32;
  public var default_sample_description_index:haxe.Int32;
  public var default_sample_duration:haxe.Int32;
  public var default_sample_size:haxe.Int32;
  public var default_sample_flags:haxe.Int32;
  public function new(?size:Int = null) {
    super('trex', size);
  }
  override public function computeLength() {
    super.computeLength();
    this.size += Fields.FIELD_UINT32.getLength() * 5;
  };
  
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);
    this._writeData(data, Fields.FIELD_UINT32, this.track_ID);
    this._writeData(data, Fields.FIELD_UINT32, this.default_sample_description_index);
    this._writeData(data, Fields.FIELD_UINT32, this.default_sample_duration);
    this._writeData(data, Fields.FIELD_UINT32, this.default_sample_size);
    this._writeData(data, Fields.FIELD_UINT32, this.default_sample_flags);
    return this.localPos;
  }
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    super.read(data, pos, end);
    this.track_ID = this._readData(data, Fields.FIELD_UINT32);
    this.default_sample_description_index = this._readData(data, Fields.FIELD_UINT32);
    this.default_sample_duration = this._readData(data, Fields.FIELD_UINT32);
    this.default_sample_size = this._readData(data, Fields.FIELD_UINT32);
    this.default_sample_flags = this._readData(data, Fields.FIELD_UINT32);
    return this.localPos;
  }
}
