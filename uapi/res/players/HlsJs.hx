package;
import js.Browser;
import Argan;

class HlsJs {
    static var hlsConfig = {
        debug:false,
        widevineLicenseUrl:Argan.getDefault("drm_server_widevine","com.widevine.alpha", "https://widevine-proxy.appspot.com/proxy"),
        emeEnabled: true,
        stretchShortVideoTrack: Argan.getDefault("stretchShortVideoTrack","stretchShortVideoTrack", "false"),
        enableWorker: Argan.getDefault("enableWorker","enableWorker", "true"),
        drmSystem: "WIDEVINE" 
        /*,
        requestMediaKeySystemAccessFunc: function(){ 
            untyped {
                arguments[1][0].initDataTypes = [ 'cenc' ];
            }
            Browser.alert(untyped arguments[1]);
            return Reflect.callMethod(Browser.navigator, Browser.navigator.requestMediaKeySystemAccess, untyped arguments);
        }
        */
    };

    
    //static function __init__() untyped {}
    static function main() untyped {
        var video:js.html.VideoElement = cast Browser.document.getElementById('video'); //untyped video
        var uri:String = Reflect.field(Browser.window, "uri");
        var Hls:Dynamic = Reflect.field(Browser.window, "Hls");
        if(Argan.has("liveSyncDurationCount"))
            Reflect.setField(hlsConfig, "liveSyncDurationCount", Argan.getDefault("liveSyncDurationCount","liveSyncDurationCount", "1"));
        window.help = function(){
            return Argan.help(true);
        }
        Argan.start(window.config);
        if(Hls != null && Hls.isSupported()) {
            var player = expose_player(Type.createInstance(untyped Hls, [hlsConfig]));
            player.loadSource(uri);
            player.attachMedia(video);
            player.on(Hls.Events.MANIFEST_PARSED, function() {
                
                var videoTracks = [{ title: "Auto switch", info: null }];
                var VideoTrackInfoList:Array<Dynamic> = player.levels;
                for(info in VideoTrackInfoList){
                    videoTracks.push({title: '${info.bitrate/1000} kbps' , info: info });
                }
                if(VideoTrackInfoList.length > 1)
                    addMenu("Video tracks", videoTracks, function(e){
                        player.nextLevel = e.target.selectedIndex - 1;
                    }, player.currentLevel);

                var audioTracks = [{ title: "Auto switch", info: null }];
                var AudioTrackInfoList:Array<Dynamic> = player.audioTracks;
                for(info in AudioTrackInfoList){
                    audioTracks.push({title: '${info.name}[${info.groupId}]' , info: info });
                }
                if(AudioTrackInfoList.length > 1)
                    addMenu("Audio tracks", audioTracks, function(e){
                        player.audioTrack = e.target.selectedIndex - 1;
                    }, player.audioTrack);

                if(video.hasAttribute("autoplay"))
                    video.play();
            });
            player.on(Hls.Events.SUBTITLE_TRACKS_UPDATED, function() {
                var textTracks = [];
                var TextTrackInfoList:Array<Dynamic> = player.subtitleTracks;
                for(info in TextTrackInfoList){
                    textTracks.push({title: '${info.name}' , info: info });
                }
                if(textTracks.length > 0)
                    addMenu("Text tracks", textTracks, function(e){
                        player.subtitleTrack = e.target.selectedIndex;
                    }, player.subtitleTrack);
            });
        }
        
        // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
        // When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element throught the `src` property.
        // This is using the built-in support of the plain video element, without using hls.js.
        // Note: it would be more normal to wait on the 'canplay' event below however on Safari (where you are most likely to find built-in HLS support) the video.src URL must be on the user-driven
        // white-list before a 'canplay' event will be emitted; the last video event that can be reliably listened-for when the URL is not on the white-list is 'loadedmetadata'.
        else if (video.canPlayType('application/vnd.apple.mpegurl').length > 0) {
            Browser.console.log("Going for native HLS playback of " + uri);
            video.src = uri;
            video.addEventListener('loadedmetadata',function() {
                video.play();
            });
        }
    }
    static function expose_player(p) untyped {
        window.player = p;
        return p;
    }
}