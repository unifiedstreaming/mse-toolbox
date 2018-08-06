package mp4lib;
import haxe.io.UInt8Array;
import mp4lib.fields.FixedLenStringField;
class VisualSampleEntryBox extends SampleEntryBox {
  public var pre_defined:Null<Int> = null;
  public var reserved_2:Null<Int> = null;
  // there is already field called reserved from SampleEntry, so we need to call it reserved_2
  public var pre_defined_2:Array<haxe.Int32>;
  public var width:Null<Int> = null;
  public var height:Null<Int> = null;
  public var horizresolution:Null<haxe.Int32>;
  public var vertresolution:Null<haxe.Int32>;
  public var reserved_3:Null<haxe.Int32>;
  public var frame_count:Null<Int>;
  public var compressorname:String;
  public var depth:Null<Int>;
  public var pre_defined_3:Null<Int>;
  
  public function new(boxType:String, ?size:Int = null) {
    super(boxType, size);
  }
  override public function computeLength() {
    super.computeLength();
    this.size += Fields.FIELD_UINT16.getLength() * 7 + Fields.FIELD_UINT32.getLength() * 3;
    this.size += Fields.FIELD_UINT32.getLength() * 3;
    this.size += 32; //compressorname size
  };
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);
    this._writeData(data, Fields.FIELD_UINT16, this.pre_defined);
    this._writeData(data, Fields.FIELD_UINT16, this.reserved_2);
    // there is already field called reserved from SampleEntry, so we need to call it reserved_2
    this._writeArrayData(data, Fields.FIELD_UINT32, this.pre_defined_2);
    this._writeData(data, Fields.FIELD_UINT16, this.width);
    this._writeData(data, Fields.FIELD_UINT16, this.height);
    this._writeData(data, Fields.FIELD_UINT32, this.horizresolution);
    this._writeData(data, Fields.FIELD_UINT32, this.vertresolution);
    this._writeData(data, Fields.FIELD_UINT32, this.reserved_3);
    this._writeData(data, Fields.FIELD_UINT16, this.frame_count);
    for (i in 0...32) {
        data[this.localPos + i] = this.compressorname.charCodeAt(i);
    }
    this.localPos += 32;
    this._writeData(data, Fields.FIELD_UINT16, this.depth);
    this._writeData(data, Fields.FIELD_INT16, this.pre_defined_3);
    return this.localPos;
  }
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    super.read(data,pos,end);
    this.pre_defined = this._readData(data, Fields.FIELD_UINT16);
    this.reserved_2 = this._readData(data, Fields.FIELD_UINT16);
    // there is already field called reserved from SampleEntry, so we need to call it reserved_2
    this.pre_defined_2 = this._readArrayFieldData(data, Fields.FIELD_UINT32, 3);
    this.width = this._readData(data, Fields.FIELD_UINT16);
    this.height = this._readData(data, Fields.FIELD_UINT16);
    this.horizresolution = this._readData(data, Fields.FIELD_UINT32);
    this.vertresolution = this._readData(data, Fields.FIELD_UINT32);
    this.reserved_3 = this._readData(data, Fields.FIELD_UINT32);
    this.frame_count = this._readData(data, Fields.FIELD_UINT16);
    var flsf = new FixedLenStringField(32);
    this.compressorname = flsf.read(data, this.localPos);
    this.localPos += 32;
    this.depth = this._readData(data, Fields.FIELD_UINT16);
    this.pre_defined_3 = this._readData(data, Fields.FIELD_INT16);
    return this.localPos;
  }
  
}