package mp4lib;
class NullMediaHeaderBox extends FullBox {

  public function new(?size:Int = null) {
    super('nmhd', size);
  }

}
