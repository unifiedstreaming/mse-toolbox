package;
import js.Browser;
import Argan;
class Shaka {
    //static function __init__() untyped {}
    static function main() {
        var uri:String = Reflect.field(Browser.window, "uri");
        var shaka = Reflect.field(Browser.window, "shaka");
        var onErrorEvent = untyped function(event) {  onError(event.detail); };
        var onError = untyped function(error) { throw ["Error code", error.code, "object", error].join(" "); };
        untyped window.help = function(){
            return Argan.help(true);
        }
        Argan.start(untyped window.config);
        if(shaka != null){
            shaka.polyfill.installAll();
            if (shaka.Player.isBrowserSupported()) {
                var player = expose_player(untyped __js__('new shaka.Player(document.getElementById("video"))'));
                player.configure({
                    streaming: {
                        smallGapLimit: Argan.getDefault("smallGapLimit","config.streaming.smallGapLimit", .5),
                        jumpLargeGaps: Argan.getDefault("jumpLargeGaps","config.streaming.jumpLargeGaps", false)
                    },
                    drm: {
                        servers: {
                            'com.widevine.alpha'        : Argan.getDefault("drm_server_widevine","com.widevine.alpha", 'https://widevine-proxy.appspot.com/proxy'),
                            'com.microsoft.playready'   : Argan.getDefault("drm_server_playready",'com.microsoft.playready', 'https://playready.directtaps.net/pr/svc/rightsmanager.asmx?PlayRight=1&UseSimpleNonPersistentLicense=1&PlayEnablers=786627D8-C2A6-44BE-8F88-08AE255B01A7')
                        }
                    }
                });
                player.setTextTrackVisibility(Argan.getDefault("setTextTrackVisibility","Text Tracks visible", true));
                player.addEventListener("error", onErrorEvent);
                var promise:js.lib.Promise<Void> = player.load(uri);
                promise.then(function(_) {
                    var addMenu = untyped window.addMenu;
                    var variantTracksList:Array<Dynamic> = player.getVariantTracks();
                    var variantTracks = [ { title: "Auto switch", info: null } ];
                    for(info in variantTracksList){
                        var bw = Math.ceil(info.videoBandwidth/1000); bw -= bw % 50;
                        variantTracks.push({title: '${info.roles[0]}:${bw}k ${info.videoCodec} / ${Math.round(info.audioBandwidth/1000)}k ${info.audioCodec}', info: info });
                    }
                    addMenu("Variant tracks", variantTracks, function(e){
                        if(e.target.selectedOptions[0].info == null){
                            player.configure(untyped {abr: {enabled: true }});
                        }else{
                            player.configure(untyped {abr: {enabled: false}});
                            player.selectVariantTrack(e.target.selectedOptions[0].info, /* clearBuffer */ true);
                        }
                    });

                    var audioLanguagesAndRoles:Array<Dynamic> = player.getAudioLanguagesAndRoles();
                    var audioTracks = [];
                    for(info in audioLanguagesAndRoles){
                        audioTracks.push({title: '${info.role}:${info.language}', info: info });
                    }
                    addMenu("Audio tracks", audioTracks, function(e){
                        player.selectAudioLanguage(e.target.selectedOptions[0].info.language, e.target.selectedOptions[0].info.role);
                    });
                    
                    var textLanguagesAndRoles:Array<Dynamic> = player.getTextLanguagesAndRoles();
                    var textTracks = [];
                    for(info in textLanguagesAndRoles){
                        textTracks.push({title: '${info.role}:${info.language}', info: info });
                    }
                    if(textTracks.length > 0)
                        addMenu("Text tracks", textTracks, function(e){
                            player.selectTextLanguage(e.target.selectedOptions[0].info.language, e.target.selectedOptions[0].info.role);
                        });

                    return;
                }).catchError(onError);
            };
        }
    }
    static function expose_player(p) untyped {
        window.player = p;
        return p;
    }
}

