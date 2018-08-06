package mp4lib;
import haxe.io.UInt8Array;
class TrackReferenceBox extends FullBox {
  public var track_IDs:Array<haxe.Int32>;
  public function new(?size:Int = null) {
    super('tref', size);
  }
  
  override public function computeLength() {
    super.computeLength();
    this.size += Fields.FIELD_UINT32.getLength() * this.track_IDs.length;
  };
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    super.read(data,pos,end);
    this.track_IDs = this._readArrayData(data, Fields.FIELD_UINT32);
    return this.localPos;    
  }
  
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);
    this._writeArrayData(data, Fields.FIELD_UINT32, this.track_IDs);
    return this.localPos;
  }
  
}
