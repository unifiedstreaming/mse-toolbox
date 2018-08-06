package mp4lib;
import haxe.io.UInt8Array;

class DataEntryUrnBox extends FullBox{
  public var name:String = null;
  public var location:String = null;
  public function new(?size:Int = null) {
    super('urn ', size);
  }
  override public function computeLength() {
    super.computeLength();
    if (this.flags & 0x000001 == 0) {
        this.size += Fields.FIELD_STRING.getLength(this.name) + Fields.FIELD_STRING.getLength(this.location);
    }
  }
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    super.read(data,pos,end);
    //TODO:Check
    if (this.flags & 0x000001 == 0) {
            this.name = this._readData(data, Fields.FIELD_STRING);
            this.location = this._readData(data, Fields.FIELD_STRING);
        }
        return this.localPos;
  }
  
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);
    if (this.flags & 0x000001 == 0) {
        this._writeData(data, Fields.FIELD_STRING, this.name);
        this._writeData(data, Fields.FIELD_STRING, this.location);
    }
    return this.localPos;
  };
}
