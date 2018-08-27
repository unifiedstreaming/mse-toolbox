# UAPI

Unified player api 
Simple iframe page writer, used for injecting generated html5 player-page iframes dynamically. Currently supports the following players:
 - [dashjs](https://github.com/Dash-Industry-Forum/dash.js)
 - [shaka](https://github.com/google/shaka-player)
 - [hls.js](https://github.com/video-dev/hls.js)
 - [hasplayer.js](https://github.com/Orange-OpenSource/hasplayer.js)

## Building

    haxe build.hxml

## api documentation
    
    uapi.getPlayers()

Will return an object with all supported players and configuration options, that may be passed to uapi.writePlayer

```json
{
	"dashjs": {
		"drm_server_widevine": {
			"help": "com.widevine.alpha",
			"default_": "[default: CString(https://widevine-proxy.appspot.com/proxy)]"
		},
		"setSegmentOverlapToleranceTime": {
			"help": "Segment overlap tolorance threshold",
			"default_": "[default: CInt(4)]"
		},
		"drm_server_playready": {
			"help": "com.widevine.alpha",
			"default_": "[default: CString(https://playready.directtaps.net/pr/svc/rightsmanager.asmx?PlayRight=1&UseSimpleNonPersistentLicense=1&PlayEnablers=786627D8-C2A6-44BE-8F88-08AE255B01A7)]"
		}
	},
	"shaka": {
		"drm_server_widevine": {
			"help": "com.widevine.alpha",
			"default_": "[default: CString(https://widevine-proxy.appspot.com/proxy)]"
		},
		"setTextTrackVisibility": {
			"help": "Text Tracks visible",
			"default_": "[default: CIdent(true)]"
		},
		"drm_server_playready": {
			"help": "com.widevine.alpha",
			"default_": "[default: CString(https://playready.directtaps.net/pr/svc/rightsmanager.asmx?PlayRight=1&UseSimpleNonPersistentLicense=1&PlayEnablers=786627D8-C2A6-44BE-8F88-08AE255B01A7)]"
		}
	},
	"hasplayer": {
		"drm_server_widevine": {
			"help": "com.widevine.alpha",
			"default_": "[default: CString(https://widevine-proxy.appspot.com/proxy)]"
		},
		"drm_server_playready": {
			"help": "com.widevine.alpha",
			"default_": "[default: CString(https://playready.directtaps.net/pr/svc/rightsmanager.asmx?PlayRight=1&UseSimpleNonPersistentLicense=1&PlayEnablers=786627D8-C2A6-44BE-8F88-08AE255B01A7)]"
		}
	},
	"hlsjs": {
		"drm_server_widevine": {
			"help": "com.widevine.alpha",
			"default_": "[default: CString(https://widevine-proxy.appspot.com/proxy)]"
		}
	}
}
```

    uapi.writePlayer();

    

## usage examples

## test page
[uapi test page](bin/index.html)