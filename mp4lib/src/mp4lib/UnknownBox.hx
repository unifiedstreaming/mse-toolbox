package mp4lib;
import haxe.io.UInt8Array;

class UnknownBox extends Box {
  
  private var unrecognized_data:UInt8Array;
  
  public function new(size:Int) {
    super(null, size);
  }
  
  override public function read(buf:UInt8Array, pos:Int, ?end:Int = null):Int {
      this.localPos = pos;
      this.localEnd = end;
      
      this.unrecognized_data = UInt8Array.fromBytes(buf.view.sub(this.localPos, this.localEnd).buffer);

      return this.localEnd;
  };
  
  override public function write(data:UInt8Array, pos:Int):Int {
      super.write(data, pos);
      this._writeBuffer(data, this.unrecognized_data, this.unrecognized_data.length);

      return this.localPos;
  };
  
  override public function computeLength():Void {
      super.computeLength();
      this.size += this.unrecognized_data.length;
  };
}
