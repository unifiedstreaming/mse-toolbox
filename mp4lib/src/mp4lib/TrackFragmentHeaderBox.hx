package mp4lib;
import haxe.io.UInt8Array;
class TrackFragmentHeaderBox extends FullBox{
  public var track_ID:Null<haxe.Int32>;
  public var base_data_offset:Null<haxe.Int64>;
  public var sample_description_index:Null<haxe.Int32>;
  public var default_sample_duration:Null<haxe.Int32>;
  public var default_sample_size:Null<haxe.Int32>;
  public var default_sample_flags:Null<haxe.Int32>;
  
  public function new(?size:Int = null) {
    super('tfhd', size);
  }
  override public function computeLength() {
    super.computeLength();
    this.size += Fields.FIELD_UINT32.getLength();
    //even if, for example base_data_offset is defined, test the flags value
    //to know if base_data_offset size should be added to global size.
    if ((this.flags & 0x000001) != 0 && this.base_data_offset != null) {
        this.size += Fields.FIELD_UINT64.getLength();
    }
    if ((this.flags & 0x000002) != 0 && this.sample_description_index != null) {
        this.size += Fields.FIELD_UINT32.getLength();
    }
    if ((this.flags & 0x000008) != 0 && this.default_sample_duration != null) {
        this.size += Fields.FIELD_UINT32.getLength();
    }
    if ((this.flags & 0x000010) != 0 && this.default_sample_size != null) {
        this.size += Fields.FIELD_UINT32.getLength();
    }
    if ((this.flags & 0x000020) != 0 && this.default_sample_flags != null) {
        this.size += Fields.FIELD_UINT32.getLength();
    }
  };
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);
    
    this._writeData(data, Fields.FIELD_UINT32, this.track_ID);

    if ((this.flags & 0x000001) != 0) {
        this._writeData(data, Fields.FIELD_UINT64, this.base_data_offset);
    }
    if ((this.flags & 0x000002) != 0) {
        this._writeData(data, Fields.FIELD_UINT32, this.sample_description_index);
    }
    if ((this.flags & 0x000008) != 0) {
        this._writeData(data, Fields.FIELD_UINT32, this.default_sample_duration);
    }
    if ((this.flags & 0x000010) != 0) {
        this._writeData(data, Fields.FIELD_UINT32, this.default_sample_size);
    }
    if ((this.flags & 0x000020) != 0) {
        this._writeData(data, Fields.FIELD_UINT32, this.default_sample_flags);
    }
    return this.localPos;  

  }
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    super.read(data,pos,end);
    
    this.track_ID = this._readData(data, Fields.FIELD_UINT32);
    if ((this.flags & 0x000001) != 0) {
        this.base_data_offset = this._readData(data, Fields.FIELD_UINT64);
    }
    if ((this.flags & 0x000002) != 0) {
        this.sample_description_index = this._readData(data, Fields.FIELD_UINT32);
    }
    if ((this.flags & 0x000008) != 0) {
        this.default_sample_duration = this._readData(data, Fields.FIELD_UINT32);
    }
    if ((this.flags & 0x000010) != 0) {
        this.default_sample_size = this._readData(data, Fields.FIELD_UINT32);
    }
    if ((this.flags & 0x000020) != 0) {
        this.default_sample_flags = this._readData(data, Fields.FIELD_UINT32);
    }
    return this.localPos;

  }
}
