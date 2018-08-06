package mp4lib;
import haxe.io.UInt8Array;

typedef TfrfEntryStruct = {
  var fragment_absolute_time:Dynamic; //haxe.Int32 | haxe.Int64
  var fragment_duration:Dynamic; //haxe.Int32 | haxe.Int64
}

//Microsoft Smooth Streaming specific
class TfrfBox extends FullBox {
  public var entry:Array<TfrfEntryStruct>;
  public var fragment_count:Int;
  
  public function new(?size:Int = null) {
    super('tfrf', size, UInt8Array.fromArray([0xD4, 0x80, 0x7E, 0xF2, 0xCA, 0x39, 0x46, 0x95, 0x8E, 0x54, 0x26, 0xCB, 0x9E, 0x46, 0xA7, 0x9F]));
  }
  
  override public function computeLength() {
    super.computeLength();
    this.size += Fields.FIELD_UINT8.getLength(); //fragment_count size
    if (this.version == 1) {
        this.size += (Fields.FIELD_UINT64.getLength() * 2 /*fragment_absolute_time and fragment_duration size*/ ) * this.fragment_count;
    } else {
        this.size += (Fields.FIELD_UINT32.getLength() * 2 /*fragment_absolute_time and fragment_duration size*/ ) * this.fragment_count;
    }
  };
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    super.read(data,pos,end);
    
    this.fragment_count = this._readData(data, Fields.FIELD_UINT8);
    this.entry = [];
    for (i in 0...this.fragment_count) {
        var struct = { fragment_duration : null, fragment_absolute_time : null };
        if (this.version == 1) {
            struct.fragment_absolute_time = this._readData(data, Fields.FIELD_UINT64);
            struct.fragment_duration = this._readData(data, Fields.FIELD_UINT64);
        } else {
            struct.fragment_absolute_time = this._readData(data, Fields.FIELD_UINT32);
            struct.fragment_duration = this._readData(data, Fields.FIELD_UINT32);
        }
        this.entry.push(struct);
    }
    return this.localPos;    
  }
  
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);
    this._writeData(data, Fields.FIELD_UINT8, this.fragment_count);
    for (i in 0...this.fragment_count) {
        if (this.version == 1) {
            this._writeData(data, Fields.FIELD_UINT64, this.entry[i].fragment_absolute_time);
            this._writeData(data, Fields.FIELD_UINT64, this.entry[i].fragment_duration);
        } else {
            this._writeData(data, Fields.FIELD_UINT32, this.entry[i].fragment_absolute_time);
            this._writeData(data, Fields.FIELD_UINT32, this.entry[i].fragment_duration);
        }
    }
    return this.localPos;
  }
}
