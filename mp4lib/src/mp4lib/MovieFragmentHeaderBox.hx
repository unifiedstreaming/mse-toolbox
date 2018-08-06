package mp4lib;
import haxe.io.UInt8Array;

class MovieFragmentHeaderBox extends FullBox{
  public var sequence_number:haxe.Int32;
  public function new(?size:Int = null) {
    super('mfhd', size);
  }
  override public function computeLength() {
    super.computeLength();
    this.size += Fields.FIELD_UINT32.getLength();
  }
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    super.read(data,pos,end);
    this.sequence_number = this._readData(data, Fields.FIELD_UINT32);
    return this.localPos;
  }
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);
    this._writeData(data, Fields.FIELD_UINT32, this.sequence_number);
    return this.localPos;
   }
}
