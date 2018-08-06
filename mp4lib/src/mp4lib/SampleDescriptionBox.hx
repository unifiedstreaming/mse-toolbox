package mp4lib;
import haxe.io.UInt8Array;
class SampleDescriptionBox extends ContainerFullBox {
  public function new(?size:Int = null) {
    super('stsd', size, true);
  }
  
  override public function write(data:UInt8Array, pos:Int):Int {
    this.entry_count = this.boxes.length;
    return super.write(data, pos);
  }
}
