package mp4lib;
import haxe.io.UInt8Array;

class DataReferenceBox extends ContainerFullBox {
  public function new(?size:Int = null) {
    super('dref', size, true);
  }
  
  override public function computeLength() {
      super.computeLength();
  }
  
  override public function write(data:UInt8Array, pos:Int):Int {
    if (entry_count == 0) {
        //if entry_count has not been set, set it to boxes array length
        this.entry_count = this.boxes.length;
    }

    return super.write(data, pos);
  }

}
