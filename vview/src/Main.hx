package ;
import js.Browser;
import haxe.Resource;
class Main {

    public function new() {
        //new Mal(Browser.document.body, Xml.parse(Resource.getString("stats")));
        //var mal = new Mal(Browser.document.body, Xml.parse(Resource.getString("stats")).firstElement().firstElement());
        //mal.addTemplate("tabs");
        //mal.addTemplate("tab", [ "label" => "Stats" ], "tab_main_button", true);
        var uim = new ui.UIManager();
        var window = uim.addWindow(ui.UIManager.WindowType.MAINWINDOW);
        Browser.document.body.appendChild(window);
    }

    static function main() {
        new Main();
    }
}