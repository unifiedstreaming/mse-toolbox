package uapi;

typedef MimeType = String;
class MSEUtils {
    static var mimes:Map<String, String> = [
        "M3U8" => 'application/vnd.apple.mpegurl'
    ];

    //https://github.com/google/shaka-player/blob/dbdd39886ba63e5d5da361ab94592a6beae7904d/lib/media/media_source_engine.js#L168
      var testMimeTypes = [
        // MP4 types
        'video/mp4; codecs="avc1.42E01E"',
        'video/mp4; codecs="avc3.42E01E"',
        'video/mp4; codecs="hev1.1.6.L93.90"',
        'video/mp4; codecs="hvc1.1.6.L93.90"',
        'video/mp4; codecs="hev1.2.4.L153.B0"; eotf="smpte2084"',  // HDR HEVC
        'video/mp4; codecs="hvc1.2.4.L153.B0"; eotf="smpte2084"',  // HDR HEVC
        'video/mp4; codecs="vp9"',
        'video/mp4; codecs="vp09.00.10.08"',
        'audio/mp4; codecs="mp4a.40.2"',
        'audio/mp4; codecs="ac-3"',
        'audio/mp4; codecs="ec-3"',
        'audio/mp4; codecs="opus"',
        'audio/mp4; codecs="flac"',
        // WebM types
        'video/webm; codecs="vp8"',
        'video/webm; codecs="vp9"',
        'video/webm; codecs="vp09.00.10.08"',
        'audio/webm; codecs="vorbis"',
        'audio/webm; codecs="opus"',
        // MPEG2 TS types (video/ is also used for audio: https://bit.ly/TsMse)
        'video/mp2t; codecs="avc1.42E01E"',
        'video/mp2t; codecs="avc3.42E01E"',
        'video/mp2t; codecs="hvc1.1.6.L93.90"',
        'video/mp2t; codecs="mp4a.40.2"',
        'video/mp2t; codecs="ac-3"',
        'video/mp2t; codecs="ec-3"',
        // WebVTT types
        'text/vtt',
        'application/mp4; codecs="wvtt"',
        // TTML types
        'application/ttml+xml',
        'application/mp4; codecs="stpp"',
    ];

//https://github.com/google/shaka-player/blob/bbb7a835632a6b8b0d68a6e98dee318ac814d204/lib/media/manifest_parser.js#L93
     // Make sure all well-known types are tested as well, just to show an explicit
  // false for things people might be expecting.
  var testManifestMimeTypes = [
    // DASH
    'application/dash+xml',
    // HLS
    'application/x-mpegurl',
    'application/vnd.apple.mpegurl',
    // SmoothStreaming
    'application/vnd.ms-sstr+xml',
  ];
  var testExtensions = [
    // DASH
    'mpd',
    // HLS
    'm3u8',
    // SmoothStreaming
    'ism',
  ];

    //detect drm support
    //detect codec mimetype support
    //list common codec mimetypes
    private function isBrowserSupported() {
     //js.Browser.navigator.requestMediaKeySystemAccess
    };

    static public function getMimes():Array<String>{
        return Lambda.array({ iterator: function(){ return mimes.keys(); } });
    }

    function canPlayType(m:MimeType)
        return js.Browser.document.createVideoElement().canPlayType(m) != null;

    public function new() {
        trace(canPlayType(mimes.get("M3U8")));
    }

}