package mp4lib;
import haxe.io.UInt8Array;
class TrackFragmentBaseMediaDecodeTimeBox extends FullBox {
  public var baseMediaDecodeTime:Dynamic;
  
  public function new(?size:Int = 0) {
    super('tfdt', size);
  }
  
  override public function computeLength() {
    super.computeLength();
    if (this.version == 1) {
        this.size += Fields.FIELD_UINT64.getLength();
    } else {
        this.size += Fields.FIELD_UINT32.getLength();
    }
  };
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);
    
    if (this.version == 1) {
        this._writeData(data, Fields.FIELD_UINT64, this.baseMediaDecodeTime);
    } else {
        this._writeData(data, Fields.FIELD_UINT32, this.baseMediaDecodeTime);
    }
    return this.localPos;
  }
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    super.read(data,pos,end);
    
    if (this.version == 1) {
        this.baseMediaDecodeTime = this._readData(data, Fields.FIELD_UINT64);
    } else {
        this.baseMediaDecodeTime = this._readData(data, Fields.FIELD_UINT32);
    }
    return this.localPos;
  }
  
}
