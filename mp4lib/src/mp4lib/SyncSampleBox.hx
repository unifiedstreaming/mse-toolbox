package mp4lib;
import haxe.io.UInt8Array;

typedef SyncSampleStruct = {
  var sample_number:haxe.Int32;
}
class SyncSampleBox extends FullBox {
  public var entry_count:Int;
  public var entries:Array<SyncSampleStruct>;
  public function new(?size:Int = null) {
    super('stss', size);
    entries = [];
  }
  
  override public function computeLength() {
    super.computeLength();
    this.size += Fields.FIELD_UINT32.getLength(); //entry_count size
    this.size += Fields.FIELD_UINT32.getLength() * this.entry_count; //entries size
  };
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    super.read(data,pos,end);
    this.entry_count = this._readData(data, Fields.FIELD_UINT32);
    for (i in 0...this.entry_count) {
        this.entries.push({sample_number: this._readData(data, Fields.FIELD_UINT32)});
    }
    return this.localPos;  
  }
  
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);
    this._writeData(data, Fields.FIELD_UINT32, this.entry_count);
    for (i in 0...this.entry_count) {
        this._writeData(data, Fields.FIELD_UINT32, this.entries[i].sample_number);
    }
    return this.localPos;
  }
}
