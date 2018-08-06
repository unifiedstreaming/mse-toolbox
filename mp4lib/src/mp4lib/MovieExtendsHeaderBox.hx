package mp4lib;
import haxe.io.UInt8Array;
class MovieExtendsHeaderBox extends FullBox {
  public var fragment_duration:Dynamic; //haxe.Int32 | haxe.Int64
  public function new(?size:Int = null) {
    super('mehd', size);
  }
  
  override public function computeLength() {
    super.computeLength();
    if (this.version == 1) {
        this.size += Fields.FIELD_UINT64.getLength();
    } else {
        this.size += Fields.FIELD_UINT32.getLength();
    }
  }
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    super.read(data,pos,end);
    if (this.version == 1) {
        this.fragment_duration = this._readData(data, Fields.FIELD_UINT64);
    } else {
        this.fragment_duration = this._readData(data, Fields.FIELD_UINT32);
    }
    return this.localPos;
  }
  
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);
    if (this.version == 1) {
        this._writeData(data, Fields.FIELD_UINT64, this.fragment_duration);
    } else {
        this._writeData(data, Fields.FIELD_UINT32, this.fragment_duration);
    }
    return this.localPos;
  }
  
}
