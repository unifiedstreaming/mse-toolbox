package mp4lib;
import haxe.io.UInt8Array;

class FreeSpaceBox extends Box {
  public var data:UInt8Array;
  public function new(?size:Int = null) {
    super('free', size);
  }
  override public function computeLength() {
    super.computeLength();
    this.size += this.data.length;
  }
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    this.localPos = pos;
    this.localEnd = end;
    this.data = UInt8Array.fromBytes(data.view.sub(this.localPos, this.localEnd).buffer);
    return this.localEnd;
  }
  
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);
    this._writeBuffer(data, this.data, this.data.length);

    return this.localPos;
  }
}
