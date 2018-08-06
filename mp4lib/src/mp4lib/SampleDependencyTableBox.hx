package mp4lib;
import haxe.io.UInt8Array;
class SampleDependencyTableBox extends FullBox {
  public var sample_dependency_table:Array<Int>;
  public function new(?size:Int = 0) {
    super('sdtp', size);
  }
  
  override public function computeLength() {
    super.computeLength();
    this.size += Fields.FIELD_UINT8.getLength() * this.sample_dependency_table.length;
  };
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);
    
    this._writeArrayData(data, Fields.FIELD_UINT8, this.sample_dependency_table);
    return this.localPos;
  }
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    super.read(data,pos,end);
    
    this.sample_dependency_table = this._readArrayData(data, Fields.FIELD_UINT8);
    return this.localPos;
  }
  
}
