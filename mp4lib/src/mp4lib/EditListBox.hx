package mp4lib;
import haxe.io.UInt8Array;

class EditListBox extends FullBox {

  public var entry_count:haxe.Int32;
  public var entries:Array<{ segment_duration:Dynamic, media_time:Dynamic, media_rate_integer:Int, media_rate_fraction:Int }>;

  public function new(size:Int) {
    super('elst', size);
    entries = [];
  }
  override public function computeLength() {
    super.computeLength();
    this.size += Fields.FIELD_UINT32.getLength() * 2;
    if (this.version == 1) {
        this.size += (Fields.FIELD_UINT64.getLength() * 2 /*segment_duration and media_time size*/ +
            Fields.FIELD_UINT16.getLength() * 2 /*media_rate_integer and media_rate_fraction size)*/ ) * this.entry_count;
    } else { // version==0
        this.size += (Fields.FIELD_UINT32.getLength() * 2 /*segment_duration and media_time size*/ +
            Fields.FIELD_UINT16.getLength() * 2 /*media_rate_integer and media_rate_fraction size)*/ ) * this.entry_count;
    }
  };
  
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);
    this._writeData(data, Fields.FIELD_UINT32, this.entry_count);
    for (i in 0...this.entry_count) {
        if (this.version == 0) {
            this._writeData(data, Fields.FIELD_UINT32, this.entries[i].segment_duration);
            this._writeData(data, Fields.FIELD_UINT32, this.entries[i].media_time);
        } else { // version==1
            this._writeData(data, Fields.FIELD_UINT64, this.entries[i].segment_duration);
            this._writeData(data, Fields.FIELD_UINT64, this.entries[i].media_time);
        }
        this._writeData(data, Fields.FIELD_UINT16, this.entries[i].media_rate_integer);
        this._writeData(data, Fields.FIELD_UINT16, this.entries[i].media_rate_fraction);
    }
    return this.localPos;
  }
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    super.read(data, pos, end);
    var i = 0,
    struct = {};
    this.entry_count = this._readData(data, Fields.FIELD_UINT32);
    for (i in 0...this.entry_count){
        this.entries.push({
          segment_duration:this._readData(data, this.version == 0 ? Fields.FIELD_UINT32 : Fields.FIELD_UINT64),
          media_time:this._readData(data, this.version == 0 ? Fields.FIELD_UINT32 : Fields.FIELD_UINT64),
          media_rate_integer: this._readData(data, Fields.FIELD_UINT16),
          media_rate_fraction: this._readData(data, Fields.FIELD_UINT16)
        });
    }
    return this.localPos;
  }  
}
