package mp4lib;
import haxe.io.UInt8Array;
class SampleEntryBox extends Box {
  public var reserved:Array<Int>;
  public var data_reference_index:Int;
  public function new(boxType:String, ?size:Int = null) {
    super(boxType, size);
  }
  override public function computeLength() {
    super.computeLength();
    this.size += Fields.FIELD_UINT16.getLength() + Fields.FIELD_UINT8.getLength() * 6;
  };
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);
    this._writeArrayData(data, Fields.FIELD_UINT8, this.reserved);
    this._writeData(data, Fields.FIELD_UINT16, this.data_reference_index);
    return this.localPos;
  }
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    //TODO super?
    this.localPos = pos;
    this.localEnd = end;

    this.reserved = this._readArrayFieldData(data, Fields.FIELD_UINT8, 6);
    this.data_reference_index = this._readData(data, Fields.FIELD_UINT16);
    return this.localPos;
  }
}