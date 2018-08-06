package mp4lib;
import haxe.io.UInt8Array;

typedef SegmentIndexStruct = {
  var reference_info:haxe.Int64;
  var SAP:haxe.Int32;
}
class SegmentIndexBox extends FullBox{
  
  public var reference_ID:haxe.Int32;
  public var timescale:haxe.Int32;
  public var earliest_presentation_time:Dynamic; //haxe.Int32 | haxe.Int64;
  public var first_offset:Dynamic; //haxe.Int32 | haxe.Int64;
  public var reserved:Int;
  public var reference_count:Int;
  public var references:Array<SegmentIndexStruct>;
  
  public function new(?size:Int = null) {
    super('sidx', size);
  }
  override public function computeLength() {
    super.computeLength();
    this.size += Fields.FIELD_UINT32.getLength() * 2; /* reference_ID and timescale size*/
    if (this.version == 1) {
        this.size += Fields.FIELD_UINT64.getLength() * 2; /* earliest_presentation_time and first_offset size*/
    } else {
        this.size += Fields.FIELD_UINT32.getLength() * 2; /* earliest_presentation_time and first_offset size*/
    }
    this.size += Fields.FIELD_UINT16.getLength(); /* reserved size*/
    this.size += Fields.FIELD_UINT16.getLength(); /* reference_count size*/
    this.size += (Fields.FIELD_UINT64.getLength() /* reference_info size*/ + Fields.FIELD_UINT32.getLength() /* SAP size*/ ) * this.reference_count;
  }
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    super.read(data,pos,end);

    this.reference_ID = this._readData(data, Fields.FIELD_UINT32);
    this.timescale = this._readData(data, Fields.FIELD_UINT32);

    if (this.version == 1) {
        this.earliest_presentation_time = this._readData(data, Fields.FIELD_UINT64);
        this.first_offset = this._readData(data, Fields.FIELD_UINT64);
    } else {
        this.earliest_presentation_time = this._readData(data, Fields.FIELD_UINT32);
        this.first_offset = this._readData(data, Fields.FIELD_UINT32);
    }
    this.reserved = this._readData(data, Fields.FIELD_UINT16);
    this.reference_count = this._readData(data, Fields.FIELD_UINT16);

    this.references = [];

    for (i in 0...this.reference_count) {
        var struct = { reference_info: null, SAP: null };

        struct.reference_info = this._readData(data, Fields.FIELD_UINT64);
        struct.SAP = this._readData(data, Fields.FIELD_UINT32);

        this.references.push(struct);
    }

    return this.localPos;
  }
  
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);

    this._writeData(data, Fields.FIELD_UINT32, this.reference_ID);
    this._writeData(data, Fields.FIELD_UINT32, this.timescale);

    if (this.version == 1) {
       this._writeData(data, Fields.FIELD_UINT64, this.earliest_presentation_time);
       this._writeData(data, Fields.FIELD_UINT64, this.first_offset);
    } else {
       this._writeData(data, Fields.FIELD_UINT32, this.earliest_presentation_time);
       this._writeData(data, Fields.FIELD_UINT32, this.first_offset);
    }

    this._writeData(data, Fields.FIELD_UINT16, this.reserved);
    this._writeData(data, Fields.FIELD_UINT16, this.reference_count);

    for (i in 0...this.reference_count) {
       this._writeData(data, Fields.FIELD_UINT64, this.references[i].reference_info);
       this._writeData(data, Fields.FIELD_UINT32, this.references[i].SAP);
    }
    return this.localPos;
  }
  
}
