package mp4lib;
class MediaInformationBox extends ContainerBox {

  public function new(?size:Int=null) {
    super('minf', size);
  }
  
}