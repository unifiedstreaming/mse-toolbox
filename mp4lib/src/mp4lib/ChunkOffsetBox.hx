package mp4lib;
import haxe.io.UInt8Array;
class ChunkOffsetBox extends FullBox {

  public var entry_count:Null<haxe.Int32> = null;
  public var chunk_offset:Array<haxe.Int32> = null;
  
  public function new(?size:Int = null) {
    super('stco', size);
  }
  override public function computeLength() {
    super.computeLength();
    this.size += Fields.FIELD_UINT32.getLength() + this.entry_count * Fields.FIELD_UINT32.getLength();
  };
  
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);

    this._writeData(data, Fields.FIELD_UINT32, this.entry_count);

    for (i in 0...this.entry_count) {
        this._writeData(data, Fields.FIELD_UINT32, this.chunk_offset[i]);
    }
    return this.localPos;
  }
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    super.read(data,pos,end);
    this.entry_count = this._readData(data, Fields.FIELD_UINT32);
    this.chunk_offset = this._readArrayFieldData(data, Fields.FIELD_UINT32, this.entry_count);
    return this.localPos;
  }
}
