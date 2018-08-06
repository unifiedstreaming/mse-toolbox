package mp4lib;
import haxe.io.UInt8Array;
typedef ChunkEntry = {
  var first_chunk:haxe.Int32;
  var samples_per_chunk:haxe.Int32;
  var samples_description_index:haxe.Int32;
}
class SampleToChunkBox extends FullBox {

  public var entry:Array<ChunkEntry> = null;
  public var entry_count:Null<haxe.Int32> = null;
  
  public function new(?size:Int = null) {
    super('stsc', size);
  }
  override public function computeLength() {
    super.computeLength();
    this.size += Fields.FIELD_UINT32.getLength();
    this.size += this.entry_count * (Fields.FIELD_UINT32.getLength() * 3);
  };
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);

    this._writeData(data, Fields.FIELD_UINT32, this.entry_count);
    for (i in 0...this.entry_count) {
        this._writeData(data, Fields.FIELD_UINT32, this.entry[i].first_chunk);
        this._writeData(data, Fields.FIELD_UINT32, this.entry[i].samples_per_chunk);
        this._writeData(data, Fields.FIELD_UINT32, this.entry[i].samples_description_index);
    }
    return this.localPos;
  }
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    super.read(data,pos,end);

    this.entry_count = this._readData(data, Fields.FIELD_UINT32);

    this.entry = [];

    for (i in 0...this.entry_count) {

        this.entry.push({
          first_chunk:this._readData(data, Fields.FIELD_UINT32),
          samples_per_chunk:this._readData(data, Fields.FIELD_UINT32),
          samples_description_index:this._readData(data, Fields.FIELD_UINT32)
      
        });
    }
    return this.localPos;
  }
}