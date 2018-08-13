package ;
import js.Browser;
import haxe.Resource;
import haxe.io.UInt8Array;
import js.html.XMLHttpRequest;
import js.html.XMLHttpRequestResponseType;
import Mp4lib;
import uapi.Hooks;
import haxe.io.Path;
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
        var initSegments:Map<Path, mp4lib.MediaHeaderBox> = new Map();
        var frames:Array<js.html.Window> = untyped Browser.window.frames;
        for(f in frames)
            Hooks.hookMethods(Reflect.field(f, "XMLHttpRequest"), ["prototype.open", "prototype.send"]).pipe(function(method, args:Array<Dynamic>){
                var xmlhttpRequest:XMLHttpRequest = js.Lib.nativeThis;
                switch(method){
                    case "prototype.open":
                        var url = new Path(args[1].split("?")[0]);

                        xmlhttpRequest.addEventListener("error", function(e:js.Error){
                            trace(e);
                        });
                        xmlhttpRequest.addEventListener("load", function(){
                            if(xmlhttpRequest.responseType == XMLHttpRequestResponseType.ARRAYBUFFER){
                                var boxes = Mp4lib.deserialize(new UInt8Array(xmlhttpRequest.response));
                                var moov = boxes.findBoxByType("moov");
                                if(moov != null){
                                    //init segment
                                    trace('init segment $url');
                                    initSegments.set(url, cast(boxes.findBoxByType("mdhd"),mp4lib.MediaHeaderBox));
                                    js.Browser.console.log(initSegments.get(url).timescale);
                                }
                                var moof = boxes.findBoxByType("moof");
                                if(moof != null){
                                    trace(boxes);
                                    var sample_duration = cast(boxes.findBoxByType("tfhd"), mp4lib.TrackFragmentHeaderBox).default_sample_duration;
                                    var sample_count = cast(boxes.findBoxByType("trun"), mp4lib.TrackFragmentRunBox).sample_count;
                                    for(k in initSegments.keys()){
                                        
                                        if(url.file.indexOf(k.file) != -1){
                                            js.Browser.console.log(url.file);
                                            var duration = sample_duration * sample_count / initSegments.get(k).timescale;
                                            trace(duration);
                                            break;
                                        }
                                    }
                                }
                                //js.Browser.console.log(boxes.findBoxByType("mdhd"));
                                //js.Browser.console.log(boxes.findBoxByType("tfhd"));
                                //js.Browser.console.log(boxes.findBoxByType("trun"));
                            }
                        });
                    case "prototype.send":
                        
                }
            });
    }

    static function main() {
        new Main();
    }
}