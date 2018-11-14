# mse-toolbox

> Media Source Extensions. /ˈmiːdɪə/ /sɔːs/ /ɪkˈstɛnʃ(ə)n,ɛkˈstɛnʃ(ə)ns/ 
> 
> noun
> 
> Media Source Extensions (MSE) is a W3C specification that allows JavaScript to send byte streams to media codecs within web browsers that support HTML5 video and audio.

This repository is for *frontend video player* related utility scripts.

## EME/MSE play-out tools

### [uapi.js](uapi/)
A simple iframe player writer, used for injecting generated html5 player-page iframes dynamically.
Features:
- Loads fast
- Single javascript include
- Supports most players
- Player skins
- Easily extendable
- Includes minimal toolset to build single page applications (hashchange, url parsing)
- Shorthands to hook builtin methods
- Runs in sandboxed IFrames

[Demo](https://unifiedstreaming.github.io/mse-toolbox/uapi/bin/)

[Documentation](uapi/)

Currently supports the following 
players:
 - [dashjs](https://github.com/Dash-Industry-Forum/dash.js)
 - [shaka](https://github.com/google/shaka-player)
 - [hls.js](https://github.com/video-dev/hls.js)
 - [hasplayer.js](https://github.com/Orange-OpenSource/hasplayer.js)

## Video debugging tools

### [mp4lib.js](mp4lib/)

MP4 box parser

### [vview.js](vview/)

work in progress video debug environment
