package ui;
import js.Browser;
import haxe.Resource;
import uapi.ui.Mal;
import uapi.ui.UIManager;
import uapi.ui.UIManager.WindowType;

class Shell {

    public function new() {
        var uim = new UIManager();
        var window = uim.addWindow(WindowType.MAINWINDOW);
        
        var window2 = uim.addWindow("aap");
        
        var mal = new Mal(window, Xml.parse(Resource.getString("shell")).firstElement().firstElement());
        mal.addTemplate("tabs");
        mal.addTemplate("tab", [ "label" => "Stats" ]);
        mal.addTemplate("tab", [ "label" => "Debug" ]);
        mal.addTemplate("tab", [ "label" => "Timeline" ], "tab_main_button");
        mal.addTemplate("tab_main");
        mal.addTemplate("right_column_line", [ "label" => "test", "text"=> "aap"]);
        mal.addTemplate("audio_buffer");
        mal.addTemplate("video_buffer");

        Browser.document.body.appendChild(window);
        Browser.document.body.appendChild(window2);

    }
    
}