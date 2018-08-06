package mp4lib;
import haxe.io.UInt8Array;
class MediaDataBox extends Box {
  /* actual mdat data 
    todo: parse i frame idr frame etc.
  */
  public var data:UInt8Array;
  public function new(?size:Int = null) {
    super('mdat', size);
  }
  override public function computeLength() {
    super.computeLength();
    this.size += this.data.length;
  }
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    //todo: super?
    this.data = UInt8Array.fromBytes(data.view.sub(pos, end).buffer);
    return end;
  }
  
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);
    this._writeBuffer(data, this.data, this.data.length);
    return this.localPos;
  }
}
