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
        var window2 = uim.addWindow("aap");

        var mal = new Mal(window, Xml.parse(Resource.getString("stats")).firstElement().firstElement());
        mal.addTemplate("tabs");
        mal.addTemplate("tab", [ "label" => "Stats" ]);
        mal.addTemplate("tab", [ "label" => "Debug" ]);
        mal.addTemplate("tab", [ "label" => "Timeline" ], "tab_main_button");
        mal.addTemplate("tab_main");
        mal.addTemplate("right_column_line", [ "label" => "test", "text"=> "aap"]);
        mal.addTemplate("audio_buffer");
        mal.addTemplate("video_buffer");

        Browser.document.body.appendChild(window);

        documentReady(js.Browser.window) ? 
            hookFrames() : 
            Browser.window.addEventListener("load", hookFrames);
    }

    function hookFrames(?e:js.html.Event){
        var frames:Array<js.html.Window> = untyped Browser.window.frames;
        for(f in frames)
            if(documentReady(f))
                hookWindow(f);
            else
                f.addEventListener("load", function(e:js.html.Event){
                    hookWindow(f);
                });
    }

    function documentReady(window:js.html.Window):Bool
        return switch(window.document.readyState){
            case "interactive" | "complete": true;
            default: false;
        }

    function setCachePropery(obj:Dynamic, key:String, value:Dynamic, ?cache_id = "_vview"){
        var cache = if(Reflect.hasField(obj, cache_id))
            try{ haxe.Unserializer.run( Reflect.field(obj, cache_id)); } catch(e:Dynamic){ {}; };
        else
            {};
        Reflect.setField(cache, key, value);
        Reflect.setField(obj, cache_id, haxe.Serializer.run(cache));
    }

    function getCachePropery(obj:Dynamic, key:String, ?cache_id = "_vview")
        return if(Reflect.hasField(obj, cache_id)){
            try{ Reflect.field(haxe.Unserializer.run( Reflect.field(obj, cache_id)), key); } catch(e:Dynamic){ null; };
        }else{
            null;
        }

    function hookWindow(window:js.html.Window) : Void {
        var initSegments:Map<Path, mp4lib.MediaHeaderBox> = new Map();

        Hooks.hookMethod(window, "URL.createObjectURL").pipe(function(args:Array<Dynamic>){
            Browser.console.log(11);
            if(args.length > 0)
                js.Browser.console.log(Std.is(args[0], js.html.MediaSource));
        });
        Hooks.hookMethods(Reflect.field(window, "XMLHttpRequest"), ["prototype.open", "prototype.send"]).pipe(function(method, args:Array<Dynamic>){
            var xmlhttpRequest:XMLHttpRequest = js.Lib.nativeThis;
            switch(method){
                case "prototype.open":
                    var url = new Path(args[1].split("?")[0]);

                    xmlhttpRequest.addEventListener("error", function(e:js.Error){
                        trace(e);
                    });
                    xmlhttpRequest.addEventListener("load", function(){
                        if(xmlhttpRequest.responseType == XMLHttpRequestResponseType.ARRAYBUFFER){
                            setCachePropery(xmlhttpRequest.response, "url", url);
                            var boxes = Mp4lib.deserialize(new UInt8Array(xmlhttpRequest.response));
                            var moov = boxes.findBoxByType("moov");
                            if(moov != null){
                                //init segment
                                trace('init segment $url');
                                initSegments.set(url, cast(boxes.findBoxByType("mdhd"),mp4lib.MediaHeaderBox));
                                js.Browser.console.log('mdhd.duration: ${initSegments.get(url).duration} mdhd.timescale: ${initSegments.get(url).timescale}');
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
                            var mvhd:mp4lib.MovieHeaderBox = cast boxes.findBoxByType("mvhd");
                            if(mvhd != null){
                                trace('MovieHeaderBox.duration/timescale: ${mvhd.duration / mvhd.timescale}'); 
                            }
                            var sidx:mp4lib.SegmentIndexBox = cast boxes.findBoxByType("sidx");
                            if(sidx != null){
                                trace('SegmentIndexBox.earliest_presentation_time/timescale: ${sidx.earliest_presentation_time / sidx.timescale}');
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