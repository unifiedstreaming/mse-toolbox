package mp4lib;
import haxe.io.UInt8Array;

class SampleAuxiliaryInformationSizesBox extends FullBox {
  public var aux_info_type:haxe.Int32;
  public var aux_info_type_parameter:haxe.Int32;
  public var default_sample_info_size:Int;
  public var sample_count:haxe.Int32;
  public var sample_info_size:Array<Int>;
    
  public function new(?size:Int = null) {
    super('saiz', size);
  }
  
  override public function computeLength() {
    super.computeLength();
    if (this.flags & 1 > 0) {
        this.size += Fields.FIELD_UINT32.getLength() * 2;
    }

    this.size += Fields.FIELD_UINT8.getLength() + Fields.FIELD_UINT32.getLength();

    if (this.default_sample_info_size == 0) {
        this.size += Fields.FIELD_UINT8.getLength() * this.sample_count;
    }
  }
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    super.read(data,pos,end);
    
    if (this.flags & 1 > 0) {
        this.aux_info_type = this._readData(data, Fields.FIELD_UINT32);
        this.aux_info_type_parameter = this._readData(data, Fields.FIELD_UINT32);
    }
    this.default_sample_info_size = this._readData(data, Fields.FIELD_UINT8);
    this.sample_count = this._readData(data, Fields.FIELD_UINT32);

    if (this.default_sample_info_size == 0) {
        this.sample_info_size = this._readArrayFieldData(data, Fields.FIELD_UINT8, this.sample_count);
    }
    return this.localPos;
  }
  
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);
    if (this.flags & 1 > 0) {
        this._writeData(data, Fields.FIELD_UINT32, this.aux_info_type);
        this._writeData(data, Fields.FIELD_UINT32, this.aux_info_type_parameter);
    }
    this._writeData(data, Fields.FIELD_UINT8, this.default_sample_info_size);
    this._writeData(data, Fields.FIELD_UINT32, this.sample_count);
    if (this.default_sample_info_size == 0) {
        for (i in 0...this.sample_count) {
            this._writeData(data, Fields.FIELD_UINT8, this.sample_info_size[i]);
        }
    }
    return this.localPos;
  }
}
