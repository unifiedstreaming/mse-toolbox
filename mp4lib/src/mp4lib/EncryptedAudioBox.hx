package mp4lib;
class EncryptedAudioBox extends AudioSampleEntryContainerBox{

  public function new(?size:Int = null) {
    super('enca', size);
  }
  
}
