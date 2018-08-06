package mp4lib;
class EncryptedVideoBox extends VisualSampleEntryContainerBox{
  public function new(?size:Int=null) {
    super('encv', size);
  }
}
