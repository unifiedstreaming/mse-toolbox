package ;
import js.Browser;
import haxe.io.UInt8Array;
import js.html.XMLHttpRequest;
import js.html.XMLHttpRequestResponseType;
import Mp4lib;
import uapi.Hooks;
import haxe.io.Path;
import uapi.JsUtils;

@:enum
abstract VideoType(String) {
  var Audio = "Audio";
  var Video = "Video";
}
typedef StreamingVideoSegment = {
    ?url:String,
    ?start:Float,
    ?end:Float,
    ?duration:Float,
    ?data:Void->haxe.io.Bytes,
    ?init:Void->haxe.io.Bytes,
    ?type:VideoType
}
class Main {
    var shell:ui.Shell;
    var segments:Array<StreamingVideoSegment> = [];
    
    static function __init__() untyped {
        
    }
    public function new() {
        shell = new ui.Shell();
        documentReady(js.Browser.window) ? 
            hookFrames() : 
            Browser.window.addEventListener("load", hookFrames);
        
        //Macros.reuseScope("../uapi/scope.txt", "uapi");
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
            if(args.length > 0)
                js.Browser.console.log(Std.is(args[0], js.html.MediaSource));
        });
        Hooks.hookMethods(Reflect.field(window, "XMLHttpRequest"), ["prototype.open", "prototype.send"]).pipe(function(method, args:Array<Dynamic>){
            var xmlhttpRequest:XMLHttpRequest = js.Lib.nativeThis;
            switch(method){
                case "prototype.open":
                    var segment:StreamingVideoSegment = {};
                    var url = new Path(segment.url = args[1].split("?")[0]);
                    
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
                                segment.init = xmlhttpRequest.response;
                                trace('init segment $url');
                                initSegments.set(url, cast(boxes.findBoxByType("mdhd"),mp4lib.MediaHeaderBox));
                                js.Browser.console.log('mdhd.duration: ${initSegments.get(url).duration} mdhd.timescale: ${initSegments.get(url).timescale}');
                            }
                            var sidx:mp4lib.SegmentIndexBox = cast boxes.findBoxByType("sidx");
                            if(sidx != null){
                                trace('SegmentIndexBox.earliest_presentation_time/timescale: ${sidx.earliest_presentation_time / sidx.timescale}');
                                segment.start = sidx.earliest_presentation_time / sidx.timescale;
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
                                        segment.end = segment.start + duration;
                                        segment.duration = duration;
                                        break;
                                    }
                                }
                            }
                            
                            var mvhd:mp4lib.MovieHeaderBox = cast boxes.findBoxByType("mvhd");
                            if(mvhd != null){
                                trace('MovieHeaderBox.duration/timescale: ${mvhd.duration / mvhd.timescale}'); 
                            }

                            segments.push(segment);
                            trace(segment);
                            
                            

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