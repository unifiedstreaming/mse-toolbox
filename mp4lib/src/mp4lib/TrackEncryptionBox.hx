package mp4lib;
import haxe.io.UInt8Array;
class TrackEncryptionBox extends FullBox {
  public var default_IsEncrypted:Int;
  public var default_IV_size:Int;
  public var default_KID:Array<Int>;
  
  public function new(?size:Int = null) {
    super('tenc', size);
  }
  override public function computeLength() {
    super.computeLength();
    this.size += Fields.FIELD_BIT24.getLength();
    this.size += Fields.FIELD_UINT8.getLength();
    this.size += Fields.FIELD_UINT8.getLength() * 16;
  };
  
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);
    this._writeData(data, Fields.FIELD_BIT24, this.default_IsEncrypted);
    this._writeData(data, Fields.FIELD_UINT8, this.default_IV_size);
    this._writeArrayData(data, Fields.FIELD_UINT8, this.default_KID);
    return this.localPos;
  }
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    super.read(data, pos, end);
    this.default_IsEncrypted = this._readData(data, Fields.FIELD_BIT24);
    this.default_IV_size = this._readData(data, Fields.FIELD_UINT8);
    this.default_KID = this._readArrayFieldData(data, Fields.FIELD_UINT8, 16);
    return this.localPos;
  }
}
