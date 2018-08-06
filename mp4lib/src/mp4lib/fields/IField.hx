package mp4lib.fields;
import haxe.io.UInt8Array;
interface IField<Type> {
  public function read(buf:UInt8Array, pos:Null<Int>, ?end:Null<Int> = null):Type;
  public function write(buf:UInt8Array, pos:Null<Int>, val:Null<Type>):Int; //return bytes written
  public function getLength(?val:Dynamic = null):Int;
}