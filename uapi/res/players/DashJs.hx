package;
import js.Browser;
import Argan;

class DashJs {
    //static function __init__() untyped {}
    static var v3:Bool = false;
    static function main() untyped {
        var title:String = Reflect.field(Browser.window, "title");
        if(title.indexOf(untyped dashjs.Version) == -1)
            Browser.console.warn('Loaded DashJs version "${untyped dashjs.Version}" not matching player title "${title}"');
        
        // dash.js v3.0.0 has new configuration logic
        // https://github.com/Dash-Industry-Forum/dash.js/blob/HEAD/docs/migration/Migration-3.0.md
        v3 = untyped dashjs.Version == "3.0.0";

        window.help = function(){
            return Argan.help(true);
        }
        
        Argan.start(window.config);
        
        var player = expose_player(untyped dashjs.MediaPlayer().create());
        
        
        var logLevel = Argan.getDefault("dashjs_loglevel", "0 == none to 5 == debug", 4);
        if(v3){
            player.updateSettings(cfg("debug.logLevel", logLevel));
        }else{
            var debug = player.getDebug();
            if(debug != null && Reflect.field(debug, "setLogLevel") != null)
                debug.setLogLevel(); //dashjs.Debug.LOG_LEVEL_INFO
        }
        player.initialize();
        

        try{
            var video_element = document.getElementById("video");
            player.setAutoPlay(video_element.hasAttribute("autoplay"));
            player.attachView(video_element);
            player.setProtectionData({  
                                        "com.widevine.alpha":       {"serverURL": Argan.get("drm_server_widevine","com.widevine.alpha", "https://widevine-proxy.appspot.com/proxy")},
                                        "com.microsoft.playready":  {"serverURL": Argan.get("drm_server_playready","com.microsoft.playready", 'https://playready.directtaps.net/pr/svc/rightsmanager.asmx?PlayRight=1&UseSimpleNonPersistentLicense=1&PlayEnablers=786627D8-C2A6-44BE-8F88-08AE255B01A7')}
                                     });
            player.attachTTMLRenderingDiv(document.getElementById("ttml"));
        }catch(e:Dynamic){ 
            Browser.console.log('Error setting basic options:', e); 
        }

        try{
            //player.setSegmentOverlapToleranceTime(Argan.get("setSegmentOverlapToleranceTime","Segment overlap tolorance threshold", 4));
            var jumpGaps = Argan.get("setJumpGaps","setJumpGaps", true);
            v3 ?
                player.updateSettings(cfg("streaming.jumpGaps", jumpGaps)) :
                player.setJumpGaps(jumpGaps);

            var lowLatencyEnabled = Argan.get("setLowLatencyEnabled","setLowLatencyEnabled", false);
            v3 ?
                player.updateSettings(cfg("streaming.lowLatencyEnabled", lowLatencyEnabled)) :
                player.setLowLatencyEnabled(lowLatencyEnabled);
            
            if(Argan.has("setLiveDelay")){
                var liveDelay = Argan.get("setLiveDelay", "setLiveDelay", 10.0);
                v3 ? 
                    player.updateSettings(cfg("streaming.liveDelay", liveDelay)) :
                    player.setLiveDelay(Argan.get("setLiveDelay", "setLiveDelay", 10.0));
            }
            if(Argan.has("setABRStrategy")){
                var ABRStrategy = Argan.get("setABRStrategy","abrDynamic / abrBola / abrThroughput", "abrDynamic");
                v3 ?
                    player.updateSettings(cfg("streaming.abr.ABRStrategy", ABRStrategy)) :
                    player.setABRStrategy(ABRStrategy);
            }
        }catch(e:Dynamic){
            Browser.console.log('Error setting advanced options:', e); 
        }
        
        var onStreamInitialized = function (e) {
            player.setTrackSwitchModeFor('video', 'alwaysReplace');
            player.setTrackSwitchModeFor('audio', 'alwaysReplace');

            var fastSwitch = Argan.get("setFastSwitchEnabled","setFastSwitchEnabled", true);
            v3 ?
                player.updateSettings({ streaming: {fastSwitchEnabled: fastSwitch}}) :
                player.setFastSwitchEnabled(fastSwitch);
            
            clearMenu();

            var handleBitrateSwitch = function(e){
                var info:Dynamic = e.target.selectedOptions[0].info;
                if (null != info.mediaType) {
                    if(v3){
                        player.updateSettings(
                            cfg('streaming.abr.autoSwitchBitrate.${info.mediaType}', false)
                        );
                    }else{
                        if (player.getAutoSwitchQualityFor(info.mediaType)) {
                            player.setAutoSwitchQualityFor(info.mediaType, false);
                        }
                    }
                    player.setQualityFor(info.mediaType, e.target.selectedIndex -1);
                
                } else {
                    player.setAutoSwitchQualityFor(info, true);
                }
                //player.seek(video.currentTime -1);
            };
            var handleTrackSwitch = function(e){
                player.setCurrentTrack(e.target.selectedOptions[0].info);
            };

            var audioMenu = [ { title: "Auto switch", info: "audio" } ];
            var AudioBitrateInfoList:Array<Dynamic> = player.getBitrateInfoListFor("audio");
            if(AudioBitrateInfoList != null){
                for(info in AudioBitrateInfoList){
                    audioMenu.push({title: '${Math.floor(info.bitrate / 1000)} kbps' , info: info });
                }
                addMenu("Audio bitrates", audioMenu, handleBitrateSwitch);
            }
            var videoMenu = [ { title: "Auto switch", info: "video" } ];
            var VideoBitrateInfoList:Array<Dynamic> = player.getBitrateInfoListFor("video");
            if(VideoBitrateInfoList != null){
                for(info in VideoBitrateInfoList){
                    videoMenu.push({title: '${Math.floor(info.bitrate / 1000)} kbps' , info: info });
                }
                addMenu("Video bitrates", videoMenu, handleBitrateSwitch);
            }
            var audioTracks = [];
            var AudioTrackInfoList:Array<Dynamic> = player.getTracksFor("audio");
            if(AudioTrackInfoList.length > 1){
                for(info in AudioTrackInfoList){
                    audioTracks.push({title: '${info.type}:${info.lang}' , info: info });
                }
                addMenu("Audio tracks", audioTracks, handleTrackSwitch, player.getCurrentTrackFor("audio").index);
            }
            var videoTracks = [];
            var VideoTrackInfoList:Array<Dynamic> = player.getTracksFor("video");
            if(VideoTrackInfoList.length > 1){
                for(info in VideoTrackInfoList){
                    videoTracks.push({title: '${info.type}:${info.lang}' , info: info });
                }
                addMenu("Video tracks", videoTracks, handleTrackSwitch, player.getCurrentTrackFor("video").index);
            }
            if(textTracks.length > 0){
                addMenu("Texttracks", textTracks, function(e){
                player.setTextTrack(e.target.selectedIndex);        
                }, player.getCurrentTextTrackIndex());
            }
        }

        var textTracks:Array<Dynamic> = [];
        var onTracksAdded = function (e) {
            textTracks = [];
            for(i in 0...e.tracks.length){
                var info = e.tracks[i];
                var str = '${info.kind}:${info.lang}';
                var meta = [];
                if(info.isFragmented)
                    meta.push("fragmented");
                else
                    meta.push("sidecar");
                
                if(info.isEmbedded)
                    meta.push("embedded");
                if(info.isTTML)
                    meta.push("ttml");
                if(meta.length > 0){
                    str += ' [${meta.join(":")}]';
                }
                textTracks.push({title: str, info: info });
            }
            if(textTracks.length > 0){
                removeMenu("Texttracks");
                addMenu("Texttracks", textTracks, function(e){
                player.setTextTrack(e.target.selectedIndex);        
                }, player.getCurrentTextTrackIndex());
            }
            
        }
        
        player.on(dashjs.MediaPlayer.events.TEXT_TRACKS_ADDED, onTracksAdded, js.Lib.nativeThis);
        player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, onStreamInitialized, js.Lib.nativeThis);
        
        player.attachSource(uri);
    }
    static function expose_player(p) untyped {
        window.player = p;
        return p;
    }
    static function cfg(str:String, value:Dynamic):Dynamic {
        var ret = {}, path = str.split(".");
        Reflect.setField(ret, path.pop(), value);
        while(path.length > 0){
            var parent = {};
            Reflect.setField(parent, path.pop(), ret);
            ret = parent;
        }
        return ret;
    }
}

