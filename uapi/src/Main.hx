package ;
import js.Browser;
import js.html.RequestCredentials;
import js.html.ReferrerPolicy;
import js.html.RequestMode;
import js.html.Response;
import uapi.Hooks;
import uapi.Utils;

/**
 * haxe -resource based player loader and basic site tools
 * 	Add new player targets by adding sources json and player code in hxml
 */
@:expose("uapi")
class Main {
    public function new() {        
        Browser.window.fetch("https://api.cdnjs.com/libraries/shaka-player", 
        {   "credentials": RequestCredentials.OMIT,
            "headers":{},
            "referrerPolicy": ReferrerPolicy.NO_REFERRER_WHEN_DOWNGRADE,
            "body":null,
            "method":"GET",
            "mode": RequestMode.CORS
        }).then(function(response:Response){
            response.json().then(function(res){
                trace(res);
            });
        });
    }

    static function main() {
        //new Main();
    }

	@:keep
	public static function getPlayers(){
		var players = {};
		for(n in haxe.Resource.listNames()){
			if(n.indexOf("template") == -1 && n != Argan.HELP_RESOURCE_KEY &&
				!StringTools.endsWith(n, "-src") && 
				!StringTools.endsWith(n, "-argan"))
				Reflect.setField(players, n, haxe.Json.parse(haxe.Resource.getString(n + "-argan")));
		}
		return players;
	}

	@:keep
	public static function getHelp()
		return Argan.help(true);
	

	@:keep
	public static function getPlayerVersions(player:String){
		return haxe.Json.parse(haxe.Resource.getString('${player}-src'));
	}

	static var playerSrcExtended:Map<String, Array<String>> = new Map();
	@:keep
	/**
	 * Add additional player/srcs[]
	 * @param player 
	 * @param urls 
	 */
	public static function addPlayerSrc(player:String, urls:Array<String>){
		urls = urls.map(function(url){
			return absUrl(url);
		});
		playerSrcExtended.set(player,urls);
	}

	static var playerSrcOverride = null;
	@:keep
	/**
	 * Override all player sources defined in embedded json
	 * @param player_srcs_object 
	 */
	public static function overridePlayerSrcs(player_srcs_object:Dynamic){
		playerSrcOverride = player_srcs_object;
	}

	private static var id:Int = 0;

