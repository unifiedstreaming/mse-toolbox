package mp4lib;
import haxe.io.UInt8Array;
class FileTypeBox extends Box {
  // is a brand identifier iso6 => decimal ASCII value for iso6
  var major_brand:Int = 1769172790; 
  // is an informative integer for the minor version of the major brand
  var minor_brand = 1;
  //is a list, to the end of the box, of brands isom, iso6 and msdh
  var compatible_brands:Array<haxe.Int32> = [ 1769172845,   // => decimal ASCII value for isom
                                              1769172790,   // => decimal ASCII value for iso6
                                              1836278888 ]; // => decimal ASCII value for msdh
                            
  public function new(?size:Int = null) {
      super('ftyp', size);
  }
  
  override public function computeLength() {
      super.computeLength();
      this.size += Fields.FIELD_INT32.getLength() * 2 + Fields.FIELD_INT32.getLength() * this.compatible_brands.length;
  };
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
      this.localPos = pos;
      this.localEnd = end;

      this.major_brand = this._readData(data, Fields.FIELD_INT32);
      this.minor_brand = this._readData(data, Fields.FIELD_INT32);
      this.compatible_brands = this._readArrayData(data, Fields.FIELD_INT32);

      return this.localPos;
  };
  
  override public function write(data, pos):Int {
      super.write(data, pos);

      this._writeData(data, Fields.FIELD_INT32, this.major_brand);
      this._writeData(data, Fields.FIELD_INT32, this.minor_brand);
      this._writeArrayData(data, Fields.FIELD_INT32, this.compatible_brands);

      return this.localPos;
  };
  
}
