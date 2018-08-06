package mp4lib;
import haxe.io.UInt8Array;
class DASHEventMessageBox extends FullBox{
  public var scheme_id_uri:String;
  public var value:String;
  public var timescale:haxe.Int32;
  public var presentation_time_delta:haxe.Int32;
  public var event_duration:haxe.Int32;
  public var id:haxe.Int32;
  public var message_data:Array<Int> = null;
  
  //ISO/IEC 23009-1:2014(E) DASH : Media presentation description and segment formats
  //5.10.3.3.3 Syntax
  // --- emsg ---
  //
  //aligned(8) class DASHEventMessageBox extends FullBox(‘emsg’, version = 0, flags = 0){
  //   string            scheme_id_uri;
  //   string            value;
  //   unsigned int(32)  timescale;
  //   unsigned int(32)  presentation_time_delta;
  //   unsigned int(32)  event_duration;
  //   unsigned int(32)  id;
  //   unsigned int(8)   message_data[];
  //} }

  public function new(?size:Int = 0) {
    super('emsg', size);
  }
  
  override public function computeLength() {
      super.computeLength();
      this.size  += Fields.FIELD_STRING.getLength(this.scheme_id_uri) + Fields.FIELD_STRING.getLength(this.value);
      this.size += Fields.FIELD_UINT32.getLength() * 4;
      this.size += Fields.FIELD_UINT8.getLength() * this.message_data.length;
  };
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    super.read(data, pos, end);
    this.scheme_id_uri = this._readData(data, Fields.FIELD_STRING);
    this.value = this._readData(data, Fields.FIELD_STRING);
    this.timescale = this._readData(data, Fields.FIELD_UINT32);
    this.presentation_time_delta = this._readData(data, Fields.FIELD_UINT32);
    this.event_duration = this._readData(data, Fields.FIELD_UINT32);
    this.id = this._readData(data, Fields.FIELD_UINT32);
    //this.message_data = this._readArrayData(data, Fields.FIELD_UINT8);
    this.message_data = this._readArrayFieldData(data, Fields.FIELD_UINT8, end - this.localPos);

    return this.localPos;
  };
  
  //TODO: write emsg?:
  override public function write(data:UInt8Array, pos:Int):Int {
      super.write(data, pos);
      throw 'not implemented';
      return this.localPos;
  };
}
