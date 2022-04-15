# uapi.js

AKA, Unified player API

Simple iframe page writer, used for injecting generated html5 player-page iframes dynamically. Currently supports the following players:
 - [dashjs](https://github.com/Dash-Industry-Forum/dash.js)
 - [shaka](https://github.com/google/shaka-player)
 - [hls.js](https://github.com/video-dev/hls.js)
 - [hasplayer.js](https://github.com/Orange-OpenSource/hasplayer.js)


## Building

### On linux
After downloading haxe from https://haxe.org/download/version/4.2.5 the
following dependency is needed:

    sudo apt-get install libneko2

But then 'haxelib setup' gives:

    Uncaught exception - load.c(237) : Failed to load library : std.ndll (std.ndll: cannot open shared object file: No such file or directory)

### On macos
After downloading haxe from https://haxe.org/download/version/4.2.5 do 

    haxelib setup

Installs into /usr/local/lib/haxe/lib, the do

    haxelib install argan 

After the depency is setup build as follows:

    haxe build.hxml

See [build.hxml](./build.hxml) for inline documentatation describing the different steps in the build process.


## API documentation

-----------
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
-----------
    uapi.writePlayer(
		parent:js.html.Element, 
		uri:String, 
		player_version_string:String = "dashjs", 
		player_config:Dynamic = null, 
		?inject_head:String = null, 
		?inject_body:String = null):js.Promise<{
			reload:String->String->PlayerOptions->js.Promise<PlayerHandle>,
			frame:js.html.IFrameElement,
			player:Dynamic,
			video:js.html.VideoElement,
			controls_custom:js.html.DivElement
		}>

Writes player to target DOMElement


## Adding new player versions
[res/players](res/players) contains json files with the supported versions and paths to each player
- [res/players/dashjs.json](res/players/dashjs.json)
- [res/players/shaka.json](res/players/shaka.json)
- [res/players/hlsjs.json](res/players/hlsjs.json)
- [res/players/hasplayer.json](res/players/hasplayer.json)


## [uapi demo page](https://unifiedstreaming.github.io/mse-toolbox/uapi/bin/index.html)
use this demo page to generate implementation code examples.
