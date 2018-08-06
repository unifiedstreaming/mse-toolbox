package mp4lib;
import haxe.io.UInt8Array;
//Microsoft Smooth Streaming specific
class PiffProtectionSystemSpecificHeaderBox extends FullBox {

  public function new(?size:Int = null) {
    super('psshpiff', size, UInt8Array.fromArray([0xD0, 0x8A, 0x4F, 0x18, 0x10, 0xF3, 0x4A, 0x82, 0xB6, 0xC8, 0x32, 0xD8, 0xAB, 0xA1, 0x83, 0xD3]));
  }
  
}
