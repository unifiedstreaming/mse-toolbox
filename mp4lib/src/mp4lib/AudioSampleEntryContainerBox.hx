package mp4lib;
import haxe.io.UInt8Array;
import mp4lib.fields.ArrayField;
class AudioSampleEntryContainerBox extends AudioSampleEntryBox {
  public var boxes:Array<Box> = null;
  public function new(boxType:String, ?size:Int = null) {
    super(boxType, size);
    boxes = [];
  }
  override public function computeLength() {
    super.computeLength();
    for(box in boxes){
        box.computeLength();
        this.size += box.size;
    }
  };
  
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);
    for(box in boxes){
        this.localPos = box.write(data, this.localPos);
    }
    return this.localPos;

  }
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    super.read(data, pos, end);
    var size = 0;
    var uuidFieldPos = 0;
    var uuid = null;
    var boxtype;
    var box;

    while (this.localPos < this.localEnd) {
        // Read box size
        size = Fields.FIELD_UINT32.read(data, this.localPos);

        // Read boxtype
        boxtype = Fields.readString(data, this.localPos + 4, 4);

        // Extented type?
        if (boxtype == "uuid") {
            uuidFieldPos = (size == 1) ? 16 : 8;
            uuid = new ArrayField(Fields.FIELD_INT8, 16).read(data, this.localPos + uuidFieldPos, this.localPos + uuidFieldPos + 16);
            uuid = haxe.Json.stringify(uuid);
        }

        box = Mp4lib.createBox(boxtype, size, uuid);
        if (boxtype == "uuid") {
            this.localPos = box.read(data, this.localPos + Fields.FIELD_INT8.getLength() * 16 + 8, this.localPos + size);
        } else {
            this.localPos = box.read(data, this.localPos + 8, this.localPos + size);
        }

        // in debug mode, sourcebuffer is copied to each box,
        // so any invalid deserializations may be found by comparing
        // source buffer with serialized box
        #if debug
            box.__sourceBuffer = UInt8Array.fromBytes(data.view.sub(this.localPos - box.size, this.localPos).buffer);
        #end

        this.boxes.push(box);

        if (box.size <= 0 || box.size == null) {
            throw ('Problem on size of box ' + box.boxtype +
                ', parsing stopped to avoid infinite loop');
        }

        if (box.boxtype == null) {
            throw ('Problem on unknown box, parsing stopped to avoid infinite loop');
        }
    }
    return this.localPos;
  }
}