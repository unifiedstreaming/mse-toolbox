package mp4lib;
import haxe.io.UInt8Array;
class TrackHeaderBox extends FullBox {
  public var creation_time:haxe.Int64;     //FIELD_UINT64
  public var modification_time:haxe.Int64; //FIELD_UINT64
  public var track_id:haxe.Int32;        //FIELD_UINT32
  public var reserved:haxe.Int32;        //FIELD_UINT32
  public var duration:haxe.Int64;        //FIELD_UINT64

  public var reserved_2:Array<haxe.Int32>;  //ArrayField(FIELD_UINT32)[2]
  public var layer:Int;              //FIELD_INT16
  public var alternate_group:Int;    //FIELD_INT16
  public var volume:Int;             //FIELD_INT16
  public var reserved_3:Int;         //FIELD_INT16
  public var matrix:Array<haxe.Int32>;      //ArrayField(FIELD_INT32)[9]
  public var width:haxe.Int32;              //FIELD_INT32
  public var height:haxe.Int32;             //FIELD_INT32
  public function new(?size:Int = null) {
    super('tkhd', size);
  }
  override public function computeLength() {
      super.computeLength();
      this.size += Fields.FIELD_INT16.getLength() * 4 + Fields.FIELD_INT32.getLength() * 2 + Fields.FIELD_UINT32.getLength() * 2 + Fields.FIELD_INT32.getLength() * 9;
      if (this.version == 1) {
          this.size += Fields.FIELD_UINT64.getLength() * 3 + Fields.FIELD_UINT32.getLength() * 2;
      } else {
          this.size += Fields.FIELD_UINT32.getLength() * 5;
      }
  };
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
      super.read(data, pos, end);

      if (this.version == 1) {
          this.creation_time = this._readData(data, Fields.FIELD_UINT64);
          this.modification_time = this._readData(data, Fields.FIELD_UINT64);
          this.track_id = this._readData(data, Fields.FIELD_UINT32);
          this.reserved = this._readData(data, Fields.FIELD_UINT32);
          this.duration = this._readData(data, Fields.FIELD_UINT64);
      } else {
          this.creation_time = this._readData(data, Fields.FIELD_UINT32);
          this.modification_time = this._readData(data, Fields.FIELD_UINT32);
          this.track_id = this._readData(data, Fields.FIELD_UINT32);
          this.reserved = this._readData(data, Fields.FIELD_UINT32);
          this.duration = this._readData(data, Fields.FIELD_UINT32);
      }
      this.reserved_2 = this._readArrayFieldData(data, Fields.FIELD_UINT32, 2);
      this.layer = this._readData(data, Fields.FIELD_INT16);
      this.alternate_group = this._readData(data, Fields.FIELD_INT16);
      this.volume = this._readData(data, Fields.FIELD_INT16);
      this.reserved_3 = this._readData(data, Fields.FIELD_INT16);
      this.matrix = this._readArrayFieldData(data, Fields.FIELD_INT32, 9);
      this.width = this._readData(data, Fields.FIELD_INT32);
      this.height = this._readData(data, Fields.FIELD_INT32);
      return this.localPos;
  };
  
  override public function write(data:UInt8Array, pos:Int):Int {
      super.write(data, pos);

      if (this.version == 1) {
          this._writeData(data, Fields.FIELD_UINT64, this.creation_time);
          this._writeData(data, Fields.FIELD_UINT64, this.modification_time);
          this._writeData(data, Fields.FIELD_UINT32, this.track_id);
          this._writeData(data, Fields.FIELD_UINT32, this.reserved);
          this._writeData(data, Fields.FIELD_UINT64, this.duration);
      } else {
          this._writeData(data, Fields.FIELD_UINT32, this.creation_time);
          this._writeData(data, Fields.FIELD_UINT32, this.modification_time);
          this._writeData(data, Fields.FIELD_UINT32, this.track_id);
          this._writeData(data, Fields.FIELD_UINT32, this.reserved);
          this._writeData(data, Fields.FIELD_UINT32, this.duration);
      }

      this._writeArrayData(data, Fields.FIELD_UINT32, this.reserved_2);
      this._writeData(data, Fields.FIELD_INT16, this.layer);
      this._writeData(data, Fields.FIELD_INT16, this.alternate_group);
      this._writeData(data, Fields.FIELD_INT16, this.volume);
      this._writeData(data, Fields.FIELD_INT16, this.reserved_3);
      this._writeArrayData(data, Fields.FIELD_INT32, this.matrix);
      this._writeData(data, Fields.FIELD_INT32, this.width);
      this._writeData(data, Fields.FIELD_INT32, this.height);
      return this.localPos;
  };
}
