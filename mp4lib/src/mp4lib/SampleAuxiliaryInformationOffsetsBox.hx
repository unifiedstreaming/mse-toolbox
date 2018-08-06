package mp4lib;
import haxe.io.UInt8Array;

class SampleAuxiliaryInformationOffsetsBox extends FullBox {
  public var aux_info_type:haxe.Int32;
  public var aux_info_type_parameter:haxe.Int32;
  public var entry_count:haxe.Int32;
  public var offset:Dynamic; //haxe.Int32 | haxe.Int64
  public function new(?size:Int = null) {
    super('saio', size);
  }
  
  override public function computeLength() {
    super.computeLength();
    if (this.flags & 1 > 0) {
      this.size += Fields.FIELD_UINT32.getLength() * 2;
    }
    this.size += Fields.FIELD_UINT32.getLength(); /*entry_count size */
    if (this.version == 0) {
      this.size += Fields.FIELD_UINT32.getLength() * this.entry_count;
    } else {
      this.size += Fields.FIELD_UINT64.getLength() * this.entry_count;
    }
  }
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    super.read(data,pos,end);
    if (this.flags & 1 > 0) {
        this.aux_info_type = this._readData(data, Fields.FIELD_UINT32);
        this.aux_info_type_parameter = this._readData(data, Fields.FIELD_UINT32);
    }

    this.entry_count = this._readData(data, Fields.FIELD_UINT32);

    if (this.version == 0) {
        this.offset = this._readArrayFieldData(data, Fields.FIELD_UINT32, this.entry_count);
    } else {
        this.offset = this._readArrayFieldData(data, Fields.FIELD_UINT64, this.entry_count);
    }
    return this.localPos;
  }
  
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);
    if (this.flags & 1 > 0) {
        this._writeData(data, Fields.FIELD_UINT32, this.aux_info_type);
        this._writeData(data, Fields.FIELD_UINT32, this.aux_info_type_parameter);
    }
    this._writeData(data, Fields.FIELD_UINT32, this.entry_count);
    
    for (i in 0...this.entry_count) {
        this._writeData(data, this.version == 0 ? Fields.FIELD_UINT32 : Fields.FIELD_UINT64, this.offset[i]);
    }

    return this.localPos;
  }
}
