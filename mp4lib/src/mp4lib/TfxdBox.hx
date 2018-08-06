package mp4lib;
import haxe.io.UInt8Array;

//Microsoft Smooth Streaming specific
class TfxdBox extends FullBox {
  public var fragment_absolute_time:Dynamic; //haxe.Int32 | haxe.Int64
  public var fragment_duration:Dynamic; //haxe.Int32 | haxe.Int64
  
  public function new(?size:Int = null) {
    super('tfxd', size, UInt8Array.fromArray([0x6D, 0x1D, 0x9B, 0x05, 0x42, 0xD5, 0x44, 0xE6, 0x80, 0xE2, 0x14, 0x1D, 0xAF, 0xF7, 0x57, 0xB2]));
  }
  
  override public function computeLength() {
    super.computeLength();
    if (this.version == 1) {
        this.size += Fields.FIELD_UINT64.getLength() * 2;
    } else {
        this.size += Fields.FIELD_UINT32.getLength() * 2;
    }
  };
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    super.read(data,pos,end);
    
    if (this.version == 1) {
        this.fragment_absolute_time = this._readData(data, Fields.FIELD_UINT64);
        this.fragment_duration = this._readData(data, Fields.FIELD_UINT64);
    } else {
        this.fragment_absolute_time = this._readData(data, Fields.FIELD_UINT32);
        this.fragment_duration = this._readData(data, Fields.FIELD_UINT32);
    }
    return this.localPos;
  }
  
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);
    if (this.version == 1) {
        this._writeData(data, Fields.FIELD_UINT64, this.fragment_absolute_time);
        this._writeData(data, Fields.FIELD_UINT64, this.fragment_duration);
    } else {
        this._writeData(data, Fields.FIELD_UINT32, this.fragment_absolute_time);
        this._writeData(data, Fields.FIELD_UINT32, this.fragment_duration);
    }
    return this.localPos;
  }
}