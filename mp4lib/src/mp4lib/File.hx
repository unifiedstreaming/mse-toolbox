package mp4lib;
import haxe.io.UInt8Array;
class File {
  public var boxes:Array<Box> = null;
  public function new() {
    boxes = [];
    
  }
  
  public function getBoxByType(boxType:String) {
    for (box in this.boxes) {
        if (box.boxtype == boxType) {
            return box;
        }
    }
    return null;
  };

  public function findBoxByType(boxType:String) {
    var walk = null;
    walk = function(boxes:Array<Box>){
        for (box in boxes) {
            if (box.boxtype == boxType) {
                return box;
            }else if(Reflect.hasField(box, "boxes")){
                var res = walk(Reflect.field(box, "boxes"));
                if(res != null) return res;
            }
        }
        return null;
    }
    return walk(this.boxes);
  }
  
  public function getLength() {
      var length = 0;

      for (box in boxes) {
          box.computeLength();
          length += box.size;
      }

      return length;
  };
  
  public function write(data) {
    var pos = 0;
    for (i in 0...this.boxes.length) {
        pos = this.boxes[i].write(data, pos);
    }
  };
  
  public function read(data:UInt8Array):Void {
    var size = 0;
    var boxtype:String = null;
    var uuidFieldPos = 0;
    var uuid = null;
    var pos = 0;
    var end = data.length;
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
  }
  
}
