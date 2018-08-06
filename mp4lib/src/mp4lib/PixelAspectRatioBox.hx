package mp4lib;
import haxe.io.UInt8Array;

class PixelAspectRatioBox extends Box {
  public var hSpacing:haxe.Int32;
  public var vSpacing:haxe.Int32;
  
  public function new(?size:Int = null) {
    super('pasp', size);
  }
  override public function computeLength() {
    super.computeLength();
    this.size += Fields.FIELD_INT32.getLength() * 2;
  }
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    this.localPos = pos;
    this.localEnd = end;

    this.hSpacing = this._readData(data, Fields.FIELD_INT32);
    this.vSpacing = this._readData(data, Fields.FIELD_INT32);
    return this.localPos;
  }
  
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);

    this._writeData(data, Fields.FIELD_INT32, this.hSpacing);
    this._writeData(data, Fields.FIELD_INT32, this.vSpacing);
    return this.localPos;
  }
}
