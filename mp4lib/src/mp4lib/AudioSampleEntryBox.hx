package mp4lib;
import haxe.io.UInt8Array;
class AudioSampleEntryBox extends SampleEntryBox {
  public var reserved_2:Array<haxe.Int32>;
  public var channelcount:Int;
  public var samplesize:Int;
  public var pre_defined:Int;
  public var reserved_3:Int;
  public var samplerate:haxe.Int32;
  
  public function new(boxType:String, ?size:Int = null) {
    super(boxType, size);
  }
  override public function computeLength() {
    super.computeLength();
    this.size += Fields.FIELD_UINT16.getLength() * 4 + Fields.FIELD_UINT32.getLength() * 3;
  };
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);
    this._writeArrayData(data, Fields.FIELD_UINT32, this.reserved_2);
    this._writeData(data, Fields.FIELD_UINT16, this.channelcount);
    this._writeData(data, Fields.FIELD_UINT16, this.samplesize);
    this._writeData(data, Fields.FIELD_UINT16, this.pre_defined);
    this._writeData(data, Fields.FIELD_UINT16, this.reserved_3);
    this._writeData(data, Fields.FIELD_UINT32, this.samplerate);
    return this.localPos;
  }
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    super.read(data, pos, end);
    this.reserved_2 = this._readArrayFieldData(data, Fields.FIELD_UINT32, 2);
    this.channelcount = this._readData(data, Fields.FIELD_UINT16);
    this.samplesize = this._readData(data, Fields.FIELD_UINT16);
    this.pre_defined = this._readData(data, Fields.FIELD_UINT16);
    this.reserved_3 = this._readData(data, Fields.FIELD_UINT16);
    this.samplerate = this._readData(data, Fields.FIELD_UINT32);
    return this.localPos;
  }
}