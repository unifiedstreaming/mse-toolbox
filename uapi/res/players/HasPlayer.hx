package;
import js.Browser;
import Argan;

class HasPlayer {
    //static function __init__() untyped {}
    static function main() untyped {
        var player = expose_player(untyped __js__("new MediaPlayer()"));
        
        window.help = function(){
            return Argan.help(true);
        }
        Argan.start(window.config);
        try{
            var video_element = document.getElementById("video");
            player.init(video_element);
            player.setAutoPlay(video_element.hasAttribute("autoplay"));
            player.getDebug().setLevel(Argan.getDefault("debug_level","set debug level", 4));
            //player.addEventListener("metricUpdated", metricUpdated.bind(this));
            //player.addEventListener("metricAdded", metricAdded.bind(this));
            var stream = {
                url: uri,
                protData: {
                    "com.widevine.alpha":       {"laURL": Argan.getDefault("drm_server_widevine","com.widevine.alpha", "https://widevine-proxy.appspot.com/proxy")},
                    "com.microsoft.playready":  {"laURL": Argan.getDefault("drm_server_playready","com.microsoft.playready", 'https://playready.directtaps.net/pr/svc/rightsmanager.asmx?PlayRight=1&UseSimpleNonPersistentLicense=1&PlayEnablers=786627D8-C2A6-44BE-8F88-08AE255B01A7')}
                }
            }
            player.load(stream);
            debugger;
        }catch(e:Dynamic){ Browser.console.log(e); }
    }
    static function expose_player(p) untyped {
        window.player = p;
        return p;
    }
}

