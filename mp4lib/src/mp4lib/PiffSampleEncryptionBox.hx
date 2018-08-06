package mp4lib;
import haxe.io.UInt8Array;
typedef ClearAndCryptedStruct = {
  var BytesOfClearData:Null<Int>;
  var BytesOfEncryptedData:Null<haxe.Int32>;
}

typedef PiffEntryStruct = {
  var InitializationVector:UInt8Array;
  var NumberOfEntries:Null<Int>;
  var clearAndCryptedData:Array<ClearAndCryptedStruct>;
}

//Microsoft Smooth Streaming specific
class PiffSampleEncryptionBox extends FullBox{
  public var entry:Array<PiffEntryStruct>;
  public var sample_count:haxe.Int32;
  public var IV_size:Int;
  public function new(?size:Int = null) {
    super('sepiff', size, UInt8Array.fromArray([0xA2, 0x39, 0x4F, 0x52, 0x5A, 0x9B, 0x4F, 0x14, 0xA2, 0x44, 0x6C, 0x42, 0x7C, 0x64, 0x8D, 0xF4]));
  }
  
  override public function computeLength() {
    super.computeLength();

    this.size += Fields.FIELD_UINT32.getLength(); //sample_count size
    if (this.flags & 1 > 0) {
        this.size += Fields.FIELD_UINT8.getLength(); //IV_size size
    }
    for (i in 0...this.sample_count) {
        this.size += 8; // InitializationVector size
        if (this.flags & 2 > 0) {
            this.size += Fields.FIELD_UINT16.getLength(); // NumberOfEntries size
            for (j in 0...this.entry[i].NumberOfEntries) {
                this.size += Fields.FIELD_UINT16.getLength(); //BytesOfClearData size
                this.size += Fields.FIELD_UINT32.getLength(); //BytesOfEncryptedData size
            }
        }
    }
  };
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    super.read(data,pos,end);
    
    this.sample_count = this._readData(data, Fields.FIELD_UINT32);
    if (this.flags & 1 > 0) {
        this.IV_size = this._readData(data, Fields.FIELD_UINT8);
    }
    this.entry = [];
    for (i in 0...this.sample_count) {
        var struct:PiffEntryStruct = { clearAndCryptedData: null, NumberOfEntries:null, InitializationVector:null  };
        struct.InitializationVector = UInt8Array.fromBytes(data.view.sub(this.localPos, this.localPos + 8).buffer);
        this.localPos += 8; //InitializationVector size

        if (this.flags & 2 > 0) {
            struct.NumberOfEntries = this._readData(data, Fields.FIELD_UINT16); // NumberOfEntries
            struct.clearAndCryptedData = [];
            for (j in 0...struct.NumberOfEntries) {
                var clearAndCryptedStruct:ClearAndCryptedStruct = { BytesOfEncryptedData: null, BytesOfClearData:null };
                clearAndCryptedStruct.BytesOfClearData = this._readData(data, Fields.FIELD_UINT16); //BytesOfClearData
                clearAndCryptedStruct.BytesOfEncryptedData = this._readData(data, Fields.FIELD_UINT32); //BytesOfEncryptedData size
                struct.clearAndCryptedData.push(clearAndCryptedStruct);
            }
        }
        this.entry.push(struct);
    }
    return this.localPos;
  }
  
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);

    this._writeData(data, Fields.FIELD_UINT32, this.sample_count);
    if (this.flags & 1 > 0) {
        this._writeData(data, Fields.FIELD_UINT8, this.IV_size);
    }
    for (i in 0...this.sample_count) {
        this._writeBuffer(data, this.entry[i].InitializationVector, 8);

        if (this.flags & 2 > 0) {
            this._writeData(data, Fields.FIELD_UINT16, this.entry[i].NumberOfEntries); // NumberOfEntries
            for (j in 0...this.entry[i].NumberOfEntries) {
                this._writeData(data, Fields.FIELD_UINT16, this.entry[i].clearAndCryptedData[j].BytesOfClearData); //BytesOfClearData
                this._writeData(data, Fields.FIELD_UINT32, this.entry[i].clearAndCryptedData[j].BytesOfEncryptedData); //BytesOfEncryptedData size
            }
        }
    }
    return this.localPos;
  }
}
