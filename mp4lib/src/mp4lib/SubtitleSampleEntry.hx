package mp4lib;
import haxe.io.UInt8Array;
class SubtitleSampleEntry extends Box {
  
  public var namespace:String = null;
  public var schema_location:String = null;
  public var auxiliary_mime_types:String = null;
  
  public function new(size:Int) {
    super('stpp', size);
  }
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
      this.localPos = pos;
      this.localEnd = end;
      
      this.namespace = this._readData(data, Fields.FIELD_STRING_UTF8);
      this.schema_location = this._readData(data, Fields.FIELD_STRING_UTF8);
      this.auxiliary_mime_types = this._readData(data, Fields.FIELD_STRING_UTF8);

      return this.localEnd;
  };
  
  override public function write(data:UInt8Array, pos:Int):Int {
      super.write(data, pos);
      this._writeData(data, Fields.FIELD_STRING_UTF8, this.namespace);
      this._writeData(data, Fields.FIELD_STRING_UTF8, this.schema_location);
      this._writeData(data, Fields.FIELD_STRING_UTF8, this.auxiliary_mime_types);

      return this.localPos;
  };
  
  override public function computeLength():Void {
      super.computeLength();
      this.size  += Fields.FIELD_STRING_UTF8.getLength(this.namespace) + Fields.FIELD_STRING_UTF8.getLength(this.schema_location) + Fields.FIELD_STRING_UTF8.getLength(this.auxiliary_mime_types);
  };
}


