package mp4lib;
import haxe.io.UInt8Array;
class MediaHeaderBox extends FullBox{
  public var creation_time:haxe.Int64;
  public var modification_time:haxe.Int64;
  public var timescale:haxe.Int32;
  public var duration:Dynamic;
  public var pad:Int; //TODO: ??
  public var language:Int;
  public var pre_defined:Int;
  public function new(?size:Int = null) {
    super('mdhd', size);
  }
  
  override public function computeLength() {
      super.computeLength();
      this.size += Fields.FIELD_UINT16.getLength() * 2;
      if (this.version == 1) {
          this.size += Fields.FIELD_UINT64.getLength() * 3 + Fields.FIELD_UINT32.getLength();
      } else {
          this.size += Fields.FIELD_UINT32.getLength() * 4;
      }
  };
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
      super.read(data, pos, end);

      if (this.version == 1) {
          this.creation_time = this._readData(data, Fields.FIELD_UINT64);
          this.modification_time = this._readData(data, Fields.FIELD_UINT64);
          this.timescale = this._readData(data, Fields.FIELD_UINT32);
          this.duration = this._readData(data, Fields.FIELD_UINT64);
      } else {
          this.creation_time = this._readData(data, Fields.FIELD_UINT32);
          this.modification_time = this._readData(data, Fields.FIELD_UINT32);
          this.timescale = this._readData(data, Fields.FIELD_UINT32);
          this.duration = this._readData(data, Fields.FIELD_UINT32);
      }

      this.language = this._readData(data, Fields.FIELD_UINT16);
      this.pre_defined = this._readData(data, Fields.FIELD_UINT16);
      return this.localPos;
  };
  
  override public function write(data:UInt8Array, pos:Int):Int {
      super.write(data, pos);

      if (this.version == 1) {
          this._writeData(data, Fields.FIELD_UINT64, this.creation_time);
          this._writeData(data, Fields.FIELD_UINT64, this.modification_time);
          this._writeData(data, Fields.FIELD_UINT32, this.timescale);
          this._writeData(data, Fields.FIELD_UINT64, this.duration);
      } else {
          this._writeData(data, Fields.FIELD_UINT32, this.creation_time);
          this._writeData(data, Fields.FIELD_UINT32, this.modification_time);
          this._writeData(data, Fields.FIELD_UINT32, this.timescale);
          this._writeData(data, Fields.FIELD_UINT32, this.duration);
      }

      this._writeData(data, Fields.FIELD_UINT16, this.language);
      this._writeData(data, Fields.FIELD_UINT16, this.pre_defined);
      return this.localPos;
  };
}
