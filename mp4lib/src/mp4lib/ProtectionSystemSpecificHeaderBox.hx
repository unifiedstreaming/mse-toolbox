package mp4lib;
import haxe.io.UInt8Array;


//https://w3c.github.io/encrypted-media/format-registry/initdata/cenc.html
class ProtectionSystemSpecificHeaderBox extends FullBox  {
  var SystemID:Array<Int>;
  var KID_count:Int;
  var KIDS:Array<Array<Int>> = [];
  var DataSize:haxe.Int32;
  var Data:Array<Int>;
  
  public function new(?size:Int = null) {
    super('pssh', size);
  }
  override public function computeLength() {
    super.computeLength();
    this.size += Fields.FIELD_UINT8.getLength() * 16; //systemid
    if(this.version == 1){
      this.size += Fields.FIELD_UINT32.getLength(); //kid_count
      this.size += Fields.FIELD_UINT8.getLength() * KID_count * 16; //kids array
    }
    this.size += Fields.FIELD_UINT32.getLength(); //datasize
    this.size += Fields.FIELD_UINT8.getLength() * this.DataSize; //data
  }
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    super.read(data,pos,end);
    this.SystemID = this._readArrayFieldData(data, Fields.FIELD_UINT8, 16);
    if(this.version == 1){
      this.KID_count = this._readData(data, Fields.FIELD_UINT32);
      for(i in 0...KID_count){
        this.KIDS[i] = this._readArrayFieldData(data, Fields.FIELD_UINT8, 16);
      }
    }
    this.DataSize = this._readData(data, Fields.FIELD_UINT32);
    this.Data = this._readArrayFieldData(data, Fields.FIELD_UINT8, this.DataSize);
    return this.localPos;
  }
  
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);
    for (i in 0...16) {
      this._writeData(data, Fields.FIELD_UINT8, this.SystemID[i]);
    }
    if(this.version == 1){
      this._writeData(data, Fields.FIELD_UINT32, this.KID_count);
      for (i in 0...this.KID_count) {
        this._writeArrayData(data, Fields.FIELD_UINT8, this.KIDS[i]);
      }
    }
    this._writeData(data, Fields.FIELD_UINT32, this.DataSize);
    for (i in 0...this.DataSize) {
        this._writeData(data, Fields.FIELD_UINT8, this.Data[i]);
    }
    return this.localPos;
  }
}
