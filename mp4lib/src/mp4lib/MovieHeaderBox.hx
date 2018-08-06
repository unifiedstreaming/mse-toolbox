package mp4lib;
import haxe.io.UInt8Array;
class MovieHeaderBox extends FullBox{
  public var creation_time:haxe.Int64 = 0; // the creation time of the presentation => ignore (set to 0)
  public var modification_time:haxe.Int64 = 0; // the most recent time the presentation was modified => ignore (set to 0)
  public var timescale:haxe.Int32 = 0; //track.timescale; // the time-scale for the entire presentation => take timescale of current adaptationSet
  public var duration:haxe.Int64 = 0; //Math.round(track.duration * track.timescale); // the length of the presentation (in the indicated timescale) =>  take duration of period
  public var rate:haxe.Int32 = 0x00010000; // 16.16 number, "1.0" = normal playback
  public var volume:Int = 0x0100; // 8.8 number, "1.0" = full volume
  public var reserved:Int = 0;
  public var reserved_2:Array<haxe.Int32> = [0x0, 0x0];
  public var matrix:Array<haxe.Int32> = [0x00010000, 0x0, 0x0, 0x0, 0x00010000, 0x0, 0x0, 0x0, 0x40000000]; // provides a transformation matrix for the video; (u,v,w) are restricted here to (0,0,1),
  // hex values (0,0,0x40000000)
  public var pre_defined:Array<haxe.Int32> = [0x0, 0x0, 0x0, 0x0, 0x0, 0x0];
  public var next_track_ID:haxe.Int32 = 0;// track.trackId + 1; // indicates a value to use for the track ID of the next track to be added to this presentation
  
  public function new(?size:Int = null) {
    super('mvhd', size);
  }
  
  override public function computeLength() {
    super.computeLength();

    this.size += Fields.FIELD_INT32.getLength() /*rate size*/ + Fields.FIELD_INT16.getLength() * 2 /*volume size and reserved size*/ ;
    this.size += Fields.FIELD_INT32.getLength() * 2 /*reserved_2 size*/ + Fields.FIELD_INT32.getLength() * 9 /*matrix size*/ ;
    this.size += Fields.FIELD_BIT32.getLength() * 6 /*pre_defined size*/ + Fields.FIELD_UINT32.getLength() /*next_track_ID size*/ ;
    if (this.version == 1) {
        this.size += Fields.FIELD_UINT64.getLength() * 3 + Fields.FIELD_UINT32.getLength();
    } else {
        this.size += Fields.FIELD_UINT32.getLength() * 4;
    }
  };
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    super.read(data,pos,end);
    if (this.version == 1) {
        this.creation_time = this._readData(data, Fields.FIELD_UINT64);
        this.modification_time = this._readData(data, Fields.FIELD_UINT64);
        this.timescale = this._readData(data, Fields.FIELD_UINT32);
        this.duration = this._readData(data, Fields.FIELD_UINT64);
    } else {
        this.creation_time = this._readData(data, Fields.FIELD_UINT32);
        this.modification_time = this._readData(data, Fields.FIELD_UINT32);
        this.timescale = this._readData(data, Fields.FIELD_UINT32);
        this.duration = this._readData(data, Fields.FIELD_UINT32);
    }

    this.rate = this._readData(data, Fields.FIELD_INT32);
    this.volume = this._readData(data, Fields.FIELD_INT16);
    this.reserved = this._readData(data, Fields.FIELD_INT16);
    this.reserved_2 = this._readArrayFieldData(data, Fields.FIELD_INT32, 2);
    this.matrix = this._readArrayFieldData(data, Fields.FIELD_INT32, 9);
    this.pre_defined = this._readArrayFieldData(data, Fields.FIELD_BIT32, 6);
    this.next_track_ID = this._readData(data, Fields.FIELD_UINT32);

    return this.localPos;
  }
  
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);

    if (this.version == 1) {
        this._writeData(data, Fields.FIELD_UINT64, this.creation_time);
        this._writeData(data, Fields.FIELD_UINT64, this.modification_time);
        this._writeData(data, Fields.FIELD_UINT32, this.timescale);
        this._writeData(data, Fields.FIELD_UINT64, this.duration);
    } else {
        this._writeData(data, Fields.FIELD_UINT32, this.creation_time);
        this._writeData(data, Fields.FIELD_UINT32, this.modification_time);
        this._writeData(data, Fields.FIELD_UINT32, this.timescale);
        this._writeData(data, Fields.FIELD_UINT32, this.duration);
    }

    this._writeData(data, Fields.FIELD_INT32, this.rate);
    this._writeData(data, Fields.FIELD_INT16, this.volume);
    this._writeData(data, Fields.FIELD_INT16, this.reserved);
    this._writeArrayData(data, Fields.FIELD_INT32, this.reserved_2);
    this._writeArrayData(data, Fields.FIELD_INT32, this.matrix);
    this._writeArrayData(data, Fields.FIELD_BIT32, this.pre_defined);
    this._writeData(data, Fields.FIELD_UINT32, this.next_track_ID);

    return this.localPos;
}
  
}
