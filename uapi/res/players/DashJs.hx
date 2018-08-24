package;
import js.Browser;
import Argan;

class DashJs {
    //static function __init__() untyped {}
    static function main() untyped {
        var player = expose_player(untyped dashjs.MediaPlayer().create());
        player.initialize();
        window.help = function(){
            return Argan.help(true);
        }
        Argan.start(window.config);
        try{
            var video_element = document.getElementById("video");
            player.setAutoPlay(video_element.hasAttribute("autoplay"));
            player.attachView(video_element);
            player.setProtectionData({  
                                        "com.widevine.alpha":       {"serverURL": Argan.getDefault("drm_server_widevine","com.widevine.alpha", "https://widevine-proxy.appspot.com/proxy")},
                                        "com.microsoft.playready":  {"serverURL": Argan.getDefault("drm_server_playready","com.widevine.alpha", 'https://playready.directtaps.net/pr/svc/rightsmanager.asmx?PlayRight=1&UseSimpleNonPersistentLicense=1&PlayEnablers=786627D8-C2A6-44BE-8F88-08AE255B01A7')}
                                     });
            player.setSegmentOverlapToleranceTime(Argan.getDefault("setSegmentOverlapToleranceTime","Segment overlap tolorance threshold", 4));
            player.attachTTMLRenderingDiv(document.getElementById("ttml"));
        }catch(e:Dynamic){ Browser.console.log(e); }

        var onStreamInitialized = function (e) {
            player.setTrackSwitchModeFor('video', 'alwaysReplace');
            player.setTrackSwitchModeFor('audio', 'alwaysReplace');
            player.setFastSwitchEnabled(true);

            clearMenu();

            var handleBitrateSwitch = function(e){
                var info:Dynamic = e.target.selectedOptions[0].info;
                if (null != info.mediaType) {
                    if (player.getAutoSwitchQualityFor(info.mediaType)) {
                        player.setAutoSwitchQualityFor(info.mediaType, false);
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
                addMenu("Audio tracks", audioTracks, handleTrackSwitch, player.getCurrentTrackFor("audio").index - 1);
            }
            var videoTracks = [];
            var VideoTrackInfoList:Array<Dynamic> = player.getTracksFor("video");
            if(VideoTrackInfoList.length > 1){
                for(info in VideoTrackInfoList){
                    videoTracks.push({title: '${info.type}:${info.lang}' , info: info });
                }
                addMenu("Video tracks", videoTracks, handleTrackSwitch, player.getCurrentTrackFor("video").index - 1);
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
                    meta.push("sidecar")
                
                if(info.isEmbedded)
                    meta.push("embedded");
                if(info.isTTML)
                    meta.push("ttml");
                if(meta.length > 0){
                    str += ' [${meta.join(":")}]';
                }
                textTracks.push({title: str, info: info });
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
}