	@:keep
	public static function writePlayer(parent:js.html.Element, uri:String, player_version_string:String = "dashjs", player_config:Dynamic = null, ?inject_head:String = null, ?inject_body:String = null){
		Argan.start(player_config);
		// https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-iframe-srcdoc
		var iframe = Browser.document.createIFrameElement();
		iframe.src = "about:blank";
		iframe.setAttribute("border", "0");
		iframe.setAttribute("allowfullscreen", "true");
		iframe.setAttribute("seamless", "true");
		iframe.setAttribute("frameborder", "0");
		//iframe.setAttribute("sandbox", "allow-same-origin allow-scripts");
		var meta = player_version_string.split(":");
		var player = meta[0];
		if(haxe.Resource.listNames().indexOf(player) == -1 && player != "native"){
			throw 'unknown player "$player", please select any of ${haxe.Resource.listNames()}.';
		}
		var version = meta[1];
		var head = [ ];
		var body = [ '<script src="${haxe.Resource.getString('${player}')}"></script>'];
		var error = null;
		var last_src = "#";

		//load from overrides
		if(player == "native"){
			body = ['<script>video.src = uri;</script>'];
		}else{
			if(playerSrcExtended.exists(player_version_string)){
				for(src in playerSrcExtended.get(player_version_string))
					head.push('<script src="${last_src = src}"></script>');
			}else{
				var srcs = playerSrcOverride == null ? haxe.Json.parse(haxe.Resource.getString('${player}-src')) : playerSrcOverride;
				//load from json '${player}-src'
				for(s in version == null ? Reflect.fields(srcs) : [ version ]){
					version = s;
					if(Reflect.hasField(srcs, s)){
						var list:Array<String> = Reflect.field(srcs, s);
						for(src in list)
							head.push('<script src="${last_src = src}"></script>');
							//head.push('<script onerror="if(event.type==\'error\')console.log(\'usapi was unable to load ${StringTools.htmlEscape(src)}\'); return false;" src="$src"></script>');
					}else{
						error = 'unknown version:${version} for "${player}"';
					}
					break;
				}
			}
		}
		if(null != inject_head)
			head.push(inject_head);
		if(null != inject_body)
			body.push(inject_body);
		
		var html = new haxe.Template(haxe.Resource.getString("template")).execute({
			uri: StringTools.urlEncode(uri),
			loading: haxe.Resource.getString("logo"),
			title: player,
			title_version: version,
			title_href: last_src,
			attr_autoplay: Argan.get("autoplay", "set videoelement autoplay state", true),
			attr_muted: Argan.get("muted", "set videoelement muted state", false),
			attr_controls: Argan.get("controls", "disable videoelement built in controls", true),
			attr_playsinline: Argan.get("playsinline", "disable videoelement playsinline attribute", true),
			head: head.join("\n"),
			body: body.join("\n"),
			controls: error != null ? '<pre>uapi error:\n$error</pre>' : haxe.Resource.getString('controls_template')
		}, {
			poster: function(resolve:Void->Void){
				var canvasDataURL = generatePosterImage(uri, player.toUpperCase());
				var split = canvasDataURL.split(",");
				var retval = Reflect.hasField(Browser.window, "Blob") ? 
				js.html.URL.createObjectURL(new js.html.Blob([haxe.crypto.Base64.decode(split[1]).getData()], {type: split[0].split(";")[0]})) : canvasDataURL;
				return 'poster="${retval}"';
			}
		});

		var container = Browser.document.createDivElement();
		container.style.position = "relative";
		container.style.width = "100%";
		container.style.height = error != null ? "44px": "0"; //some default to show error
		container.style.boxSizing = "unset"; //bootstrap compat

		//100/16*9 --> aspect is now set in controls_template.html :loadedmetadata
		// because there is an 
		//container.style.paddingBottom = "56.25%";
		
		iframe.id = iframe.name = 'uapi.js/${player}(${version})/${id++}';
		iframe.style.position = "absolute";
		iframe.style.resize = "both";
		iframe.style.top = iframe.style.left = "0";
		iframe.style.width = iframe.style.height = "100%";
		container.appendChild(iframe);
		parent.appendChild(container);

		var retval = new js.Promise(function(resolve, reject) {
			var iframe_loaded = false;
			var delayed_errors = [];

			//handle success
			iframe.addEventListener("load", function(event){
				iframe_loaded = true;
				while(delayed_errors.length > 0)
					delayed_errors.pop()();
				resolve({frame: iframe, player:Reflect.field(iframe.contentWindow, "player"), video: Reflect.field(iframe.contentWindow, "video")});
			});
			
			//handle errors
			var topWindow = Browser.window;
			var handleError:Dynamic->String->Dynamic->?Bool->Void = null;
			handleError = function(error, message, window, ?logToConsole = true){
				if(Argan.getDefault("quiet", "do not show errors in output", false))
					return;
				if(iframe_loaded){
					var msg = window.document.createElement("div");
					msg.className = "message";
					msg.innerText += '💬 $message\n';
					window.document.getElementById("error").appendChild(msg);
					if(logToConsole)
						topWindow.console.error(error);
					window.resetControlsHeight();
					window.resetAspectRatio();
				}else
					delayed_errors.push(handleError.bind(error,message,window,logToConsole));
			}
			//use fixed hook callback from player_page_template.html to be able to add event listeners _before_ page load
			var iframe:Dynamic = iframe;
			iframe.hook = function(contentWindow:Dynamic){
				contentWindow.config = Reflect.field(player_config, player);
				contentWindow.addEventListener("error", function(e:js.html.ErrorEvent){
					reject(e);
					handleError(e, 'error.message:${e.message}, ${e.filename}:${e.lineno}', contentWindow);
				});
				contentWindow.onunhandledrejection = function(e:Dynamic) { //safari does not do trigger addEventListener('unhandledrejection',...)
					reject(e);
					handleError(e, e.reason.toString(), contentWindow);
				}
				Hooks.hookMethods(contentWindow.console, ["error", "warn"]).pipe(function(method:String, args:Array<Dynamic>){
					handleError(args, 'console.$method:\t${args}', contentWindow, false);
				});

				
			}
			iframe.hook_end = function(contentWindow:Dynamic, video:js.html.VideoElement){
				//no player object in iframe, loading failed
				if(player != "native" && !Reflect.hasField(contentWindow,'player'))
                	throw "unable to load " + player_version_string;
				
				video.addEventListener("error", function(e:js.html.ErrorEvent){
					Reflect.setField(Browser.window, "lastError", video.error);
					var msg = switch(video.error.code) {
						case 1: 'MEDIA_ERR_ABORTED';
						case 2: 'MEDIA_ERR_NETWORK';
						case 3: 'MEDIA_ERR_DECODE';
						case 4: 'MEDIA_ERR_SRC_NOT_SUPPORTED';
						case 5: 'MEDIA_ERR_ENCRYPTED';
						default: 'UNKNOWN';
					}
					if(Reflect.field(video.error,"message") != null)
						msg += "\nMediaError.message: " + Reflect.field(video.error,"message");
					var log = 'HTMLMediaElement MediaError while playing\n${uri}\n\n${msg}\n\nsee\nhttps://developer.mozilla.org/en-US/docs/Web/API/MediaError for more details';
					
					handleError(e, log, contentWindow);
				});
			}
		});
		#if documentwrite
			var doc:Dynamic = iframe.contentWindow != null ? iframe.contentWindow : iframe.contentDocument;
			if (doc.document)
				doc = doc.document;
			doc.open();
			doc.write(html);
			doc.close();
		#else
			/*
				multiple options to try and make any browser show the generated source in the debug inspector
				only data: url seems to work, but data: runs in a new, empty, security context. sandbox attribute does not enable it.

				sandbox attribute "allow-same-origin" does not seem to have any effect with iframe.src = "data:...", iframe is not able to access parent
				https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox
				https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy
					
					iframe.src = "data:text/html;charset=UTF-8;base64," + haxe.crypto.Base64.encode(haxe.io.Bytes.ofString(html));

				srcdoc iframe _does_ inherit origin.

					iframe.srcdoc = html;
				
				using javascript: url _also_ inherits origin
				using iframe.src = js.html.URL.createObjectURL(blob) _also_ inherits origin
			*/
			//var ticks = StringTools.replace(html, "`", "\\`" );
			//iframe.src = 'javascript:unescape(`${StringTools.urlEncode(ticks)}`);';
			//html.split("\n")

			if(Reflect.hasField(Browser.window, "Blob")){
				iframe.setAttribute("sandbox", "allow-scripts allow-same-origin");
				iframe.src = js.html.URL.createObjectURL(
					new js.html.Blob([haxe.io.Bytes.ofString(html).getData()], {type: 'text/html'})
				);
			}else{
				iframe.src = 'javascript:atob("${haxe.crypto.Base64.encode(haxe.io.Bytes.ofString(html))}");';
			}
		#end

		return retval;
	}

