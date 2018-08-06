package mp4lib;
import haxe.io.UInt8Array;

class CompositionToDecodeBox extends FullBox {
  
  public var compositionToDTSShift:haxe.Int32;
  public var leastDecodeToDisplayDelta:haxe.Int32;
  public var greatestDecodeToDisplayDelta:haxe.Int32;
  public var compositionStartTime:haxe.Int32;
  public var compositionEndTime:haxe.Int32;
  
  public function new(?size:Int = null) {
    super('cslg', size);
  }
  override public function computeLength() {
    super.computeLength();
    this.size += Fields.FIELD_INT32.getLength() * 5;
  }
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    super.read(data,pos,end);
    this.compositionToDTSShift = this._readData(data, Fields.FIELD_INT32);
    this.leastDecodeToDisplayDelta = this._readData(data, Fields.FIELD_INT32);
    this.greatestDecodeToDisplayDelta = this._readData(data, Fields.FIELD_INT32);
    this.compositionStartTime = this._readData(data, Fields.FIELD_INT32);
    this.compositionEndTime = this._readData(data, Fields.FIELD_INT32);
    return this.localPos;
  }
  
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);
    this._writeData(data, Fields.FIELD_INT32, this.compositionToDTSShift);
    this._writeData(data, Fields.FIELD_INT32, this.leastDecodeToDisplayDelta);
    this._writeData(data, Fields.FIELD_INT32, this.greatestDecodeToDisplayDelta);
    this._writeData(data, Fields.FIELD_INT32, this.compositionStartTime);
    this._writeData(data, Fields.FIELD_INT32, this.compositionEndTime);
    return this.localPos;
  }
}
