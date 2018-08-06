package mp4lib;
class MP4AudioSampleEntryBox extends AudioSampleEntryContainerBox{

  public function new(?size:Int = null) {
    super('mp4a', size);
  }
  
}