	@:keep
	public static function HashPipe(?immediate:Bool)
		return HashPipeJs(immediate);

	@:keep	
	public static function HashPipeJs(?immediate:Bool = false):DeferredPipe
        return { 
			pipe: function(func) {
				var retval = Hooks.HashPipe(immediate).pipe(function(data:{ args:Map<String, String>, values:Array<String>}){
					func({ args:mapToDynamic(data.args), values:data.values });
				});
				var _hx_func = retval.update;
				retval.update = function(args:Dynamic, ?values:Array<String> = null, ?rewrite:Bool, ?toggle:Bool){
					_hx_func(dynamicToMap(args), values, rewrite, toggle);
				}
				return retval;
            }
        };

	@:keep
	public static function KeyValueStringParser(location:String, QueryString:Bool)
		return KeyValueStringParserJs(location, QueryString);

	@:keep	
	public static function KeyValueStringParserJs(location:String = null, QueryString:Bool = true)
		return mapToDynamic(Utils.KeyValueStringParser(location, QueryString));

	@:keep
	public static function Version()
		return Macros.GetLastGitTag();

	@:keep	
	public static function write(str)
		Utils.write(str);

	@:keep
	public static function absUrl(url:String){
		var abs = Browser.document.createAnchorElement();
		abs.href = url;
		return abs.href;
	}

	private static function dynamicToMap(object:Dynamic):Map<String,Dynamic>{
		var retval:Map<String,Dynamic> = new Map<String,Dynamic>();
		for(f in Reflect.fields(object))
			retval.set(f, Reflect.field(object,f));
		return retval;
	}

	private static function mapToDynamic(map:Map<String,Dynamic>):Dynamic{
		var retval:Dynamic = {};
		for(k in map.keys())
			Reflect.setField(retval, k, map.get(k));
		return retval;
	}
/*
	private static function dataUriToBlob(dataURL){
			var split = dataURI.split(',');
			var mimetype = split[0];
			var binary = atob(dataURI.split(',')[1]), array = [];
			for(var i = 0; i < binary.length; i++) array.push(binary.charCodeAt(i));
			return new js.html.Blob([new Uint8Array(array)], {type: dataTYPE});
	}
*/
	private static function generatePosterImage(uri:String, title:String){
		var canvas = js.Browser.document.createCanvasElement();
        canvas.width = 720;
        canvas.height = 404;
        var ctx:js.html.CanvasRenderingContext2D = canvas.getContext("2d");
        ctx.font = "bold 55pt sans-serif";
        ctx.fillStyle = "#333";
        ctx.textAlign="center";
        ctx.fillText(title.toUpperCase(),360,200);
        ctx.font = "italic 12pt sans-serif";
        ctx.fillText(uri,360,250);
        return canvas.toDataURL();
	}
	
}