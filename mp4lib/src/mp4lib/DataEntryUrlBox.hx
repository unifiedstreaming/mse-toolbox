package mp4lib;
import haxe.io.UInt8Array;

class DataEntryUrlBox extends FullBox{
  public var location:String = null;
  public function new(?size:Int = null) {
    super('url ', size);
  }
  override public function computeLength() {
    super.computeLength();
    if (this.location != null /*&& this.location !==""*/ ) {
        //this.flags = this.flags | 1;
        this.size += Fields.FIELD_STRING.getLength(this.location);
      }
  }
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    super.read(data,pos,end);
    //TODO:Check
    if ((this.flags & 0x000001) == 0) {
        this.location = this._readData(data, Fields.FIELD_STRING);
    }

    return this.localPos;
  }
  
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);
  if (this.location != null /* && this.location !== ""*/ ) {
            this._writeData(data, Fields.FIELD_STRING, this.location);
        }
        return this.localPos;
    };
}
