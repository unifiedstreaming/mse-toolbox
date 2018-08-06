package mp4lib;
import haxe.io.UInt8Array;
class Fields {
  public static function readBytes(buf:UInt8Array, pos:Int, nbBytes:Int):Int {
      var value = 0;
      for (i in 0...nbBytes) {
          value = value << 8;
          value = value + buf[pos];
          pos++;
      }
      return value;
  };

  public static function writeBytes(buf:UInt8Array, pos:Int, nbBytes:Int, value:Int):Int {
      for (i in 0...nbBytes) {
          buf[pos + nbBytes - i - 1] = value & 0xFF;
          value = value >> 8;
      }
      return nbBytes;
  };
  
  public static function readString(buf:UInt8Array, pos:Int, len:Int):String {
      return buf.view.buffer.getString(pos,len);
  }
  
  public static var FIELD_INT8 = new mp4lib.fields.NumberField(8, true);
  public static var FIELD_INT16 = new mp4lib.fields.NumberField(16, true);
  public static var FIELD_INT32 = new mp4lib.fields.NumberField(32, true);
  
  public static var FIELD_UINT8 = new mp4lib.fields.NumberField(8, false);
  public static var FIELD_UINT16 = new mp4lib.fields.NumberField(16, false);
  public static var FIELD_UINT32 = new mp4lib.fields.NumberField(32, false);
  
  public static var FIELD_BIT8 = new mp4lib.fields.NumberField(8, false);
  public static var FIELD_BIT16 = new mp4lib.fields.NumberField(16, false);
  public static var FIELD_BIT24 = new mp4lib.fields.NumberField(24, false);
  public static var FIELD_BIT32 = new mp4lib.fields.NumberField(32, false);
  
  public static var FIELD_INT64 = new mp4lib.fields.LongNumberField();
  public static var FIELD_UINT64 = new mp4lib.fields.LongNumberField();
  
  public static var FIELD_ID = new mp4lib.fields.BoxTypeField();
  public static var FIELD_STRING = new mp4lib.fields.StringField();

  public static var FIELD_STRING_UTF8 = new mp4lib.fields.StringField(true);
}
