package mp4lib;
import haxe.io.UInt8Array;

//Microsoft Smooth Streaming specific
class PiffTrackEncryptionBox extends FullBox {

  public function new(?size:Int = null) {
    super('tepiff', size, UInt8Array.fromArray([0x89, 0x74, 0xDB, 0xCE, 0x7B, 0xE7, 0x4C, 0x51, 0x84, 0xF9, 0x71, 0x48, 0xF9, 0x88, 0x25, 0x54]));
  }
  
}
