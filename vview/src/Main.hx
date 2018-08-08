package ;
import js.Browser;
import haxe.Resource;
class Main {

    public function new() {
        //new Mal(Browser.document.body, Xml.parse(Resource.getString("stats")));
        var uim = new ui.UIManager();
        var window = uim.addWindow(ui.UIManager.WindowType.MAINWINDOW);

        var mal = new Mal(window, Xml.parse(Resource.getString("stats")).firstElement().firstElement());
        mal.addTemplate("tabs");
        
        mal.addTemplate("tab", [ "label" => "Stats" ]);
        mal.addTemplate("tab", [ "label" => "Debug" ]);
        mal.addTemplate("tab", [ "label" => "Timeline" ], "tab_main_button");
        

        Browser.document.body.appendChild(window);
        var frames:Array<js.html.Window> = untyped Browser.window.frames;
        for(f in frames)
            Hooks.hookMethod(Reflect.field(f, "XMLHttpRequest"), "prototype.open").pipe(function(args:Array<Dynamic>){
                Browser.console.log(js.Lib.nativeThis, "hook" + args);
            });
    }

    static function main() {
        new Main();
    }
}