package mp4lib;
import haxe.io.UInt8Array;
class SchemeTypeBox extends FullBox{
  public var scheme_type:Int;
  public var scheme_version:Int;
  public var scheme_uri:String;
  public function new(?size:Int = null) {
    super('schm', size);
  }
  override public function computeLength() {
    super.computeLength();
    this.size += Fields.FIELD_UINT32.getLength() * 2;
    if (this.flags & 0x000001 != 0) {
        this.size += Fields.FIELD_STRING.getLength(this.scheme_uri);
    }
  };
  
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);
    this._writeData(data, Fields.FIELD_UINT32, this.scheme_type);
    this._writeData(data, Fields.FIELD_UINT32, this.scheme_version);
    if (this.flags & 0x000001 != 0) {
        this._writeData(data, Fields.FIELD_STRING, this.scheme_uri);
    }
    return this.localPos;
  }
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    super.read(data, pos, end);
    this.scheme_type = this._readData(data, Fields.FIELD_UINT32);
    this.scheme_version = this._readData(data, Fields.FIELD_UINT32);
    if (this.flags & 0x000001 != 0) {
        this.scheme_uri = this._readData(data, Fields.FIELD_STRING);
    }
    return this.localPos;
  }  
}
