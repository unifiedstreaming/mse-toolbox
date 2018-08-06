package mp4lib;
import haxe.Int64;
import haxe.io.UInt8Array;
import mp4lib.fields.IField;

class ContainerBox extends Box{
  public var boxes:Array<Box> = null;

  public function new(boxType:String = null, size:Int = null, uuid:UInt8Array = null, largesize:Int = null) {
    super(boxType, size, uuid);
    boxes = [];
  }
  
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);

    for (i in 0...this.boxes.length) {
      //TODO: check
      //trace('${Type.getClassName(Type.getClass(this.boxes[i]))}\t->\tcheck');
      
        this.localPos = this.boxes[i].write(data, this.localPos);
        //trace(data.view.buffer.toHex());
    }

    return this.localPos;
  };
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
      var size = 0;
      var uuidFieldPos = 0;
      var uuid = null;
      var boxtype;
      var box;

      while (pos < end) {
          // Read box size
          size = Fields.FIELD_UINT32.read(data, pos);

          // Read boxtype
          boxtype = Fields.readString(data, pos + 4, 4);

          // Extented type?
          if (boxtype == "uuid") {
              uuidFieldPos = (size == 1) ? 16 : 8;
              uuid = new mp4lib.fields.ArrayField(Fields.FIELD_INT8, 16).read(data, pos + uuidFieldPos, pos + uuidFieldPos + 16);
              uuid = haxe.Json.stringify(uuid);
          }

          box = Mp4lib.createBox(boxtype, size, uuid);
          if (boxtype == "uuid") {
              pos = box.read(data, pos + Fields.FIELD_INT8.getLength() * 16 + 8, pos + size);
              uuid = null;
          } else {
              pos = box.read(data, pos + 8, pos + size);
          }

          // in debug mode, sourcebuffer is copied to each box,
          // so any invalid deserializations may be found by comparing
          // source buffer with serialized box
          #if debug
              box.__sourceBuffer = UInt8Array.fromBytes(data.view.sub(pos - box.size, pos).buffer);
          #end
          
          //if boxtype is unknown, don't add it to the list box
          if (box.boxtype != null) {
              this.boxes.push(box);
          }

          if (box.size <= 0 || box.size == null) {
              throw ('Problem on size of box ' + box.boxtype +
                  ', parsing stopped to avoid infinite loop');
          }
      }

      return pos;
  };
  
  override public function computeLength() {
      super.computeLength();
      var i = 0;
      for (i in 0...this.boxes.length) {
          this.boxes[i].computeLength();
          this.size += this.boxes[i].size;
      }
  }
}
