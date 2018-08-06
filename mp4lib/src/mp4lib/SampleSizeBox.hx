package mp4lib;
import haxe.io.UInt8Array;
class SampleSizeBox extends FullBox  {
  public var sample_size:Null<haxe.Int32> = null;
  public var sample_count:Null<haxe.Int32> = null;
  public var entries:Array<haxe.Int32> = null;
  
  public function new(?size:Int = null) {
    super('stsz', size);
  }
  override public function computeLength() {
    super.computeLength();
    this.size += Fields.FIELD_UINT32.getLength() * 2 + Fields.FIELD_UINT32.getLength() * this.sample_count;
  };
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);

    this._writeData(data, Fields.FIELD_UINT32, this.sample_size);
    this._writeData(data, Fields.FIELD_UINT32, this.sample_count);
    for (i in 0...this.sample_count) {
        this._writeData(data, Fields.FIELD_UINT32, this.entries[i]);
    }
    return this.localPos;
  }
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    super.read(data,pos,end);
    
    this.sample_size = this._readData(data, Fields.FIELD_UINT32);
    this.sample_count = this._readData(data, Fields.FIELD_UINT32);
    this.entries = this._readArrayFieldData(data, Fields.FIELD_UINT32, this.sample_count);
    return this.localPos;
  }
}
