package mp4lib;
import haxe.io.UInt8Array;
import mp4lib.fields.IField;

class Box {
  public var size:Null<Int>;
  public var boxtype:String;
  public var extended_type:UInt8Array;
  public var largesize:Null<Int>;
  public var localPos:Null<Int>;
  public var localEnd:Null<Int>;
  
  #if debug
  public var __sourceBuffer:UInt8Array;
  #end

  public function new(boxType:String = null, size:Int = null, uuid:UInt8Array = null, largesize:Int = null) {
    this.size = size;
    this.boxtype = boxType;
    //large size management to do...
    if (this.size == 1 && largesize != null) {
        this.largesize = largesize;
    }

    if (uuid != null) {
        this.extended_type = uuid;
    }

    this.localPos = 0;
    this.localEnd = 0;
  }
  
  public function write(data:UInt8Array, pos:Int):Int {
      localPos = pos;

      _writeData(data, Fields.FIELD_UINT32, this.size);
      //if extended_type is not defined, boxtype must have this.boxtype value
      if (this.extended_type == null) {
          this._writeData(data, Fields.FIELD_ID, this.boxtype);
      } else { //if extended_type is defined, boxtype must have 'uuid' value
          this._writeData(data, Fields.FIELD_ID, 'uuid');
      }

      if (this.size == 1) {
          this._writeData(data, Fields.FIELD_INT64, this.largesize);
      }

      if (this.extended_type != null) {
          for (i in 0...16) {
              this._writeData(data, Fields.FIELD_INT8, this.extended_type[i]);
          }
      }
      return localPos;
  };
  
  public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    throw "not implemented!";
    return 0;
  }
  
  public function computeLength() {
    this.size = Fields.FIELD_UINT32.getLength() + Fields.FIELD_ID.getLength(); //size and boxtype length

    if (this.extended_type != null) {
        this.size += Fields.FIELD_INT8.getLength() * 16; //add extended_type length.
    }
  };
  
  public function getBoxByType(boxType:String):Box {
      var boxarr:Array<Box> = Reflect.field(this,'boxes');
      if (boxarr != null) {
          for (box in boxarr) {
              if (box.boxtype == boxType) {
                  return box;
              }
          }
      }
      return null;
  };
  
  public function getAllBoxes():Array<Box>
    return getBoxesByType();

  public function getBoxesByType(?boxType:String):Array<Box> {
    var retval:Array<Box> = [];
    var boxarr:Array<Box> = Reflect.field(this,'boxes');
    if (boxarr != null) {
        for (box in boxarr) {
            if (boxType == null || box.boxtype == boxType) {
                retval.push(box);
            }
        }
    }
    return retval;
  }
  
  public function getBoxIndexByType(boxType:String):Null<Int> {
      var index = 0;
        
      var boxarr:Array<Box> = Reflect.field(this,'boxes');
      if (boxarr != null) {
          for (box in boxarr) {
              if (box.boxtype == boxType) {
                  return index;
              }
              index++;
          }
      }
      return null;
  };
  
  public function removeBoxByType(boxType:String):Void {
    var boxarr:Array<Box> = Reflect.field(this,'boxes');
    if (boxarr != null) {
       for (i in boxarr.length...0) {
           if (boxarr[i].boxtype == boxType) {
               boxarr.splice(i, 1);
           }
       }
    } else {
       throw('' + this.boxtype + 'does not have ' + boxType + ' box, impossible to remove it');
    }
  }
  
  public function _readData(data:UInt8Array, dataType:IField<Dynamic>){
    var retval = dataType.read(data, this.localPos, this.localEnd);
    this.localPos += dataType.getLength(retval);
    return retval;
  }
  
  public function _readArrayData<T>(data, dataArrayType:IField<Dynamic>):Array<T> {
    var array = [];
    var dataArrayTypeLength = dataArrayType.getLength();
    var size = Math.floor((this.localEnd - this.localPos) / dataArrayTypeLength);

    for (i in 0...size) {
        array.push(dataArrayType.read(data, this.localPos));
        this.localPos += dataArrayTypeLength;
    }
    return array;
  };
  
  public function _writeArrayData(data, dataArrayType:IField<Dynamic>, array:Array<Dynamic>) {
      if (array == null || array.length == 0) {
          throw ('an array to write is null, undefined or length = 0 for box : ' + this.boxtype);
      }

      for (i in 0 ... array.length) {
          this._writeData(data, dataArrayType, array[i]);
      }
  };
  
  public function _readArrayFieldData<T>(data:UInt8Array, dataArrayType:IField<Dynamic>, arraySize:Int):Array<T> {
      var innerFieldLength = -1;
      var array = new Array<T>();
      for (i in 0...arraySize) {

          array.push(dataArrayType.read(data, this.localPos));

          if (innerFieldLength == -1) {
              innerFieldLength = dataArrayType.getLength(array[i]);
          }
          // it may happen that the size of field depends on the box flags,
          // we need to count is having box and first structure constructed

          this.localPos += innerFieldLength;
      }
      return array;
  };
  
  public function _writeData(data:UInt8Array, dataType:IField<Dynamic>, dataField:Dynamic = null, ?p:haxe.PosInfos):Int {
      #if debug
        //trace('${Type.getClassName(Type.getClass(this))}\t->\t_writeData()\t->\t${Type.getClassName(Type.getClass(dataType))} ->  dataField[$dataField]');
        //trace(haxe.CallStack.toString(haxe.CallStack.callStack()));
      #end
      
      if (dataField == null) {
        #if debug
        untyped __js__("debugger;");
        #end
        throw '${p.fileName}:${p.lineNumber}:\n\ta field to write is null or undefined for box : ' + this.boxtype; //mp4lib.ParseException('a field to write is null or undefined for box : ' + this.boxtype);
      } else {
          dataType.write(data, this.localPos, dataField);
          this.localPos += dataType.getLength(dataField);
          #if debug
          //trace(pos);
          #end
      }
      return this.localPos;
  };
  
  public function _writeBuffer(data:UInt8Array, dataField:UInt8Array, size:Int):Void {
      #if js
        //for js this is probably faster:
        data.getData().set(cast dataField, this.localPos);
      #else 
        for(i in 0...dataField.length){
          data.set(this.localPos + i, dataField[i]);
        }
      #end
      
      this.localPos += size;
  }
}
