package mp4lib;
import haxe.io.UInt8Array;
class HandlerBox extends FullBox {
  public inline static var HANDLERTYPEVIDEO:String = "vide";
  public inline static var HANDLERTYPEAUDIO:String = "soun";
  public inline static var HANDLERTYPETEXT:String = "meta";
  public inline static var HANDLERVIDEONAME:String = "Video Track";
  public inline static var HANDLERAUDIONAME:String = "Audio Track";
  public inline static var HANDLERTEXTNAME:String = "Text Track";
  public var pre_defined:haxe.Int32;
  public var handler_type:haxe.Int32;
  public var reserved:Array<haxe.Int32> = null;
  public var name:String = null;
  
  public function new(?size:Int = null) {
    super('hdlr', size);
  }
  
  override public function computeLength() {
    super.computeLength();
    this.size += Fields.FIELD_UINT32.getLength() * 2 + Fields.FIELD_UINT32.getLength() * 3 + Fields.FIELD_STRING.getLength(this.name);
  };
  
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);
    
    this._writeData(data, Fields.FIELD_UINT32, this.pre_defined);
    this._writeData(data, Fields.FIELD_UINT32, this.handler_type);
    this._writeArrayData(data, Fields.FIELD_UINT32, this.reserved);
    this._writeData(data, Fields.FIELD_STRING, this.name);
    return this.localPos;
  }
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    super.read(data,pos,end);
    this.pre_defined = this._readData(data, Fields.FIELD_UINT32);
    this.handler_type = this._readData(data, Fields.FIELD_UINT32);
    this.reserved = this._readArrayFieldData(data, Fields.FIELD_UINT32, 3);
    this.name = this._readData(data, Fields.FIELD_STRING);
    return this.localPos;
  }
}
