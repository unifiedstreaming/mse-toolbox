package ;
import mp4lib.TrackFragmentHeaderBox;
import mp4lib.HintMediaHeaderBox;
import mp4lib.MPEG4BitRateBox;
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
    ?type:VideoType,
    ?avgbitrate:Int,
    ?dimensions:String
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

    function setCachePropery(obj:Dynamic, key:String, value:Dynamic, ?cache_id = "_vview_cache"){
        var cache = if(Reflect.hasField(obj, cache_id))
            try{ haxe.Unserializer.run( Reflect.field(obj, cache_id)); } catch(e:Dynamic){ {}; };
        else
            {};
        Reflect.setField(cache, key, value);
        Reflect.setField(obj, cache_id, haxe.Serializer.run(cache));
    }

    function getCachePropery(obj:Dynamic, key:String, ?cache_id = "_vview_cache")
        return if(Reflect.hasField(obj, cache_id)){
            try{ Reflect.field(haxe.Unserializer.run( Reflect.field(obj, cache_id)), key); } catch(e:Dynamic){ null; };
        }else{
            null;
        }

    function hookWindow(window:js.html.Window) : Void {
        var initSegments:Map<Path, mp4lib.MediaHeaderBox> = new Map();
        Hooks.hookMethod(window, "URL.createObjectURL").pipe(function(args:Array<Dynamic>){
            if(args.length > 0){
                if(args[0].toString() == "[object MediaSource]"){ //Std.is(args[0], js.html.MediaSource)
                    var source:js.html.MediaSource = cast args[0];
                    Hooks.hookMethod(source, "addSourceBuffer").pipe((args, method_original) -> {
                        var sourceBuf = method_original(args);
                        Browser.console.log("created SourceBuffer ", args, sourceBuf);
                        Hooks.hookMethod(sourceBuf, "appendBuffer").pipe((args, method_original) -> {
                            //if Uint8Array/TypedArray, the buffer property points back to ArrayBuffer
                            var arrayBuffer = Reflect.field(args[0], "buffer") != null ? Reflect.field(args[0], "buffer") : args[0];
                            Browser.console.log("appendBuffer", args, getCachePropery(arrayBuffer, "url"));
                        });
                        return sourceBuf;
                    });
                }
            }   
        });
        Hooks.hookMethods(Reflect.field(window, "XMLHttpRequest"), ["prototype.open", "prototype.send"]).pipe(function(method, args:Array<Dynamic>, test:Dynamic){
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
                            setCachePropery(xmlhttpRequest.response, "url", url); //set fingerprint property on ArrayBuffer
                            var bytes = new UInt8Array(xmlhttpRequest.response);
                            var boxes = Mp4lib.deserialize(bytes);
                            trace(boxes);
                            //trace(boxes.findBoxByType("avcC"));
                            //trace(boxes.findBoxByType("avc1"));
                            //trace(boxes.findBoxByType("btrt"));
                            var moov = boxes.findBoxByType("moov");
                            if(moov != null){
                                //init segment
                                segment.init = xmlhttpRequest.response;
                                //trace('init segment $url');
                                initSegments.set(url, cast(boxes.findBoxByType("mdhd"),mp4lib.MediaHeaderBox));
                                js.Browser.console.log('mdhd.duration: ${initSegments.get(url).duration} mdhd.timescale: ${initSegments.get(url).timescale}');
                            }
                            var sidx:mp4lib.SegmentIndexBox = cast boxes.findBoxByType("sidx");
                            if(sidx != null){
                                //trace('SegmentIndexBox.earliest_presentation_time/timescale: ${sidx.earliest_presentation_time / sidx.timescale}');
                                segment.start = sidx.earliest_presentation_time / sidx.timescale;
                            }
                            var tkhd:mp4lib.TrackHeaderBox = cast boxes.findBoxByType("tkhd");
                            if(tkhd != null){
                                var width = tkhd.width / tkhd.matrix[0];
                                var height = tkhd.height / tkhd.matrix[4];
                                segment.dimensions = '${width}x${height}';
                            }
                            var btrt:mp4lib.MPEG4BitRateBox = cast boxes.findBoxByType("btrt");
                            if(btrt != null){
                                segment.avgbitrate = btrt.avgBitrate;
                            }
                            var hmhd:mp4lib.HintMediaHeaderBox = cast boxes.findBoxByType("hmhd");
                            if(hmhd != null){
                                segment.avgbitrate = hmhd.avgbitrate;
                            }

                            var moof = boxes.findBoxByType("moof");
                            if(moof != null){
                                //trace(boxes);
                                var sample_duration = cast(boxes.findBoxByType("tfhd"), mp4lib.TrackFragmentHeaderBox).default_sample_duration;
                                var sample_count = cast(boxes.findBoxByType("trun"), mp4lib.TrackFragmentRunBox).sample_count;
                                for(k in initSegments.keys()){
                                    
                                    if(url.file.indexOf(k.file) != -1){
                                        js.Browser.console.log(url.file);
                                        var duration = sample_duration * sample_count / initSegments.get(k).timescale;
                                        segment.end = segment.start + duration;
                                        segment.duration = duration;
                                        segment.avgbitrate = Math.round(((bytes.length/128) / duration));
                                        break;
                                    }
                                }
                            }
                            segments.push(segment);
                            if(url.file.indexOf("video") > -1){
                                var el = shell.mal.addTemplate("segments_cell", ["label"=>'${segment.duration}']);
                                JsUtils.setCSSStyles(el.style, [
                                    "left" => '${(segment.start * 10)}px',
                                    "width" => '${(segment.duration * 10)-4.5}px' // padding 2*1px border 2*1px
                                ]);
                            }
                            
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