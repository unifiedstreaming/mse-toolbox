package mp4lib;
import haxe.io.UInt8Array;
typedef StampleEnty = {
  var sample_count:haxe.Int32;
  var sample_delta:haxe.Int32;
}
class TimeToSampleBox extends FullBox {

  public var entry:Array<StampleEnty> = null;
  public var entry_count:Null<haxe.Int32> = null;
  
  public function new(?size:Int = null) {
    super('stts', size);
  }
  
  override public function computeLength() {
    super.computeLength();
    this.size += Fields.FIELD_UINT32.getLength();
    this.size += this.entry_count * (Fields.FIELD_UINT32.getLength() * 2);
  };
  
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);
    this._writeData(data, Fields.FIELD_UINT32, this.entry_count);

    for (i in 0...this.entry_count) {
        this._writeData(data, Fields.FIELD_UINT32, this.entry[i].sample_count);
        this._writeData(data, Fields.FIELD_UINT32, this.entry[i].sample_delta);
    }
    return this.localPos;
  }
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    super.read(data,pos,end);
    this.entry_count = this._readData(data, Fields.FIELD_UINT32);

    this.entry = [];

    for (i in 0 ...this.entry_count) {
        this.entry.push({
          sample_count: this._readData(data, Fields.FIELD_UINT32),
          sample_delta: this._readData(data, Fields.FIELD_UINT32)
        });
    }
    return this.localPos;
  }
}
