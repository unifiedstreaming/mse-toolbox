package mp4lib;
import haxe.io.UInt8Array;

class VideoMediaHeaderBox extends FullBox {
  public var graphicsmode:Null<Int> = null;
  public var opcolor:Array<Int> = null;
  
  public function new(?size:Int = null) {
    super('vmhd', size);
  }
  
  override public function computeLength() {
      super.computeLength();
      this.size += Fields.FIELD_INT16.getLength() + Fields.FIELD_UINT16.getLength() * 3;
  };
  
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);
    this._writeData(data, Fields.FIELD_INT16, this.graphicsmode);
    this._writeArrayData(data, Fields.FIELD_UINT16, this.opcolor);
    return this.localPos;
  }
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    super.read(data,pos,end);
    this.graphicsmode = this._readData(data, Fields.FIELD_INT16);
    this.opcolor = this._readArrayFieldData(data, Fields.FIELD_UINT16, 3);
    return this.localPos;
  }
}
