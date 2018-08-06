package mp4lib;
import haxe.io.UInt8Array;

class ContainerFullBox extends FullBox{
  public var boxes:Array<Box> = null;
  public var entry_count:Int = 0;
  private var isEntryCount:Bool;

  public function new(boxType:String, size:Int = null, ?isEntryCount:Bool = false) {
    super(boxType, size);
    this.isEntryCount = isEntryCount;
    boxes = [];
  }
  
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);

    if (isEntryCount) {
        this._writeData(data, Fields.FIELD_UINT32, this.entry_count);
    }

    for (i in 0 ... this.boxes.length) {
        this.localPos = this.boxes[i].write(data, this.localPos);
    }

    return this.localPos;
  };
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    super.read(data, pos, end);
       var size = 0;
       var uuidFieldPos = 0;
       var uuid = null;
       var boxtype;
       var box;

       if (isEntryCount) {
           this.entry_count = this._readData(data, Fields.FIELD_UINT32);
       }

       while (this.localPos < this.localEnd) {
           // Read box size
           size = Fields.FIELD_UINT32.read(data, this.localPos);

           // Read boxtype
           boxtype = Fields.readString(data, this.localPos + 4, 4);

           // Extented type?
           if (boxtype == "uuid") {
               uuidFieldPos = (size == 1) ? 16 : 8;
               uuid = new mp4lib.fields.ArrayField(Fields.FIELD_INT8, 16).read(data, this.localPos + uuidFieldPos, this.localPos + uuidFieldPos + 16);
               uuid = haxe.Json.stringify(uuid);
           }

           box = Mp4lib.createBox(boxtype, size, uuid);
           if (boxtype == "uuid") {
               this.localPos = box.read(data, this.localPos + Fields.FIELD_INT8.getLength() * 16 + 8, this.localPos + size);
               uuid = null;
           } else {
               this.localPos = box.read(data, this.localPos + 8, this.localPos + size);
           }

           // in debug mode, sourcebuffer is copied to each box,
           // so any invalid deserializations may be found by comparing
           // source buffer with serialized box
           #if debug
               box.__sourceBuffer = UInt8Array.fromBytes(data.view.sub(this.localPos - box.size, this.localPos).buffer);
           #end

           if (box.boxtype != null) {
               this.boxes.push(box);
           }

           if (box.size <= 0 || box.size == null) {
               throw ('Problem on size of box ' + box.boxtype +
                   ', parsing stopped to avoid infinite loop');
           }
       }

       return this.localPos;
  };
  
  override public function computeLength() {
    super.computeLength();
    if (isEntryCount) {
        this.size += Fields.FIELD_UINT32.getLength();
    }

    for (i in 0...this.boxes.length) {
        this.boxes[i].computeLength();
        this.size += this.boxes[i].size;
    }
  }
}
