package mp4lib;
import haxe.io.UInt8Array;
class CompositionOffsetBox extends FullBox{
  public var entry_count:haxe.Int32;
  public var entries:Array<{ sample_count:haxe.Int32, sample_offset:haxe.Int32 }>;
  public function new(?size:Int = null) {
    super('ctts', size);
  }
  override public function computeLength() {
    super.computeLength();
    this.size += Fields.FIELD_UINT32.getLength(); //entry_count size

    if (this.version == 0) {
        this.size += (Fields.FIELD_UINT32.getLength() * 2 /*sample_count and sample_offset size*/ ) * this.entry_count;
    } else { // version===1
        this.size += (Fields.FIELD_UINT32.getLength() /*sample_count size*/ + Fields.FIELD_INT32.getLength()
            /*sample_offset size*/
        ) * this.entry_count;
    }
  };
  
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);
    
    for (i in 0...this.entry_count) {
        if (this.version == 0) {
            this._writeData(data, Fields.FIELD_UINT32, this.entries[i].sample_count);
            this._writeData(data, Fields.FIELD_UINT32, this.entries[i].sample_offset);
        } else { // version==1
            this._writeData(data, Fields.FIELD_UINT32, this.entries[i].sample_count);
            this._writeData(data, Fields.FIELD_INT32, this.entries[i].sample_offset);
        }
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
          sample_count:this._readData(data, Fields.FIELD_UINT32),
          //version==1, sample_offset = INT32
          sample_offset:this.version == 0 ? this._readData(data, Fields.FIELD_UINT32) : this._readData(data, Fields.FIELD_INT32)
        });
    }
    return this.localPos;
  }
}
