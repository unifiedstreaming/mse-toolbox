package mp4lib;
import haxe.io.UInt8Array;
typedef NAL_DATA = {
  var NAL_length:Null<Int>;
  var NAL:UInt8Array;
}
typedef NalArray = Array<NAL_DATA>;

//TODO
class AVCConfigurationBox extends Box {
  
  public var SPS_NAL:NalArray = null;
  public var PPS_NAL:NalArray = null;
  public var numOfSequenceParameterSets:Null<Int> = null;
  public var numOfPictureParameterSets:Null<Int> = null;
  
  public var AVCLevelIndication:Null<Int> = null;
  public var AVCProfileIndication:Null<Int> = null;
  public var profile_compatibility:Null<Int> = null;
  public var configurationVersion:Null<Int> = null;
  public var lengthSizeMinusOne:Null<Int> = null;
  
  private var temp:Null<Int> = null;
  private var numOfSequenceParameterSets_tmp:Null<Int> = null;
  
  public function new(?size:Int = null) {
    super('avcC', size);
  }
  
  override public function computeLength() {
      super.computeLength();
      this.size += (Fields.FIELD_UINT8.getLength() * 4) + (Fields.FIELD_UINT8.getLength() * 3);
      this.size += this._getNALLength(this.numOfSequenceParameterSets, this.SPS_NAL);
      this.size += this._getNALLength(this.numOfPictureParameterSets, this.PPS_NAL);
  };
  
  override public function write(data:UInt8Array, pos:Int):Int {
    super.write(data, pos);

    this._writeData(data, Fields.FIELD_UINT8, this.configurationVersion);
    this._writeData(data, Fields.FIELD_UINT8, this.AVCProfileIndication);
    this._writeData(data, Fields.FIELD_UINT8, this.profile_compatibility);
    this._writeData(data, Fields.FIELD_UINT8, this.AVCLevelIndication);

    this.temp = this.lengthSizeMinusOne | 252;
    this._writeData(data, Fields.FIELD_UINT8, this.temp);
    this.numOfSequenceParameterSets = this.SPS_NAL.length;
    this.numOfSequenceParameterSets_tmp = this.numOfSequenceParameterSets | 224;
    this._writeData(data, Fields.FIELD_UINT8, this.numOfSequenceParameterSets_tmp);
    this._writeNAL(data, this.numOfSequenceParameterSets, this.SPS_NAL);
    this._writeData(data, Fields.FIELD_UINT8, this.numOfPictureParameterSets);
    this._writeNAL(data, this.numOfPictureParameterSets, this.PPS_NAL);
    return this.localPos;
  };
  
  override public function read(data:UInt8Array, pos:Int, ?end:Int = null):Int {
    //TODO super.read?
      this.localPos = pos;
      this.localEnd = end;
      this.configurationVersion   = this._readData(data, Fields.FIELD_UINT8);
      this.AVCProfileIndication   = this._readData(data, Fields.FIELD_UINT8);
      this.profile_compatibility  = this._readData(data, Fields.FIELD_UINT8);
      this.AVCLevelIndication     = this._readData(data, Fields.FIELD_UINT8);

      this.temp = this._readData(data, Fields.FIELD_UINT8);
      // 6 bits for reserved =63 and two bits for NAL length = 2-bit length byte size type
      this.lengthSizeMinusOne = this.temp & 3;
      this.numOfSequenceParameterSets_tmp = this._readData(data, Fields.FIELD_UINT8);
      this.numOfSequenceParameterSets = this.numOfSequenceParameterSets_tmp & 31;

      this.SPS_NAL = this._readNAL(data, this.numOfSequenceParameterSets);

      this.numOfPictureParameterSets = this._readData(data, Fields.FIELD_UINT8);

      this.PPS_NAL = this._readNAL(data, this.numOfPictureParameterSets);
      return this.localPos;
  };
  
  private function _getNALLength(nbElements, nalArray):Int {
      var size_NAL = 0;

      for (i in 0...nbElements) {
          size_NAL += Fields.FIELD_UINT16.getLength() + nalArray[i].NAL_length;
      }

      return size_NAL;
  };
  
  private function _readNAL(data:UInt8Array, nbElements:Int):NalArray {
      var nalArray:NalArray = new NalArray();
      var struct:NAL_DATA = null;

      for (i in 0...nbElements) {
          struct = {
            NAL_length: null,
            NAL: null
          };

          struct.NAL_length = this._readData(data, Fields.FIELD_UINT16);
          struct.NAL = UInt8Array.fromBytes(data.view.sub(this.localPos, this.localPos + struct.NAL_length).buffer);
          this.localPos += struct.NAL_length;
          nalArray.push(struct);
      }
      return nalArray;
  };
  
  private function _writeNAL(data:UInt8Array, nbElements:Int, nalArray:NalArray):Void {
      for (i in 0...nbElements) {
          this._writeData(data, Fields.FIELD_UINT16, nalArray[i].NAL_length);
          this._writeBuffer(data, nalArray[i].NAL, nalArray[i].NAL_length);
      }
  };
}
