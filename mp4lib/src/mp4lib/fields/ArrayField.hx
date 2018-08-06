package mp4lib.fields;
import haxe.io.UInt8Array;

class ArrayField implements IField<Null<Dynamic>> {
  var innerField:IField<Dynamic>;
  var size:Int;
  
  public function new(innerField:IField<Dynamic>, size:Int){
    this.innerField = innerField;
    this.size = size;
  }
  
  public function read(buf:UInt8Array, pos:Null<Int>, ?end:Null<Int> = null):Dynamic {
      var innerFieldLength = -1;
      var res = [];
      for (i in 0...this.size) {

          res.push(this.innerField.read(buf, pos));

          if (innerFieldLength == -1) {
              innerFieldLength = this.innerField.getLength(res[i]);
          }
          
          // TODO: it may happen that the size of field depends on the box flags, 
          // TODO: we need to count is having box and first structure constructed
          pos += innerFieldLength;
      }
      return res;
  };
  public function write(buf:UInt8Array, pos:Null<Int>, val:Null<Dynamic>):Int { throw "not implemented"; return -1; }; //return bytes written
  public function getLength(?val:Dynamic = null):Int{ throw "not implemented"; };
}