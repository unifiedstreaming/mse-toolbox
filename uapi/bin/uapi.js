/*
 *	uapi.js 📺 stable-64-g366a5c6, 2022-12-28 14:38:34
 */
(function ($hx_exports, $global) { "use strict";
$hx_exports["uapi"] = $hx_exports["uapi"] || {};
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var Argan = function() { };
$hxClasses["Argan"] = Argan;
Argan.__name__ = "Argan";
Argan.start = function(config) {
	if(null != config) {
		var args_set = new haxe_ds_StringMap();
		var _g = 0;
		var _g1 = Reflect.fields(config);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			args_set.h[f] = Reflect.field(config,f);
		}
		Argan.args = args_set;
	}
};
Argan.objectFromMap = function(map) {
	var obj = { };
	var h = map.h;
	var k_h = h;
	var k_keys = Object.keys(h);
	var k_length = k_keys.length;
	var k_current = 0;
	while(k_current < k_length) {
		var k = k_keys[k_current++];
		obj[k] = map.h[k];
	}
	return obj;
};
var EReg = function(r,opt) {
	this.r = new RegExp(r,opt.split("u").join(""));
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = "EReg";
EReg.prototype = {
	r: null
	,match: function(s) {
		if(this.r.global) {
			this.r.lastIndex = 0;
		}
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) {
			return this.r.m[n];
		} else {
			throw haxe_Exception.thrown("EReg::matched");
		}
	}
	,matchedRight: function() {
		if(this.r.m == null) {
			throw haxe_Exception.thrown("No string matched");
		}
		var sz = this.r.m.index + this.r.m[0].length;
		return HxOverrides.substr(this.r.s,sz,this.r.s.length - sz);
	}
	,matchedPos: function() {
		if(this.r.m == null) {
			throw haxe_Exception.thrown("No string matched");
		}
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = "HxOverrides";
HxOverrides.strDate = function(s) {
	switch(s.length) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d["setTime"](0);
		d["setUTCHours"](k[0]);
		d["setUTCMinutes"](k[1]);
		d["setUTCSeconds"](k[2]);
		return d;
	case 10:
		var k = s.split("-");
		return new Date(k[0],k[1] - 1,k[2],0,0,0);
	case 19:
		var k = s.split(" ");
		var y = k[0].split("-");
		var t = k[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw haxe_Exception.thrown("Invalid date format : " + s);
	}
};
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) {
		return undefined;
	}
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(len == null) {
		len = s.length;
	} else if(len < 0) {
		if(pos == 0) {
			len = s.length + len;
		} else {
			return "";
		}
	}
	return s.substr(pos,len);
};
HxOverrides.remove = function(a,obj) {
	var i = a.indexOf(obj);
	if(i == -1) {
		return false;
	}
	a.splice(i,1);
	return true;
};
HxOverrides.now = function() {
	return Date.now();
};
var Main = $hx_exports["uapi"] = function() {
	this.hooks = uapi_Hooks;
};
$hxClasses["Main"] = Main;
Main.__name__ = "Main";
Main.main = function() {
};
Main.getPlayers = function() {
	var players = { };
	var resources = haxe_Resource.listNames();
	resources.push("native");
	var _g = 0;
	while(_g < resources.length) {
		var n = resources[_g];
		++_g;
		if(n.indexOf("logo") == -1 && n.indexOf("template") == -1 && n != Argan.HELP_RESOURCE_KEY && !StringTools.endsWith(n,"-src") && !StringTools.endsWith(n,"-argan")) {
			players[n] = JSON.parse(haxe_Resource.getString(n + "-argan"));
		}
	}
	return players;
};
Main.getHelp = function() {
	return Argan.objectFromMap(haxe_Unserializer.run(haxe_Resource.getString("_help_map")));
};
Main.getPlayerVersions = function(player) {
	return JSON.parse(haxe_Resource.getString("" + player + "-src"));
};
Main.addPlayerSrc = function(player,urls) {
	var result = new Array(urls.length);
	var _g = 0;
	var _g1 = urls.length;
	while(_g < _g1) {
		var i = _g++;
		result[i] = Main.absUrl(urls[i]);
	}
	urls = result;
	Main.playerSrcExtended.h[player] = urls;
};
Main.overridePlayerSrcs = function(player_srcs_object) {
	Main.playerSrcOverride = player_srcs_object;
};
Main.writePlayer = function(parent,uri,player_version_string,player_config,inject_head,inject_body) {
	if(player_version_string == null) {
		player_version_string = "dashjs";
	}
	Argan.start(player_config);
	var iframe = window.document.createElement("iframe");
	iframe.src = "about:blank";
	iframe.setAttribute("importance","high");
	iframe.setAttribute("border","0");
	iframe.setAttribute("allowfullscreen","true");
	iframe.setAttribute("seamless","true");
	iframe.setAttribute("frameborder","0");
	var meta = player_version_string.split(":");
	var player = meta[0];
	if(haxe_Resource.listNames().indexOf(player) == -1 && player != "native") {
		throw haxe_Exception.thrown("unknown player \"" + player + "\", please select any of " + Std.string(haxe_Resource.listNames()) + ".");
	}
	var playerBody = haxe_Resource.getString("" + player);
	var tmp;
	if(playerBody != null) {
		var o = window;
		tmp = Object.prototype.hasOwnProperty.call(o,"Blob");
	} else {
		tmp = false;
	}
	if(tmp) {
		var split = playerBody.split(",");
		playerBody = URL.createObjectURL(new Blob([haxe_crypto_Base64.decode(split[1]).b.bufferValue],{ type : split[0].split(";")[0]}));
	}
	var version = meta[1];
	var head = [];
	var body = ["<script src=\"" + playerBody + "\"></script>"];
	var error = null;
	var last_src = "#";
	if(player == "native") {
		body = ["\n\t\t\t\t<script>\n\t\t\t\t\tvideo.src = uri;\n\t\t\t\t\tif(!!window.ApplePaySession){ //safari\n\t\t\t\t\t\tvideo.addEventListener(\"webkitneedkey\", (e) => {});\n\t\t\t\t\t\tvideo.addEventListener(\"webkitkeymessage\", (e) => {});\n\t\t\t\t\t\tvideo.addEventListener(\"webkitkeyadded\", (e) => {});\n\t\t\t\t\t\tvideo.addEventListener(\"webkitkeyerror\", (e) => {});\n\t\t\t\t\t}\n\t\t\t\t</script>\n\t\t\t"];
	} else if(Object.prototype.hasOwnProperty.call(Main.playerSrcExtended.h,player_version_string)) {
		var _g = 0;
		var _g1 = Main.playerSrcExtended.h[player_version_string];
		while(_g < _g1.length) {
			var src = _g1[_g];
			++_g;
			last_src = src;
			head.push("<script crossorigin src=\"" + last_src + "\"></script>");
		}
	} else {
		var srcs = Main.playerSrcOverride == null ? JSON.parse(haxe_Resource.getString("" + player + "-src")) : Main.playerSrcOverride;
		var _g = 0;
		var _g1 = version == null ? Reflect.fields(srcs) : [version];
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			version = s;
			if(Object.prototype.hasOwnProperty.call(srcs,s)) {
				var list = Reflect.field(srcs,s);
				var _g2 = 0;
				while(_g2 < list.length) {
					var src = list[_g2];
					++_g2;
					last_src = src;
					head.push("<script crossorigin src=\"" + last_src + "\"></script>");
				}
			} else {
				error = "unknown version:" + version + " for \"" + player + "\"";
			}
			break;
		}
	}
	Main.handleEitherType(inject_head,head);
	Main.handleEitherType(inject_body,body);
	var html = new haxe_Template(haxe_Resource.getString("template"));
	var html1 = encodeURIComponent(uri);
	var html2 = haxe_Resource.getString("logo");
	var player1 = player;
	var html3 = "uapi.js  " + Main.Version() + " | " + player + " (" + version + ") | " + uri;
	var html4;
	if(Argan.args != null && Object.prototype.hasOwnProperty.call(Argan.args.h,"autoplay")) {
		var _ = Argan.args.h["autoplay"];
		html4 = typeof(_) == "boolean" ? _ : _ != "false";
	} else {
		html4 = true;
	}
	var html5;
	if(Argan.args != null && Object.prototype.hasOwnProperty.call(Argan.args.h,"muted")) {
		var _ = Argan.args.h["muted"];
		html5 = typeof(_) == "boolean" ? _ : _ != "false";
	} else {
		html5 = false;
	}
	var html6;
	if(Argan.args != null && Object.prototype.hasOwnProperty.call(Argan.args.h,"controls")) {
		var _ = Argan.args.h["controls"];
		html6 = typeof(_) == "boolean" ? _ : _ != "false";
	} else {
		html6 = true;
	}
	var html7;
	if(Argan.args != null && Object.prototype.hasOwnProperty.call(Argan.args.h,"playsinline")) {
		var _ = Argan.args.h["playsinline"];
		html7 = typeof(_) == "boolean" ? _ : _ != "false";
	} else {
		html7 = true;
	}
	var html8 = html.execute({ uri : html1, loading : html2, title : player1, doc_title : html3, title_version : version, title_href : last_src, attr_autoplay : html4, attr_muted : html5, attr_controls : html6, attr_playsinline : html7, head : head.join("\n"), body : body.join("\n"), controls : error != null ? "<pre>uapi error:\n" + error + "</pre>" : haxe_Resource.getString("controls_template")},{ poster : function(resolve) {
		var canvasDataURL = Main.generatePosterImage(uri,player.toUpperCase());
		var split = canvasDataURL.split(",");
		var o = window;
		var retval = Object.prototype.hasOwnProperty.call(o,"Blob") ? URL.createObjectURL(new Blob([haxe_crypto_Base64.decode(split[1]).b.bufferValue],{ type : split[0].split(";")[0]})) : canvasDataURL;
		return "poster=\"" + retval + "\"";
	}});
	var container = window.document.createElement("div");
	container.style.position = "relative";
	container.style.width = "100%";
	container.style.height = error != null ? "44px" : "0";
	container.style.boxSizing = "unset";
	iframe.id = iframe.name = "uapi.js/" + player + "(" + version + ")/" + Main.id++;
	iframe.style.position = "absolute";
	iframe.style.resize = "both";
	iframe.style.top = iframe.style.left = "0";
	iframe.style.width = iframe.style.height = "100%";
	container.appendChild(iframe);
	parent.appendChild(container);
	var retval = new Promise(function(resolve,reject) {
		var iframe_loaded = false;
		var delayed_errors = [];
		iframe.addEventListener("load",function(event) {
			iframe_loaded = true;
			while(delayed_errors.length > 0) (delayed_errors.pop())();
			var hndl = null;
			hndl = { reload : function(uri,version,config) {
				if(version == null) {
					version = player_version_string;
				}
				if(config == null) {
					config = player_config;
				}
				hndl.frame.parentElement.parentElement.removeChild(hndl.frame.parentElement);
				return Main.writePlayer(parent,uri,version,config,inject_head,inject_body).catch(function(e) {
					hndl.frame = e.target.frameElement;
					return hndl;
				}).then(function(nframe) {
					var _g = 0;
					var _g1 = Reflect.fields(nframe);
					while(_g < _g1.length) {
						var k = _g1[_g];
						++_g;
						hndl[k] = Reflect.field(nframe,k);
					}
					return nframe;
				});
			}, destroy : function() {
				iframe.parentElement.parentElement.removeChild(iframe.parentElement);
				hndl = null;
			}, frame : iframe, player : Reflect.field(iframe.contentWindow,"player"), video : Reflect.field(iframe.contentWindow,"video"), controls_custom : Reflect.field(iframe.contentWindow,"controls_custom")};
			var vview = Reflect.field(window,"vview");
			if(vview != null) {
				var h = Reflect.field(vview,"frameAdded");
				h.apply(vview,[]);
			}
			resolve(hndl);
		});
		var topWindow = window;
		var handleError = null;
		var messageCount = 0;
		handleError = function(error,message,$window,logToConsole) {
			if(logToConsole == null) {
				logToConsole = true;
			}
			var handleError1;
			if(Argan.args != null && Object.prototype.hasOwnProperty.call(Argan.args.h,"quiet")) {
				var _ = Argan.args.h["quiet"];
				handleError1 = typeof(_) == "boolean" ? _ : _ != "false";
			} else {
				handleError1 = false;
			}
			if(handleError1) {
				return;
			}
			if(iframe_loaded) {
				var msg = $window.document.createElement("div");
				msg.className = "message";
				message = StringTools.replace(message,"\\n","\n");
				msg.innerText += "💬 " + message + "\n";
				$window.document.getElementById("error").appendChild(msg);
				if(logToConsole) {
					topWindow.console.error(error);
				}
				var handleError1 = messageCount += 1;
				$window.messagecount.innerText = "" + handleError1 + " message" + (messageCount > 1 ? "s" : "");
				$window.resetControlsHeight();
				$window.resetAspectRatio();
			} else {
				var _g = handleError;
				var a1 = error;
				var a2 = message;
				var a3 = $window;
				var a4 = logToConsole;
				var handleError1 = function() {
					_g(a1,a2,a3,a4);
				};
				delayed_errors.push(handleError1);
			}
		};
		var iframe1 = iframe;
		iframe1.hook = function(contentWindow) {
			contentWindow.config = player_config != null ? Reflect.field(player_config,player) : player_config;
			contentWindow.addEventListener("error",function(e) {
				if(e.message != "ResizeObserver loop limit exceeded") {
					reject(e);
					handleError(e,"error.message:" + e.message + ", " + e.filename + ":" + e.lineno,contentWindow);
				}
			});
			contentWindow.onunhandledrejection = function(e) {
				reject(e);
				handleError(e,e.reason.toString(),contentWindow);
			};
			uapi_Hooks.hookMethods(contentWindow.console,["error","warn"]).pipe(function(method,args) {
				handleError(args,"console." + method + ":\t" + Std.string(args),contentWindow,false);
			});
		};
		iframe1.hook_end = function(contentWindow,video) {
			contentWindow.messagecount.addEventListener("click",function(event) {
				event.target.parentElement.classList.toggle("folded");
				contentWindow.resetControlsHeight();
				contentWindow.resetAspectRatio();
			});
			video.addEventListener("error",function(e) {
				window["lastError"] = video.error;
				var msg;
				switch(video.error.code) {
				case 1:
					msg = "MEDIA_ERR_ABORTED";
					break;
				case 2:
					msg = "MEDIA_ERR_NETWORK";
					break;
				case 3:
					msg = "MEDIA_ERR_DECODE";
					break;
				case 4:
					msg = "MEDIA_ERR_SRC_NOT_SUPPORTED";
					break;
				case 5:
					msg = "MEDIA_ERR_ENCRYPTED";
					break;
				default:
					msg = "UNKNOWN";
				}
				if(Reflect.field(video.error,"message") != null) {
					msg += "\nMediaError.message: " + Std.string(Reflect.field(video.error,"message"));
				}
				var log = "HTMLMediaElement MediaError while playing\n" + uri + "\n\n" + msg + "\n\nsee\nhttps://developer.mozilla.org/en-US/docs/Web/API/MediaError for more details";
				handleError(e,log,contentWindow);
				if(player != "native" && !Object.prototype.hasOwnProperty.call(contentWindow,"player")) {
					throw haxe_Exception.thrown("unable to load " + player_version_string);
				}
			});
		};
	});
	if(uapi_JsUtils.isIE()) {
		var doc = iframe.contentWindow != null ? iframe.contentWindow : iframe.contentDocument;
		if(doc.document) {
			doc = doc.document;
		}
		doc.open();
		doc.write(html8);
		doc.close();
	} else {
		var o = window;
		if(Object.prototype.hasOwnProperty.call(o,"Blob")) {
			iframe.setAttribute("sandbox","allow-scripts allow-same-origin allow-modals");
			var tmp = haxe_io_Bytes.ofString(html8).b.bufferValue;
			iframe.src = URL.createObjectURL(new Blob([tmp],{ type : "text/html"}));
		} else {
			var tmp = "javascript:atob(\"" + haxe_crypto_Base64.encode(haxe_io_Bytes.ofString(html8));
			iframe.src = tmp + "\");";
		}
	}
	return retval;
};
Main.handleEitherType = function(either,array) {
	if(typeof(either) == "string") {
		array.push(either);
	} else if(either != null) {
		var arr = ((either) instanceof Array) ? either : [either];
		var _g = 0;
		while(_g < arr.length) {
			var el = arr[_g];
			++_g;
			var pos = Object.prototype.hasOwnProperty.call(el,"index") && el.index == null;
			array.splice(pos ? el.index : -1,0,el.content);
		}
	}
};
Main.HashPipe = function(immediate) {
	return Main.HashPipeJs(immediate);
};
Main.HashPipeJs = function(immediate) {
	if(immediate == null) {
		immediate = false;
	}
	return { pipe : function(func) {
		var retval = uapi_Hooks.HashPipe(immediate).pipe(function(data) {
			func({ args : Main.mapToDynamic(data.args), values : data.values, update : function(args,values,rewrite,toggle) {
				data.update(Main.dynamicToMap(args),values,rewrite,toggle,true);
			}});
		});
		var _hx_func = retval.update;
		var _hx_args = retval.args();
		retval.args = function() {
			return Main.mapToDynamic(_hx_args);
		};
		retval.update = function(args,values,rewrite,toggle) {
			_hx_func(Main.dynamicToMap(args),values,rewrite,toggle);
		};
		return retval;
	}};
};
Main.KeyValueStringParser = function(location,QueryString) {
	return Main.KeyValueStringParserJs(location,QueryString);
};
Main.KeyValueStringParserJs = function(location,QueryString) {
	if(QueryString == null) {
		QueryString = true;
	}
	return Main.mapToDynamic(uapi_Utils.KeyValueStringParser(location,QueryString));
};
Main.Version = function() {
	return "stable-64-g366a5c6, 2022-12-28 14:38:34";
};
Main.write = function(str) {
	uapi_JsUtils.write(str);
};
Main.loadScript = function(str) {
	uapi_JsUtils.loadScript(str);
};
Main.absUrl = function(url) {
	var abs = window.document.createElement("a");
	abs.href = url;
	return abs.href;
};
Main.requestUrl = function(url,binary,method,headers,body) {
	return uapi_JsUtils.HttpRequest(url,binary,method,headers,body);
};
Main.dynamicToMap = function(object) {
	var retval = new haxe_ds_StringMap();
	var _g = 0;
	var _g1 = Reflect.fields(object);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		retval.h[f] = Reflect.field(object,f);
	}
	return retval;
};
Main.mapToDynamic = function(map) {
	var retval = { };
	var h = map.h;
	var k_h = h;
	var k_keys = Object.keys(h);
	var k_length = k_keys.length;
	var k_current = 0;
	while(k_current < k_length) {
		var k = k_keys[k_current++];
		retval[k] = map.h[k];
	}
	return retval;
};
Main.generatePosterImage = function(uri,title) {
	var canvas = window.document.createElement("canvas");
	canvas.width = 720;
	canvas.height = 404;
	var ctx = canvas.getContext("2d");
	ctx.font = "bold 55pt sans-serif";
	ctx.fillStyle = "#333";
	ctx.textAlign = "center";
	ctx.fillText(title.toUpperCase(),360,200);
	ctx.font = "italic 12pt sans-serif";
	ctx.fillText(uri,360,250);
	return canvas.toDataURL();
};
Main.prototype = {
	hooks: null
	,__class__: Main
};
Math.__name__ = "Math";
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = "Reflect";
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( _g ) {
		return null;
	}
};
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) {
		return null;
	} else {
		var tmp1;
		if(o.__properties__) {
			tmp = o.__properties__["get_" + field];
			tmp1 = tmp;
		} else {
			tmp1 = false;
		}
		if(tmp1) {
			return o[tmp]();
		} else {
			return o[field];
		}
	}
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	var tmp1;
	if(o.__properties__) {
		tmp = o.__properties__["set_" + field];
		tmp1 = tmp;
	} else {
		tmp1 = false;
	}
	if(tmp1) {
		o[tmp](value);
	} else {
		o[field] = value;
	}
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) {
			a.push(f);
		}
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	if(typeof(f) == "function") {
		return !(f.__name__ || f.__ename__);
	} else {
		return false;
	}
};
Reflect.isObject = function(v) {
	if(v == null) {
		return false;
	}
	var t = typeof(v);
	if(!(t == "string" || t == "object" && v.__enum__ == null)) {
		if(t == "function") {
			return (v.__name__ || v.__ename__) != null;
		} else {
			return false;
		}
	} else {
		return true;
	}
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = "Std";
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	if(x != null) {
		var _g = 0;
		var _g1 = x.length;
		while(_g < _g1) {
			var i = _g++;
			var c = x.charCodeAt(i);
			if(c <= 8 || c >= 14 && c != 32 && c != 45) {
				var nc = x.charCodeAt(i + 1);
				var v = parseInt(x,nc == 120 || nc == 88 ? 16 : 10);
				if(isNaN(v)) {
					return null;
				} else {
					return v;
				}
			}
		}
	}
	return null;
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = "StringBuf";
StringBuf.prototype = {
	b: null
	,__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = "StringTools";
StringTools.htmlEscape = function(s,quotes) {
	var buf_b = "";
	var _g_offset = 0;
	var _g_s = s;
	while(_g_offset < _g_s.length) {
		var s = _g_s;
		var index = _g_offset++;
		var c = s.charCodeAt(index);
		if(c >= 55296 && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(index + 1) & 1023;
		}
		var c1 = c;
		if(c1 >= 65536) {
			++_g_offset;
		}
		var code = c1;
		switch(code) {
		case 34:
			if(quotes) {
				buf_b += "&quot;";
			} else {
				buf_b += String.fromCodePoint(code);
			}
			break;
		case 38:
			buf_b += "&amp;";
			break;
		case 39:
			if(quotes) {
				buf_b += "&#039;";
			} else {
				buf_b += String.fromCodePoint(code);
			}
			break;
		case 60:
			buf_b += "&lt;";
			break;
		case 62:
			buf_b += "&gt;";
			break;
		default:
			buf_b += String.fromCodePoint(code);
		}
	}
	return buf_b;
};
StringTools.startsWith = function(s,start) {
	if(s.length >= start.length) {
		return s.lastIndexOf(start,0) == 0;
	} else {
		return false;
	}
};
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	if(slen >= elen) {
		return s.indexOf(end,slen - elen) == slen - elen;
	} else {
		return false;
	}
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	if(!(c > 8 && c < 14)) {
		return c == 32;
	} else {
		return true;
	}
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,r,l - r);
	} else {
		return s;
	}
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,0,l - r);
	} else {
		return s;
	}
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = "Type";
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) {
		throw haxe_Exception.thrown("No such constructor " + constr);
	}
	if(Reflect.isFunction(f)) {
		if(params == null) {
			throw haxe_Exception.thrown("Constructor " + constr + " need parameters");
		}
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) {
		throw haxe_Exception.thrown("Constructor " + constr + " does not need parameters");
	}
	return f;
};
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
};
var XmlType = {};
XmlType.toString = function(this1) {
	switch(this1) {
	case 0:
		return "Element";
	case 1:
		return "PCData";
	case 2:
		return "CData";
	case 3:
		return "Comment";
	case 4:
		return "DocType";
	case 5:
		return "ProcessingInstruction";
	case 6:
		return "Document";
	}
};
var Xml = function(nodeType) {
	this.nodeType = nodeType;
	this.children = [];
	this.attributeMap = new haxe_ds_StringMap();
};
$hxClasses["Xml"] = Xml;
Xml.__name__ = "Xml";
Xml.parse = function(str) {
	return haxe_xml_Parser.parse(str);
};
Xml.createElement = function(name) {
	var xml = new Xml(Xml.Element);
	if(xml.nodeType != Xml.Element) {
		throw haxe_Exception.thrown("Bad node type, expected Element but found " + (xml.nodeType == null ? "null" : XmlType.toString(xml.nodeType)));
	}
	xml.nodeName = name;
	return xml;
};
Xml.createPCData = function(data) {
	var xml = new Xml(Xml.PCData);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) {
		throw haxe_Exception.thrown("Bad node type, unexpected " + (xml.nodeType == null ? "null" : XmlType.toString(xml.nodeType)));
	}
	xml.nodeValue = data;
	return xml;
};
Xml.createCData = function(data) {
	var xml = new Xml(Xml.CData);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) {
		throw haxe_Exception.thrown("Bad node type, unexpected " + (xml.nodeType == null ? "null" : XmlType.toString(xml.nodeType)));
	}
	xml.nodeValue = data;
	return xml;
};
Xml.createComment = function(data) {
	var xml = new Xml(Xml.Comment);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) {
		throw haxe_Exception.thrown("Bad node type, unexpected " + (xml.nodeType == null ? "null" : XmlType.toString(xml.nodeType)));
	}
	xml.nodeValue = data;
	return xml;
};
Xml.createDocType = function(data) {
	var xml = new Xml(Xml.DocType);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) {
		throw haxe_Exception.thrown("Bad node type, unexpected " + (xml.nodeType == null ? "null" : XmlType.toString(xml.nodeType)));
	}
	xml.nodeValue = data;
	return xml;
};
Xml.createProcessingInstruction = function(data) {
	var xml = new Xml(Xml.ProcessingInstruction);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) {
		throw haxe_Exception.thrown("Bad node type, unexpected " + (xml.nodeType == null ? "null" : XmlType.toString(xml.nodeType)));
	}
	xml.nodeValue = data;
	return xml;
};
Xml.createDocument = function() {
	return new Xml(Xml.Document);
};
Xml.prototype = {
	nodeType: null
	,nodeName: null
	,nodeValue: null
	,parent: null
	,children: null
	,attributeMap: null
	,get: function(att) {
		if(this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		return this.attributeMap.h[att];
	}
	,set: function(att,value) {
		if(this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		this.attributeMap.h[att] = value;
	}
	,remove: function(att) {
		if(this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		var _this = this.attributeMap;
		if(Object.prototype.hasOwnProperty.call(_this.h,att)) {
			delete(_this.h[att]);
		}
	}
	,exists: function(att) {
		if(this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		return Object.prototype.hasOwnProperty.call(this.attributeMap.h,att);
	}
	,attributes: function() {
		if(this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		return new haxe_ds__$StringMap_StringMapKeyIterator(this.attributeMap.h);
	}
	,elements: function() {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		var _g = [];
		var _g1 = 0;
		var _g2 = this.children;
		while(_g1 < _g2.length) {
			var child = _g2[_g1];
			++_g1;
			if(child.nodeType == Xml.Element) {
				_g.push(child);
			}
		}
		var ret = _g;
		return new haxe_iterators_ArrayIterator(ret);
	}
	,addChild: function(x) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		if(x.parent != null) {
			x.parent.removeChild(x);
		}
		this.children.push(x);
		x.parent = this;
	}
	,removeChild: function(x) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		if(HxOverrides.remove(this.children,x)) {
			x.parent = null;
			return true;
		}
		return false;
	}
	,toString: function() {
		return haxe_xml_Printer.print(this);
	}
	,__class__: Xml
};
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = "haxe.IMap";
var haxe_Exception = function(message,previous,native) {
	Error.call(this,message);
	this.message = message;
	this.__previousException = previous;
	this.__nativeException = native != null ? native : this;
};
$hxClasses["haxe.Exception"] = haxe_Exception;
haxe_Exception.__name__ = "haxe.Exception";
haxe_Exception.caught = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value;
	} else if(((value) instanceof Error)) {
		return new haxe_Exception(value.message,null,value);
	} else {
		return new haxe_ValueException(value,null,value);
	}
};
haxe_Exception.thrown = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value.get_native();
	} else if(((value) instanceof Error)) {
		return value;
	} else {
		var e = new haxe_ValueException(value);
		return e;
	}
};
haxe_Exception.__super__ = Error;
haxe_Exception.prototype = $extend(Error.prototype,{
	__skipStack: null
	,__nativeException: null
	,__previousException: null
	,unwrap: function() {
		return this.__nativeException;
	}
	,get_native: function() {
		return this.__nativeException;
	}
	,__class__: haxe_Exception
	,__properties__: {get_native:"get_native"}
});
var haxe_Resource = function() { };
$hxClasses["haxe.Resource"] = haxe_Resource;
haxe_Resource.__name__ = "haxe.Resource";
haxe_Resource.listNames = function() {
	var _g = [];
	var _g1 = 0;
	var _g2 = haxe_Resource.content;
	while(_g1 < _g2.length) {
		var x = _g2[_g1];
		++_g1;
		_g.push(x.name);
	}
	return _g;
};
haxe_Resource.getString = function(name) {
	var _g = 0;
	var _g1 = haxe_Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		if(x.name == name) {
			if(x.str != null) {
				return x.str;
			}
			var b = haxe_crypto_Base64.decode(x.data);
			return b.toString();
		}
	}
	return null;
};
var haxe__$Template_TemplateExpr = $hxEnums["haxe._Template.TemplateExpr"] = { __ename__:true,__constructs__:null
	,OpVar: ($_=function(v) { return {_hx_index:0,v:v,__enum__:"haxe._Template.TemplateExpr",toString:$estr}; },$_._hx_name="OpVar",$_.__params__ = ["v"],$_)
	,OpExpr: ($_=function(expr) { return {_hx_index:1,expr:expr,__enum__:"haxe._Template.TemplateExpr",toString:$estr}; },$_._hx_name="OpExpr",$_.__params__ = ["expr"],$_)
	,OpIf: ($_=function(expr,eif,eelse) { return {_hx_index:2,expr:expr,eif:eif,eelse:eelse,__enum__:"haxe._Template.TemplateExpr",toString:$estr}; },$_._hx_name="OpIf",$_.__params__ = ["expr","eif","eelse"],$_)
	,OpStr: ($_=function(str) { return {_hx_index:3,str:str,__enum__:"haxe._Template.TemplateExpr",toString:$estr}; },$_._hx_name="OpStr",$_.__params__ = ["str"],$_)
	,OpBlock: ($_=function(l) { return {_hx_index:4,l:l,__enum__:"haxe._Template.TemplateExpr",toString:$estr}; },$_._hx_name="OpBlock",$_.__params__ = ["l"],$_)
	,OpForeach: ($_=function(expr,loop) { return {_hx_index:5,expr:expr,loop:loop,__enum__:"haxe._Template.TemplateExpr",toString:$estr}; },$_._hx_name="OpForeach",$_.__params__ = ["expr","loop"],$_)
	,OpMacro: ($_=function(name,params) { return {_hx_index:6,name:name,params:params,__enum__:"haxe._Template.TemplateExpr",toString:$estr}; },$_._hx_name="OpMacro",$_.__params__ = ["name","params"],$_)
};
haxe__$Template_TemplateExpr.__constructs__ = [haxe__$Template_TemplateExpr.OpVar,haxe__$Template_TemplateExpr.OpExpr,haxe__$Template_TemplateExpr.OpIf,haxe__$Template_TemplateExpr.OpStr,haxe__$Template_TemplateExpr.OpBlock,haxe__$Template_TemplateExpr.OpForeach,haxe__$Template_TemplateExpr.OpMacro];
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
$hxClasses["haxe.iterators.ArrayIterator"] = haxe_iterators_ArrayIterator;
haxe_iterators_ArrayIterator.__name__ = "haxe.iterators.ArrayIterator";
haxe_iterators_ArrayIterator.prototype = {
	array: null
	,current: null
	,hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
	,__class__: haxe_iterators_ArrayIterator
};
var haxe_Template = function(str) {
	var tokens = this.parseTokens(str);
	this.expr = this.parseBlock(tokens);
	if(!tokens.isEmpty()) {
		throw haxe_Exception.thrown("Unexpected '" + Std.string(tokens.first().s) + "'");
	}
};
$hxClasses["haxe.Template"] = haxe_Template;
haxe_Template.__name__ = "haxe.Template";
haxe_Template.prototype = {
	expr: null
	,context: null
	,macros: null
	,stack: null
	,buf: null
	,execute: function(context,macros) {
		this.macros = macros == null ? { } : macros;
		this.context = context;
		this.stack = new haxe_ds_List();
		this.buf = new StringBuf();
		this.run(this.expr);
		return this.buf.b;
	}
	,resolve: function(v) {
		if(v == "__current__") {
			return this.context;
		}
		if(Reflect.isObject(this.context)) {
			var value = Reflect.getProperty(this.context,v);
			if(value != null || Object.prototype.hasOwnProperty.call(this.context,v)) {
				return value;
			}
		}
		var _g_head = this.stack.h;
		while(_g_head != null) {
			var val = _g_head.item;
			_g_head = _g_head.next;
			var ctx = val;
			var value = Reflect.getProperty(ctx,v);
			if(value != null || Object.prototype.hasOwnProperty.call(ctx,v)) {
				return value;
			}
		}
		return Reflect.field(haxe_Template.globals,v);
	}
	,parseTokens: function(data) {
		var tokens = new haxe_ds_List();
		while(haxe_Template.splitter.match(data)) {
			var p = haxe_Template.splitter.matchedPos();
			if(p.pos > 0) {
				tokens.add({ p : HxOverrides.substr(data,0,p.pos), s : true, l : null});
			}
			if(HxOverrides.cca(data,p.pos) == 58) {
				tokens.add({ p : HxOverrides.substr(data,p.pos + 2,p.len - 4), s : false, l : null});
				data = haxe_Template.splitter.matchedRight();
				continue;
			}
			var parp = p.pos + p.len;
			var npar = 1;
			var params = [];
			var part = "";
			while(true) {
				var c = HxOverrides.cca(data,parp);
				++parp;
				if(c == 40) {
					++npar;
				} else if(c == 41) {
					--npar;
					if(npar <= 0) {
						break;
					}
				} else if(c == null) {
					throw haxe_Exception.thrown("Unclosed macro parenthesis");
				}
				if(c == 44 && npar == 1) {
					params.push(part);
					part = "";
				} else {
					part += String.fromCodePoint(c);
				}
			}
			params.push(part);
			tokens.add({ p : haxe_Template.splitter.matched(2), s : false, l : params});
			data = HxOverrides.substr(data,parp,data.length - parp);
		}
		if(data.length > 0) {
			tokens.add({ p : data, s : true, l : null});
		}
		return tokens;
	}
	,parseBlock: function(tokens) {
		var l = new haxe_ds_List();
		while(true) {
			var t = tokens.first();
			if(t == null) {
				break;
			}
			if(!t.s && (t.p == "end" || t.p == "else" || HxOverrides.substr(t.p,0,7) == "elseif ")) {
				break;
			}
			l.add(this.parse(tokens));
		}
		if(l.length == 1) {
			return l.first();
		}
		return haxe__$Template_TemplateExpr.OpBlock(l);
	}
	,parse: function(tokens) {
		var t = tokens.pop();
		var p = t.p;
		if(t.s) {
			return haxe__$Template_TemplateExpr.OpStr(p);
		}
		if(t.l != null) {
			var pe = new haxe_ds_List();
			var _g = 0;
			var _g1 = t.l;
			while(_g < _g1.length) {
				var p1 = _g1[_g];
				++_g;
				pe.add(this.parseBlock(this.parseTokens(p1)));
			}
			return haxe__$Template_TemplateExpr.OpMacro(p,pe);
		}
		var kwdEnd = function(kwd) {
			var pos = -1;
			var length = kwd.length;
			if(HxOverrides.substr(p,0,length) == kwd) {
				pos = length;
				var _g_offset = 0;
				var _g_s = HxOverrides.substr(p,length,null);
				while(_g_offset < _g_s.length) {
					var c = _g_s.charCodeAt(_g_offset++);
					if(c == 32) {
						++pos;
					} else {
						break;
					}
				}
			}
			return pos;
		};
		var pos = kwdEnd("if");
		if(pos > 0) {
			p = HxOverrides.substr(p,pos,p.length - pos);
			var e = this.parseExpr(p);
			var eif = this.parseBlock(tokens);
			var t = tokens.first();
			var eelse;
			if(t == null) {
				throw haxe_Exception.thrown("Unclosed 'if'");
			}
			if(t.p == "end") {
				tokens.pop();
				eelse = null;
			} else if(t.p == "else") {
				tokens.pop();
				eelse = this.parseBlock(tokens);
				t = tokens.pop();
				if(t == null || t.p != "end") {
					throw haxe_Exception.thrown("Unclosed 'else'");
				}
			} else {
				t.p = HxOverrides.substr(t.p,4,t.p.length - 4);
				eelse = this.parse(tokens);
			}
			return haxe__$Template_TemplateExpr.OpIf(e,eif,eelse);
		}
		var pos = kwdEnd("foreach");
		if(pos >= 0) {
			p = HxOverrides.substr(p,pos,p.length - pos);
			var e = this.parseExpr(p);
			var efor = this.parseBlock(tokens);
			var t = tokens.pop();
			if(t == null || t.p != "end") {
				throw haxe_Exception.thrown("Unclosed 'foreach'");
			}
			return haxe__$Template_TemplateExpr.OpForeach(e,efor);
		}
		if(haxe_Template.expr_splitter.match(p)) {
			return haxe__$Template_TemplateExpr.OpExpr(this.parseExpr(p));
		}
		return haxe__$Template_TemplateExpr.OpVar(p);
	}
	,parseExpr: function(data) {
		var l = new haxe_ds_List();
		var expr = data;
		while(haxe_Template.expr_splitter.match(data)) {
			var p = haxe_Template.expr_splitter.matchedPos();
			var k = p.pos + p.len;
			if(p.pos != 0) {
				l.add({ p : HxOverrides.substr(data,0,p.pos), s : true});
			}
			var p1 = haxe_Template.expr_splitter.matched(0);
			l.add({ p : p1, s : p1.indexOf("\"") >= 0});
			data = haxe_Template.expr_splitter.matchedRight();
		}
		if(data.length != 0) {
			var _g_offset = 0;
			var _g_s = data;
			while(_g_offset < _g_s.length) {
				var _g1_key = _g_offset;
				var _g1_value = _g_s.charCodeAt(_g_offset++);
				var i = _g1_key;
				var c = _g1_value;
				if(c != 32) {
					l.add({ p : HxOverrides.substr(data,i,null), s : true});
					break;
				}
			}
		}
		var e;
		try {
			e = this.makeExpr(l);
			if(!l.isEmpty()) {
				throw haxe_Exception.thrown(l.first().p);
			}
		} catch( _g ) {
			var _g1 = haxe_Exception.caught(_g).unwrap();
			if(typeof(_g1) == "string") {
				var s = _g1;
				throw haxe_Exception.thrown("Unexpected '" + s + "' in " + expr);
			} else {
				throw _g;
			}
		}
		return function() {
			try {
				return e();
			} catch( _g ) {
				var exc = haxe_Exception.caught(_g).unwrap();
				throw haxe_Exception.thrown("Error : " + Std.string(exc) + " in " + expr);
			}
		};
	}
	,makeConst: function(v) {
		haxe_Template.expr_trim.match(v);
		v = haxe_Template.expr_trim.matched(1);
		if(HxOverrides.cca(v,0) == 34) {
			var str = HxOverrides.substr(v,1,v.length - 2);
			return function() {
				return str;
			};
		}
		if(haxe_Template.expr_int.match(v)) {
			var i = Std.parseInt(v);
			return function() {
				return i;
			};
		}
		if(haxe_Template.expr_float.match(v)) {
			var f = parseFloat(v);
			return function() {
				return f;
			};
		}
		var me = this;
		return function() {
			return me.resolve(v);
		};
	}
	,makePath: function(e,l) {
		var p = l.first();
		if(p == null || p.p != ".") {
			return e;
		}
		l.pop();
		var field = l.pop();
		if(field == null || !field.s) {
			throw haxe_Exception.thrown(field.p);
		}
		var f = field.p;
		haxe_Template.expr_trim.match(f);
		f = haxe_Template.expr_trim.matched(1);
		return this.makePath(function() {
			return Reflect.field(e(),f);
		},l);
	}
	,makeExpr: function(l) {
		return this.makePath(this.makeExpr2(l),l);
	}
	,skipSpaces: function(l) {
		var p = l.first();
		while(p != null) {
			var _g_offset = 0;
			var _g_s = p.p;
			while(_g_offset < _g_s.length) {
				var c = _g_s.charCodeAt(_g_offset++);
				if(c != 32) {
					return;
				}
			}
			l.pop();
			p = l.first();
		}
	}
	,makeExpr2: function(l) {
		this.skipSpaces(l);
		var p = l.pop();
		this.skipSpaces(l);
		if(p == null) {
			throw haxe_Exception.thrown("<eof>");
		}
		if(p.s) {
			return this.makeConst(p.p);
		}
		switch(p.p) {
		case "!":
			var e = this.makeExpr(l);
			return function() {
				var v = e();
				if(v != null) {
					return v == false;
				} else {
					return true;
				}
			};
		case "(":
			this.skipSpaces(l);
			var e1 = this.makeExpr(l);
			this.skipSpaces(l);
			var p1 = l.pop();
			if(p1 == null || p1.s) {
				throw haxe_Exception.thrown(p1);
			}
			if(p1.p == ")") {
				return e1;
			}
			this.skipSpaces(l);
			var e2 = this.makeExpr(l);
			this.skipSpaces(l);
			var p2 = l.pop();
			this.skipSpaces(l);
			if(p2 == null || p2.p != ")") {
				throw haxe_Exception.thrown(p2);
			}
			switch(p1.p) {
			case "!=":
				return function() {
					return e1() != e2();
				};
			case "&&":
				return function() {
					return e1() && e2();
				};
			case "*":
				return function() {
					return e1() * e2();
				};
			case "+":
				return function() {
					return e1() + e2();
				};
			case "-":
				return function() {
					return e1() - e2();
				};
			case "/":
				return function() {
					return e1() / e2();
				};
			case "<":
				return function() {
					return e1() < e2();
				};
			case "<=":
				return function() {
					return e1() <= e2();
				};
			case "==":
				return function() {
					return e1() == e2();
				};
			case ">":
				return function() {
					return e1() > e2();
				};
			case ">=":
				return function() {
					return e1() >= e2();
				};
			case "||":
				return function() {
					return e1() || e2();
				};
			default:
				throw haxe_Exception.thrown("Unknown operation " + p1.p);
			}
			break;
		case "-":
			var e3 = this.makeExpr(l);
			return function() {
				return -e3();
			};
		}
		throw haxe_Exception.thrown(p.p);
	}
	,run: function(e) {
		switch(e._hx_index) {
		case 0:
			var v = e.v;
			var _this = this.buf;
			var x = Std.string(this.resolve(v));
			_this.b += Std.string(x);
			break;
		case 1:
			var e1 = e.expr;
			var _this = this.buf;
			var x = Std.string(e1());
			_this.b += Std.string(x);
			break;
		case 2:
			var e1 = e.expr;
			var eif = e.eif;
			var eelse = e.eelse;
			var v = e1();
			if(v == null || v == false) {
				if(eelse != null) {
					this.run(eelse);
				}
			} else {
				this.run(eif);
			}
			break;
		case 3:
			var str = e.str;
			this.buf.b += str == null ? "null" : "" + str;
			break;
		case 4:
			var l = e.l;
			var _g_head = l.h;
			while(_g_head != null) {
				var val = _g_head.item;
				_g_head = _g_head.next;
				var e1 = val;
				this.run(e1);
			}
			break;
		case 5:
			var e1 = e.expr;
			var loop = e.loop;
			var v = e1();
			try {
				var x = $getIterator(v);
				if(x.hasNext == null) {
					throw haxe_Exception.thrown(null);
				}
				v = x;
			} catch( _g ) {
				try {
					if(v.hasNext == null) {
						throw haxe_Exception.thrown(null);
					}
				} catch( _g1 ) {
					throw haxe_Exception.thrown("Cannot iter on " + Std.string(v));
				}
			}
			this.stack.push(this.context);
			var v1 = v;
			var ctx = v1;
			while(ctx.hasNext()) {
				var ctx1 = ctx.next();
				this.context = ctx1;
				this.run(loop);
			}
			this.context = this.stack.pop();
			break;
		case 6:
			var m = e.name;
			var params = e.params;
			var v = Reflect.field(this.macros,m);
			var pl = [];
			var old = this.buf;
			pl.push($bind(this,this.resolve));
			var _g_head = params.h;
			while(_g_head != null) {
				var val = _g_head.item;
				_g_head = _g_head.next;
				var p = val;
				if(p._hx_index == 0) {
					var v1 = p.v;
					pl.push(this.resolve(v1));
				} else {
					this.buf = new StringBuf();
					this.run(p);
					pl.push(this.buf.b);
				}
			}
			this.buf = old;
			try {
				var _this = this.buf;
				var x = Std.string(v.apply(this.macros,pl));
				_this.b += Std.string(x);
			} catch( _g ) {
				var e = haxe_Exception.caught(_g).unwrap();
				var plstr;
				try {
					plstr = pl.join(",");
				} catch( _g1 ) {
					plstr = "???";
				}
				var msg = "Macro call " + m + "(" + plstr + ") failed (" + Std.string(e) + ")";
				throw haxe_Exception.thrown(msg);
			}
			break;
		}
	}
	,__class__: haxe_Template
};
var haxe__$Unserializer_DefaultResolver = function() {
};
$hxClasses["haxe._Unserializer.DefaultResolver"] = haxe__$Unserializer_DefaultResolver;
haxe__$Unserializer_DefaultResolver.__name__ = "haxe._Unserializer.DefaultResolver";
haxe__$Unserializer_DefaultResolver.prototype = {
	resolveClass: function(name) {
		return $hxClasses[name];
	}
	,resolveEnum: function(name) {
		return $hxEnums[name];
	}
	,__class__: haxe__$Unserializer_DefaultResolver
};
var haxe_Unserializer = function(buf) {
	this.buf = buf;
	this.length = this.buf.length;
	this.pos = 0;
	this.scache = [];
	this.cache = [];
	var r = haxe_Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = new haxe__$Unserializer_DefaultResolver();
		haxe_Unserializer.DEFAULT_RESOLVER = r;
	}
	this.resolver = r;
};
$hxClasses["haxe.Unserializer"] = haxe_Unserializer;
haxe_Unserializer.__name__ = "haxe.Unserializer";
haxe_Unserializer.initCodes = function() {
	var codes = [];
	var _g = 0;
	var _g1 = haxe_Unserializer.BASE64.length;
	while(_g < _g1) {
		var i = _g++;
		codes[haxe_Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
};
haxe_Unserializer.run = function(v) {
	return new haxe_Unserializer(v).unserialize();
};
haxe_Unserializer.prototype = {
	buf: null
	,pos: null
	,length: null
	,cache: null
	,scache: null
	,resolver: null
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) {
				break;
			}
			if(c == 45) {
				if(this.pos != fpos) {
					break;
				}
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) {
				break;
			}
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) {
			k *= -1;
		}
		return k;
	}
	,readFloat: function() {
		var p1 = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) {
				break;
			}
			if(c >= 43 && c < 58 || c == 101 || c == 69) {
				this.pos++;
			} else {
				break;
			}
		}
		return parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) {
				throw haxe_Exception.thrown("Invalid object");
			}
			if(this.buf.charCodeAt(this.pos) == 103) {
				break;
			}
			var k = this.unserialize();
			if(typeof(k) != "string") {
				throw haxe_Exception.thrown("Invalid object key");
			}
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.buf.charCodeAt(this.pos++) != 58) {
			throw haxe_Exception.thrown("Invalid enum format");
		}
		var nargs = this.readDigits();
		if(nargs == 0) {
			return Type.createEnum(edecl,tag);
		}
		var args = [];
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserialize: function() {
		switch(this.buf.charCodeAt(this.pos++)) {
		case 65:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) {
				throw haxe_Exception.thrown("Class not found " + name);
			}
			return cl;
		case 66:
			var name = this.unserialize();
			var e = this.resolver.resolveEnum(name);
			if(e == null) {
				throw haxe_Exception.thrown("Enum not found " + name);
			}
			return e;
		case 67:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) {
				throw haxe_Exception.thrown("Class not found " + name);
			}
			var o = Object.create(cl.prototype);
			this.cache.push(o);
			o.hxUnserialize(this);
			if(this.buf.charCodeAt(this.pos++) != 103) {
				throw haxe_Exception.thrown("Invalid custom data");
			}
			return o;
		case 77:
			var h = new haxe_ds_ObjectMap();
			this.cache.push(h);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s = this.unserialize();
				h.set(s,this.unserialize());
			}
			this.pos++;
			return h;
		case 82:
			var n = this.readDigits();
			if(n < 0 || n >= this.scache.length) {
				throw haxe_Exception.thrown("Invalid string reference");
			}
			return this.scache[n];
		case 97:
			var buf = this.buf;
			var a = [];
			this.cache.push(a);
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else {
					a.push(this.unserialize());
				}
			}
			return a;
		case 98:
			var h = new haxe_ds_StringMap();
			this.cache.push(h);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s = this.unserialize();
				var value = this.unserialize();
				h.h[s] = value;
			}
			this.pos++;
			return h;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) {
				throw haxe_Exception.thrown("Class not found " + name);
			}
			var o = Object.create(cl.prototype);
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 100:
			return this.readFloat();
		case 102:
			return false;
		case 105:
			return this.readDigits();
		case 106:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) {
				throw haxe_Exception.thrown("Enum not found " + name);
			}
			this.pos++;
			var index = this.readDigits();
			var _this = edecl.__constructs__;
			var result = new Array(_this.length);
			var _g = 0;
			var _g1 = _this.length;
			while(_g < _g1) {
				var i = _g++;
				result[i] = _this[i]._hx_name;
			}
			var tag = result[index];
			if(tag == null) {
				throw haxe_Exception.thrown("Unknown enum index " + name + "@" + index);
			}
			var e = this.unserializeEnum(edecl,tag);
			this.cache.push(e);
			return e;
		case 107:
			return NaN;
		case 108:
			var l = new haxe_ds_List();
			this.cache.push(l);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 109:
			return -Infinity;
		case 110:
			return null;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 112:
			return Infinity;
		case 113:
			var h = new haxe_ds_IntMap();
			this.cache.push(h);
			var buf = this.buf;
			var c = this.buf.charCodeAt(this.pos++);
			while(c == 58) {
				var i = this.readDigits();
				var value = this.unserialize();
				h.h[i] = value;
				c = this.buf.charCodeAt(this.pos++);
			}
			if(c != 104) {
				throw haxe_Exception.thrown("Invalid IntMap format");
			}
			return h;
		case 114:
			var n = this.readDigits();
			if(n < 0 || n >= this.cache.length) {
				throw haxe_Exception.thrown("Invalid reference");
			}
			return this.cache[n];
		case 115:
			var len = this.readDigits();
			var buf = this.buf;
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) {
				throw haxe_Exception.thrown("Invalid bytes length");
			}
			var codes = haxe_Unserializer.CODES;
			if(codes == null) {
				codes = haxe_Unserializer.initCodes();
				haxe_Unserializer.CODES = codes;
			}
			var i = this.pos;
			var rest = len & 3;
			var size = (len >> 2) * 3 + (rest >= 2 ? rest - 1 : 0);
			var max = i + (len - rest);
			var bytes = new haxe_io_Bytes(new ArrayBuffer(size));
			var bpos = 0;
			while(i < max) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = c1 << 2 | c2 >> 4;
				var c3 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = c2 << 4 | c3 >> 2;
				var c4 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = c3 << 6 | c4;
			}
			if(rest >= 2) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = c1 << 2 | c2 >> 4;
				if(rest == 3) {
					var c3 = codes[buf.charCodeAt(i++)];
					bytes.b[bpos++] = c2 << 4 | c3 >> 2;
				}
			}
			this.pos += len;
			this.cache.push(bytes);
			return bytes;
		case 116:
			return true;
		case 118:
			var d;
			if(this.buf.charCodeAt(this.pos) >= 48 && this.buf.charCodeAt(this.pos) <= 57 && this.buf.charCodeAt(this.pos + 1) >= 48 && this.buf.charCodeAt(this.pos + 1) <= 57 && this.buf.charCodeAt(this.pos + 2) >= 48 && this.buf.charCodeAt(this.pos + 2) <= 57 && this.buf.charCodeAt(this.pos + 3) >= 48 && this.buf.charCodeAt(this.pos + 3) <= 57 && this.buf.charCodeAt(this.pos + 4) == 45) {
				d = HxOverrides.strDate(HxOverrides.substr(this.buf,this.pos,19));
				this.pos += 19;
			} else {
				d = new Date(this.readFloat());
			}
			this.cache.push(d);
			return d;
		case 119:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) {
				throw haxe_Exception.thrown("Enum not found " + name);
			}
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 120:
			throw haxe_Exception.thrown(this.unserialize());
		case 121:
			var len = this.readDigits();
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) {
				throw haxe_Exception.thrown("Invalid string length");
			}
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = decodeURIComponent(s.split("+").join(" "));
			this.scache.push(s);
			return s;
		case 122:
			return 0;
		default:
		}
		this.pos--;
		throw haxe_Exception.thrown("Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos);
	}
	,__class__: haxe_Unserializer
};
var haxe_ValueException = function(value,previous,native) {
	haxe_Exception.call(this,String(value),previous,native);
	this.value = value;
};
$hxClasses["haxe.ValueException"] = haxe_ValueException;
haxe_ValueException.__name__ = "haxe.ValueException";
haxe_ValueException.__super__ = haxe_Exception;
haxe_ValueException.prototype = $extend(haxe_Exception.prototype,{
	value: null
	,unwrap: function() {
		return this.value;
	}
	,__class__: haxe_ValueException
});
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = "haxe.io.Bytes";
haxe_io_Bytes.ofString = function(s,encoding) {
	if(encoding == haxe_io_Encoding.RawNative) {
		var buf = new Uint8Array(s.length << 1);
		var _g = 0;
		var _g1 = s.length;
		while(_g < _g1) {
			var i = _g++;
			var c = s.charCodeAt(i);
			buf[i << 1] = c & 255;
			buf[i << 1 | 1] = c >> 8;
		}
		return new haxe_io_Bytes(buf.buffer);
	}
	var a = [];
	var i = 0;
	while(i < s.length) {
		var c = s.charCodeAt(i++);
		if(55296 <= c && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(i++) & 1023;
		}
		if(c <= 127) {
			a.push(c);
		} else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe_io_Bytes(new Uint8Array(a).buffer);
};
haxe_io_Bytes.prototype = {
	length: null
	,b: null
	,getString: function(pos,len,encoding) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(encoding == null) {
			encoding = haxe_io_Encoding.UTF8;
		}
		var s = "";
		var b = this.b;
		var i = pos;
		var max = pos + len;
		switch(encoding._hx_index) {
		case 0:
			var debug = pos > 0;
			while(i < max) {
				var c = b[i++];
				if(c < 128) {
					if(c == 0) {
						break;
					}
					s += String.fromCodePoint(c);
				} else if(c < 224) {
					var code = (c & 63) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code);
				} else if(c < 240) {
					var c2 = b[i++];
					var code1 = (c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code1);
				} else {
					var c21 = b[i++];
					var c3 = b[i++];
					var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(u);
				}
			}
			break;
		case 1:
			while(i < max) {
				var c = b[i++] | b[i++] << 8;
				s += String.fromCodePoint(c);
			}
			break;
		}
		return s;
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,toHex: function() {
		var s_b = "";
		var chars = [];
		var str = "0123456789abcdef";
		var _g = 0;
		var _g1 = str.length;
		while(_g < _g1) {
			var i = _g++;
			chars.push(HxOverrides.cca(str,i));
		}
		var _g = 0;
		var _g1 = this.length;
		while(_g < _g1) {
			var i = _g++;
			var c = this.b[i];
			s_b += String.fromCodePoint(chars[c >> 4]);
			s_b += String.fromCodePoint(chars[c & 15]);
		}
		return s_b;
	}
	,__class__: haxe_io_Bytes
};
var haxe_io_Encoding = $hxEnums["haxe.io.Encoding"] = { __ename__:true,__constructs__:null
	,UTF8: {_hx_name:"UTF8",_hx_index:0,__enum__:"haxe.io.Encoding",toString:$estr}
	,RawNative: {_hx_name:"RawNative",_hx_index:1,__enum__:"haxe.io.Encoding",toString:$estr}
};
haxe_io_Encoding.__constructs__ = [haxe_io_Encoding.UTF8,haxe_io_Encoding.RawNative];
var haxe_crypto_Base64 = function() { };
$hxClasses["haxe.crypto.Base64"] = haxe_crypto_Base64;
haxe_crypto_Base64.__name__ = "haxe.crypto.Base64";
haxe_crypto_Base64.encode = function(bytes,complement) {
	if(complement == null) {
		complement = true;
	}
	var str = new haxe_crypto_BaseCode(haxe_crypto_Base64.BYTES).encodeBytes(bytes).toString();
	if(complement) {
		switch(bytes.length % 3) {
		case 1:
			str += "==";
			break;
		case 2:
			str += "=";
			break;
		default:
		}
	}
	return str;
};
haxe_crypto_Base64.decode = function(str,complement) {
	if(complement == null) {
		complement = true;
	}
	if(complement) {
		while(HxOverrides.cca(str,str.length - 1) == 61) str = HxOverrides.substr(str,0,-1);
	}
	return new haxe_crypto_BaseCode(haxe_crypto_Base64.BYTES).decodeBytes(haxe_io_Bytes.ofString(str));
};
var haxe_crypto_BaseCode = function(base) {
	var len = base.length;
	var nbits = 1;
	while(len > 1 << nbits) ++nbits;
	if(nbits > 8 || len != 1 << nbits) {
		throw haxe_Exception.thrown("BaseCode : base length must be a power of two.");
	}
	this.base = base;
	this.nbits = nbits;
};
$hxClasses["haxe.crypto.BaseCode"] = haxe_crypto_BaseCode;
haxe_crypto_BaseCode.__name__ = "haxe.crypto.BaseCode";
haxe_crypto_BaseCode.prototype = {
	base: null
	,nbits: null
	,tbl: null
	,encodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		var size = b.length * 8 / nbits | 0;
		var out = new haxe_io_Bytes(new ArrayBuffer(size + (b.length * 8 % nbits == 0 ? 0 : 1)));
		var buf = 0;
		var curbits = 0;
		var mask = (1 << nbits) - 1;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < nbits) {
				curbits += 8;
				buf <<= 8;
				buf |= b.b[pin++];
			}
			curbits -= nbits;
			out.b[pout++] = base.b[buf >> curbits & mask];
		}
		if(curbits > 0) {
			out.b[pout++] = base.b[buf << nbits - curbits & mask];
		}
		return out;
	}
	,initTable: function() {
		var tbl = [];
		var _g = 0;
		while(_g < 256) {
			var i = _g++;
			tbl[i] = -1;
		}
		var _g = 0;
		var _g1 = this.base.length;
		while(_g < _g1) {
			var i = _g++;
			tbl[this.base.b[i]] = i;
		}
		this.tbl = tbl;
	}
	,decodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		if(this.tbl == null) {
			this.initTable();
		}
		var tbl = this.tbl;
		var size = b.length * nbits >> 3;
		var out = new haxe_io_Bytes(new ArrayBuffer(size));
		var buf = 0;
		var curbits = 0;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < 8) {
				curbits += nbits;
				buf <<= nbits;
				var i = tbl[b.b[pin++]];
				if(i == -1) {
					throw haxe_Exception.thrown("BaseCode : invalid encoded char");
				}
				buf |= i;
			}
			curbits -= 8;
			out.b[pout++] = buf >> curbits & 255;
		}
		return out;
	}
	,__class__: haxe_crypto_BaseCode
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe_ds_IntMap;
haxe_ds_IntMap.__name__ = "haxe.ds.IntMap";
haxe_ds_IntMap.prototype = {
	h: null
	,__class__: haxe_ds_IntMap
};
var haxe_ds_List = function() {
	this.length = 0;
};
$hxClasses["haxe.ds.List"] = haxe_ds_List;
haxe_ds_List.__name__ = "haxe.ds.List";
haxe_ds_List.prototype = {
	h: null
	,q: null
	,length: null
	,add: function(item) {
		var x = new haxe_ds__$List_ListNode(item,null);
		if(this.h == null) {
			this.h = x;
		} else {
			this.q.next = x;
		}
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = new haxe_ds__$List_ListNode(item,this.h);
		this.h = x;
		if(this.q == null) {
			this.q = x;
		}
		this.length++;
	}
	,first: function() {
		if(this.h == null) {
			return null;
		} else {
			return this.h.item;
		}
	}
	,pop: function() {
		if(this.h == null) {
			return null;
		}
		var x = this.h.item;
		this.h = this.h.next;
		if(this.h == null) {
			this.q = null;
		}
		this.length--;
		return x;
	}
	,isEmpty: function() {
		return this.h == null;
	}
	,toString: function() {
		var s_b = "";
		var first = true;
		var l = this.h;
		s_b += "{";
		while(l != null) {
			if(first) {
				first = false;
			} else {
				s_b += ", ";
			}
			s_b += Std.string(Std.string(l.item));
			l = l.next;
		}
		s_b += "}";
		return s_b;
	}
	,__class__: haxe_ds_List
};
var haxe_ds__$List_ListNode = function(item,next) {
	this.item = item;
	this.next = next;
};
$hxClasses["haxe.ds._List.ListNode"] = haxe_ds__$List_ListNode;
haxe_ds__$List_ListNode.__name__ = "haxe.ds._List.ListNode";
haxe_ds__$List_ListNode.prototype = {
	item: null
	,next: null
	,__class__: haxe_ds__$List_ListNode
};
var haxe_ds_ObjectMap = function() {
	this.h = { __keys__ : { }};
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = "haxe.ds.ObjectMap";
haxe_ds_ObjectMap.prototype = {
	h: null
	,set: function(key,value) {
		var id = key.__id__;
		if(id == null) {
			id = (key.__id__ = $global.$haxeUID++);
		}
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds_StringMap = function() {
	this.h = Object.create(null);
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = "haxe.ds.StringMap";
haxe_ds_StringMap.prototype = {
	h: null
	,__class__: haxe_ds_StringMap
};
var haxe_ds__$StringMap_StringMapKeyIterator = function(h) {
	this.h = h;
	this.keys = Object.keys(h);
	this.length = this.keys.length;
	this.current = 0;
};
$hxClasses["haxe.ds._StringMap.StringMapKeyIterator"] = haxe_ds__$StringMap_StringMapKeyIterator;
haxe_ds__$StringMap_StringMapKeyIterator.__name__ = "haxe.ds._StringMap.StringMapKeyIterator";
haxe_ds__$StringMap_StringMapKeyIterator.prototype = {
	h: null
	,keys: null
	,length: null
	,current: null
	,hasNext: function() {
		return this.current < this.length;
	}
	,next: function() {
		return this.keys[this.current++];
	}
	,__class__: haxe_ds__$StringMap_StringMapKeyIterator
};
var haxe_io_Error = $hxEnums["haxe.io.Error"] = { __ename__:true,__constructs__:null
	,Blocked: {_hx_name:"Blocked",_hx_index:0,__enum__:"haxe.io.Error",toString:$estr}
	,Overflow: {_hx_name:"Overflow",_hx_index:1,__enum__:"haxe.io.Error",toString:$estr}
	,OutsideBounds: {_hx_name:"OutsideBounds",_hx_index:2,__enum__:"haxe.io.Error",toString:$estr}
	,Custom: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"haxe.io.Error",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["e"],$_)
};
haxe_io_Error.__constructs__ = [haxe_io_Error.Blocked,haxe_io_Error.Overflow,haxe_io_Error.OutsideBounds,haxe_io_Error.Custom];
var haxe_xml_XmlParserException = function(message,xml,position) {
	this.xml = xml;
	this.message = message;
	this.position = position;
	this.lineNumber = 1;
	this.positionAtLine = 0;
	var _g = 0;
	var _g1 = position;
	while(_g < _g1) {
		var i = _g++;
		var c = xml.charCodeAt(i);
		if(c == 10) {
			this.lineNumber++;
			this.positionAtLine = 0;
		} else if(c != 13) {
			this.positionAtLine++;
		}
	}
};
$hxClasses["haxe.xml.XmlParserException"] = haxe_xml_XmlParserException;
haxe_xml_XmlParserException.__name__ = "haxe.xml.XmlParserException";
haxe_xml_XmlParserException.prototype = {
	message: null
	,lineNumber: null
	,positionAtLine: null
	,position: null
	,xml: null
	,toString: function() {
		var c = js_Boot.getClass(this);
		return c.__name__ + ": " + this.message + " at line " + this.lineNumber + " char " + this.positionAtLine;
	}
	,__class__: haxe_xml_XmlParserException
};
var haxe_xml_Parser = function() { };
$hxClasses["haxe.xml.Parser"] = haxe_xml_Parser;
haxe_xml_Parser.__name__ = "haxe.xml.Parser";
haxe_xml_Parser.parse = function(str,strict) {
	if(strict == null) {
		strict = false;
	}
	var doc = Xml.createDocument();
	haxe_xml_Parser.doParse(str,strict,0,doc);
	return doc;
};
haxe_xml_Parser.doParse = function(str,strict,p,parent) {
	if(p == null) {
		p = 0;
	}
	var xml = null;
	var state = 1;
	var next = 1;
	var aname = null;
	var start = 0;
	var nsubs = 0;
	var nbrackets = 0;
	var buf = new StringBuf();
	var escapeNext = 1;
	var attrValQuote = -1;
	while(p < str.length) {
		var c = str.charCodeAt(p);
		switch(state) {
		case 0:
			switch(c) {
			case 9:case 10:case 13:case 32:
				break;
			default:
				state = next;
				continue;
			}
			break;
		case 1:
			if(c == 60) {
				state = 0;
				next = 2;
			} else {
				start = p;
				state = 13;
				continue;
			}
			break;
		case 2:
			switch(c) {
			case 33:
				if(str.charCodeAt(p + 1) == 91) {
					p += 2;
					if(HxOverrides.substr(str,p,6).toUpperCase() != "CDATA[") {
						throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected <![CDATA[",str,p));
					}
					p += 5;
					state = 17;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) == 68 || str.charCodeAt(p + 1) == 100) {
					if(HxOverrides.substr(str,p + 2,6).toUpperCase() != "OCTYPE") {
						throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected <!DOCTYPE",str,p));
					}
					p += 8;
					state = 16;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) != 45 || str.charCodeAt(p + 2) != 45) {
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected <!--",str,p));
				} else {
					p += 2;
					state = 15;
					start = p + 1;
				}
				break;
			case 47:
				if(parent == null) {
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected node name",str,p));
				}
				start = p + 1;
				state = 0;
				next = 10;
				break;
			case 63:
				state = 14;
				start = p;
				break;
			default:
				state = 3;
				start = p;
				continue;
			}
			break;
		case 3:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(p == start) {
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected node name",str,p));
				}
				xml = Xml.createElement(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml);
				++nsubs;
				state = 0;
				next = 4;
				continue;
			}
			break;
		case 4:
			switch(c) {
			case 47:
				state = 11;
				break;
			case 62:
				state = 9;
				break;
			default:
				state = 5;
				start = p;
				continue;
			}
			break;
		case 5:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(start == p) {
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected attribute name",str,p));
				}
				var tmp = HxOverrides.substr(str,start,p - start);
				aname = tmp;
				if(xml.exists(aname)) {
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Duplicate attribute [" + aname + "]",str,p));
				}
				state = 0;
				next = 6;
				continue;
			}
			break;
		case 6:
			if(c == 61) {
				state = 0;
				next = 7;
			} else {
				throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected =",str,p));
			}
			break;
		case 7:
			switch(c) {
			case 34:case 39:
				buf = new StringBuf();
				state = 8;
				start = p + 1;
				attrValQuote = c;
				break;
			default:
				throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected \"",str,p));
			}
			break;
		case 8:
			switch(c) {
			case 38:
				var len = p - start;
				buf.b += len == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len);
				state = 18;
				escapeNext = 8;
				start = p + 1;
				break;
			case 60:case 62:
				if(strict) {
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Invalid unescaped " + String.fromCodePoint(c) + " in attribute value",str,p));
				} else if(c == attrValQuote) {
					var len1 = p - start;
					buf.b += len1 == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len1);
					var val = buf.b;
					buf = new StringBuf();
					xml.set(aname,val);
					state = 0;
					next = 4;
				}
				break;
			default:
				if(c == attrValQuote) {
					var len2 = p - start;
					buf.b += len2 == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len2);
					var val1 = buf.b;
					buf = new StringBuf();
					xml.set(aname,val1);
					state = 0;
					next = 4;
				}
			}
			break;
		case 9:
			p = haxe_xml_Parser.doParse(str,strict,p,xml);
			start = p;
			state = 1;
			break;
		case 10:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(start == p) {
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected node name",str,p));
				}
				var v = HxOverrides.substr(str,start,p - start);
				if(parent == null || parent.nodeType != 0) {
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Unexpected </" + v + ">, tag is not open",str,p));
				}
				if(parent.nodeType != Xml.Element) {
					throw haxe_Exception.thrown("Bad node type, expected Element but found " + (parent.nodeType == null ? "null" : XmlType.toString(parent.nodeType)));
				}
				if(v != parent.nodeName) {
					if(parent.nodeType != Xml.Element) {
						throw haxe_Exception.thrown("Bad node type, expected Element but found " + (parent.nodeType == null ? "null" : XmlType.toString(parent.nodeType)));
					}
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected </" + parent.nodeName + ">",str,p));
				}
				state = 0;
				next = 12;
				continue;
			}
			break;
		case 11:
			if(c == 62) {
				state = 1;
			} else {
				throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected >",str,p));
			}
			break;
		case 12:
			if(c == 62) {
				if(nsubs == 0) {
					parent.addChild(Xml.createPCData(""));
				}
				return p;
			} else {
				throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected >",str,p));
			}
			break;
		case 13:
			if(c == 60) {
				var len3 = p - start;
				buf.b += len3 == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len3);
				var child = Xml.createPCData(buf.b);
				buf = new StringBuf();
				parent.addChild(child);
				++nsubs;
				state = 0;
				next = 2;
			} else if(c == 38) {
				var len4 = p - start;
				buf.b += len4 == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len4);
				state = 18;
				escapeNext = 13;
				start = p + 1;
			}
			break;
		case 14:
			if(c == 63 && str.charCodeAt(p + 1) == 62) {
				++p;
				var str1 = HxOverrides.substr(str,start + 1,p - start - 2);
				parent.addChild(Xml.createProcessingInstruction(str1));
				++nsubs;
				state = 1;
			}
			break;
		case 15:
			if(c == 45 && str.charCodeAt(p + 1) == 45 && str.charCodeAt(p + 2) == 62) {
				parent.addChild(Xml.createComment(HxOverrides.substr(str,start,p - start)));
				++nsubs;
				p += 2;
				state = 1;
			}
			break;
		case 16:
			if(c == 91) {
				++nbrackets;
			} else if(c == 93) {
				--nbrackets;
			} else if(c == 62 && nbrackets == 0) {
				parent.addChild(Xml.createDocType(HxOverrides.substr(str,start,p - start)));
				++nsubs;
				state = 1;
			}
			break;
		case 17:
			if(c == 93 && str.charCodeAt(p + 1) == 93 && str.charCodeAt(p + 2) == 62) {
				var child1 = Xml.createCData(HxOverrides.substr(str,start,p - start));
				parent.addChild(child1);
				++nsubs;
				p += 2;
				state = 1;
			}
			break;
		case 18:
			if(c == 59) {
				var s = HxOverrides.substr(str,start,p - start);
				if(s.charCodeAt(0) == 35) {
					var c1 = s.charCodeAt(1) == 120 ? Std.parseInt("0" + HxOverrides.substr(s,1,s.length - 1)) : Std.parseInt(HxOverrides.substr(s,1,s.length - 1));
					buf.b += String.fromCodePoint(c1);
				} else if(!Object.prototype.hasOwnProperty.call(haxe_xml_Parser.escapes.h,s)) {
					if(strict) {
						throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Undefined entity: " + s,str,p));
					}
					buf.b += Std.string("&" + s + ";");
				} else {
					buf.b += Std.string(haxe_xml_Parser.escapes.h[s]);
				}
				start = p + 1;
				state = escapeNext;
			} else if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45) && c != 35) {
				if(strict) {
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Invalid character in entity: " + String.fromCodePoint(c),str,p));
				}
				buf.b += String.fromCodePoint(38);
				var len5 = p - start;
				buf.b += len5 == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len5);
				--p;
				start = p + 1;
				state = escapeNext;
			}
			break;
		}
		++p;
	}
	if(state == 1) {
		start = p;
		state = 13;
	}
	if(state == 13) {
		if(parent.nodeType == 0) {
			if(parent.nodeType != Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, expected Element but found " + (parent.nodeType == null ? "null" : XmlType.toString(parent.nodeType)));
			}
			throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Unclosed node <" + parent.nodeName + ">",str,p));
		}
		if(p != start || nsubs == 0) {
			var len = p - start;
			buf.b += len == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len);
			parent.addChild(Xml.createPCData(buf.b));
			++nsubs;
		}
		return p;
	}
	if(!strict && state == 18 && escapeNext == 13) {
		buf.b += String.fromCodePoint(38);
		var len = p - start;
		buf.b += len == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len);
		parent.addChild(Xml.createPCData(buf.b));
		++nsubs;
		return p;
	}
	throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Unexpected end",str,p));
};
var haxe_xml_Printer = function(pretty) {
	this.output = new StringBuf();
	this.pretty = pretty;
};
$hxClasses["haxe.xml.Printer"] = haxe_xml_Printer;
haxe_xml_Printer.__name__ = "haxe.xml.Printer";
haxe_xml_Printer.print = function(xml,pretty) {
	if(pretty == null) {
		pretty = false;
	}
	var printer = new haxe_xml_Printer(pretty);
	printer.writeNode(xml,"");
	return printer.output.b;
};
haxe_xml_Printer.prototype = {
	output: null
	,pretty: null
	,writeNode: function(value,tabs) {
		switch(value.nodeType) {
		case 0:
			this.output.b += Std.string(tabs + "<");
			if(value.nodeType != Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, expected Element but found " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			this.output.b += Std.string(value.nodeName);
			var attribute = value.attributes();
			while(attribute.hasNext()) {
				var attribute1 = attribute.next();
				this.output.b += Std.string(" " + attribute1 + "=\"");
				var input = StringTools.htmlEscape(value.get(attribute1),true);
				this.output.b += Std.string(input);
				this.output.b += "\"";
			}
			if(this.hasChildren(value)) {
				this.output.b += ">";
				if(this.pretty) {
					this.output.b += "\n";
				}
				if(value.nodeType != Xml.Document && value.nodeType != Xml.Element) {
					throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
				}
				var _g_current = 0;
				var _g_array = value.children;
				while(_g_current < _g_array.length) {
					var child = _g_array[_g_current++];
					this.writeNode(child,this.pretty ? tabs + "\t" : tabs);
				}
				this.output.b += Std.string(tabs + "</");
				if(value.nodeType != Xml.Element) {
					throw haxe_Exception.thrown("Bad node type, expected Element but found " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
				}
				this.output.b += Std.string(value.nodeName);
				this.output.b += ">";
				if(this.pretty) {
					this.output.b += "\n";
				}
			} else {
				this.output.b += "/>";
				if(this.pretty) {
					this.output.b += "\n";
				}
			}
			break;
		case 1:
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, unexpected " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			var nodeValue = value.nodeValue;
			if(nodeValue.length != 0) {
				var input = tabs + StringTools.htmlEscape(nodeValue);
				this.output.b += Std.string(input);
				if(this.pretty) {
					this.output.b += "\n";
				}
			}
			break;
		case 2:
			this.output.b += Std.string(tabs + "<![CDATA[");
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, unexpected " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			this.output.b += Std.string(value.nodeValue);
			this.output.b += "]]>";
			if(this.pretty) {
				this.output.b += "\n";
			}
			break;
		case 3:
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, unexpected " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			var commentContent = value.nodeValue;
			var _this_r = new RegExp("[\n\r\t]+","g".split("u").join(""));
			commentContent = commentContent.replace(_this_r,"");
			commentContent = "<!--" + commentContent + "-->";
			this.output.b += tabs == null ? "null" : "" + tabs;
			var input = StringTools.trim(commentContent);
			this.output.b += Std.string(input);
			if(this.pretty) {
				this.output.b += "\n";
			}
			break;
		case 4:
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, unexpected " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			this.output.b += Std.string("<!DOCTYPE " + value.nodeValue + ">");
			if(this.pretty) {
				this.output.b += "\n";
			}
			break;
		case 5:
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, unexpected " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			this.output.b += Std.string("<?" + value.nodeValue + "?>");
			if(this.pretty) {
				this.output.b += "\n";
			}
			break;
		case 6:
			if(value.nodeType != Xml.Document && value.nodeType != Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			var _g_current = 0;
			var _g_array = value.children;
			while(_g_current < _g_array.length) {
				var child = _g_array[_g_current++];
				this.writeNode(child,tabs);
			}
			break;
		}
	}
	,hasChildren: function(value) {
		if(value.nodeType != Xml.Document && value.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
		}
		var _g_current = 0;
		var _g_array = value.children;
		while(_g_current < _g_array.length) {
			var child = _g_array[_g_current++];
			switch(child.nodeType) {
			case 0:case 1:
				return true;
			case 2:case 3:
				if(child.nodeType == Xml.Document || child.nodeType == Xml.Element) {
					throw haxe_Exception.thrown("Bad node type, unexpected " + (child.nodeType == null ? "null" : XmlType.toString(child.nodeType)));
				}
				if(StringTools.ltrim(child.nodeValue).length != 0) {
					return true;
				}
				break;
			default:
			}
		}
		return false;
	}
	,__class__: haxe_xml_Printer
};
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = "js.Boot";
js_Boot.getClass = function(o) {
	if(o == null) {
		return null;
	} else if(((o) instanceof Array)) {
		return Array;
	} else {
		var cl = o.__class__;
		if(cl != null) {
			return cl;
		}
		var name = js_Boot.__nativeClassName(o);
		if(name != null) {
			return js_Boot.__resolveNativeClass(name);
		}
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o.__enum__) {
			var e = $hxEnums[o.__enum__];
			var con = e.__constructs__[o._hx_index];
			var n = con._hx_name;
			if(con.__params__) {
				s = s + "\t";
				return n + "(" + ((function($this) {
					var $r;
					var _g = [];
					{
						var _g1 = 0;
						var _g2 = con.__params__;
						while(true) {
							if(!(_g1 < _g2.length)) {
								break;
							}
							var p = _g2[_g1];
							_g1 = _g1 + 1;
							_g.push(js_Boot.__string_rec(o[p],s));
						}
					}
					$r = _g;
					return $r;
				}(this))).join(",") + ")";
			} else {
				return n;
			}
		}
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g = 0;
			var _g1 = o.length;
			while(_g < _g1) {
				var i = _g++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( _g ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) {
			str += ", \n";
		}
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
		return null;
	}
	return name;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var uapi_Hooks = $hx_exports["uapi"]["hooks"] = function() { };
$hxClasses["uapi.Hooks"] = uapi_Hooks;
uapi_Hooks.__name__ = "uapi.Hooks";
uapi_Hooks.hookMethod = function(object,methodPath) {
	var method_original = null;
	var pipe = null;
	var retval = { pipe : function(func) {
		pipe = func;
	}};
	var sub_obj = methodPath.split(".");
	var methodName = sub_obj.pop();
	var _g = 0;
	while(_g < sub_obj.length) {
		var sub = sub_obj[_g];
		++_g;
		object = Reflect.getProperty(object,sub);
	}
	method_original = Reflect.getProperty(object,methodName);
	if(null != method_original) {
		var method_new = uapi_Hooks.makeVarArgs(function($arguments) {
			var pipe_ret;
			if(pipe != null) {
				var o = this;
				var o1 = this;
				var func = method_original;
				var args = [$arguments,function(args) {
					return func.apply(o1,args);
				}];
				pipe_ret = pipe.apply(o,args);
			} else {
				pipe_ret = null;
			}
			if(pipe_ret != null) {
				if(Object.prototype.hasOwnProperty.call(pipe_ret,"arguments")) {
					$arguments = Reflect.field(pipe_ret,"arguments");
				} else {
					return pipe_ret;
				}
			}
			var o = this;
			return method_original.apply(o,$arguments);
		});
		Reflect.setProperty(object,methodName,method_new);
	} else {
		throw haxe_Exception.thrown("" + methodName + "() does not exist on " + Std.string(object));
	}
	return retval;
};
uapi_Hooks.hookMethods = function(object,methods) {
	var pipe = null;
	var retval = { pipe : function(func) {
		pipe = func;
	}};
	var _g = 0;
	while(_g < methods.length) {
		var m = [methods[_g]];
		++_g;
		uapi_Hooks.hookMethod(object,m[0]).pipe((function(m) {
			return function($arguments,method_original) {
				var o = this;
				return pipe.apply(o,[m[0],$arguments,method_original]);
			};
		})(m));
	}
	return retval;
};
uapi_Hooks.makeVarArgs = function(f) {
	return function() {
		var a = Array.prototype.slice.call(arguments);
		var o = this;
		return f.apply(o,[a]);
	};
};
uapi_Hooks.HashPipe = function(immediate) {
	if(immediate == null) {
		immediate = false;
	}
	var pipe = null;
	var _args = new haxe_ds_StringMap();
	var _values = [];
	var updateHash = function(args,values,rewrite,toggle,replacestate) {
		if(toggle == null) {
			toggle = true;
		}
		if(rewrite == null) {
			rewrite = false;
		}
		if(args != null) {
			if(rewrite) {
				if(args != null) {
					_args = args;
				}
				if(values != null) {
					_values = values;
				}
			} else {
				var h = args.h;
				var k_h = h;
				var k_keys = Object.keys(h);
				var k_length = k_keys.length;
				var k_current = 0;
				while(k_current < k_length) {
					var k = k_keys[k_current++];
					if(toggle && args.h[k] == "") {
						if(Object.prototype.hasOwnProperty.call(args.h,k)) {
							delete(args.h[k]);
						}
					} else {
						_args.h[k] = args.h[k];
					}
				}
				if(values != null) {
					var _g = 0;
					while(_g < values.length) {
						var v = values[_g];
						++_g;
						var str = v == null ? "null" : "" + v;
						if(_values.indexOf(str) == -1) {
							_values.push(str);
						} else if(toggle) {
							_values.splice(_values.indexOf(str),1);
						}
					}
				}
			}
			var _g = 0;
			while(_g < _values.length) {
				var v = _values[_g];
				++_g;
				v = encodeURIComponent(v);
			}
			var h = _args.h;
			var k_h = h;
			var k_keys = Object.keys(h);
			var k_length = k_keys.length;
			var k_current = 0;
			while(k_current < k_length) {
				var k = k_keys[k_current++];
				var s = _args.h[k];
				_values.push("" + k + "=" + encodeURIComponent(s));
			}
			var updated_hash = "!/" + _values.join("/");
			if(replacestate) {
				window.history.replaceState(null,null,"#" + updated_hash);
			} else {
				window.location.hash = updated_hash;
			}
		}
	};
	var hashChange = function(e) {
		var hash = window.location.hash;
		var toggle_arguments = [];
		if(pipe != null) {
			_args = uapi_Utils.KeyValueStringParser(hash,false);
		}
		var h = _args.h;
		var k_h = h;
		var k_keys = Object.keys(h);
		var k_length = k_keys.length;
		var k_current = 0;
		while(k_current < k_length) {
			var k = k_keys[k_current++];
			if(_args.h[k] == null) {
				if(Object.prototype.hasOwnProperty.call(_args.h,k)) {
					delete(_args.h[k]);
				}
				toggle_arguments.push(k);
			}
		}
		_values = toggle_arguments;
		pipe({ update : updateHash, args : _args, values : _values});
	};
	var retval = { pipe : function(func) {
		pipe = func;
		if(immediate) {
			hashChange();
		}
		return { args : function() {
			return _args;
		}, values : function() {
			return _values;
		}, update : updateHash};
	}};
	window.addEventListener("hashchange",hashChange);
	return retval;
};
var uapi_JsUtils = function() { };
$hxClasses["uapi.JsUtils"] = uapi_JsUtils;
uapi_JsUtils.__name__ = "uapi.JsUtils";
uapi_JsUtils.HttpRequest = function(url,binary,method,headers,body) {
	if(method == null) {
		method = "GET";
	}
	if(binary == null) {
		binary = false;
	}
	var pipe = null;
	var retval = { pipe : function(func) {
		pipe = func;
	}};
	window.fetch(url,{ "credentials" : "omit", "headers" : headers, "referrerPolicy" : "no-referrer-when-downgrade", "body" : body, "method" : method, "mode" : "cors"}).then(function(response) {
		var p = binary ? response.arrayBuffer() : response.text();
		p.then(function(res) {
			if(pipe != null) {
				pipe(res);
			}
		});
	});
	return retval;
};
uapi_JsUtils.write = function(str) {
	var last = window.document.body.lastElementChild;
	var it = last;
	while(it != null) {
		it = it.lastElementChild;
		if(it != null) {
			last = it;
		}
	}
	last.parentElement.insertAdjacentHTML("afterbegin",str);
};
uapi_JsUtils.loadScript = function(src) {
	var pipe = null;
	var retval = { pipe : function(func) {
		pipe = func;
	}};
	var script = window.document.createElement("script");
	script.type = "text/javascript";
	script.src = src;
	script.defer = true;
	script.async = false;
	script.addEventListener("load",function(e) {
		if(pipe != null) {
			pipe(script);
		}
	});
	window.document.head.appendChild(script);
	return retval;
};
uapi_JsUtils.AddEventListeners = function(target,fields,func,opt) {
	var _g = 0;
	while(_g < fields.length) {
		var field = fields[_g];
		++_g;
		target.addEventListener(field,func,opt);
	}
};
uapi_JsUtils.isIE = function() {
	var ua = $global.navigator.userAgent;
	if(ua.indexOf("Trident/") <= -1) {
		return ua.indexOf("Edge/") > -1;
	} else {
		return true;
	}
};
var uapi_Utils = function() { };
$hxClasses["uapi.Utils"] = uapi_Utils;
uapi_Utils.__name__ = "uapi.Utils";
uapi_Utils.KeyValueStringParser = function(location,QueryString) {
	if(QueryString == null) {
		QueryString = true;
	}
	if(location == null) {
		location = QueryString ? $global.location.search : $global.location.hash;
	}
	while(QueryString == true ? location.charAt(0) == "?" : location.charAt(0) == "#" || location.charAt(0) == "!") location = HxOverrides.substr(location,1,null);
	var h = location.split(QueryString ? "&" : "/");
	var retval = new haxe_ds_StringMap();
	var t;
	var _g = 0;
	var _g1 = h.length;
	while(_g < _g1) {
		var l = _g++;
		if(h[l].length > 0) {
			var split = h[l].indexOf("=");
			t = [];
			if(split != -1) {
				t[0] = HxOverrides.substr(h[l],0,split);
				t[1] = HxOverrides.substr(h[l],split + 1,null);
			} else {
				t[0] = h[l];
			}
			var value = t.length > 1 ? decodeURIComponent(t[1].split("+").join(" ")) : null;
			retval.h[t[0]] = value;
		}
	}
	return retval;
};
uapi_Utils.GenerateUUID = $hx_exports["uapi"]["uuid"] = function(prefix) {
	if(prefix == null) {
		prefix = "";
	}
	var t = new Date().getTime();
	var b = new haxe_io_Bytes(new ArrayBuffer(16));
	var c = 1;
	b.b[0] = t * 255 | 0;
	while(c < 16) {
		var v = Math.round(Math.random() * 255);
		b.b[c] = v;
		++c;
	}
	var retval = "" + b.toHex();
	var r = new EReg("(.{7})(.{4})(.{4})(.{4})(.*)","gi");
	if(r.match(retval)) {
		retval = retval.replace(r.r,"$1-$2-$3-$4-$5");
	}
	return "" + prefix + retval;
};
var uapi_ui_Mal = function(container,xml) {
	this.tempElementsCache = null;
	this.addedElements = null;
	this.templates = null;
	this.shadowDom = null;
	this.container = container;
	this.tempElementsCache = new haxe_ds_StringMap();
	if(xml != null) {
		this.parseGui(container,xml);
	}
};
$hxClasses["uapi.ui.Mal"] = uapi_ui_Mal;
uapi_ui_Mal.__name__ = "uapi.ui.Mal";
uapi_ui_Mal.prototype = {
	container: null
	,shadowDom: null
	,templates: null
	,addedElements: null
	,tempElementsCache: null
	,addTemplate: function(name,args,rename,alwaysAppendLast,parentName) {
		if(alwaysAppendLast == null) {
			alwaysAppendLast = false;
		}
		var _gthis = this;
		if(Object.prototype.hasOwnProperty.call(this.addedElements.h,name)) {
			$global.console.warn("an element with the name:" + name + " already exists, overwriting");
		}
		if(Object.prototype.hasOwnProperty.call(this.addedElements.h,rename)) {
			$global.console.warn("an renamed element with the name:" + rename + " already exists, overwriting");
		}
		var retval = null;
		var template = this.templates.h[name];
		var append = function(element,parent) {
			var guiElement = { element : element.cloneNode(true), param : new haxe_ds_StringMap()};
			if(args != null) {
				var mapParams = function(param) {
					var paramNode = param;
					var paramEl = param;
					if(paramEl != null) {
						var paramName = paramEl.getAttribute("param");
						paramEl.removeAttribute("param");
						var _g = 0;
						var _g1 = paramName.split(",");
						while(_g < _g1.length) {
							var paramName = _g1[_g];
							++_g;
							if(StringTools.startsWith(paramName,"@")) {
								var parms = new EReg("@(.*):(.*)","");
								if(parms.match(paramName)) {
									paramName = parms.matched(2);
									paramNode = paramEl.getAttributeNode(parms.matched(1));
								}
							}
							guiElement.param.h[paramName] = paramNode;
							if(Object.prototype.hasOwnProperty.call(args.h,paramName)) {
								paramNode.textContent = args.h[paramName];
							}
						}
					}
				};
				var _g = 0;
				var _g1 = guiElement.element.querySelectorAll("*[" + "param" + "]");
				while(_g < _g1.length) {
					var param = _g1[_g];
					++_g;
					mapParams(param);
				}
				if(guiElement.element.hasAttribute("param")) {
					mapParams(guiElement.element);
				}
			}
			if(!alwaysAppendLast && template.index <= parent.children.length) {
				parent.insertBefore(guiElement.element,parent.children[template.index]);
			} else {
				parent.appendChild(guiElement.element);
			}
			_gthis.addedElements.h[name] = guiElement;
			return guiElement.element;
		};
		var parent = parentName == null ? null : this.addedElements.h[parentName].element.querySelector("*[" + "data-malhx-template" + "=\"" + template.parentId + "\"]");
		if(template != null) {
			if(rename != null) {
				name = rename;
			}
			var el = this.tempElementsCache.h[template.name];
			if(el != null) {
				retval = append(el.element,parent != null ? parent : el.parent);
				if(args != null) {
					var h = args.h;
					var k_h = h;
					var k_keys = Object.keys(h);
					var k_length = k_keys.length;
					var k_current = 0;
					while(k_current < k_length) {
						var k = k_keys[k_current++];
						var el = this.addedElements.h[name].param.h[k];
						if(el != null) {
							el.textContent = args.h[k];
						}
					}
				}
				return retval;
			}
			var parentSelector = "*[" + "data-malhx-template" + "=\"" + template.parentId + "\"]";
			if(parent == null) {
				parent = this.container.querySelector(parentSelector);
			}
			if(parent != null) {
				var tempParent = this.shadowDom.querySelector(parentSelector);
				if(tempParent != null) {
					tempParent.innerHTML += haxe_xml_Printer.print(template.xml);
					if(tempParent.children.length > 0) {
						this.tempElementsCache.h[template.name] = { element : tempParent.lastElementChild, parent : parent};
						retval = append(tempParent.lastElementChild,parent);
					}
				} else {
					throw haxe_Exception.thrown("" + parentSelector + "\" is not in shadowDom");
				}
			} else {
				throw haxe_Exception.thrown("" + parentSelector + "\" is not in DOMTree");
			}
		} else {
			throw haxe_Exception.thrown("template " + name + " not found");
		}
		return retval;
	}
	,parseGui: function(container,rootNode) {
		if(rootNode.nodeType != 0) {
			throw haxe_Exception.thrown("expected rootNode to be an XmlType Element");
		}
		this.templates = new haxe_ds_StringMap();
		this.addedElements = new haxe_ds_StringMap();
		var att = rootNode.get("template");
		var count = 0;
		var sub = rootNode.elements();
		while(sub.hasNext()) {
			var sub1 = sub.next();
			var index = count++;
			if(index == null) {
				index = 0;
			}
			var att1 = sub1.get("template");
			var count1 = 0;
			var sub2 = sub1.elements();
			while(sub2.hasNext()) {
				var sub3 = sub2.next();
				this.shake(sub3,count1++);
			}
			if(att1 != null) {
				var parent = sub1.parent;
				var uuid;
				if(parent.exists("data-malhx-template")) {
					uuid = parent.get("data-malhx-template");
				} else {
					uuid = uapi_Utils.GenerateUUID();
					parent.set("data-malhx-template",uuid);
				}
				var name = att1;
				if(Object.prototype.hasOwnProperty.call(this.templates.h,name)) {
					throw haxe_Exception.thrown("duplicate template name (" + name + ") found, aborting");
				}
				this.templates.h[name] = { name : name, xml : sub1, parentId : uuid, index : index};
			}
		}
		if(att != null) {
			var parent = rootNode.parent;
			var uuid;
			if(parent.exists("data-malhx-template")) {
				uuid = parent.get("data-malhx-template");
			} else {
				uuid = uapi_Utils.GenerateUUID();
				parent.set("data-malhx-template",uuid);
			}
			var name = att;
			if(Object.prototype.hasOwnProperty.call(this.templates.h,name)) {
				throw haxe_Exception.thrown("duplicate template name (" + name + ") found, aborting");
			}
			this.templates.h[name] = { name : name, xml : rootNode, parentId : uuid, index : 0};
		}
		this.shadowDom = window.document.createElement("div");
		this.shadowDom.innerHTML = haxe_xml_Printer.print(rootNode);
		var sub = rootNode.elements();
		while(sub.hasNext()) {
			var sub1 = sub.next();
			var sub2 = sub1.elements();
			while(sub2.hasNext()) {
				var sub3 = sub2.next();
				this.cleanupTemplateNodes(sub3);
			}
			var att = sub1.attributes();
			while(att.hasNext()) {
				var att1 = att.next();
				if(att1 == "template") {
					sub1.remove("template");
					sub1.parent.removeChild(sub1);
				}
			}
		}
		var att = rootNode.attributes();
		while(att.hasNext()) {
			var att1 = att.next();
			if(att1 == "template") {
				rootNode.remove("template");
				rootNode.parent.removeChild(rootNode);
			}
		}
		var tmp = window.document.createElement("div");
		tmp.innerHTML = haxe_xml_Printer.print(rootNode);
		var _g = 0;
		var _g1 = tmp.children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			container.appendChild(tmp.removeChild(child));
		}
		tmp = null;
	}
	,shake: function(rootNode,index) {
		if(index == null) {
			index = 0;
		}
		var att = rootNode.get("template");
		var count = 0;
		var sub = rootNode.elements();
		while(sub.hasNext()) {
			var sub1 = sub.next();
			this.shake(sub1,count++);
		}
		if(att != null) {
			var parent = rootNode.parent;
			var uuid;
			if(parent.exists("data-malhx-template")) {
				uuid = parent.get("data-malhx-template");
			} else {
				uuid = uapi_Utils.GenerateUUID();
				parent.set("data-malhx-template",uuid);
			}
			var name = att;
			if(Object.prototype.hasOwnProperty.call(this.templates.h,name)) {
				throw haxe_Exception.thrown("duplicate template name (" + name + ") found, aborting");
			}
			this.templates.h[name] = { name : name, xml : rootNode, parentId : uuid, index : index};
		}
	}
	,cleanupTemplateNodes: function(rootNode) {
		var sub = rootNode.elements();
		while(sub.hasNext()) {
			var sub1 = sub.next();
			this.cleanupTemplateNodes(sub1);
		}
		var att = rootNode.attributes();
		while(att.hasNext()) {
			var att1 = att.next();
			if(att1 == "template") {
				rootNode.remove("template");
				rootNode.parent.removeChild(rootNode);
			}
		}
	}
	,__class__: uapi_ui_Mal
};
var uapi_ui_Timeline = $hx_exports["uapi"]["timeline"] = function(parent,timelineLength,maxSelectors,updateTextCb,resizable,defaultLength) {
	if(defaultLength == null) {
		defaultLength = 15;
	}
	if(resizable == null) {
		resizable = false;
	}
	this.tl = null;
	this.timelineLength = null;
	this.defaultLength = null;
	this.resizable = null;
	this.updateTextCb = null;
	this.innerOffsetX = null;
	this.timepoints = [];
	var _gthis = this;
	var _this = this.SRC();
	if(_this.nodeType != Xml.Document && _this.nodeType != Xml.Element) {
		throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (_this.nodeType == null ? "null" : XmlType.toString(_this.nodeType)));
	}
	var mal = new uapi_ui_Mal(parent,_this.children[0]);
	this.updateTextCb = updateTextCb;
	this.resizable = resizable;
	this.defaultLength = defaultLength;
	this.timelineLength = timelineLength;
	if(maxSelectors == null) {
		maxSelectors = 6;
	}
	this.tl = mal.addTemplate("timeline_base").getElementsByClassName("timeline")[0].firstElementChild;
	this.tl.addEventListener("click",function(e) {
		if(!uapi_ui_Timeline.dragging && e.target == _gthis.tl && _gthis.timepoints.length < maxSelectors) {
			var tlrect = _gthis.tl.getBoundingClientRect();
			_gthis.createTimePoint(e.clientX - tlrect.left - _gthis.innerOffsetX,defaultLength);
		}
	});
	window.addEventListener("resize",function(e) {
		var tlrect = _gthis.tl.getBoundingClientRect();
		var _g = 0;
		var _g1 = _gthis.timepoints;
		while(_g < _g1.length) {
			var t = _g1[_g];
			++_g;
			t.el.style.width = "" + tlrect.width / timelineLength * t.pos.duration + "px";
			_gthis.updateTimePoint(t.el,t.pos,false,tlrect.width * (t.pos.start / timelineLength),false);
		}
	});
	var tlrect = this.tl.getBoundingClientRect();
	this.innerOffsetX = this.defaultLength / timelineLength * tlrect.width / 2;
};
$hxClasses["uapi.ui.Timeline"] = uapi_ui_Timeline;
uapi_ui_Timeline.__name__ = "uapi.ui.Timeline";
uapi_ui_Timeline.prototype = {
	timepoints: null
	,innerOffsetX: null
	,updateTextCb: null
	,resizable: null
	,defaultLength: null
	,timelineLength: null
	,tl: null
	,createGrabbable: function(el,callback) {
		var $window = window;
		uapi_JsUtils.AddEventListeners(el,["mouseleave","mouseover","mousedown","mouseup"],function(e) {
			if(e.type == "mousedown") {
				uapi_ui_Timeline.dragging = true;
				el.style.cursor = "grabbing";
				$window.addEventListener("mouseup",function(e) {
					el.style.cursor = "grab";
					$window.removeEventListener("mousemove",callback);
					callback(e);
					return false;
				},{ once : true});
				$window.addEventListener("mousemove",callback);
			}
			if(e.type == "mouseup") {
				uapi_ui_Timeline.dragging = false;
				return false;
			}
			callback(e);
			return false;
		});
	}
	,updateTimePoint: function(tp,pos,allowOverlap,offsetX,updateStart) {
		if(updateStart == null) {
			updateStart = true;
		}
		var tlrect = this.tl.getBoundingClientRect();
		var tprect = tp.getBoundingClientRect();
		var lowerLimit = 0;
		var upperLimit = tlrect.width;
		if(!allowOverlap) {
			var _g = 0;
			var _g1 = this.timepoints;
			while(_g < _g1.length) {
				var t = _g1[_g];
				++_g;
				if(t.pos != pos) {
					var trect = t.el.getBoundingClientRect();
					if(offsetX < trect.right - tlrect.left && offsetX > trect.left - tlrect.left) {
						offsetX = trect.right - tlrect.left;
						break;
					}
					if(offsetX + this.innerOffsetX + tprect.width > trect.left - tlrect.left && offsetX + this.innerOffsetX + tprect.width < trect.right - tlrect.left) {
						offsetX = trect.left - tprect.width - tlrect.left;
						break;
					}
				}
			}
		}
		if(offsetX < lowerLimit) {
			offsetX = lowerLimit;
		}
		if(offsetX + tprect.width > upperLimit) {
			offsetX = upperLimit - tprect.width;
		}
		if(pos.duration < this.timelineLength) {
			tp.style.marginLeft = "" + offsetX + "px";
			this.updateTimePointData(tp,pos,updateStart);
		}
	}
	,updateTimePointData: function(tp,tr,updateStart) {
		if(updateStart == null) {
			updateStart = true;
		}
		var label = tp.getElementsByTagName("span")[0];
		var rect = tp.getBoundingClientRect();
		var tlrect = this.tl.getBoundingClientRect();
		if(updateStart) {
			tr.start = (rect.left - tlrect.left) / tlrect.width * this.timelineLength;
		}
		tr.end = tr.start + tr.duration;
		if(this.timelineLength - tr.end < .33) {
			if(updateStart) {
				tr.start = this.timelineLength - tr.duration;
			}
			tr.end = this.timelineLength;
			tr.duration = tr.end - tr.start;
		}
		if(this.updateTextCb != null) {
			label.innerHTML = this.updateTextCb(tr);
		} else {
			label.innerHTML = tr.start.toFixed(2) + "<br>";
			label.innerHTML += tr.end.toFixed(2);
		}
		return false;
	}
	,createTimePoint: function(start,length,overlap) {
		if(overlap == null) {
			overlap = false;
		}
		var _gthis = this;
		if(length == null) {
			length = this.defaultLength;
		}
		var tp = window.document.createElement("div");
		var pos = { start : start, end : length, duration : length};
		var tlrect = this.tl.getBoundingClientRect();
		tp.className = "point";
		tp.tabIndex = 0;
		var _g = $bind(this,this.updateTimePoint);
		var tp1 = tp;
		var pos1 = pos;
		var allowOverlap = overlap;
		var tmp = function(offsetX) {
			_g(tp1,pos1,allowOverlap,offsetX);
		};
		var _g1 = $bind(this,this.deleteTimePoint);
		var pos2 = pos;
		var tmp1 = function() {
			_g1(pos2);
		};
		this.timepoints.push({ pos : pos, el : tp, updateTimePoint : tmp, 'delete' : tmp1});
		tp.style.width = "" + tlrect.width / this.timelineLength * length + "px";
		if(this.resizable) {
			var hndl_r = window.document.createElement("div");
			hndl_r.className = "grabber";
			this.createGrabbable(hndl_r,function(e) {
				var tlrect = _gthis.tl.getBoundingClientRect();
				if(e.type == "mousedown") {
					var hndl_rect = hndl_r.getBoundingClientRect();
					_gthis.innerOffsetX = hndl_rect.width - (e.clientX - hndl_rect.left);
				}
				if(e.type == "mousemove") {
					var tprect = tp.getBoundingClientRect();
					var size = tprect.right + (e.clientX + _gthis.innerOffsetX - tprect.right);
					if(size <= tlrect.right) {
						tp.style.width = e.clientX - tprect.left + _gthis.innerOffsetX + "px";
						pos.end = (e.clientX - tlrect.left + _gthis.innerOffsetX) / tlrect.width * _gthis.timelineLength;
						pos.duration = pos.end - pos.start;
					}
					_gthis.updateTimePointData(tp,pos,false);
				}
				e.stopImmediatePropagation();
				return false;
			});
			tp.appendChild(hndl_r);
		}
		var label = window.document.createElement("span");
		tp.appendChild(label);
		this.createGrabbable(tp,function(e) {
			var tlrect = _gthis.tl.getBoundingClientRect();
			switch(e.type) {
			case "mousedown":
				_gthis.innerOffsetX = e.clientX - tp.getBoundingClientRect().left;
				return false;
			case "mousemove":
				var offsetX = e.clientX - tlrect.left - _gthis.innerOffsetX;
				_gthis.updateTimePoint(tp,pos,overlap,offsetX);
				break;
			case "mouseup":
				_gthis.innerOffsetX = 0;
				return false;
			}
			e.stopImmediatePropagation();
			return false;
		});
		this.tl.appendChild(tp);
		this.updateTimePoint(tp,pos,overlap,start / this.timelineLength * tlrect.width,false);
		var _g2 = $bind(this,this.updateTimePoint);
		var tp2 = tp;
		var pos3 = pos;
		var allowOverlap1 = overlap;
		return function(offsetX) {
			_g2(tp2,pos3,allowOverlap1,offsetX);
		};
	}
	,deleteTimePoint: function(pos) {
		var _g = 0;
		var _g1 = this.timepoints;
		while(_g < _g1.length) {
			var o = _g1[_g];
			++_g;
			if(o.pos == pos) {
				HxOverrides.remove(this.timepoints,o);
				o.el.parentElement.removeChild(o.el);
				break;
			}
		}
	}
	,updateLabel: function(text,left_right) {
		if(left_right == null) {
			left_right = "right";
		}
		var field = this.tl.parentElement.parentElement.getElementsByClassName("tfield")[left_right == "right" ? 1 : 0];
		field.innerHTML = text;
	}
	,SRC: function() {
		return Xml.parse(haxe_crypto_Base64.decode("PGRpdj48c3R5bGU+LnRpbWVsaW5lIHtib3JkZXI6IDFweCBzb2xpZCBibGFjazstd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7LXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTsta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7LW1vei11c2VyLXNlbGVjdDogbm9uZTstbXMtdXNlci1zZWxlY3Q6IG5vbmU7dXNlci1zZWxlY3Q6IG5vbmU7fS50aW1lbGluZSAjdGltZWxpbmUge2JhY2tncm91bmQ6bGlnaHRncmV5O3dpZHRoOiAxMDAlO2hlaWdodDogNTBweDtjdXJzb3I6IHBvaW50ZXI7Zm9udC1mYW1pbHk6IG1vbm9zcGFjZTtmb250LXN0cmV0Y2g6IGV4dHJhLWNvbmRlbnNlZDtib3gtc2hhZG93OiBpbnNldCAwIDBweCAxZW0gMC4xZW0gIzAwMDAwMDY2O30udGltZWxpbmUgLnBvaW50IHtwb3NpdGlvbjogYWJzb2x1dGU7Y3Vyc29yOiBncmFiO3dpZHRoOiA1MHB4O2hlaWdodDogaW5oZXJpdDtiYWNrZ3JvdW5kOiB3aGl0ZXNtb2tlO29wYWNpdHk6IC44Njtib3JkZXItbGVmdDogMXB4IHNvbGlkIGJsYWNrO2JvcmRlci1yaWdodDogMXB4IHNvbGlkIGJsYWNrO3RyYW5zaXRpb246IG9wYWNpdHkgMTAwbXMgZWFzZTt6LWluZGV4OiAxO30ucG9pbnQgLmdyYWJiZXIge3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjBweDt3aWR0aDo5cHg7aGVpZ2h0OjEwMCU7fS5wb2ludDo6YWZ0ZXJ7Y29udGVudDoi4pa8Ijtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OiAtN3B4O3RvcDogLTE3cHg7fS5wb2ludDpob3ZlciAucG9pbnR7b3BhY2l0eTogMS4wO30ucG9pbnQ6Zm9jdXMge291dGxpbmUtd2lkdGg6IDFweDtvdXRsaW5lLXN0eWxlOiBkYXNoZWQ7b3V0bGluZS1jb2xvcjogcmVkO30uZ3JhYmJlcjpob3ZlciB7YmFja2dyb3VuZDpjcmltc29uO29wYWNpdHk6IC44O30ucG9pbnQgc3BhbiB7Zm9udC1zaXplOiAxMHB4O3VzZXItc2VsZWN0OiBub25lO3RleHQtYWxpZ246IGNlbnRlcjt1c2VyLXNlbGVjdDogbm9uZTt9LmNhcmV0IHt0b3A6IDA7cG9zaXRpb246IGFic29sdXRlO3dpZHRoOiAxcHg7aGVpZ2h0OiAxMDBweDtiYWNrZ3JvdW5kOiByZWQ7bWFyZ2luOiAwO2JvcmRlcjogMDt9LnRmaWVsZHtwb3NpdGlvbjphYnNvbHV0ZTt9PC9zdHlsZT48ZGl2IHRlbXBsYXRlPSJ0aW1lbGluZV9iYXNlIiBzdHlsZT0id2lkdGg6MTAwJTtwb3NpdGlvbjpyZWxhdGl2ZTtwYWRkaW5nLXRvcDogMjRweDtwYWRkaW5nLWJvdHRvbTogMjRweDsiPjxkaXYgY2xhc3M9InRpbWVsaW5lIj48ZGl2IGlkPSJ0aW1lbGluZSI+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz0iY2FyZXQiIHN0eWxlPSJsZWZ0OjA7Ij48L2Rpdj48ZGl2IGNsYXNzPSJjYXJldCIgc3R5bGU9InJpZ2h0OjA7Ij48L2Rpdj48ZGl2IGNsYXNzPSJ0ZmllbGQiIHN0eWxlPSJsZWZ0OjZweDsiPjAwOjAwOjAwPC9kaXY+PGRpdiBjbGFzcz0idGZpZWxkIiBzdHlsZT0icmlnaHQ6NnB4OyI+MDA6MDA6MDA8L2Rpdj48L2Rpdj48L2Rpdj4=").toString());
	}
	,__class__: uapi_ui_Timeline
};
var uapi_ui_Tree = $hx_exports["uapi"]["tree"] = function(parent,obj,maxDepth) {
	if(maxDepth == null) {
		maxDepth = 3;
	}
	if(obj == null) {
		obj = { aa : 1, bb : [2,3,4], cc : { dd : { ee : [123], ff : "aa"}}};
	}
	var base = window.document.createElement("div");
	var walk = null;
	walk = function(obj,base,depth) {
		if(depth == null) {
			depth = 0;
		}
		var sections = base.getElementsByTagName("section");
		if(sections.length > 0) {
			base = sections.item(0);
		}
		base.style.marginLeft = 100 * depth + "px";
		var fields = Reflect.fields(obj);
		var cls = js_Boot.getClass(obj);
		if(depth > maxDepth) {
			return;
		}
		if(cls != null) {
			fields = fields.concat(Type.getInstanceFields(cls));
		}
		var _g = 0;
		while(_g < fields.length) {
			var o = fields[_g];
			++_g;
			var field = Reflect.field(obj,o);
			if(typeof(field) != "string" && typeof(field) != "boolean" && !(typeof(field) == "number" && ((field | 0) === field)) && typeof(field) != "number") {
				walk(Reflect.field(obj,o),base.appendChild(uapi_ui_Tree.node({ _class : "treenode", key : "" + o, value : ""})),depth + 1);
			} else {
				base.appendChild(uapi_ui_Tree.node({ _class : "treenode", key : "" + o, value : "" + JSON.stringify(field)}));
			}
		}
	};
	walk(obj,base);
	window.document.body.appendChild(uapi_ui_Tree.styles({ }));
	parent.appendChild(base);
};
$hxClasses["uapi.ui.Tree"] = uapi_ui_Tree;
uapi_ui_Tree.__name__ = "uapi.ui.Tree";
uapi_ui_Tree.node = function(obj) {
	var el_0 = window.document.createElement("div");
	Reflect.setProperty(el_0,"onclick",new Function(new haxe_Template("if(event.target == this) this.classList.toggle('collapsed'); return false;").execute(obj)));
	Reflect.setProperty(el_0,"className",new haxe_Template("::_class::").execute(obj));
	el_0.innerText = new haxe_Template("::key::").execute(obj);
	var el_1 = window.document.createElement("section");
	el_1.innerText = new haxe_Template("::value::").execute(obj);
	el_0.appendChild(el_1);
	return el_0;
};
uapi_ui_Tree.styles = function(obj) {
	var el_0 = window.document.createElement("style");
	el_0.innerText = new haxe_Template(".collapsed section{height: 0px;}.treenode::before {content: '▲';transform: rotate(180deg);position: absolute;left: -15px;transition: transform 220ms ease-out;}.treenode.collapsed::before {transform: rotate(90deg);}.treenode {margin-left: 20px;display: flex;justify-content: space-between;position: relative;border-bottom: 1px solid grey;}.treenode section {background:honeydew;overflow:hidden;}").execute(obj);
	return el_0;
};
uapi_ui_Tree.prototype = {
	__class__: uapi_ui_Tree
};
function $getIterator(o) { if( o instanceof Array ) return new haxe_iterators_ArrayIterator(o); else return o.iterator(); }
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
$hxClasses["Math"] = Math;
if( String.fromCodePoint == null ) String.fromCodePoint = function(c) { return c < 0x10000 ? String.fromCharCode(c) : String.fromCharCode((c>>10)+0xD7C0)+String.fromCharCode((c&0x3FF)+0xDC00); }
String.prototype.__class__ = $hxClasses["String"] = String;
String.__name__ = "String";
$hxClasses["Array"] = Array;
Array.__name__ = "Array";
Date.prototype.__class__ = $hxClasses["Date"] = Date;
Date.__name__ = "Date";
haxe_Resource.content = [{ name : "template", data : "PGh0bWw+Cgk8aGVhZD4KCQk8c3R5bGU+CgkJCWh0bWwsIGJvZHkgewoJCQkJZm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjsKCQkJCWJhY2tncm91bmQ6IGRpbWdyYXk7CgkJCQljb2xvcjogYmxhY2s7CgkJCQlwYWRkaW5nOiAwOwoJCQkJbWFyZ2luOiAwOwoJCQkJd2lkdGg6IDEwMCU7CgkJCQloZWlnaHQ6IDEwMCU7CgkJCQlmb250LXNpemU6IDEwcHg7CgkJCQlmb250LWZhbWlseTogc2Fucy1zZXJpZjsKCQkJfQoJCQkudGl0bGUgewoJCQkJdG9wOiAxLjVweDsKCQkJCWJhY2tncm91bmQ6IGluaGVyaXQ7CgkJCQlwYWRkaW5nLWxlZnQ6IDVweDsKCQkJCXBhZGRpbmctcmlnaHQ6IDVweDsKCQkJfQoJCQkudGl0bGUsIC50aXRsZSBhIHsKCQkJCXBvc2l0aW9uOiBhYnNvbHV0ZTsKCQkJCXJpZ2h0OiAwcHg7CgkJCQlmb250LXdlaWdodDogMTAwOwoJCQkJZm9udC1zaXplOiAxMHB4OwoJCQkJdXNlci1zZWxlY3Q6IG5vbmU7CgkJCQlmb250LXZhcmlhbnQtY2Fwczogc21hbGwtY2FwczsKCQkJCXRleHQtZGVjb3JhdGlvbjogbm9uZTsKCQkJfQoJCQkubG9hZGluZyB7CgkJCQl3aWR0aDogMTAwJTsKCQkJCXBvc2l0aW9uOiBmaXhlZDsKCQkJCWhlaWdodDogMTAwJTsKCQkJCS8qZmlsdGVyOiBibHVyKDEuMnB4KTsqLwoJCQkJdmlzaWJpbGl0eTogdmlzaWJsZTsKCQkJfQoJCQkuaGlkZSB7CgkJCQlhbmltYXRpb246IGhpZGUgLjNzIGxpbmVhciBmb3J3YXJkczsKCQkJfQoJCQkubG9hZGluZyBkaXYgewoJCQkJd2lkdGg6IDIwJTsKCQkJCWNvbG9yOiB3aGl0ZTsKCQkJCW1hcmdpbjogMDsKCQkJCXRvcDogNTAlOwoJCQkJdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7CgkJCQlwb3NpdGlvbjogYWJzb2x1dGU7CgkJCQlsZWZ0OiA1MCU7CgkJCQlvcGFjaXR5OiAuNTsKCQkJfQoJCQkubG9hZGluZyBkaXYgc3ZnIHsKCQkJCWFuaW1hdGlvbjogbG9hZGluZyA1cyBpbmZpbml0ZSBsaW5lYXIgYmFja3dhcmRzOwoJCQl9CgkJCWEgewoJCQkJcG9zaXRpb246IHJlbGF0aXZlICFpbXBvcnRhbnQ7CgkJCQljb2xvcjogYmxhY2s7CgkJCX0KCQkJCgkJCS5tZXNzYWdlYm94ewoJCQkJb3ZlcmZsb3c6IGhpZGRlbjsKCQkJfQoJCQkjY29udHJvbHN7CgkJCQlwb3NpdGlvbjphYnNvbHV0ZTsKCQkJCWJvdHRvbTogMDsKCQkJCXdpZHRoOiAxMDAlOwoJCQkJYmFja2dyb3VuZDogZ2FpbnNib3JvOwoJCQkJb3ZlcmZsb3c6IGhpZGRlbjsKCQkJfQoJCQkjY29udHJvbHMgI2Vycm9yIHsKCQkJCW92ZXJmbG93OiBhdXRvOwoJCQkJbWFyZ2luOiAwcHggMHB4IDBweCAycHg7CgkJCQltYXgtaGVpZ2h0OiAyNTBweDsKCQkJCWRpc3BsYXk6IGlubGluZS1ibG9jazsKCQkJCXdpZHRoOiAxMDAlOwoJCQl9CgkJCSNlcnJvciAubWVzc2FnZSB7CgkJCQlmb250LXNpemU6IDEwcHggIWltcG9ydGFudDsKCQkJCWZvbnQtZmFtaWx5OiBNZW5sbywgbW9ub3NwYWNlOwoJCQkJZm9udC13ZWlnaHQ6IDEwMDsKCQkJCS13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkOwoJCQkJYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGdyZXk7CgkJCQl3aGl0ZS1zcGFjZTogcHJlOwoJCQl9CgkJCQoJCQkubWVzc2FnZTpob3ZlciB7CgkJCQliYWNrZ3JvdW5kOiBsaWdodGdyYXk7CgkJCX0KCgkJCS5mb2xkZWQgewoJCQkJaGVpZ2h0OiAxNXB4OwoJCQkJb3ZlcmZsb3c6aGlkZGVuOwoJCQkJCgkJCX0KCQkJI2Vycm9yIHsKCQkJCWRpc3BsYXk6IGJsb2NrOwoJCQl9CgoJCQkuZm9sZGVkICNlcnJvciB7CgkJCQlkaXNwbGF5OiBub25lOwoJCQl9CgkJCSNtZXNzYWdlY291bnQgewoJCQkJbWFyZ2luLWxlZnQ6IDJweDsKCQkJCXVzZXItc2VsZWN0OiBub25lOwoJCQkJY3Vyc29yOiBwb2ludGVyOwoJCQkJaGVpZ2h0OiAxNXB4OwoJCQl9CgkJCSNtZXNzYWdlY291bnQ6aG92ZXIgewoJCQkJdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7CgkJCX0KCQkJI21lc3NhZ2Vjb3VudDo6YmVmb3JlIHsKCQkJCWNvbnRlbnQ6ICLilrwiOwoJCQkJbWFyZ2luLXJpZ2h0OiAycHg7CgkJCQlkaXNwbGF5OiBpbmxpbmUtYmxvY2s7CgkJCQl0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMTAwbXMgbGluZWFyOwoJCQl9CgkJCS5mb2xkZWQgI21lc3NhZ2Vjb3VudDo6YmVmb3JlIHsKCQkJCWNvbnRlbnQ6ICLilrwiOwoJCQkJdHJhbnNmb3JtOiByb3RhdGUoLTkwZGVnKTsKCQkJCWRpc3BsYXk6IGlubGluZS1ibG9jazsKCQkJCW1hcmdpbi1yaWdodDogMnB4OwoJCQl9CgkJCSN2aWRlb19jb250cm9sc193cmFwcGVyLCAjY29udHJvbHNfY3VzdG9tIHsKCQkJCXBvc2l0aW9uOiByZWxhdGl2ZTsKCQkJfQoJCQkjY29udHJvbHNfZWxlbWVudHMgewoJCQkJcGFkZGluZzogMTBweCAxMnB4IDVweCAxMnB4OwoJCQkJZGlzcGxheTogZmxleDsKCQkJCWZsZXgtd3JhcDogd3JhcDsKCQkJfQoJCQkjY29udHJvbHNfZWxlbWVudHMgZGl2OmhvdmVyIHsKCQkJCWJhY2tncm91bmQ6IGxpZ2h0Z3JleTsKCQkJfQoJCQkjY29udHJvbHNfZWxlbWVudHMgbGFiZWwgewoJCQkJbWFyZ2luLWxlZnQ6IDJweDsKCQkJfQoJCQkjY29udHJvbHNfZWxlbWVudHMgZGl2IHNlbGVjdCB7CgkJCQl3aWR0aDogOTklOwoJCQkJY3Vyc29yOnBvaW50ZXI7CgkJCX0KCQkJQG1lZGlhIChtYXgtd2lkdGg6IDExMDBweCkgewoJCQkJI2NvbnRyb2xzX2VsZW1lbnRzIGRpdiB7CgkJCQkJd2lkdGg6IDI1JTsKCQkJCX0KCQkJfQoJCQlAbWVkaWEgKG1heC13aWR0aDogODAwcHgpIHsKCQkJCSNjb250cm9sc19lbGVtZW50cyBkaXYgewoJCQkJCXdpZHRoOiAzMyU7CgkJCQl9CgkJCX0KCQkJQG1lZGlhIChtYXgtd2lkdGg6IDQwMHB4KSB7CgkJCQkjY29udHJvbHNfZWxlbWVudHMgZGl2IHsKCQkJCQl3aWR0aDogNTAlOwoJCQkJfQoJCQl9CgoJCQkvKiAgbWFrZSBzY3JvbGxiYXIgaW52aXNpYmxlICoKCQkJOjotd2Via2l0LXNjcm9sbGJhciB7CgkJCQl3aWR0aDogMHB4OyAgCgkJCQliYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsgIAoJCQl9Ki8KCQkJCgkJCUBrZXlmcmFtZXMgbG9hZGluZyB7CgkJCQlmcm9tIHt0cmFuc2Zvcm06cm90YXRlKDBkZWcpO30KCQkJCXRvIHt0cmFuc2Zvcm06cm90YXRlKDM2MGRlZyk7fQoJCQl9CgkJCUBrZXlmcmFtZXMgaGlkZSB7CgkJCQlmcm9tIHtvcGFjaXR5Oi44OyB2aXNpYmlsaXR5OiB2aXNpYmxlO30KCQkJCXRvIHtvcGFjaXR5OiAwLjA7IHZpc2liaWxpdHk6IGhpZGRlbjt9CgkJCX0KCgkJPC9zdHlsZT4KCQk8c2NyaXB0PgoJCQlpZighZnJhbWVFbGVtZW50KQoJCQkJdGhyb3cgImNoZWNrIHNhbWUtb3JpZ2luIHBvbGljeSI7CgkJCWVsc2UKCQkJCWlmKCdob29rJyBpbiBmcmFtZUVsZW1lbnQpCgkJCQkJZnJhbWVFbGVtZW50Lmhvb2sod2luZG93KTsKCQkJLy91c2VkIC9yZXMvcGxheWVycy8qOgoJCQl2YXIgdXJpID0gdW5lc2NhcGUoJzo6dXJpOjonKTsgCgkJCXZhciB0aXRsZSA9IHVuZXNjYXBlKCc6OnRpdGxlOjogKDo6dGl0bGVfdmVyc2lvbjo6KScpOwoJCTwvc2NyaXB0PgoJCTx0aXRsZT46OmRvY190aXRsZTo6PC90aXRsZT4KCQk6OmhlYWQ6OgoJPC9oZWFkPgoJPGJvZHk+CgkJPGRpdiBpZD0ibG9hZGVyIiBjbGFzcz0ibG9hZGluZyI+CgkJCTxkaXY+CgkJCTo6bG9hZGluZzo6CgkJCTwvZGl2PgoJCTwvZGl2PgoJCTxkaXYgaWQ9InZpZGVvX2NvbnRyb2xzX3dyYXBwZXIiPgoJCQk8dmlkZW8gaWQ9InZpZGVvIiB3aWR0aD0iMTAwJSIgJCRwb3N0ZXIoKSA6OmlmIGF0dHJfY29udHJvbHM6OmNvbnRyb2xzOjplbmQ6OiA6OmlmIGF0dHJfcGxheXNpbmxpbmU6OnBsYXlzaW5saW5lOjplbmQ6OiA6OmlmIGF0dHJfbXV0ZWQ6Om11dGVkOjplbmQ6OiA6OmlmIGF0dHJfYXV0b3BsYXk6OmF1dG9wbGF5OjplbmQ6OiA+PC92aWRlbz4KCQkJPGRpdiBpZD0idHRtbCI+PC9kaXY+CgkJCTxkaXYgaWQ9ImNvbnRyb2xzX2N1c3RvbSI+PC9kaXY+CgkJPC9kaXY+CgkJOjpib2R5OjoKCQk8ZGl2IGlkPSJjb250cm9scyI+CgkJCTxzcGFuIGNsYXNzPSJ0aXRsZSI+Ojp0aXRsZTo6Jm5ic3A7PGEgdGFyZ2V0PSJfYmxhbmsiIGhyZWY9Ijo6dGl0bGVfaHJlZjo6Ij4oOjp0aXRsZV92ZXJzaW9uOjopPC9hPjwvc3Bhbj4KCQkJPGRpdiBjbGFzcz0ibWVzc2FnZWJveCBmb2xkZWQiPgoJCQkJPGRpdiBpZD0ibWVzc2FnZWNvdW50Ij5ubyBtZXNzYWdlczwvZGl2PgoJCQkJPGRpdiBpZD0iZXJyb3IiPjwvZGl2PgoJCQk8L2Rpdj4KCQkJOjpjb250cm9sczo6CgkJPC9kaXY+CgkJPHNjcmlwdD4KCQkJaWYoJ2hvb2tfZW5kJyBpbiBmcmFtZUVsZW1lbnQpCgkJCQlmcmFtZUVsZW1lbnQuaG9va19lbmQod2luZG93LCB2aWRlbyk7CgkJPC9zY3JpcHQ+Cgk8L2JvZHk+CjwvaHRtbD4"},{ name : "shaka-argan", data : "eyJkcm1fc2VydmVyX3BsYXlyZWFkeSI6eyJoZWxwIjoiY29tLm1pY3Jvc29mdC5wbGF5cmVhZHkiLCJkZWZhdWx0XyI6Imh0dHBzOi8vcGxheXJlYWR5LmRpcmVjdHRhcHMubmV0L3ByL3N2Yy9yaWdodHNtYW5hZ2VyLmFzbXg/UGxheVJpZ2h0PTEmVXNlU2ltcGxlTm9uUGVyc2lzdGVudExpY2Vuc2U9MSZQbGF5RW5hYmxlcnM9Nzg2NjI3RDgtQzJBNi00NEJFLThGODgtMDhBRTI1NUIwMUE3In0sInNldFRleHRUcmFja1Zpc2liaWxpdHkiOnsiaGVscCI6IlRleHQgVHJhY2tzIHZpc2libGUiLCJkZWZhdWx0XyI6dHJ1ZX0sImRybV9zZXJ2ZXJfd2lkZXZpbmUiOnsiaGVscCI6ImNvbS53aWRldmluZS5hbHBoYSIsImRlZmF1bHRfIjoiaHR0cHM6Ly93aWRldmluZS1wcm94eS5hcHBzcG90LmNvbS9wcm94eSJ9LCJqdW1wTGFyZ2VHYXBzIjp7ImhlbHAiOiJjb25maWcuc3RyZWFtaW5nLmp1bXBMYXJnZUdhcHMiLCJkZWZhdWx0XyI6dHJ1ZX0sInNtYWxsR2FwTGltaXQiOnsiaGVscCI6ImNvbmZpZy5zdHJlYW1pbmcuc21hbGxHYXBMaW1pdCIsImRlZmF1bHRfIjowLjV9fQ"},{ name : "_help_map", data : "Ynk1OnF1aWV0b3k0OmhlbHB5Mzg6ZG8lMjBub3QlMjBzaG93JTIwZXJyb3JzJTIwaW4lMjBvdXRwdXR5ODpkZWZhdWx0X2ZneTExOnBsYXlzaW5saW5lb1IxeTQ4OmRpc2FibGUlMjB2aWRlb2VsZW1lbnQlMjBwbGF5c2lubGluZSUyMGF0dHJpYnV0ZVIzdGd5NTptdXRlZG9SMXkzNDpzZXQlMjB2aWRlb2VsZW1lbnQlMjBtdXRlZCUyMHN0YXRlUjNmZ3k4OmNvbnRyb2xzb1IxeTQ2OmRpc2FibGUlMjB2aWRlb2VsZW1lbnQlMjBidWlsdCUyMGluJTIwY29udHJvbHNSM3RneTg6YXV0b3BsYXlvUjF5Mzc6c2V0JTIwdmlkZW9lbGVtZW50JTIwYXV0b3BsYXklMjBzdGF0ZVIzdGdo"},{ name : "hlsjs-src", data : "ewogICAgIjEuMi45IjogWyJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL2hscy5qc0AxLjIuOS9kaXN0L2hscy5taW4uanMiXSwKICAgICIxLjIuMSI6IFsiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9obHMuanNAMS4yLjEvZGlzdC9obHMubWluLmpzIl0sCiAgICAiMS4xLjMiOiBbImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vaGxzLmpzQDEuMS4zL2Rpc3QvaGxzLm1pbi5qcyJdLAogICAgIjEuMC43IjogWyJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL2hscy5qc0AxLjAuNy9kaXN0L2hscy5taW4uanMiXSwKICAgICIxLjAuNCI6IFsiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9obHMuanNAMS4wLjQvZGlzdC9obHMubWluLmpzIl0sCiAgICAiMS4wLjMiOiBbImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vaGxzLmpzQDEuMC4zL2Rpc3QvaGxzLm1pbi5qcyJdLAogICAgIjEuMC4yIjogWyJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL2hscy5qc0AxLjAuMi9kaXN0L2hscy5taW4uanMiXSwKICAgICIxLjAuMSI6IFsiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9obHMuanNAMS4wLjEvZGlzdC9obHMubWluLmpzIl0sCiAgICAiMC4xMi4zIjogWyJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL2hscy5qc0AwLjEyLjMvZGlzdC9obHMubWluLmpzIl0sCiAgICAiMC4xMi4yIjogWyJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL2hscy5qc0AwLjEyLjIvZGlzdC9obHMubWluLmpzIl0sCiAgICAiMC4xMS4wIjogWyJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL2hscy5qc0AwLjExLjAvZGlzdC9obHMubWluLmpzIl0sCiAgICAiMC4xMC4xIjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9obHMuanMvMC4xMC4xL2hscy5qcyJdCn0K"},{ name : "hasplayer-src", data : "ewogICAgIjEuMTUuMSI6IFsiaHR0cHM6Ly9vcmFuZ2Utb3BlbnNvdXJjZS5naXRodWIuaW8vaGFzcGxheWVyLmpzLzEuMTUuMS9kaXN0L2hhc3BsYXllci5qcyJdLAogICAgIjEuMTUuMCI6IFsiaHR0cHM6Ly9vcmFuZ2Utb3BlbnNvdXJjZS5naXRodWIuaW8vaGFzcGxheWVyLmpzLzEuMTUuMC9kaXN0L2hhc3BsYXllci5qcyJdLAogICAgIjEuMTQuMiI6IFsiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9oYXNwbGF5ZXIuanNAMS4xNC4yL2Rpc3QvaGFzcGxheWVyLm1pbi5qcyJdCn0"},{ name : "dashjs", data : "ZGF0YTp0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTg7YmFzZTY0LEtHWjFibU4wYVc5dUlDZ2taMnh2WW1Gc0tTQjdJQ0oxYzJVZ2MzUnlhV04wSWpzS2RtRnlJQ1JvZUVOc1lYTnpaWE1nUFNCN2ZTd2taWE4wY2lBOUlHWjFibU4wYVc5dUtDa2dleUJ5WlhSMWNtNGdhbk5mUW05dmRDNWZYM04wY21sdVoxOXlaV01vZEdocGN5d25KeWs3SUgwc0pHaDRSVzUxYlhNZ1BTQWthSGhGYm5WdGN5QjhmQ0I3ZlN3a1h6c0tablZ1WTNScGIyNGdKR1Y0ZEdWdVpDaG1jbTl0TENCbWFXVnNaSE1wSUhzS0NYWmhjaUJ3Y205MGJ5QTlJRTlpYW1WamRDNWpjbVZoZEdVb1puSnZiU2s3Q2dsbWIzSWdLSFpoY2lCdVlXMWxJR2x1SUdacFpXeGtjeWtnY0hKdmRHOWJibUZ0WlYwZ1BTQm1hV1ZzWkhOYmJtRnRaVjA3Q2dscFppZ2dabWxsYkdSekxuUnZVM1J5YVc1bklDRTlQU0JQWW1wbFkzUXVjSEp2ZEc5MGVYQmxMblJ2VTNSeWFXNW5JQ2tnY0hKdmRHOHVkRzlUZEhKcGJtY2dQU0JtYVdWc1pITXVkRzlUZEhKcGJtYzdDZ2x5WlhSMWNtNGdjSEp2ZEc4N0NuMEtkbUZ5SUVGeVoyRnVJRDBnWm5WdVkzUnBiMjRvS1NCN0lIMDdDaVJvZUVOc1lYTnpaWE5iSWtGeVoyRnVJbDBnUFNCQmNtZGhianNLUVhKbllXNHVYMTl1WVcxbFgxOGdQU0IwY25WbE93cEJjbWRoYmk1emRHRnlkQ0E5SUdaMWJtTjBhVzl1S0dOdmJtWnBaeWtnZXdvSmFXWW9iblZzYkNBaFBTQmpiMjVtYVdjcElIc0tDUWwyWVhJZ1lYSm5jMTl6WlhRZ1BTQnVaWGNnYUdGNFpWOWtjMTlUZEhKcGJtZE5ZWEFvS1RzS0NRbDJZWElnWDJjZ1BTQXdPd29KQ1haaGNpQmZaekVnUFNCU1pXWnNaV04wTG1acFpXeGtjeWhqYjI1bWFXY3BPd29KQ1hkb2FXeGxLRjluSUR3Z1gyY3hMbXhsYm1kMGFDa2dld29KQ1FsMllYSWdaaUE5SUY5bk1WdGZaMTA3Q2drSkNTc3JYMmM3Q2drSkNXRnlaM05mYzJWMExtaGJabDBnUFNCU1pXWnNaV04wTG1acFpXeGtLR052Ym1acFp5eG1LVHNLQ1FsOUNna0pRWEpuWVc0dVlYSm5jeUE5SUdGeVozTmZjMlYwT3dvSmZRcDlPd3BCY21kaGJpNXZZbXBsWTNSR2NtOXRUV0Z3SUQwZ1puVnVZM1JwYjI0b2JXRndLU0I3Q2dsMllYSWdiMkpxSUQwZ2V5QjlPd29KZG1GeUlHZ2dQU0J0WVhBdWFEc0tDWFpoY2lCclgyZ2dQU0JvT3dvSmRtRnlJR3RmYTJWNWN5QTlJRTlpYW1WamRDNXJaWGx6S0dncE93b0pkbUZ5SUd0ZmJHVnVaM1JvSUQwZ2ExOXJaWGx6TG14bGJtZDBhRHNLQ1haaGNpQnJYMk4xY25KbGJuUWdQU0F3T3dvSmQyaHBiR1VvYTE5amRYSnlaVzUwSUR3Z2ExOXNaVzVuZEdncElIc0tDUWwyWVhJZ2F5QTlJR3RmYTJWNWMxdHJYMk4xY25KbGJuUXJLMTA3Q2drSmIySnFXMnRkSUQwZ2JXRndMbWhiYTEwN0NnbDlDZ2x5WlhSMWNtNGdiMkpxT3dwOU93cDJZWElnUkdGemFFcHpJRDBnWm5WdVkzUnBiMjRvS1NCN0lIMDdDaVJvZUVOc1lYTnpaWE5iSWtSaGMyaEtjeUpkSUQwZ1JHRnphRXB6T3dwRVlYTm9Tbk11WDE5dVlXMWxYMThnUFNCMGNuVmxPd3BFWVhOb1NuTXViV0ZwYmlBOUlHWjFibU4wYVc5dUtDa2dld29KZG1GeUlIUnBkR3hsSUQwZ1VtVm1iR1ZqZEM1bWFXVnNaQ2gzYVc1a2IzY3NJblJwZEd4bElpazdDZ2xwWmloMGFYUnNaUzVwYm1SbGVFOW1LR1JoYzJocWN5NVdaWEp6YVc5dUtTQTlQU0F0TVNrZ2V3b0pDU1JuYkc5aVlXd3VZMjl1YzI5c1pTNTNZWEp1S0NKTWIyRmtaV1FnUkdGemFFcHpJSFpsY25OcGIyNGdYQ0lpSUNzZ1pHRnphR3B6TGxabGNuTnBiMjRnS3lBaVhDSWdibTkwSUcxaGRHTm9hVzVuSUhCc1lYbGxjaUIwYVhSc1pTQmNJaUlnS3lCMGFYUnNaU0FySUNKY0lpSXBPd29KZlFvSlJHRnphRXB6TG5ZeklEMGdVM1J5YVc1blZHOXZiSE11YzNSaGNuUnpWMmwwYUNoa1lYTm9hbk11Vm1WeWMybHZiaXdpTXk0aUtUc0tDVVJoYzJoS2N5NTJOQ0E5SUZOMGNtbHVaMVJ2YjJ4ekxuTjBZWEowYzFkcGRHZ29aR0Z6YUdwekxsWmxjbk5wYjI0c0lqUXVJaWs3Q2dsM2FXNWtiM2N1YUdWc2NDQTlJR1oxYm1OMGFXOXVLQ2tnZXdvSkNYSmxkSFZ5YmlCQmNtZGhiaTV2WW1wbFkzUkdjbTl0VFdGd0tHaGhlR1ZmVlc1elpYSnBZV3hwZW1WeUxuSjFiaWhvWVhobFgxSmxjMjkxY21ObExtZGxkRk4wY21sdVp5Z2lYMmhsYkhCZmJXRndJaWtwS1RzS0NYMDdDZ2xCY21kaGJpNXpkR0Z5ZENoM2FXNWtiM2N1WTI5dVptbG5LVHNLQ1haaGNpQndJRDBnWkdGemFHcHpMazFsWkdsaFVHeGhlV1Z5S0NrdVkzSmxZWFJsS0NrN0NnbDNhVzVrYjNjdWNHeGhlV1Z5SUQwZ2NEc0tDWFpoY2lCd2JHRjVaWElnUFNCd093b0pkbUZ5SUd4dloweGxkbVZzSUQwZ1FYSm5ZVzR1WVhKbmN5QWhQU0J1ZFd4c0lDWW1JRTlpYW1WamRDNXdjbTkwYjNSNWNHVXVhR0Z6VDNkdVVISnZjR1Z5ZEhrdVkyRnNiQ2hCY21kaGJpNWhjbWR6TG1nc0ltUmhjMmhxYzE5c2IyZHNaWFpsYkNJcElEOGdVM1JrTG5CaGNuTmxTVzUwS0VGeVoyRnVMbUZ5WjNNdWFGc2laR0Z6YUdwelgyeHZaMnhsZG1Wc0lsMHBJRG9nTkRzS0NXbG1LRVJoYzJoS2N5NTJNeWtnZXdvSkNYWmhjaUJ3YkdGNVpYSXhJRDBnY0d4aGVXVnlPd29KQ1haaGNpQnlaWFFnUFNCN0lIMDdDZ2tKZG1GeUlIQmhkR2dnUFNBaVpHVmlkV2N1Ykc5blRHVjJaV3dpTG5Od2JHbDBLQ0l1SWlrN0Nna0pjbVYwVzNCaGRHZ3VjRzl3S0NsZElEMGdiRzluVEdWMlpXdzdDZ2tKZDJocGJHVW9jR0YwYUM1c1pXNW5kR2dnUGlBd0tTQjdDZ2tKQ1haaGNpQndZWEpsYm5RZ1BTQjdJSDA3Q2drSkNYQmhjbVZ1ZEZ0d1lYUm9MbkJ2Y0NncFhTQTlJSEpsZERzS0NRa0pjbVYwSUQwZ2NHRnlaVzUwT3dvSkNYMEtDUWx3YkdGNVpYSXhMblZ3WkdGMFpWTmxkSFJwYm1kektISmxkQ2s3Q2dsOUlHVnNjMlVnZXdvSkNYWmhjaUJrWldKMVp5QTlJSEJzWVhsbGNpNW5aWFJFWldKMVp5Z3BPd29KQ1dsbUtHUmxZblZuSUNFOUlHNTFiR3dnSmlZZ1VtVm1iR1ZqZEM1bWFXVnNaQ2hrWldKMVp5d2ljMlYwVEc5blRHVjJaV3dpS1NBaFBTQnVkV3hzS1NCN0Nna0pDV1JsWW5WbkxuTmxkRXh2WjB4bGRtVnNLQ2s3Q2drSmZRb0pmUW9KY0d4aGVXVnlMbWx1YVhScFlXeHBlbVVvS1RzS0NYUnllU0I3Q2drSmRtRnlJSFpwWkdWdlgyVnNaVzFsYm5RZ1BTQmtiMk4xYldWdWRDNW5aWFJGYkdWdFpXNTBRbmxKWkNnaWRtbGtaVzhpS1RzS0NRbDJZWElnY0d4aGVXVnlNU0E5SUhCc1lYbGxjanNLQ1FsMllYSWdkRzF3SUQwZ2RtbGtaVzlmWld4bGJXVnVkQzVvWVhOQmRIUnlhV0oxZEdVb0ltRjFkRzl3YkdGNUlpazdDZ2tKY0d4aGVXVnlNUzV6WlhSQmRYUnZVR3hoZVNoMGJYQXBPd29KQ1hCc1lYbGxjaTVoZEhSaFkyaFdhV1YzS0hacFpHVnZYMlZzWlcxbGJuUXBPd29KQ1haaGNpQndiR0Y1WlhJeElEMGdjR3hoZVdWeU93b0pDWFpoY2lCMGJYQWdQU0JCY21kaGJpNWhjbWR6SUNFOUlHNTFiR3dnSmlZZ1QySnFaV04wTG5CeWIzUnZkSGx3WlM1b1lYTlBkMjVRY205d1pYSjBlUzVqWVd4c0tFRnlaMkZ1TG1GeVozTXVhQ3dpWkhKdFgzTmxjblpsY2w5M2FXUmxkbWx1WlNJcElEOGdRWEpuWVc0dVlYSm5jeTVvV3lKa2NtMWZjMlZ5ZG1WeVgzZHBaR1YyYVc1bElsMGdPaUFpYUhSMGNITTZMeTkzYVdSbGRtbHVaUzF3Y205NGVTNWhjSEJ6Y0c5MExtTnZiUzl3Y205NGVTSTdDZ2tKZG1GeUlIUnRjREVnUFNCQmNtZGhiaTVoY21keklDRTlJRzUxYkd3Z0ppWWdUMkpxWldOMExuQnliM1J2ZEhsd1pTNW9ZWE5QZDI1UWNtOXdaWEowZVM1allXeHNLRUZ5WjJGdUxtRnlaM011YUN3aVpISnRYM05sY25abGNsOXdiR0Y1Y21WaFpIa2lLVHNLQ1Fsd2JHRjVaWEl4TG5ObGRGQnliM1JsWTNScGIyNUVZWFJoS0hzZ0ltTnZiUzUzYVdSbGRtbHVaUzVoYkhCb1lTSWdPaUI3SUNKelpYSjJaWEpWVWt3aUlEb2dkRzF3ZlN3Z0ltTnZiUzV0YVdOeWIzTnZablF1Y0d4aGVYSmxZV1I1SWlBNklIc2dJbk5sY25abGNsVlNUQ0lnT2lCMGJYQXhJRDhnUVhKbllXNHVZWEpuY3k1b1d5SmtjbTFmYzJWeWRtVnlYM0JzWVhseVpXRmtlU0pkSURvZ0ltaDBkSEJ6T2k4dmNHeGhlWEpsWVdSNUxtUnBjbVZqZEhSaGNITXVibVYwTDNCeUwzTjJZeTl5YVdkb2RITnRZVzVoWjJWeUxtRnpiWGcvVUd4aGVWSnBaMmgwUFRFbVZYTmxVMmx0Y0d4bFRtOXVVR1Z5YzJsemRHVnVkRXhwWTJWdWMyVTlNU1pRYkdGNVJXNWhZbXhsY25NOU56ZzJOakkzUkRndFF6SkJOaTAwTkVKRkxUaEdPRGd0TURoQlJUSTFOVUl3TVVFM0luMTlLVHNLQ1FsMllYSWdjR3hoZVdWeU1TQTlJSEJzWVhsbGNqc0tDUWwyWVhJZ2RHMXdJRDBnWkc5amRXMWxiblF1WjJWMFJXeGxiV1Z1ZEVKNVNXUW9JblIwYld3aUtUc0tDUWx3YkdGNVpYSXhMbUYwZEdGamFGUlVUVXhTWlc1a1pYSnBibWRFYVhZb2RHMXdLVHNLQ1gwZ1kyRjBZMmdvSUY5bklDa2dld29KQ1haaGNpQmxJRDBnYUdGNFpWOUZlR05sY0hScGIyNHVZMkYxWjJoMEtGOW5LUzUxYm5keVlYQW9LVHNLQ1Fra1oyeHZZbUZzTG1OdmJuTnZiR1V1Ykc5bktDSkZjbkp2Y2lCelpYUjBhVzVuSUdKaGMybGpJRzl3ZEdsdmJuTTZJaXhsS1RzS0NYMEtDWFJ5ZVNCN0Nna0pkbUZ5SUdwMWJYQkhZWEJ6T3dvSkNXbG1LRUZ5WjJGdUxtRnlaM01nSVQwZ2JuVnNiQ0FtSmlCUFltcGxZM1F1Y0hKdmRHOTBlWEJsTG1oaGMwOTNibEJ5YjNCbGNuUjVMbU5oYkd3b1FYSm5ZVzR1WVhKbmN5NW9MQ0p6WlhSS2RXMXdSMkZ3Y3lJcEtTQjdDZ2tKQ1haaGNpQmZJRDBnUVhKbllXNHVZWEpuY3k1b1d5SnpaWFJLZFcxd1IyRndjeUpkT3dvSkNRbHFkVzF3UjJGd2N5QTlJSFI1Y0dWdlppaGZLU0E5UFNBaVltOXZiR1ZoYmlJZ1B5QmZJRG9nWHlBaFBTQWlabUZzYzJVaU93b0pDWDBnWld4elpTQjdDZ2tKQ1dwMWJYQkhZWEJ6SUQwZ2RISjFaVHNLQ1FsOUNna0phV1lvUkdGemFFcHpMbll6S1NCN0Nna0pDWFpoY2lCd2JHRjVaWEl4SUQwZ2NHeGhlV1Z5T3dvSkNRbDJZWElnY21WMElEMGdleUI5T3dvSkNRbDJZWElnY0dGMGFDQTlJQ0p6ZEhKbFlXMXBibWN1YW5WdGNFZGhjSE1pTG5Od2JHbDBLQ0l1SWlrN0Nna0pDWEpsZEZ0d1lYUm9MbkJ2Y0NncFhTQTlJR3AxYlhCSFlYQnpPd29KQ1FsM2FHbHNaU2h3WVhSb0xteGxibWQwYUNBK0lEQXBJSHNLQ1FrSkNYWmhjaUJ3WVhKbGJuUWdQU0I3SUgwN0Nna0pDUWx3WVhKbGJuUmJjR0YwYUM1d2IzQW9LVjBnUFNCeVpYUTdDZ2tKQ1FseVpYUWdQU0J3WVhKbGJuUTdDZ2tKQ1gwS0NRa0pjR3hoZVdWeU1TNTFjR1JoZEdWVFpYUjBhVzVuY3loeVpYUXBPd29KQ1gwZ1pXeHpaU0JwWmlnaFJHRnphRXB6TG5ZMEtTQjdDZ2tKQ1hCc1lYbGxjaTV6WlhSS2RXMXdSMkZ3Y3locWRXMXdSMkZ3Y3lrN0Nna0pmUW9KQ1haaGNpQnNiM2RNWVhSbGJtTjVSVzVoWW14bFpEc0tDUWxwWmloQmNtZGhiaTVoY21keklDRTlJRzUxYkd3Z0ppWWdUMkpxWldOMExuQnliM1J2ZEhsd1pTNW9ZWE5QZDI1UWNtOXdaWEowZVM1allXeHNLRUZ5WjJGdUxtRnlaM011YUN3aWMyVjBURzkzVEdGMFpXNWplVVZ1WVdKc1pXUWlLU2tnZXdvSkNRbDJZWElnWHlBOUlFRnlaMkZ1TG1GeVozTXVhRnNpYzJWMFRHOTNUR0YwWlc1amVVVnVZV0pzWldRaVhUc0tDUWtKYkc5M1RHRjBaVzVqZVVWdVlXSnNaV1FnUFNCMGVYQmxiMllvWHlrZ1BUMGdJbUp2YjJ4bFlXNGlJRDhnWHlBNklGOGdJVDBnSW1aaGJITmxJanNLQ1FsOUlHVnNjMlVnZXdvSkNRbHNiM2RNWVhSbGJtTjVSVzVoWW14bFpDQTlJR1poYkhObE93b0pDWDBLQ1FscFppaEVZWE5vU25NdWRqTXBJSHNLQ1FrSmRtRnlJSEJzWVhsbGNqRWdQU0J3YkdGNVpYSTdDZ2tKQ1haaGNpQnlaWFFnUFNCN0lIMDdDZ2tKQ1haaGNpQndZWFJvSUQwZ0luTjBjbVZoYldsdVp5NXNiM2RNWVhSbGJtTjVSVzVoWW14bFpDSXVjM0JzYVhRb0lpNGlLVHNLQ1FrSmNtVjBXM0JoZEdndWNHOXdLQ2xkSUQwZ2JHOTNUR0YwWlc1amVVVnVZV0pzWldRN0Nna0pDWGRvYVd4bEtIQmhkR2d1YkdWdVozUm9JRDRnTUNrZ2V3b0pDUWtKZG1GeUlIQmhjbVZ1ZENBOUlIc2dmVHNLQ1FrSkNYQmhjbVZ1ZEZ0d1lYUm9MbkJ2Y0NncFhTQTlJSEpsZERzS0NRa0pDWEpsZENBOUlIQmhjbVZ1ZERzS0NRa0pmUW9KQ1Fsd2JHRjVaWEl4TG5Wd1pHRjBaVk5sZEhScGJtZHpLSEpsZENrN0Nna0pmU0JsYkhObElHbG1LQ0ZFWVhOb1NuTXVkalFwSUhzS0NRa0pjR3hoZVdWeUxuTmxkRXh2ZDB4aGRHVnVZM2xGYm1GaWJHVmtLR3h2ZDB4aGRHVnVZM2xGYm1GaWJHVmtLVHNLQ1FsOUNna0phV1lvUVhKbllXNHVZWEpuY3lBaFBTQnVkV3hzSUNZbUlFOWlhbVZqZEM1d2NtOTBiM1I1Y0dVdWFHRnpUM2R1VUhKdmNHVnlkSGt1WTJGc2JDaEJjbWRoYmk1aGNtZHpMbWdzSW5ObGRFeHBkbVZFWld4aGVTSXBLU0I3Q2drSkNYWmhjaUJzYVhabFJHVnNZWGtnUFNCQmNtZGhiaTVoY21keklDRTlJRzUxYkd3Z0ppWWdUMkpxWldOMExuQnliM1J2ZEhsd1pTNW9ZWE5QZDI1UWNtOXdaWEowZVM1allXeHNLRUZ5WjJGdUxtRnlaM011YUN3aWMyVjBUR2wyWlVSbGJHRjVJaWtnUHlCd1lYSnpaVVpzYjJGMEtFRnlaMkZ1TG1GeVozTXVhRnNpYzJWMFRHbDJaVVJsYkdGNUlsMHBJRG9nTVRBdU1Ec0tDUWtKYVdZb1JHRnphRXB6TG5ZektTQjdDZ2tKQ1FsMllYSWdjR3hoZVdWeU1TQTlJSEJzWVhsbGNqc0tDUWtKQ1haaGNpQnlaWFFnUFNCN0lIMDdDZ2tKQ1FsMllYSWdjR0YwYUNBOUlDSnpkSEpsWVcxcGJtY3ViR2wyWlVSbGJHRjVJaTV6Y0d4cGRDZ2lMaUlwT3dvSkNRa0pjbVYwVzNCaGRHZ3VjRzl3S0NsZElEMGdiR2wyWlVSbGJHRjVPd29KQ1FrSmQyaHBiR1VvY0dGMGFDNXNaVzVuZEdnZ1BpQXdLU0I3Q2drSkNRa0pkbUZ5SUhCaGNtVnVkQ0E5SUhzZ2ZUc0tDUWtKQ1Fsd1lYSmxiblJiY0dGMGFDNXdiM0FvS1YwZ1BTQnlaWFE3Q2drSkNRa0pjbVYwSUQwZ2NHRnlaVzUwT3dvSkNRa0pmUW9KQ1FrSmNHeGhlV1Z5TVM1MWNHUmhkR1ZUWlhSMGFXNW5jeWh5WlhRcE93b0pDUWw5SUdWc2MyVWdld29KQ1FrSmRtRnlJSEJzWVhsbGNqRWdQU0J3YkdGNVpYSTdDZ2tKQ1FsMllYSWdkRzF3SUQwZ1FYSm5ZVzR1WVhKbmN5QWhQU0J1ZFd4c0lDWW1JRTlpYW1WamRDNXdjbTkwYjNSNWNHVXVhR0Z6VDNkdVVISnZjR1Z5ZEhrdVkyRnNiQ2hCY21kaGJpNWhjbWR6TG1nc0luTmxkRXhwZG1WRVpXeGhlU0lwSUQ4Z2NHRnljMlZHYkc5aGRDaEJjbWRoYmk1aGNtZHpMbWhiSW5ObGRFeHBkbVZFWld4aGVTSmRLU0E2SURFd0xqQTdDZ2tKQ1Fsd2JHRjVaWEl4TG5ObGRFeHBkbVZFWld4aGVTaDBiWEFwT3dvSkNRbDlDZ2tKZlFvSkNXbG1LRUZ5WjJGdUxtRnlaM01nSVQwZ2JuVnNiQ0FtSmlCUFltcGxZM1F1Y0hKdmRHOTBlWEJsTG1oaGMwOTNibEJ5YjNCbGNuUjVMbU5oYkd3b1FYSm5ZVzR1WVhKbmN5NW9MQ0p6WlhSQlFsSlRkSEpoZEdWbmVTSXBLU0I3Q2drSkNYWmhjaUJCUWxKVGRISmhkR1ZuZVNBOUlFRnlaMkZ1TG1GeVozTWdJVDBnYm5Wc2JDQW1KaUJQWW1wbFkzUXVjSEp2ZEc5MGVYQmxMbWhoYzA5M2JsQnliM0JsY25SNUxtTmhiR3dvUVhKbllXNHVZWEpuY3k1b0xDSnpaWFJCUWxKVGRISmhkR1ZuZVNJcElEOGdRWEpuWVc0dVlYSm5jeTVvV3lKelpYUkJRbEpUZEhKaGRHVm5lU0pkSURvZ0ltRmlja1I1Ym1GdGFXTWlPd29KQ1FscFppaEVZWE5vU25NdWRqTXBJSHNLQ1FrSkNYWmhjaUJ3YkdGNVpYSXhJRDBnY0d4aGVXVnlPd29KQ1FrSmRtRnlJSEpsZENBOUlIc2dmVHNLQ1FrSkNYWmhjaUJ3WVhSb0lEMGdJbk4wY21WaGJXbHVaeTVoWW5JdVFVSlNVM1J5WVhSbFoza2lMbk53YkdsMEtDSXVJaWs3Q2drSkNRbHlaWFJiY0dGMGFDNXdiM0FvS1YwZ1BTQkJRbEpUZEhKaGRHVm5lVHNLQ1FrSkNYZG9hV3hsS0hCaGRHZ3ViR1Z1WjNSb0lENGdNQ2tnZXdvSkNRa0pDWFpoY2lCd1lYSmxiblFnUFNCN0lIMDdDZ2tKQ1FrSmNHRnlaVzUwVzNCaGRHZ3VjRzl3S0NsZElEMGdjbVYwT3dvSkNRa0pDWEpsZENBOUlIQmhjbVZ1ZERzS0NRa0pDWDBLQ1FrSkNYQnNZWGxsY2pFdWRYQmtZWFJsVTJWMGRHbHVaM01vY21WMEtUc0tDUWtKZlNCbGJITmxJSHNLQ1FrSkNYQnNZWGxsY2k1elpYUkJRbEpUZEhKaGRHVm5lU2hCUWxKVGRISmhkR1ZuZVNrN0Nna0pDWDBLQ1FsOUNnbDlJR05oZEdOb0tDQmZaeUFwSUhzS0NRbDJZWElnWlNBOUlHaGhlR1ZmUlhoalpYQjBhVzl1TG1OaGRXZG9kQ2hmWnlrdWRXNTNjbUZ3S0NrN0Nna0pKR2RzYjJKaGJDNWpiMjV6YjJ4bExteHZaeWdpUlhKeWIzSWdjMlYwZEdsdVp5QmhaSFpoYm1ObFpDQnZjSFJwYjI1ek9pSXNaU2s3Q2dsOUNnbDJZWElnYjI1VGRISmxZVzFKYm1sMGFXRnNhWHBsWkNBOUlHWjFibU4wYVc5dUtHVXBJSHNLQ1FscFppaEVZWE5vU25NdWRqTWdKaVlnSVVSaGMyaEtjeTUyTkNrZ2V3b0pDUWwyWVhJZ2NHeGhlV1Z5TVNBOUlIQnNZWGxsY2pzS0NRa0pkbUZ5SUhKbGRDQTlJSHNnZlRzS0NRa0pkbUZ5SUhCaGRHZ2dQU0FpYzNSeVpXRnRhVzVuTG5SeVlXTnJVM2RwZEdOb1RXOWtaUzUyYVdSbGJ5SXVjM0JzYVhRb0lpNGlLVHNLQ1FrSmNtVjBXM0JoZEdndWNHOXdLQ2xkSUQwZ0ltRnNkMkY1YzFKbGNHeGhZMlVpT3dvSkNRbDNhR2xzWlNod1lYUm9MbXhsYm1kMGFDQStJREFwSUhzS0NRa0pDWFpoY2lCd1lYSmxiblFnUFNCN0lIMDdDZ2tKQ1Fsd1lYSmxiblJiY0dGMGFDNXdiM0FvS1YwZ1BTQnlaWFE3Q2drSkNRbHlaWFFnUFNCd1lYSmxiblE3Q2drSkNYMEtDUWtKY0d4aGVXVnlNUzUxY0dSaGRHVlRaWFIwYVc1bmN5aHlaWFFwT3dvSkNRbDJZWElnY0d4aGVXVnlNU0E5SUhCc1lYbGxjanNLQ1FrSmRtRnlJSEpsZENBOUlIc2dmVHNLQ1FrSmRtRnlJSEJoZEdnZ1BTQWljM1J5WldGdGFXNW5MblJ5WVdOclUzZHBkR05vVFc5a1pTNWhkV1JwYnlJdWMzQnNhWFFvSWk0aUtUc0tDUWtKY21WMFczQmhkR2d1Y0c5d0tDbGRJRDBnSW1Gc2QyRjVjMUpsY0d4aFkyVWlPd29KQ1FsM2FHbHNaU2h3WVhSb0xteGxibWQwYUNBK0lEQXBJSHNLQ1FrSkNYWmhjaUJ3WVhKbGJuUWdQU0I3SUgwN0Nna0pDUWx3WVhKbGJuUmJjR0YwYUM1d2IzQW9LVjBnUFNCeVpYUTdDZ2tKQ1FseVpYUWdQU0J3WVhKbGJuUTdDZ2tKQ1gwS0NRa0pjR3hoZVdWeU1TNTFjR1JoZEdWVFpYUjBhVzVuY3loeVpYUXBPd29KQ1gwS0NRbHBaaWhFWVhOb1NuTXVkak1wSUhzS0NRa0pjR3hoZVdWeUxuTmxkRlJ5WVdOclUzZHBkR05vVFc5a1pVWnZjaWdpZG1sa1pXOGlMQ0poYkhkaGVYTlNaWEJzWVdObElpazdDZ2tKQ1hCc1lYbGxjaTV6WlhSVWNtRmphMU4zYVhSamFFMXZaR1ZHYjNJb0ltRjFaR2x2SWl3aVlXeDNZWGx6VW1Wd2JHRmpaU0lwT3dvSkNYMEtDUWwyWVhJZ1ptRnpkRk4zYVhSamFEc0tDUWxwWmloQmNtZGhiaTVoY21keklDRTlJRzUxYkd3Z0ppWWdUMkpxWldOMExuQnliM1J2ZEhsd1pTNW9ZWE5QZDI1UWNtOXdaWEowZVM1allXeHNLRUZ5WjJGdUxtRnlaM011YUN3aWMyVjBSbUZ6ZEZOM2FYUmphRVZ1WVdKc1pXUWlLU2tnZXdvSkNRbDJZWElnWHlBOUlFRnlaMkZ1TG1GeVozTXVhRnNpYzJWMFJtRnpkRk4zYVhSamFFVnVZV0pzWldRaVhUc0tDUWtKWm1GemRGTjNhWFJqYUNBOUlIUjVjR1Z2WmloZktTQTlQU0FpWW05dmJHVmhiaUlnUHlCZklEb2dYeUFoUFNBaVptRnNjMlVpT3dvSkNYMGdaV3h6WlNCN0Nna0pDV1poYzNSVGQybDBZMmdnUFNCMGNuVmxPd29KQ1gwS0NRbHBaaWhFWVhOb1NuTXVkak1wSUhzS0NRa0pjR3hoZVdWeUxuVndaR0YwWlZObGRIUnBibWR6S0hzZ2MzUnlaV0Z0YVc1bklEb2dleUJtWVhOMFUzZHBkR05vUlc1aFlteGxaQ0E2SUdaaGMzUlRkMmwwWTJoOWZTazdDZ2tKZlNCbGJITmxJR2xtS0NGRVlYTm9Tbk11ZGpRcElIc0tDUWtKY0d4aGVXVnlMbk5sZEVaaGMzUlRkMmwwWTJoRmJtRmliR1ZrS0daaGMzUlRkMmwwWTJncE93b0pDWDBLQ1FsamJHVmhjazFsYm5Vb0tUc0tDUWwyWVhJZ2FHRnVaR3hsUW1sMGNtRjBaVk4zYVhSamFDQTlJR1oxYm1OMGFXOXVLR1VwSUhzS0NRa0pkbUZ5SUdsdVptOGdQU0JsTG5SaGNtZGxkQzV6Wld4bFkzUmxaRTl3ZEdsdmJuTmJNRjB1YVc1bWJ6c0tDUWtKYVdZb2JuVnNiQ0FoUFNCcGJtWnZMbTFsWkdsaFZIbHdaU2tnZXdvSkNRa0phV1lvUkdGemFFcHpMbll6S1NCN0Nna0pDUWtKZG1GeUlIQnNZWGxsY2pFZ1BTQndiR0Y1WlhJN0Nna0pDUWtKZG1GeUlISmxkQ0E5SUhzZ2ZUc0tDUWtKQ1FsMllYSWdjR0YwYUNBOUlDZ2ljM1J5WldGdGFXNW5MbUZpY2k1aGRYUnZVM2RwZEdOb1FtbDBjbUYwWlM0aUlDc2dVM1JrTG5OMGNtbHVaeWhwYm1adkxtMWxaR2xoVkhsd1pTa3BMbk53YkdsMEtDSXVJaWs3Q2drSkNRa0pjbVYwVzNCaGRHZ3VjRzl3S0NsZElEMGdabUZzYzJVN0Nna0pDUWtKZDJocGJHVW9jR0YwYUM1c1pXNW5kR2dnUGlBd0tTQjdDZ2tKQ1FrSkNYWmhjaUJ3WVhKbGJuUWdQU0I3SUgwN0Nna0pDUWtKQ1hCaGNtVnVkRnR3WVhSb0xuQnZjQ2dwWFNBOUlISmxkRHNLQ1FrSkNRa0pjbVYwSUQwZ2NHRnlaVzUwT3dvSkNRa0pDWDBLQ1FrSkNRbHdiR0Y1WlhJeExuVndaR0YwWlZObGRIUnBibWR6S0hKbGRDazdDZ2tKQ1FsOUlHVnNjMlVnYVdZb2NHeGhlV1Z5TG1kbGRFRjFkRzlUZDJsMFkyaFJkV0ZzYVhSNVJtOXlLR2x1Wm04dWJXVmthV0ZVZVhCbEtTa2dld29KQ1FrSkNYQnNZWGxsY2k1elpYUkJkWFJ2VTNkcGRHTm9VWFZoYkdsMGVVWnZjaWhwYm1adkxtMWxaR2xoVkhsd1pTeG1ZV3h6WlNrN0Nna0pDUWw5Q2drSkNRbHdiR0Y1WlhJdWMyVjBVWFZoYkdsMGVVWnZjaWhwYm1adkxtMWxaR2xoVkhsd1pTeGxMblJoY21kbGRDNXpaV3hsWTNSbFpFbHVaR1Y0SUMwZ01TazdDZ2tKQ1gwZ1pXeHpaU0I3Q2drSkNRbHdiR0Y1WlhJdWMyVjBRWFYwYjFOM2FYUmphRkYxWVd4cGRIbEdiM0lvYVc1bWJ5eDBjblZsS1RzS0NRa0pmUW9KQ1gwN0Nna0pkbUZ5SUdoaGJtUnNaVlJ5WVdOclUzZHBkR05vSUQwZ1puVnVZM1JwYjI0b1pTa2dld29KQ1Fsd2JHRjVaWEl1YzJWMFEzVnljbVZ1ZEZSeVlXTnJLR1V1ZEdGeVoyVjBMbk5sYkdWamRHVmtUM0IwYVc5dWMxc3dYUzVwYm1adktUc0tDUWw5T3dvSkNYWmhjaUJoZFdScGIwMWxiblVnUFNCYmV5QjBhWFJzWlNBNklDSkJkWFJ2SUhOM2FYUmphQ0lzSUdsdVptOGdPaUFpWVhWa2FXOGlmVjA3Q2drSmRtRnlJRUYxWkdsdlFtbDBjbUYwWlVsdVptOU1hWE4wSUQwZ2NHeGhlV1Z5TG1kbGRFSnBkSEpoZEdWSmJtWnZUR2x6ZEVadmNpZ2lZWFZrYVc4aUtUc0tDUWxwWmloQmRXUnBiMEpwZEhKaGRHVkpibVp2VEdsemRDQWhQU0J1ZFd4c0tTQjdDZ2tKQ1haaGNpQmZaeUE5SURBN0Nna0pDWGRvYVd4bEtGOW5JRHdnUVhWa2FXOUNhWFJ5WVhSbFNXNW1iMHhwYzNRdWJHVnVaM1JvS1NCN0Nna0pDUWwyWVhJZ2FXNW1ieUE5SUVGMVpHbHZRbWwwY21GMFpVbHVabTlNYVhOMFcxOW5YVHNLQ1FrSkNTc3JYMmM3Q2drSkNRbGhkV1JwYjAxbGJuVXVjSFZ6YUNoN0lIUnBkR3hsSURvZ0lpSWdLeUJOWVhSb0xtWnNiMjl5S0dsdVptOHVZbWwwY21GMFpTQXZJREV3TURBcElDc2dJaUJyWW5Ceklpd2dhVzVtYnlBNklHbHVabTk5S1RzS0NRa0pmUW9KQ1FsaFpHUk5aVzUxS0NKQmRXUnBieUJpYVhSeVlYUmxjeUlzWVhWa2FXOU5aVzUxTEdoaGJtUnNaVUpwZEhKaGRHVlRkMmwwWTJncE93b0pDWDBLQ1FsMllYSWdkbWxrWlc5TlpXNTFJRDBnVzNzZ2RHbDBiR1VnT2lBaVFYVjBieUJ6ZDJsMFkyZ2lMQ0JwYm1adklEb2dJblpwWkdWdkluMWRPd29KQ1haaGNpQldhV1JsYjBKcGRISmhkR1ZKYm1adlRHbHpkQ0E5SUhCc1lYbGxjaTVuWlhSQ2FYUnlZWFJsU1c1bWIweHBjM1JHYjNJb0luWnBaR1Z2SWlrN0Nna0phV1lvVm1sa1pXOUNhWFJ5WVhSbFNXNW1iMHhwYzNRZ0lUMGdiblZzYkNrZ2V3b0pDUWwyWVhJZ1gyY2dQU0F3T3dvSkNRbDNhR2xzWlNoZlp5QThJRlpwWkdWdlFtbDBjbUYwWlVsdVptOU1hWE4wTG14bGJtZDBhQ2tnZXdvSkNRa0pkbUZ5SUdsdVptOGdQU0JXYVdSbGIwSnBkSEpoZEdWSmJtWnZUR2x6ZEZ0ZloxMDdDZ2tKQ1FrcksxOW5Pd29KQ1FrSmRtbGtaVzlOWlc1MUxuQjFjMmdvZXlCMGFYUnNaU0E2SUNJaUlDc2dUV0YwYUM1bWJHOXZjaWhwYm1adkxtSnBkSEpoZEdVZ0x5QXhNREF3S1NBcklDSWdhMkp3Y3lJc0lHbHVabThnT2lCcGJtWnZmU2s3Q2drSkNYMEtDUWtKWVdSa1RXVnVkU2dpVm1sa1pXOGdZbWwwY21GMFpYTWlMSFpwWkdWdlRXVnVkU3hvWVc1a2JHVkNhWFJ5WVhSbFUzZHBkR05vS1RzS0NRbDlDZ2tKZG1GeUlHRjFaR2x2VkhKaFkydHpJRDBnVzEwN0Nna0pkbUZ5SUVGMVpHbHZWSEpoWTJ0SmJtWnZUR2x6ZENBOUlIQnNZWGxsY2k1blpYUlVjbUZqYTNOR2IzSW9JbUYxWkdsdklpazdDZ2tKYVdZb1FYVmthVzlVY21GamEwbHVabTlNYVhOMExteGxibWQwYUNBK0lERXBJSHNLQ1FrSmRtRnlJRjluSUQwZ01Ec0tDUWtKZDJocGJHVW9YMmNnUENCQmRXUnBiMVJ5WVdOclNXNW1iMHhwYzNRdWJHVnVaM1JvS1NCN0Nna0pDUWwyWVhJZ2FXNW1ieUE5SUVGMVpHbHZWSEpoWTJ0SmJtWnZUR2x6ZEZ0ZloxMDdDZ2tKQ1FrcksxOW5Pd29KQ1FrSllYVmthVzlVY21GamEzTXVjSFZ6YUNoN0lIUnBkR3hsSURvZ0lpSWdLeUJUZEdRdWMzUnlhVzVuS0dsdVptOHVkSGx3WlNrZ0t5QWlPaUlnS3lCVGRHUXVjM1J5YVc1bktHbHVabTh1YkdGdVp5a3NJR2x1Wm04Z09pQnBibVp2ZlNrN0Nna0pDWDBLQ1FrSllXUmtUV1Z1ZFNnaVFYVmthVzhnZEhKaFkydHpJaXhoZFdScGIxUnlZV05yY3l4b1lXNWtiR1ZVY21GamExTjNhWFJqYUN4d2JHRjVaWEl1WjJWMFEzVnljbVZ1ZEZSeVlXTnJSbTl5S0NKaGRXUnBieUlwTG1sdVpHVjRLVHNLQ1FsOUNna0pkbUZ5SUhacFpHVnZWSEpoWTJ0eklEMGdXMTA3Q2drSmRtRnlJRlpwWkdWdlZISmhZMnRKYm1adlRHbHpkQ0E5SUhCc1lYbGxjaTVuWlhSVWNtRmphM05HYjNJb0luWnBaR1Z2SWlrN0Nna0phV1lvVm1sa1pXOVVjbUZqYTBsdVptOU1hWE4wTG14bGJtZDBhQ0ErSURFcElIc0tDUWtKZG1GeUlGOW5JRDBnTURzS0NRa0pkMmhwYkdVb1gyY2dQQ0JXYVdSbGIxUnlZV05yU1c1bWIweHBjM1F1YkdWdVozUm9LU0I3Q2drSkNRbDJZWElnYVc1bWJ5QTlJRlpwWkdWdlZISmhZMnRKYm1adlRHbHpkRnRmWjEwN0Nna0pDUWtySzE5bk93b0pDUWtKZG1sa1pXOVVjbUZqYTNNdWNIVnphQ2g3SUhScGRHeGxJRG9nSWlJZ0t5QlRkR1F1YzNSeWFXNW5LR2x1Wm04dWRIbHdaU2tnS3lBaU9pSWdLeUJUZEdRdWMzUnlhVzVuS0dsdVptOHViR0Z1Wnlrc0lHbHVabThnT2lCcGJtWnZmU2s3Q2drSkNYMEtDUWtKWVdSa1RXVnVkU2dpVm1sa1pXOGdkSEpoWTJ0eklpeDJhV1JsYjFSeVlXTnJjeXhvWVc1a2JHVlVjbUZqYTFOM2FYUmphQ3h3YkdGNVpYSXVaMlYwUTNWeWNtVnVkRlJ5WVdOclJtOXlLQ0oyYVdSbGJ5SXBMbWx1WkdWNEtUc0tDUWw5Q2drSmFXWW9kR1Y0ZEZSeVlXTnJjeTVzWlc1bmRHZ2dQaUF3S1NCN0Nna0pDV0ZrWkUxbGJuVW9JbFJsZUhSMGNtRmphM01pTEhSbGVIUlVjbUZqYTNNc1puVnVZM1JwYjI0b1pTa2dld29KQ1FrSmNHeGhlV1Z5TG5ObGRGUmxlSFJVY21GamF5aGxMblJoY21kbGRDNXpaV3hsWTNSbFpFbHVaR1Y0S1RzS0NRa0pmU3h3YkdGNVpYSXVaMlYwUTNWeWNtVnVkRlJsZUhSVWNtRmphMGx1WkdWNEtDa3BPd29KQ1gwS0NYMDdDZ2wyWVhJZ2RHVjRkRlJ5WVdOcmN5QTlJRnRkT3dvSmRtRnlJRzl1VkhKaFkydHpRV1JrWldRZ1BTQm1kVzVqZEdsdmJpaGxLU0I3Q2drSmRHVjRkRlJ5WVdOcmN5QTlJRnRkT3dvSkNYWmhjaUJmWnlBOUlEQTdDZ2tKZG1GeUlGOW5NU0E5SUdVdWRISmhZMnR6TG14bGJtZDBhRHNLQ1FsM2FHbHNaU2hmWnlBOElGOW5NU2tnZXdvSkNRbDJZWElnYVNBOUlGOW5LeXM3Q2drSkNYWmhjaUJwYm1adklEMGdaUzUwY21GamEzTmJhVjA3Q2drSkNYWmhjaUJ6ZEhJZ1BTQWlJaUFySUdsdVptOHVhMmx1WkNBcklDSTZJaUFySUdsdVptOHViR0Z1WnpzS0NRa0pkbUZ5SUcxbGRHRWdQU0JiWFRzS0NRa0phV1lvYVc1bWJ5NXBjMFp5WVdkdFpXNTBaV1FwSUhzS0NRa0pDVzFsZEdFdWNIVnphQ2dpWm5KaFoyMWxiblJsWkNJcE93b0pDUWw5SUdWc2MyVWdld29KQ1FrSmJXVjBZUzV3ZFhOb0tDSnphV1JsWTJGeUlpazdDZ2tKQ1gwS0NRa0phV1lvYVc1bWJ5NXBjMFZ0WW1Wa1pHVmtLU0I3Q2drSkNRbHRaWFJoTG5CMWMyZ29JbVZ0WW1Wa1pHVmtJaWs3Q2drSkNYMEtDUWtKYVdZb2FXNW1ieTVwYzFSVVRVd3BJSHNLQ1FrSkNXMWxkR0V1Y0hWemFDZ2lkSFJ0YkNJcE93b0pDUWw5Q2drSkNXbG1LRzFsZEdFdWJHVnVaM1JvSUQ0Z01Da2dld29KQ1FrSmMzUnlJQ3M5SUNJZ1d5SWdLeUJ0WlhSaExtcHZhVzRvSWpvaUtTQXJJQ0pkSWpzS0NRa0pmUW9KQ1FsMFpYaDBWSEpoWTJ0ekxuQjFjMmdvZXlCMGFYUnNaU0E2SUhOMGNpd2dhVzVtYnlBNklHbHVabTk5S1RzS0NRbDlDZ2tKYVdZb2RHVjRkRlJ5WVdOcmN5NXNaVzVuZEdnZ1BpQXdLU0I3Q2drSkNYSmxiVzkyWlUxbGJuVW9JbFJsZUhSMGNtRmphM01pS1RzS0NRa0pZV1JrVFdWdWRTZ2lWR1Y0ZEhSeVlXTnJjeUlzZEdWNGRGUnlZV05yY3l4bWRXNWpkR2x2YmlobEtTQjdDZ2tKQ1Fsd2JHRjVaWEl1YzJWMFZHVjRkRlJ5WVdOcktHVXVkR0Z5WjJWMExuTmxiR1ZqZEdWa1NXNWtaWGdwT3dvSkNRbDlMSEJzWVhsbGNpNW5aWFJEZFhKeVpXNTBWR1Y0ZEZSeVlXTnJTVzVrWlhnb0tTazdDZ2tKZlFvSmZUc0tDWFpoY2lCd2JHRjVaWEl4SUQwZ2NHeGhlV1Z5T3dvSmRtRnlJSFJ0Y0NBOUlHUmhjMmhxY3k1TlpXUnBZVkJzWVhsbGNpNWxkbVZ1ZEhNdVZFVllWRjlVVWtGRFMxTmZRVVJFUlVRN0NnbDJZWElnZEcxd01TQTlJSFJvYVhNN0NnbHdiR0Y1WlhJeExtOXVLSFJ0Y0N4dmJsUnlZV05yYzBGa1pHVmtMSFJ0Y0RFcE93b0pkbUZ5SUhCc1lYbGxjakVnUFNCd2JHRjVaWEk3Q2dsMllYSWdkRzF3SUQwZ1pHRnphR3B6TGsxbFpHbGhVR3hoZVdWeUxtVjJaVzUwY3k1VFZGSkZRVTFmU1U1SlZFbEJURWxhUlVRN0NnbDJZWElnZEcxd01TQTlJSFJvYVhNN0NnbHdiR0Y1WlhJeExtOXVLSFJ0Y0N4dmJsTjBjbVZoYlVsdWFYUnBZV3hwZW1Wa0xIUnRjREVwT3dvSmNHeGhlV1Z5TG1GMGRHRmphRk52ZFhKalpTaDFjbWtwT3dwOU93cEVZWE5vU25NdVpYaHdiM05sWDNCc1lYbGxjaUE5SUdaMWJtTjBhVzl1S0hBcElIc0tDWGRwYm1SdmR5NXdiR0Y1WlhJZ1BTQndPd29KY21WMGRYSnVJSEE3Q24wN0NrUmhjMmhLY3k1alptY2dQU0JtZFc1amRHbHZiaWh6ZEhJc2RtRnNkV1VwSUhzS0NYWmhjaUJ5WlhRZ1BTQjdJSDA3Q2dsMllYSWdjR0YwYUNBOUlITjBjaTV6Y0d4cGRDZ2lMaUlwT3dvSmNtVjBXM0JoZEdndWNHOXdLQ2xkSUQwZ2RtRnNkV1U3Q2dsM2FHbHNaU2h3WVhSb0xteGxibWQwYUNBK0lEQXBJSHNLQ1FsMllYSWdjR0Z5Wlc1MElEMGdleUI5T3dvSkNYQmhjbVZ1ZEZ0d1lYUm9MbkJ2Y0NncFhTQTlJSEpsZERzS0NRbHlaWFFnUFNCd1lYSmxiblE3Q2dsOUNnbHlaWFIxY200Z2NtVjBPd3A5T3dwMllYSWdTSGhQZG1WeWNtbGtaWE1nUFNCbWRXNWpkR2x2YmlncElIc2dmVHNLSkdoNFEyeGhjM05sYzFzaVNIaFBkbVZ5Y21sa1pYTWlYU0E5SUVoNFQzWmxjbkpwWkdWek93cEllRTkyWlhKeWFXUmxjeTVmWDI1aGJXVmZYeUE5SUhSeWRXVTdDa2g0VDNabGNuSnBaR1Z6TG5OMGNrUmhkR1VnUFNCbWRXNWpkR2x2YmloektTQjdDZ2x6ZDJsMFkyZ29jeTVzWlc1bmRHZ3BJSHNLQ1dOaGMyVWdPRG9LQ1FsMllYSWdheUE5SUhNdWMzQnNhWFFvSWpvaUtUc0tDUWwyWVhJZ1pDQTlJRzVsZHlCRVlYUmxLQ2s3Q2drSlpGc2ljMlYwVkdsdFpTSmRLREFwT3dvSkNXUmJJbk5sZEZWVVEwaHZkWEp6SWwwb2Exc3dYU2s3Q2drSlpGc2ljMlYwVlZSRFRXbHVkWFJsY3lKZEtHdGJNVjBwT3dvSkNXUmJJbk5sZEZWVVExTmxZMjl1WkhNaVhTaHJXekpkS1RzS0NRbHlaWFIxY200Z1pEc0tDV05oYzJVZ01UQTZDZ2tKZG1GeUlHc2dQU0J6TG5Od2JHbDBLQ0l0SWlrN0Nna0pjbVYwZFhKdUlHNWxkeUJFWVhSbEtHdGJNRjBzYTFzeFhTQXRJREVzYTFzeVhTd3dMREFzTUNrN0NnbGpZWE5sSURFNU9nb0pDWFpoY2lCcklEMGdjeTV6Y0d4cGRDZ2lJQ0lwT3dvSkNYWmhjaUI1SUQwZ2Exc3dYUzV6Y0d4cGRDZ2lMU0lwT3dvSkNYWmhjaUIwSUQwZ2Exc3hYUzV6Y0d4cGRDZ2lPaUlwT3dvSkNYSmxkSFZ5YmlCdVpYY2dSR0YwWlNoNVd6QmRMSGxiTVYwZ0xTQXhMSGxiTWwwc2RGc3dYU3gwV3pGZExIUmJNbDBwT3dvSlpHVm1ZWFZzZERvS0NRbDBhSEp2ZHlCb1lYaGxYMFY0WTJWd2RHbHZiaTUwYUhKdmQyNG9Ja2x1ZG1Gc2FXUWdaR0YwWlNCbWIzSnRZWFFnT2lBaUlDc2djeWs3Q2dsOUNuMDdDa2g0VDNabGNuSnBaR1Z6TG1OallTQTlJR1oxYm1OMGFXOXVLSE1zYVc1a1pYZ3BJSHNLQ1haaGNpQjRJRDBnY3k1amFHRnlRMjlrWlVGMEtHbHVaR1Y0S1RzS0NXbG1LSGdnSVQwZ2VDa2dld29KQ1hKbGRIVnliaUIxYm1SbFptbHVaV1E3Q2dsOUNnbHlaWFIxY200Z2VEc0tmVHNLU0hoUGRtVnljbWxrWlhNdWMzVmljM1J5SUQwZ1puVnVZM1JwYjI0b2N5eHdiM01zYkdWdUtTQjdDZ2xwWmloc1pXNGdQVDBnYm5Wc2JDa2dld29KQ1d4bGJpQTlJSE11YkdWdVozUm9Pd29KZlNCbGJITmxJR2xtS0d4bGJpQThJREFwSUhzS0NRbHBaaWh3YjNNZ1BUMGdNQ2tnZXdvSkNRbHNaVzRnUFNCekxteGxibWQwYUNBcklHeGxianNLQ1FsOUlHVnNjMlVnZXdvSkNRbHlaWFIxY200Z0lpSTdDZ2tKZlFvSmZRb0pjbVYwZFhKdUlITXVjM1ZpYzNSeUtIQnZjeXhzWlc0cE93cDlPd3BJZUU5MlpYSnlhV1JsY3k1dWIzY2dQU0JtZFc1amRHbHZiaWdwSUhzS0NYSmxkSFZ5YmlCRVlYUmxMbTV2ZHlncE93cDlPd3BOWVhSb0xsOWZibUZ0WlY5ZklEMGdkSEoxWlRzS2RtRnlJRkpsWm14bFkzUWdQU0JtZFc1amRHbHZiaWdwSUhzZ2ZUc0tKR2g0UTJ4aGMzTmxjMXNpVW1WbWJHVmpkQ0pkSUQwZ1VtVm1iR1ZqZERzS1VtVm1iR1ZqZEM1ZlgyNWhiV1ZmWHlBOUlIUnlkV1U3Q2xKbFpteGxZM1F1Wm1sbGJHUWdQU0JtZFc1amRHbHZiaWh2TEdacFpXeGtLU0I3Q2dsMGNua2dld29KQ1hKbGRIVnliaUJ2VzJacFpXeGtYVHNLQ1gwZ1kyRjBZMmdvSUY5bklDa2dld29KQ1hKbGRIVnliaUJ1ZFd4c093b0pmUXA5T3dwU1pXWnNaV04wTG1acFpXeGtjeUE5SUdaMWJtTjBhVzl1S0c4cElIc0tDWFpoY2lCaElEMGdXMTA3Q2dscFppaHZJQ0U5SUc1MWJHd3BJSHNLQ1FsMllYSWdhR0Z6VDNkdVVISnZjR1Z5ZEhrZ1BTQlBZbXBsWTNRdWNISnZkRzkwZVhCbExtaGhjMDkzYmxCeWIzQmxjblI1T3dvSkNXWnZjaWdnZG1GeUlHWWdhVzRnYnlBcElIc0tDUWxwWmlobUlDRTlJQ0pmWDJsa1gxOGlJQ1ltSUdZZ0lUMGdJbWg0WDE5amJHOXpkWEpsYzE5ZklpQW1KaUJvWVhOUGQyNVFjbTl3WlhKMGVTNWpZV3hzS0c4c1ppa3BJSHNLQ1FrSllTNXdkWE5vS0dZcE93b0pDWDBLQ1FsOUNnbDlDZ2x5WlhSMWNtNGdZVHNLZlRzS1VtVm1iR1ZqZEM1cGMwWjFibU4wYVc5dUlEMGdablZ1WTNScGIyNG9aaWtnZXdvSmFXWW9kSGx3Wlc5bUtHWXBJRDA5SUNKbWRXNWpkR2x2YmlJcElIc0tDUWx5WlhSMWNtNGdJU2htTGw5ZmJtRnRaVjlmSUh4OElHWXVYMTlsYm1GdFpWOWZLVHNLQ1gwZ1pXeHpaU0I3Q2drSmNtVjBkWEp1SUdaaGJITmxPd29KZlFwOU93cDJZWElnVTNSa0lEMGdablZ1WTNScGIyNG9LU0I3SUgwN0NpUm9lRU5zWVhOelpYTmJJbE4wWkNKZElEMGdVM1JrT3dwVGRHUXVYMTl1WVcxbFgxOGdQU0IwY25WbE93cFRkR1F1YzNSeWFXNW5JRDBnWm5WdVkzUnBiMjRvY3lrZ2V3b0pjbVYwZFhKdUlHcHpYMEp2YjNRdVgxOXpkSEpwYm1kZmNtVmpLSE1zSWlJcE93cDlPd3BUZEdRdWNHRnljMlZKYm5RZ1BTQm1kVzVqZEdsdmJpaDRLU0I3Q2dscFppaDRJQ0U5SUc1MWJHd3BJSHNLQ1FsMllYSWdYMmNnUFNBd093b0pDWFpoY2lCZlp6RWdQU0I0TG14bGJtZDBhRHNLQ1FsM2FHbHNaU2hmWnlBOElGOW5NU2tnZXdvSkNRbDJZWElnYVNBOUlGOW5LeXM3Q2drSkNYWmhjaUJqSUQwZ2VDNWphR0Z5UTI5a1pVRjBLR2twT3dvSkNRbHBaaWhqSUR3OUlEZ2dmSHdnWXlBK1BTQXhOQ0FtSmlCaklDRTlJRE15SUNZbUlHTWdJVDBnTkRVcElIc0tDUWtKQ1haaGNpQnVZeUE5SUhndVkyaGhja052WkdWQmRDaHBJQ3NnTVNrN0Nna0pDUWwyWVhJZ2RpQTlJSEJoY25ObFNXNTBLSGdzYm1NZ1BUMGdNVEl3SUh4OElHNWpJRDA5SURnNElEOGdNVFlnT2lBeE1DazdDZ2tKQ1FscFppaHBjMDVoVGloMktTa2dld29KQ1FrSkNYSmxkSFZ5YmlCdWRXeHNPd29KQ1FrSmZTQmxiSE5sSUhzS0NRa0pDUWx5WlhSMWNtNGdkanNLQ1FrSkNYMEtDUWtKZlFvSkNYMEtDWDBLQ1hKbGRIVnliaUJ1ZFd4c093cDlPd3AyWVhJZ1UzUnlhVzVuVkc5dmJITWdQU0JtZFc1amRHbHZiaWdwSUhzZ2ZUc0tKR2g0UTJ4aGMzTmxjMXNpVTNSeWFXNW5WRzl2YkhNaVhTQTlJRk4wY21sdVoxUnZiMnh6T3dwVGRISnBibWRVYjI5c2N5NWZYMjVoYldWZlh5QTlJSFJ5ZFdVN0NsTjBjbWx1WjFSdmIyeHpMbk4wWVhKMGMxZHBkR2dnUFNCbWRXNWpkR2x2YmloekxITjBZWEowS1NCN0NnbHBaaWh6TG14bGJtZDBhQ0ErUFNCemRHRnlkQzVzWlc1bmRHZ3BJSHNLQ1FseVpYUjFjbTRnY3k1c1lYTjBTVzVrWlhoUFppaHpkR0Z5ZEN3d0tTQTlQU0F3T3dvSmZTQmxiSE5sSUhzS0NRbHlaWFIxY200Z1ptRnNjMlU3Q2dsOUNuMDdDblpoY2lCVWVYQmxJRDBnWm5WdVkzUnBiMjRvS1NCN0lIMDdDaVJvZUVOc1lYTnpaWE5iSWxSNWNHVWlYU0E5SUZSNWNHVTdDbFI1Y0dVdVgxOXVZVzFsWDE4Z1BTQjBjblZsT3dwVWVYQmxMbU55WldGMFpVVnVkVzBnUFNCbWRXNWpkR2x2YmlobExHTnZibk4wY2l4d1lYSmhiWE1wSUhzS0NYWmhjaUJtSUQwZ1VtVm1iR1ZqZEM1bWFXVnNaQ2hsTEdOdmJuTjBjaWs3Q2dscFppaG1JRDA5SUc1MWJHd3BJSHNLQ1FsMGFISnZkeUJvWVhobFgwVjRZMlZ3ZEdsdmJpNTBhSEp2ZDI0b0lrNXZJSE4xWTJnZ1kyOXVjM1J5ZFdOMGIzSWdJaUFySUdOdmJuTjBjaWs3Q2dsOUNnbHBaaWhTWldac1pXTjBMbWx6Um5WdVkzUnBiMjRvWmlrcElIc0tDUWxwWmlod1lYSmhiWE1nUFQwZ2JuVnNiQ2tnZXdvSkNRbDBhSEp2ZHlCb1lYaGxYMFY0WTJWd2RHbHZiaTUwYUhKdmQyNG9Ja052Ym5OMGNuVmpkRzl5SUNJZ0t5QmpiMjV6ZEhJZ0t5QWlJRzVsWldRZ2NHRnlZVzFsZEdWeWN5SXBPd29KQ1gwS0NRbHlaWFIxY200Z1ppNWhjSEJzZVNobExIQmhjbUZ0Y3lrN0NnbDlDZ2xwWmlod1lYSmhiWE1nSVQwZ2JuVnNiQ0FtSmlCd1lYSmhiWE11YkdWdVozUm9JQ0U5SURBcElIc0tDUWwwYUhKdmR5Qm9ZWGhsWDBWNFkyVndkR2x2Ymk1MGFISnZkMjRvSWtOdmJuTjBjblZqZEc5eUlDSWdLeUJqYjI1emRISWdLeUFpSUdSdlpYTWdibTkwSUc1bFpXUWdjR0Z5WVcxbGRHVnljeUlwT3dvSmZRb0pjbVYwZFhKdUlHWTdDbjA3Q25aaGNpQm9ZWGhsWDBsTllYQWdQU0JtZFc1amRHbHZiaWdwSUhzZ2ZUc0tKR2g0UTJ4aGMzTmxjMXNpYUdGNFpTNUpUV0Z3SWwwZ1BTQm9ZWGhsWDBsTllYQTdDbWhoZUdWZlNVMWhjQzVmWDI1aGJXVmZYeUE5SUhSeWRXVTdDblpoY2lCb1lYaGxYMFY0WTJWd2RHbHZiaUE5SUdaMWJtTjBhVzl1S0cxbGMzTmhaMlVzY0hKbGRtbHZkWE1zYm1GMGFYWmxLU0I3Q2dsRmNuSnZjaTVqWVd4c0tIUm9hWE1zYldWemMyRm5aU2s3Q2dsMGFHbHpMbTFsYzNOaFoyVWdQU0J0WlhOellXZGxPd29KZEdocGN5NWZYM0J5WlhacGIzVnpSWGhqWlhCMGFXOXVJRDBnY0hKbGRtbHZkWE03Q2dsMGFHbHpMbDlmYm1GMGFYWmxSWGhqWlhCMGFXOXVJRDBnYm1GMGFYWmxJQ0U5SUc1MWJHd2dQeUJ1WVhScGRtVWdPaUIwYUdsek93cDlPd29rYUhoRGJHRnpjMlZ6V3lKb1lYaGxMa1Y0WTJWd2RHbHZiaUpkSUQwZ2FHRjRaVjlGZUdObGNIUnBiMjQ3Q21oaGVHVmZSWGhqWlhCMGFXOXVMbDlmYm1GdFpWOWZJRDBnZEhKMVpUc0thR0Y0WlY5RmVHTmxjSFJwYjI0dVkyRjFaMmgwSUQwZ1puVnVZM1JwYjI0b2RtRnNkV1VwSUhzS0NXbG1LQ2dvZG1Gc2RXVXBJR2x1YzNSaGJtTmxiMllnYUdGNFpWOUZlR05sY0hScGIyNHBLU0I3Q2drSmNtVjBkWEp1SUhaaGJIVmxPd29KZlNCbGJITmxJR2xtS0Nnb2RtRnNkV1VwSUdsdWMzUmhibU5sYjJZZ1JYSnliM0lwS1NCN0Nna0pjbVYwZFhKdUlHNWxkeUJvWVhobFgwVjRZMlZ3ZEdsdmJpaDJZV3gxWlM1dFpYTnpZV2RsTEc1MWJHd3NkbUZzZFdVcE93b0pmU0JsYkhObElIc0tDUWx5WlhSMWNtNGdibVYzSUdoaGVHVmZWbUZzZFdWRmVHTmxjSFJwYjI0b2RtRnNkV1VzYm5Wc2JDeDJZV3gxWlNrN0NnbDlDbjA3Q21oaGVHVmZSWGhqWlhCMGFXOXVMblJvY205M2JpQTlJR1oxYm1OMGFXOXVLSFpoYkhWbEtTQjdDZ2xwWmlnb0tIWmhiSFZsS1NCcGJuTjBZVzVqWlc5bUlHaGhlR1ZmUlhoalpYQjBhVzl1S1NrZ2V3b0pDWEpsZEhWeWJpQjJZV3gxWlM1blpYUmZibUYwYVhabEtDazdDZ2w5SUdWc2MyVWdhV1lvS0NoMllXeDFaU2tnYVc1emRHRnVZMlZ2WmlCRmNuSnZjaWtwSUhzS0NRbHlaWFIxY200Z2RtRnNkV1U3Q2dsOUlHVnNjMlVnZXdvSkNYWmhjaUJsSUQwZ2JtVjNJR2hoZUdWZlZtRnNkV1ZGZUdObGNIUnBiMjRvZG1Gc2RXVXBPd29KQ1hKbGRIVnliaUJsT3dvSmZRcDlPd3BvWVhobFgwVjRZMlZ3ZEdsdmJpNWZYM04xY0dWeVgxOGdQU0JGY25KdmNqc0thR0Y0WlY5RmVHTmxjSFJwYjI0dWNISnZkRzkwZVhCbElEMGdKR1Y0ZEdWdVpDaEZjbkp2Y2k1d2NtOTBiM1I1Y0dVc2V3b0pkVzUzY21Gd09pQm1kVzVqZEdsdmJpZ3BJSHNLQ1FseVpYUjFjbTRnZEdocGN5NWZYMjVoZEdsMlpVVjRZMlZ3ZEdsdmJqc0tDWDBLQ1N4blpYUmZibUYwYVhabE9pQm1kVzVqZEdsdmJpZ3BJSHNLQ1FseVpYUjFjbTRnZEdocGN5NWZYMjVoZEdsMlpVVjRZMlZ3ZEdsdmJqc0tDWDBLZlNrN0NuWmhjaUJvWVhobFgxSmxjMjkxY21ObElEMGdablZ1WTNScGIyNG9LU0I3SUgwN0NpUm9lRU5zWVhOelpYTmJJbWhoZUdVdVVtVnpiM1Z5WTJVaVhTQTlJR2hoZUdWZlVtVnpiM1Z5WTJVN0NtaGhlR1ZmVW1WemIzVnlZMlV1WDE5dVlXMWxYMThnUFNCMGNuVmxPd3BvWVhobFgxSmxjMjkxY21ObExtZGxkRk4wY21sdVp5QTlJR1oxYm1OMGFXOXVLRzVoYldVcElIc0tDWFpoY2lCZlp5QTlJREE3Q2dsMllYSWdYMmN4SUQwZ2FHRjRaVjlTWlhOdmRYSmpaUzVqYjI1MFpXNTBPd29KZDJocGJHVW9YMmNnUENCZlp6RXViR1Z1WjNSb0tTQjdDZ2tKZG1GeUlIZ2dQU0JmWnpGYlgyZGRPd29KQ1NzclgyYzdDZ2tKYVdZb2VDNXVZVzFsSUQwOUlHNWhiV1VwSUhzS0NRa0phV1lvZUM1emRISWdJVDBnYm5Wc2JDa2dld29KQ1FrSmNtVjBkWEp1SUhndWMzUnlPd29KQ1FsOUNna0pDWFpoY2lCaUlEMGdhR0Y0WlY5amNubHdkRzlmUW1GelpUWTBMbVJsWTI5a1pTaDRMbVJoZEdFcE93b0pDUWx5WlhSMWNtNGdZaTUwYjFOMGNtbHVaeWdwT3dvSkNYMEtDWDBLQ1hKbGRIVnliaUJ1ZFd4c093cDlPd3AyWVhJZ2FHRjRaVjlmSkZWdWMyVnlhV0ZzYVhwbGNsOUVaV1poZFd4MFVtVnpiMngyWlhJZ1BTQm1kVzVqZEdsdmJpZ3BJSHNLZlRzS0pHaDRRMnhoYzNObGMxc2lhR0Y0WlM1ZlZXNXpaWEpwWVd4cGVtVnlMa1JsWm1GMWJIUlNaWE52YkhabGNpSmRJRDBnYUdGNFpWOWZKRlZ1YzJWeWFXRnNhWHBsY2w5RVpXWmhkV3gwVW1WemIyeDJaWEk3Q21oaGVHVmZYeVJWYm5ObGNtbGhiR2w2WlhKZlJHVm1ZWFZzZEZKbGMyOXNkbVZ5TGw5ZmJtRnRaVjlmSUQwZ2RISjFaVHNLYUdGNFpWOWZKRlZ1YzJWeWFXRnNhWHBsY2w5RVpXWmhkV3gwVW1WemIyeDJaWEl1Y0hKdmRHOTBlWEJsSUQwZ2V3b0pjbVZ6YjJ4MlpVTnNZWE56T2lCbWRXNWpkR2x2YmlodVlXMWxLU0I3Q2drSmNtVjBkWEp1SUNSb2VFTnNZWE56WlhOYmJtRnRaVjA3Q2dsOUNna3NjbVZ6YjJ4MlpVVnVkVzA2SUdaMWJtTjBhVzl1S0c1aGJXVXBJSHNLQ1FseVpYUjFjbTRnSkdoNFJXNTFiWE5iYm1GdFpWMDdDZ2w5Q24wN0NuWmhjaUJvWVhobFgxVnVjMlZ5YVdGc2FYcGxjaUE5SUdaMWJtTjBhVzl1S0dKMVppa2dld29KZEdocGN5NWlkV1lnUFNCaWRXWTdDZ2wwYUdsekxteGxibWQwYUNBOUlIUm9hWE11WW5WbUxteGxibWQwYURzS0NYUm9hWE11Y0c5eklEMGdNRHNLQ1hSb2FYTXVjMk5oWTJobElEMGdXMTA3Q2dsMGFHbHpMbU5oWTJobElEMGdXMTA3Q2dsMllYSWdjaUE5SUdoaGVHVmZWVzV6WlhKcFlXeHBlbVZ5TGtSRlJrRlZURlJmVWtWVFQweFdSVkk3Q2dscFppaHlJRDA5SUc1MWJHd3BJSHNLQ1FseUlEMGdibVYzSUdoaGVHVmZYeVJWYm5ObGNtbGhiR2w2WlhKZlJHVm1ZWFZzZEZKbGMyOXNkbVZ5S0NrN0Nna0phR0Y0WlY5VmJuTmxjbWxoYkdsNlpYSXVSRVZHUVZWTVZGOVNSVk5QVEZaRlVpQTlJSEk3Q2dsOUNnbDBhR2x6TG5KbGMyOXNkbVZ5SUQwZ2Nqc0tmVHNLSkdoNFEyeGhjM05sYzFzaWFHRjRaUzVWYm5ObGNtbGhiR2w2WlhJaVhTQTlJR2hoZUdWZlZXNXpaWEpwWVd4cGVtVnlPd3BvWVhobFgxVnVjMlZ5YVdGc2FYcGxjaTVmWDI1aGJXVmZYeUE5SUhSeWRXVTdDbWhoZUdWZlZXNXpaWEpwWVd4cGVtVnlMbWx1YVhSRGIyUmxjeUE5SUdaMWJtTjBhVzl1S0NrZ2V3b0pkbUZ5SUdOdlpHVnpJRDBnVzEwN0NnbDJZWElnWDJjZ1BTQXdPd29KZG1GeUlGOW5NU0E5SUdoaGVHVmZWVzV6WlhKcFlXeHBlbVZ5TGtKQlUwVTJOQzVzWlc1bmRHZzdDZ2wzYUdsc1pTaGZaeUE4SUY5bk1Ta2dld29KQ1haaGNpQnBJRDBnWDJjckt6c0tDUWxqYjJSbGMxdG9ZWGhsWDFWdWMyVnlhV0ZzYVhwbGNpNUNRVk5GTmpRdVkyaGhja052WkdWQmRDaHBLVjBnUFNCcE93b0pmUW9KY21WMGRYSnVJR052WkdWek93cDlPd3BvWVhobFgxVnVjMlZ5YVdGc2FYcGxjaTV5ZFc0Z1BTQm1kVzVqZEdsdmJpaDJLU0I3Q2dseVpYUjFjbTRnYm1WM0lHaGhlR1ZmVlc1elpYSnBZV3hwZW1WeUtIWXBMblZ1YzJWeWFXRnNhWHBsS0NrN0NuMDdDbWhoZUdWZlZXNXpaWEpwWVd4cGVtVnlMbkJ5YjNSdmRIbHdaU0E5SUhzS0NYSmxZV1JFYVdkcGRITTZJR1oxYm1OMGFXOXVLQ2tnZXdvSkNYWmhjaUJySUQwZ01Ec0tDUWwyWVhJZ2N5QTlJR1poYkhObE93b0pDWFpoY2lCbWNHOXpJRDBnZEdocGN5NXdiM003Q2drSmQyaHBiR1VvZEhKMVpTa2dld29KQ1FsMllYSWdZeUE5SUhSb2FYTXVZblZtTG1Ob1lYSkRiMlJsUVhRb2RHaHBjeTV3YjNNcE93b0pDUWxwWmloaklDRTlJR01wSUhzS0NRa0pDV0p5WldGck93b0pDUWw5Q2drSkNXbG1LR01nUFQwZ05EVXBJSHNLQ1FrSkNXbG1LSFJvYVhNdWNHOXpJQ0U5SUdad2IzTXBJSHNLQ1FrSkNRbGljbVZoYXpzS0NRa0pDWDBLQ1FrSkNYTWdQU0IwY25WbE93b0pDUWtKZEdocGN5NXdiM01yS3pzS0NRa0pDV052Ym5ScGJuVmxPd29KQ1FsOUNna0pDV2xtS0dNZ1BDQTBPQ0I4ZkNCaklENGdOVGNwSUhzS0NRa0pDV0p5WldGck93b0pDUWw5Q2drSkNXc2dQU0JySUNvZ01UQWdLeUFvWXlBdElEUTRLVHNLQ1FrSmRHaHBjeTV3YjNNckt6c0tDUWw5Q2drSmFXWW9jeWtnZXdvSkNRbHJJQ285SUMweE93b0pDWDBLQ1FseVpYUjFjbTRnYXpzS0NYMEtDU3h5WldGa1JteHZZWFE2SUdaMWJtTjBhVzl1S0NrZ2V3b0pDWFpoY2lCd01TQTlJSFJvYVhNdWNHOXpPd29KQ1hkb2FXeGxLSFJ5ZFdVcElIc0tDUWtKZG1GeUlHTWdQU0IwYUdsekxtSjFaaTVqYUdGeVEyOWtaVUYwS0hSb2FYTXVjRzl6S1RzS0NRa0phV1lvWXlBaFBTQmpLU0I3Q2drSkNRbGljbVZoYXpzS0NRa0pmUW9KQ1FscFppaGpJRDQ5SURReklDWW1JR01nUENBMU9DQjhmQ0JqSUQwOUlERXdNU0I4ZkNCaklEMDlJRFk1S1NCN0Nna0pDUWwwYUdsekxuQnZjeXNyT3dvSkNRbDlJR1ZzYzJVZ2V3b0pDUWtKWW5KbFlXczdDZ2tKQ1gwS0NRbDlDZ2tKY21WMGRYSnVJSEJoY25ObFJteHZZWFFvU0hoUGRtVnljbWxrWlhNdWMzVmljM1J5S0hSb2FYTXVZblZtTEhBeExIUm9hWE11Y0c5eklDMGdjREVwS1RzS0NYMEtDU3gxYm5ObGNtbGhiR2w2WlU5aWFtVmpkRG9nWm5WdVkzUnBiMjRvYnlrZ2V3b0pDWGRvYVd4bEtIUnlkV1VwSUhzS0NRa0phV1lvZEdocGN5NXdiM01nUGowZ2RHaHBjeTVzWlc1bmRHZ3BJSHNLQ1FrSkNYUm9jbTkzSUdoaGVHVmZSWGhqWlhCMGFXOXVMblJvY205M2JpZ2lTVzUyWVd4cFpDQnZZbXBsWTNRaUtUc0tDUWtKZlFvSkNRbHBaaWgwYUdsekxtSjFaaTVqYUdGeVEyOWtaVUYwS0hSb2FYTXVjRzl6S1NBOVBTQXhNRE1wSUhzS0NRa0pDV0p5WldGck93b0pDUWw5Q2drSkNYWmhjaUJySUQwZ2RHaHBjeTUxYm5ObGNtbGhiR2w2WlNncE93b0pDUWxwWmloMGVYQmxiMllvYXlrZ0lUMGdJbk4wY21sdVp5SXBJSHNLQ1FrSkNYUm9jbTkzSUdoaGVHVmZSWGhqWlhCMGFXOXVMblJvY205M2JpZ2lTVzUyWVd4cFpDQnZZbXBsWTNRZ2EyVjVJaWs3Q2drSkNYMEtDUWtKZG1GeUlIWWdQU0IwYUdsekxuVnVjMlZ5YVdGc2FYcGxLQ2s3Q2drSkNXOWJhMTBnUFNCMk93b0pDWDBLQ1FsMGFHbHpMbkJ2Y3lzck93b0pmUW9KTEhWdWMyVnlhV0ZzYVhwbFJXNTFiVG9nWm5WdVkzUnBiMjRvWldSbFkyd3NkR0ZuS1NCN0Nna0phV1lvZEdocGN5NWlkV1l1WTJoaGNrTnZaR1ZCZENoMGFHbHpMbkJ2Y3lzcktTQWhQU0ExT0NrZ2V3b0pDUWwwYUhKdmR5Qm9ZWGhsWDBWNFkyVndkR2x2Ymk1MGFISnZkMjRvSWtsdWRtRnNhV1FnWlc1MWJTQm1iM0p0WVhRaUtUc0tDUWw5Q2drSmRtRnlJRzVoY21keklEMGdkR2hwY3k1eVpXRmtSR2xuYVhSektDazdDZ2tKYVdZb2JtRnlaM01nUFQwZ01Da2dld29KQ1FseVpYUjFjbTRnVkhsd1pTNWpjbVZoZEdWRmJuVnRLR1ZrWldOc0xIUmhaeWs3Q2drSmZRb0pDWFpoY2lCaGNtZHpJRDBnVzEwN0Nna0pkMmhwYkdVb2JtRnlaM010TFNBK0lEQXBJR0Z5WjNNdWNIVnphQ2gwYUdsekxuVnVjMlZ5YVdGc2FYcGxLQ2twT3dvSkNYSmxkSFZ5YmlCVWVYQmxMbU55WldGMFpVVnVkVzBvWldSbFkyd3NkR0ZuTEdGeVozTXBPd29KZlFvSkxIVnVjMlZ5YVdGc2FYcGxPaUJtZFc1amRHbHZiaWdwSUhzS0NRbHpkMmwwWTJnb2RHaHBjeTVpZFdZdVkyaGhja052WkdWQmRDaDBhR2x6TG5CdmN5c3JLU2tnZXdvSkNXTmhjMlVnTmpVNkNna0pDWFpoY2lCdVlXMWxJRDBnZEdocGN5NTFibk5sY21saGJHbDZaU2dwT3dvSkNRbDJZWElnWTJ3Z1BTQjBhR2x6TG5KbGMyOXNkbVZ5TG5KbGMyOXNkbVZEYkdGemN5aHVZVzFsS1RzS0NRa0phV1lvWTJ3Z1BUMGdiblZzYkNrZ2V3b0pDUWtKZEdoeWIzY2dhR0Y0WlY5RmVHTmxjSFJwYjI0dWRHaHliM2R1S0NKRGJHRnpjeUJ1YjNRZ1ptOTFibVFnSWlBcklHNWhiV1VwT3dvSkNRbDlDZ2tKQ1hKbGRIVnliaUJqYkRzS0NRbGpZWE5sSURZMk9nb0pDUWwyWVhJZ2JtRnRaU0E5SUhSb2FYTXVkVzV6WlhKcFlXeHBlbVVvS1RzS0NRa0pkbUZ5SUdVZ1BTQjBhR2x6TG5KbGMyOXNkbVZ5TG5KbGMyOXNkbVZGYm5WdEtHNWhiV1VwT3dvSkNRbHBaaWhsSUQwOUlHNTFiR3dwSUhzS0NRa0pDWFJvY205M0lHaGhlR1ZmUlhoalpYQjBhVzl1TG5Sb2NtOTNiaWdpUlc1MWJTQnViM1FnWm05MWJtUWdJaUFySUc1aGJXVXBPd29KQ1FsOUNna0pDWEpsZEhWeWJpQmxPd29KQ1dOaGMyVWdOamM2Q2drSkNYWmhjaUJ1WVcxbElEMGdkR2hwY3k1MWJuTmxjbWxoYkdsNlpTZ3BPd29KQ1FsMllYSWdZMndnUFNCMGFHbHpMbkpsYzI5c2RtVnlMbkpsYzI5c2RtVkRiR0Z6Y3lodVlXMWxLVHNLQ1FrSmFXWW9ZMndnUFQwZ2JuVnNiQ2tnZXdvSkNRa0pkR2h5YjNjZ2FHRjRaVjlGZUdObGNIUnBiMjR1ZEdoeWIzZHVLQ0pEYkdGemN5QnViM1FnWm05MWJtUWdJaUFySUc1aGJXVXBPd29KQ1FsOUNna0pDWFpoY2lCdklEMGdUMkpxWldOMExtTnlaV0YwWlNoamJDNXdjbTkwYjNSNWNHVXBPd29KQ1FsMGFHbHpMbU5oWTJobExuQjFjMmdvYnlrN0Nna0pDVzh1YUhoVmJuTmxjbWxoYkdsNlpTaDBhR2x6S1RzS0NRa0phV1lvZEdocGN5NWlkV1l1WTJoaGNrTnZaR1ZCZENoMGFHbHpMbkJ2Y3lzcktTQWhQU0F4TURNcElIc0tDUWtKQ1hSb2NtOTNJR2hoZUdWZlJYaGpaWEIwYVc5dUxuUm9jbTkzYmlnaVNXNTJZV3hwWkNCamRYTjBiMjBnWkdGMFlTSXBPd29KQ1FsOUNna0pDWEpsZEhWeWJpQnZPd29KQ1dOaGMyVWdOemM2Q2drSkNYWmhjaUJvSUQwZ2JtVjNJR2hoZUdWZlpITmZUMkpxWldOMFRXRndLQ2s3Q2drSkNYUm9hWE11WTJGamFHVXVjSFZ6YUNob0tUc0tDUWtKZG1GeUlHSjFaaUE5SUhSb2FYTXVZblZtT3dvSkNRbDNhR2xzWlNoMGFHbHpMbUoxWmk1amFHRnlRMjlrWlVGMEtIUm9hWE11Y0c5ektTQWhQU0F4TURRcElIc0tDUWtKQ1haaGNpQnpJRDBnZEdocGN5NTFibk5sY21saGJHbDZaU2dwT3dvSkNRa0phQzV6WlhRb2N5eDBhR2x6TG5WdWMyVnlhV0ZzYVhwbEtDa3BPd29KQ1FsOUNna0pDWFJvYVhNdWNHOXpLeXM3Q2drSkNYSmxkSFZ5YmlCb093b0pDV05oYzJVZ09ESTZDZ2tKQ1haaGNpQnVJRDBnZEdocGN5NXlaV0ZrUkdsbmFYUnpLQ2s3Q2drSkNXbG1LRzRnUENBd0lIeDhJRzRnUGowZ2RHaHBjeTV6WTJGamFHVXViR1Z1WjNSb0tTQjdDZ2tKQ1FsMGFISnZkeUJvWVhobFgwVjRZMlZ3ZEdsdmJpNTBhSEp2ZDI0b0lrbHVkbUZzYVdRZ2MzUnlhVzVuSUhKbFptVnlaVzVqWlNJcE93b0pDUWw5Q2drSkNYSmxkSFZ5YmlCMGFHbHpMbk5qWVdOb1pWdHVYVHNLQ1FsallYTmxJRGszT2dvSkNRbDJZWElnWW5WbUlEMGdkR2hwY3k1aWRXWTdDZ2tKQ1haaGNpQmhJRDBnVzEwN0Nna0pDWFJvYVhNdVkyRmphR1V1Y0hWemFDaGhLVHNLQ1FrSmQyaHBiR1VvZEhKMVpTa2dld29KQ1FrSmRtRnlJR01nUFNCMGFHbHpMbUoxWmk1amFHRnlRMjlrWlVGMEtIUm9hWE11Y0c5ektUc0tDUWtKQ1dsbUtHTWdQVDBnTVRBMEtTQjdDZ2tKQ1FrSmRHaHBjeTV3YjNNckt6c0tDUWtKQ1FsaWNtVmhhenNLQ1FrSkNYMEtDUWtKQ1dsbUtHTWdQVDBnTVRFM0tTQjdDZ2tKQ1FrSmRHaHBjeTV3YjNNckt6c0tDUWtKQ1FsMllYSWdiaUE5SUhSb2FYTXVjbVZoWkVScFoybDBjeWdwT3dvSkNRa0pDV0ZiWVM1c1pXNW5kR2dnS3lCdUlDMGdNVjBnUFNCdWRXeHNPd29KQ1FrSmZTQmxiSE5sSUhzS0NRa0pDUWxoTG5CMWMyZ29kR2hwY3k1MWJuTmxjbWxoYkdsNlpTZ3BLVHNLQ1FrSkNYMEtDUWtKZlFvSkNRbHlaWFIxY200Z1lUc0tDUWxqWVhObElEazRPZ29KQ1FsMllYSWdhQ0E5SUc1bGR5Qm9ZWGhsWDJSelgxTjBjbWx1WjAxaGNDZ3BPd29KQ1FsMGFHbHpMbU5oWTJobExuQjFjMmdvYUNrN0Nna0pDWFpoY2lCaWRXWWdQU0IwYUdsekxtSjFaanNLQ1FrSmQyaHBiR1VvZEdocGN5NWlkV1l1WTJoaGNrTnZaR1ZCZENoMGFHbHpMbkJ2Y3lrZ0lUMGdNVEEwS1NCN0Nna0pDUWwyWVhJZ2N5QTlJSFJvYVhNdWRXNXpaWEpwWVd4cGVtVW9LVHNLQ1FrSkNYWmhjaUIyWVd4MVpTQTlJSFJvYVhNdWRXNXpaWEpwWVd4cGVtVW9LVHNLQ1FrSkNXZ3VhRnR6WFNBOUlIWmhiSFZsT3dvSkNRbDlDZ2tKQ1hSb2FYTXVjRzl6S3lzN0Nna0pDWEpsZEhWeWJpQm9Pd29KQ1dOaGMyVWdPVGs2Q2drSkNYWmhjaUJ1WVcxbElEMGdkR2hwY3k1MWJuTmxjbWxoYkdsNlpTZ3BPd29KQ1FsMllYSWdZMndnUFNCMGFHbHpMbkpsYzI5c2RtVnlMbkpsYzI5c2RtVkRiR0Z6Y3lodVlXMWxLVHNLQ1FrSmFXWW9ZMndnUFQwZ2JuVnNiQ2tnZXdvSkNRa0pkR2h5YjNjZ2FHRjRaVjlGZUdObGNIUnBiMjR1ZEdoeWIzZHVLQ0pEYkdGemN5QnViM1FnWm05MWJtUWdJaUFySUc1aGJXVXBPd29KQ1FsOUNna0pDWFpoY2lCdklEMGdUMkpxWldOMExtTnlaV0YwWlNoamJDNXdjbTkwYjNSNWNHVXBPd29KQ1FsMGFHbHpMbU5oWTJobExuQjFjMmdvYnlrN0Nna0pDWFJvYVhNdWRXNXpaWEpwWVd4cGVtVlBZbXBsWTNRb2J5azdDZ2tKQ1hKbGRIVnliaUJ2T3dvSkNXTmhjMlVnTVRBd09nb0pDUWx5WlhSMWNtNGdkR2hwY3k1eVpXRmtSbXh2WVhRb0tUc0tDUWxqWVhObElERXdNam9LQ1FrSmNtVjBkWEp1SUdaaGJITmxPd29KQ1dOaGMyVWdNVEExT2dvSkNRbHlaWFIxY200Z2RHaHBjeTV5WldGa1JHbG5hWFJ6S0NrN0Nna0pZMkZ6WlNBeE1EWTZDZ2tKQ1haaGNpQnVZVzFsSUQwZ2RHaHBjeTUxYm5ObGNtbGhiR2w2WlNncE93b0pDUWwyWVhJZ1pXUmxZMndnUFNCMGFHbHpMbkpsYzI5c2RtVnlMbkpsYzI5c2RtVkZiblZ0S0c1aGJXVXBPd29KQ1FscFppaGxaR1ZqYkNBOVBTQnVkV3hzS1NCN0Nna0pDUWwwYUhKdmR5Qm9ZWGhsWDBWNFkyVndkR2x2Ymk1MGFISnZkMjRvSWtWdWRXMGdibTkwSUdadmRXNWtJQ0lnS3lCdVlXMWxLVHNLQ1FrSmZRb0pDUWwwYUdsekxuQnZjeXNyT3dvSkNRbDJZWElnYVc1a1pYZ2dQU0IwYUdsekxuSmxZV1JFYVdkcGRITW9LVHNLQ1FrSmRtRnlJRjkwYUdseklEMGdaV1JsWTJ3dVgxOWpiMjV6ZEhKMVkzUnpYMTg3Q2drSkNYWmhjaUJ5WlhOMWJIUWdQU0J1WlhjZ1FYSnlZWGtvWDNSb2FYTXViR1Z1WjNSb0tUc0tDUWtKZG1GeUlGOW5JRDBnTURzS0NRa0pkbUZ5SUY5bk1TQTlJRjkwYUdsekxteGxibWQwYURzS0NRa0pkMmhwYkdVb1gyY2dQQ0JmWnpFcElIc0tDUWtKQ1haaGNpQnBJRDBnWDJjckt6c0tDUWtKQ1hKbGMzVnNkRnRwWFNBOUlGOTBhR2x6VzJsZExsOW9lRjl1WVcxbE93b0pDUWw5Q2drSkNYWmhjaUIwWVdjZ1BTQnlaWE4xYkhSYmFXNWtaWGhkT3dvSkNRbHBaaWgwWVdjZ1BUMGdiblZzYkNrZ2V3b0pDUWtKZEdoeWIzY2dhR0Y0WlY5RmVHTmxjSFJwYjI0dWRHaHliM2R1S0NKVmJtdHViM2R1SUdWdWRXMGdhVzVrWlhnZ0lpQXJJRzVoYldVZ0t5QWlRQ0lnS3lCcGJtUmxlQ2s3Q2drSkNYMEtDUWtKZG1GeUlHVWdQU0IwYUdsekxuVnVjMlZ5YVdGc2FYcGxSVzUxYlNobFpHVmpiQ3gwWVdjcE93b0pDUWwwYUdsekxtTmhZMmhsTG5CMWMyZ29aU2s3Q2drSkNYSmxkSFZ5YmlCbE93b0pDV05oYzJVZ01UQTNPZ29KQ1FseVpYUjFjbTRnVG1GT093b0pDV05oYzJVZ01UQTRPZ29KQ1FsMllYSWdiQ0E5SUc1bGR5Qm9ZWGhsWDJSelgweHBjM1FvS1RzS0NRa0pkR2hwY3k1allXTm9aUzV3ZFhOb0tHd3BPd29KQ1FsMllYSWdZblZtSUQwZ2RHaHBjeTVpZFdZN0Nna0pDWGRvYVd4bEtIUm9hWE11WW5WbUxtTm9ZWEpEYjJSbFFYUW9kR2hwY3k1d2IzTXBJQ0U5SURFd05Da2diQzVoWkdRb2RHaHBjeTUxYm5ObGNtbGhiR2w2WlNncEtUc0tDUWtKZEdocGN5NXdiM01yS3pzS0NRa0pjbVYwZFhKdUlHdzdDZ2tKWTJGelpTQXhNRGs2Q2drSkNYSmxkSFZ5YmlBdFNXNW1hVzVwZEhrN0Nna0pZMkZ6WlNBeE1UQTZDZ2tKQ1hKbGRIVnliaUJ1ZFd4c093b0pDV05oYzJVZ01URXhPZ29KQ1FsMllYSWdieUE5SUhzZ2ZUc0tDUWtKZEdocGN5NWpZV05vWlM1d2RYTm9LRzhwT3dvSkNRbDBhR2x6TG5WdWMyVnlhV0ZzYVhwbFQySnFaV04wS0c4cE93b0pDUWx5WlhSMWNtNGdienNLQ1FsallYTmxJREV4TWpvS0NRa0pjbVYwZFhKdUlFbHVabWx1YVhSNU93b0pDV05oYzJVZ01URXpPZ29KQ1FsMllYSWdhQ0E5SUc1bGR5Qm9ZWGhsWDJSelgwbHVkRTFoY0NncE93b0pDUWwwYUdsekxtTmhZMmhsTG5CMWMyZ29hQ2s3Q2drSkNYWmhjaUJpZFdZZ1BTQjBhR2x6TG1KMVpqc0tDUWtKZG1GeUlHTWdQU0IwYUdsekxtSjFaaTVqYUdGeVEyOWtaVUYwS0hSb2FYTXVjRzl6S3lzcE93b0pDUWwzYUdsc1pTaGpJRDA5SURVNEtTQjdDZ2tKQ1FsMllYSWdhU0E5SUhSb2FYTXVjbVZoWkVScFoybDBjeWdwT3dvSkNRa0pkbUZ5SUhaaGJIVmxJRDBnZEdocGN5NTFibk5sY21saGJHbDZaU2dwT3dvSkNRa0phQzVvVzJsZElEMGdkbUZzZFdVN0Nna0pDUWxqSUQwZ2RHaHBjeTVpZFdZdVkyaGhja052WkdWQmRDaDBhR2x6TG5CdmN5c3JLVHNLQ1FrSmZRb0pDUWxwWmloaklDRTlJREV3TkNrZ2V3b0pDUWtKZEdoeWIzY2dhR0Y0WlY5RmVHTmxjSFJwYjI0dWRHaHliM2R1S0NKSmJuWmhiR2xrSUVsdWRFMWhjQ0JtYjNKdFlYUWlLVHNLQ1FrSmZRb0pDUWx5WlhSMWNtNGdhRHNLQ1FsallYTmxJREV4TkRvS0NRa0pkbUZ5SUc0Z1BTQjBhR2x6TG5KbFlXUkVhV2RwZEhNb0tUc0tDUWtKYVdZb2JpQThJREFnZkh3Z2JpQStQU0IwYUdsekxtTmhZMmhsTG14bGJtZDBhQ2tnZXdvSkNRa0pkR2h5YjNjZ2FHRjRaVjlGZUdObGNIUnBiMjR1ZEdoeWIzZHVLQ0pKYm5aaGJHbGtJSEpsWm1WeVpXNWpaU0lwT3dvSkNRbDlDZ2tKQ1hKbGRIVnliaUIwYUdsekxtTmhZMmhsVzI1ZE93b0pDV05oYzJVZ01URTFPZ29KQ1FsMllYSWdiR1Z1SUQwZ2RHaHBjeTV5WldGa1JHbG5hWFJ6S0NrN0Nna0pDWFpoY2lCaWRXWWdQU0IwYUdsekxtSjFaanNLQ1FrSmFXWW9kR2hwY3k1aWRXWXVZMmhoY2tOdlpHVkJkQ2gwYUdsekxuQnZjeXNyS1NBaFBTQTFPQ0I4ZkNCMGFHbHpMbXhsYm1kMGFDQXRJSFJvYVhNdWNHOXpJRHdnYkdWdUtTQjdDZ2tKQ1FsMGFISnZkeUJvWVhobFgwVjRZMlZ3ZEdsdmJpNTBhSEp2ZDI0b0lrbHVkbUZzYVdRZ1lubDBaWE1nYkdWdVozUm9JaWs3Q2drSkNYMEtDUWtKZG1GeUlHTnZaR1Z6SUQwZ2FHRjRaVjlWYm5ObGNtbGhiR2w2WlhJdVEwOUVSVk03Q2drSkNXbG1LR052WkdWeklEMDlJRzUxYkd3cElIc0tDUWtKQ1dOdlpHVnpJRDBnYUdGNFpWOVZibk5sY21saGJHbDZaWEl1YVc1cGRFTnZaR1Z6S0NrN0Nna0pDUWxvWVhobFgxVnVjMlZ5YVdGc2FYcGxjaTVEVDBSRlV5QTlJR052WkdWek93b0pDUWw5Q2drSkNYWmhjaUJwSUQwZ2RHaHBjeTV3YjNNN0Nna0pDWFpoY2lCeVpYTjBJRDBnYkdWdUlDWWdNenNLQ1FrSmRtRnlJSE5wZW1VZ1BTQW9iR1Z1SUQ0K0lESXBJQ29nTXlBcklDaHlaWE4wSUQ0OUlESWdQeUJ5WlhOMElDMGdNU0E2SURBcE93b0pDUWwyWVhJZ2JXRjRJRDBnYVNBcklDaHNaVzRnTFNCeVpYTjBLVHNLQ1FrSmRtRnlJR0o1ZEdWeklEMGdibVYzSUdoaGVHVmZhVzlmUW5sMFpYTW9ibVYzSUVGeWNtRjVRblZtWm1WeUtITnBlbVVwS1RzS0NRa0pkbUZ5SUdKd2IzTWdQU0F3T3dvSkNRbDNhR2xzWlNocElEd2diV0Y0S1NCN0Nna0pDUWwyWVhJZ1l6RWdQU0JqYjJSbGMxdGlkV1l1WTJoaGNrTnZaR1ZCZENocEt5c3BYVHNLQ1FrSkNYWmhjaUJqTWlBOUlHTnZaR1Z6VzJKMVppNWphR0Z5UTI5a1pVRjBLR2tyS3lsZE93b0pDUWtKWW5sMFpYTXVZbHRpY0c5ekt5dGRJRDBnWXpFZ1BEd2dNaUI4SUdNeUlENCtJRFE3Q2drSkNRbDJZWElnWXpNZ1BTQmpiMlJsYzF0aWRXWXVZMmhoY2tOdlpHVkJkQ2hwS3lzcFhUc0tDUWtKQ1dKNWRHVnpMbUpiWW5CdmN5c3JYU0E5SUdNeUlEdzhJRFFnZkNCak15QStQaUF5T3dvSkNRa0pkbUZ5SUdNMElEMGdZMjlrWlhOYlluVm1MbU5vWVhKRGIyUmxRWFFvYVNzcktWMDdDZ2tKQ1FsaWVYUmxjeTVpVzJKd2IzTXJLMTBnUFNCak15QThQQ0EySUh3Z1l6UTdDZ2tKQ1gwS0NRa0phV1lvY21WemRDQStQU0F5S1NCN0Nna0pDUWwyWVhJZ1l6RWdQU0JqYjJSbGMxdGlkV1l1WTJoaGNrTnZaR1ZCZENocEt5c3BYVHNLQ1FrSkNYWmhjaUJqTWlBOUlHTnZaR1Z6VzJKMVppNWphR0Z5UTI5a1pVRjBLR2tyS3lsZE93b0pDUWtKWW5sMFpYTXVZbHRpY0c5ekt5dGRJRDBnWXpFZ1BEd2dNaUI4SUdNeUlENCtJRFE3Q2drSkNRbHBaaWh5WlhOMElEMDlJRE1wSUhzS0NRa0pDUWwyWVhJZ1l6TWdQU0JqYjJSbGMxdGlkV1l1WTJoaGNrTnZaR1ZCZENocEt5c3BYVHNLQ1FrSkNRbGllWFJsY3k1aVcySndiM01ySzEwZ1BTQmpNaUE4UENBMElId2dZek1nUGo0Z01qc0tDUWtKQ1gwS0NRa0pmUW9KQ1FsMGFHbHpMbkJ2Y3lBclBTQnNaVzQ3Q2drSkNYUm9hWE11WTJGamFHVXVjSFZ6YUNoaWVYUmxjeWs3Q2drSkNYSmxkSFZ5YmlCaWVYUmxjenNLQ1FsallYTmxJREV4TmpvS0NRa0pjbVYwZFhKdUlIUnlkV1U3Q2drSlkyRnpaU0F4TVRnNkNna0pDWFpoY2lCa093b0pDUWxwWmloMGFHbHpMbUoxWmk1amFHRnlRMjlrWlVGMEtIUm9hWE11Y0c5ektTQStQU0EwT0NBbUppQjBhR2x6TG1KMVppNWphR0Z5UTI5a1pVRjBLSFJvYVhNdWNHOXpLU0E4UFNBMU55QW1KaUIwYUdsekxtSjFaaTVqYUdGeVEyOWtaVUYwS0hSb2FYTXVjRzl6SUNzZ01Ta2dQajBnTkRnZ0ppWWdkR2hwY3k1aWRXWXVZMmhoY2tOdlpHVkJkQ2gwYUdsekxuQnZjeUFySURFcElEdzlJRFUzSUNZbUlIUm9hWE11WW5WbUxtTm9ZWEpEYjJSbFFYUW9kR2hwY3k1d2IzTWdLeUF5S1NBK1BTQTBPQ0FtSmlCMGFHbHpMbUoxWmk1amFHRnlRMjlrWlVGMEtIUm9hWE11Y0c5eklDc2dNaWtnUEQwZ05UY2dKaVlnZEdocGN5NWlkV1l1WTJoaGNrTnZaR1ZCZENoMGFHbHpMbkJ2Y3lBcklETXBJRDQ5SURRNElDWW1JSFJvYVhNdVluVm1MbU5vWVhKRGIyUmxRWFFvZEdocGN5NXdiM01nS3lBektTQThQU0ExTnlBbUppQjBhR2x6TG1KMVppNWphR0Z5UTI5a1pVRjBLSFJvYVhNdWNHOXpJQ3NnTkNrZ1BUMGdORFVwSUhzS0NRa0pDV1FnUFNCSWVFOTJaWEp5YVdSbGN5NXpkSEpFWVhSbEtFaDRUM1psY25KcFpHVnpMbk4xWW5OMGNpaDBhR2x6TG1KMVppeDBhR2x6TG5CdmN5d3hPU2twT3dvSkNRa0pkR2hwY3k1d2IzTWdLejBnTVRrN0Nna0pDWDBnWld4elpTQjdDZ2tKQ1Fsa0lEMGdibVYzSUVSaGRHVW9kR2hwY3k1eVpXRmtSbXh2WVhRb0tTazdDZ2tKQ1gwS0NRa0pkR2hwY3k1allXTm9aUzV3ZFhOb0tHUXBPd29KQ1FseVpYUjFjbTRnWkRzS0NRbGpZWE5sSURFeE9Ub0tDUWtKZG1GeUlHNWhiV1VnUFNCMGFHbHpMblZ1YzJWeWFXRnNhWHBsS0NrN0Nna0pDWFpoY2lCbFpHVmpiQ0E5SUhSb2FYTXVjbVZ6YjJ4MlpYSXVjbVZ6YjJ4MlpVVnVkVzBvYm1GdFpTazdDZ2tKQ1dsbUtHVmtaV05zSUQwOUlHNTFiR3dwSUhzS0NRa0pDWFJvY205M0lHaGhlR1ZmUlhoalpYQjBhVzl1TG5Sb2NtOTNiaWdpUlc1MWJTQnViM1FnWm05MWJtUWdJaUFySUc1aGJXVXBPd29KQ1FsOUNna0pDWFpoY2lCbElEMGdkR2hwY3k1MWJuTmxjbWxoYkdsNlpVVnVkVzBvWldSbFkyd3NkR2hwY3k1MWJuTmxjbWxoYkdsNlpTZ3BLVHNLQ1FrSmRHaHBjeTVqWVdOb1pTNXdkWE5vS0dVcE93b0pDUWx5WlhSMWNtNGdaVHNLQ1FsallYTmxJREV5TURvS0NRa0pkR2h5YjNjZ2FHRjRaVjlGZUdObGNIUnBiMjR1ZEdoeWIzZHVLSFJvYVhNdWRXNXpaWEpwWVd4cGVtVW9LU2s3Q2drSlkyRnpaU0F4TWpFNkNna0pDWFpoY2lCc1pXNGdQU0IwYUdsekxuSmxZV1JFYVdkcGRITW9LVHNLQ1FrSmFXWW9kR2hwY3k1aWRXWXVZMmhoY2tOdlpHVkJkQ2gwYUdsekxuQnZjeXNyS1NBaFBTQTFPQ0I4ZkNCMGFHbHpMbXhsYm1kMGFDQXRJSFJvYVhNdWNHOXpJRHdnYkdWdUtTQjdDZ2tKQ1FsMGFISnZkeUJvWVhobFgwVjRZMlZ3ZEdsdmJpNTBhSEp2ZDI0b0lrbHVkbUZzYVdRZ2MzUnlhVzVuSUd4bGJtZDBhQ0lwT3dvSkNRbDlDZ2tKQ1haaGNpQnpJRDBnU0hoUGRtVnljbWxrWlhNdWMzVmljM1J5S0hSb2FYTXVZblZtTEhSb2FYTXVjRzl6TEd4bGJpazdDZ2tKQ1hSb2FYTXVjRzl6SUNzOUlHeGxianNLQ1FrSmN5QTlJR1JsWTI5a1pWVlNTVU52YlhCdmJtVnVkQ2h6TG5Od2JHbDBLQ0lySWlrdWFtOXBiaWdpSUNJcEtUc0tDUWtKZEdocGN5NXpZMkZqYUdVdWNIVnphQ2h6S1RzS0NRa0pjbVYwZFhKdUlITTdDZ2tKWTJGelpTQXhNakk2Q2drSkNYSmxkSFZ5YmlBd093b0pDV1JsWm1GMWJIUTZDZ2tKZlFvSkNYUm9hWE11Y0c5ekxTMDdDZ2tKZEdoeWIzY2dhR0Y0WlY5RmVHTmxjSFJwYjI0dWRHaHliM2R1S0NKSmJuWmhiR2xrSUdOb1lYSWdJaUFySUhSb2FYTXVZblZtTG1Ob1lYSkJkQ2gwYUdsekxuQnZjeWtnS3lBaUlHRjBJSEJ2YzJsMGFXOXVJQ0lnS3lCMGFHbHpMbkJ2Y3lrN0NnbDlDbjA3Q25aaGNpQm9ZWGhsWDFaaGJIVmxSWGhqWlhCMGFXOXVJRDBnWm5WdVkzUnBiMjRvZG1Gc2RXVXNjSEpsZG1sdmRYTXNibUYwYVhabEtTQjdDZ2xvWVhobFgwVjRZMlZ3ZEdsdmJpNWpZV3hzS0hSb2FYTXNVM1J5YVc1bktIWmhiSFZsS1N4d2NtVjJhVzkxY3l4dVlYUnBkbVVwT3dvSmRHaHBjeTUyWVd4MVpTQTlJSFpoYkhWbE93cDlPd29rYUhoRGJHRnpjMlZ6V3lKb1lYaGxMbFpoYkhWbFJYaGpaWEIwYVc5dUlsMGdQU0JvWVhobFgxWmhiSFZsUlhoalpYQjBhVzl1T3dwb1lYaGxYMVpoYkhWbFJYaGpaWEIwYVc5dUxsOWZibUZ0WlY5ZklEMGdkSEoxWlRzS2FHRjRaVjlXWVd4MVpVVjRZMlZ3ZEdsdmJpNWZYM04xY0dWeVgxOGdQU0JvWVhobFgwVjRZMlZ3ZEdsdmJqc0thR0Y0WlY5V1lXeDFaVVY0WTJWd2RHbHZiaTV3Y205MGIzUjVjR1VnUFNBa1pYaDBaVzVrS0doaGVHVmZSWGhqWlhCMGFXOXVMbkJ5YjNSdmRIbHdaU3g3Q2dsMWJuZHlZWEE2SUdaMWJtTjBhVzl1S0NrZ2V3b0pDWEpsZEhWeWJpQjBhR2x6TG5aaGJIVmxPd29KZlFwOUtUc0tkbUZ5SUdoaGVHVmZhVzlmUW5sMFpYTWdQU0JtZFc1amRHbHZiaWhrWVhSaEtTQjdDZ2wwYUdsekxteGxibWQwYUNBOUlHUmhkR0V1WW5sMFpVeGxibWQwYURzS0NYUm9hWE11WWlBOUlHNWxkeUJWYVc1ME9FRnljbUY1S0dSaGRHRXBPd29KZEdocGN5NWlMbUoxWm1abGNsWmhiSFZsSUQwZ1pHRjBZVHNLQ1dSaGRHRXVhSGhDZVhSbGN5QTlJSFJvYVhNN0NnbGtZWFJoTG1KNWRHVnpJRDBnZEdocGN5NWlPd3A5T3dva2FIaERiR0Z6YzJWeld5Sm9ZWGhsTG1sdkxrSjVkR1Z6SWwwZ1BTQm9ZWGhsWDJsdlgwSjVkR1Z6T3dwb1lYaGxYMmx2WDBKNWRHVnpMbDlmYm1GdFpWOWZJRDBnZEhKMVpUc0thR0Y0WlY5cGIxOUNlWFJsY3k1dlpsTjBjbWx1WnlBOUlHWjFibU4wYVc5dUtITXNaVzVqYjJScGJtY3BJSHNLQ1dsbUtHVnVZMjlrYVc1bklEMDlJR2hoZUdWZmFXOWZSVzVqYjJScGJtY3VVbUYzVG1GMGFYWmxLU0I3Q2drSmRtRnlJR0oxWmlBOUlHNWxkeUJWYVc1ME9FRnljbUY1S0hNdWJHVnVaM1JvSUR3OElERXBPd29KQ1haaGNpQmZaeUE5SURBN0Nna0pkbUZ5SUY5bk1TQTlJSE11YkdWdVozUm9Pd29KQ1hkb2FXeGxLRjluSUR3Z1gyY3hLU0I3Q2drSkNYWmhjaUJwSUQwZ1gyY3JLenNLQ1FrSmRtRnlJR01nUFNCekxtTm9ZWEpEYjJSbFFYUW9hU2s3Q2drSkNXSjFabHRwSUR3OElERmRJRDBnWXlBbUlESTFOVHNLQ1FrSlluVm1XMmtnUER3Z01TQjhJREZkSUQwZ1l5QStQaUE0T3dvSkNYMEtDUWx5WlhSMWNtNGdibVYzSUdoaGVHVmZhVzlmUW5sMFpYTW9ZblZtTG1KMVptWmxjaWs3Q2dsOUNnbDJZWElnWVNBOUlGdGRPd29KZG1GeUlHa2dQU0F3T3dvSmQyaHBiR1VvYVNBOElITXViR1Z1WjNSb0tTQjdDZ2tKZG1GeUlHTWdQU0J6TG1Ob1lYSkRiMlJsUVhRb2FTc3JLVHNLQ1FscFppZzFOVEk1TmlBOFBTQmpJQ1ltSUdNZ1BEMGdOVFl6TVRrcElIc0tDUWtKWXlBOUlHTWdMU0ExTlRJek1pQThQQ0F4TUNCOElITXVZMmhoY2tOdlpHVkJkQ2hwS3lzcElDWWdNVEF5TXpzS0NRbDlDZ2tKYVdZb1l5QThQU0F4TWpjcElIc0tDUWtKWVM1d2RYTm9LR01wT3dvSkNYMGdaV3h6WlNCcFppaGpJRHc5SURJd05EY3BJSHNLQ1FrSllTNXdkWE5vS0RFNU1pQjhJR01nUGo0Z05pazdDZ2tKQ1dFdWNIVnphQ2d4TWpnZ2ZDQmpJQ1lnTmpNcE93b0pDWDBnWld4elpTQnBaaWhqSUR3OUlEWTFOVE0xS1NCN0Nna0pDV0V1Y0hWemFDZ3lNalFnZkNCaklENCtJREV5S1RzS0NRa0pZUzV3ZFhOb0tERXlPQ0I4SUdNZ1BqNGdOaUFtSURZektUc0tDUWtKWVM1d2RYTm9LREV5T0NCOElHTWdKaUEyTXlrN0Nna0pmU0JsYkhObElIc0tDUWtKWVM1d2RYTm9LREkwTUNCOElHTWdQajRnTVRncE93b0pDUWxoTG5CMWMyZ29NVEk0SUh3Z1l5QStQaUF4TWlBbUlEWXpLVHNLQ1FrSllTNXdkWE5vS0RFeU9DQjhJR01nUGo0Z05pQW1JRFl6S1RzS0NRa0pZUzV3ZFhOb0tERXlPQ0I4SUdNZ0ppQTJNeWs3Q2drSmZRb0pmUW9KY21WMGRYSnVJRzVsZHlCb1lYaGxYMmx2WDBKNWRHVnpLRzVsZHlCVmFXNTBPRUZ5Y21GNUtHRXBMbUoxWm1abGNpazdDbjA3Q21oaGVHVmZhVzlmUW5sMFpYTXVjSEp2ZEc5MGVYQmxJRDBnZXdvSloyVjBVM1J5YVc1bk9pQm1kVzVqZEdsdmJpaHdiM01zYkdWdUxHVnVZMjlrYVc1bktTQjdDZ2tKYVdZb2NHOXpJRHdnTUNCOGZDQnNaVzRnUENBd0lIeDhJSEJ2Y3lBcklHeGxiaUErSUhSb2FYTXViR1Z1WjNSb0tTQjdDZ2tKQ1hSb2NtOTNJR2hoZUdWZlJYaGpaWEIwYVc5dUxuUm9jbTkzYmlob1lYaGxYMmx2WDBWeWNtOXlMazkxZEhOcFpHVkNiM1Z1WkhNcE93b0pDWDBLQ1FscFppaGxibU52WkdsdVp5QTlQU0J1ZFd4c0tTQjdDZ2tKQ1dWdVkyOWthVzVuSUQwZ2FHRjRaVjlwYjE5RmJtTnZaR2x1Wnk1VlZFWTRPd29KQ1gwS0NRbDJZWElnY3lBOUlDSWlPd29KQ1haaGNpQmlJRDBnZEdocGN5NWlPd29KQ1haaGNpQnBJRDBnY0c5ek93b0pDWFpoY2lCdFlYZ2dQU0J3YjNNZ0t5QnNaVzQ3Q2drSmMzZHBkR05vS0dWdVkyOWthVzVuTGw5b2VGOXBibVJsZUNrZ2V3b0pDV05oYzJVZ01Eb0tDUWtKZG1GeUlHUmxZblZuSUQwZ2NHOXpJRDRnTURzS0NRa0pkMmhwYkdVb2FTQThJRzFoZUNrZ2V3b0pDUWtKZG1GeUlHTWdQU0JpVzJrcksxMDdDZ2tKQ1FscFppaGpJRHdnTVRJNEtTQjdDZ2tKQ1FrSmFXWW9ZeUE5UFNBd0tTQjdDZ2tKQ1FrSkNXSnlaV0ZyT3dvSkNRa0pDWDBLQ1FrSkNRbHpJQ3M5SUZOMGNtbHVaeTVtY205dFEyOWtaVkJ2YVc1MEtHTXBPd29KQ1FrSmZTQmxiSE5sSUdsbUtHTWdQQ0F5TWpRcElIc0tDUWtKQ1FsMllYSWdZMjlrWlNBOUlDaGpJQ1lnTmpNcElEdzhJRFlnZkNCaVcya3JLMTBnSmlBeE1qYzdDZ2tKQ1FrSmN5QXJQU0JUZEhKcGJtY3Vabkp2YlVOdlpHVlFiMmx1ZENoamIyUmxLVHNLQ1FrSkNYMGdaV3h6WlNCcFppaGpJRHdnTWpRd0tTQjdDZ2tKQ1FrSmRtRnlJR015SUQwZ1lsdHBLeXRkT3dvSkNRa0pDWFpoY2lCamIyUmxNU0E5SUNoaklDWWdNekVwSUR3OElERXlJSHdnS0dNeUlDWWdNVEkzS1NBOFBDQTJJSHdnWWx0cEt5dGRJQ1lnTVRJM093b0pDUWtKQ1hNZ0t6MGdVM1J5YVc1bkxtWnliMjFEYjJSbFVHOXBiblFvWTI5a1pURXBPd29KQ1FrSmZTQmxiSE5sSUhzS0NRa0pDUWwyWVhJZ1l6SXhJRDBnWWx0cEt5dGRPd29KQ1FrSkNYWmhjaUJqTXlBOUlHSmJhU3NyWFRzS0NRa0pDUWwyWVhJZ2RTQTlJQ2hqSUNZZ01UVXBJRHc4SURFNElId2dLR015TVNBbUlERXlOeWtnUER3Z01USWdmQ0FvWXpNZ0ppQXhNamNwSUR3OElEWWdmQ0JpVzJrcksxMGdKaUF4TWpjN0Nna0pDUWtKY3lBclBTQlRkSEpwYm1jdVpuSnZiVU52WkdWUWIybHVkQ2gxS1RzS0NRa0pDWDBLQ1FrSmZRb0pDUWxpY21WaGF6c0tDUWxqWVhObElERTZDZ2tKQ1hkb2FXeGxLR2tnUENCdFlYZ3BJSHNLQ1FrSkNYWmhjaUJqSUQwZ1lsdHBLeXRkSUh3Z1lsdHBLeXRkSUR3OElEZzdDZ2tKQ1FseklDczlJRk4wY21sdVp5NW1jbTl0UTI5a1pWQnZhVzUwS0dNcE93b0pDUWw5Q2drSkNXSnlaV0ZyT3dvSkNYMEtDUWx5WlhSMWNtNGdjenNLQ1gwS0NTeDBiMU4wY21sdVp6b2dablZ1WTNScGIyNG9LU0I3Q2drSmNtVjBkWEp1SUhSb2FYTXVaMlYwVTNSeWFXNW5LREFzZEdocGN5NXNaVzVuZEdncE93b0pmUXA5T3dwMllYSWdhR0Y0WlY5cGIxOUZibU52WkdsdVp5QTlJQ1JvZUVWdWRXMXpXeUpvWVhobExtbHZMa1Z1WTI5a2FXNW5JbDBnUFNCN0lGOWZaVzVoYldWZlh6cDBjblZsTEY5ZlkyOXVjM1J5ZFdOMGMxOWZPbTUxYkd3S0NTeFZWRVk0T2lCN1gyaDRYMjVoYldVNklsVlVSamdpTEY5b2VGOXBibVJsZURvd0xGOWZaVzUxYlY5Zk9pSm9ZWGhsTG1sdkxrVnVZMjlrYVc1bklpeDBiMU4wY21sdVp6b2taWE4wY24wS0NTeFNZWGRPWVhScGRtVTZJSHRmYUhoZmJtRnRaVG9pVW1GM1RtRjBhWFpsSWl4ZmFIaGZhVzVrWlhnNk1TeGZYMlZ1ZFcxZlh6b2lhR0Y0WlM1cGJ5NUZibU52WkdsdVp5SXNkRzlUZEhKcGJtYzZKR1Z6ZEhKOUNuMDdDbWhoZUdWZmFXOWZSVzVqYjJScGJtY3VYMTlqYjI1emRISjFZM1J6WDE4Z1BTQmJhR0Y0WlY5cGIxOUZibU52WkdsdVp5NVZWRVk0TEdoaGVHVmZhVzlmUlc1amIyUnBibWN1VW1GM1RtRjBhWFpsWFRzS2RtRnlJR2hoZUdWZlkzSjVjSFJ2WDBKaGMyVTJOQ0E5SUdaMWJtTjBhVzl1S0NrZ2V5QjlPd29rYUhoRGJHRnpjMlZ6V3lKb1lYaGxMbU55ZVhCMGJ5NUNZWE5sTmpRaVhTQTlJR2hoZUdWZlkzSjVjSFJ2WDBKaGMyVTJORHNLYUdGNFpWOWpjbmx3ZEc5ZlFtRnpaVFkwTGw5ZmJtRnRaVjlmSUQwZ2RISjFaVHNLYUdGNFpWOWpjbmx3ZEc5ZlFtRnpaVFkwTG1SbFkyOWtaU0E5SUdaMWJtTjBhVzl1S0hOMGNpeGpiMjF3YkdWdFpXNTBLU0I3Q2dscFppaGpiMjF3YkdWdFpXNTBJRDA5SUc1MWJHd3BJSHNLQ1FsamIyMXdiR1Z0Wlc1MElEMGdkSEoxWlRzS0NYMEtDV2xtS0dOdmJYQnNaVzFsYm5RcElIc0tDUWwzYUdsc1pTaEllRTkyWlhKeWFXUmxjeTVqWTJFb2MzUnlMSE4wY2k1c1pXNW5kR2dnTFNBeEtTQTlQU0EyTVNrZ2MzUnlJRDBnU0hoUGRtVnljbWxrWlhNdWMzVmljM1J5S0hOMGNpd3dMQzB4S1RzS0NYMEtDWEpsZEhWeWJpQnVaWGNnYUdGNFpWOWpjbmx3ZEc5ZlFtRnpaVU52WkdVb2FHRjRaVjlqY25sd2RHOWZRbUZ6WlRZMExrSlpWRVZUS1M1a1pXTnZaR1ZDZVhSbGN5aG9ZWGhsWDJsdlgwSjVkR1Z6TG05bVUzUnlhVzVuS0hOMGNpa3BPd3A5T3dwMllYSWdhR0Y0WlY5amNubHdkRzlmUW1GelpVTnZaR1VnUFNCbWRXNWpkR2x2YmloaVlYTmxLU0I3Q2dsMllYSWdiR1Z1SUQwZ1ltRnpaUzVzWlc1bmRHZzdDZ2wyWVhJZ2JtSnBkSE1nUFNBeE93b0pkMmhwYkdVb2JHVnVJRDRnTVNBOFBDQnVZbWwwY3lrZ0t5dHVZbWwwY3pzS0NXbG1LRzVpYVhSeklENGdPQ0I4ZkNCc1pXNGdJVDBnTVNBOFBDQnVZbWwwY3lrZ2V3b0pDWFJvY205M0lHaGhlR1ZmUlhoalpYQjBhVzl1TG5Sb2NtOTNiaWdpUW1GelpVTnZaR1VnT2lCaVlYTmxJR3hsYm1kMGFDQnRkWE4wSUdKbElHRWdjRzkzWlhJZ2IyWWdkSGR2TGlJcE93b0pmUW9KZEdocGN5NWlZWE5sSUQwZ1ltRnpaVHNLQ1hSb2FYTXVibUpwZEhNZ1BTQnVZbWwwY3pzS2ZUc0tKR2g0UTJ4aGMzTmxjMXNpYUdGNFpTNWpjbmx3ZEc4dVFtRnpaVU52WkdVaVhTQTlJR2hoZUdWZlkzSjVjSFJ2WDBKaGMyVkRiMlJsT3dwb1lYaGxYMk55ZVhCMGIxOUNZWE5sUTI5a1pTNWZYMjVoYldWZlh5QTlJSFJ5ZFdVN0NtaGhlR1ZmWTNKNWNIUnZYMEpoYzJWRGIyUmxMbkJ5YjNSdmRIbHdaU0E5SUhzS0NXbHVhWFJVWVdKc1pUb2dablZ1WTNScGIyNG9LU0I3Q2drSmRtRnlJSFJpYkNBOUlGdGRPd29KQ1haaGNpQmZaeUE5SURBN0Nna0pkMmhwYkdVb1gyY2dQQ0F5TlRZcElIc0tDUWtKZG1GeUlHa2dQU0JmWnlzck93b0pDUWwwWW14YmFWMGdQU0F0TVRzS0NRbDlDZ2tKZG1GeUlGOW5JRDBnTURzS0NRbDJZWElnWDJjeElEMGdkR2hwY3k1aVlYTmxMbXhsYm1kMGFEc0tDUWwzYUdsc1pTaGZaeUE4SUY5bk1Ta2dld29KQ1FsMllYSWdhU0E5SUY5bkt5czdDZ2tKQ1hSaWJGdDBhR2x6TG1KaGMyVXVZbHRwWFYwZ1BTQnBPd29KQ1gwS0NRbDBhR2x6TG5SaWJDQTlJSFJpYkRzS0NYMEtDU3hrWldOdlpHVkNlWFJsY3pvZ1puVnVZM1JwYjI0b1lpa2dld29KQ1haaGNpQnVZbWwwY3lBOUlIUm9hWE11Ym1KcGRITTdDZ2tKZG1GeUlHSmhjMlVnUFNCMGFHbHpMbUpoYzJVN0Nna0phV1lvZEdocGN5NTBZbXdnUFQwZ2JuVnNiQ2tnZXdvSkNRbDBhR2x6TG1sdWFYUlVZV0pzWlNncE93b0pDWDBLQ1FsMllYSWdkR0pzSUQwZ2RHaHBjeTUwWW13N0Nna0pkbUZ5SUhOcGVtVWdQU0JpTG14bGJtZDBhQ0FxSUc1aWFYUnpJRDQrSURNN0Nna0pkbUZ5SUc5MWRDQTlJRzVsZHlCb1lYaGxYMmx2WDBKNWRHVnpLRzVsZHlCQmNuSmhlVUoxWm1abGNpaHphWHBsS1NrN0Nna0pkbUZ5SUdKMVppQTlJREE3Q2drSmRtRnlJR04xY21KcGRITWdQU0F3T3dvSkNYWmhjaUJ3YVc0Z1BTQXdPd29KQ1haaGNpQndiM1YwSUQwZ01Ec0tDUWwzYUdsc1pTaHdiM1YwSUR3Z2MybDZaU2tnZXdvSkNRbDNhR2xzWlNoamRYSmlhWFJ6SUR3Z09Da2dld29KQ1FrSlkzVnlZbWwwY3lBclBTQnVZbWwwY3pzS0NRa0pDV0oxWmlBOFBEMGdibUpwZEhNN0Nna0pDUWwyWVhJZ2FTQTlJSFJpYkZ0aUxtSmJjR2x1S3l0ZFhUc0tDUWtKQ1dsbUtHa2dQVDBnTFRFcElIc0tDUWtKQ1FsMGFISnZkeUJvWVhobFgwVjRZMlZ3ZEdsdmJpNTBhSEp2ZDI0b0lrSmhjMlZEYjJSbElEb2dhVzUyWVd4cFpDQmxibU52WkdWa0lHTm9ZWElpS1RzS0NRa0pDWDBLQ1FrSkNXSjFaaUI4UFNCcE93b0pDUWw5Q2drSkNXTjFjbUpwZEhNZ0xUMGdPRHNLQ1FrSmIzVjBMbUpiY0c5MWRDc3JYU0E5SUdKMVppQStQaUJqZFhKaWFYUnpJQ1lnTWpVMU93b0pDWDBLQ1FseVpYUjFjbTRnYjNWME93b0pmUXA5T3dwMllYSWdhR0Y0WlY5a2MxOUpiblJOWVhBZ1BTQm1kVzVqZEdsdmJpZ3BJSHNLQ1hSb2FYTXVhQ0E5SUhzZ2ZUc0tmVHNLSkdoNFEyeGhjM05sYzFzaWFHRjRaUzVrY3k1SmJuUk5ZWEFpWFNBOUlHaGhlR1ZmWkhOZlNXNTBUV0Z3T3dwb1lYaGxYMlJ6WDBsdWRFMWhjQzVmWDI1aGJXVmZYeUE5SUhSeWRXVTdDblpoY2lCb1lYaGxYMlJ6WDB4cGMzUWdQU0JtZFc1amRHbHZiaWdwSUhzS0NYUm9hWE11YkdWdVozUm9JRDBnTURzS2ZUc0tKR2g0UTJ4aGMzTmxjMXNpYUdGNFpTNWtjeTVNYVhOMElsMGdQU0JvWVhobFgyUnpYMHhwYzNRN0NtaGhlR1ZmWkhOZlRHbHpkQzVmWDI1aGJXVmZYeUE5SUhSeWRXVTdDbWhoZUdWZlpITmZUR2x6ZEM1d2NtOTBiM1I1Y0dVZ1BTQjdDZ2xoWkdRNklHWjFibU4wYVc5dUtHbDBaVzBwSUhzS0NRbDJZWElnZUNBOUlHNWxkeUJvWVhobFgyUnpYMThrVEdsemRGOU1hWE4wVG05a1pTaHBkR1Z0TEc1MWJHd3BPd29KQ1dsbUtIUm9hWE11YUNBOVBTQnVkV3hzS1NCN0Nna0pDWFJvYVhNdWFDQTlJSGc3Q2drSmZTQmxiSE5sSUhzS0NRa0pkR2hwY3k1eExtNWxlSFFnUFNCNE93b0pDWDBLQ1FsMGFHbHpMbkVnUFNCNE93b0pDWFJvYVhNdWJHVnVaM1JvS3lzN0NnbDlDbjA3Q25aaGNpQm9ZWGhsWDJSelgxOGtUR2x6ZEY5TWFYTjBUbTlrWlNBOUlHWjFibU4wYVc5dUtHbDBaVzBzYm1WNGRDa2dld29KZEdocGN5NXBkR1Z0SUQwZ2FYUmxiVHNLQ1hSb2FYTXVibVY0ZENBOUlHNWxlSFE3Q24wN0NpUm9lRU5zWVhOelpYTmJJbWhoZUdVdVpITXVYMHhwYzNRdVRHbHpkRTV2WkdVaVhTQTlJR2hoZUdWZlpITmZYeVJNYVhOMFgweHBjM1JPYjJSbE93cG9ZWGhsWDJSelgxOGtUR2x6ZEY5TWFYTjBUbTlrWlM1ZlgyNWhiV1ZmWHlBOUlIUnlkV1U3Q25aaGNpQm9ZWGhsWDJSelgwOWlhbVZqZEUxaGNDQTlJR1oxYm1OMGFXOXVLQ2tnZXdvSmRHaHBjeTVvSUQwZ2V5QmZYMnRsZVhOZlh5QTZJSHNnZlgwN0NuMDdDaVJvZUVOc1lYTnpaWE5iSW1oaGVHVXVaSE11VDJKcVpXTjBUV0Z3SWwwZ1BTQm9ZWGhsWDJSelgwOWlhbVZqZEUxaGNEc0thR0Y0WlY5a2MxOVBZbXBsWTNSTllYQXVYMTl1WVcxbFgxOGdQU0IwY25WbE93cG9ZWGhsWDJSelgwOWlhbVZqZEUxaGNDNXdjbTkwYjNSNWNHVWdQU0I3Q2dselpYUTZJR1oxYm1OMGFXOXVLR3RsZVN4MllXeDFaU2tnZXdvSkNYWmhjaUJwWkNBOUlHdGxlUzVmWDJsa1gxODdDZ2tKYVdZb2FXUWdQVDBnYm5Wc2JDa2dld29KQ1FscFpDQTlJQ2hyWlhrdVgxOXBaRjlmSUQwZ0pHZHNiMkpoYkM0a2FHRjRaVlZKUkNzcktUc0tDUWw5Q2drSmRHaHBjeTVvVzJsa1hTQTlJSFpoYkhWbE93b0pDWFJvYVhNdWFDNWZYMnRsZVhOZlgxdHBaRjBnUFNCclpYazdDZ2w5Q24wN0NuWmhjaUJvWVhobFgyUnpYMU4wY21sdVowMWhjQ0E5SUdaMWJtTjBhVzl1S0NrZ2V3b0pkR2hwY3k1b0lEMGdUMkpxWldOMExtTnlaV0YwWlNodWRXeHNLVHNLZlRzS0pHaDRRMnhoYzNObGMxc2lhR0Y0WlM1a2N5NVRkSEpwYm1kTllYQWlYU0E5SUdoaGVHVmZaSE5mVTNSeWFXNW5UV0Z3T3dwb1lYaGxYMlJ6WDFOMGNtbHVaMDFoY0M1ZlgyNWhiV1ZmWHlBOUlIUnlkV1U3Q25aaGNpQm9ZWGhsWDJsdlgwVnljbTl5SUQwZ0pHaDRSVzUxYlhOYkltaGhlR1V1YVc4dVJYSnliM0lpWFNBOUlIc2dYMTlsYm1GdFpWOWZPblJ5ZFdVc1gxOWpiMjV6ZEhKMVkzUnpYMTg2Ym5Wc2JBb0pMRUpzYjJOclpXUTZJSHRmYUhoZmJtRnRaVG9pUW14dlkydGxaQ0lzWDJoNFgybHVaR1Y0T2pBc1gxOWxiblZ0WDE4NkltaGhlR1V1YVc4dVJYSnliM0lpTEhSdlUzUnlhVzVuT2lSbGMzUnlmUW9KTEU5MlpYSm1iRzkzT2lCN1gyaDRYMjVoYldVNklrOTJaWEptYkc5M0lpeGZhSGhmYVc1a1pYZzZNU3hmWDJWdWRXMWZYem9pYUdGNFpTNXBieTVGY25KdmNpSXNkRzlUZEhKcGJtYzZKR1Z6ZEhKOUNna3NUM1YwYzJsa1pVSnZkVzVrY3pvZ2UxOW9lRjl1WVcxbE9pSlBkWFJ6YVdSbFFtOTFibVJ6SWl4ZmFIaGZhVzVrWlhnNk1peGZYMlZ1ZFcxZlh6b2lhR0Y0WlM1cGJ5NUZjbkp2Y2lJc2RHOVRkSEpwYm1jNkpHVnpkSEo5Q2drc1EzVnpkRzl0T2lBb0pGODlablZ1WTNScGIyNG9aU2tnZXlCeVpYUjFjbTRnZTE5b2VGOXBibVJsZURvekxHVTZaU3hmWDJWdWRXMWZYem9pYUdGNFpTNXBieTVGY25KdmNpSXNkRzlUZEhKcGJtYzZKR1Z6ZEhKOU95QjlMQ1JmTGw5b2VGOXVZVzFsUFNKRGRYTjBiMjBpTENSZkxsOWZjR0Z5WVcxelgxOGdQU0JiSW1VaVhTd2tYeWtLZlRzS2FHRjRaVjlwYjE5RmNuSnZjaTVmWDJOdmJuTjBjblZqZEhOZlh5QTlJRnRvWVhobFgybHZYMFZ5Y205eUxrSnNiMk5yWldRc2FHRjRaVjlwYjE5RmNuSnZjaTVQZG1WeVpteHZkeXhvWVhobFgybHZYMFZ5Y205eUxrOTFkSE5wWkdWQ2IzVnVaSE1zYUdGNFpWOXBiMTlGY25KdmNpNURkWE4wYjIxZE93cDJZWElnYUdGNFpWOXBkR1Z5WVhSdmNuTmZRWEp5WVhsSmRHVnlZWFJ2Y2lBOUlHWjFibU4wYVc5dUtHRnljbUY1S1NCN0NnbDBhR2x6TG1OMWNuSmxiblFnUFNBd093b0pkR2hwY3k1aGNuSmhlU0E5SUdGeWNtRjVPd3A5T3dva2FIaERiR0Z6YzJWeld5Sm9ZWGhsTG1sMFpYSmhkRzl5Y3k1QmNuSmhlVWwwWlhKaGRHOXlJbDBnUFNCb1lYaGxYMmwwWlhKaGRHOXljMTlCY25KaGVVbDBaWEpoZEc5eU93cG9ZWGhsWDJsMFpYSmhkRzl5YzE5QmNuSmhlVWwwWlhKaGRHOXlMbDlmYm1GdFpWOWZJRDBnZEhKMVpUc0thR0Y0WlY5cGRHVnlZWFJ2Y25OZlFYSnlZWGxKZEdWeVlYUnZjaTV3Y205MGIzUjVjR1VnUFNCN0NnbG9ZWE5PWlhoME9pQm1kVzVqZEdsdmJpZ3BJSHNLQ1FseVpYUjFjbTRnZEdocGN5NWpkWEp5Wlc1MElEd2dkR2hwY3k1aGNuSmhlUzVzWlc1bmRHZzdDZ2w5Q2drc2JtVjRkRG9nWm5WdVkzUnBiMjRvS1NCN0Nna0pjbVYwZFhKdUlIUm9hWE11WVhKeVlYbGJkR2hwY3k1amRYSnlaVzUwS3l0ZE93b0pmUXA5T3dwMllYSWdhbk5mUW05dmRDQTlJR1oxYm1OMGFXOXVLQ2tnZXlCOU93b2thSGhEYkdGemMyVnpXeUpxY3k1Q2IyOTBJbDBnUFNCcWMxOUNiMjkwT3dwcWMxOUNiMjkwTGw5ZmJtRnRaVjlmSUQwZ2RISjFaVHNLYW5OZlFtOXZkQzVmWDNOMGNtbHVaMTl5WldNZ1BTQm1kVzVqZEdsdmJpaHZMSE1wSUhzS0NXbG1LRzhnUFQwZ2JuVnNiQ2tnZXdvSkNYSmxkSFZ5YmlBaWJuVnNiQ0k3Q2dsOUNnbHBaaWh6TG14bGJtZDBhQ0ErUFNBMUtTQjdDZ2tKY21WMGRYSnVJQ0k4TGk0dVBpSTdDZ2w5Q2dsMllYSWdkQ0E5SUhSNWNHVnZaaWh2S1RzS0NXbG1LSFFnUFQwZ0ltWjFibU4wYVc5dUlpQW1KaUFvYnk1ZlgyNWhiV1ZmWHlCOGZDQnZMbDlmWlc1aGJXVmZYeWtwSUhzS0NRbDBJRDBnSW05aWFtVmpkQ0k3Q2dsOUNnbHpkMmwwWTJnb2RDa2dld29KWTJGelpTQWlablZ1WTNScGIyNGlPZ29KQ1hKbGRIVnliaUFpUEdaMWJtTjBhVzl1UGlJN0NnbGpZWE5sSUNKdlltcGxZM1FpT2dvSkNXbG1LRzh1WDE5bGJuVnRYMThwSUhzS0NRa0pkbUZ5SUdVZ1BTQWthSGhGYm5WdGMxdHZMbDlmWlc1MWJWOWZYVHNLQ1FrSmRtRnlJR052YmlBOUlHVXVYMTlqYjI1emRISjFZM1J6WDE5YmJ5NWZhSGhmYVc1a1pYaGRPd29KQ1FsMllYSWdiaUE5SUdOdmJpNWZhSGhmYm1GdFpUc0tDUWtKYVdZb1kyOXVMbDlmY0dGeVlXMXpYMThwSUhzS0NRa0pDWE1nUFNCeklDc2dJbHgwSWpzS0NRa0pDWEpsZEhWeWJpQnVJQ3NnSWlnaUlDc2dLQ2htZFc1amRHbHZiaWdrZEdocGN5a2dld29KQ1FrSkNYWmhjaUFrY2pzS0NRa0pDUWwyWVhJZ1gyY2dQU0JiWFRzS0NRa0pDUWw3Q2drSkNRa0pDWFpoY2lCZlp6RWdQU0F3T3dvSkNRa0pDUWwyWVhJZ1gyY3lJRDBnWTI5dUxsOWZjR0Z5WVcxelgxODdDZ2tKQ1FrSkNYZG9hV3hsS0hSeWRXVXBJSHNLQ1FrSkNRa0pDV2xtS0NFb1gyY3hJRHdnWDJjeUxteGxibWQwYUNrcElIc0tDUWtKQ1FrSkNRbGljbVZoYXpzS0NRa0pDUWtKQ1gwS0NRa0pDUWtKQ1haaGNpQndJRDBnWDJjeVcxOW5NVjA3Q2drSkNRa0pDUWxmWnpFZ1BTQmZaekVnS3lBeE93b0pDUWtKQ1FrSlgyY3VjSFZ6YUNocWMxOUNiMjkwTGw5ZmMzUnlhVzVuWDNKbFl5aHZXM0JkTEhNcEtUc0tDUWtKQ1FrSmZRb0pDUWtKQ1gwS0NRa0pDUWtrY2lBOUlGOW5Pd29KQ1FrSkNYSmxkSFZ5YmlBa2Nqc0tDUWtKQ1gwb2RHaHBjeWtwS1M1cWIybHVLQ0lzSWlrZ0t5QWlLU0k3Q2drSkNYMGdaV3h6WlNCN0Nna0pDUWx5WlhSMWNtNGdianNLQ1FrSmZRb0pDWDBLQ1FscFppZ29LRzhwSUdsdWMzUmhibU5sYjJZZ1FYSnlZWGtwS1NCN0Nna0pDWFpoY2lCemRISWdQU0FpV3lJN0Nna0pDWE1nS3owZ0lseDBJanNLQ1FrSmRtRnlJRjluSUQwZ01Ec0tDUWtKZG1GeUlGOW5NU0E5SUc4dWJHVnVaM1JvT3dvSkNRbDNhR2xzWlNoZlp5QThJRjluTVNrZ2V3b0pDUWtKZG1GeUlHa2dQU0JmWnlzck93b0pDUWtKYzNSeUlDczlJQ2hwSUQ0Z01DQS9JQ0lzSWlBNklDSWlLU0FySUdwelgwSnZiM1F1WDE5emRISnBibWRmY21WaktHOWJhVjBzY3lrN0Nna0pDWDBLQ1FrSmMzUnlJQ3M5SUNKZElqc0tDUWtKY21WMGRYSnVJSE4wY2pzS0NRbDlDZ2tKZG1GeUlIUnZjM1J5T3dvSkNYUnllU0I3Q2drSkNYUnZjM1J5SUQwZ2J5NTBiMU4wY21sdVp6c0tDUWw5SUdOaGRHTm9LQ0JmWnlBcElIc0tDUWtKY21WMGRYSnVJQ0kvUHo4aU93b0pDWDBLQ1FscFppaDBiM04wY2lBaFBTQnVkV3hzSUNZbUlIUnZjM1J5SUNFOUlFOWlhbVZqZEM1MGIxTjBjbWx1WnlBbUppQjBlWEJsYjJZb2RHOXpkSElwSUQwOUlDSm1kVzVqZEdsdmJpSXBJSHNLQ1FrSmRtRnlJSE15SUQwZ2J5NTBiMU4wY21sdVp5Z3BPd29KQ1FscFppaHpNaUFoUFNBaVcyOWlhbVZqZENCUFltcGxZM1JkSWlrZ2V3b0pDUWtKY21WMGRYSnVJSE15T3dvSkNRbDlDZ2tKZlFvSkNYWmhjaUJ6ZEhJZ1BTQWllMXh1SWpzS0NRbHpJQ3M5SUNKY2RDSTdDZ2tKZG1GeUlHaGhjM0FnUFNCdkxtaGhjMDkzYmxCeWIzQmxjblI1SUNFOUlHNTFiR3c3Q2drSmRtRnlJR3NnUFNCdWRXeHNPd29KQ1dadmNpZ2dheUJwYmlCdklDa2dld29KQ1dsbUtHaGhjM0FnSmlZZ0lXOHVhR0Z6VDNkdVVISnZjR1Z5ZEhrb2F5a3BJSHNLQ1FrSlkyOXVkR2x1ZFdVN0Nna0pmUW9KQ1dsbUtHc2dQVDBnSW5CeWIzUnZkSGx3WlNJZ2ZId2dheUE5UFNBaVgxOWpiR0Z6YzE5ZklpQjhmQ0JySUQwOUlDSmZYM04xY0dWeVgxOGlJSHg4SUdzZ1BUMGdJbDlmYVc1MFpYSm1ZV05sYzE5ZklpQjhmQ0JySUQwOUlDSmZYM0J5YjNCbGNuUnBaWE5mWHlJcElIc0tDUWtKWTI5dWRHbHVkV1U3Q2drSmZRb0pDV2xtS0hOMGNpNXNaVzVuZEdnZ0lUMGdNaWtnZXdvSkNRbHpkSElnS3owZ0lpd2dYRzRpT3dvSkNYMEtDUWx6ZEhJZ0t6MGdjeUFySUdzZ0t5QWlJRG9nSWlBcklHcHpYMEp2YjNRdVgxOXpkSEpwYm1kZmNtVmpLRzliYTEwc2N5azdDZ2tKZlFvSkNYTWdQU0J6TG5OMVluTjBjbWx1WnlneEtUc0tDUWx6ZEhJZ0t6MGdJbHh1SWlBcklITWdLeUFpZlNJN0Nna0pjbVYwZFhKdUlITjBjanNLQ1dOaGMyVWdJbk4wY21sdVp5STZDZ2tKY21WMGRYSnVJRzg3Q2dsa1pXWmhkV3gwT2dvSkNYSmxkSFZ5YmlCVGRISnBibWNvYnlrN0NnbDlDbjA3Q2lSbmJHOWlZV3d1SkdoaGVHVlZTVVFnZkQwZ01Ec0thV1lvZEhsd1pXOW1LSEJsY21admNtMWhibU5sS1NBaFBTQWlkVzVrWldacGJtVmtJaUEvSUhSNWNHVnZaaWh3WlhKbWIzSnRZVzVqWlM1dWIzY3BJRDA5SUNKbWRXNWpkR2x2YmlJZ09pQm1ZV3h6WlNrZ2V3b0pTSGhQZG1WeWNtbGtaWE11Ym05M0lEMGdjR1Z5Wm05eWJXRnVZMlV1Ym05M0xtSnBibVFvY0dWeVptOXliV0Z1WTJVcE93cDlDaVJvZUVOc1lYTnpaWE5iSWsxaGRHZ2lYU0E5SUUxaGRHZzdDbWxtS0NCVGRISnBibWN1Wm5KdmJVTnZaR1ZRYjJsdWRDQTlQU0J1ZFd4c0lDa2dVM1J5YVc1bkxtWnliMjFEYjJSbFVHOXBiblFnUFNCbWRXNWpkR2x2YmloaktTQjdJSEpsZEhWeWJpQmpJRHdnTUhneE1EQXdNQ0EvSUZOMGNtbHVaeTVtY205dFEyaGhja052WkdVb1l5a2dPaUJUZEhKcGJtY3Vabkp2YlVOb1lYSkRiMlJsS0NoalBqNHhNQ2tyTUhoRU4wTXdLU3RUZEhKcGJtY3Vabkp2YlVOb1lYSkRiMlJsS0NoakpqQjRNMFpHS1Nzd2VFUkRNREFwT3lCOUNsTjBjbWx1Wnk1ZlgyNWhiV1ZmWHlBOUlIUnlkV1U3Q2lSb2VFTnNZWE56WlhOYklrRnljbUY1SWwwZ1BTQkJjbkpoZVRzS1FYSnlZWGt1WDE5dVlXMWxYMThnUFNCMGNuVmxPd3BFWVhSbExsOWZibUZ0WlY5ZklEMGdJa1JoZEdVaU93cG9ZWGhsWDFKbGMyOTFjbU5sTG1OdmJuUmxiblFnUFNCYmV5QnVZVzFsSURvZ0lsOW9aV3h3WDIxaGNDSXNJR1JoZEdFZ09pQWlXVzVyZVUxRWNIcGFXRkpOWWpOa1RWbFlVbXhpYlU0MVVsYzFhRmx0ZUd4YVJ6azFUa1J3YjFwWGVIZFZha0kxVDBSd2ExcFhXbWhrVjNnd1dESmFibVZVUlhsUGJrNXNaRVY0Y0dSdFZrVmFWM2hvWlZjNVUwMVdTWHBWYWtwclRWUkNibVZVUlhoUGJrNXNaRVZ3TVdKWVFraFpXRUo2WWpGSmVGVnFVbE5OYmxKdVpWUkpkMDl1VG14a1JWcG9Zek5TVkdReWJEQlpNbWhHWW0xR2FXSkhWbXRpTVVsNFZXcFdVMDF1VW01bFZFVXdUMjVPYkdSRlJrTlZiRTR3WTIxR01GcFhaRFZpTVVsNFpWUlJORTl0Um1samExSTFZbTFHZEdGWFRXeE5ha0ZzVFd0WmJFMXFRbWhaYmtwRFlqSjRhRXBVU1hkS1ZFcEhTbFJKZDFsWFNubFdSMmg1WWpOV2JtRklRakZrUmtsNVpWUkZkMDl0Um1samExSTFZbTFHZEdGWFRtNWxWRVUxVDIxU2VXSldPWHBhV0VveVdsaEtabVF5Ykd0YVdGcHdZbTFXZGxWcVJqVk5WR2MyV1RJNWRFeHVaSEJhUjFZeVlWYzFiRXh0Um5OalIyaG9WV3BLTlU1RVp6WmhTRkl3WTBoTmJFMHdSV3hOYTFsc1RXdGFNMkZYVW14a2JXeDFXbE14ZDJOdE9UUmxVelZvWTBoQ2VtTkhPVEJNYlU1MllsTlZlVkp1UW5saU0yZzFXak5yZVUxRWNHdGpiVEZtWXpKV2VXUnRWbmxZTTBKeldWaHNlVnBYUm10bFZ6bFRUVmhyZVUxNmNHcGlNakIxWWxkc2FtTnRPWHBpTWxvd1RHNUNjMWxZYkhsYVYwWnJaVlpKZVdWVVJUTk9hbkJ2WkVoU2QyTjVWWHBSVTFWNVVtbFZlVkp1UW5OWldHeDVXbGRHYTJWVE5XdGhXRXBzV1ROU01GbFlRbnBNYlRWc1pFTlZlVkp1UW5sS1ZFcEhZek5hYWtwVVNrZGpiV3h1WVVoU2VtSlhSblZaVjJSc1kyazFhR015TVRSS1ZFNUhWVWQ0YUdWV1NuQmFNbWd3U2xST1JVMVRWWGxPYkZaNldsWk9jR0pZUW5OYVZUVjJZbXhDYkdOdVRuQmpNMUpzWW01U1RXRlhUbXhpYms1c1NsUk9SVTFUVlhsT2JFSnpXVmhzUm1KdFJtbGlSMVo1WTNsVmVsSkVZelJPYWxsNVRqQlJORXhWVFhsUlZGbDBUa1JTUTFKVE1EUlNhbWMwVEZSQk5GRlZWWGxPVkZaRFRVUkdRazR5WkRWTlZGVTJXa2RHZW1GSGNIcFlNbmgyV2pKNGJHUnRWbk5pTVVsNFpWUlJlazlxUVd4TmFrRnNUVEJSYkUwd1VXeE5ha0oxWWpJMWJFcFVTWGRrUnpoc1RXcEJNVXBVU1hkS1ZFNUZTbFJPUlVwVVNYZGFSMVpwWkZka1UwMXRhekJhTW1jaWZWMDdDbWhoZUdWZlpITmZUMkpxWldOMFRXRndMbU52ZFc1MElEMGdNRHNLYW5OZlFtOXZkQzVmWDNSdlUzUnlJRDBnS0hzZ2ZTa3VkRzlUZEhKcGJtYzdDa0Z5WjJGdUxraEZURkJmVWtWVFQxVlNRMFZmUzBWWklEMGdJbDlvWld4d1gyMWhjQ0k3Q2tSaGMyaEtjeTUyTXlBOUlHWmhiSE5sT3dwRVlYTm9Tbk11ZGpRZ1BTQm1ZV3h6WlRzS2FHRjRaVjlWYm5ObGNtbGhiR2w2WlhJdVJFVkdRVlZNVkY5U1JWTlBURlpGVWlBOUlHNWxkeUJvWVhobFgxOGtWVzV6WlhKcFlXeHBlbVZ5WDBSbFptRjFiSFJTWlhOdmJIWmxjaWdwT3dwb1lYaGxYMVZ1YzJWeWFXRnNhWHBsY2k1Q1FWTkZOalFnUFNBaVFVSkRSRVZHUjBoSlNrdE1UVTVQVUZGU1UxUlZWbGRZV1ZwaFltTmtaV1puYUdscWEyeHRibTl3Y1hKemRIVjJkM2g1ZWpBeE1qTTBOVFkzT0RrbE9pSTdDbWhoZUdWZlkzSjVjSFJ2WDBKaGMyVTJOQzVEU0VGU1V5QTlJQ0pCUWtORVJVWkhTRWxLUzB4TlRrOVFVVkpUVkZWV1YxaFpXbUZpWTJSbFptZG9hV3ByYkcxdWIzQnhjbk4wZFhaM2VIbDZNREV5TXpRMU5qYzRPU3N2SWpzS2FHRjRaVjlqY25sd2RHOWZRbUZ6WlRZMExrSlpWRVZUSUQwZ2FHRjRaVjlwYjE5Q2VYUmxjeTV2WmxOMGNtbHVaeWhvWVhobFgyTnllWEIwYjE5Q1lYTmxOalF1UTBoQlVsTXBPd3BFWVhOb1NuTXViV0ZwYmlncE93cDlLU2gwZVhCbGIyWWdkMmx1Wkc5M0lDRTlJQ0oxYm1SbFptbHVaV1FpSUQ4Z2QybHVaRzkzSURvZ2RIbHdaVzltSUdkc2IySmhiQ0FoUFNBaWRXNWtaV1pwYm1Wa0lpQS9JR2RzYjJKaGJDQTZJSFI1Y0dWdlppQnpaV3htSUNFOUlDSjFibVJsWm1sdVpXUWlJRDhnYzJWc1ppQTZJSFJvYVhNcE93bz0"},{ name : "shaka", data : "ZGF0YTp0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTg7YmFzZTY0LEtHWjFibU4wYVc5dUlDZ2taMnh2WW1Gc0tTQjdJQ0oxYzJVZ2MzUnlhV04wSWpzS2RtRnlJQ1JvZUVOc1lYTnpaWE1nUFNCN2ZTd2taWE4wY2lBOUlHWjFibU4wYVc5dUtDa2dleUJ5WlhSMWNtNGdhbk5mUW05dmRDNWZYM04wY21sdVoxOXlaV01vZEdocGN5d25KeWs3SUgwc0pHaDRSVzUxYlhNZ1BTQWthSGhGYm5WdGN5QjhmQ0I3ZlN3a1h6c0tablZ1WTNScGIyNGdKR1Y0ZEdWdVpDaG1jbTl0TENCbWFXVnNaSE1wSUhzS0NYWmhjaUJ3Y205MGJ5QTlJRTlpYW1WamRDNWpjbVZoZEdVb1puSnZiU2s3Q2dsbWIzSWdLSFpoY2lCdVlXMWxJR2x1SUdacFpXeGtjeWtnY0hKdmRHOWJibUZ0WlYwZ1BTQm1hV1ZzWkhOYmJtRnRaVjA3Q2dscFppZ2dabWxsYkdSekxuUnZVM1J5YVc1bklDRTlQU0JQWW1wbFkzUXVjSEp2ZEc5MGVYQmxMblJ2VTNSeWFXNW5JQ2tnY0hKdmRHOHVkRzlUZEhKcGJtY2dQU0JtYVdWc1pITXVkRzlUZEhKcGJtYzdDZ2x5WlhSMWNtNGdjSEp2ZEc4N0NuMEtkbUZ5SUVGeVoyRnVJRDBnWm5WdVkzUnBiMjRvS1NCN0lIMDdDaVJvZUVOc1lYTnpaWE5iSWtGeVoyRnVJbDBnUFNCQmNtZGhianNLUVhKbllXNHVYMTl1WVcxbFgxOGdQU0IwY25WbE93cEJjbWRoYmk1emRHRnlkQ0E5SUdaMWJtTjBhVzl1S0dOdmJtWnBaeWtnZXdvSmFXWW9iblZzYkNBaFBTQmpiMjVtYVdjcElIc0tDUWwyWVhJZ1lYSm5jMTl6WlhRZ1BTQnVaWGNnYUdGNFpWOWtjMTlUZEhKcGJtZE5ZWEFvS1RzS0NRbDJZWElnWDJjZ1BTQXdPd29KQ1haaGNpQmZaekVnUFNCU1pXWnNaV04wTG1acFpXeGtjeWhqYjI1bWFXY3BPd29KQ1hkb2FXeGxLRjluSUR3Z1gyY3hMbXhsYm1kMGFDa2dld29KQ1FsMllYSWdaaUE5SUY5bk1WdGZaMTA3Q2drSkNTc3JYMmM3Q2drSkNXRnlaM05mYzJWMExtaGJabDBnUFNCU1pXWnNaV04wTG1acFpXeGtLR052Ym1acFp5eG1LVHNLQ1FsOUNna0pRWEpuWVc0dVlYSm5jeUE5SUdGeVozTmZjMlYwT3dvSmZRcDlPd3BCY21kaGJpNXZZbXBsWTNSR2NtOXRUV0Z3SUQwZ1puVnVZM1JwYjI0b2JXRndLU0I3Q2dsMllYSWdiMkpxSUQwZ2V5QjlPd29KZG1GeUlHZ2dQU0J0WVhBdWFEc0tDWFpoY2lCclgyZ2dQU0JvT3dvSmRtRnlJR3RmYTJWNWN5QTlJRTlpYW1WamRDNXJaWGx6S0dncE93b0pkbUZ5SUd0ZmJHVnVaM1JvSUQwZ2ExOXJaWGx6TG14bGJtZDBhRHNLQ1haaGNpQnJYMk4xY25KbGJuUWdQU0F3T3dvSmQyaHBiR1VvYTE5amRYSnlaVzUwSUR3Z2ExOXNaVzVuZEdncElIc0tDUWwyWVhJZ2F5QTlJR3RmYTJWNWMxdHJYMk4xY25KbGJuUXJLMTA3Q2drSmIySnFXMnRkSUQwZ2JXRndMbWhiYTEwN0NnbDlDZ2x5WlhSMWNtNGdiMkpxT3dwOU93cDJZWElnU0hoUGRtVnljbWxrWlhNZ1BTQm1kVzVqZEdsdmJpZ3BJSHNnZlRzS0pHaDRRMnhoYzNObGMxc2lTSGhQZG1WeWNtbGtaWE1pWFNBOUlFaDRUM1psY25KcFpHVnpPd3BJZUU5MlpYSnlhV1JsY3k1ZlgyNWhiV1ZmWHlBOUlIUnlkV1U3Q2toNFQzWmxjbkpwWkdWekxuTjBja1JoZEdVZ1BTQm1kVzVqZEdsdmJpaHpLU0I3Q2dsemQybDBZMmdvY3k1c1pXNW5kR2dwSUhzS0NXTmhjMlVnT0RvS0NRbDJZWElnYXlBOUlITXVjM0JzYVhRb0lqb2lLVHNLQ1FsMllYSWdaQ0E5SUc1bGR5QkVZWFJsS0NrN0Nna0paRnNpYzJWMFZHbHRaU0pkS0RBcE93b0pDV1JiSW5ObGRGVlVRMGh2ZFhKeklsMG9hMXN3WFNrN0Nna0paRnNpYzJWMFZWUkRUV2x1ZFhSbGN5SmRLR3RiTVYwcE93b0pDV1JiSW5ObGRGVlVRMU5sWTI5dVpITWlYU2hyV3pKZEtUc0tDUWx5WlhSMWNtNGdaRHNLQ1dOaGMyVWdNVEE2Q2drSmRtRnlJR3NnUFNCekxuTndiR2wwS0NJdElpazdDZ2tKY21WMGRYSnVJRzVsZHlCRVlYUmxLR3RiTUYwc2Exc3hYU0F0SURFc2Exc3lYU3d3TERBc01DazdDZ2xqWVhObElERTVPZ29KQ1haaGNpQnJJRDBnY3k1emNHeHBkQ2dpSUNJcE93b0pDWFpoY2lCNUlEMGdhMXN3WFM1emNHeHBkQ2dpTFNJcE93b0pDWFpoY2lCMElEMGdhMXN4WFM1emNHeHBkQ2dpT2lJcE93b0pDWEpsZEhWeWJpQnVaWGNnUkdGMFpTaDVXekJkTEhsYk1WMGdMU0F4TEhsYk1sMHNkRnN3WFN4MFd6RmRMSFJiTWwwcE93b0paR1ZtWVhWc2REb0tDUWwwYUhKdmR5Qm9ZWGhsWDBWNFkyVndkR2x2Ymk1MGFISnZkMjRvSWtsdWRtRnNhV1FnWkdGMFpTQm1iM0p0WVhRZ09pQWlJQ3NnY3lrN0NnbDlDbjA3Q2toNFQzWmxjbkpwWkdWekxtTmpZU0E5SUdaMWJtTjBhVzl1S0hNc2FXNWtaWGdwSUhzS0NYWmhjaUI0SUQwZ2N5NWphR0Z5UTI5a1pVRjBLR2x1WkdWNEtUc0tDV2xtS0hnZ0lUMGdlQ2tnZXdvSkNYSmxkSFZ5YmlCMWJtUmxabWx1WldRN0NnbDlDZ2x5WlhSMWNtNGdlRHNLZlRzS1NIaFBkbVZ5Y21sa1pYTXVjM1ZpYzNSeUlEMGdablZ1WTNScGIyNG9jeXh3YjNNc2JHVnVLU0I3Q2dscFppaHNaVzRnUFQwZ2JuVnNiQ2tnZXdvSkNXeGxiaUE5SUhNdWJHVnVaM1JvT3dvSmZTQmxiSE5sSUdsbUtHeGxiaUE4SURBcElIc0tDUWxwWmlod2IzTWdQVDBnTUNrZ2V3b0pDUWxzWlc0Z1BTQnpMbXhsYm1kMGFDQXJJR3hsYmpzS0NRbDlJR1ZzYzJVZ2V3b0pDUWx5WlhSMWNtNGdJaUk3Q2drSmZRb0pmUW9KY21WMGRYSnVJSE11YzNWaWMzUnlLSEJ2Y3l4c1pXNHBPd3A5T3dwSWVFOTJaWEp5YVdSbGN5NXViM2NnUFNCbWRXNWpkR2x2YmlncElIc0tDWEpsZEhWeWJpQkVZWFJsTG01dmR5Z3BPd3A5T3dwTllYUm9MbDlmYm1GdFpWOWZJRDBnZEhKMVpUc0tkbUZ5SUZKbFpteGxZM1FnUFNCbWRXNWpkR2x2YmlncElIc2dmVHNLSkdoNFEyeGhjM05sYzFzaVVtVm1iR1ZqZENKZElEMGdVbVZtYkdWamREc0tVbVZtYkdWamRDNWZYMjVoYldWZlh5QTlJSFJ5ZFdVN0NsSmxabXhsWTNRdVptbGxiR1FnUFNCbWRXNWpkR2x2YmlodkxHWnBaV3hrS1NCN0NnbDBjbmtnZXdvSkNYSmxkSFZ5YmlCdlcyWnBaV3hrWFRzS0NYMGdZMkYwWTJnb0lGOW5JQ2tnZXdvSkNYSmxkSFZ5YmlCdWRXeHNPd29KZlFwOU93cFNaV1pzWldOMExtWnBaV3hrY3lBOUlHWjFibU4wYVc5dUtHOHBJSHNLQ1haaGNpQmhJRDBnVzEwN0NnbHBaaWh2SUNFOUlHNTFiR3dwSUhzS0NRbDJZWElnYUdGelQzZHVVSEp2Y0dWeWRIa2dQU0JQWW1wbFkzUXVjSEp2ZEc5MGVYQmxMbWhoYzA5M2JsQnliM0JsY25SNU93b0pDV1p2Y2lnZ2RtRnlJR1lnYVc0Z2J5QXBJSHNLQ1FscFppaG1JQ0U5SUNKZlgybGtYMThpSUNZbUlHWWdJVDBnSW1oNFgxOWpiRzl6ZFhKbGMxOWZJaUFtSmlCb1lYTlBkMjVRY205d1pYSjBlUzVqWVd4c0tHOHNaaWtwSUhzS0NRa0pZUzV3ZFhOb0tHWXBPd29KQ1gwS0NRbDlDZ2w5Q2dseVpYUjFjbTRnWVRzS2ZUc0tVbVZtYkdWamRDNXBjMFoxYm1OMGFXOXVJRDBnWm5WdVkzUnBiMjRvWmlrZ2V3b0phV1lvZEhsd1pXOW1LR1lwSUQwOUlDSm1kVzVqZEdsdmJpSXBJSHNLQ1FseVpYUjFjbTRnSVNobUxsOWZibUZ0WlY5ZklIeDhJR1l1WDE5bGJtRnRaVjlmS1RzS0NYMGdaV3h6WlNCN0Nna0pjbVYwZFhKdUlHWmhiSE5sT3dvSmZRcDlPd3AyWVhJZ1UyaGhhMkVnUFNCbWRXNWpkR2x2YmlncElIc2dmVHNLSkdoNFEyeGhjM05sYzFzaVUyaGhhMkVpWFNBOUlGTm9ZV3RoT3dwVGFHRnJZUzVmWDI1aGJXVmZYeUE5SUhSeWRXVTdDbE5vWVd0aExtMWhhVzRnUFNCbWRXNWpkR2x2YmlncElIc0tDWFpoY2lCMWNta2dQU0JTWldac1pXTjBMbVpwWld4a0tIZHBibVJ2ZHl3aWRYSnBJaWs3Q2dsMllYSWdjMmhoYTJFZ1BTQlNaV1pzWldOMExtWnBaV3hrS0hkcGJtUnZkeXdpYzJoaGEyRWlLVHNLQ1haaGNpQnZia1Z5Y205eVJYWmxiblFnUFNCbWRXNWpkR2x2YmlobGRtVnVkQ2tnZXdvSkNXOXVSWEp5YjNJb1pYWmxiblF1WkdWMFlXbHNLVHNLQ1gwN0NnbDJZWElnYjI1RmNuSnZjaUE5SUdaMWJtTjBhVzl1S0dWeWNtOXlLU0I3Q2drSmRHaHliM2NnYUdGNFpWOUZlR05sY0hScGIyNHVkR2h5YjNkdUtGc2lSWEp5YjNJZ1kyOWtaU0lzWlhKeWIzSXVZMjlrWlN3aWIySnFaV04wSWl4bGNuSnZjbDB1YW05cGJpZ2lJQ0lwS1RzS0NYMDdDZ2wzYVc1a2IzY3VhR1ZzY0NBOUlHWjFibU4wYVc5dUtDa2dld29KQ1hKbGRIVnliaUJCY21kaGJpNXZZbXBsWTNSR2NtOXRUV0Z3S0doaGVHVmZWVzV6WlhKcFlXeHBlbVZ5TG5KMWJpaG9ZWGhsWDFKbGMyOTFjbU5sTG1kbGRGTjBjbWx1WnlnaVgyaGxiSEJmYldGd0lpa3BLVHNLQ1gwN0NnbEJjbWRoYmk1emRHRnlkQ2gzYVc1a2IzY3VZMjl1Wm1sbktUc0tDV2xtS0hOb1lXdGhJQ0U5SUc1MWJHd3BJSHNLQ1FsemFHRnJZUzV3YjJ4NVptbHNiQzVwYm5OMFlXeHNRV3hzS0NrN0Nna0phV1lvYzJoaGEyRXVVR3hoZVdWeUxtbHpRbkp2ZDNObGNsTjFjSEJ2Y25SbFpDZ3BLU0I3Q2drSkNYWmhjaUJ3YkdGNVpYSWdQU0JUYUdGcllTNWxlSEJ2YzJWZmNHeGhlV1Z5S0c1bGR5QnphR0ZyWVM1UWJHRjVaWElvWkc5amRXMWxiblF1WjJWMFJXeGxiV1Z1ZEVKNVNXUW9JblpwWkdWdklpa3BLVHNLQ1FrSmRtRnlJSEJzWVhsbGNqRWdQU0J3YkdGNVpYSTdDZ2tKQ1haaGNpQjBiWEFnUFNCQmNtZGhiaTVoY21keklDRTlJRzUxYkd3Z0ppWWdUMkpxWldOMExuQnliM1J2ZEhsd1pTNW9ZWE5QZDI1UWNtOXdaWEowZVM1allXeHNLRUZ5WjJGdUxtRnlaM011YUN3aWMyMWhiR3hIWVhCTWFXMXBkQ0lwSUQ4Z2NHRnljMlZHYkc5aGRDaEJjbWRoYmk1aGNtZHpMbWhiSW5OdFlXeHNSMkZ3VEdsdGFYUWlYU2tnT2lBdU5Uc0tDUWtKZG1GeUlIUnRjREU3Q2drSkNXbG1LRUZ5WjJGdUxtRnlaM01nSVQwZ2JuVnNiQ0FtSmlCUFltcGxZM1F1Y0hKdmRHOTBlWEJsTG1oaGMwOTNibEJ5YjNCbGNuUjVMbU5oYkd3b1FYSm5ZVzR1WVhKbmN5NW9MQ0pxZFcxd1RHRnlaMlZIWVhCeklpa3BJSHNLQ1FrSkNYWmhjaUJmSUQwZ1FYSm5ZVzR1WVhKbmN5NW9XeUpxZFcxd1RHRnlaMlZIWVhCeklsMDdDZ2tKQ1FsMGJYQXhJRDBnZEhsd1pXOW1LRjhwSUQwOUlDSmliMjlzWldGdUlpQS9JRjhnT2lCZklDRTlJQ0ptWVd4elpTSTdDZ2tKQ1gwZ1pXeHpaU0I3Q2drSkNRbDBiWEF4SUQwZ2RISjFaVHNLQ1FrSmZRb0pDUWwyWVhJZ2RHMXdNaUE5SUVGeVoyRnVMbUZ5WjNNZ0lUMGdiblZzYkNBbUppQlBZbXBsWTNRdWNISnZkRzkwZVhCbExtaGhjMDkzYmxCeWIzQmxjblI1TG1OaGJHd29RWEpuWVc0dVlYSm5jeTVvTENKa2NtMWZjMlZ5ZG1WeVgzZHBaR1YyYVc1bElpa2dQeUJCY21kaGJpNWhjbWR6TG1oYkltUnliVjl6WlhKMlpYSmZkMmxrWlhacGJtVWlYU0E2SUNKb2RIUndjem92TDNkcFpHVjJhVzVsTFhCeWIzaDVMbUZ3Y0hOd2IzUXVZMjl0TDNCeWIzaDVJanNLQ1FrSmRtRnlJSFJ0Y0RNZ1BTQkJjbWRoYmk1aGNtZHpJQ0U5SUc1MWJHd2dKaVlnVDJKcVpXTjBMbkJ5YjNSdmRIbHdaUzVvWVhOUGQyNVFjbTl3WlhKMGVTNWpZV3hzS0VGeVoyRnVMbUZ5WjNNdWFDd2laSEp0WDNObGNuWmxjbDl3YkdGNWNtVmhaSGtpS1RzS0NRa0pjR3hoZVdWeU1TNWpiMjVtYVdkMWNtVW9leUJ6ZEhKbFlXMXBibWNnT2lCN0lITnRZV3hzUjJGd1RHbHRhWFFnT2lCMGJYQXNJR3AxYlhCTVlYSm5aVWRoY0hNZ09pQjBiWEF4ZlN3Z1pISnRJRG9nZXlCelpYSjJaWEp6SURvZ2V5QWlZMjl0TG5kcFpHVjJhVzVsTG1Gc2NHaGhJaUE2SUhSdGNESXNJQ0pqYjIwdWJXbGpjbTl6YjJaMExuQnNZWGx5WldGa2VTSWdPaUIwYlhBeklEOGdRWEpuWVc0dVlYSm5jeTVvV3lKa2NtMWZjMlZ5ZG1WeVgzQnNZWGx5WldGa2VTSmRJRG9nSW1oMGRIQnpPaTh2Y0d4aGVYSmxZV1I1TG1ScGNtVmpkSFJoY0hNdWJtVjBMM0J5TDNOMll5OXlhV2RvZEhOdFlXNWhaMlZ5TG1GemJYZy9VR3hoZVZKcFoyaDBQVEVtVlhObFUybHRjR3hsVG05dVVHVnljMmx6ZEdWdWRFeHBZMlZ1YzJVOU1TWlFiR0Y1Ulc1aFlteGxjbk05TnpnMk5qSTNSRGd0UXpKQk5pMDBORUpGTFRoR09EZ3RNRGhCUlRJMU5VSXdNVUUzSW4xOWZTazdDZ2tKQ1haaGNpQndiR0Y1WlhJeElEMGdjR3hoZVdWeU93b0pDUWwyWVhJZ2RHMXdPd29KQ1FscFppaEJjbWRoYmk1aGNtZHpJQ0U5SUc1MWJHd2dKaVlnVDJKcVpXTjBMbkJ5YjNSdmRIbHdaUzVvWVhOUGQyNVFjbTl3WlhKMGVTNWpZV3hzS0VGeVoyRnVMbUZ5WjNNdWFDd2ljMlYwVkdWNGRGUnlZV05yVm1semFXSnBiR2wwZVNJcEtTQjdDZ2tKQ1FsMllYSWdYeUE5SUVGeVoyRnVMbUZ5WjNNdWFGc2ljMlYwVkdWNGRGUnlZV05yVm1semFXSnBiR2wwZVNKZE93b0pDUWtKZEcxd0lEMGdkSGx3Wlc5bUtGOHBJRDA5SUNKaWIyOXNaV0Z1SWlBL0lGOGdPaUJmSUNFOUlDSm1ZV3h6WlNJN0Nna0pDWDBnWld4elpTQjdDZ2tKQ1FsMGJYQWdQU0IwY25WbE93b0pDUWw5Q2drSkNYQnNZWGxsY2pFdWMyVjBWR1Y0ZEZSeVlXTnJWbWx6YVdKcGJHbDBlU2gwYlhBcE93b0pDUWx3YkdGNVpYSXVZV1JrUlhabGJuUk1hWE4wWlc1bGNpZ2laWEp5YjNJaUxHOXVSWEp5YjNKRmRtVnVkQ2s3Q2drSkNYWmhjaUJ3Y205dGFYTmxJRDBnY0d4aGVXVnlMbXh2WVdRb2RYSnBLVHNLQ1FrSmNISnZiV2x6WlM1MGFHVnVLR1oxYm1OMGFXOXVLRjhwSUhzS0NRa0pDWFpoY2lCaFpHUk5aVzUxSUQwZ2QybHVaRzkzTG1Ga1pFMWxiblU3Q2drSkNRbDJZWElnZG1GeWFXRnVkRlJ5WVdOcmMweHBjM1FnUFNCd2JHRjVaWEl1WjJWMFZtRnlhV0Z1ZEZSeVlXTnJjeWdwT3dvSkNRa0pkbUZ5SUhaaGNtbGhiblJVY21GamEzTWdQU0JiZXlCMGFYUnNaU0E2SUNKQmRYUnZJSE4zYVhSamFDSXNJR2x1Wm04Z09pQnVkV3hzZlYwN0Nna0pDUWwyWVhJZ1gyY2dQU0F3T3dvSkNRa0pkMmhwYkdVb1gyY2dQQ0IyWVhKcFlXNTBWSEpoWTJ0elRHbHpkQzVzWlc1bmRHZ3BJSHNLQ1FrSkNRbDJZWElnYVc1bWJ5QTlJSFpoY21saGJuUlVjbUZqYTNOTWFYTjBXMTluWFRzS0NRa0pDUWtySzE5bk93b0pDUWtKQ1haaGNpQmlkeUE5SUUxaGRHZ3VZMlZwYkNocGJtWnZMblpwWkdWdlFtRnVaSGRwWkhSb0lDOGdNVEF3TUNrN0Nna0pDUWtKWW5jZ0xUMGdZbmNnSlNBMU1Ec0tDUWtKQ1FsMllYSnBZVzUwVkhKaFkydHpMbkIxYzJnb2V5QjBhWFJzWlNBNklDSWlJQ3NnYVc1bWJ5NXliMnhsYzFzd1hTQXJJQ0k2SWlBcklHSjNJQ3NnSW1zZ0lpQXJJRk4wWkM1emRISnBibWNvYVc1bWJ5NTJhV1JsYjBOdlpHVmpLU0FySUNJZ0x5QWlJQ3NnVFdGMGFDNXliM1Z1WkNocGJtWnZMbUYxWkdsdlFtRnVaSGRwWkhSb0lDOGdNVEF3TUNrZ0t5QWlheUFpSUNzZ1UzUmtMbk4wY21sdVp5aHBibVp2TG1GMVpHbHZRMjlrWldNcExDQnBibVp2SURvZ2FXNW1iMzBwT3dvSkNRa0pmUW9KQ1FrSllXUmtUV1Z1ZFNnaVZtRnlhV0Z1ZENCMGNtRmphM01pTEhaaGNtbGhiblJVY21GamEzTXNablZ1WTNScGIyNG9aU2tnZXdvSkNRa0pDV2xtS0dVdWRHRnlaMlYwTG5ObGJHVmpkR1ZrVDNCMGFXOXVjMXN3WFM1cGJtWnZJRDA5SUc1MWJHd3BJSHNLQ1FrSkNRa0pjR3hoZVdWeUxtTnZibVpwWjNWeVpTaDdJR0ZpY2lBNklIc2daVzVoWW14bFpDQTZJSFJ5ZFdWOWZTazdDZ2tKQ1FrSmZTQmxiSE5sSUhzS0NRa0pDUWtKY0d4aGVXVnlMbU52Ym1acFozVnlaU2g3SUdGaWNpQTZJSHNnWlc1aFlteGxaQ0E2SUdaaGJITmxmWDBwT3dvSkNRa0pDUWx3YkdGNVpYSXVjMlZzWldOMFZtRnlhV0Z1ZEZSeVlXTnJLR1V1ZEdGeVoyVjBMbk5sYkdWamRHVmtUM0IwYVc5dWMxc3dYUzVwYm1adkxIUnlkV1VwT3dvSkNRa0pDWDBLQ1FrSkNYMHBPd29KQ1FrSmRtRnlJR0YxWkdsdlRHRnVaM1ZoWjJWelFXNWtVbTlzWlhNZ1BTQndiR0Y1WlhJdVoyVjBRWFZrYVc5TVlXNW5kV0ZuWlhOQmJtUlNiMnhsY3lncE93b0pDUWtKZG1GeUlHRjFaR2x2VkhKaFkydHpJRDBnVzEwN0Nna0pDUWwyWVhJZ1gyY2dQU0F3T3dvSkNRa0pkMmhwYkdVb1gyY2dQQ0JoZFdScGIweGhibWQxWVdkbGMwRnVaRkp2YkdWekxteGxibWQwYUNrZ2V3b0pDUWtKQ1haaGNpQnBibVp2SUQwZ1lYVmthVzlNWVc1bmRXRm5aWE5CYm1SU2IyeGxjMXRmWjEwN0Nna0pDUWtKS3l0Zlp6c0tDUWtKQ1FsaGRXUnBiMVJ5WVdOcmN5NXdkWE5vS0hzZ2RHbDBiR1VnT2lBaUlpQXJJRk4wWkM1emRISnBibWNvYVc1bWJ5NXliMnhsS1NBcklDSTZJaUFySUZOMFpDNXpkSEpwYm1jb2FXNW1ieTVzWVc1bmRXRm5aU2tzSUdsdVptOGdPaUJwYm1admZTazdDZ2tKQ1FsOUNna0pDUWxoWkdSTlpXNTFLQ0pCZFdScGJ5QjBjbUZqYTNNaUxHRjFaR2x2VkhKaFkydHpMR1oxYm1OMGFXOXVLR1VwSUhzS0NRa0pDUWx3YkdGNVpYSXVjMlZzWldOMFFYVmthVzlNWVc1bmRXRm5aU2hsTG5SaGNtZGxkQzV6Wld4bFkzUmxaRTl3ZEdsdmJuTmJNRjB1YVc1bWJ5NXNZVzVuZFdGblpTeGxMblJoY21kbGRDNXpaV3hsWTNSbFpFOXdkR2x2Ym5OYk1GMHVhVzVtYnk1eWIyeGxLVHNLQ1FrSkNYMHBPd29KQ1FrSmRtRnlJSFJsZUhSTVlXNW5kV0ZuWlhOQmJtUlNiMnhsY3lBOUlIQnNZWGxsY2k1blpYUlVaWGgwVEdGdVozVmhaMlZ6UVc1a1VtOXNaWE1vS1RzS0NRa0pDWFpoY2lCMFpYaDBWSEpoWTJ0eklEMGdXMTA3Q2drSkNRbDJZWElnWDJjZ1BTQXdPd29KQ1FrSmQyaHBiR1VvWDJjZ1BDQjBaWGgwVEdGdVozVmhaMlZ6UVc1a1VtOXNaWE11YkdWdVozUm9LU0I3Q2drSkNRa0pkbUZ5SUdsdVptOGdQU0IwWlhoMFRHRnVaM1ZoWjJWelFXNWtVbTlzWlhOYlgyZGRPd29KQ1FrSkNTc3JYMmM3Q2drSkNRa0pkR1Y0ZEZSeVlXTnJjeTV3ZFhOb0tIc2dkR2wwYkdVZ09pQWlJaUFySUZOMFpDNXpkSEpwYm1jb2FXNW1ieTV5YjJ4bEtTQXJJQ0k2SWlBcklGTjBaQzV6ZEhKcGJtY29hVzVtYnk1c1lXNW5kV0ZuWlNrc0lHbHVabThnT2lCcGJtWnZmU2s3Q2drSkNRbDlDZ2tKQ1FscFppaDBaWGgwVkhKaFkydHpMbXhsYm1kMGFDQStJREFwSUhzS0NRa0pDUWxoWkdSTlpXNTFLQ0pVWlhoMElIUnlZV05yY3lJc2RHVjRkRlJ5WVdOcmN5eG1kVzVqZEdsdmJpaGxLU0I3Q2drSkNRa0pDWEJzWVhsbGNpNXpaV3hsWTNSVVpYaDBUR0Z1WjNWaFoyVW9aUzUwWVhKblpYUXVjMlZzWldOMFpXUlBjSFJwYjI1eld6QmRMbWx1Wm04dWJHRnVaM1ZoWjJVc1pTNTBZWEpuWlhRdWMyVnNaV04wWldSUGNIUnBiMjV6V3pCZExtbHVabTh1Y205c1pTazdDZ2tKQ1FrSmZTazdDZ2tKQ1FsOUNna0pDWDBwTG1OaGRHTm9LRzl1UlhKeWIzSXBPd29KQ1gwS0NYMEtmVHNLVTJoaGEyRXVaWGh3YjNObFgzQnNZWGxsY2lBOUlHWjFibU4wYVc5dUtIQXBJSHNLQ1hkcGJtUnZkeTV3YkdGNVpYSWdQU0J3T3dvSmNtVjBkWEp1SUhBN0NuMDdDblpoY2lCVGRHUWdQU0JtZFc1amRHbHZiaWdwSUhzZ2ZUc0tKR2g0UTJ4aGMzTmxjMXNpVTNSa0lsMGdQU0JUZEdRN0NsTjBaQzVmWDI1aGJXVmZYeUE5SUhSeWRXVTdDbE4wWkM1emRISnBibWNnUFNCbWRXNWpkR2x2YmloektTQjdDZ2x5WlhSMWNtNGdhbk5mUW05dmRDNWZYM04wY21sdVoxOXlaV01vY3l3aUlpazdDbjA3Q25aaGNpQlVlWEJsSUQwZ1puVnVZM1JwYjI0b0tTQjdJSDA3Q2lSb2VFTnNZWE56WlhOYklsUjVjR1VpWFNBOUlGUjVjR1U3Q2xSNWNHVXVYMTl1WVcxbFgxOGdQU0IwY25WbE93cFVlWEJsTG1OeVpXRjBaVVZ1ZFcwZ1BTQm1kVzVqZEdsdmJpaGxMR052Ym5OMGNpeHdZWEpoYlhNcElIc0tDWFpoY2lCbUlEMGdVbVZtYkdWamRDNW1hV1ZzWkNobExHTnZibk4wY2lrN0NnbHBaaWhtSUQwOUlHNTFiR3dwSUhzS0NRbDBhSEp2ZHlCb1lYaGxYMFY0WTJWd2RHbHZiaTUwYUhKdmQyNG9JazV2SUhOMVkyZ2dZMjl1YzNSeWRXTjBiM0lnSWlBcklHTnZibk4wY2lrN0NnbDlDZ2xwWmloU1pXWnNaV04wTG1selJuVnVZM1JwYjI0b1ppa3BJSHNLQ1FscFppaHdZWEpoYlhNZ1BUMGdiblZzYkNrZ2V3b0pDUWwwYUhKdmR5Qm9ZWGhsWDBWNFkyVndkR2x2Ymk1MGFISnZkMjRvSWtOdmJuTjBjblZqZEc5eUlDSWdLeUJqYjI1emRISWdLeUFpSUc1bFpXUWdjR0Z5WVcxbGRHVnljeUlwT3dvSkNYMEtDUWx5WlhSMWNtNGdaaTVoY0hCc2VTaGxMSEJoY21GdGN5azdDZ2w5Q2dscFppaHdZWEpoYlhNZ0lUMGdiblZzYkNBbUppQndZWEpoYlhNdWJHVnVaM1JvSUNFOUlEQXBJSHNLQ1FsMGFISnZkeUJvWVhobFgwVjRZMlZ3ZEdsdmJpNTBhSEp2ZDI0b0lrTnZibk4wY25WamRHOXlJQ0lnS3lCamIyNXpkSElnS3lBaUlHUnZaWE1nYm05MElHNWxaV1FnY0dGeVlXMWxkR1Z5Y3lJcE93b0pmUW9KY21WMGRYSnVJR1k3Q24wN0NuWmhjaUJvWVhobFgwbE5ZWEFnUFNCbWRXNWpkR2x2YmlncElIc2dmVHNLSkdoNFEyeGhjM05sYzFzaWFHRjRaUzVKVFdGd0lsMGdQU0JvWVhobFgwbE5ZWEE3Q21oaGVHVmZTVTFoY0M1ZlgyNWhiV1ZmWHlBOUlIUnlkV1U3Q25aaGNpQm9ZWGhsWDBWNFkyVndkR2x2YmlBOUlHWjFibU4wYVc5dUtHMWxjM05oWjJVc2NISmxkbWx2ZFhNc2JtRjBhWFpsS1NCN0NnbEZjbkp2Y2k1allXeHNLSFJvYVhNc2JXVnpjMkZuWlNrN0NnbDBhR2x6TG0xbGMzTmhaMlVnUFNCdFpYTnpZV2RsT3dvSmRHaHBjeTVmWDNCeVpYWnBiM1Z6UlhoalpYQjBhVzl1SUQwZ2NISmxkbWx2ZFhNN0NnbDBhR2x6TGw5ZmJtRjBhWFpsUlhoalpYQjBhVzl1SUQwZ2JtRjBhWFpsSUNFOUlHNTFiR3dnUHlCdVlYUnBkbVVnT2lCMGFHbHpPd3A5T3dva2FIaERiR0Z6YzJWeld5Sm9ZWGhsTGtWNFkyVndkR2x2YmlKZElEMGdhR0Y0WlY5RmVHTmxjSFJwYjI0N0NtaGhlR1ZmUlhoalpYQjBhVzl1TGw5ZmJtRnRaVjlmSUQwZ2RISjFaVHNLYUdGNFpWOUZlR05sY0hScGIyNHVkR2h5YjNkdUlEMGdablZ1WTNScGIyNG9kbUZzZFdVcElIc0tDV2xtS0Nnb2RtRnNkV1VwSUdsdWMzUmhibU5sYjJZZ2FHRjRaVjlGZUdObGNIUnBiMjRwS1NCN0Nna0pjbVYwZFhKdUlIWmhiSFZsTG1kbGRGOXVZWFJwZG1Vb0tUc0tDWDBnWld4elpTQnBaaWdvS0haaGJIVmxLU0JwYm5OMFlXNWpaVzltSUVWeWNtOXlLU2tnZXdvSkNYSmxkSFZ5YmlCMllXeDFaVHNLQ1gwZ1pXeHpaU0I3Q2drSmRtRnlJR1VnUFNCdVpYY2dhR0Y0WlY5V1lXeDFaVVY0WTJWd2RHbHZiaWgyWVd4MVpTazdDZ2tKY21WMGRYSnVJR1U3Q2dsOUNuMDdDbWhoZUdWZlJYaGpaWEIwYVc5dUxsOWZjM1Z3WlhKZlh5QTlJRVZ5Y205eU93cG9ZWGhsWDBWNFkyVndkR2x2Ymk1d2NtOTBiM1I1Y0dVZ1BTQWtaWGgwWlc1a0tFVnljbTl5TG5CeWIzUnZkSGx3WlN4N0NnbG5aWFJmYm1GMGFYWmxPaUJtZFc1amRHbHZiaWdwSUhzS0NRbHlaWFIxY200Z2RHaHBjeTVmWDI1aGRHbDJaVVY0WTJWd2RHbHZianNLQ1gwS2ZTazdDblpoY2lCb1lYaGxYMUpsYzI5MWNtTmxJRDBnWm5WdVkzUnBiMjRvS1NCN0lIMDdDaVJvZUVOc1lYTnpaWE5iSW1oaGVHVXVVbVZ6YjNWeVkyVWlYU0E5SUdoaGVHVmZVbVZ6YjNWeVkyVTdDbWhoZUdWZlVtVnpiM1Z5WTJVdVgxOXVZVzFsWDE4Z1BTQjBjblZsT3dwb1lYaGxYMUpsYzI5MWNtTmxMbWRsZEZOMGNtbHVaeUE5SUdaMWJtTjBhVzl1S0c1aGJXVXBJSHNLQ1haaGNpQmZaeUE5SURBN0NnbDJZWElnWDJjeElEMGdhR0Y0WlY5U1pYTnZkWEpqWlM1amIyNTBaVzUwT3dvSmQyaHBiR1VvWDJjZ1BDQmZaekV1YkdWdVozUm9LU0I3Q2drSmRtRnlJSGdnUFNCZlp6RmJYMmRkT3dvSkNTc3JYMmM3Q2drSmFXWW9lQzV1WVcxbElEMDlJRzVoYldVcElIc0tDUWtKYVdZb2VDNXpkSElnSVQwZ2JuVnNiQ2tnZXdvSkNRa0pjbVYwZFhKdUlIZ3VjM1J5T3dvSkNRbDlDZ2tKQ1haaGNpQmlJRDBnYUdGNFpWOWpjbmx3ZEc5ZlFtRnpaVFkwTG1SbFkyOWtaU2g0TG1SaGRHRXBPd29KQ1FseVpYUjFjbTRnWWk1MGIxTjBjbWx1WnlncE93b0pDWDBLQ1gwS0NYSmxkSFZ5YmlCdWRXeHNPd3A5T3dwMllYSWdhR0Y0WlY5ZkpGVnVjMlZ5YVdGc2FYcGxjbDlFWldaaGRXeDBVbVZ6YjJ4MlpYSWdQU0JtZFc1amRHbHZiaWdwSUhzS2ZUc0tKR2g0UTJ4aGMzTmxjMXNpYUdGNFpTNWZWVzV6WlhKcFlXeHBlbVZ5TGtSbFptRjFiSFJTWlhOdmJIWmxjaUpkSUQwZ2FHRjRaVjlmSkZWdWMyVnlhV0ZzYVhwbGNsOUVaV1poZFd4MFVtVnpiMngyWlhJN0NtaGhlR1ZmWHlSVmJuTmxjbWxoYkdsNlpYSmZSR1ZtWVhWc2RGSmxjMjlzZG1WeUxsOWZibUZ0WlY5ZklEMGdkSEoxWlRzS2FHRjRaVjlmSkZWdWMyVnlhV0ZzYVhwbGNsOUVaV1poZFd4MFVtVnpiMngyWlhJdWNISnZkRzkwZVhCbElEMGdld29KY21WemIyeDJaVU5zWVhOek9pQm1kVzVqZEdsdmJpaHVZVzFsS1NCN0Nna0pjbVYwZFhKdUlDUm9lRU5zWVhOelpYTmJibUZ0WlYwN0NnbDlDZ2tzY21WemIyeDJaVVZ1ZFcwNklHWjFibU4wYVc5dUtHNWhiV1VwSUhzS0NRbHlaWFIxY200Z0pHaDRSVzUxYlhOYmJtRnRaVjA3Q2dsOUNuMDdDblpoY2lCb1lYaGxYMVZ1YzJWeWFXRnNhWHBsY2lBOUlHWjFibU4wYVc5dUtHSjFaaWtnZXdvSmRHaHBjeTVpZFdZZ1BTQmlkV1k3Q2dsMGFHbHpMbXhsYm1kMGFDQTlJSFJvYVhNdVluVm1MbXhsYm1kMGFEc0tDWFJvYVhNdWNHOXpJRDBnTURzS0NYUm9hWE11YzJOaFkyaGxJRDBnVzEwN0NnbDBhR2x6TG1OaFkyaGxJRDBnVzEwN0NnbDJZWElnY2lBOUlHaGhlR1ZmVlc1elpYSnBZV3hwZW1WeUxrUkZSa0ZWVEZSZlVrVlRUMHhXUlZJN0NnbHBaaWh5SUQwOUlHNTFiR3dwSUhzS0NRbHlJRDBnYm1WM0lHaGhlR1ZmWHlSVmJuTmxjbWxoYkdsNlpYSmZSR1ZtWVhWc2RGSmxjMjlzZG1WeUtDazdDZ2tKYUdGNFpWOVZibk5sY21saGJHbDZaWEl1UkVWR1FWVk1WRjlTUlZOUFRGWkZVaUE5SUhJN0NnbDlDZ2wwYUdsekxuSmxjMjlzZG1WeUlEMGdjanNLZlRzS0pHaDRRMnhoYzNObGMxc2lhR0Y0WlM1VmJuTmxjbWxoYkdsNlpYSWlYU0E5SUdoaGVHVmZWVzV6WlhKcFlXeHBlbVZ5T3dwb1lYaGxYMVZ1YzJWeWFXRnNhWHBsY2k1ZlgyNWhiV1ZmWHlBOUlIUnlkV1U3Q21oaGVHVmZWVzV6WlhKcFlXeHBlbVZ5TG1sdWFYUkRiMlJsY3lBOUlHWjFibU4wYVc5dUtDa2dld29KZG1GeUlHTnZaR1Z6SUQwZ1cxMDdDZ2wyWVhJZ1gyY2dQU0F3T3dvSmRtRnlJRjluTVNBOUlHaGhlR1ZmVlc1elpYSnBZV3hwZW1WeUxrSkJVMFUyTkM1c1pXNW5kR2c3Q2dsM2FHbHNaU2hmWnlBOElGOW5NU2tnZXdvSkNYWmhjaUJwSUQwZ1gyY3JLenNLQ1FsamIyUmxjMXRvWVhobFgxVnVjMlZ5YVdGc2FYcGxjaTVDUVZORk5qUXVZMmhoY2tOdlpHVkJkQ2hwS1YwZ1BTQnBPd29KZlFvSmNtVjBkWEp1SUdOdlpHVnpPd3A5T3dwb1lYaGxYMVZ1YzJWeWFXRnNhWHBsY2k1eWRXNGdQU0JtZFc1amRHbHZiaWgyS1NCN0NnbHlaWFIxY200Z2JtVjNJR2hoZUdWZlZXNXpaWEpwWVd4cGVtVnlLSFlwTG5WdWMyVnlhV0ZzYVhwbEtDazdDbjA3Q21oaGVHVmZWVzV6WlhKcFlXeHBlbVZ5TG5CeWIzUnZkSGx3WlNBOUlIc0tDWEpsWVdSRWFXZHBkSE02SUdaMWJtTjBhVzl1S0NrZ2V3b0pDWFpoY2lCcklEMGdNRHNLQ1FsMllYSWdjeUE5SUdaaGJITmxPd29KQ1haaGNpQm1jRzl6SUQwZ2RHaHBjeTV3YjNNN0Nna0pkMmhwYkdVb2RISjFaU2tnZXdvSkNRbDJZWElnWXlBOUlIUm9hWE11WW5WbUxtTm9ZWEpEYjJSbFFYUW9kR2hwY3k1d2IzTXBPd29KQ1FscFppaGpJQ0U5SUdNcElIc0tDUWtKQ1dKeVpXRnJPd29KQ1FsOUNna0pDV2xtS0dNZ1BUMGdORFVwSUhzS0NRa0pDV2xtS0hSb2FYTXVjRzl6SUNFOUlHWndiM01wSUhzS0NRa0pDUWxpY21WaGF6c0tDUWtKQ1gwS0NRa0pDWE1nUFNCMGNuVmxPd29KQ1FrSmRHaHBjeTV3YjNNckt6c0tDUWtKQ1dOdmJuUnBiblZsT3dvSkNRbDlDZ2tKQ1dsbUtHTWdQQ0EwT0NCOGZDQmpJRDRnTlRjcElIc0tDUWtKQ1dKeVpXRnJPd29KQ1FsOUNna0pDV3NnUFNCcklDb2dNVEFnS3lBb1l5QXRJRFE0S1RzS0NRa0pkR2hwY3k1d2IzTXJLenNLQ1FsOUNna0phV1lvY3lrZ2V3b0pDUWxySUNvOUlDMHhPd29KQ1gwS0NRbHlaWFIxY200Z2F6c0tDWDBLQ1N4eVpXRmtSbXh2WVhRNklHWjFibU4wYVc5dUtDa2dld29KQ1haaGNpQndNU0E5SUhSb2FYTXVjRzl6T3dvSkNYZG9hV3hsS0hSeWRXVXBJSHNLQ1FrSmRtRnlJR01nUFNCMGFHbHpMbUoxWmk1amFHRnlRMjlrWlVGMEtIUm9hWE11Y0c5ektUc0tDUWtKYVdZb1l5QWhQU0JqS1NCN0Nna0pDUWxpY21WaGF6c0tDUWtKZlFvSkNRbHBaaWhqSUQ0OUlEUXpJQ1ltSUdNZ1BDQTFPQ0I4ZkNCaklEMDlJREV3TVNCOGZDQmpJRDA5SURZNUtTQjdDZ2tKQ1FsMGFHbHpMbkJ2Y3lzck93b0pDUWw5SUdWc2MyVWdld29KQ1FrSlluSmxZV3M3Q2drSkNYMEtDUWw5Q2drSmNtVjBkWEp1SUhCaGNuTmxSbXh2WVhRb1NIaFBkbVZ5Y21sa1pYTXVjM1ZpYzNSeUtIUm9hWE11WW5WbUxIQXhMSFJvYVhNdWNHOXpJQzBnY0RFcEtUc0tDWDBLQ1N4MWJuTmxjbWxoYkdsNlpVOWlhbVZqZERvZ1puVnVZM1JwYjI0b2J5a2dld29KQ1hkb2FXeGxLSFJ5ZFdVcElIc0tDUWtKYVdZb2RHaHBjeTV3YjNNZ1BqMGdkR2hwY3k1c1pXNW5kR2dwSUhzS0NRa0pDWFJvY205M0lHaGhlR1ZmUlhoalpYQjBhVzl1TG5Sb2NtOTNiaWdpU1c1MllXeHBaQ0J2WW1wbFkzUWlLVHNLQ1FrSmZRb0pDUWxwWmloMGFHbHpMbUoxWmk1amFHRnlRMjlrWlVGMEtIUm9hWE11Y0c5ektTQTlQU0F4TURNcElIc0tDUWtKQ1dKeVpXRnJPd29KQ1FsOUNna0pDWFpoY2lCcklEMGdkR2hwY3k1MWJuTmxjbWxoYkdsNlpTZ3BPd29KQ1FscFppaDBlWEJsYjJZb2F5a2dJVDBnSW5OMGNtbHVaeUlwSUhzS0NRa0pDWFJvY205M0lHaGhlR1ZmUlhoalpYQjBhVzl1TG5Sb2NtOTNiaWdpU1c1MllXeHBaQ0J2WW1wbFkzUWdhMlY1SWlrN0Nna0pDWDBLQ1FrSmRtRnlJSFlnUFNCMGFHbHpMblZ1YzJWeWFXRnNhWHBsS0NrN0Nna0pDVzliYTEwZ1BTQjJPd29KQ1gwS0NRbDBhR2x6TG5CdmN5c3JPd29KZlFvSkxIVnVjMlZ5YVdGc2FYcGxSVzUxYlRvZ1puVnVZM1JwYjI0b1pXUmxZMndzZEdGbktTQjdDZ2tKYVdZb2RHaHBjeTVpZFdZdVkyaGhja052WkdWQmRDaDBhR2x6TG5CdmN5c3JLU0FoUFNBMU9Da2dld29KQ1FsMGFISnZkeUJvWVhobFgwVjRZMlZ3ZEdsdmJpNTBhSEp2ZDI0b0lrbHVkbUZzYVdRZ1pXNTFiU0JtYjNKdFlYUWlLVHNLQ1FsOUNna0pkbUZ5SUc1aGNtZHpJRDBnZEdocGN5NXlaV0ZrUkdsbmFYUnpLQ2s3Q2drSmFXWW9ibUZ5WjNNZ1BUMGdNQ2tnZXdvSkNRbHlaWFIxY200Z1ZIbHdaUzVqY21WaGRHVkZiblZ0S0dWa1pXTnNMSFJoWnlrN0Nna0pmUW9KQ1haaGNpQmhjbWR6SUQwZ1cxMDdDZ2tKZDJocGJHVW9ibUZ5WjNNdExTQStJREFwSUdGeVozTXVjSFZ6YUNoMGFHbHpMblZ1YzJWeWFXRnNhWHBsS0NrcE93b0pDWEpsZEhWeWJpQlVlWEJsTG1OeVpXRjBaVVZ1ZFcwb1pXUmxZMndzZEdGbkxHRnlaM01wT3dvSmZRb0pMSFZ1YzJWeWFXRnNhWHBsT2lCbWRXNWpkR2x2YmlncElIc0tDUWx6ZDJsMFkyZ29kR2hwY3k1aWRXWXVZMmhoY2tOdlpHVkJkQ2gwYUdsekxuQnZjeXNyS1NrZ2V3b0pDV05oYzJVZ05qVTZDZ2tKQ1haaGNpQnVZVzFsSUQwZ2RHaHBjeTUxYm5ObGNtbGhiR2w2WlNncE93b0pDUWwyWVhJZ1kyd2dQU0IwYUdsekxuSmxjMjlzZG1WeUxuSmxjMjlzZG1WRGJHRnpjeWh1WVcxbEtUc0tDUWtKYVdZb1kyd2dQVDBnYm5Wc2JDa2dld29KQ1FrSmRHaHliM2NnYUdGNFpWOUZlR05sY0hScGIyNHVkR2h5YjNkdUtDSkRiR0Z6Y3lCdWIzUWdabTkxYm1RZ0lpQXJJRzVoYldVcE93b0pDUWw5Q2drSkNYSmxkSFZ5YmlCamJEc0tDUWxqWVhObElEWTJPZ29KQ1FsMllYSWdibUZ0WlNBOUlIUm9hWE11ZFc1elpYSnBZV3hwZW1Vb0tUc0tDUWtKZG1GeUlHVWdQU0IwYUdsekxuSmxjMjlzZG1WeUxuSmxjMjlzZG1WRmJuVnRLRzVoYldVcE93b0pDUWxwWmlobElEMDlJRzUxYkd3cElIc0tDUWtKQ1hSb2NtOTNJR2hoZUdWZlJYaGpaWEIwYVc5dUxuUm9jbTkzYmlnaVJXNTFiU0J1YjNRZ1ptOTFibVFnSWlBcklHNWhiV1VwT3dvSkNRbDlDZ2tKQ1hKbGRIVnliaUJsT3dvSkNXTmhjMlVnTmpjNkNna0pDWFpoY2lCdVlXMWxJRDBnZEdocGN5NTFibk5sY21saGJHbDZaU2dwT3dvSkNRbDJZWElnWTJ3Z1BTQjBhR2x6TG5KbGMyOXNkbVZ5TG5KbGMyOXNkbVZEYkdGemN5aHVZVzFsS1RzS0NRa0phV1lvWTJ3Z1BUMGdiblZzYkNrZ2V3b0pDUWtKZEdoeWIzY2dhR0Y0WlY5RmVHTmxjSFJwYjI0dWRHaHliM2R1S0NKRGJHRnpjeUJ1YjNRZ1ptOTFibVFnSWlBcklHNWhiV1VwT3dvSkNRbDlDZ2tKQ1haaGNpQnZJRDBnVDJKcVpXTjBMbU55WldGMFpTaGpiQzV3Y205MGIzUjVjR1VwT3dvSkNRbDBhR2x6TG1OaFkyaGxMbkIxYzJnb2J5azdDZ2tKQ1c4dWFIaFZibk5sY21saGJHbDZaU2gwYUdsektUc0tDUWtKYVdZb2RHaHBjeTVpZFdZdVkyaGhja052WkdWQmRDaDBhR2x6TG5CdmN5c3JLU0FoUFNBeE1ETXBJSHNLQ1FrSkNYUm9jbTkzSUdoaGVHVmZSWGhqWlhCMGFXOXVMblJvY205M2JpZ2lTVzUyWVd4cFpDQmpkWE4wYjIwZ1pHRjBZU0lwT3dvSkNRbDlDZ2tKQ1hKbGRIVnliaUJ2T3dvSkNXTmhjMlVnTnpjNkNna0pDWFpoY2lCb0lEMGdibVYzSUdoaGVHVmZaSE5mVDJKcVpXTjBUV0Z3S0NrN0Nna0pDWFJvYVhNdVkyRmphR1V1Y0hWemFDaG9LVHNLQ1FrSmRtRnlJR0oxWmlBOUlIUm9hWE11WW5WbU93b0pDUWwzYUdsc1pTaDBhR2x6TG1KMVppNWphR0Z5UTI5a1pVRjBLSFJvYVhNdWNHOXpLU0FoUFNBeE1EUXBJSHNLQ1FrSkNYWmhjaUJ6SUQwZ2RHaHBjeTUxYm5ObGNtbGhiR2w2WlNncE93b0pDUWtKYUM1elpYUW9jeXgwYUdsekxuVnVjMlZ5YVdGc2FYcGxLQ2twT3dvSkNRbDlDZ2tKQ1hSb2FYTXVjRzl6S3lzN0Nna0pDWEpsZEhWeWJpQm9Pd29KQ1dOaGMyVWdPREk2Q2drSkNYWmhjaUJ1SUQwZ2RHaHBjeTV5WldGa1JHbG5hWFJ6S0NrN0Nna0pDV2xtS0c0Z1BDQXdJSHg4SUc0Z1BqMGdkR2hwY3k1elkyRmphR1V1YkdWdVozUm9LU0I3Q2drSkNRbDBhSEp2ZHlCb1lYaGxYMFY0WTJWd2RHbHZiaTUwYUhKdmQyNG9Ja2x1ZG1Gc2FXUWdjM1J5YVc1bklISmxabVZ5Wlc1alpTSXBPd29KQ1FsOUNna0pDWEpsZEhWeWJpQjBhR2x6TG5OallXTm9aVnR1WFRzS0NRbGpZWE5sSURrM09nb0pDUWwyWVhJZ1luVm1JRDBnZEdocGN5NWlkV1k3Q2drSkNYWmhjaUJoSUQwZ1cxMDdDZ2tKQ1hSb2FYTXVZMkZqYUdVdWNIVnphQ2hoS1RzS0NRa0pkMmhwYkdVb2RISjFaU2tnZXdvSkNRa0pkbUZ5SUdNZ1BTQjBhR2x6TG1KMVppNWphR0Z5UTI5a1pVRjBLSFJvYVhNdWNHOXpLVHNLQ1FrSkNXbG1LR01nUFQwZ01UQTBLU0I3Q2drSkNRa0pkR2hwY3k1d2IzTXJLenNLQ1FrSkNRbGljbVZoYXpzS0NRa0pDWDBLQ1FrSkNXbG1LR01nUFQwZ01URTNLU0I3Q2drSkNRa0pkR2hwY3k1d2IzTXJLenNLQ1FrSkNRbDJZWElnYmlBOUlIUm9hWE11Y21WaFpFUnBaMmwwY3lncE93b0pDUWtKQ1dGYllTNXNaVzVuZEdnZ0t5QnVJQzBnTVYwZ1BTQnVkV3hzT3dvSkNRa0pmU0JsYkhObElIc0tDUWtKQ1FsaExuQjFjMmdvZEdocGN5NTFibk5sY21saGJHbDZaU2dwS1RzS0NRa0pDWDBLQ1FrSmZRb0pDUWx5WlhSMWNtNGdZVHNLQ1FsallYTmxJRGs0T2dvSkNRbDJZWElnYUNBOUlHNWxkeUJvWVhobFgyUnpYMU4wY21sdVowMWhjQ2dwT3dvSkNRbDBhR2x6TG1OaFkyaGxMbkIxYzJnb2FDazdDZ2tKQ1haaGNpQmlkV1lnUFNCMGFHbHpMbUoxWmpzS0NRa0pkMmhwYkdVb2RHaHBjeTVpZFdZdVkyaGhja052WkdWQmRDaDBhR2x6TG5CdmN5a2dJVDBnTVRBMEtTQjdDZ2tKQ1FsMllYSWdjeUE5SUhSb2FYTXVkVzV6WlhKcFlXeHBlbVVvS1RzS0NRa0pDWFpoY2lCMllXeDFaU0E5SUhSb2FYTXVkVzV6WlhKcFlXeHBlbVVvS1RzS0NRa0pDV2d1YUZ0elhTQTlJSFpoYkhWbE93b0pDUWw5Q2drSkNYUm9hWE11Y0c5ekt5czdDZ2tKQ1hKbGRIVnliaUJvT3dvSkNXTmhjMlVnT1RrNkNna0pDWFpoY2lCdVlXMWxJRDBnZEdocGN5NTFibk5sY21saGJHbDZaU2dwT3dvSkNRbDJZWElnWTJ3Z1BTQjBhR2x6TG5KbGMyOXNkbVZ5TG5KbGMyOXNkbVZEYkdGemN5aHVZVzFsS1RzS0NRa0phV1lvWTJ3Z1BUMGdiblZzYkNrZ2V3b0pDUWtKZEdoeWIzY2dhR0Y0WlY5RmVHTmxjSFJwYjI0dWRHaHliM2R1S0NKRGJHRnpjeUJ1YjNRZ1ptOTFibVFnSWlBcklHNWhiV1VwT3dvSkNRbDlDZ2tKQ1haaGNpQnZJRDBnVDJKcVpXTjBMbU55WldGMFpTaGpiQzV3Y205MGIzUjVjR1VwT3dvSkNRbDBhR2x6TG1OaFkyaGxMbkIxYzJnb2J5azdDZ2tKQ1hSb2FYTXVkVzV6WlhKcFlXeHBlbVZQWW1wbFkzUW9ieWs3Q2drSkNYSmxkSFZ5YmlCdk93b0pDV05oYzJVZ01UQXdPZ29KQ1FseVpYUjFjbTRnZEdocGN5NXlaV0ZrUm14dllYUW9LVHNLQ1FsallYTmxJREV3TWpvS0NRa0pjbVYwZFhKdUlHWmhiSE5sT3dvSkNXTmhjMlVnTVRBMU9nb0pDUWx5WlhSMWNtNGdkR2hwY3k1eVpXRmtSR2xuYVhSektDazdDZ2tKWTJGelpTQXhNRFk2Q2drSkNYWmhjaUJ1WVcxbElEMGdkR2hwY3k1MWJuTmxjbWxoYkdsNlpTZ3BPd29KQ1FsMllYSWdaV1JsWTJ3Z1BTQjBhR2x6TG5KbGMyOXNkbVZ5TG5KbGMyOXNkbVZGYm5WdEtHNWhiV1VwT3dvSkNRbHBaaWhsWkdWamJDQTlQU0J1ZFd4c0tTQjdDZ2tKQ1FsMGFISnZkeUJvWVhobFgwVjRZMlZ3ZEdsdmJpNTBhSEp2ZDI0b0lrVnVkVzBnYm05MElHWnZkVzVrSUNJZ0t5QnVZVzFsS1RzS0NRa0pmUW9KQ1FsMGFHbHpMbkJ2Y3lzck93b0pDUWwyWVhJZ2FXNWtaWGdnUFNCMGFHbHpMbkpsWVdSRWFXZHBkSE1vS1RzS0NRa0pkbUZ5SUY5MGFHbHpJRDBnWldSbFkyd3VYMTlqYjI1emRISjFZM1J6WDE4N0Nna0pDWFpoY2lCeVpYTjFiSFFnUFNCdVpYY2dRWEp5WVhrb1gzUm9hWE11YkdWdVozUm9LVHNLQ1FrSmRtRnlJRjluSUQwZ01Ec0tDUWtKZG1GeUlGOW5NU0E5SUY5MGFHbHpMbXhsYm1kMGFEc0tDUWtKZDJocGJHVW9YMmNnUENCZlp6RXBJSHNLQ1FrSkNYWmhjaUJwSUQwZ1gyY3JLenNLQ1FrSkNYSmxjM1ZzZEZ0cFhTQTlJRjkwYUdselcybGRMbDlvZUY5dVlXMWxPd29KQ1FsOUNna0pDWFpoY2lCMFlXY2dQU0J5WlhOMWJIUmJhVzVrWlhoZE93b0pDUWxwWmloMFlXY2dQVDBnYm5Wc2JDa2dld29KQ1FrSmRHaHliM2NnYUdGNFpWOUZlR05sY0hScGIyNHVkR2h5YjNkdUtDSlZibXR1YjNkdUlHVnVkVzBnYVc1a1pYZ2dJaUFySUc1aGJXVWdLeUFpUUNJZ0t5QnBibVJsZUNrN0Nna0pDWDBLQ1FrSmRtRnlJR1VnUFNCMGFHbHpMblZ1YzJWeWFXRnNhWHBsUlc1MWJTaGxaR1ZqYkN4MFlXY3BPd29KQ1FsMGFHbHpMbU5oWTJobExuQjFjMmdvWlNrN0Nna0pDWEpsZEhWeWJpQmxPd29KQ1dOaGMyVWdNVEEzT2dvSkNRbHlaWFIxY200Z1RtRk9Pd29KQ1dOaGMyVWdNVEE0T2dvSkNRbDJZWElnYkNBOUlHNWxkeUJvWVhobFgyUnpYMHhwYzNRb0tUc0tDUWtKZEdocGN5NWpZV05vWlM1d2RYTm9LR3dwT3dvSkNRbDJZWElnWW5WbUlEMGdkR2hwY3k1aWRXWTdDZ2tKQ1hkb2FXeGxLSFJvYVhNdVluVm1MbU5vWVhKRGIyUmxRWFFvZEdocGN5NXdiM01wSUNFOUlERXdOQ2tnYkM1aFpHUW9kR2hwY3k1MWJuTmxjbWxoYkdsNlpTZ3BLVHNLQ1FrSmRHaHBjeTV3YjNNckt6c0tDUWtKY21WMGRYSnVJR3c3Q2drSlkyRnpaU0F4TURrNkNna0pDWEpsZEhWeWJpQXRTVzVtYVc1cGRIazdDZ2tKWTJGelpTQXhNVEE2Q2drSkNYSmxkSFZ5YmlCdWRXeHNPd29KQ1dOaGMyVWdNVEV4T2dvSkNRbDJZWElnYnlBOUlIc2dmVHNLQ1FrSmRHaHBjeTVqWVdOb1pTNXdkWE5vS0c4cE93b0pDUWwwYUdsekxuVnVjMlZ5YVdGc2FYcGxUMkpxWldOMEtHOHBPd29KQ1FseVpYUjFjbTRnYnpzS0NRbGpZWE5sSURFeE1qb0tDUWtKY21WMGRYSnVJRWx1Wm1sdWFYUjVPd29KQ1dOaGMyVWdNVEV6T2dvSkNRbDJZWElnYUNBOUlHNWxkeUJvWVhobFgyUnpYMGx1ZEUxaGNDZ3BPd29KQ1FsMGFHbHpMbU5oWTJobExuQjFjMmdvYUNrN0Nna0pDWFpoY2lCaWRXWWdQU0IwYUdsekxtSjFaanNLQ1FrSmRtRnlJR01nUFNCMGFHbHpMbUoxWmk1amFHRnlRMjlrWlVGMEtIUm9hWE11Y0c5ekt5c3BPd29KQ1FsM2FHbHNaU2hqSUQwOUlEVTRLU0I3Q2drSkNRbDJZWElnYVNBOUlIUm9hWE11Y21WaFpFUnBaMmwwY3lncE93b0pDUWtKZG1GeUlIWmhiSFZsSUQwZ2RHaHBjeTUxYm5ObGNtbGhiR2w2WlNncE93b0pDUWtKYUM1b1cybGRJRDBnZG1Gc2RXVTdDZ2tKQ1FsaklEMGdkR2hwY3k1aWRXWXVZMmhoY2tOdlpHVkJkQ2gwYUdsekxuQnZjeXNyS1RzS0NRa0pmUW9KQ1FscFppaGpJQ0U5SURFd05Da2dld29KQ1FrSmRHaHliM2NnYUdGNFpWOUZlR05sY0hScGIyNHVkR2h5YjNkdUtDSkpiblpoYkdsa0lFbHVkRTFoY0NCbWIzSnRZWFFpS1RzS0NRa0pmUW9KQ1FseVpYUjFjbTRnYURzS0NRbGpZWE5sSURFeE5Eb0tDUWtKZG1GeUlHNGdQU0IwYUdsekxuSmxZV1JFYVdkcGRITW9LVHNLQ1FrSmFXWW9iaUE4SURBZ2ZId2diaUErUFNCMGFHbHpMbU5oWTJobExteGxibWQwYUNrZ2V3b0pDUWtKZEdoeWIzY2dhR0Y0WlY5RmVHTmxjSFJwYjI0dWRHaHliM2R1S0NKSmJuWmhiR2xrSUhKbFptVnlaVzVqWlNJcE93b0pDUWw5Q2drSkNYSmxkSFZ5YmlCMGFHbHpMbU5oWTJobFcyNWRPd29KQ1dOaGMyVWdNVEUxT2dvSkNRbDJZWElnYkdWdUlEMGdkR2hwY3k1eVpXRmtSR2xuYVhSektDazdDZ2tKQ1haaGNpQmlkV1lnUFNCMGFHbHpMbUoxWmpzS0NRa0phV1lvZEdocGN5NWlkV1l1WTJoaGNrTnZaR1ZCZENoMGFHbHpMbkJ2Y3lzcktTQWhQU0ExT0NCOGZDQjBhR2x6TG14bGJtZDBhQ0F0SUhSb2FYTXVjRzl6SUR3Z2JHVnVLU0I3Q2drSkNRbDBhSEp2ZHlCb1lYaGxYMFY0WTJWd2RHbHZiaTUwYUhKdmQyNG9Ja2x1ZG1Gc2FXUWdZbmwwWlhNZ2JHVnVaM1JvSWlrN0Nna0pDWDBLQ1FrSmRtRnlJR052WkdWeklEMGdhR0Y0WlY5VmJuTmxjbWxoYkdsNlpYSXVRMDlFUlZNN0Nna0pDV2xtS0dOdlpHVnpJRDA5SUc1MWJHd3BJSHNLQ1FrSkNXTnZaR1Z6SUQwZ2FHRjRaVjlWYm5ObGNtbGhiR2w2WlhJdWFXNXBkRU52WkdWektDazdDZ2tKQ1Fsb1lYaGxYMVZ1YzJWeWFXRnNhWHBsY2k1RFQwUkZVeUE5SUdOdlpHVnpPd29KQ1FsOUNna0pDWFpoY2lCcElEMGdkR2hwY3k1d2IzTTdDZ2tKQ1haaGNpQnlaWE4wSUQwZ2JHVnVJQ1lnTXpzS0NRa0pkbUZ5SUhOcGVtVWdQU0FvYkdWdUlENCtJRElwSUNvZ015QXJJQ2h5WlhOMElENDlJRElnUHlCeVpYTjBJQzBnTVNBNklEQXBPd29KQ1FsMllYSWdiV0Y0SUQwZ2FTQXJJQ2hzWlc0Z0xTQnlaWE4wS1RzS0NRa0pkbUZ5SUdKNWRHVnpJRDBnYm1WM0lHaGhlR1ZmYVc5ZlFubDBaWE1vYm1WM0lFRnljbUY1UW5WbVptVnlLSE5wZW1VcEtUc0tDUWtKZG1GeUlHSndiM01nUFNBd093b0pDUWwzYUdsc1pTaHBJRHdnYldGNEtTQjdDZ2tKQ1FsMllYSWdZekVnUFNCamIyUmxjMXRpZFdZdVkyaGhja052WkdWQmRDaHBLeXNwWFRzS0NRa0pDWFpoY2lCak1pQTlJR052WkdWelcySjFaaTVqYUdGeVEyOWtaVUYwS0drckt5bGRPd29KQ1FrSllubDBaWE11WWx0aWNHOXpLeXRkSUQwZ1l6RWdQRHdnTWlCOElHTXlJRDQrSURRN0Nna0pDUWwyWVhJZ1l6TWdQU0JqYjJSbGMxdGlkV1l1WTJoaGNrTnZaR1ZCZENocEt5c3BYVHNLQ1FrSkNXSjVkR1Z6TG1KYlluQnZjeXNyWFNBOUlHTXlJRHc4SURRZ2ZDQmpNeUErUGlBeU93b0pDUWtKZG1GeUlHTTBJRDBnWTI5a1pYTmJZblZtTG1Ob1lYSkRiMlJsUVhRb2FTc3JLVjA3Q2drSkNRbGllWFJsY3k1aVcySndiM01ySzEwZ1BTQmpNeUE4UENBMklId2dZelE3Q2drSkNYMEtDUWtKYVdZb2NtVnpkQ0ErUFNBeUtTQjdDZ2tKQ1FsMllYSWdZekVnUFNCamIyUmxjMXRpZFdZdVkyaGhja052WkdWQmRDaHBLeXNwWFRzS0NRa0pDWFpoY2lCak1pQTlJR052WkdWelcySjFaaTVqYUdGeVEyOWtaVUYwS0drckt5bGRPd29KQ1FrSllubDBaWE11WWx0aWNHOXpLeXRkSUQwZ1l6RWdQRHdnTWlCOElHTXlJRDQrSURRN0Nna0pDUWxwWmloeVpYTjBJRDA5SURNcElIc0tDUWtKQ1FsMllYSWdZek1nUFNCamIyUmxjMXRpZFdZdVkyaGhja052WkdWQmRDaHBLeXNwWFRzS0NRa0pDUWxpZVhSbGN5NWlXMkp3YjNNcksxMGdQU0JqTWlBOFBDQTBJSHdnWXpNZ1BqNGdNanNLQ1FrSkNYMEtDUWtKZlFvSkNRbDBhR2x6TG5CdmN5QXJQU0JzWlc0N0Nna0pDWFJvYVhNdVkyRmphR1V1Y0hWemFDaGllWFJsY3lrN0Nna0pDWEpsZEhWeWJpQmllWFJsY3pzS0NRbGpZWE5sSURFeE5qb0tDUWtKY21WMGRYSnVJSFJ5ZFdVN0Nna0pZMkZ6WlNBeE1UZzZDZ2tKQ1haaGNpQmtPd29KQ1FscFppaDBhR2x6TG1KMVppNWphR0Z5UTI5a1pVRjBLSFJvYVhNdWNHOXpLU0ErUFNBME9DQW1KaUIwYUdsekxtSjFaaTVqYUdGeVEyOWtaVUYwS0hSb2FYTXVjRzl6S1NBOFBTQTFOeUFtSmlCMGFHbHpMbUoxWmk1amFHRnlRMjlrWlVGMEtIUm9hWE11Y0c5eklDc2dNU2tnUGowZ05EZ2dKaVlnZEdocGN5NWlkV1l1WTJoaGNrTnZaR1ZCZENoMGFHbHpMbkJ2Y3lBcklERXBJRHc5SURVM0lDWW1JSFJvYVhNdVluVm1MbU5vWVhKRGIyUmxRWFFvZEdocGN5NXdiM01nS3lBeUtTQStQU0EwT0NBbUppQjBhR2x6TG1KMVppNWphR0Z5UTI5a1pVRjBLSFJvYVhNdWNHOXpJQ3NnTWlrZ1BEMGdOVGNnSmlZZ2RHaHBjeTVpZFdZdVkyaGhja052WkdWQmRDaDBhR2x6TG5CdmN5QXJJRE1wSUQ0OUlEUTRJQ1ltSUhSb2FYTXVZblZtTG1Ob1lYSkRiMlJsUVhRb2RHaHBjeTV3YjNNZ0t5QXpLU0E4UFNBMU55QW1KaUIwYUdsekxtSjFaaTVqYUdGeVEyOWtaVUYwS0hSb2FYTXVjRzl6SUNzZ05Da2dQVDBnTkRVcElIc0tDUWtKQ1dRZ1BTQkllRTkyWlhKeWFXUmxjeTV6ZEhKRVlYUmxLRWg0VDNabGNuSnBaR1Z6TG5OMVluTjBjaWgwYUdsekxtSjFaaXgwYUdsekxuQnZjeXd4T1NrcE93b0pDUWtKZEdocGN5NXdiM01nS3owZ01UazdDZ2tKQ1gwZ1pXeHpaU0I3Q2drSkNRbGtJRDBnYm1WM0lFUmhkR1VvZEdocGN5NXlaV0ZrUm14dllYUW9LU2s3Q2drSkNYMEtDUWtKZEdocGN5NWpZV05vWlM1d2RYTm9LR1FwT3dvSkNRbHlaWFIxY200Z1pEc0tDUWxqWVhObElERXhPVG9LQ1FrSmRtRnlJRzVoYldVZ1BTQjBhR2x6TG5WdWMyVnlhV0ZzYVhwbEtDazdDZ2tKQ1haaGNpQmxaR1ZqYkNBOUlIUm9hWE11Y21WemIyeDJaWEl1Y21WemIyeDJaVVZ1ZFcwb2JtRnRaU2s3Q2drSkNXbG1LR1ZrWldOc0lEMDlJRzUxYkd3cElIc0tDUWtKQ1hSb2NtOTNJR2hoZUdWZlJYaGpaWEIwYVc5dUxuUm9jbTkzYmlnaVJXNTFiU0J1YjNRZ1ptOTFibVFnSWlBcklHNWhiV1VwT3dvSkNRbDlDZ2tKQ1haaGNpQmxJRDBnZEdocGN5NTFibk5sY21saGJHbDZaVVZ1ZFcwb1pXUmxZMndzZEdocGN5NTFibk5sY21saGJHbDZaU2dwS1RzS0NRa0pkR2hwY3k1allXTm9aUzV3ZFhOb0tHVXBPd29KQ1FseVpYUjFjbTRnWlRzS0NRbGpZWE5sSURFeU1Eb0tDUWtKZEdoeWIzY2dhR0Y0WlY5RmVHTmxjSFJwYjI0dWRHaHliM2R1S0hSb2FYTXVkVzV6WlhKcFlXeHBlbVVvS1NrN0Nna0pZMkZ6WlNBeE1qRTZDZ2tKQ1haaGNpQnNaVzRnUFNCMGFHbHpMbkpsWVdSRWFXZHBkSE1vS1RzS0NRa0phV1lvZEdocGN5NWlkV1l1WTJoaGNrTnZaR1ZCZENoMGFHbHpMbkJ2Y3lzcktTQWhQU0ExT0NCOGZDQjBhR2x6TG14bGJtZDBhQ0F0SUhSb2FYTXVjRzl6SUR3Z2JHVnVLU0I3Q2drSkNRbDBhSEp2ZHlCb1lYaGxYMFY0WTJWd2RHbHZiaTUwYUhKdmQyNG9Ja2x1ZG1Gc2FXUWdjM1J5YVc1bklHeGxibWQwYUNJcE93b0pDUWw5Q2drSkNYWmhjaUJ6SUQwZ1NIaFBkbVZ5Y21sa1pYTXVjM1ZpYzNSeUtIUm9hWE11WW5WbUxIUm9hWE11Y0c5ekxHeGxiaWs3Q2drSkNYUm9hWE11Y0c5eklDczlJR3hsYmpzS0NRa0pjeUE5SUdSbFkyOWtaVlZTU1VOdmJYQnZibVZ1ZENoekxuTndiR2wwS0NJcklpa3VhbTlwYmlnaUlDSXBLVHNLQ1FrSmRHaHBjeTV6WTJGamFHVXVjSFZ6YUNoektUc0tDUWtKY21WMGRYSnVJSE03Q2drSlkyRnpaU0F4TWpJNkNna0pDWEpsZEhWeWJpQXdPd29KQ1dSbFptRjFiSFE2Q2drSmZRb0pDWFJvYVhNdWNHOXpMUzA3Q2drSmRHaHliM2NnYUdGNFpWOUZlR05sY0hScGIyNHVkR2h5YjNkdUtDSkpiblpoYkdsa0lHTm9ZWElnSWlBcklIUm9hWE11WW5WbUxtTm9ZWEpCZENoMGFHbHpMbkJ2Y3lrZ0t5QWlJR0YwSUhCdmMybDBhVzl1SUNJZ0t5QjBhR2x6TG5CdmN5azdDZ2w5Q24wN0NuWmhjaUJvWVhobFgxWmhiSFZsUlhoalpYQjBhVzl1SUQwZ1puVnVZM1JwYjI0b2RtRnNkV1VzY0hKbGRtbHZkWE1zYm1GMGFYWmxLU0I3Q2dsb1lYaGxYMFY0WTJWd2RHbHZiaTVqWVd4c0tIUm9hWE1zVTNSeWFXNW5LSFpoYkhWbEtTeHdjbVYyYVc5MWN5eHVZWFJwZG1VcE93b0pkR2hwY3k1MllXeDFaU0E5SUhaaGJIVmxPd3A5T3dva2FIaERiR0Z6YzJWeld5Sm9ZWGhsTGxaaGJIVmxSWGhqWlhCMGFXOXVJbDBnUFNCb1lYaGxYMVpoYkhWbFJYaGpaWEIwYVc5dU93cG9ZWGhsWDFaaGJIVmxSWGhqWlhCMGFXOXVMbDlmYm1GdFpWOWZJRDBnZEhKMVpUc0thR0Y0WlY5V1lXeDFaVVY0WTJWd2RHbHZiaTVmWDNOMWNHVnlYMThnUFNCb1lYaGxYMFY0WTJWd2RHbHZianNLYUdGNFpWOVdZV3gxWlVWNFkyVndkR2x2Ymk1d2NtOTBiM1I1Y0dVZ1BTQWtaWGgwWlc1a0tHaGhlR1ZmUlhoalpYQjBhVzl1TG5CeWIzUnZkSGx3WlN4N0NuMHBPd3AyWVhJZ2FHRjRaVjlwYjE5Q2VYUmxjeUE5SUdaMWJtTjBhVzl1S0dSaGRHRXBJSHNLQ1hSb2FYTXViR1Z1WjNSb0lEMGdaR0YwWVM1aWVYUmxUR1Z1WjNSb093b0pkR2hwY3k1aUlEMGdibVYzSUZWcGJuUTRRWEp5WVhrb1pHRjBZU2s3Q2dsMGFHbHpMbUl1WW5WbVptVnlWbUZzZFdVZ1BTQmtZWFJoT3dvSlpHRjBZUzVvZUVKNWRHVnpJRDBnZEdocGN6c0tDV1JoZEdFdVlubDBaWE1nUFNCMGFHbHpMbUk3Q24wN0NpUm9lRU5zWVhOelpYTmJJbWhoZUdVdWFXOHVRbmwwWlhNaVhTQTlJR2hoZUdWZmFXOWZRbmwwWlhNN0NtaGhlR1ZmYVc5ZlFubDBaWE11WDE5dVlXMWxYMThnUFNCMGNuVmxPd3BvWVhobFgybHZYMEo1ZEdWekxtOW1VM1J5YVc1bklEMGdablZ1WTNScGIyNG9jeXhsYm1OdlpHbHVaeWtnZXdvSmFXWW9aVzVqYjJScGJtY2dQVDBnYUdGNFpWOXBiMTlGYm1OdlpHbHVaeTVTWVhkT1lYUnBkbVVwSUhzS0NRbDJZWElnWW5WbUlEMGdibVYzSUZWcGJuUTRRWEp5WVhrb2N5NXNaVzVuZEdnZ1BEd2dNU2s3Q2drSmRtRnlJRjluSUQwZ01Ec0tDUWwyWVhJZ1gyY3hJRDBnY3k1c1pXNW5kR2c3Q2drSmQyaHBiR1VvWDJjZ1BDQmZaekVwSUhzS0NRa0pkbUZ5SUdrZ1BTQmZaeXNyT3dvSkNRbDJZWElnWXlBOUlITXVZMmhoY2tOdlpHVkJkQ2hwS1RzS0NRa0pZblZtVzJrZ1BEd2dNVjBnUFNCaklDWWdNalUxT3dvSkNRbGlkV1piYVNBOFBDQXhJSHdnTVYwZ1BTQmpJRDQrSURnN0Nna0pmUW9KQ1hKbGRIVnliaUJ1WlhjZ2FHRjRaVjlwYjE5Q2VYUmxjeWhpZFdZdVluVm1abVZ5S1RzS0NYMEtDWFpoY2lCaElEMGdXMTA3Q2dsMllYSWdhU0E5SURBN0NnbDNhR2xzWlNocElEd2djeTVzWlc1bmRHZ3BJSHNLQ1FsMllYSWdZeUE5SUhNdVkyaGhja052WkdWQmRDaHBLeXNwT3dvSkNXbG1LRFUxTWprMklEdzlJR01nSmlZZ1l5QThQU0ExTmpNeE9Ta2dld29KQ1FsaklEMGdZeUF0SURVMU1qTXlJRHc4SURFd0lId2djeTVqYUdGeVEyOWtaVUYwS0drckt5a2dKaUF4TURJek93b0pDWDBLQ1FscFppaGpJRHc5SURFeU55a2dld29KQ1FsaExuQjFjMmdvWXlrN0Nna0pmU0JsYkhObElHbG1LR01nUEQwZ01qQTBOeWtnZXdvSkNRbGhMbkIxYzJnb01Ua3lJSHdnWXlBK1BpQTJLVHNLQ1FrSllTNXdkWE5vS0RFeU9DQjhJR01nSmlBMk15azdDZ2tKZlNCbGJITmxJR2xtS0dNZ1BEMGdOalUxTXpVcElIc0tDUWtKWVM1d2RYTm9LREl5TkNCOElHTWdQajRnTVRJcE93b0pDUWxoTG5CMWMyZ29NVEk0SUh3Z1l5QStQaUEySUNZZ05qTXBPd29KQ1FsaExuQjFjMmdvTVRJNElId2dZeUFtSURZektUc0tDUWw5SUdWc2MyVWdld29KQ1FsaExuQjFjMmdvTWpRd0lId2dZeUErUGlBeE9DazdDZ2tKQ1dFdWNIVnphQ2d4TWpnZ2ZDQmpJRDQrSURFeUlDWWdOak1wT3dvSkNRbGhMbkIxYzJnb01USTRJSHdnWXlBK1BpQTJJQ1lnTmpNcE93b0pDUWxoTG5CMWMyZ29NVEk0SUh3Z1l5QW1JRFl6S1RzS0NRbDlDZ2w5Q2dseVpYUjFjbTRnYm1WM0lHaGhlR1ZmYVc5ZlFubDBaWE1vYm1WM0lGVnBiblE0UVhKeVlYa29ZU2t1WW5WbVptVnlLVHNLZlRzS2FHRjRaVjlwYjE5Q2VYUmxjeTV3Y205MGIzUjVjR1VnUFNCN0NnbG5aWFJUZEhKcGJtYzZJR1oxYm1OMGFXOXVLSEJ2Y3l4c1pXNHNaVzVqYjJScGJtY3BJSHNLQ1FscFppaHdiM01nUENBd0lIeDhJR3hsYmlBOElEQWdmSHdnY0c5eklDc2diR1Z1SUQ0Z2RHaHBjeTVzWlc1bmRHZ3BJSHNLQ1FrSmRHaHliM2NnYUdGNFpWOUZlR05sY0hScGIyNHVkR2h5YjNkdUtHaGhlR1ZmYVc5ZlJYSnliM0l1VDNWMGMybGtaVUp2ZFc1a2N5azdDZ2tKZlFvSkNXbG1LR1Z1WTI5a2FXNW5JRDA5SUc1MWJHd3BJSHNLQ1FrSlpXNWpiMlJwYm1jZ1BTQm9ZWGhsWDJsdlgwVnVZMjlrYVc1bkxsVlVSamc3Q2drSmZRb0pDWFpoY2lCeklEMGdJaUk3Q2drSmRtRnlJR0lnUFNCMGFHbHpMbUk3Q2drSmRtRnlJR2tnUFNCd2IzTTdDZ2tKZG1GeUlHMWhlQ0E5SUhCdmN5QXJJR3hsYmpzS0NRbHpkMmwwWTJnb1pXNWpiMlJwYm1jdVgyaDRYMmx1WkdWNEtTQjdDZ2tKWTJGelpTQXdPZ29KQ1FsMllYSWdaR1ZpZFdjZ1BTQndiM01nUGlBd093b0pDUWwzYUdsc1pTaHBJRHdnYldGNEtTQjdDZ2tKQ1FsMllYSWdZeUE5SUdKYmFTc3JYVHNLQ1FrSkNXbG1LR01nUENBeE1qZ3BJSHNLQ1FrSkNRbHBaaWhqSUQwOUlEQXBJSHNLQ1FrSkNRa0pZbkpsWVdzN0Nna0pDUWtKZlFvSkNRa0pDWE1nS3owZ1UzUnlhVzVuTG1aeWIyMURiMlJsVUc5cGJuUW9ZeWs3Q2drSkNRbDlJR1ZzYzJVZ2FXWW9ZeUE4SURJeU5Da2dld29KQ1FrSkNYWmhjaUJqYjJSbElEMGdLR01nSmlBMk15a2dQRHdnTmlCOElHSmJhU3NyWFNBbUlERXlOenNLQ1FrSkNRbHpJQ3M5SUZOMGNtbHVaeTVtY205dFEyOWtaVkJ2YVc1MEtHTnZaR1VwT3dvSkNRa0pmU0JsYkhObElHbG1LR01nUENBeU5EQXBJSHNLQ1FrSkNRbDJZWElnWXpJZ1BTQmlXMmtySzEwN0Nna0pDUWtKZG1GeUlHTnZaR1V4SUQwZ0tHTWdKaUF6TVNrZ1BEd2dNVElnZkNBb1l6SWdKaUF4TWpjcElEdzhJRFlnZkNCaVcya3JLMTBnSmlBeE1qYzdDZ2tKQ1FrSmN5QXJQU0JUZEhKcGJtY3Vabkp2YlVOdlpHVlFiMmx1ZENoamIyUmxNU2s3Q2drSkNRbDlJR1ZzYzJVZ2V3b0pDUWtKQ1haaGNpQmpNakVnUFNCaVcya3JLMTA3Q2drSkNRa0pkbUZ5SUdNeklEMGdZbHRwS3l0ZE93b0pDUWtKQ1haaGNpQjFJRDBnS0dNZ0ppQXhOU2tnUER3Z01UZ2dmQ0FvWXpJeElDWWdNVEkzS1NBOFBDQXhNaUI4SUNoak15QW1JREV5TnlrZ1BEd2dOaUI4SUdKYmFTc3JYU0FtSURFeU56c0tDUWtKQ1FseklDczlJRk4wY21sdVp5NW1jbTl0UTI5a1pWQnZhVzUwS0hVcE93b0pDUWtKZlFvSkNRbDlDZ2tKQ1dKeVpXRnJPd29KQ1dOaGMyVWdNVG9LQ1FrSmQyaHBiR1VvYVNBOElHMWhlQ2tnZXdvSkNRa0pkbUZ5SUdNZ1BTQmlXMmtySzEwZ2ZDQmlXMmtySzEwZ1BEd2dPRHNLQ1FrSkNYTWdLejBnVTNSeWFXNW5MbVp5YjIxRGIyUmxVRzlwYm5Rb1l5azdDZ2tKQ1gwS0NRa0pZbkpsWVdzN0Nna0pmUW9KQ1hKbGRIVnliaUJ6T3dvSmZRb0pMSFJ2VTNSeWFXNW5PaUJtZFc1amRHbHZiaWdwSUhzS0NRbHlaWFIxY200Z2RHaHBjeTVuWlhSVGRISnBibWNvTUN4MGFHbHpMbXhsYm1kMGFDazdDZ2w5Q24wN0NuWmhjaUJvWVhobFgybHZYMFZ1WTI5a2FXNW5JRDBnSkdoNFJXNTFiWE5iSW1oaGVHVXVhVzh1Ulc1amIyUnBibWNpWFNBOUlIc2dYMTlsYm1GdFpWOWZPblJ5ZFdVc1gxOWpiMjV6ZEhKMVkzUnpYMTg2Ym5Wc2JBb0pMRlZVUmpnNklIdGZhSGhmYm1GdFpUb2lWVlJHT0NJc1gyaDRYMmx1WkdWNE9qQXNYMTlsYm5WdFgxODZJbWhoZUdVdWFXOHVSVzVqYjJScGJtY2lMSFJ2VTNSeWFXNW5PaVJsYzNSeWZRb0pMRkpoZDA1aGRHbDJaVG9nZTE5b2VGOXVZVzFsT2lKU1lYZE9ZWFJwZG1VaUxGOW9lRjlwYm1SbGVEb3hMRjlmWlc1MWJWOWZPaUpvWVhobExtbHZMa1Z1WTI5a2FXNW5JaXgwYjFOMGNtbHVaem9rWlhOMGNuMEtmVHNLYUdGNFpWOXBiMTlGYm1OdlpHbHVaeTVmWDJOdmJuTjBjblZqZEhOZlh5QTlJRnRvWVhobFgybHZYMFZ1WTI5a2FXNW5MbFZVUmpnc2FHRjRaVjlwYjE5RmJtTnZaR2x1Wnk1U1lYZE9ZWFJwZG1WZE93cDJZWElnYUdGNFpWOWpjbmx3ZEc5ZlFtRnpaVFkwSUQwZ1puVnVZM1JwYjI0b0tTQjdJSDA3Q2lSb2VFTnNZWE56WlhOYkltaGhlR1V1WTNKNWNIUnZMa0poYzJVMk5DSmRJRDBnYUdGNFpWOWpjbmx3ZEc5ZlFtRnpaVFkwT3dwb1lYaGxYMk55ZVhCMGIxOUNZWE5sTmpRdVgxOXVZVzFsWDE4Z1BTQjBjblZsT3dwb1lYaGxYMk55ZVhCMGIxOUNZWE5sTmpRdVpHVmpiMlJsSUQwZ1puVnVZM1JwYjI0b2MzUnlMR052YlhCc1pXMWxiblFwSUhzS0NXbG1LR052YlhCc1pXMWxiblFnUFQwZ2JuVnNiQ2tnZXdvSkNXTnZiWEJzWlcxbGJuUWdQU0IwY25WbE93b0pmUW9KYVdZb1kyOXRjR3hsYldWdWRDa2dld29KQ1hkb2FXeGxLRWg0VDNabGNuSnBaR1Z6TG1OallTaHpkSElzYzNSeUxteGxibWQwYUNBdElERXBJRDA5SURZeEtTQnpkSElnUFNCSWVFOTJaWEp5YVdSbGN5NXpkV0p6ZEhJb2MzUnlMREFzTFRFcE93b0pmUW9KY21WMGRYSnVJRzVsZHlCb1lYaGxYMk55ZVhCMGIxOUNZWE5sUTI5a1pTaG9ZWGhsWDJOeWVYQjBiMTlDWVhObE5qUXVRbGxVUlZNcExtUmxZMjlrWlVKNWRHVnpLR2hoZUdWZmFXOWZRbmwwWlhNdWIyWlRkSEpwYm1jb2MzUnlLU2s3Q24wN0NuWmhjaUJvWVhobFgyTnllWEIwYjE5Q1lYTmxRMjlrWlNBOUlHWjFibU4wYVc5dUtHSmhjMlVwSUhzS0NYWmhjaUJzWlc0Z1BTQmlZWE5sTG14bGJtZDBhRHNLQ1haaGNpQnVZbWwwY3lBOUlERTdDZ2wzYUdsc1pTaHNaVzRnUGlBeElEdzhJRzVpYVhSektTQXJLMjVpYVhSek93b0phV1lvYm1KcGRITWdQaUE0SUh4OElHeGxiaUFoUFNBeElEdzhJRzVpYVhSektTQjdDZ2tKZEdoeWIzY2dhR0Y0WlY5RmVHTmxjSFJwYjI0dWRHaHliM2R1S0NKQ1lYTmxRMjlrWlNBNklHSmhjMlVnYkdWdVozUm9JRzExYzNRZ1ltVWdZU0J3YjNkbGNpQnZaaUIwZDI4dUlpazdDZ2w5Q2dsMGFHbHpMbUpoYzJVZ1BTQmlZWE5sT3dvSmRHaHBjeTV1WW1sMGN5QTlJRzVpYVhSek93cDlPd29rYUhoRGJHRnpjMlZ6V3lKb1lYaGxMbU55ZVhCMGJ5NUNZWE5sUTI5a1pTSmRJRDBnYUdGNFpWOWpjbmx3ZEc5ZlFtRnpaVU52WkdVN0NtaGhlR1ZmWTNKNWNIUnZYMEpoYzJWRGIyUmxMbDlmYm1GdFpWOWZJRDBnZEhKMVpUc0thR0Y0WlY5amNubHdkRzlmUW1GelpVTnZaR1V1Y0hKdmRHOTBlWEJsSUQwZ2V3b0phVzVwZEZSaFlteGxPaUJtZFc1amRHbHZiaWdwSUhzS0NRbDJZWElnZEdKc0lEMGdXMTA3Q2drSmRtRnlJRjluSUQwZ01Ec0tDUWwzYUdsc1pTaGZaeUE4SURJMU5pa2dld29KQ1FsMllYSWdhU0E5SUY5bkt5czdDZ2tKQ1hSaWJGdHBYU0E5SUMweE93b0pDWDBLQ1FsMllYSWdYMmNnUFNBd093b0pDWFpoY2lCZlp6RWdQU0IwYUdsekxtSmhjMlV1YkdWdVozUm9Pd29KQ1hkb2FXeGxLRjluSUR3Z1gyY3hLU0I3Q2drSkNYWmhjaUJwSUQwZ1gyY3JLenNLQ1FrSmRHSnNXM1JvYVhNdVltRnpaUzVpVzJsZFhTQTlJR2s3Q2drSmZRb0pDWFJvYVhNdWRHSnNJRDBnZEdKc093b0pmUW9KTEdSbFkyOWtaVUo1ZEdWek9pQm1kVzVqZEdsdmJpaGlLU0I3Q2drSmRtRnlJRzVpYVhSeklEMGdkR2hwY3k1dVltbDBjenNLQ1FsMllYSWdZbUZ6WlNBOUlIUm9hWE11WW1GelpUc0tDUWxwWmloMGFHbHpMblJpYkNBOVBTQnVkV3hzS1NCN0Nna0pDWFJvYVhNdWFXNXBkRlJoWW14bEtDazdDZ2tKZlFvSkNYWmhjaUIwWW13Z1BTQjBhR2x6TG5SaWJEc0tDUWwyWVhJZ2MybDZaU0E5SUdJdWJHVnVaM1JvSUNvZ2JtSnBkSE1nUGo0Z016c0tDUWwyWVhJZ2IzVjBJRDBnYm1WM0lHaGhlR1ZmYVc5ZlFubDBaWE1vYm1WM0lFRnljbUY1UW5WbVptVnlLSE5wZW1VcEtUc0tDUWwyWVhJZ1luVm1JRDBnTURzS0NRbDJZWElnWTNWeVltbDBjeUE5SURBN0Nna0pkbUZ5SUhCcGJpQTlJREE3Q2drSmRtRnlJSEJ2ZFhRZ1BTQXdPd29KQ1hkb2FXeGxLSEJ2ZFhRZ1BDQnphWHBsS1NCN0Nna0pDWGRvYVd4bEtHTjFjbUpwZEhNZ1BDQTRLU0I3Q2drSkNRbGpkWEppYVhSeklDczlJRzVpYVhSek93b0pDUWtKWW5WbUlEdzhQU0J1WW1sMGN6c0tDUWtKQ1haaGNpQnBJRDBnZEdKc1cySXVZbHR3YVc0cksxMWRPd29KQ1FrSmFXWW9hU0E5UFNBdE1Ta2dld29KQ1FrSkNYUm9jbTkzSUdoaGVHVmZSWGhqWlhCMGFXOXVMblJvY205M2JpZ2lRbUZ6WlVOdlpHVWdPaUJwYm5aaGJHbGtJR1Z1WTI5a1pXUWdZMmhoY2lJcE93b0pDUWtKZlFvSkNRa0pZblZtSUh3OUlHazdDZ2tKQ1gwS0NRa0pZM1Z5WW1sMGN5QXRQU0E0T3dvSkNRbHZkWFF1WWx0d2IzVjBLeXRkSUQwZ1luVm1JRDQrSUdOMWNtSnBkSE1nSmlBeU5UVTdDZ2tKZlFvSkNYSmxkSFZ5YmlCdmRYUTdDZ2w5Q24wN0NuWmhjaUJvWVhobFgyUnpYMGx1ZEUxaGNDQTlJR1oxYm1OMGFXOXVLQ2tnZXdvSmRHaHBjeTVvSUQwZ2V5QjlPd3A5T3dva2FIaERiR0Z6YzJWeld5Sm9ZWGhsTG1SekxrbHVkRTFoY0NKZElEMGdhR0Y0WlY5a2MxOUpiblJOWVhBN0NtaGhlR1ZmWkhOZlNXNTBUV0Z3TGw5ZmJtRnRaVjlmSUQwZ2RISjFaVHNLZG1GeUlHaGhlR1ZmWkhOZlRHbHpkQ0E5SUdaMWJtTjBhVzl1S0NrZ2V3b0pkR2hwY3k1c1pXNW5kR2dnUFNBd093cDlPd29rYUhoRGJHRnpjMlZ6V3lKb1lYaGxMbVJ6TGt4cGMzUWlYU0E5SUdoaGVHVmZaSE5mVEdsemREc0thR0Y0WlY5a2MxOU1hWE4wTGw5ZmJtRnRaVjlmSUQwZ2RISjFaVHNLYUdGNFpWOWtjMTlNYVhOMExuQnliM1J2ZEhsd1pTQTlJSHNLQ1dGa1pEb2dablZ1WTNScGIyNG9hWFJsYlNrZ2V3b0pDWFpoY2lCNElEMGdibVYzSUdoaGVHVmZaSE5mWHlSTWFYTjBYMHhwYzNST2IyUmxLR2wwWlcwc2JuVnNiQ2s3Q2drSmFXWW9kR2hwY3k1b0lEMDlJRzUxYkd3cElIc0tDUWtKZEdocGN5NW9JRDBnZURzS0NRbDlJR1ZzYzJVZ2V3b0pDUWwwYUdsekxuRXVibVY0ZENBOUlIZzdDZ2tKZlFvSkNYUm9hWE11Y1NBOUlIZzdDZ2tKZEdocGN5NXNaVzVuZEdnckt6c0tDWDBLZlRzS2RtRnlJR2hoZUdWZlpITmZYeVJNYVhOMFgweHBjM1JPYjJSbElEMGdablZ1WTNScGIyNG9hWFJsYlN4dVpYaDBLU0I3Q2dsMGFHbHpMbWwwWlcwZ1BTQnBkR1Z0T3dvSmRHaHBjeTV1WlhoMElEMGdibVY0ZERzS2ZUc0tKR2g0UTJ4aGMzTmxjMXNpYUdGNFpTNWtjeTVmVEdsemRDNU1hWE4wVG05a1pTSmRJRDBnYUdGNFpWOWtjMTlmSkV4cGMzUmZUR2x6ZEU1dlpHVTdDbWhoZUdWZlpITmZYeVJNYVhOMFgweHBjM1JPYjJSbExsOWZibUZ0WlY5ZklEMGdkSEoxWlRzS2RtRnlJR2hoZUdWZlpITmZUMkpxWldOMFRXRndJRDBnWm5WdVkzUnBiMjRvS1NCN0NnbDBhR2x6TG1nZ1BTQjdJRjlmYTJWNWMxOWZJRG9nZXlCOWZUc0tmVHNLSkdoNFEyeGhjM05sYzFzaWFHRjRaUzVrY3k1UFltcGxZM1JOWVhBaVhTQTlJR2hoZUdWZlpITmZUMkpxWldOMFRXRndPd3BvWVhobFgyUnpYMDlpYW1WamRFMWhjQzVmWDI1aGJXVmZYeUE5SUhSeWRXVTdDbWhoZUdWZlpITmZUMkpxWldOMFRXRndMbkJ5YjNSdmRIbHdaU0E5SUhzS0NYTmxkRG9nWm5WdVkzUnBiMjRvYTJWNUxIWmhiSFZsS1NCN0Nna0pkbUZ5SUdsa0lEMGdhMlY1TGw5ZmFXUmZYenNLQ1FscFppaHBaQ0E5UFNCdWRXeHNLU0I3Q2drSkNXbGtJRDBnS0d0bGVTNWZYMmxrWDE4Z1BTQWtaMnh2WW1Gc0xpUm9ZWGhsVlVsRUt5c3BPd29KQ1gwS0NRbDBhR2x6TG1oYmFXUmRJRDBnZG1Gc2RXVTdDZ2tKZEdocGN5NW9MbDlmYTJWNWMxOWZXMmxrWFNBOUlHdGxlVHNLQ1gwS2ZUc0tkbUZ5SUdoaGVHVmZaSE5mVTNSeWFXNW5UV0Z3SUQwZ1puVnVZM1JwYjI0b0tTQjdDZ2wwYUdsekxtZ2dQU0JQWW1wbFkzUXVZM0psWVhSbEtHNTFiR3dwT3dwOU93b2thSGhEYkdGemMyVnpXeUpvWVhobExtUnpMbE4wY21sdVowMWhjQ0pkSUQwZ2FHRjRaVjlrYzE5VGRISnBibWROWVhBN0NtaGhlR1ZmWkhOZlUzUnlhVzVuVFdGd0xsOWZibUZ0WlY5ZklEMGdkSEoxWlRzS2RtRnlJR2hoZUdWZmFXOWZSWEp5YjNJZ1BTQWthSGhGYm5WdGMxc2lhR0Y0WlM1cGJ5NUZjbkp2Y2lKZElEMGdleUJmWDJWdVlXMWxYMTg2ZEhKMVpTeGZYMk52Ym5OMGNuVmpkSE5mWHpwdWRXeHNDZ2tzUW14dlkydGxaRG9nZTE5b2VGOXVZVzFsT2lKQ2JHOWphMlZrSWl4ZmFIaGZhVzVrWlhnNk1DeGZYMlZ1ZFcxZlh6b2lhR0Y0WlM1cGJ5NUZjbkp2Y2lJc2RHOVRkSEpwYm1jNkpHVnpkSEo5Q2drc1QzWmxjbVpzYjNjNklIdGZhSGhmYm1GdFpUb2lUM1psY21ac2IzY2lMRjlvZUY5cGJtUmxlRG94TEY5ZlpXNTFiVjlmT2lKb1lYaGxMbWx2TGtWeWNtOXlJaXgwYjFOMGNtbHVaem9rWlhOMGNuMEtDU3hQZFhSemFXUmxRbTkxYm1Sek9pQjdYMmg0WDI1aGJXVTZJazkxZEhOcFpHVkNiM1Z1WkhNaUxGOW9lRjlwYm1SbGVEb3lMRjlmWlc1MWJWOWZPaUpvWVhobExtbHZMa1Z5Y205eUlpeDBiMU4wY21sdVp6b2taWE4wY24wS0NTeERkWE4wYjIwNklDZ2tYejFtZFc1amRHbHZiaWhsS1NCN0lISmxkSFZ5YmlCN1gyaDRYMmx1WkdWNE9qTXNaVHBsTEY5ZlpXNTFiVjlmT2lKb1lYaGxMbWx2TGtWeWNtOXlJaXgwYjFOMGNtbHVaem9rWlhOMGNuMDdJSDBzSkY4dVgyaDRYMjVoYldVOUlrTjFjM1J2YlNJc0pGOHVYMTl3WVhKaGJYTmZYeUE5SUZzaVpTSmRMQ1JmS1FwOU93cG9ZWGhsWDJsdlgwVnljbTl5TGw5ZlkyOXVjM1J5ZFdOMGMxOWZJRDBnVzJoaGVHVmZhVzlmUlhKeWIzSXVRbXh2WTJ0bFpDeG9ZWGhsWDJsdlgwVnljbTl5TGs5MlpYSm1iRzkzTEdoaGVHVmZhVzlmUlhKeWIzSXVUM1YwYzJsa1pVSnZkVzVrY3l4b1lYaGxYMmx2WDBWeWNtOXlMa04xYzNSdmJWMDdDblpoY2lCb1lYaGxYMmwwWlhKaGRHOXljMTlCY25KaGVVbDBaWEpoZEc5eUlEMGdablZ1WTNScGIyNG9ZWEp5WVhrcElIc0tDWFJvYVhNdVkzVnljbVZ1ZENBOUlEQTdDZ2wwYUdsekxtRnljbUY1SUQwZ1lYSnlZWGs3Q24wN0NpUm9lRU5zWVhOelpYTmJJbWhoZUdVdWFYUmxjbUYwYjNKekxrRnljbUY1U1hSbGNtRjBiM0lpWFNBOUlHaGhlR1ZmYVhSbGNtRjBiM0p6WDBGeWNtRjVTWFJsY21GMGIzSTdDbWhoZUdWZmFYUmxjbUYwYjNKelgwRnljbUY1U1hSbGNtRjBiM0l1WDE5dVlXMWxYMThnUFNCMGNuVmxPd3BvWVhobFgybDBaWEpoZEc5eWMxOUJjbkpoZVVsMFpYSmhkRzl5TG5CeWIzUnZkSGx3WlNBOUlIc0tDV2hoYzA1bGVIUTZJR1oxYm1OMGFXOXVLQ2tnZXdvSkNYSmxkSFZ5YmlCMGFHbHpMbU4xY25KbGJuUWdQQ0IwYUdsekxtRnljbUY1TG14bGJtZDBhRHNLQ1gwS0NTeHVaWGgwT2lCbWRXNWpkR2x2YmlncElIc0tDUWx5WlhSMWNtNGdkR2hwY3k1aGNuSmhlVnQwYUdsekxtTjFjbkpsYm5RcksxMDdDZ2w5Q24wN0NuWmhjaUJxYzE5Q2IyOTBJRDBnWm5WdVkzUnBiMjRvS1NCN0lIMDdDaVJvZUVOc1lYTnpaWE5iSW1wekxrSnZiM1FpWFNBOUlHcHpYMEp2YjNRN0NtcHpYMEp2YjNRdVgxOXVZVzFsWDE4Z1BTQjBjblZsT3dwcWMxOUNiMjkwTGw5ZmMzUnlhVzVuWDNKbFl5QTlJR1oxYm1OMGFXOXVLRzhzY3lrZ2V3b0phV1lvYnlBOVBTQnVkV3hzS1NCN0Nna0pjbVYwZFhKdUlDSnVkV3hzSWpzS0NYMEtDV2xtS0hNdWJHVnVaM1JvSUQ0OUlEVXBJSHNLQ1FseVpYUjFjbTRnSWp3dUxpNCtJanNLQ1gwS0NYWmhjaUIwSUQwZ2RIbHdaVzltS0c4cE93b0phV1lvZENBOVBTQWlablZ1WTNScGIyNGlJQ1ltSUNodkxsOWZibUZ0WlY5ZklIeDhJRzh1WDE5bGJtRnRaVjlmS1NrZ2V3b0pDWFFnUFNBaWIySnFaV04wSWpzS0NYMEtDWE4zYVhSamFDaDBLU0I3Q2dsallYTmxJQ0ptZFc1amRHbHZiaUk2Q2drSmNtVjBkWEp1SUNJOFpuVnVZM1JwYjI0K0lqc0tDV05oYzJVZ0ltOWlhbVZqZENJNkNna0phV1lvYnk1ZlgyVnVkVzFmWHlrZ2V3b0pDUWwyWVhJZ1pTQTlJQ1JvZUVWdWRXMXpXMjh1WDE5bGJuVnRYMTlkT3dvSkNRbDJZWElnWTI5dUlEMGdaUzVmWDJOdmJuTjBjblZqZEhOZlgxdHZMbDlvZUY5cGJtUmxlRjA3Q2drSkNYWmhjaUJ1SUQwZ1kyOXVMbDlvZUY5dVlXMWxPd29KQ1FscFppaGpiMjR1WDE5d1lYSmhiWE5mWHlrZ2V3b0pDUWtKY3lBOUlITWdLeUFpWEhRaU93b0pDUWtKY21WMGRYSnVJRzRnS3lBaUtDSWdLeUFvS0daMWJtTjBhVzl1S0NSMGFHbHpLU0I3Q2drSkNRa0pkbUZ5SUNSeU93b0pDUWtKQ1haaGNpQmZaeUE5SUZ0ZE93b0pDUWtKQ1hzS0NRa0pDUWtKZG1GeUlGOW5NU0E5SURBN0Nna0pDUWtKQ1haaGNpQmZaeklnUFNCamIyNHVYMTl3WVhKaGJYTmZYenNLQ1FrSkNRa0pkMmhwYkdVb2RISjFaU2tnZXdvSkNRa0pDUWtKYVdZb0lTaGZaekVnUENCZlp6SXViR1Z1WjNSb0tTa2dld29KQ1FrSkNRa0pDV0p5WldGck93b0pDUWtKQ1FrSmZRb0pDUWtKQ1FrSmRtRnlJSEFnUFNCZlp6SmJYMmN4WFRzS0NRa0pDUWtKQ1Y5bk1TQTlJRjluTVNBcklERTdDZ2tKQ1FrSkNRbGZaeTV3ZFhOb0tHcHpYMEp2YjNRdVgxOXpkSEpwYm1kZmNtVmpLRzliY0Ywc2N5a3BPd29KQ1FrSkNRbDlDZ2tKQ1FrSmZRb0pDUWtKQ1NSeUlEMGdYMmM3Q2drSkNRa0pjbVYwZFhKdUlDUnlPd29KQ1FrSmZTaDBhR2x6S1NrcExtcHZhVzRvSWl3aUtTQXJJQ0lwSWpzS0NRa0pmU0JsYkhObElIc0tDUWtKQ1hKbGRIVnliaUJ1T3dvSkNRbDlDZ2tKZlFvSkNXbG1LQ2dvYnlrZ2FXNXpkR0Z1WTJWdlppQkJjbkpoZVNrcElIc0tDUWtKZG1GeUlITjBjaUE5SUNKYklqc0tDUWtKY3lBclBTQWlYSFFpT3dvSkNRbDJZWElnWDJjZ1BTQXdPd29KQ1FsMllYSWdYMmN4SUQwZ2J5NXNaVzVuZEdnN0Nna0pDWGRvYVd4bEtGOW5JRHdnWDJjeEtTQjdDZ2tKQ1FsMllYSWdhU0E5SUY5bkt5czdDZ2tKQ1FsemRISWdLejBnS0drZ1BpQXdJRDhnSWl3aUlEb2dJaUlwSUNzZ2FuTmZRbTl2ZEM1ZlgzTjBjbWx1WjE5eVpXTW9iMXRwWFN4ektUc0tDUWtKZlFvSkNRbHpkSElnS3owZ0lsMGlPd29KQ1FseVpYUjFjbTRnYzNSeU93b0pDWDBLQ1FsMllYSWdkRzl6ZEhJN0Nna0pkSEo1SUhzS0NRa0pkRzl6ZEhJZ1BTQnZMblJ2VTNSeWFXNW5Pd29KQ1gwZ1kyRjBZMmdvSUY5bklDa2dld29KQ1FseVpYUjFjbTRnSWo4L1B5STdDZ2tKZlFvSkNXbG1LSFJ2YzNSeUlDRTlJRzUxYkd3Z0ppWWdkRzl6ZEhJZ0lUMGdUMkpxWldOMExuUnZVM1J5YVc1bklDWW1JSFI1Y0dWdlppaDBiM04wY2lrZ1BUMGdJbVoxYm1OMGFXOXVJaWtnZXdvSkNRbDJZWElnY3pJZ1BTQnZMblJ2VTNSeWFXNW5LQ2s3Q2drSkNXbG1LSE15SUNFOUlDSmJiMkpxWldOMElFOWlhbVZqZEYwaUtTQjdDZ2tKQ1FseVpYUjFjbTRnY3pJN0Nna0pDWDBLQ1FsOUNna0pkbUZ5SUhOMGNpQTlJQ0o3WEc0aU93b0pDWE1nS3owZ0lseDBJanNLQ1FsMllYSWdhR0Z6Y0NBOUlHOHVhR0Z6VDNkdVVISnZjR1Z5ZEhrZ0lUMGdiblZzYkRzS0NRbDJZWElnYXlBOUlHNTFiR3c3Q2drSlptOXlLQ0JySUdsdUlHOGdLU0I3Q2drSmFXWW9hR0Z6Y0NBbUppQWhieTVvWVhOUGQyNVFjbTl3WlhKMGVTaHJLU2tnZXdvSkNRbGpiMjUwYVc1MVpUc0tDUWw5Q2drSmFXWW9heUE5UFNBaWNISnZkRzkwZVhCbElpQjhmQ0JySUQwOUlDSmZYMk5zWVhOelgxOGlJSHg4SUdzZ1BUMGdJbDlmYzNWd1pYSmZYeUlnZkh3Z2F5QTlQU0FpWDE5cGJuUmxjbVpoWTJWelgxOGlJSHg4SUdzZ1BUMGdJbDlmY0hKdmNHVnlkR2xsYzE5Zklpa2dld29KQ1FsamIyNTBhVzUxWlRzS0NRbDlDZ2tKYVdZb2MzUnlMbXhsYm1kMGFDQWhQU0F5S1NCN0Nna0pDWE4wY2lBclBTQWlMQ0JjYmlJN0Nna0pmUW9KQ1hOMGNpQXJQU0J6SUNzZ2F5QXJJQ0lnT2lBaUlDc2dhbk5mUW05dmRDNWZYM04wY21sdVoxOXlaV01vYjF0clhTeHpLVHNLQ1FsOUNna0pjeUE5SUhNdWMzVmljM1J5YVc1bktERXBPd29KQ1hOMGNpQXJQU0FpWEc0aUlDc2djeUFySUNKOUlqc0tDUWx5WlhSMWNtNGdjM1J5T3dvSlkyRnpaU0FpYzNSeWFXNW5Jam9LQ1FseVpYUjFjbTRnYnpzS0NXUmxabUYxYkhRNkNna0pjbVYwZFhKdUlGTjBjbWx1WnlodktUc0tDWDBLZlRzS0pHZHNiMkpoYkM0a2FHRjRaVlZKUkNCOFBTQXdPd3BwWmloMGVYQmxiMllvY0dWeVptOXliV0Z1WTJVcElDRTlJQ0oxYm1SbFptbHVaV1FpSUQ4Z2RIbHdaVzltS0hCbGNtWnZjbTFoYm1ObExtNXZkeWtnUFQwZ0ltWjFibU4wYVc5dUlpQTZJR1poYkhObEtTQjdDZ2xJZUU5MlpYSnlhV1JsY3k1dWIzY2dQU0J3WlhKbWIzSnRZVzVqWlM1dWIzY3VZbWx1WkNod1pYSm1iM0p0WVc1alpTazdDbjBLSkdoNFEyeGhjM05sYzFzaVRXRjBhQ0pkSUQwZ1RXRjBhRHNLYVdZb0lGTjBjbWx1Wnk1bWNtOXRRMjlrWlZCdmFXNTBJRDA5SUc1MWJHd2dLU0JUZEhKcGJtY3Vabkp2YlVOdlpHVlFiMmx1ZENBOUlHWjFibU4wYVc5dUtHTXBJSHNnY21WMGRYSnVJR01nUENBd2VERXdNREF3SUQ4Z1UzUnlhVzVuTG1aeWIyMURhR0Z5UTI5a1pTaGpLU0E2SUZOMGNtbHVaeTVtY205dFEyaGhja052WkdVb0tHTStQakV3S1Nzd2VFUTNRekFwSzFOMGNtbHVaeTVtY205dFEyaGhja052WkdVb0tHTW1NSGd6UmtZcEt6QjRSRU13TUNrN0lIMEtVM1J5YVc1bkxsOWZibUZ0WlY5ZklEMGdkSEoxWlRzS0pHaDRRMnhoYzNObGMxc2lRWEp5WVhraVhTQTlJRUZ5Y21GNU93cEJjbkpoZVM1ZlgyNWhiV1ZmWHlBOUlIUnlkV1U3Q2tSaGRHVXVYMTl1WVcxbFgxOGdQU0FpUkdGMFpTSTdDbWhoZUdWZlVtVnpiM1Z5WTJVdVkyOXVkR1Z1ZENBOUlGdDdJRzVoYldVZ09pQWlYMmhsYkhCZmJXRndJaXdnWkdGMFlTQTZJQ0paYm10NFRYcHdlbUpYUm5OaVJXUm9ZMFY0Y0dKWGJEQmlNMnN3VDIxb2JHSklRalZOZWtFMldUSTVkVnB0Ykc1TWJrNHdZMjFXYUdKWGJIVmFlVFY2WWxkR2MySkZaR2hqUlhod1lsZHNNR1ZVWnpaYVIxWnRXVmhXYzJSR09XdE5RelF4V2pOcmVVMXFjSHBhV0ZKVldsaG9NRlpJU21oWk1uUlhZVmhPY0ZsdGJITmhXRkkxWWpGSmVHVlVTWHBQYkZKc1pVaFJiRTFxUWxWamJVWnFZVE5OYkUxcVFqSmhXRTV3V1cxNGJGVnFUakJhTTJ0NFRYcHdjV1JYTVhkVVIwWjVXakpXU0ZsWVFucGlNVWw0WlZSTmQwOXRUblppYlZwd1duazFlbVJJU214WlZ6RndZbTFqZFdGdVZuUmpSWGhvWTIxa2JGSXlSbmRqTVVsNlpFZGtOVTFVYXpaYVNFcDBXRE5PYkdOdVdteGpiRGt6WVZkU2JHUnRiSFZhVnpsVFRWaHJlRTlFY0dwaU1qQjFaREpzYTFwWVduQmliVlYxV1ZkNGQyRkhSbE5OTTJzd1QwUndiMlJJVW5kamVWVjZVVk5WZVZKcFZYbFNibVJ3V2tkV01tRlhOV3hNV0VKNVlqTm9OVXh0Um5kalNFNTNZak5SZFZreU9YUktWRXBIWTBoS2RtVkliRzVsVkVsM1QyMVNlV0pXT1hwYVdFb3lXbGhLWm1OSGVHaGxXRXBzV1ZkU05XSXhTWGhsVkVsNlQyMU9kbUpUTlhSaFYwNTVZak5PZGxwdVVYVmpSM2hvWlZoS2JGbFhValZWYWs0MVRWUmpNazl0YURCa1NFSjZTbFJPUWtwVVNrZEtWRXBIWTBkNGFHVllTbXhaVjFJMVRHMVNjR050Vm1wa1NGSm9ZMGhOZFdKdFZqQktWRXBIWTBoSmJFMXJXbnBrYlUxc1RXdGFlV0ZYWkc5a1NFNTBXVmMxYUZveVZubE1iVVo2WWxobmJFMHdXbEZpUjBZMVZXMXNibUZJVVd4Tk1GRjRTbFJKTWxaWVRteFZNbXgwWTBkNGJGUnRPWFZWUjFaNVl6SnNlbVJIVm5Wa1JYaHdXVEpXZFdNeVZXeE5NRkY0U2xSSk1sVkhlR2hsVlZaMVdWZEtjMXBZU25wS1ZFNUZUbnBuTWs1cVNUTlNSR2QwVVhwS1FrNXBNREJPUlVwR1RGUm9SMDlFWjNSTlJHaENVbFJKTVU1VlNYZE5WVVV6V2pKbkluMWRPd3BvWVhobFgyUnpYMDlpYW1WamRFMWhjQzVqYjNWdWRDQTlJREE3Q21welgwSnZiM1F1WDE5MGIxTjBjaUE5SUNoN0lIMHBMblJ2VTNSeWFXNW5Pd3BCY21kaGJpNUlSVXhRWDFKRlUwOVZVa05GWDB0RldTQTlJQ0pmYUdWc2NGOXRZWEFpT3dwb1lYaGxYMVZ1YzJWeWFXRnNhWHBsY2k1RVJVWkJWVXhVWDFKRlUwOU1Wa1ZTSUQwZ2JtVjNJR2hoZUdWZlh5UlZibk5sY21saGJHbDZaWEpmUkdWbVlYVnNkRkpsYzI5c2RtVnlLQ2s3Q21oaGVHVmZWVzV6WlhKcFlXeHBlbVZ5TGtKQlUwVTJOQ0E5SUNKQlFrTkVSVVpIU0VsS1MweE5UazlRVVZKVFZGVldWMWhaV21GaVkyUmxabWRvYVdwcmJHMXViM0J4Y25OMGRYWjNlSGw2TURFeU16UTFOamM0T1NVNklqc0thR0Y0WlY5amNubHdkRzlmUW1GelpUWTBMa05JUVZKVElEMGdJa0ZDUTBSRlJrZElTVXBMVEUxT1QxQlJVbE5VVlZaWFdGbGFZV0pqWkdWbVoyaHBhbXRzYlc1dmNIRnljM1IxZG5kNGVYb3dNVEl6TkRVMk56ZzVLeThpT3dwb1lYaGxYMk55ZVhCMGIxOUNZWE5sTmpRdVFsbFVSVk1nUFNCb1lYaGxYMmx2WDBKNWRHVnpMbTltVTNSeWFXNW5LR2hoZUdWZlkzSjVjSFJ2WDBKaGMyVTJOQzVEU0VGU1V5azdDbE5vWVd0aExtMWhhVzRvS1RzS2ZTa29kSGx3Wlc5bUlIZHBibVJ2ZHlBaFBTQWlkVzVrWldacGJtVmtJaUEvSUhkcGJtUnZkeUE2SUhSNWNHVnZaaUJuYkc5aVlXd2dJVDBnSW5WdVpHVm1hVzVsWkNJZ1B5Qm5iRzlpWVd3Z09pQjBlWEJsYjJZZ2MyVnNaaUFoUFNBaWRXNWtaV1pwYm1Wa0lpQS9JSE5sYkdZZ09pQjBhR2x6S1RzSw"},{ name : "hasplayer-argan", data : "eyJkcm1fc2VydmVyX3BsYXlyZWFkeSI6eyJoZWxwIjoiY29tLm1pY3Jvc29mdC5wbGF5cmVhZHkiLCJkZWZhdWx0XyI6Imh0dHBzOi8vcGxheXJlYWR5LmRpcmVjdHRhcHMubmV0L3ByL3N2Yy9yaWdodHNtYW5hZ2VyLmFzbXg/UGxheVJpZ2h0PTEmVXNlU2ltcGxlTm9uUGVyc2lzdGVudExpY2Vuc2U9MSZQbGF5RW5hYmxlcnM9Nzg2NjI3RDgtQzJBNi00NEJFLThGODgtMDhBRTI1NUIwMUE3In0sImRybV9zZXJ2ZXJfd2lkZXZpbmUiOnsiaGVscCI6ImNvbS53aWRldmluZS5hbHBoYSIsImRlZmF1bHRfIjoiaHR0cHM6Ly93aWRldmluZS1wcm94eS5hcHBzcG90LmNvbS9wcm94eSJ9LCJkZWJ1Z19sZXZlbCI6eyJoZWxwIjoic2V0IGRlYnVnIGxldmVsIiwiZGVmYXVsdF8iOjR9fQ"},{ name : "shaka-src", data : "ewogICAgIjMuMi4wIjogWyJodHRwczovL2FqYXguZ29vZ2xlYXBpcy5jb20vYWpheC9saWJzL3NoYWthLXBsYXllci8zLjIuMC9zaGFrYS1wbGF5ZXIuY29tcGlsZWQuanMiXSwKICAgICIzLjEuMCI6IFsiaHR0cHM6Ly9hamF4Lmdvb2dsZWFwaXMuY29tL2FqYXgvbGlicy9zaGFrYS1wbGF5ZXIvMy4xLjAvc2hha2EtcGxheWVyLmNvbXBpbGVkLmpzIl0sCiAgICAiMy4wLjEwIjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zaGFrYS1wbGF5ZXIvMy4wLjEwL3NoYWthLXBsYXllci5jb21waWxlZC5qcyJdLAogICAgIjMuMC41IjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zaGFrYS1wbGF5ZXIvMy4wLjUvc2hha2EtcGxheWVyLmNvbXBpbGVkLmpzIl0sCiAgICAiMy4wLjQiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NoYWthLXBsYXllci8zLjAuNC9zaGFrYS1wbGF5ZXIuY29tcGlsZWQuanMiXSwKICAgICIzLjAuMyI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2hha2EtcGxheWVyLzMuMC4zL3NoYWthLXBsYXllci5jb21waWxlZC5qcyJdLAogICAgIjMuMC4yIjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zaGFrYS1wbGF5ZXIvMy4wLjIvc2hha2EtcGxheWVyLmNvbXBpbGVkLmpzIl0sCiAgICAiMy4wLjEiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NoYWthLXBsYXllci8zLjAuMS9zaGFrYS1wbGF5ZXIuY29tcGlsZWQuanMiXSwKICAgICIzLjAuMCI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2hha2EtcGxheWVyLzMuMC4wL3NoYWthLXBsYXllci5jb21waWxlZC5qcyJdLAogICAgIjIuNS4xNyI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2hha2EtcGxheWVyLzIuNS4xNy9zaGFrYS1wbGF5ZXIuY29tcGlsZWQuZGVidWcuanMiXSwKICAgICIyLjUuMTYiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NoYWthLXBsYXllci8yLjUuMTYvc2hha2EtcGxheWVyLmNvbXBpbGVkLmRlYnVnLmpzIl0sCiAgICAiMi41LjE1IjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zaGFrYS1wbGF5ZXIvMi41LjE1L3NoYWthLXBsYXllci5jb21waWxlZC5kZWJ1Zy5qcyJdLAogICAgIjIuNS4xNCI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2hha2EtcGxheWVyLzIuNS4xNC9zaGFrYS1wbGF5ZXIuY29tcGlsZWQuZGVidWcuanMiXSwKICAgICIyLjUuMTIiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NoYWthLXBsYXllci8yLjUuMTIvc2hha2EtcGxheWVyLmNvbXBpbGVkLmRlYnVnLmpzIl0sCiAgICAiMi41LjExIjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zaGFrYS1wbGF5ZXIvMi41LjExL3NoYWthLXBsYXllci5jb21waWxlZC5kZWJ1Zy5qcyJdLAogICAgIjIuNS4xMCI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2hha2EtcGxheWVyLzIuNS4xMC9zaGFrYS1wbGF5ZXIuY29tcGlsZWQuZGVidWcuanMiXSwKICAgICIyLjUuOSI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2hha2EtcGxheWVyLzIuNS45L3NoYWthLXBsYXllci5jb21waWxlZC5kZWJ1Zy5qcyJdLAogICAgIjIuNS44IjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zaGFrYS1wbGF5ZXIvMi41Ljgvc2hha2EtcGxheWVyLmNvbXBpbGVkLmRlYnVnLmpzIl0sCiAgICAiMi41LjYiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NoYWthLXBsYXllci8yLjUuNi9zaGFrYS1wbGF5ZXIuY29tcGlsZWQuZGVidWcuanMiXSwKICAgICIyLjUuNSI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2hha2EtcGxheWVyLzIuNS41L3NoYWthLXBsYXllci5jb21waWxlZC5kZWJ1Zy5qcyJdLAogICAgIjIuNS40IjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zaGFrYS1wbGF5ZXIvMi41LjQvc2hha2EtcGxheWVyLmNvbXBpbGVkLmRlYnVnLmpzIl0sCiAgICAiMi41LjMiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NoYWthLXBsYXllci8yLjUuMy9zaGFrYS1wbGF5ZXIuY29tcGlsZWQuZGVidWcuanMiXSwKICAgICIyLjUuMiI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2hha2EtcGxheWVyLzIuNS4yL3NoYWthLXBsYXllci5jb21waWxlZC5kZWJ1Zy5qcyJdLAogICAgIjIuNS4xIjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zaGFrYS1wbGF5ZXIvMi41LjEvc2hha2EtcGxheWVyLmNvbXBpbGVkLmRlYnVnLmpzIl0sCiAgICAiMi40LjciOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NoYWthLXBsYXllci8yLjQuNy9zaGFrYS1wbGF5ZXIuY29tcGlsZWQuZGVidWcuanMiXSwKICAgICIyLjQuNiI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2hha2EtcGxheWVyLzIuNC42L3NoYWthLXBsYXllci5jb21waWxlZC5kZWJ1Zy5qcyJdLAogICAgIjIuNC41IjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zaGFrYS1wbGF5ZXIvMi40LjUvc2hha2EtcGxheWVyLmNvbXBpbGVkLmRlYnVnLmpzIl0sCiAgICAiMi40LjQiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NoYWthLXBsYXllci8yLjQuNC9zaGFrYS1wbGF5ZXIuY29tcGlsZWQuZGVidWcuanMiXSwKICAgICIyLjQuMyI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2hha2EtcGxheWVyLzIuNC4zL3NoYWthLXBsYXllci5jb21waWxlZC5kZWJ1Zy5qcyJdLAogICAgIjIuNC4yIjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zaGFrYS1wbGF5ZXIvMi40LjIvc2hha2EtcGxheWVyLmNvbXBpbGVkLmRlYnVnLmpzIl0sCiAgICAiMi40LjEiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NoYWthLXBsYXllci8yLjQuMS9zaGFrYS1wbGF5ZXIuY29tcGlsZWQuZGVidWcuanMiXSwKICAgICIyLjQuMCI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2hha2EtcGxheWVyLzIuNC4wL3NoYWthLXBsYXllci5jb21waWxlZC5kZWJ1Zy5qcyJdLAogICAgIjIuMy45IjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zaGFrYS1wbGF5ZXIvMi4zLjkvc2hha2EtcGxheWVyLmNvbXBpbGVkLmRlYnVnLmpzIl0sCiAgICAiMi4zLjgiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NoYWthLXBsYXllci8yLjMuOC9zaGFrYS1wbGF5ZXIuY29tcGlsZWQuZGVidWcuanMiXSwKICAgICIyLjMuNyI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2hha2EtcGxheWVyLzIuMy43L3NoYWthLXBsYXllci5jb21waWxlZC5kZWJ1Zy5qcyJdLAogICAgIjIuMy42IjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zaGFrYS1wbGF5ZXIvMi4zLjYvc2hha2EtcGxheWVyLmNvbXBpbGVkLmRlYnVnLmpzIl0sCiAgICAiMi4zLjUiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NoYWthLXBsYXllci8yLjMuNS9zaGFrYS1wbGF5ZXIuY29tcGlsZWQuZGVidWcuanMiXSwKICAgICIyLjMuNCI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2hha2EtcGxheWVyLzIuMy40L3NoYWthLXBsYXllci5jb21waWxlZC5kZWJ1Zy5qcyJdLAogICAgIjIuMy4zIjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zaGFrYS1wbGF5ZXIvMi4zLjMvc2hha2EtcGxheWVyLmNvbXBpbGVkLmRlYnVnLmpzIl0sCiAgICAiMi4zLjIiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NoYWthLXBsYXllci8yLjMuMi9zaGFrYS1wbGF5ZXIuY29tcGlsZWQuZGVidWcuanMiXSwKICAgICIyLjMuMSI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2hha2EtcGxheWVyLzIuMy4xL3NoYWthLXBsYXllci5jb21waWxlZC5kZWJ1Zy5qcyJdLAogICAgIjIuMy4wIjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zaGFrYS1wbGF5ZXIvMi4zLjAvc2hha2EtcGxheWVyLmNvbXBpbGVkLmRlYnVnLmpzIl0sCiAgICAiMi4yLjEwIjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zaGFrYS1wbGF5ZXIvMi4yLjEwL3NoYWthLXBsYXllci5jb21waWxlZC5kZWJ1Zy5qcyJdLAogICAgIjIuMi45IjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zaGFrYS1wbGF5ZXIvMi4yLjkvc2hha2EtcGxheWVyLmNvbXBpbGVkLmRlYnVnLmpzIl0sCiAgICAiMi4yLjgiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NoYWthLXBsYXllci8yLjIuOC9zaGFrYS1wbGF5ZXIuY29tcGlsZWQuZGVidWcuanMiXSwKICAgICIyLjIuNyI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2hha2EtcGxheWVyLzIuMi43L3NoYWthLXBsYXllci5jb21waWxlZC5kZWJ1Zy5qcyJdLAogICAgIjIuMi42IjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zaGFrYS1wbGF5ZXIvMi4yLjYvc2hha2EtcGxheWVyLmNvbXBpbGVkLmRlYnVnLmpzIl0sCiAgICAiMi4yLjUiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NoYWthLXBsYXllci8yLjIuNS9zaGFrYS1wbGF5ZXIuY29tcGlsZWQuZGVidWcuanMiXSwKICAgICIyLjIuNCI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2hha2EtcGxheWVyLzIuMi40L3NoYWthLXBsYXllci5jb21waWxlZC5kZWJ1Zy5qcyJdLAogICAgIjIuMi4zIjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zaGFrYS1wbGF5ZXIvMi4yLjMvc2hha2EtcGxheWVyLmNvbXBpbGVkLmRlYnVnLmpzIl0sCiAgICAiMi4yLjIiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NoYWthLXBsYXllci8yLjIuMi9zaGFrYS1wbGF5ZXIuY29tcGlsZWQuZGVidWcuanMiXSwKICAgICIyLjIuMSI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2hha2EtcGxheWVyLzIuMi4xL3NoYWthLXBsYXllci5jb21waWxlZC5kZWJ1Zy5qcyJdLAogICAgIjIuMi4wIjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zaGFrYS1wbGF5ZXIvMi4yLjAvc2hha2EtcGxheWVyLmNvbXBpbGVkLmRlYnVnLmpzIl0sCiAgICAiMi4xLjkiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NoYWthLXBsYXllci8yLjEuOS9zaGFrYS1wbGF5ZXIuY29tcGlsZWQuZGVidWcuanMiXSwKICAgICIyLjEuOCI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2hha2EtcGxheWVyLzIuMS44L3NoYWthLXBsYXllci5jb21waWxlZC5kZWJ1Zy5qcyJdLAogICAgIjIuMS43IjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zaGFrYS1wbGF5ZXIvMi4xLjcvc2hha2EtcGxheWVyLmNvbXBpbGVkLmRlYnVnLmpzIl0sCiAgICAiMi4xLjYiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NoYWthLXBsYXllci8yLjEuNi9zaGFrYS1wbGF5ZXIuY29tcGlsZWQuZGVidWcuanMiXSwKICAgICIyLjEuNSI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2hha2EtcGxheWVyLzIuMS41L3NoYWthLXBsYXllci5jb21waWxlZC5kZWJ1Zy5qcyJdLAogICAgIjIuMS40IjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zaGFrYS1wbGF5ZXIvMi4xLjQvc2hha2EtcGxheWVyLmNvbXBpbGVkLmRlYnVnLmpzIl0sCiAgICAiMi4xLjMiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NoYWthLXBsYXllci8yLjEuMy9zaGFrYS1wbGF5ZXIuY29tcGlsZWQuZGVidWcuanMiXSwKICAgICIyLjEuMiI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2hha2EtcGxheWVyLzIuMS4yL3NoYWthLXBsYXllci5jb21waWxlZC5kZWJ1Zy5qcyJdLAogICAgIjIuMS4xIjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zaGFrYS1wbGF5ZXIvMi4xLjEvc2hha2EtcGxheWVyLmNvbXBpbGVkLmRlYnVnLmpzIl0sCiAgICAiMi4xLjAiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NoYWthLXBsYXllci8yLjEuMC9zaGFrYS1wbGF5ZXIuY29tcGlsZWQuZGVidWcuanMiXSwKICAgICIyLjAuOCI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2hha2EtcGxheWVyLzIuMC44L3NoYWthLXBsYXllci5jb21waWxlZC5kZWJ1Zy5qcyJdLAogICAgIjIuMC43IjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zaGFrYS1wbGF5ZXIvMi4wLjcvc2hha2EtcGxheWVyLmNvbXBpbGVkLmRlYnVnLmpzIl0sCiAgICAiMi4wLjYiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NoYWthLXBsYXllci8yLjAuNi9zaGFrYS1wbGF5ZXIuY29tcGlsZWQuZGVidWcuanMiXSwKICAgICIyLjAuNSI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2hha2EtcGxheWVyLzIuMC41L3NoYWthLXBsYXllci5jb21waWxlZC5kZWJ1Zy5qcyJdLAogICAgIjIuMC40IjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zaGFrYS1wbGF5ZXIvMi4wLjQvc2hha2EtcGxheWVyLmNvbXBpbGVkLmRlYnVnLmpzIl0sCiAgICAiMi4wLjMiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NoYWthLXBsYXllci8yLjAuMy9zaGFrYS1wbGF5ZXIuY29tcGlsZWQuZGVidWcuanMiXSwKICAgICIyLjAuMiI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2hha2EtcGxheWVyLzIuMC4yL3NoYWthLXBsYXllci5jb21waWxlZC5kZWJ1Zy5qcyJdLAogICAgIjIuMC4xIjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zaGFrYS1wbGF5ZXIvMi4wLjEvc2hha2EtcGxheWVyLmNvbXBpbGVkLmRlYnVnLmpzIl0sCiAgICAiMi4wLjAtYmV0YTMiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NoYWthLXBsYXllci8yLjAuMC1iZXRhMy9zaGFrYS1wbGF5ZXIuY29tcGlsZWQuZGVidWcuanMiXSwKICAgICIyLjAuMC1iZXRhMiI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2hha2EtcGxheWVyLzIuMC4wLWJldGEyL3NoYWthLXBsYXllci5jb21waWxlZC5kZWJ1Zy5qcyJdLAogICAgIjIuMC4wLWJldGEiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NoYWthLXBsYXllci8yLjAuMC1iZXRhL3NoYWthLXBsYXllci5jb21waWxlZC5kZWJ1Zy5qcyJdLAogICAgIjIuMC4wIjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zaGFrYS1wbGF5ZXIvMi4wLjAvc2hha2EtcGxheWVyLmNvbXBpbGVkLmRlYnVnLmpzIl0sCiAgICAiMS42LjUiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NoYWthLXBsYXllci8xLjYuNS9zaGFrYS1wbGF5ZXIuY29tcGlsZWQuZGVidWcuanMiXSwKICAgICIxLjYuNCI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2hha2EtcGxheWVyLzEuNi40L3NoYWthLXBsYXllci5jb21waWxlZC5kZWJ1Zy5qcyJdLAogICAgIjEuNi4zIjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zaGFrYS1wbGF5ZXIvMS42LjMvc2hha2EtcGxheWVyLmNvbXBpbGVkLmpzIl0sCiAgICAiMS42LjIiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NoYWthLXBsYXllci8xLjYuMi9zaGFrYS1wbGF5ZXIuY29tcGlsZWQuanMiXSwKICAgICIxLjYuMSI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2hha2EtcGxheWVyLzEuNi4xL3NoYWthLXBsYXllci5jb21waWxlZC5qcyJdLAogICAgIjEuNi4wIjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zaGFrYS1wbGF5ZXIvMS42LjAvc2hha2EtcGxheWVyLmNvbXBpbGVkLmpzIl0sCiAgICAiMS41LjIiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NoYWthLXBsYXllci8xLjUuMi9zaGFrYS1wbGF5ZXIuY29tcGlsZWQuanMiXSwKICAgICIxLjUuMSI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2hha2EtcGxheWVyLzEuNS4xL3NoYWthLXBsYXllci5jb21waWxlZC5qcyJdLAogICAgIjEuNS4wIjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zaGFrYS1wbGF5ZXIvMS41LjAvc2hha2EtcGxheWVyLmNvbXBpbGVkLmpzIl0sCiAgICAiMS40LjIiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NoYWthLXBsYXllci8xLjQuMi9zaGFrYS1wbGF5ZXIuY29tcGlsZWQuanMiXSwKICAgICIxLjQuMSI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2hha2EtcGxheWVyLzEuNC4xL3NoYWthLXBsYXllci5jb21waWxlZC5qcyJdLAogICAgIjEuNC4wIjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zaGFrYS1wbGF5ZXIvMS40LjAvc2hha2EtcGxheWVyLmNvbXBpbGVkLmpzIl0sCiAgICAiMS4zLjIiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NoYWthLXBsYXllci8xLjMuMi9zaGFrYS1wbGF5ZXIuY29tcGlsZWQuanMiXSwKICAgICIxLjMuMSI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2hha2EtcGxheWVyLzEuMy4xL3NoYWthLXBsYXllci5jb21waWxlZC5qcyJdLAogICAgIjEuMy4wIjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zaGFrYS1wbGF5ZXIvMS4zLjAvc2hha2EtcGxheWVyLmNvbXBpbGVkLmpzIl0sCiAgICAiMS4yLjQiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NoYWthLXBsYXllci8xLjIuNC9zaGFrYS1wbGF5ZXIuY29tcGlsZWQuanMiXSwKICAgICIxLjIuMyI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2hha2EtcGxheWVyLzEuMi4zL3NoYWthLXBsYXllci5jb21waWxlZC5qcyJdLAogICAgIjEuMi4yIjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zaGFrYS1wbGF5ZXIvMS4yLjIvc2hha2EtcGxheWVyLmNvbXBpbGVkLmpzIl0sCiAgICAiMS4yLjAiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NoYWthLXBsYXllci8xLjIuMC9zaGFrYS1wbGF5ZXIuY29tcGlsZWQuanMiXSwKICAgICIxLjEuMCI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2hha2EtcGxheWVyLzEuMS4wL3NoYWthLXBsYXllci5jb21waWxlZC5qcyJdCn0K"},{ name : "hasplayer", data : "ZGF0YTp0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTg7YmFzZTY0LEtHWjFibU4wYVc5dUlDZ2taMnh2WW1Gc0tTQjdJQ0oxYzJVZ2MzUnlhV04wSWpzS2RtRnlJQ1JvZUVOc1lYTnpaWE1nUFNCN2ZTd2taWE4wY2lBOUlHWjFibU4wYVc5dUtDa2dleUJ5WlhSMWNtNGdhbk5mUW05dmRDNWZYM04wY21sdVoxOXlaV01vZEdocGN5d25KeWs3SUgwc0pHaDRSVzUxYlhNZ1BTQWthSGhGYm5WdGN5QjhmQ0I3ZlN3a1h6c0tablZ1WTNScGIyNGdKR1Y0ZEdWdVpDaG1jbTl0TENCbWFXVnNaSE1wSUhzS0NYWmhjaUJ3Y205MGJ5QTlJRTlpYW1WamRDNWpjbVZoZEdVb1puSnZiU2s3Q2dsbWIzSWdLSFpoY2lCdVlXMWxJR2x1SUdacFpXeGtjeWtnY0hKdmRHOWJibUZ0WlYwZ1BTQm1hV1ZzWkhOYmJtRnRaVjA3Q2dscFppZ2dabWxsYkdSekxuUnZVM1J5YVc1bklDRTlQU0JQWW1wbFkzUXVjSEp2ZEc5MGVYQmxMblJ2VTNSeWFXNW5JQ2tnY0hKdmRHOHVkRzlUZEhKcGJtY2dQU0JtYVdWc1pITXVkRzlUZEhKcGJtYzdDZ2x5WlhSMWNtNGdjSEp2ZEc4N0NuMEtkbUZ5SUVGeVoyRnVJRDBnWm5WdVkzUnBiMjRvS1NCN0lIMDdDaVJvZUVOc1lYTnpaWE5iSWtGeVoyRnVJbDBnUFNCQmNtZGhianNLUVhKbllXNHVYMTl1WVcxbFgxOGdQU0IwY25WbE93cEJjbWRoYmk1emRHRnlkQ0E5SUdaMWJtTjBhVzl1S0dOdmJtWnBaeWtnZXdvSmFXWW9iblZzYkNBaFBTQmpiMjVtYVdjcElIc0tDUWwyWVhJZ1lYSm5jMTl6WlhRZ1BTQnVaWGNnYUdGNFpWOWtjMTlUZEhKcGJtZE5ZWEFvS1RzS0NRbDJZWElnWDJjZ1BTQXdPd29KQ1haaGNpQmZaekVnUFNCU1pXWnNaV04wTG1acFpXeGtjeWhqYjI1bWFXY3BPd29KQ1hkb2FXeGxLRjluSUR3Z1gyY3hMbXhsYm1kMGFDa2dld29KQ1FsMllYSWdaaUE5SUY5bk1WdGZaMTA3Q2drSkNTc3JYMmM3Q2drSkNXRnlaM05mYzJWMExtaGJabDBnUFNCU1pXWnNaV04wTG1acFpXeGtLR052Ym1acFp5eG1LVHNLQ1FsOUNna0pRWEpuWVc0dVlYSm5jeUE5SUdGeVozTmZjMlYwT3dvSmZRcDlPd3BCY21kaGJpNXZZbXBsWTNSR2NtOXRUV0Z3SUQwZ1puVnVZM1JwYjI0b2JXRndLU0I3Q2dsMllYSWdiMkpxSUQwZ2V5QjlPd29KZG1GeUlHZ2dQU0J0WVhBdWFEc0tDWFpoY2lCclgyZ2dQU0JvT3dvSmRtRnlJR3RmYTJWNWN5QTlJRTlpYW1WamRDNXJaWGx6S0dncE93b0pkbUZ5SUd0ZmJHVnVaM1JvSUQwZ2ExOXJaWGx6TG14bGJtZDBhRHNLQ1haaGNpQnJYMk4xY25KbGJuUWdQU0F3T3dvSmQyaHBiR1VvYTE5amRYSnlaVzUwSUR3Z2ExOXNaVzVuZEdncElIc0tDUWwyWVhJZ2F5QTlJR3RmYTJWNWMxdHJYMk4xY25KbGJuUXJLMTA3Q2drSmIySnFXMnRkSUQwZ2JXRndMbWhiYTEwN0NnbDlDZ2x5WlhSMWNtNGdiMkpxT3dwOU93cDJZWElnU0dGelVHeGhlV1Z5SUQwZ1puVnVZM1JwYjI0b0tTQjdJSDA3Q2lSb2VFTnNZWE56WlhOYklraGhjMUJzWVhsbGNpSmRJRDBnU0dGelVHeGhlV1Z5T3dwSVlYTlFiR0Y1WlhJdVgxOXVZVzFsWDE4Z1BTQjBjblZsT3dwSVlYTlFiR0Y1WlhJdWJXRnBiaUE5SUdaMWJtTjBhVzl1S0NrZ2V3b0pkbUZ5SUhCc1lYbGxjaUE5SUVoaGMxQnNZWGxsY2k1bGVIQnZjMlZmY0d4aGVXVnlLRzVsZHlCTlpXUnBZVkJzWVhsbGNpZ3BLVHNLQ1hkcGJtUnZkeTVvWld4d0lEMGdablZ1WTNScGIyNG9LU0I3Q2drSmNtVjBkWEp1SUVGeVoyRnVMbTlpYW1WamRFWnliMjFOWVhBb2FHRjRaVjlWYm5ObGNtbGhiR2w2WlhJdWNuVnVLR2hoZUdWZlVtVnpiM1Z5WTJVdVoyVjBVM1J5YVc1bktDSmZhR1ZzY0Y5dFlYQWlLU2twT3dvSmZUc0tDVUZ5WjJGdUxuTjBZWEowS0hkcGJtUnZkeTVqYjI1bWFXY3BPd29KZEhKNUlIc0tDUWwyWVhJZ2RtbGtaVzlmWld4bGJXVnVkQ0E5SUdSdlkzVnRaVzUwTG1kbGRFVnNaVzFsYm5SQ2VVbGtLQ0oyYVdSbGJ5SXBPd29KQ1hCc1lYbGxjaTVwYm1sMEtIWnBaR1Z2WDJWc1pXMWxiblFwT3dvSkNYWmhjaUIwYlhBZ1BTQjJhV1JsYjE5bGJHVnRaVzUwTG1oaGMwRjBkSEpwWW5WMFpTZ2lZWFYwYjNCc1lYa2lLVHNLQ1Fsd2JHRjVaWEl1YzJWMFFYVjBiMUJzWVhrb2RHMXdLVHNLQ1FsMllYSWdkRzF3SUQwZ2NHeGhlV1Z5TG1kbGRFUmxZblZuS0NrN0Nna0pkbUZ5SUhSdGNERWdQU0JCY21kaGJpNWhjbWR6SUNFOUlHNTFiR3dnSmlZZ1QySnFaV04wTG5CeWIzUnZkSGx3WlM1b1lYTlBkMjVRY205d1pYSjBlUzVqWVd4c0tFRnlaMkZ1TG1GeVozTXVhQ3dpWkdWaWRXZGZiR1YyWld3aUtUc0tDUWwwYlhBdWMyVjBUR1YyWld3b2RHMXdNU0EvSUZOMFpDNXdZWEp6WlVsdWRDaEJjbWRoYmk1aGNtZHpMbWhiSW1SbFluVm5YMnhsZG1Wc0lsMHBJRG9nTkNrN0Nna0pkbUZ5SUhOMGNtVmhiU0E5SUVGeVoyRnVMbUZ5WjNNZ0lUMGdiblZzYkNBbUppQlBZbXBsWTNRdWNISnZkRzkwZVhCbExtaGhjMDkzYmxCeWIzQmxjblI1TG1OaGJHd29RWEpuWVc0dVlYSm5jeTVvTENKa2NtMWZjMlZ5ZG1WeVgzZHBaR1YyYVc1bElpa2dQeUJCY21kaGJpNWhjbWR6TG1oYkltUnliVjl6WlhKMlpYSmZkMmxrWlhacGJtVWlYU0E2SUNKb2RIUndjem92TDNkcFpHVjJhVzVsTFhCeWIzaDVMbUZ3Y0hOd2IzUXVZMjl0TDNCeWIzaDVJanNLQ1FsMllYSWdjM1J5WldGdE1TQTlJRUZ5WjJGdUxtRnlaM01nSVQwZ2JuVnNiQ0FtSmlCUFltcGxZM1F1Y0hKdmRHOTBlWEJsTG1oaGMwOTNibEJ5YjNCbGNuUjVMbU5oYkd3b1FYSm5ZVzR1WVhKbmN5NW9MQ0prY20xZmMyVnlkbVZ5WDNCc1lYbHlaV0ZrZVNJcE93b0pDWFpoY2lCemRISmxZVzB5SUQwZ2V5QjFjbXdnT2lCMWNta3NJSEJ5YjNSRVlYUmhJRG9nZXlBaVkyOXRMbmRwWkdWMmFXNWxMbUZzY0doaElpQTZJSHNnSW14aFZWSk1JaUE2SUhOMGNtVmhiWDBzSUNKamIyMHViV2xqY205emIyWjBMbkJzWVhseVpXRmtlU0lnT2lCN0lDSnNZVlZTVENJZ09pQnpkSEpsWVcweElEOGdRWEpuWVc0dVlYSm5jeTVvV3lKa2NtMWZjMlZ5ZG1WeVgzQnNZWGx5WldGa2VTSmRJRG9nSW1oMGRIQnpPaTh2Y0d4aGVYSmxZV1I1TG1ScGNtVmpkSFJoY0hNdWJtVjBMM0J5TDNOMll5OXlhV2RvZEhOdFlXNWhaMlZ5TG1GemJYZy9VR3hoZVZKcFoyaDBQVEVtVlhObFUybHRjR3hsVG05dVVHVnljMmx6ZEdWdWRFeHBZMlZ1YzJVOU1TWlFiR0Y1Ulc1aFlteGxjbk05TnpnMk5qSTNSRGd0UXpKQk5pMDBORUpGTFRoR09EZ3RNRGhCUlRJMU5VSXdNVUUzSW4xOWZUc0tDUWx3YkdGNVpYSXViRzloWkNoemRISmxZVzB5S1RzS0NYMGdZMkYwWTJnb0lGOW5JQ2tnZXdvSkNYWmhjaUJsSUQwZ2FHRjRaVjlGZUdObGNIUnBiMjR1WTJGMVoyaDBLRjluS1M1MWJuZHlZWEFvS1RzS0NRa2taMnh2WW1Gc0xtTnZibk52YkdVdWJHOW5LR1VwT3dvSmZRcDlPd3BJWVhOUWJHRjVaWEl1Wlhod2IzTmxYM0JzWVhsbGNpQTlJR1oxYm1OMGFXOXVLSEFwSUhzS0NYZHBibVJ2ZHk1d2JHRjVaWElnUFNCd093b0pjbVYwZFhKdUlIQTdDbjA3Q25aaGNpQkllRTkyWlhKeWFXUmxjeUE5SUdaMWJtTjBhVzl1S0NrZ2V5QjlPd29rYUhoRGJHRnpjMlZ6V3lKSWVFOTJaWEp5YVdSbGN5SmRJRDBnU0hoUGRtVnljbWxrWlhNN0NraDRUM1psY25KcFpHVnpMbDlmYm1GdFpWOWZJRDBnZEhKMVpUc0tTSGhQZG1WeWNtbGtaWE11YzNSeVJHRjBaU0E5SUdaMWJtTjBhVzl1S0hNcElIc0tDWE4zYVhSamFDaHpMbXhsYm1kMGFDa2dld29KWTJGelpTQTRPZ29KQ1haaGNpQnJJRDBnY3k1emNHeHBkQ2dpT2lJcE93b0pDWFpoY2lCa0lEMGdibVYzSUVSaGRHVW9LVHNLQ1Fsa1d5SnpaWFJVYVcxbElsMG9NQ2s3Q2drSlpGc2ljMlYwVlZSRFNHOTFjbk1pWFNocld6QmRLVHNLQ1Fsa1d5SnpaWFJWVkVOTmFXNTFkR1Z6SWwwb2Exc3hYU2s3Q2drSlpGc2ljMlYwVlZSRFUyVmpiMjVrY3lKZEtHdGJNbDBwT3dvSkNYSmxkSFZ5YmlCa093b0pZMkZ6WlNBeE1Eb0tDUWwyWVhJZ2F5QTlJSE11YzNCc2FYUW9JaTBpS1RzS0NRbHlaWFIxY200Z2JtVjNJRVJoZEdVb2Exc3dYU3hyV3pGZElDMGdNU3hyV3pKZExEQXNNQ3d3S1RzS0NXTmhjMlVnTVRrNkNna0pkbUZ5SUdzZ1BTQnpMbk53YkdsMEtDSWdJaWs3Q2drSmRtRnlJSGtnUFNCcld6QmRMbk53YkdsMEtDSXRJaWs3Q2drSmRtRnlJSFFnUFNCcld6RmRMbk53YkdsMEtDSTZJaWs3Q2drSmNtVjBkWEp1SUc1bGR5QkVZWFJsS0hsYk1GMHNlVnN4WFNBdElERXNlVnN5WFN4MFd6QmRMSFJiTVYwc2RGc3lYU2s3Q2dsa1pXWmhkV3gwT2dvSkNYUm9jbTkzSUdoaGVHVmZSWGhqWlhCMGFXOXVMblJvY205M2JpZ2lTVzUyWVd4cFpDQmtZWFJsSUdadmNtMWhkQ0E2SUNJZ0t5QnpLVHNLQ1gwS2ZUc0tTSGhQZG1WeWNtbGtaWE11WTJOaElEMGdablZ1WTNScGIyNG9jeXhwYm1SbGVDa2dld29KZG1GeUlIZ2dQU0J6TG1Ob1lYSkRiMlJsUVhRb2FXNWtaWGdwT3dvSmFXWW9lQ0FoUFNCNEtTQjdDZ2tKY21WMGRYSnVJSFZ1WkdWbWFXNWxaRHNLQ1gwS0NYSmxkSFZ5YmlCNE93cDlPd3BJZUU5MlpYSnlhV1JsY3k1emRXSnpkSElnUFNCbWRXNWpkR2x2YmloekxIQnZjeXhzWlc0cElIc0tDV2xtS0d4bGJpQTlQU0J1ZFd4c0tTQjdDZ2tKYkdWdUlEMGdjeTVzWlc1bmRHZzdDZ2w5SUdWc2MyVWdhV1lvYkdWdUlEd2dNQ2tnZXdvSkNXbG1LSEJ2Y3lBOVBTQXdLU0I3Q2drSkNXeGxiaUE5SUhNdWJHVnVaM1JvSUNzZ2JHVnVPd29KQ1gwZ1pXeHpaU0I3Q2drSkNYSmxkSFZ5YmlBaUlqc0tDUWw5Q2dsOUNnbHlaWFIxY200Z2N5NXpkV0p6ZEhJb2NHOXpMR3hsYmlrN0NuMDdDa2g0VDNabGNuSnBaR1Z6TG01dmR5QTlJR1oxYm1OMGFXOXVLQ2tnZXdvSmNtVjBkWEp1SUVSaGRHVXVibTkzS0NrN0NuMDdDazFoZEdndVgxOXVZVzFsWDE4Z1BTQjBjblZsT3dwMllYSWdVbVZtYkdWamRDQTlJR1oxYm1OMGFXOXVLQ2tnZXlCOU93b2thSGhEYkdGemMyVnpXeUpTWldac1pXTjBJbDBnUFNCU1pXWnNaV04wT3dwU1pXWnNaV04wTGw5ZmJtRnRaVjlmSUQwZ2RISjFaVHNLVW1WbWJHVmpkQzVtYVdWc1pDQTlJR1oxYm1OMGFXOXVLRzhzWm1sbGJHUXBJSHNLQ1hSeWVTQjdDZ2tKY21WMGRYSnVJRzliWm1sbGJHUmRPd29KZlNCallYUmphQ2dnWDJjZ0tTQjdDZ2tKY21WMGRYSnVJRzUxYkd3N0NnbDlDbjA3Q2xKbFpteGxZM1F1Wm1sbGJHUnpJRDBnWm5WdVkzUnBiMjRvYnlrZ2V3b0pkbUZ5SUdFZ1BTQmJYVHNLQ1dsbUtHOGdJVDBnYm5Wc2JDa2dld29KQ1haaGNpQm9ZWE5QZDI1UWNtOXdaWEowZVNBOUlFOWlhbVZqZEM1d2NtOTBiM1I1Y0dVdWFHRnpUM2R1VUhKdmNHVnlkSGs3Q2drSlptOXlLQ0IyWVhJZ1ppQnBiaUJ2SUNrZ2V3b0pDV2xtS0dZZ0lUMGdJbDlmYVdSZlh5SWdKaVlnWmlBaFBTQWlhSGhmWDJOc2IzTjFjbVZ6WDE4aUlDWW1JR2hoYzA5M2JsQnliM0JsY25SNUxtTmhiR3dvYnl4bUtTa2dld29KQ1FsaExuQjFjMmdvWmlrN0Nna0pmUW9KQ1gwS0NYMEtDWEpsZEhWeWJpQmhPd3A5T3dwU1pXWnNaV04wTG1selJuVnVZM1JwYjI0Z1BTQm1kVzVqZEdsdmJpaG1LU0I3Q2dscFppaDBlWEJsYjJZb1ppa2dQVDBnSW1aMWJtTjBhVzl1SWlrZ2V3b0pDWEpsZEhWeWJpQWhLR1l1WDE5dVlXMWxYMThnZkh3Z1ppNWZYMlZ1WVcxbFgxOHBPd29KZlNCbGJITmxJSHNLQ1FseVpYUjFjbTRnWm1Gc2MyVTdDZ2w5Q24wN0NuWmhjaUJUZEdRZ1BTQm1kVzVqZEdsdmJpZ3BJSHNnZlRzS0pHaDRRMnhoYzNObGMxc2lVM1JrSWwwZ1BTQlRkR1E3Q2xOMFpDNWZYMjVoYldWZlh5QTlJSFJ5ZFdVN0NsTjBaQzV3WVhKelpVbHVkQ0E5SUdaMWJtTjBhVzl1S0hncElIc0tDV2xtS0hnZ0lUMGdiblZzYkNrZ2V3b0pDWFpoY2lCZlp5QTlJREE3Q2drSmRtRnlJRjluTVNBOUlIZ3ViR1Z1WjNSb093b0pDWGRvYVd4bEtGOW5JRHdnWDJjeEtTQjdDZ2tKQ1haaGNpQnBJRDBnWDJjckt6c0tDUWtKZG1GeUlHTWdQU0I0TG1Ob1lYSkRiMlJsUVhRb2FTazdDZ2tKQ1dsbUtHTWdQRDBnT0NCOGZDQmpJRDQ5SURFMElDWW1JR01nSVQwZ016SWdKaVlnWXlBaFBTQTBOU2tnZXdvSkNRa0pkbUZ5SUc1aklEMGdlQzVqYUdGeVEyOWtaVUYwS0drZ0t5QXhLVHNLQ1FrSkNYWmhjaUIySUQwZ2NHRnljMlZKYm5Rb2VDeHVZeUE5UFNBeE1qQWdmSHdnYm1NZ1BUMGdPRGdnUHlBeE5pQTZJREV3S1RzS0NRa0pDV2xtS0dselRtRk9LSFlwS1NCN0Nna0pDUWtKY21WMGRYSnVJRzUxYkd3N0Nna0pDUWw5SUdWc2MyVWdld29KQ1FrSkNYSmxkSFZ5YmlCMk93b0pDUWtKZlFvSkNRbDlDZ2tKZlFvSmZRb0pjbVYwZFhKdUlHNTFiR3c3Q24wN0NuWmhjaUJVZVhCbElEMGdablZ1WTNScGIyNG9LU0I3SUgwN0NpUm9lRU5zWVhOelpYTmJJbFI1Y0dVaVhTQTlJRlI1Y0dVN0NsUjVjR1V1WDE5dVlXMWxYMThnUFNCMGNuVmxPd3BVZVhCbExtTnlaV0YwWlVWdWRXMGdQU0JtZFc1amRHbHZiaWhsTEdOdmJuTjBjaXh3WVhKaGJYTXBJSHNLQ1haaGNpQm1JRDBnVW1WbWJHVmpkQzVtYVdWc1pDaGxMR052Ym5OMGNpazdDZ2xwWmlobUlEMDlJRzUxYkd3cElIc0tDUWwwYUhKdmR5Qm9ZWGhsWDBWNFkyVndkR2x2Ymk1MGFISnZkMjRvSWs1dklITjFZMmdnWTI5dWMzUnlkV04wYjNJZ0lpQXJJR052Ym5OMGNpazdDZ2w5Q2dscFppaFNaV1pzWldOMExtbHpSblZ1WTNScGIyNG9aaWtwSUhzS0NRbHBaaWh3WVhKaGJYTWdQVDBnYm5Wc2JDa2dld29KQ1FsMGFISnZkeUJvWVhobFgwVjRZMlZ3ZEdsdmJpNTBhSEp2ZDI0b0lrTnZibk4wY25WamRHOXlJQ0lnS3lCamIyNXpkSElnS3lBaUlHNWxaV1FnY0dGeVlXMWxkR1Z5Y3lJcE93b0pDWDBLQ1FseVpYUjFjbTRnWmk1aGNIQnNlU2hsTEhCaGNtRnRjeWs3Q2dsOUNnbHBaaWh3WVhKaGJYTWdJVDBnYm5Wc2JDQW1KaUJ3WVhKaGJYTXViR1Z1WjNSb0lDRTlJREFwSUhzS0NRbDBhSEp2ZHlCb1lYaGxYMFY0WTJWd2RHbHZiaTUwYUhKdmQyNG9Ja052Ym5OMGNuVmpkRzl5SUNJZ0t5QmpiMjV6ZEhJZ0t5QWlJR1J2WlhNZ2JtOTBJRzVsWldRZ2NHRnlZVzFsZEdWeWN5SXBPd29KZlFvSmNtVjBkWEp1SUdZN0NuMDdDblpoY2lCb1lYaGxYMGxOWVhBZ1BTQm1kVzVqZEdsdmJpZ3BJSHNnZlRzS0pHaDRRMnhoYzNObGMxc2lhR0Y0WlM1SlRXRndJbDBnUFNCb1lYaGxYMGxOWVhBN0NtaGhlR1ZmU1UxaGNDNWZYMjVoYldWZlh5QTlJSFJ5ZFdVN0NuWmhjaUJvWVhobFgwVjRZMlZ3ZEdsdmJpQTlJR1oxYm1OMGFXOXVLRzFsYzNOaFoyVXNjSEpsZG1sdmRYTXNibUYwYVhabEtTQjdDZ2xGY25KdmNpNWpZV3hzS0hSb2FYTXNiV1Z6YzJGblpTazdDZ2wwYUdsekxtMWxjM05oWjJVZ1BTQnRaWE56WVdkbE93b0pkR2hwY3k1ZlgzQnlaWFpwYjNWelJYaGpaWEIwYVc5dUlEMGdjSEpsZG1sdmRYTTdDZ2wwYUdsekxsOWZibUYwYVhabFJYaGpaWEIwYVc5dUlEMGdibUYwYVhabElDRTlJRzUxYkd3Z1B5QnVZWFJwZG1VZ09pQjBhR2x6T3dwOU93b2thSGhEYkdGemMyVnpXeUpvWVhobExrVjRZMlZ3ZEdsdmJpSmRJRDBnYUdGNFpWOUZlR05sY0hScGIyNDdDbWhoZUdWZlJYaGpaWEIwYVc5dUxsOWZibUZ0WlY5ZklEMGdkSEoxWlRzS2FHRjRaVjlGZUdObGNIUnBiMjR1WTJGMVoyaDBJRDBnWm5WdVkzUnBiMjRvZG1Gc2RXVXBJSHNLQ1dsbUtDZ29kbUZzZFdVcElHbHVjM1JoYm1ObGIyWWdhR0Y0WlY5RmVHTmxjSFJwYjI0cEtTQjdDZ2tKY21WMGRYSnVJSFpoYkhWbE93b0pmU0JsYkhObElHbG1LQ2dvZG1Gc2RXVXBJR2x1YzNSaGJtTmxiMllnUlhKeWIzSXBLU0I3Q2drSmNtVjBkWEp1SUc1bGR5Qm9ZWGhsWDBWNFkyVndkR2x2YmloMllXeDFaUzV0WlhOellXZGxMRzUxYkd3c2RtRnNkV1VwT3dvSmZTQmxiSE5sSUhzS0NRbHlaWFIxY200Z2JtVjNJR2hoZUdWZlZtRnNkV1ZGZUdObGNIUnBiMjRvZG1Gc2RXVXNiblZzYkN4MllXeDFaU2s3Q2dsOUNuMDdDbWhoZUdWZlJYaGpaWEIwYVc5dUxuUm9jbTkzYmlBOUlHWjFibU4wYVc5dUtIWmhiSFZsS1NCN0NnbHBaaWdvS0haaGJIVmxLU0JwYm5OMFlXNWpaVzltSUdoaGVHVmZSWGhqWlhCMGFXOXVLU2tnZXdvSkNYSmxkSFZ5YmlCMllXeDFaUzVuWlhSZmJtRjBhWFpsS0NrN0NnbDlJR1ZzYzJVZ2FXWW9LQ2gyWVd4MVpTa2dhVzV6ZEdGdVkyVnZaaUJGY25KdmNpa3BJSHNLQ1FseVpYUjFjbTRnZG1Gc2RXVTdDZ2w5SUdWc2MyVWdld29KQ1haaGNpQmxJRDBnYm1WM0lHaGhlR1ZmVm1Gc2RXVkZlR05sY0hScGIyNG9kbUZzZFdVcE93b0pDWEpsZEhWeWJpQmxPd29KZlFwOU93cG9ZWGhsWDBWNFkyVndkR2x2Ymk1ZlgzTjFjR1Z5WDE4Z1BTQkZjbkp2Y2pzS2FHRjRaVjlGZUdObGNIUnBiMjR1Y0hKdmRHOTBlWEJsSUQwZ0pHVjRkR1Z1WkNoRmNuSnZjaTV3Y205MGIzUjVjR1VzZXdvSmRXNTNjbUZ3T2lCbWRXNWpkR2x2YmlncElIc0tDUWx5WlhSMWNtNGdkR2hwY3k1ZlgyNWhkR2wyWlVWNFkyVndkR2x2YmpzS0NYMEtDU3huWlhSZmJtRjBhWFpsT2lCbWRXNWpkR2x2YmlncElIc0tDUWx5WlhSMWNtNGdkR2hwY3k1ZlgyNWhkR2wyWlVWNFkyVndkR2x2YmpzS0NYMEtmU2s3Q25aaGNpQm9ZWGhsWDFKbGMyOTFjbU5sSUQwZ1puVnVZM1JwYjI0b0tTQjdJSDA3Q2lSb2VFTnNZWE56WlhOYkltaGhlR1V1VW1WemIzVnlZMlVpWFNBOUlHaGhlR1ZmVW1WemIzVnlZMlU3Q21oaGVHVmZVbVZ6YjNWeVkyVXVYMTl1WVcxbFgxOGdQU0IwY25WbE93cG9ZWGhsWDFKbGMyOTFjbU5sTG1kbGRGTjBjbWx1WnlBOUlHWjFibU4wYVc5dUtHNWhiV1VwSUhzS0NYWmhjaUJmWnlBOUlEQTdDZ2wyWVhJZ1gyY3hJRDBnYUdGNFpWOVNaWE52ZFhKalpTNWpiMjUwWlc1ME93b0pkMmhwYkdVb1gyY2dQQ0JmWnpFdWJHVnVaM1JvS1NCN0Nna0pkbUZ5SUhnZ1BTQmZaekZiWDJkZE93b0pDU3NyWDJjN0Nna0phV1lvZUM1dVlXMWxJRDA5SUc1aGJXVXBJSHNLQ1FrSmFXWW9lQzV6ZEhJZ0lUMGdiblZzYkNrZ2V3b0pDUWtKY21WMGRYSnVJSGd1YzNSeU93b0pDUWw5Q2drSkNYWmhjaUJpSUQwZ2FHRjRaVjlqY25sd2RHOWZRbUZ6WlRZMExtUmxZMjlrWlNoNExtUmhkR0VwT3dvSkNRbHlaWFIxY200Z1lpNTBiMU4wY21sdVp5Z3BPd29KQ1gwS0NYMEtDWEpsZEhWeWJpQnVkV3hzT3dwOU93cDJZWElnYUdGNFpWOWZKRlZ1YzJWeWFXRnNhWHBsY2w5RVpXWmhkV3gwVW1WemIyeDJaWElnUFNCbWRXNWpkR2x2YmlncElIc0tmVHNLSkdoNFEyeGhjM05sYzFzaWFHRjRaUzVmVlc1elpYSnBZV3hwZW1WeUxrUmxabUYxYkhSU1pYTnZiSFpsY2lKZElEMGdhR0Y0WlY5ZkpGVnVjMlZ5YVdGc2FYcGxjbDlFWldaaGRXeDBVbVZ6YjJ4MlpYSTdDbWhoZUdWZlh5UlZibk5sY21saGJHbDZaWEpmUkdWbVlYVnNkRkpsYzI5c2RtVnlMbDlmYm1GdFpWOWZJRDBnZEhKMVpUc0thR0Y0WlY5ZkpGVnVjMlZ5YVdGc2FYcGxjbDlFWldaaGRXeDBVbVZ6YjJ4MlpYSXVjSEp2ZEc5MGVYQmxJRDBnZXdvSmNtVnpiMngyWlVOc1lYTnpPaUJtZFc1amRHbHZiaWh1WVcxbEtTQjdDZ2tKY21WMGRYSnVJQ1JvZUVOc1lYTnpaWE5iYm1GdFpWMDdDZ2w5Q2drc2NtVnpiMngyWlVWdWRXMDZJR1oxYm1OMGFXOXVLRzVoYldVcElIc0tDUWx5WlhSMWNtNGdKR2g0Ulc1MWJYTmJibUZ0WlYwN0NnbDlDbjA3Q25aaGNpQm9ZWGhsWDFWdWMyVnlhV0ZzYVhwbGNpQTlJR1oxYm1OMGFXOXVLR0oxWmlrZ2V3b0pkR2hwY3k1aWRXWWdQU0JpZFdZN0NnbDBhR2x6TG14bGJtZDBhQ0E5SUhSb2FYTXVZblZtTG14bGJtZDBhRHNLQ1hSb2FYTXVjRzl6SUQwZ01Ec0tDWFJvYVhNdWMyTmhZMmhsSUQwZ1cxMDdDZ2wwYUdsekxtTmhZMmhsSUQwZ1cxMDdDZ2wyWVhJZ2NpQTlJR2hoZUdWZlZXNXpaWEpwWVd4cGVtVnlMa1JGUmtGVlRGUmZVa1ZUVDB4V1JWSTdDZ2xwWmloeUlEMDlJRzUxYkd3cElIc0tDUWx5SUQwZ2JtVjNJR2hoZUdWZlh5UlZibk5sY21saGJHbDZaWEpmUkdWbVlYVnNkRkpsYzI5c2RtVnlLQ2s3Q2drSmFHRjRaVjlWYm5ObGNtbGhiR2w2WlhJdVJFVkdRVlZNVkY5U1JWTlBURlpGVWlBOUlISTdDZ2w5Q2dsMGFHbHpMbkpsYzI5c2RtVnlJRDBnY2pzS2ZUc0tKR2g0UTJ4aGMzTmxjMXNpYUdGNFpTNVZibk5sY21saGJHbDZaWElpWFNBOUlHaGhlR1ZmVlc1elpYSnBZV3hwZW1WeU93cG9ZWGhsWDFWdWMyVnlhV0ZzYVhwbGNpNWZYMjVoYldWZlh5QTlJSFJ5ZFdVN0NtaGhlR1ZmVlc1elpYSnBZV3hwZW1WeUxtbHVhWFJEYjJSbGN5QTlJR1oxYm1OMGFXOXVLQ2tnZXdvSmRtRnlJR052WkdWeklEMGdXMTA3Q2dsMllYSWdYMmNnUFNBd093b0pkbUZ5SUY5bk1TQTlJR2hoZUdWZlZXNXpaWEpwWVd4cGVtVnlMa0pCVTBVMk5DNXNaVzVuZEdnN0NnbDNhR2xzWlNoZlp5QThJRjluTVNrZ2V3b0pDWFpoY2lCcElEMGdYMmNyS3pzS0NRbGpiMlJsYzF0b1lYaGxYMVZ1YzJWeWFXRnNhWHBsY2k1Q1FWTkZOalF1WTJoaGNrTnZaR1ZCZENocEtWMGdQU0JwT3dvSmZRb0pjbVYwZFhKdUlHTnZaR1Z6T3dwOU93cG9ZWGhsWDFWdWMyVnlhV0ZzYVhwbGNpNXlkVzRnUFNCbWRXNWpkR2x2YmloMktTQjdDZ2x5WlhSMWNtNGdibVYzSUdoaGVHVmZWVzV6WlhKcFlXeHBlbVZ5S0hZcExuVnVjMlZ5YVdGc2FYcGxLQ2s3Q24wN0NtaGhlR1ZmVlc1elpYSnBZV3hwZW1WeUxuQnliM1J2ZEhsd1pTQTlJSHNLQ1hKbFlXUkVhV2RwZEhNNklHWjFibU4wYVc5dUtDa2dld29KQ1haaGNpQnJJRDBnTURzS0NRbDJZWElnY3lBOUlHWmhiSE5sT3dvSkNYWmhjaUJtY0c5eklEMGdkR2hwY3k1d2IzTTdDZ2tKZDJocGJHVW9kSEoxWlNrZ2V3b0pDUWwyWVhJZ1l5QTlJSFJvYVhNdVluVm1MbU5vWVhKRGIyUmxRWFFvZEdocGN5NXdiM01wT3dvSkNRbHBaaWhqSUNFOUlHTXBJSHNLQ1FrSkNXSnlaV0ZyT3dvSkNRbDlDZ2tKQ1dsbUtHTWdQVDBnTkRVcElIc0tDUWtKQ1dsbUtIUm9hWE11Y0c5eklDRTlJR1p3YjNNcElIc0tDUWtKQ1FsaWNtVmhhenNLQ1FrSkNYMEtDUWtKQ1hNZ1BTQjBjblZsT3dvSkNRa0pkR2hwY3k1d2IzTXJLenNLQ1FrSkNXTnZiblJwYm5WbE93b0pDUWw5Q2drSkNXbG1LR01nUENBME9DQjhmQ0JqSUQ0Z05UY3BJSHNLQ1FrSkNXSnlaV0ZyT3dvSkNRbDlDZ2tKQ1dzZ1BTQnJJQ29nTVRBZ0t5QW9ZeUF0SURRNEtUc0tDUWtKZEdocGN5NXdiM01yS3pzS0NRbDlDZ2tKYVdZb2N5a2dld29KQ1FscklDbzlJQzB4T3dvSkNYMEtDUWx5WlhSMWNtNGdhenNLQ1gwS0NTeHlaV0ZrUm14dllYUTZJR1oxYm1OMGFXOXVLQ2tnZXdvSkNYWmhjaUJ3TVNBOUlIUm9hWE11Y0c5ek93b0pDWGRvYVd4bEtIUnlkV1VwSUhzS0NRa0pkbUZ5SUdNZ1BTQjBhR2x6TG1KMVppNWphR0Z5UTI5a1pVRjBLSFJvYVhNdWNHOXpLVHNLQ1FrSmFXWW9ZeUFoUFNCaktTQjdDZ2tKQ1FsaWNtVmhhenNLQ1FrSmZRb0pDUWxwWmloaklENDlJRFF6SUNZbUlHTWdQQ0ExT0NCOGZDQmpJRDA5SURFd01TQjhmQ0JqSUQwOUlEWTVLU0I3Q2drSkNRbDBhR2x6TG5CdmN5c3JPd29KQ1FsOUlHVnNjMlVnZXdvSkNRa0pZbkpsWVdzN0Nna0pDWDBLQ1FsOUNna0pjbVYwZFhKdUlIQmhjbk5sUm14dllYUW9TSGhQZG1WeWNtbGtaWE11YzNWaWMzUnlLSFJvYVhNdVluVm1MSEF4TEhSb2FYTXVjRzl6SUMwZ2NERXBLVHNLQ1gwS0NTeDFibk5sY21saGJHbDZaVTlpYW1WamREb2dablZ1WTNScGIyNG9ieWtnZXdvSkNYZG9hV3hsS0hSeWRXVXBJSHNLQ1FrSmFXWW9kR2hwY3k1d2IzTWdQajBnZEdocGN5NXNaVzVuZEdncElIc0tDUWtKQ1hSb2NtOTNJR2hoZUdWZlJYaGpaWEIwYVc5dUxuUm9jbTkzYmlnaVNXNTJZV3hwWkNCdlltcGxZM1FpS1RzS0NRa0pmUW9KQ1FscFppaDBhR2x6TG1KMVppNWphR0Z5UTI5a1pVRjBLSFJvYVhNdWNHOXpLU0E5UFNBeE1ETXBJSHNLQ1FrSkNXSnlaV0ZyT3dvSkNRbDlDZ2tKQ1haaGNpQnJJRDBnZEdocGN5NTFibk5sY21saGJHbDZaU2dwT3dvSkNRbHBaaWgwZVhCbGIyWW9heWtnSVQwZ0luTjBjbWx1WnlJcElIc0tDUWtKQ1hSb2NtOTNJR2hoZUdWZlJYaGpaWEIwYVc5dUxuUm9jbTkzYmlnaVNXNTJZV3hwWkNCdlltcGxZM1FnYTJWNUlpazdDZ2tKQ1gwS0NRa0pkbUZ5SUhZZ1BTQjBhR2x6TG5WdWMyVnlhV0ZzYVhwbEtDazdDZ2tKQ1c5YmExMGdQU0IyT3dvSkNYMEtDUWwwYUdsekxuQnZjeXNyT3dvSmZRb0pMSFZ1YzJWeWFXRnNhWHBsUlc1MWJUb2dablZ1WTNScGIyNG9aV1JsWTJ3c2RHRm5LU0I3Q2drSmFXWW9kR2hwY3k1aWRXWXVZMmhoY2tOdlpHVkJkQ2gwYUdsekxuQnZjeXNyS1NBaFBTQTFPQ2tnZXdvSkNRbDBhSEp2ZHlCb1lYaGxYMFY0WTJWd2RHbHZiaTUwYUhKdmQyNG9Ja2x1ZG1Gc2FXUWdaVzUxYlNCbWIzSnRZWFFpS1RzS0NRbDlDZ2tKZG1GeUlHNWhjbWR6SUQwZ2RHaHBjeTV5WldGa1JHbG5hWFJ6S0NrN0Nna0phV1lvYm1GeVozTWdQVDBnTUNrZ2V3b0pDUWx5WlhSMWNtNGdWSGx3WlM1amNtVmhkR1ZGYm5WdEtHVmtaV05zTEhSaFp5azdDZ2tKZlFvSkNYWmhjaUJoY21keklEMGdXMTA3Q2drSmQyaHBiR1VvYm1GeVozTXRMU0ErSURBcElHRnlaM011Y0hWemFDaDBhR2x6TG5WdWMyVnlhV0ZzYVhwbEtDa3BPd29KQ1hKbGRIVnliaUJVZVhCbExtTnlaV0YwWlVWdWRXMG9aV1JsWTJ3c2RHRm5MR0Z5WjNNcE93b0pmUW9KTEhWdWMyVnlhV0ZzYVhwbE9pQm1kVzVqZEdsdmJpZ3BJSHNLQ1FsemQybDBZMmdvZEdocGN5NWlkV1l1WTJoaGNrTnZaR1ZCZENoMGFHbHpMbkJ2Y3lzcktTa2dld29KQ1dOaGMyVWdOalU2Q2drSkNYWmhjaUJ1WVcxbElEMGdkR2hwY3k1MWJuTmxjbWxoYkdsNlpTZ3BPd29KQ1FsMllYSWdZMndnUFNCMGFHbHpMbkpsYzI5c2RtVnlMbkpsYzI5c2RtVkRiR0Z6Y3lodVlXMWxLVHNLQ1FrSmFXWW9ZMndnUFQwZ2JuVnNiQ2tnZXdvSkNRa0pkR2h5YjNjZ2FHRjRaVjlGZUdObGNIUnBiMjR1ZEdoeWIzZHVLQ0pEYkdGemN5QnViM1FnWm05MWJtUWdJaUFySUc1aGJXVXBPd29KQ1FsOUNna0pDWEpsZEhWeWJpQmpiRHNLQ1FsallYTmxJRFkyT2dvSkNRbDJZWElnYm1GdFpTQTlJSFJvYVhNdWRXNXpaWEpwWVd4cGVtVW9LVHNLQ1FrSmRtRnlJR1VnUFNCMGFHbHpMbkpsYzI5c2RtVnlMbkpsYzI5c2RtVkZiblZ0S0c1aGJXVXBPd29KQ1FscFppaGxJRDA5SUc1MWJHd3BJSHNLQ1FrSkNYUm9jbTkzSUdoaGVHVmZSWGhqWlhCMGFXOXVMblJvY205M2JpZ2lSVzUxYlNCdWIzUWdabTkxYm1RZ0lpQXJJRzVoYldVcE93b0pDUWw5Q2drSkNYSmxkSFZ5YmlCbE93b0pDV05oYzJVZ05qYzZDZ2tKQ1haaGNpQnVZVzFsSUQwZ2RHaHBjeTUxYm5ObGNtbGhiR2w2WlNncE93b0pDUWwyWVhJZ1kyd2dQU0IwYUdsekxuSmxjMjlzZG1WeUxuSmxjMjlzZG1WRGJHRnpjeWh1WVcxbEtUc0tDUWtKYVdZb1kyd2dQVDBnYm5Wc2JDa2dld29KQ1FrSmRHaHliM2NnYUdGNFpWOUZlR05sY0hScGIyNHVkR2h5YjNkdUtDSkRiR0Z6Y3lCdWIzUWdabTkxYm1RZ0lpQXJJRzVoYldVcE93b0pDUWw5Q2drSkNYWmhjaUJ2SUQwZ1QySnFaV04wTG1OeVpXRjBaU2hqYkM1d2NtOTBiM1I1Y0dVcE93b0pDUWwwYUdsekxtTmhZMmhsTG5CMWMyZ29ieWs3Q2drSkNXOHVhSGhWYm5ObGNtbGhiR2w2WlNoMGFHbHpLVHNLQ1FrSmFXWW9kR2hwY3k1aWRXWXVZMmhoY2tOdlpHVkJkQ2gwYUdsekxuQnZjeXNyS1NBaFBTQXhNRE1wSUhzS0NRa0pDWFJvY205M0lHaGhlR1ZmUlhoalpYQjBhVzl1TG5Sb2NtOTNiaWdpU1c1MllXeHBaQ0JqZFhOMGIyMGdaR0YwWVNJcE93b0pDUWw5Q2drSkNYSmxkSFZ5YmlCdk93b0pDV05oYzJVZ056YzZDZ2tKQ1haaGNpQm9JRDBnYm1WM0lHaGhlR1ZmWkhOZlQySnFaV04wVFdGd0tDazdDZ2tKQ1hSb2FYTXVZMkZqYUdVdWNIVnphQ2hvS1RzS0NRa0pkbUZ5SUdKMVppQTlJSFJvYVhNdVluVm1Pd29KQ1FsM2FHbHNaU2gwYUdsekxtSjFaaTVqYUdGeVEyOWtaVUYwS0hSb2FYTXVjRzl6S1NBaFBTQXhNRFFwSUhzS0NRa0pDWFpoY2lCeklEMGdkR2hwY3k1MWJuTmxjbWxoYkdsNlpTZ3BPd29KQ1FrSmFDNXpaWFFvY3l4MGFHbHpMblZ1YzJWeWFXRnNhWHBsS0NrcE93b0pDUWw5Q2drSkNYUm9hWE11Y0c5ekt5czdDZ2tKQ1hKbGRIVnliaUJvT3dvSkNXTmhjMlVnT0RJNkNna0pDWFpoY2lCdUlEMGdkR2hwY3k1eVpXRmtSR2xuYVhSektDazdDZ2tKQ1dsbUtHNGdQQ0F3SUh4OElHNGdQajBnZEdocGN5NXpZMkZqYUdVdWJHVnVaM1JvS1NCN0Nna0pDUWwwYUhKdmR5Qm9ZWGhsWDBWNFkyVndkR2x2Ymk1MGFISnZkMjRvSWtsdWRtRnNhV1FnYzNSeWFXNW5JSEpsWm1WeVpXNWpaU0lwT3dvSkNRbDlDZ2tKQ1hKbGRIVnliaUIwYUdsekxuTmpZV05vWlZ0dVhUc0tDUWxqWVhObElEazNPZ29KQ1FsMllYSWdZblZtSUQwZ2RHaHBjeTVpZFdZN0Nna0pDWFpoY2lCaElEMGdXMTA3Q2drSkNYUm9hWE11WTJGamFHVXVjSFZ6YUNoaEtUc0tDUWtKZDJocGJHVW9kSEoxWlNrZ2V3b0pDUWtKZG1GeUlHTWdQU0IwYUdsekxtSjFaaTVqYUdGeVEyOWtaVUYwS0hSb2FYTXVjRzl6S1RzS0NRa0pDV2xtS0dNZ1BUMGdNVEEwS1NCN0Nna0pDUWtKZEdocGN5NXdiM01yS3pzS0NRa0pDUWxpY21WaGF6c0tDUWtKQ1gwS0NRa0pDV2xtS0dNZ1BUMGdNVEUzS1NCN0Nna0pDUWtKZEdocGN5NXdiM01yS3pzS0NRa0pDUWwyWVhJZ2JpQTlJSFJvYVhNdWNtVmhaRVJwWjJsMGN5Z3BPd29KQ1FrSkNXRmJZUzVzWlc1bmRHZ2dLeUJ1SUMwZ01WMGdQU0J1ZFd4c093b0pDUWtKZlNCbGJITmxJSHNLQ1FrSkNRbGhMbkIxYzJnb2RHaHBjeTUxYm5ObGNtbGhiR2w2WlNncEtUc0tDUWtKQ1gwS0NRa0pmUW9KQ1FseVpYUjFjbTRnWVRzS0NRbGpZWE5sSURrNE9nb0pDUWwyWVhJZ2FDQTlJRzVsZHlCb1lYaGxYMlJ6WDFOMGNtbHVaMDFoY0NncE93b0pDUWwwYUdsekxtTmhZMmhsTG5CMWMyZ29hQ2s3Q2drSkNYWmhjaUJpZFdZZ1BTQjBhR2x6TG1KMVpqc0tDUWtKZDJocGJHVW9kR2hwY3k1aWRXWXVZMmhoY2tOdlpHVkJkQ2gwYUdsekxuQnZjeWtnSVQwZ01UQTBLU0I3Q2drSkNRbDJZWElnY3lBOUlIUm9hWE11ZFc1elpYSnBZV3hwZW1Vb0tUc0tDUWtKQ1haaGNpQjJZV3gxWlNBOUlIUm9hWE11ZFc1elpYSnBZV3hwZW1Vb0tUc0tDUWtKQ1dndWFGdHpYU0E5SUhaaGJIVmxPd29KQ1FsOUNna0pDWFJvYVhNdWNHOXpLeXM3Q2drSkNYSmxkSFZ5YmlCb093b0pDV05oYzJVZ09UazZDZ2tKQ1haaGNpQnVZVzFsSUQwZ2RHaHBjeTUxYm5ObGNtbGhiR2w2WlNncE93b0pDUWwyWVhJZ1kyd2dQU0IwYUdsekxuSmxjMjlzZG1WeUxuSmxjMjlzZG1WRGJHRnpjeWh1WVcxbEtUc0tDUWtKYVdZb1kyd2dQVDBnYm5Wc2JDa2dld29KQ1FrSmRHaHliM2NnYUdGNFpWOUZlR05sY0hScGIyNHVkR2h5YjNkdUtDSkRiR0Z6Y3lCdWIzUWdabTkxYm1RZ0lpQXJJRzVoYldVcE93b0pDUWw5Q2drSkNYWmhjaUJ2SUQwZ1QySnFaV04wTG1OeVpXRjBaU2hqYkM1d2NtOTBiM1I1Y0dVcE93b0pDUWwwYUdsekxtTmhZMmhsTG5CMWMyZ29ieWs3Q2drSkNYUm9hWE11ZFc1elpYSnBZV3hwZW1WUFltcGxZM1FvYnlrN0Nna0pDWEpsZEhWeWJpQnZPd29KQ1dOaGMyVWdNVEF3T2dvSkNRbHlaWFIxY200Z2RHaHBjeTV5WldGa1JteHZZWFFvS1RzS0NRbGpZWE5sSURFd01qb0tDUWtKY21WMGRYSnVJR1poYkhObE93b0pDV05oYzJVZ01UQTFPZ29KQ1FseVpYUjFjbTRnZEdocGN5NXlaV0ZrUkdsbmFYUnpLQ2s3Q2drSlkyRnpaU0F4TURZNkNna0pDWFpoY2lCdVlXMWxJRDBnZEdocGN5NTFibk5sY21saGJHbDZaU2dwT3dvSkNRbDJZWElnWldSbFkyd2dQU0IwYUdsekxuSmxjMjlzZG1WeUxuSmxjMjlzZG1WRmJuVnRLRzVoYldVcE93b0pDUWxwWmlobFpHVmpiQ0E5UFNCdWRXeHNLU0I3Q2drSkNRbDBhSEp2ZHlCb1lYaGxYMFY0WTJWd2RHbHZiaTUwYUhKdmQyNG9Ja1Z1ZFcwZ2JtOTBJR1p2ZFc1a0lDSWdLeUJ1WVcxbEtUc0tDUWtKZlFvSkNRbDBhR2x6TG5CdmN5c3JPd29KQ1FsMllYSWdhVzVrWlhnZ1BTQjBhR2x6TG5KbFlXUkVhV2RwZEhNb0tUc0tDUWtKZG1GeUlGOTBhR2x6SUQwZ1pXUmxZMnd1WDE5amIyNXpkSEoxWTNSelgxODdDZ2tKQ1haaGNpQnlaWE4xYkhRZ1BTQnVaWGNnUVhKeVlYa29YM1JvYVhNdWJHVnVaM1JvS1RzS0NRa0pkbUZ5SUY5bklEMGdNRHNLQ1FrSmRtRnlJRjluTVNBOUlGOTBhR2x6TG14bGJtZDBhRHNLQ1FrSmQyaHBiR1VvWDJjZ1BDQmZaekVwSUhzS0NRa0pDWFpoY2lCcElEMGdYMmNyS3pzS0NRa0pDWEpsYzNWc2RGdHBYU0E5SUY5MGFHbHpXMmxkTGw5b2VGOXVZVzFsT3dvSkNRbDlDZ2tKQ1haaGNpQjBZV2NnUFNCeVpYTjFiSFJiYVc1a1pYaGRPd29KQ1FscFppaDBZV2NnUFQwZ2JuVnNiQ2tnZXdvSkNRa0pkR2h5YjNjZ2FHRjRaVjlGZUdObGNIUnBiMjR1ZEdoeWIzZHVLQ0pWYm10dWIzZHVJR1Z1ZFcwZ2FXNWtaWGdnSWlBcklHNWhiV1VnS3lBaVFDSWdLeUJwYm1SbGVDazdDZ2tKQ1gwS0NRa0pkbUZ5SUdVZ1BTQjBhR2x6TG5WdWMyVnlhV0ZzYVhwbFJXNTFiU2hsWkdWamJDeDBZV2NwT3dvSkNRbDBhR2x6TG1OaFkyaGxMbkIxYzJnb1pTazdDZ2tKQ1hKbGRIVnliaUJsT3dvSkNXTmhjMlVnTVRBM09nb0pDUWx5WlhSMWNtNGdUbUZPT3dvSkNXTmhjMlVnTVRBNE9nb0pDUWwyWVhJZ2JDQTlJRzVsZHlCb1lYaGxYMlJ6WDB4cGMzUW9LVHNLQ1FrSmRHaHBjeTVqWVdOb1pTNXdkWE5vS0d3cE93b0pDUWwyWVhJZ1luVm1JRDBnZEdocGN5NWlkV1k3Q2drSkNYZG9hV3hsS0hSb2FYTXVZblZtTG1Ob1lYSkRiMlJsUVhRb2RHaHBjeTV3YjNNcElDRTlJREV3TkNrZ2JDNWhaR1FvZEdocGN5NTFibk5sY21saGJHbDZaU2dwS1RzS0NRa0pkR2hwY3k1d2IzTXJLenNLQ1FrSmNtVjBkWEp1SUd3N0Nna0pZMkZ6WlNBeE1EazZDZ2tKQ1hKbGRIVnliaUF0U1c1bWFXNXBkSGs3Q2drSlkyRnpaU0F4TVRBNkNna0pDWEpsZEhWeWJpQnVkV3hzT3dvSkNXTmhjMlVnTVRFeE9nb0pDUWwyWVhJZ2J5QTlJSHNnZlRzS0NRa0pkR2hwY3k1allXTm9aUzV3ZFhOb0tHOHBPd29KQ1FsMGFHbHpMblZ1YzJWeWFXRnNhWHBsVDJKcVpXTjBLRzhwT3dvSkNRbHlaWFIxY200Z2J6c0tDUWxqWVhObElERXhNam9LQ1FrSmNtVjBkWEp1SUVsdVptbHVhWFI1T3dvSkNXTmhjMlVnTVRFek9nb0pDUWwyWVhJZ2FDQTlJRzVsZHlCb1lYaGxYMlJ6WDBsdWRFMWhjQ2dwT3dvSkNRbDBhR2x6TG1OaFkyaGxMbkIxYzJnb2FDazdDZ2tKQ1haaGNpQmlkV1lnUFNCMGFHbHpMbUoxWmpzS0NRa0pkbUZ5SUdNZ1BTQjBhR2x6TG1KMVppNWphR0Z5UTI5a1pVRjBLSFJvYVhNdWNHOXpLeXNwT3dvSkNRbDNhR2xzWlNoaklEMDlJRFU0S1NCN0Nna0pDUWwyWVhJZ2FTQTlJSFJvYVhNdWNtVmhaRVJwWjJsMGN5Z3BPd29KQ1FrSmRtRnlJSFpoYkhWbElEMGdkR2hwY3k1MWJuTmxjbWxoYkdsNlpTZ3BPd29KQ1FrSmFDNW9XMmxkSUQwZ2RtRnNkV1U3Q2drSkNRbGpJRDBnZEdocGN5NWlkV1l1WTJoaGNrTnZaR1ZCZENoMGFHbHpMbkJ2Y3lzcktUc0tDUWtKZlFvSkNRbHBaaWhqSUNFOUlERXdOQ2tnZXdvSkNRa0pkR2h5YjNjZ2FHRjRaVjlGZUdObGNIUnBiMjR1ZEdoeWIzZHVLQ0pKYm5aaGJHbGtJRWx1ZEUxaGNDQm1iM0p0WVhRaUtUc0tDUWtKZlFvSkNRbHlaWFIxY200Z2FEc0tDUWxqWVhObElERXhORG9LQ1FrSmRtRnlJRzRnUFNCMGFHbHpMbkpsWVdSRWFXZHBkSE1vS1RzS0NRa0phV1lvYmlBOElEQWdmSHdnYmlBK1BTQjBhR2x6TG1OaFkyaGxMbXhsYm1kMGFDa2dld29KQ1FrSmRHaHliM2NnYUdGNFpWOUZlR05sY0hScGIyNHVkR2h5YjNkdUtDSkpiblpoYkdsa0lISmxabVZ5Wlc1alpTSXBPd29KQ1FsOUNna0pDWEpsZEhWeWJpQjBhR2x6TG1OaFkyaGxXMjVkT3dvSkNXTmhjMlVnTVRFMU9nb0pDUWwyWVhJZ2JHVnVJRDBnZEdocGN5NXlaV0ZrUkdsbmFYUnpLQ2s3Q2drSkNYWmhjaUJpZFdZZ1BTQjBhR2x6TG1KMVpqc0tDUWtKYVdZb2RHaHBjeTVpZFdZdVkyaGhja052WkdWQmRDaDBhR2x6TG5CdmN5c3JLU0FoUFNBMU9DQjhmQ0IwYUdsekxteGxibWQwYUNBdElIUm9hWE11Y0c5eklEd2diR1Z1S1NCN0Nna0pDUWwwYUhKdmR5Qm9ZWGhsWDBWNFkyVndkR2x2Ymk1MGFISnZkMjRvSWtsdWRtRnNhV1FnWW5sMFpYTWdiR1Z1WjNSb0lpazdDZ2tKQ1gwS0NRa0pkbUZ5SUdOdlpHVnpJRDBnYUdGNFpWOVZibk5sY21saGJHbDZaWEl1UTA5RVJWTTdDZ2tKQ1dsbUtHTnZaR1Z6SUQwOUlHNTFiR3dwSUhzS0NRa0pDV052WkdWeklEMGdhR0Y0WlY5VmJuTmxjbWxoYkdsNlpYSXVhVzVwZEVOdlpHVnpLQ2s3Q2drSkNRbG9ZWGhsWDFWdWMyVnlhV0ZzYVhwbGNpNURUMFJGVXlBOUlHTnZaR1Z6T3dvSkNRbDlDZ2tKQ1haaGNpQnBJRDBnZEdocGN5NXdiM003Q2drSkNYWmhjaUJ5WlhOMElEMGdiR1Z1SUNZZ016c0tDUWtKZG1GeUlITnBlbVVnUFNBb2JHVnVJRDQrSURJcElDb2dNeUFySUNoeVpYTjBJRDQ5SURJZ1B5QnlaWE4wSUMwZ01TQTZJREFwT3dvSkNRbDJZWElnYldGNElEMGdhU0FySUNoc1pXNGdMU0J5WlhOMEtUc0tDUWtKZG1GeUlHSjVkR1Z6SUQwZ2JtVjNJR2hoZUdWZmFXOWZRbmwwWlhNb2JtVjNJRUZ5Y21GNVFuVm1abVZ5S0hOcGVtVXBLVHNLQ1FrSmRtRnlJR0p3YjNNZ1BTQXdPd29KQ1FsM2FHbHNaU2hwSUR3Z2JXRjRLU0I3Q2drSkNRbDJZWElnWXpFZ1BTQmpiMlJsYzF0aWRXWXVZMmhoY2tOdlpHVkJkQ2hwS3lzcFhUc0tDUWtKQ1haaGNpQmpNaUE5SUdOdlpHVnpXMkoxWmk1amFHRnlRMjlrWlVGMEtHa3JLeWxkT3dvSkNRa0pZbmwwWlhNdVlsdGljRzl6S3l0ZElEMGdZekVnUER3Z01pQjhJR015SUQ0K0lEUTdDZ2tKQ1FsMllYSWdZek1nUFNCamIyUmxjMXRpZFdZdVkyaGhja052WkdWQmRDaHBLeXNwWFRzS0NRa0pDV0o1ZEdWekxtSmJZbkJ2Y3lzclhTQTlJR015SUR3OElEUWdmQ0JqTXlBK1BpQXlPd29KQ1FrSmRtRnlJR00wSUQwZ1kyOWtaWE5iWW5WbUxtTm9ZWEpEYjJSbFFYUW9hU3NyS1YwN0Nna0pDUWxpZVhSbGN5NWlXMkp3YjNNcksxMGdQU0JqTXlBOFBDQTJJSHdnWXpRN0Nna0pDWDBLQ1FrSmFXWW9jbVZ6ZENBK1BTQXlLU0I3Q2drSkNRbDJZWElnWXpFZ1BTQmpiMlJsYzF0aWRXWXVZMmhoY2tOdlpHVkJkQ2hwS3lzcFhUc0tDUWtKQ1haaGNpQmpNaUE5SUdOdlpHVnpXMkoxWmk1amFHRnlRMjlrWlVGMEtHa3JLeWxkT3dvSkNRa0pZbmwwWlhNdVlsdGljRzl6S3l0ZElEMGdZekVnUER3Z01pQjhJR015SUQ0K0lEUTdDZ2tKQ1FscFppaHlaWE4wSUQwOUlETXBJSHNLQ1FrSkNRbDJZWElnWXpNZ1BTQmpiMlJsYzF0aWRXWXVZMmhoY2tOdlpHVkJkQ2hwS3lzcFhUc0tDUWtKQ1FsaWVYUmxjeTVpVzJKd2IzTXJLMTBnUFNCak1pQThQQ0EwSUh3Z1l6TWdQajRnTWpzS0NRa0pDWDBLQ1FrSmZRb0pDUWwwYUdsekxuQnZjeUFyUFNCc1pXNDdDZ2tKQ1hSb2FYTXVZMkZqYUdVdWNIVnphQ2hpZVhSbGN5azdDZ2tKQ1hKbGRIVnliaUJpZVhSbGN6c0tDUWxqWVhObElERXhOam9LQ1FrSmNtVjBkWEp1SUhSeWRXVTdDZ2tKWTJGelpTQXhNVGc2Q2drSkNYWmhjaUJrT3dvSkNRbHBaaWgwYUdsekxtSjFaaTVqYUdGeVEyOWtaVUYwS0hSb2FYTXVjRzl6S1NBK1BTQTBPQ0FtSmlCMGFHbHpMbUoxWmk1amFHRnlRMjlrWlVGMEtIUm9hWE11Y0c5ektTQThQU0ExTnlBbUppQjBhR2x6TG1KMVppNWphR0Z5UTI5a1pVRjBLSFJvYVhNdWNHOXpJQ3NnTVNrZ1BqMGdORGdnSmlZZ2RHaHBjeTVpZFdZdVkyaGhja052WkdWQmRDaDBhR2x6TG5CdmN5QXJJREVwSUR3OUlEVTNJQ1ltSUhSb2FYTXVZblZtTG1Ob1lYSkRiMlJsUVhRb2RHaHBjeTV3YjNNZ0t5QXlLU0ErUFNBME9DQW1KaUIwYUdsekxtSjFaaTVqYUdGeVEyOWtaVUYwS0hSb2FYTXVjRzl6SUNzZ01pa2dQRDBnTlRjZ0ppWWdkR2hwY3k1aWRXWXVZMmhoY2tOdlpHVkJkQ2gwYUdsekxuQnZjeUFySURNcElENDlJRFE0SUNZbUlIUm9hWE11WW5WbUxtTm9ZWEpEYjJSbFFYUW9kR2hwY3k1d2IzTWdLeUF6S1NBOFBTQTFOeUFtSmlCMGFHbHpMbUoxWmk1amFHRnlRMjlrWlVGMEtIUm9hWE11Y0c5eklDc2dOQ2tnUFQwZ05EVXBJSHNLQ1FrSkNXUWdQU0JJZUU5MlpYSnlhV1JsY3k1emRISkVZWFJsS0VoNFQzWmxjbkpwWkdWekxuTjFZbk4wY2loMGFHbHpMbUoxWml4MGFHbHpMbkJ2Y3l3eE9Ta3BPd29KQ1FrSmRHaHBjeTV3YjNNZ0t6MGdNVGs3Q2drSkNYMGdaV3h6WlNCN0Nna0pDUWxrSUQwZ2JtVjNJRVJoZEdVb2RHaHBjeTV5WldGa1JteHZZWFFvS1NrN0Nna0pDWDBLQ1FrSmRHaHBjeTVqWVdOb1pTNXdkWE5vS0dRcE93b0pDUWx5WlhSMWNtNGdaRHNLQ1FsallYTmxJREV4T1RvS0NRa0pkbUZ5SUc1aGJXVWdQU0IwYUdsekxuVnVjMlZ5YVdGc2FYcGxLQ2s3Q2drSkNYWmhjaUJsWkdWamJDQTlJSFJvYVhNdWNtVnpiMngyWlhJdWNtVnpiMngyWlVWdWRXMG9ibUZ0WlNrN0Nna0pDV2xtS0dWa1pXTnNJRDA5SUc1MWJHd3BJSHNLQ1FrSkNYUm9jbTkzSUdoaGVHVmZSWGhqWlhCMGFXOXVMblJvY205M2JpZ2lSVzUxYlNCdWIzUWdabTkxYm1RZ0lpQXJJRzVoYldVcE93b0pDUWw5Q2drSkNYWmhjaUJsSUQwZ2RHaHBjeTUxYm5ObGNtbGhiR2w2WlVWdWRXMG9aV1JsWTJ3c2RHaHBjeTUxYm5ObGNtbGhiR2w2WlNncEtUc0tDUWtKZEdocGN5NWpZV05vWlM1d2RYTm9LR1VwT3dvSkNRbHlaWFIxY200Z1pUc0tDUWxqWVhObElERXlNRG9LQ1FrSmRHaHliM2NnYUdGNFpWOUZlR05sY0hScGIyNHVkR2h5YjNkdUtIUm9hWE11ZFc1elpYSnBZV3hwZW1Vb0tTazdDZ2tKWTJGelpTQXhNakU2Q2drSkNYWmhjaUJzWlc0Z1BTQjBhR2x6TG5KbFlXUkVhV2RwZEhNb0tUc0tDUWtKYVdZb2RHaHBjeTVpZFdZdVkyaGhja052WkdWQmRDaDBhR2x6TG5CdmN5c3JLU0FoUFNBMU9DQjhmQ0IwYUdsekxteGxibWQwYUNBdElIUm9hWE11Y0c5eklEd2diR1Z1S1NCN0Nna0pDUWwwYUhKdmR5Qm9ZWGhsWDBWNFkyVndkR2x2Ymk1MGFISnZkMjRvSWtsdWRtRnNhV1FnYzNSeWFXNW5JR3hsYm1kMGFDSXBPd29KQ1FsOUNna0pDWFpoY2lCeklEMGdTSGhQZG1WeWNtbGtaWE11YzNWaWMzUnlLSFJvYVhNdVluVm1MSFJvYVhNdWNHOXpMR3hsYmlrN0Nna0pDWFJvYVhNdWNHOXpJQ3M5SUd4bGJqc0tDUWtKY3lBOUlHUmxZMjlrWlZWU1NVTnZiWEJ2Ym1WdWRDaHpMbk53YkdsMEtDSXJJaWt1YW05cGJpZ2lJQ0lwS1RzS0NRa0pkR2hwY3k1elkyRmphR1V1Y0hWemFDaHpLVHNLQ1FrSmNtVjBkWEp1SUhNN0Nna0pZMkZ6WlNBeE1qSTZDZ2tKQ1hKbGRIVnliaUF3T3dvSkNXUmxabUYxYkhRNkNna0pmUW9KQ1hSb2FYTXVjRzl6TFMwN0Nna0pkR2h5YjNjZ2FHRjRaVjlGZUdObGNIUnBiMjR1ZEdoeWIzZHVLQ0pKYm5aaGJHbGtJR05vWVhJZ0lpQXJJSFJvYVhNdVluVm1MbU5vWVhKQmRDaDBhR2x6TG5CdmN5a2dLeUFpSUdGMElIQnZjMmwwYVc5dUlDSWdLeUIwYUdsekxuQnZjeWs3Q2dsOUNuMDdDblpoY2lCb1lYaGxYMVpoYkhWbFJYaGpaWEIwYVc5dUlEMGdablZ1WTNScGIyNG9kbUZzZFdVc2NISmxkbWx2ZFhNc2JtRjBhWFpsS1NCN0NnbG9ZWGhsWDBWNFkyVndkR2x2Ymk1allXeHNLSFJvYVhNc1UzUnlhVzVuS0haaGJIVmxLU3h3Y21WMmFXOTFjeXh1WVhScGRtVXBPd29KZEdocGN5NTJZV3gxWlNBOUlIWmhiSFZsT3dwOU93b2thSGhEYkdGemMyVnpXeUpvWVhobExsWmhiSFZsUlhoalpYQjBhVzl1SWwwZ1BTQm9ZWGhsWDFaaGJIVmxSWGhqWlhCMGFXOXVPd3BvWVhobFgxWmhiSFZsUlhoalpYQjBhVzl1TGw5ZmJtRnRaVjlmSUQwZ2RISjFaVHNLYUdGNFpWOVdZV3gxWlVWNFkyVndkR2x2Ymk1ZlgzTjFjR1Z5WDE4Z1BTQm9ZWGhsWDBWNFkyVndkR2x2YmpzS2FHRjRaVjlXWVd4MVpVVjRZMlZ3ZEdsdmJpNXdjbTkwYjNSNWNHVWdQU0FrWlhoMFpXNWtLR2hoZUdWZlJYaGpaWEIwYVc5dUxuQnliM1J2ZEhsd1pTeDdDZ2wxYm5keVlYQTZJR1oxYm1OMGFXOXVLQ2tnZXdvSkNYSmxkSFZ5YmlCMGFHbHpMblpoYkhWbE93b0pmUXA5S1RzS2RtRnlJR2hoZUdWZmFXOWZRbmwwWlhNZ1BTQm1kVzVqZEdsdmJpaGtZWFJoS1NCN0NnbDBhR2x6TG14bGJtZDBhQ0E5SUdSaGRHRXVZbmwwWlV4bGJtZDBhRHNLQ1hSb2FYTXVZaUE5SUc1bGR5QlZhVzUwT0VGeWNtRjVLR1JoZEdFcE93b0pkR2hwY3k1aUxtSjFabVpsY2xaaGJIVmxJRDBnWkdGMFlUc0tDV1JoZEdFdWFIaENlWFJsY3lBOUlIUm9hWE03Q2dsa1lYUmhMbUo1ZEdWeklEMGdkR2hwY3k1aU93cDlPd29rYUhoRGJHRnpjMlZ6V3lKb1lYaGxMbWx2TGtKNWRHVnpJbDBnUFNCb1lYaGxYMmx2WDBKNWRHVnpPd3BvWVhobFgybHZYMEo1ZEdWekxsOWZibUZ0WlY5ZklEMGdkSEoxWlRzS2FHRjRaVjlwYjE5Q2VYUmxjeTV2WmxOMGNtbHVaeUE5SUdaMWJtTjBhVzl1S0hNc1pXNWpiMlJwYm1jcElIc0tDV2xtS0dWdVkyOWthVzVuSUQwOUlHaGhlR1ZmYVc5ZlJXNWpiMlJwYm1jdVVtRjNUbUYwYVhabEtTQjdDZ2tKZG1GeUlHSjFaaUE5SUc1bGR5QlZhVzUwT0VGeWNtRjVLSE11YkdWdVozUm9JRHc4SURFcE93b0pDWFpoY2lCZlp5QTlJREE3Q2drSmRtRnlJRjluTVNBOUlITXViR1Z1WjNSb093b0pDWGRvYVd4bEtGOW5JRHdnWDJjeEtTQjdDZ2tKQ1haaGNpQnBJRDBnWDJjckt6c0tDUWtKZG1GeUlHTWdQU0J6TG1Ob1lYSkRiMlJsUVhRb2FTazdDZ2tKQ1dKMVpsdHBJRHc4SURGZElEMGdZeUFtSURJMU5Uc0tDUWtKWW5WbVcya2dQRHdnTVNCOElERmRJRDBnWXlBK1BpQTRPd29KQ1gwS0NRbHlaWFIxY200Z2JtVjNJR2hoZUdWZmFXOWZRbmwwWlhNb1luVm1MbUoxWm1abGNpazdDZ2w5Q2dsMllYSWdZU0E5SUZ0ZE93b0pkbUZ5SUdrZ1BTQXdPd29KZDJocGJHVW9hU0E4SUhNdWJHVnVaM1JvS1NCN0Nna0pkbUZ5SUdNZ1BTQnpMbU5vWVhKRGIyUmxRWFFvYVNzcktUc0tDUWxwWmlnMU5USTVOaUE4UFNCaklDWW1JR01nUEQwZ05UWXpNVGtwSUhzS0NRa0pZeUE5SUdNZ0xTQTFOVEl6TWlBOFBDQXhNQ0I4SUhNdVkyaGhja052WkdWQmRDaHBLeXNwSUNZZ01UQXlNenNLQ1FsOUNna0phV1lvWXlBOFBTQXhNamNwSUhzS0NRa0pZUzV3ZFhOb0tHTXBPd29KQ1gwZ1pXeHpaU0JwWmloaklEdzlJREl3TkRjcElIc0tDUWtKWVM1d2RYTm9LREU1TWlCOElHTWdQajRnTmlrN0Nna0pDV0V1Y0hWemFDZ3hNamdnZkNCaklDWWdOak1wT3dvSkNYMGdaV3h6WlNCcFppaGpJRHc5SURZMU5UTTFLU0I3Q2drSkNXRXVjSFZ6YUNneU1qUWdmQ0JqSUQ0K0lERXlLVHNLQ1FrSllTNXdkWE5vS0RFeU9DQjhJR01nUGo0Z05pQW1JRFl6S1RzS0NRa0pZUzV3ZFhOb0tERXlPQ0I4SUdNZ0ppQTJNeWs3Q2drSmZTQmxiSE5sSUhzS0NRa0pZUzV3ZFhOb0tESTBNQ0I4SUdNZ1BqNGdNVGdwT3dvSkNRbGhMbkIxYzJnb01USTRJSHdnWXlBK1BpQXhNaUFtSURZektUc0tDUWtKWVM1d2RYTm9LREV5T0NCOElHTWdQajRnTmlBbUlEWXpLVHNLQ1FrSllTNXdkWE5vS0RFeU9DQjhJR01nSmlBMk15azdDZ2tKZlFvSmZRb0pjbVYwZFhKdUlHNWxkeUJvWVhobFgybHZYMEo1ZEdWektHNWxkeUJWYVc1ME9FRnljbUY1S0dFcExtSjFabVpsY2lrN0NuMDdDbWhoZUdWZmFXOWZRbmwwWlhNdWNISnZkRzkwZVhCbElEMGdld29KWjJWMFUzUnlhVzVuT2lCbWRXNWpkR2x2Ymlod2IzTXNiR1Z1TEdWdVkyOWthVzVuS1NCN0Nna0phV1lvY0c5eklEd2dNQ0I4ZkNCc1pXNGdQQ0F3SUh4OElIQnZjeUFySUd4bGJpQStJSFJvYVhNdWJHVnVaM1JvS1NCN0Nna0pDWFJvY205M0lHaGhlR1ZmUlhoalpYQjBhVzl1TG5Sb2NtOTNiaWhvWVhobFgybHZYMFZ5Y205eUxrOTFkSE5wWkdWQ2IzVnVaSE1wT3dvSkNYMEtDUWxwWmlobGJtTnZaR2x1WnlBOVBTQnVkV3hzS1NCN0Nna0pDV1Z1WTI5a2FXNW5JRDBnYUdGNFpWOXBiMTlGYm1OdlpHbHVaeTVWVkVZNE93b0pDWDBLQ1FsMllYSWdjeUE5SUNJaU93b0pDWFpoY2lCaUlEMGdkR2hwY3k1aU93b0pDWFpoY2lCcElEMGdjRzl6T3dvSkNYWmhjaUJ0WVhnZ1BTQndiM01nS3lCc1pXNDdDZ2tKYzNkcGRHTm9LR1Z1WTI5a2FXNW5MbDlvZUY5cGJtUmxlQ2tnZXdvSkNXTmhjMlVnTURvS0NRa0pkbUZ5SUdSbFluVm5JRDBnY0c5eklENGdNRHNLQ1FrSmQyaHBiR1VvYVNBOElHMWhlQ2tnZXdvSkNRa0pkbUZ5SUdNZ1BTQmlXMmtySzEwN0Nna0pDUWxwWmloaklEd2dNVEk0S1NCN0Nna0pDUWtKYVdZb1l5QTlQU0F3S1NCN0Nna0pDUWtKQ1dKeVpXRnJPd29KQ1FrSkNYMEtDUWtKQ1FseklDczlJRk4wY21sdVp5NW1jbTl0UTI5a1pWQnZhVzUwS0dNcE93b0pDUWtKZlNCbGJITmxJR2xtS0dNZ1BDQXlNalFwSUhzS0NRa0pDUWwyWVhJZ1kyOWtaU0E5SUNoaklDWWdOak1wSUR3OElEWWdmQ0JpVzJrcksxMGdKaUF4TWpjN0Nna0pDUWtKY3lBclBTQlRkSEpwYm1jdVpuSnZiVU52WkdWUWIybHVkQ2hqYjJSbEtUc0tDUWtKQ1gwZ1pXeHpaU0JwWmloaklEd2dNalF3S1NCN0Nna0pDUWtKZG1GeUlHTXlJRDBnWWx0cEt5dGRPd29KQ1FrSkNYWmhjaUJqYjJSbE1TQTlJQ2hqSUNZZ016RXBJRHc4SURFeUlId2dLR015SUNZZ01USTNLU0E4UENBMklId2dZbHRwS3l0ZElDWWdNVEkzT3dvSkNRa0pDWE1nS3owZ1UzUnlhVzVuTG1aeWIyMURiMlJsVUc5cGJuUW9ZMjlrWlRFcE93b0pDUWtKZlNCbGJITmxJSHNLQ1FrSkNRbDJZWElnWXpJeElEMGdZbHRwS3l0ZE93b0pDUWtKQ1haaGNpQmpNeUE5SUdKYmFTc3JYVHNLQ1FrSkNRbDJZWElnZFNBOUlDaGpJQ1lnTVRVcElEdzhJREU0SUh3Z0tHTXlNU0FtSURFeU55a2dQRHdnTVRJZ2ZDQW9Zek1nSmlBeE1qY3BJRHc4SURZZ2ZDQmlXMmtySzEwZ0ppQXhNamM3Q2drSkNRa0pjeUFyUFNCVGRISnBibWN1Wm5KdmJVTnZaR1ZRYjJsdWRDaDFLVHNLQ1FrSkNYMEtDUWtKZlFvSkNRbGljbVZoYXpzS0NRbGpZWE5sSURFNkNna0pDWGRvYVd4bEtHa2dQQ0J0WVhncElIc0tDUWtKQ1haaGNpQmpJRDBnWWx0cEt5dGRJSHdnWWx0cEt5dGRJRHc4SURnN0Nna0pDUWx6SUNzOUlGTjBjbWx1Wnk1bWNtOXRRMjlrWlZCdmFXNTBLR01wT3dvSkNRbDlDZ2tKQ1dKeVpXRnJPd29KQ1gwS0NRbHlaWFIxY200Z2N6c0tDWDBLQ1N4MGIxTjBjbWx1WnpvZ1puVnVZM1JwYjI0b0tTQjdDZ2tKY21WMGRYSnVJSFJvYVhNdVoyVjBVM1J5YVc1bktEQXNkR2hwY3k1c1pXNW5kR2dwT3dvSmZRcDlPd3AyWVhJZ2FHRjRaVjlwYjE5RmJtTnZaR2x1WnlBOUlDUm9lRVZ1ZFcxeld5Sm9ZWGhsTG1sdkxrVnVZMjlrYVc1bklsMGdQU0I3SUY5ZlpXNWhiV1ZmWHpwMGNuVmxMRjlmWTI5dWMzUnlkV04wYzE5Zk9tNTFiR3dLQ1N4VlZFWTRPaUI3WDJoNFgyNWhiV1U2SWxWVVJqZ2lMRjlvZUY5cGJtUmxlRG93TEY5ZlpXNTFiVjlmT2lKb1lYaGxMbWx2TGtWdVkyOWthVzVuSWl4MGIxTjBjbWx1Wnpva1pYTjBjbjBLQ1N4U1lYZE9ZWFJwZG1VNklIdGZhSGhmYm1GdFpUb2lVbUYzVG1GMGFYWmxJaXhmYUhoZmFXNWtaWGc2TVN4ZlgyVnVkVzFmWHpvaWFHRjRaUzVwYnk1RmJtTnZaR2x1WnlJc2RHOVRkSEpwYm1jNkpHVnpkSEo5Q24wN0NtaGhlR1ZmYVc5ZlJXNWpiMlJwYm1jdVgxOWpiMjV6ZEhKMVkzUnpYMThnUFNCYmFHRjRaVjlwYjE5RmJtTnZaR2x1Wnk1VlZFWTRMR2hoZUdWZmFXOWZSVzVqYjJScGJtY3VVbUYzVG1GMGFYWmxYVHNLZG1GeUlHaGhlR1ZmWTNKNWNIUnZYMEpoYzJVMk5DQTlJR1oxYm1OMGFXOXVLQ2tnZXlCOU93b2thSGhEYkdGemMyVnpXeUpvWVhobExtTnllWEIwYnk1Q1lYTmxOalFpWFNBOUlHaGhlR1ZmWTNKNWNIUnZYMEpoYzJVMk5Ec0thR0Y0WlY5amNubHdkRzlmUW1GelpUWTBMbDlmYm1GdFpWOWZJRDBnZEhKMVpUc0thR0Y0WlY5amNubHdkRzlmUW1GelpUWTBMbVJsWTI5a1pTQTlJR1oxYm1OMGFXOXVLSE4wY2l4amIyMXdiR1Z0Wlc1MEtTQjdDZ2xwWmloamIyMXdiR1Z0Wlc1MElEMDlJRzUxYkd3cElIc0tDUWxqYjIxd2JHVnRaVzUwSUQwZ2RISjFaVHNLQ1gwS0NXbG1LR052YlhCc1pXMWxiblFwSUhzS0NRbDNhR2xzWlNoSWVFOTJaWEp5YVdSbGN5NWpZMkVvYzNSeUxITjBjaTVzWlc1bmRHZ2dMU0F4S1NBOVBTQTJNU2tnYzNSeUlEMGdTSGhQZG1WeWNtbGtaWE11YzNWaWMzUnlLSE4wY2l3d0xDMHhLVHNLQ1gwS0NYSmxkSFZ5YmlCdVpYY2dhR0Y0WlY5amNubHdkRzlmUW1GelpVTnZaR1VvYUdGNFpWOWpjbmx3ZEc5ZlFtRnpaVFkwTGtKWlZFVlRLUzVrWldOdlpHVkNlWFJsY3lob1lYaGxYMmx2WDBKNWRHVnpMbTltVTNSeWFXNW5LSE4wY2lrcE93cDlPd3AyWVhJZ2FHRjRaVjlqY25sd2RHOWZRbUZ6WlVOdlpHVWdQU0JtZFc1amRHbHZiaWhpWVhObEtTQjdDZ2wyWVhJZ2JHVnVJRDBnWW1GelpTNXNaVzVuZEdnN0NnbDJZWElnYm1KcGRITWdQU0F4T3dvSmQyaHBiR1VvYkdWdUlENGdNU0E4UENCdVltbDBjeWtnS3l0dVltbDBjenNLQ1dsbUtHNWlhWFJ6SUQ0Z09DQjhmQ0JzWlc0Z0lUMGdNU0E4UENCdVltbDBjeWtnZXdvSkNYUm9jbTkzSUdoaGVHVmZSWGhqWlhCMGFXOXVMblJvY205M2JpZ2lRbUZ6WlVOdlpHVWdPaUJpWVhObElHeGxibWQwYUNCdGRYTjBJR0psSUdFZ2NHOTNaWElnYjJZZ2RIZHZMaUlwT3dvSmZRb0pkR2hwY3k1aVlYTmxJRDBnWW1GelpUc0tDWFJvYVhNdWJtSnBkSE1nUFNCdVltbDBjenNLZlRzS0pHaDRRMnhoYzNObGMxc2lhR0Y0WlM1amNubHdkRzh1UW1GelpVTnZaR1VpWFNBOUlHaGhlR1ZmWTNKNWNIUnZYMEpoYzJWRGIyUmxPd3BvWVhobFgyTnllWEIwYjE5Q1lYTmxRMjlrWlM1ZlgyNWhiV1ZmWHlBOUlIUnlkV1U3Q21oaGVHVmZZM0o1Y0hSdlgwSmhjMlZEYjJSbExuQnliM1J2ZEhsd1pTQTlJSHNLQ1dsdWFYUlVZV0pzWlRvZ1puVnVZM1JwYjI0b0tTQjdDZ2tKZG1GeUlIUmliQ0E5SUZ0ZE93b0pDWFpoY2lCZlp5QTlJREE3Q2drSmQyaHBiR1VvWDJjZ1BDQXlOVFlwSUhzS0NRa0pkbUZ5SUdrZ1BTQmZaeXNyT3dvSkNRbDBZbXhiYVYwZ1BTQXRNVHNLQ1FsOUNna0pkbUZ5SUY5bklEMGdNRHNLQ1FsMllYSWdYMmN4SUQwZ2RHaHBjeTVpWVhObExteGxibWQwYURzS0NRbDNhR2xzWlNoZlp5QThJRjluTVNrZ2V3b0pDUWwyWVhJZ2FTQTlJRjluS3lzN0Nna0pDWFJpYkZ0MGFHbHpMbUpoYzJVdVlsdHBYVjBnUFNCcE93b0pDWDBLQ1FsMGFHbHpMblJpYkNBOUlIUmliRHNLQ1gwS0NTeGtaV052WkdWQ2VYUmxjem9nWm5WdVkzUnBiMjRvWWlrZ2V3b0pDWFpoY2lCdVltbDBjeUE5SUhSb2FYTXVibUpwZEhNN0Nna0pkbUZ5SUdKaGMyVWdQU0IwYUdsekxtSmhjMlU3Q2drSmFXWW9kR2hwY3k1MFltd2dQVDBnYm5Wc2JDa2dld29KQ1FsMGFHbHpMbWx1YVhSVVlXSnNaU2dwT3dvSkNYMEtDUWwyWVhJZ2RHSnNJRDBnZEdocGN5NTBZbXc3Q2drSmRtRnlJSE5wZW1VZ1BTQmlMbXhsYm1kMGFDQXFJRzVpYVhSeklENCtJRE03Q2drSmRtRnlJRzkxZENBOUlHNWxkeUJvWVhobFgybHZYMEo1ZEdWektHNWxkeUJCY25KaGVVSjFabVpsY2loemFYcGxLU2s3Q2drSmRtRnlJR0oxWmlBOUlEQTdDZ2tKZG1GeUlHTjFjbUpwZEhNZ1BTQXdPd29KQ1haaGNpQndhVzRnUFNBd093b0pDWFpoY2lCd2IzVjBJRDBnTURzS0NRbDNhR2xzWlNod2IzVjBJRHdnYzJsNlpTa2dld29KQ1FsM2FHbHNaU2hqZFhKaWFYUnpJRHdnT0NrZ2V3b0pDUWtKWTNWeVltbDBjeUFyUFNCdVltbDBjenNLQ1FrSkNXSjFaaUE4UEQwZ2JtSnBkSE03Q2drSkNRbDJZWElnYVNBOUlIUmliRnRpTG1KYmNHbHVLeXRkWFRzS0NRa0pDV2xtS0drZ1BUMGdMVEVwSUhzS0NRa0pDUWwwYUhKdmR5Qm9ZWGhsWDBWNFkyVndkR2x2Ymk1MGFISnZkMjRvSWtKaGMyVkRiMlJsSURvZ2FXNTJZV3hwWkNCbGJtTnZaR1ZrSUdOb1lYSWlLVHNLQ1FrSkNYMEtDUWtKQ1dKMVppQjhQU0JwT3dvSkNRbDlDZ2tKQ1dOMWNtSnBkSE1nTFQwZ09Ec0tDUWtKYjNWMExtSmJjRzkxZENzclhTQTlJR0oxWmlBK1BpQmpkWEppYVhSeklDWWdNalUxT3dvSkNYMEtDUWx5WlhSMWNtNGdiM1YwT3dvSmZRcDlPd3AyWVhJZ2FHRjRaVjlrYzE5SmJuUk5ZWEFnUFNCbWRXNWpkR2x2YmlncElIc0tDWFJvYVhNdWFDQTlJSHNnZlRzS2ZUc0tKR2g0UTJ4aGMzTmxjMXNpYUdGNFpTNWtjeTVKYm5STllYQWlYU0E5SUdoaGVHVmZaSE5mU1c1MFRXRndPd3BvWVhobFgyUnpYMGx1ZEUxaGNDNWZYMjVoYldWZlh5QTlJSFJ5ZFdVN0NuWmhjaUJvWVhobFgyUnpYMHhwYzNRZ1BTQm1kVzVqZEdsdmJpZ3BJSHNLQ1hSb2FYTXViR1Z1WjNSb0lEMGdNRHNLZlRzS0pHaDRRMnhoYzNObGMxc2lhR0Y0WlM1a2N5NU1hWE4wSWwwZ1BTQm9ZWGhsWDJSelgweHBjM1E3Q21oaGVHVmZaSE5mVEdsemRDNWZYMjVoYldWZlh5QTlJSFJ5ZFdVN0NtaGhlR1ZmWkhOZlRHbHpkQzV3Y205MGIzUjVjR1VnUFNCN0NnbGhaR1E2SUdaMWJtTjBhVzl1S0dsMFpXMHBJSHNLQ1FsMllYSWdlQ0E5SUc1bGR5Qm9ZWGhsWDJSelgxOGtUR2x6ZEY5TWFYTjBUbTlrWlNocGRHVnRMRzUxYkd3cE93b0pDV2xtS0hSb2FYTXVhQ0E5UFNCdWRXeHNLU0I3Q2drSkNYUm9hWE11YUNBOUlIZzdDZ2tKZlNCbGJITmxJSHNLQ1FrSmRHaHBjeTV4TG01bGVIUWdQU0I0T3dvSkNYMEtDUWwwYUdsekxuRWdQU0I0T3dvSkNYUm9hWE11YkdWdVozUm9LeXM3Q2dsOUNuMDdDblpoY2lCb1lYaGxYMlJ6WDE4a1RHbHpkRjlNYVhOMFRtOWtaU0E5SUdaMWJtTjBhVzl1S0dsMFpXMHNibVY0ZENrZ2V3b0pkR2hwY3k1cGRHVnRJRDBnYVhSbGJUc0tDWFJvYVhNdWJtVjRkQ0E5SUc1bGVIUTdDbjA3Q2lSb2VFTnNZWE56WlhOYkltaGhlR1V1WkhNdVgweHBjM1F1VEdsemRFNXZaR1VpWFNBOUlHaGhlR1ZmWkhOZlh5Uk1hWE4wWDB4cGMzUk9iMlJsT3dwb1lYaGxYMlJ6WDE4a1RHbHpkRjlNYVhOMFRtOWtaUzVmWDI1aGJXVmZYeUE5SUhSeWRXVTdDblpoY2lCb1lYaGxYMlJ6WDA5aWFtVmpkRTFoY0NBOUlHWjFibU4wYVc5dUtDa2dld29KZEdocGN5NW9JRDBnZXlCZlgydGxlWE5mWHlBNklIc2dmWDA3Q24wN0NpUm9lRU5zWVhOelpYTmJJbWhoZUdVdVpITXVUMkpxWldOMFRXRndJbDBnUFNCb1lYaGxYMlJ6WDA5aWFtVmpkRTFoY0RzS2FHRjRaVjlrYzE5UFltcGxZM1JOWVhBdVgxOXVZVzFsWDE4Z1BTQjBjblZsT3dwb1lYaGxYMlJ6WDA5aWFtVmpkRTFoY0M1d2NtOTBiM1I1Y0dVZ1BTQjdDZ2x6WlhRNklHWjFibU4wYVc5dUtHdGxlU3gyWVd4MVpTa2dld29KQ1haaGNpQnBaQ0E5SUd0bGVTNWZYMmxrWDE4N0Nna0phV1lvYVdRZ1BUMGdiblZzYkNrZ2V3b0pDUWxwWkNBOUlDaHJaWGt1WDE5cFpGOWZJRDBnSkdkc2IySmhiQzRrYUdGNFpWVkpSQ3NyS1RzS0NRbDlDZ2tKZEdocGN5NW9XMmxrWFNBOUlIWmhiSFZsT3dvSkNYUm9hWE11YUM1ZlgydGxlWE5mWDF0cFpGMGdQU0JyWlhrN0NnbDlDbjA3Q25aaGNpQm9ZWGhsWDJSelgxTjBjbWx1WjAxaGNDQTlJR1oxYm1OMGFXOXVLQ2tnZXdvSmRHaHBjeTVvSUQwZ1QySnFaV04wTG1OeVpXRjBaU2h1ZFd4c0tUc0tmVHNLSkdoNFEyeGhjM05sYzFzaWFHRjRaUzVrY3k1VGRISnBibWROWVhBaVhTQTlJR2hoZUdWZlpITmZVM1J5YVc1blRXRndPd3BvWVhobFgyUnpYMU4wY21sdVowMWhjQzVmWDI1aGJXVmZYeUE5SUhSeWRXVTdDblpoY2lCb1lYaGxYMmx2WDBWeWNtOXlJRDBnSkdoNFJXNTFiWE5iSW1oaGVHVXVhVzh1UlhKeWIzSWlYU0E5SUhzZ1gxOWxibUZ0WlY5Zk9uUnlkV1VzWDE5amIyNXpkSEoxWTNSelgxODZiblZzYkFvSkxFSnNiMk5yWldRNklIdGZhSGhmYm1GdFpUb2lRbXh2WTJ0bFpDSXNYMmg0WDJsdVpHVjRPakFzWDE5bGJuVnRYMTg2SW1oaGVHVXVhVzh1UlhKeWIzSWlMSFJ2VTNSeWFXNW5PaVJsYzNSeWZRb0pMRTkyWlhKbWJHOTNPaUI3WDJoNFgyNWhiV1U2SWs5MlpYSm1iRzkzSWl4ZmFIaGZhVzVrWlhnNk1TeGZYMlZ1ZFcxZlh6b2lhR0Y0WlM1cGJ5NUZjbkp2Y2lJc2RHOVRkSEpwYm1jNkpHVnpkSEo5Q2drc1QzVjBjMmxrWlVKdmRXNWtjem9nZTE5b2VGOXVZVzFsT2lKUGRYUnphV1JsUW05MWJtUnpJaXhmYUhoZmFXNWtaWGc2TWl4ZlgyVnVkVzFmWHpvaWFHRjRaUzVwYnk1RmNuSnZjaUlzZEc5VGRISnBibWM2SkdWemRISjlDZ2tzUTNWemRHOXRPaUFvSkY4OVpuVnVZM1JwYjI0b1pTa2dleUJ5WlhSMWNtNGdlMTlvZUY5cGJtUmxlRG96TEdVNlpTeGZYMlZ1ZFcxZlh6b2lhR0Y0WlM1cGJ5NUZjbkp2Y2lJc2RHOVRkSEpwYm1jNkpHVnpkSEo5T3lCOUxDUmZMbDlvZUY5dVlXMWxQU0pEZFhOMGIyMGlMQ1JmTGw5ZmNHRnlZVzF6WDE4Z1BTQmJJbVVpWFN3a1h5a0tmVHNLYUdGNFpWOXBiMTlGY25KdmNpNWZYMk52Ym5OMGNuVmpkSE5mWHlBOUlGdG9ZWGhsWDJsdlgwVnljbTl5TGtKc2IyTnJaV1FzYUdGNFpWOXBiMTlGY25KdmNpNVBkbVZ5Wm14dmR5eG9ZWGhsWDJsdlgwVnljbTl5TGs5MWRITnBaR1ZDYjNWdVpITXNhR0Y0WlY5cGIxOUZjbkp2Y2k1RGRYTjBiMjFkT3dwMllYSWdhR0Y0WlY5cGRHVnlZWFJ2Y25OZlFYSnlZWGxKZEdWeVlYUnZjaUE5SUdaMWJtTjBhVzl1S0dGeWNtRjVLU0I3Q2dsMGFHbHpMbU4xY25KbGJuUWdQU0F3T3dvSmRHaHBjeTVoY25KaGVTQTlJR0Z5Y21GNU93cDlPd29rYUhoRGJHRnpjMlZ6V3lKb1lYaGxMbWwwWlhKaGRHOXljeTVCY25KaGVVbDBaWEpoZEc5eUlsMGdQU0JvWVhobFgybDBaWEpoZEc5eWMxOUJjbkpoZVVsMFpYSmhkRzl5T3dwb1lYaGxYMmwwWlhKaGRHOXljMTlCY25KaGVVbDBaWEpoZEc5eUxsOWZibUZ0WlY5ZklEMGdkSEoxWlRzS2FHRjRaVjlwZEdWeVlYUnZjbk5mUVhKeVlYbEpkR1Z5WVhSdmNpNXdjbTkwYjNSNWNHVWdQU0I3Q2dsb1lYTk9aWGgwT2lCbWRXNWpkR2x2YmlncElIc0tDUWx5WlhSMWNtNGdkR2hwY3k1amRYSnlaVzUwSUR3Z2RHaHBjeTVoY25KaGVTNXNaVzVuZEdnN0NnbDlDZ2tzYm1WNGREb2dablZ1WTNScGIyNG9LU0I3Q2drSmNtVjBkWEp1SUhSb2FYTXVZWEp5WVhsYmRHaHBjeTVqZFhKeVpXNTBLeXRkT3dvSmZRcDlPd3AyWVhJZ2FuTmZRbTl2ZENBOUlHWjFibU4wYVc5dUtDa2dleUI5T3dva2FIaERiR0Z6YzJWeld5SnFjeTVDYjI5MElsMGdQU0JxYzE5Q2IyOTBPd3BxYzE5Q2IyOTBMbDlmYm1GdFpWOWZJRDBnZEhKMVpUc0thbk5mUW05dmRDNWZYM04wY21sdVoxOXlaV01nUFNCbWRXNWpkR2x2YmlodkxITXBJSHNLQ1dsbUtHOGdQVDBnYm5Wc2JDa2dld29KQ1hKbGRIVnliaUFpYm5Wc2JDSTdDZ2w5Q2dscFppaHpMbXhsYm1kMGFDQStQU0ExS1NCN0Nna0pjbVYwZFhKdUlDSThMaTR1UGlJN0NnbDlDZ2wyWVhJZ2RDQTlJSFI1Y0dWdlppaHZLVHNLQ1dsbUtIUWdQVDBnSW1aMWJtTjBhVzl1SWlBbUppQW9ieTVmWDI1aGJXVmZYeUI4ZkNCdkxsOWZaVzVoYldWZlh5a3BJSHNLQ1FsMElEMGdJbTlpYW1WamRDSTdDZ2w5Q2dsemQybDBZMmdvZENrZ2V3b0pZMkZ6WlNBaVpuVnVZM1JwYjI0aU9nb0pDWEpsZEhWeWJpQWlQR1oxYm1OMGFXOXVQaUk3Q2dsallYTmxJQ0p2WW1wbFkzUWlPZ29KQ1dsbUtHOHVYMTlsYm5WdFgxOHBJSHNLQ1FrSmRtRnlJR1VnUFNBa2FIaEZiblZ0YzF0dkxsOWZaVzUxYlY5ZlhUc0tDUWtKZG1GeUlHTnZiaUE5SUdVdVgxOWpiMjV6ZEhKMVkzUnpYMTliYnk1ZmFIaGZhVzVrWlhoZE93b0pDUWwyWVhJZ2JpQTlJR052Ymk1ZmFIaGZibUZ0WlRzS0NRa0phV1lvWTI5dUxsOWZjR0Z5WVcxelgxOHBJSHNLQ1FrSkNYTWdQU0J6SUNzZ0lseDBJanNLQ1FrSkNYSmxkSFZ5YmlCdUlDc2dJaWdpSUNzZ0tDaG1kVzVqZEdsdmJpZ2tkR2hwY3lrZ2V3b0pDUWtKQ1haaGNpQWtjanNLQ1FrSkNRbDJZWElnWDJjZ1BTQmJYVHNLQ1FrSkNRbDdDZ2tKQ1FrSkNYWmhjaUJmWnpFZ1BTQXdPd29KQ1FrSkNRbDJZWElnWDJjeUlEMGdZMjl1TGw5ZmNHRnlZVzF6WDE4N0Nna0pDUWtKQ1hkb2FXeGxLSFJ5ZFdVcElIc0tDUWtKQ1FrSkNXbG1LQ0VvWDJjeElEd2dYMmN5TG14bGJtZDBhQ2twSUhzS0NRa0pDUWtKQ1FsaWNtVmhhenNLQ1FrSkNRa0pDWDBLQ1FrSkNRa0pDWFpoY2lCd0lEMGdYMmN5VzE5bk1WMDdDZ2tKQ1FrSkNRbGZaekVnUFNCZlp6RWdLeUF4T3dvSkNRa0pDUWtKWDJjdWNIVnphQ2hxYzE5Q2IyOTBMbDlmYzNSeWFXNW5YM0psWXlodlczQmRMSE1wS1RzS0NRa0pDUWtKZlFvSkNRa0pDWDBLQ1FrSkNRa2tjaUE5SUY5bk93b0pDUWtKQ1hKbGRIVnliaUFrY2pzS0NRa0pDWDBvZEdocGN5a3BLUzVxYjJsdUtDSXNJaWtnS3lBaUtTSTdDZ2tKQ1gwZ1pXeHpaU0I3Q2drSkNRbHlaWFIxY200Z2Jqc0tDUWtKZlFvSkNYMEtDUWxwWmlnb0tHOHBJR2x1YzNSaGJtTmxiMllnUVhKeVlYa3BLU0I3Q2drSkNYWmhjaUJ6ZEhJZ1BTQWlXeUk3Q2drSkNYTWdLejBnSWx4MElqc0tDUWtKZG1GeUlGOW5JRDBnTURzS0NRa0pkbUZ5SUY5bk1TQTlJRzh1YkdWdVozUm9Pd29KQ1FsM2FHbHNaU2hmWnlBOElGOW5NU2tnZXdvSkNRa0pkbUZ5SUdrZ1BTQmZaeXNyT3dvSkNRa0pjM1J5SUNzOUlDaHBJRDRnTUNBL0lDSXNJaUE2SUNJaUtTQXJJR3B6WDBKdmIzUXVYMTl6ZEhKcGJtZGZjbVZqS0c5YmFWMHNjeWs3Q2drSkNYMEtDUWtKYzNSeUlDczlJQ0pkSWpzS0NRa0pjbVYwZFhKdUlITjBjanNLQ1FsOUNna0pkbUZ5SUhSdmMzUnlPd29KQ1hSeWVTQjdDZ2tKQ1hSdmMzUnlJRDBnYnk1MGIxTjBjbWx1WnpzS0NRbDlJR05oZEdOb0tDQmZaeUFwSUhzS0NRa0pjbVYwZFhKdUlDSS9QejhpT3dvSkNYMEtDUWxwWmloMGIzTjBjaUFoUFNCdWRXeHNJQ1ltSUhSdmMzUnlJQ0U5SUU5aWFtVmpkQzUwYjFOMGNtbHVaeUFtSmlCMGVYQmxiMllvZEc5emRISXBJRDA5SUNKbWRXNWpkR2x2YmlJcElIc0tDUWtKZG1GeUlITXlJRDBnYnk1MGIxTjBjbWx1WnlncE93b0pDUWxwWmloek1pQWhQU0FpVzI5aWFtVmpkQ0JQWW1wbFkzUmRJaWtnZXdvSkNRa0pjbVYwZFhKdUlITXlPd29KQ1FsOUNna0pmUW9KQ1haaGNpQnpkSElnUFNBaWUxeHVJanNLQ1FseklDczlJQ0pjZENJN0Nna0pkbUZ5SUdoaGMzQWdQU0J2TG1oaGMwOTNibEJ5YjNCbGNuUjVJQ0U5SUc1MWJHdzdDZ2tKZG1GeUlHc2dQU0J1ZFd4c093b0pDV1p2Y2lnZ2F5QnBiaUJ2SUNrZ2V3b0pDV2xtS0doaGMzQWdKaVlnSVc4dWFHRnpUM2R1VUhKdmNHVnlkSGtvYXlrcElIc0tDUWtKWTI5dWRHbHVkV1U3Q2drSmZRb0pDV2xtS0dzZ1BUMGdJbkJ5YjNSdmRIbHdaU0lnZkh3Z2F5QTlQU0FpWDE5amJHRnpjMTlmSWlCOGZDQnJJRDA5SUNKZlgzTjFjR1Z5WDE4aUlIeDhJR3NnUFQwZ0lsOWZhVzUwWlhKbVlXTmxjMTlmSWlCOGZDQnJJRDA5SUNKZlgzQnliM0JsY25ScFpYTmZYeUlwSUhzS0NRa0pZMjl1ZEdsdWRXVTdDZ2tKZlFvSkNXbG1LSE4wY2k1c1pXNW5kR2dnSVQwZ01pa2dld29KQ1FsemRISWdLejBnSWl3Z1hHNGlPd29KQ1gwS0NRbHpkSElnS3owZ2N5QXJJR3NnS3lBaUlEb2dJaUFySUdwelgwSnZiM1F1WDE5emRISnBibWRmY21WaktHOWJhMTBzY3lrN0Nna0pmUW9KQ1hNZ1BTQnpMbk4xWW5OMGNtbHVaeWd4S1RzS0NRbHpkSElnS3owZ0lseHVJaUFySUhNZ0t5QWlmU0k3Q2drSmNtVjBkWEp1SUhOMGNqc0tDV05oYzJVZ0luTjBjbWx1WnlJNkNna0pjbVYwZFhKdUlHODdDZ2xrWldaaGRXeDBPZ29KQ1hKbGRIVnliaUJUZEhKcGJtY29ieWs3Q2dsOUNuMDdDaVJuYkc5aVlXd3VKR2hoZUdWVlNVUWdmRDBnTURzS2FXWW9kSGx3Wlc5bUtIQmxjbVp2Y20xaGJtTmxLU0FoUFNBaWRXNWtaV1pwYm1Wa0lpQS9JSFI1Y0dWdlppaHdaWEptYjNKdFlXNWpaUzV1YjNjcElEMDlJQ0ptZFc1amRHbHZiaUlnT2lCbVlXeHpaU2tnZXdvSlNIaFBkbVZ5Y21sa1pYTXVibTkzSUQwZ2NHVnlabTl5YldGdVkyVXVibTkzTG1KcGJtUW9jR1Z5Wm05eWJXRnVZMlVwT3dwOUNpUm9lRU5zWVhOelpYTmJJazFoZEdnaVhTQTlJRTFoZEdnN0NtbG1LQ0JUZEhKcGJtY3Vabkp2YlVOdlpHVlFiMmx1ZENBOVBTQnVkV3hzSUNrZ1UzUnlhVzVuTG1aeWIyMURiMlJsVUc5cGJuUWdQU0JtZFc1amRHbHZiaWhqS1NCN0lISmxkSFZ5YmlCaklEd2dNSGd4TURBd01DQS9JRk4wY21sdVp5NW1jbTl0UTJoaGNrTnZaR1VvWXlrZ09pQlRkSEpwYm1jdVpuSnZiVU5vWVhKRGIyUmxLQ2hqUGo0eE1Da3JNSGhFTjBNd0tTdFRkSEpwYm1jdVpuSnZiVU5vWVhKRGIyUmxLQ2hqSmpCNE0wWkdLU3N3ZUVSRE1EQXBPeUI5Q2xOMGNtbHVaeTVmWDI1aGJXVmZYeUE5SUhSeWRXVTdDaVJvZUVOc1lYTnpaWE5iSWtGeWNtRjVJbDBnUFNCQmNuSmhlVHNLUVhKeVlYa3VYMTl1WVcxbFgxOGdQU0IwY25WbE93cEVZWFJsTGw5ZmJtRnRaVjlmSUQwZ0lrUmhkR1VpT3dwb1lYaGxYMUpsYzI5MWNtTmxMbU52Ym5SbGJuUWdQU0JiZXlCdVlXMWxJRG9nSWw5b1pXeHdYMjFoY0NJc0lHUmhkR0VnT2lBaVdXNXJlRTlVY0d0amJURm1ZekpXZVdSdFZubFlNMlJ3V2tkV01tRlhOV3hpTTJzd1QyMW9iR0pJUWpWTlZHYzJXVEk1ZEV4dVpIQmFSMVl5WVZjMWJFeHRSbk5qUjJob1pWUm5ObHBIVm0xWldGWnpaRVk1TlU1RVp6WmhTRkl3WTBoTmJFMHdSV3hOYTFsc1RXdGFNMkZYVW14a2JXeDFXbE14ZDJOdE9UUmxVelZvWTBoQ2VtTkhPVEJNYlU1MllsTlZlVkp1UW5saU0yZzFXak5yZVUxRWNHdGpiVEZtWXpKV2VXUnRWbmxZTTBKeldWaHNlVnBYUm10bFZ6bFRUVmhyZVUxNmNHcGlNakIxWWxkc2FtTnRPWHBpTWxvd1RHNUNjMWxZYkhsYVYwWnJaVlpKZW1WVVJUTk9hbkJ2WkVoU2QyTjVWWHBSVTFWNVVtbFZlVkp1UW5OWldHeDVXbGRHYTJWVE5XdGhXRXBzV1ROU01GbFlRbnBNYlRWc1pFTlZlVkp1UW5sS1ZFcEhZek5hYWtwVVNrZGpiV3h1WVVoU2VtSlhSblZaVjJSc1kyazFhR015TVRSS1ZFNUhWVWQ0YUdWV1NuQmFNbWd3U2xST1JVMVRWWGxPYkZaNldsWk9jR0pZUW5OYVZUVjJZbXhDYkdOdVRuQmpNMUpzWW01U1RXRlhUbXhpYms1c1NsUk9SVTFUVlhsT2JFSnpXVmhzUm1KdFJtbGlSMVo1WTNsVmVsSkVZelJPYWxsNVRqQlJORXhWVFhsUlZGbDBUa1JTUTFKVE1EUlNhbWMwVEZSQk5GRlZWWGxPVkZaRFRVUkdRazR5WkRWTlZFVTJXa2RXYVdSWFpHWmlSMVl5V2xkNGRsVnFSalZOVkdzMll6SldNRXBVU1hkYVIxWnBaRmRqYkUxcVFuTmFXRnBzWWtaSmVtRlVVbTVoUVNKOVhUc0thR0Y0WlY5a2MxOVBZbXBsWTNSTllYQXVZMjkxYm5RZ1BTQXdPd3BxYzE5Q2IyOTBMbDlmZEc5VGRISWdQU0FvZXlCOUtTNTBiMU4wY21sdVp6c0tRWEpuWVc0dVNFVk1VRjlTUlZOUFZWSkRSVjlMUlZrZ1BTQWlYMmhsYkhCZmJXRndJanNLYUdGNFpWOVZibk5sY21saGJHbDZaWEl1UkVWR1FWVk1WRjlTUlZOUFRGWkZVaUE5SUc1bGR5Qm9ZWGhsWDE4a1ZXNXpaWEpwWVd4cGVtVnlYMFJsWm1GMWJIUlNaWE52YkhabGNpZ3BPd3BvWVhobFgxVnVjMlZ5YVdGc2FYcGxjaTVDUVZORk5qUWdQU0FpUVVKRFJFVkdSMGhKU2t0TVRVNVBVRkZTVTFSVlZsZFlXVnBoWW1Oa1pXWm5hR2xxYTJ4dGJtOXdjWEp6ZEhWMmQzaDVlakF4TWpNME5UWTNPRGtsT2lJN0NtaGhlR1ZmWTNKNWNIUnZYMEpoYzJVMk5DNURTRUZTVXlBOUlDSkJRa05FUlVaSFNFbEtTMHhOVGs5UVVWSlRWRlZXVjFoWldtRmlZMlJsWm1kb2FXcHJiRzF1YjNCeGNuTjBkWFozZUhsNk1ERXlNelExTmpjNE9Tc3ZJanNLYUdGNFpWOWpjbmx3ZEc5ZlFtRnpaVFkwTGtKWlZFVlRJRDBnYUdGNFpWOXBiMTlDZVhSbGN5NXZabE4wY21sdVp5aG9ZWGhsWDJOeWVYQjBiMTlDWVhObE5qUXVRMGhCVWxNcE93cElZWE5RYkdGNVpYSXViV0ZwYmlncE93cDlLU2gwZVhCbGIyWWdkMmx1Wkc5M0lDRTlJQ0oxYm1SbFptbHVaV1FpSUQ4Z2QybHVaRzkzSURvZ2RIbHdaVzltSUdkc2IySmhiQ0FoUFNBaWRXNWtaV1pwYm1Wa0lpQS9JR2RzYjJKaGJDQTZJSFI1Y0dWdlppQnpaV3htSUNFOUlDSjFibVJsWm1sdVpXUWlJRDhnYzJWc1ppQTZJSFJvYVhNcE93bz0"},{ name : "dashjs-src", data : "ewogICAgIjQuNS4yIjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9kYXNoanMvNC41LjIvZGFzaC5hbGwuZGVidWcuanMiXSwKICAgICI0LjUuMSI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvZGFzaGpzLzQuNS4xL2Rhc2guYWxsLmRlYnVnLmpzIl0sCiAgICAiNC41LjAiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2Rhc2hqcy80LjUuMC9kYXNoLmFsbC5kZWJ1Zy5qcyJdLAogICAgIjQuNC4xIjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9kYXNoanMvNC40LjEvZGFzaC5hbGwuZGVidWcuanMiXSwKICAgICI0LjQuMCI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvZGFzaGpzLzQuNC4wL2Rhc2guYWxsLmRlYnVnLmpzIl0sCiAgICAiNC4zLjAiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2Rhc2hqcy80LjMuMC9kYXNoLmFsbC5kZWJ1Zy5qcyJdLAogICAgIjQuMi4wIjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9kYXNoanMvNC4yLjAvZGFzaC5hbGwuZGVidWcuanMiXSwKICAgICI0LjEuMCI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvZGFzaGpzLzQuMS4wL2Rhc2guYWxsLmRlYnVnLmpzIl0sCiAgICAiMy4yLjIiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2Rhc2hqcy8zLjIuMi9kYXNoLmFsbC5kZWJ1Zy5qcyJdLAogICAgIjMuMC4zIjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9kYXNoanMvMy4wLjMvZGFzaC5hbGwuZGVidWcuanMiXSwKICAgICIzLjAuMiI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvZGFzaGpzLzMuMC4yL2Rhc2guYWxsLmRlYnVnLmpzIl0sCiAgICAiMy4wLjEiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2Rhc2hqcy8zLjAuMS9kYXNoLmFsbC5kZWJ1Zy5qcyJdLAogICAgIjMuMC4wIjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9kYXNoanMvMy4wLjAvZGFzaC5hbGwuZGVidWcuanMiXSwKICAgICIyLjkuMyI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvZGFzaGpzLzIuOS4zL2Rhc2guYWxsLmRlYnVnLmpzIl0sCiAgICAiMi45LjIiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2Rhc2hqcy8yLjkuMi9kYXNoLmFsbC5kZWJ1Zy5qcyJdLAogICAgIjIuOS4xIjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9kYXNoanMvMi45LjEvZGFzaC5hbGwuZGVidWcuanMiXSwKICAgICIyLjkuMCI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvZGFzaGpzLzIuOS4wL2Rhc2guYWxsLmRlYnVnLmpzIl0sCiAgICAiMi44LjAiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2Rhc2hqcy8yLjguMC9kYXNoLmFsbC5kZWJ1Zy5qcyJdLAogICAgIjIuNy4wIjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9kYXNoanMvMi43LjAvZGFzaC5hbGwuZGVidWcuanMiXSwKICAgICIyLjYuOCI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvZGFzaGpzLzIuNi44L2Rhc2guYWxsLmRlYnVnLmpzIl0sCiAgICAiMi42LjciOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2Rhc2hqcy8yLjYuNy9kYXNoLmFsbC5kZWJ1Zy5qcyJdLAogICAgIjIuNi42IjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9kYXNoanMvMi42LjYvZGFzaC5hbGwuZGVidWcuanMiXSwKICAgICIyLjYuNSI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvZGFzaGpzLzIuNi41L2Rhc2guYWxsLmRlYnVnLmpzIl0sCiAgICAiMi42LjQiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2Rhc2hqcy8yLjYuNC9kYXNoLmFsbC5kZWJ1Zy5qcyJdLAogICAgIjIuNi4zIjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9kYXNoanMvMi42LjMvZGFzaC5hbGwuZGVidWcuanMiXSwKICAgICIyLjYuMiI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvZGFzaGpzLzIuNi4yL2Rhc2guYWxsLmRlYnVnLmpzIl0sCiAgICAiMi42LjEiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2Rhc2hqcy8yLjYuMS9kYXNoLmFsbC5kZWJ1Zy5qcyJdLAogICAgIjIuNi4wIjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9kYXNoanMvMi42LjAvZGFzaC5hbGwuZGVidWcuanMiXSwKICAgICIyLjUuMCI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvZGFzaGpzLzIuNS4wL2Rhc2guYWxsLmRlYnVnLmpzIl0sCiAgICAiMi40LjEiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2Rhc2hqcy8yLjQuMS9kYXNoLmFsbC5kZWJ1Zy5qcyJdLAogICAgIjIuNC4wIjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9kYXNoanMvMi40LjAvZGFzaC5hbGwuZGVidWcuanMiXSwKICAgICIyLjMuMCI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvZGFzaGpzLzIuMy4wL2Rhc2guYWxsLmRlYnVnLmpzIl0sCiAgICAiMi4yLjAiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2Rhc2hqcy8yLjIuMC9kYXNoLmFsbC5kZWJ1Zy5qcyJdLAogICAgIjIuMS4xIjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9kYXNoanMvMi4xLjEvZGFzaC5hbGwuZGVidWcuanMiXSwKICAgICIyLjEuMCI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvZGFzaGpzLzIuMS4wL2Rhc2guYWxsLmRlYnVnLmpzIl0sCiAgICAiMi4wLjAtcmM1IjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9kYXNoanMvMi4wLjAtcmM1L2Rhc2guYWxsLmRlYnVnLmpzIl0sCiAgICAiMi4wLjAtcmM0IjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9kYXNoanMvMi4wLjAtcmM0L2Rhc2guYWxsLmRlYnVnLmpzIl0sCiAgICAiMi4wLjAiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2Rhc2hqcy8yLjAuMC9kYXNoLmFsbC5kZWJ1Zy5qcyJdLAogICAgIjEuNi4wIjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9kYXNoanMvMS42LjAvZGFzaC5kZWJ1Zy5qcyJdLAogICAgIjEuNS4xIjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9kYXNoanMvMS41LjEvZGFzaC5kZWJ1Zy5qcyJdLAogICAgIjEuNS4wIjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9kYXNoanMvMS41LjAvZGFzaC5kZWJ1Zy5qcyJdLAogICAgIjEuNCI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvZGFzaGpzLzEuNC9kYXNoLmRlYnVnLmpzIl0sCiAgICAiMS4zLjAiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2Rhc2hqcy8xLjMuMC9kYXNoLmRlYnVnLmpzIl0sCiAgICAiMS4yLjAiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2Rhc2hqcy8xLjIuMC9kYXNoLmFsbC5qcyJdLAogICAgIjEuMS4yIjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9kYXNoanMvMS4xLjIvZGFzaC5hbGwuanMiXSwKICAgICIxLjAuMCI6IFsiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvZGFzaGpzLzEuMC4wL2Rhc2guYWxsLmpzIl0sCiAgICAiMC4yLjUiOiBbImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2Rhc2hqcy8wLjIuNS9kYXNoLmFsbC5qcyJdLAogICAgIjAuMi40IjogWyJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9kYXNoanMvMC4yLjQvZGFzaC5hbGwuanMiXQp9Cg"},{ name : "hlsjs", data : "ZGF0YTp0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTg7YmFzZTY0LEtHWjFibU4wYVc5dUlDZ2taMnh2WW1Gc0tTQjdJQ0oxYzJVZ2MzUnlhV04wSWpzS2RtRnlJQ1JvZUVOc1lYTnpaWE1nUFNCN2ZTd2taWE4wY2lBOUlHWjFibU4wYVc5dUtDa2dleUJ5WlhSMWNtNGdhbk5mUW05dmRDNWZYM04wY21sdVoxOXlaV01vZEdocGN5d25KeWs3SUgwc0pHaDRSVzUxYlhNZ1BTQWthSGhGYm5WdGN5QjhmQ0I3ZlN3a1h6c0tablZ1WTNScGIyNGdKR1Y0ZEdWdVpDaG1jbTl0TENCbWFXVnNaSE1wSUhzS0NYWmhjaUJ3Y205MGJ5QTlJRTlpYW1WamRDNWpjbVZoZEdVb1puSnZiU2s3Q2dsbWIzSWdLSFpoY2lCdVlXMWxJR2x1SUdacFpXeGtjeWtnY0hKdmRHOWJibUZ0WlYwZ1BTQm1hV1ZzWkhOYmJtRnRaVjA3Q2dscFppZ2dabWxsYkdSekxuUnZVM1J5YVc1bklDRTlQU0JQWW1wbFkzUXVjSEp2ZEc5MGVYQmxMblJ2VTNSeWFXNW5JQ2tnY0hKdmRHOHVkRzlUZEhKcGJtY2dQU0JtYVdWc1pITXVkRzlUZEhKcGJtYzdDZ2x5WlhSMWNtNGdjSEp2ZEc4N0NuMEtkbUZ5SUVGeVoyRnVJRDBnWm5WdVkzUnBiMjRvS1NCN0lIMDdDaVJvZUVOc1lYTnpaWE5iSWtGeVoyRnVJbDBnUFNCQmNtZGhianNLUVhKbllXNHVYMTl1WVcxbFgxOGdQU0IwY25WbE93cEJjbWRoYmk1emRHRnlkQ0E5SUdaMWJtTjBhVzl1S0dOdmJtWnBaeWtnZXdvSmFXWW9iblZzYkNBaFBTQmpiMjVtYVdjcElIc0tDUWwyWVhJZ1lYSm5jMTl6WlhRZ1BTQnVaWGNnYUdGNFpWOWtjMTlUZEhKcGJtZE5ZWEFvS1RzS0NRbDJZWElnWDJjZ1BTQXdPd29KQ1haaGNpQmZaekVnUFNCU1pXWnNaV04wTG1acFpXeGtjeWhqYjI1bWFXY3BPd29KQ1hkb2FXeGxLRjluSUR3Z1gyY3hMbXhsYm1kMGFDa2dld29KQ1FsMllYSWdaaUE5SUY5bk1WdGZaMTA3Q2drSkNTc3JYMmM3Q2drSkNXRnlaM05mYzJWMExtaGJabDBnUFNCU1pXWnNaV04wTG1acFpXeGtLR052Ym1acFp5eG1LVHNLQ1FsOUNna0pRWEpuWVc0dVlYSm5jeUE5SUdGeVozTmZjMlYwT3dvSmZRcDlPd3BCY21kaGJpNXZZbXBsWTNSR2NtOXRUV0Z3SUQwZ1puVnVZM1JwYjI0b2JXRndLU0I3Q2dsMllYSWdiMkpxSUQwZ2V5QjlPd29KZG1GeUlHZ2dQU0J0WVhBdWFEc0tDWFpoY2lCclgyZ2dQU0JvT3dvSmRtRnlJR3RmYTJWNWN5QTlJRTlpYW1WamRDNXJaWGx6S0dncE93b0pkbUZ5SUd0ZmJHVnVaM1JvSUQwZ2ExOXJaWGx6TG14bGJtZDBhRHNLQ1haaGNpQnJYMk4xY25KbGJuUWdQU0F3T3dvSmQyaHBiR1VvYTE5amRYSnlaVzUwSUR3Z2ExOXNaVzVuZEdncElIc0tDUWwyWVhJZ2F5QTlJR3RmYTJWNWMxdHJYMk4xY25KbGJuUXJLMTA3Q2drSmIySnFXMnRkSUQwZ2JXRndMbWhiYTEwN0NnbDlDZ2x5WlhSMWNtNGdiMkpxT3dwOU93cDJZWElnU0d4elNuTWdQU0JtZFc1amRHbHZiaWdwSUhzZ2ZUc0tKR2g0UTJ4aGMzTmxjMXNpU0d4elNuTWlYU0E5SUVoc2MwcHpPd3BJYkhOS2N5NWZYMjVoYldWZlh5QTlJSFJ5ZFdVN0NraHNjMHB6TG0xaGFXNGdQU0JtZFc1amRHbHZiaWdwSUhzS0NYWmhjaUIyYVdSbGJ5QTlJSGRwYm1SdmR5NWtiMk4xYldWdWRDNW5aWFJGYkdWdFpXNTBRbmxKWkNnaWRtbGtaVzhpS1RzS0NYWmhjaUIxY21rZ1BTQlNaV1pzWldOMExtWnBaV3hrS0hkcGJtUnZkeXdpZFhKcElpazdDZ2wyWVhJZ1NHeHpJRDBnVW1WbWJHVmpkQzVtYVdWc1pDaDNhVzVrYjNjc0lraHNjeUlwT3dvSmFXWW9RWEpuWVc0dVlYSm5jeUFoUFNCdWRXeHNJQ1ltSUU5aWFtVmpkQzV3Y205MGIzUjVjR1V1YUdGelQzZHVVSEp2Y0dWeWRIa3VZMkZzYkNoQmNtZGhiaTVoY21kekxtZ3NJbXhwZG1WVGVXNWpSSFZ5WVhScGIyNURiM1Z1ZENJcEtTQjdDZ2tKU0d4elNuTXVhR3h6UTI5dVptbG5XeUpzYVhabFUzbHVZMFIxY21GMGFXOXVRMjkxYm5RaVhTQTlJRUZ5WjJGdUxtRnlaM01nSVQwZ2JuVnNiQ0FtSmlCUFltcGxZM1F1Y0hKdmRHOTBlWEJsTG1oaGMwOTNibEJ5YjNCbGNuUjVMbU5oYkd3b1FYSm5ZVzR1WVhKbmN5NW9MQ0pzYVhabFUzbHVZMFIxY21GMGFXOXVRMjkxYm5RaUtTQS9JRUZ5WjJGdUxtRnlaM011YUZzaWJHbDJaVk41Ym1ORWRYSmhkR2x2YmtOdmRXNTBJbDBnT2lBaU1TSTdDZ2w5Q2dsM2FXNWtiM2N1YUdWc2NDQTlJR1oxYm1OMGFXOXVLQ2tnZXdvSkNYSmxkSFZ5YmlCQmNtZGhiaTV2WW1wbFkzUkdjbTl0VFdGd0tHaGhlR1ZmVlc1elpYSnBZV3hwZW1WeUxuSjFiaWhvWVhobFgxSmxjMjkxY21ObExtZGxkRk4wY21sdVp5Z2lYMmhsYkhCZmJXRndJaWtwS1RzS0NYMDdDZ2xCY21kaGJpNXpkR0Z5ZENoM2FXNWtiM2N1WTI5dVptbG5LVHNLQ1dsbUtFaHNjeUFoUFNCdWRXeHNJQ1ltSUVoc2N5NXBjMU4xY0hCdmNuUmxaQ2dwS1NCN0Nna0pkbUZ5SUhCc1lYbGxjaUE5SUVoc2MwcHpMbVY0Y0c5elpWOXdiR0Y1WlhJb1ZIbHdaUzVqY21WaGRHVkpibk4wWVc1alpTaEliSE1zVzBoc2MwcHpMbWhzYzBOdmJtWnBaMTBwS1RzS0NRbHdiR0Y1WlhJdWJHOWhaRk52ZFhKalpTaDFjbWtwT3dvSkNYQnNZWGxsY2k1aGRIUmhZMmhOWldScFlTaDJhV1JsYnlrN0Nna0pjR3hoZVdWeUxtOXVLRWhzY3k1RmRtVnVkSE11VFVGT1NVWkZVMVJmVUVGU1UwVkVMR1oxYm1OMGFXOXVLQ2tnZXdvSkNRbDJZWElnZG1sa1pXOVVjbUZqYTNNZ1BTQmJleUIwYVhSc1pTQTZJQ0pCZFhSdklITjNhWFJqYUNJc0lHbHVabThnT2lCdWRXeHNmVjA3Q2drSkNYWmhjaUJXYVdSbGIxUnlZV05yU1c1bWIweHBjM1FnUFNCd2JHRjVaWEl1YkdWMlpXeHpPd29KQ1FsMllYSWdYMmNnUFNBd093b0pDUWwzYUdsc1pTaGZaeUE4SUZacFpHVnZWSEpoWTJ0SmJtWnZUR2x6ZEM1c1pXNW5kR2dwSUhzS0NRa0pDWFpoY2lCcGJtWnZJRDBnVm1sa1pXOVVjbUZqYTBsdVptOU1hWE4wVzE5blhUc0tDUWtKQ1NzclgyYzdDZ2tKQ1FsMmFXUmxiMVJ5WVdOcmN5NXdkWE5vS0hzZ2RHbDBiR1VnT2lBaUlpQXJJR2x1Wm04dVltbDBjbUYwWlNBdklERXdNREFnS3lBaUlHdGljSE1pTENCcGJtWnZJRG9nYVc1bWIzMHBPd29KQ1FsOUNna0pDV2xtS0ZacFpHVnZWSEpoWTJ0SmJtWnZUR2x6ZEM1c1pXNW5kR2dnUGlBeEtTQjdDZ2tKQ1FsaFpHUk5aVzUxS0NKV2FXUmxieUIwY21GamEzTWlMSFpwWkdWdlZISmhZMnR6TEdaMWJtTjBhVzl1S0dVcElIc0tDUWtKQ1Fsd2JHRjVaWEl1Ym1WNGRFeGxkbVZzSUQwZ1pTNTBZWEpuWlhRdWMyVnNaV04wWldSSmJtUmxlQ0F0SURFN0Nna0pDUWw5TEhCc1lYbGxjaTVqZFhKeVpXNTBUR1YyWld3cE93b0pDUWw5Q2drSkNYWmhjaUJoZFdScGIxUnlZV05yY3lBOUlGdDdJSFJwZEd4bElEb2dJa0YxZEc4Z2MzZHBkR05vSWl3Z2FXNW1ieUE2SUc1MWJHeDlYVHNLQ1FrSmRtRnlJRUYxWkdsdlZISmhZMnRKYm1adlRHbHpkQ0E5SUhCc1lYbGxjaTVoZFdScGIxUnlZV05yY3pzS0NRa0pkbUZ5SUY5bklEMGdNRHNLQ1FrSmQyaHBiR1VvWDJjZ1BDQkJkV1JwYjFSeVlXTnJTVzVtYjB4cGMzUXViR1Z1WjNSb0tTQjdDZ2tKQ1FsMllYSWdhVzVtYnlBOUlFRjFaR2x2VkhKaFkydEpibVp2VEdsemRGdGZaMTA3Q2drSkNRa3JLMTluT3dvSkNRa0pZWFZrYVc5VWNtRmphM011Y0hWemFDaDdJSFJwZEd4bElEb2dJaUlnS3lCVGRHUXVjM1J5YVc1bktHbHVabTh1Ym1GdFpTa2dLeUFpV3lJZ0t5QlRkR1F1YzNSeWFXNW5LR2x1Wm04dVozSnZkWEJKWkNrZ0t5QWlYU0lzSUdsdVptOGdPaUJwYm1admZTazdDZ2tKQ1gwS0NRa0phV1lvUVhWa2FXOVVjbUZqYTBsdVptOU1hWE4wTG14bGJtZDBhQ0ErSURFcElIc0tDUWtKQ1dGa1pFMWxiblVvSWtGMVpHbHZJSFJ5WVdOcmN5SXNZWFZrYVc5VWNtRmphM01zWm5WdVkzUnBiMjRvWlNrZ2V3b0pDUWtKQ1hCc1lYbGxjaTVoZFdScGIxUnlZV05ySUQwZ1pTNTBZWEpuWlhRdWMyVnNaV04wWldSSmJtUmxlQ0F0SURFN0Nna0pDUWw5TEhCc1lYbGxjaTVoZFdScGIxUnlZV05yS1RzS0NRa0pmUW9KQ1FscFppaDJhV1JsYnk1b1lYTkJkSFJ5YVdKMWRHVW9JbUYxZEc5d2JHRjVJaWtwSUhzS0NRa0pDWFpwWkdWdkxuQnNZWGtvS1RzS0NRa0pmUW9KQ1gwcE93b0pDWEJzWVhsbGNpNXZiaWhJYkhNdVJYWmxiblJ6TGxOVlFsUkpWRXhGWDFSU1FVTkxVMTlWVUVSQlZFVkVMR1oxYm1OMGFXOXVLQ2tnZXdvSkNRbDJZWElnZEdWNGRGUnlZV05yY3lBOUlGdGRPd29KQ1FsMllYSWdWR1Y0ZEZSeVlXTnJTVzVtYjB4cGMzUWdQU0J3YkdGNVpYSXVjM1ZpZEdsMGJHVlVjbUZqYTNNN0Nna0pDWFpoY2lCZlp5QTlJREE3Q2drSkNYZG9hV3hsS0Y5bklEd2dWR1Y0ZEZSeVlXTnJTVzVtYjB4cGMzUXViR1Z1WjNSb0tTQjdDZ2tKQ1FsMllYSWdhVzVtYnlBOUlGUmxlSFJVY21GamEwbHVabTlNYVhOMFcxOW5YVHNLQ1FrSkNTc3JYMmM3Q2drSkNRbDBaWGgwVkhKaFkydHpMbkIxYzJnb2V5QjBhWFJzWlNBNklDSWlJQ3NnVTNSa0xuTjBjbWx1WnlocGJtWnZMbTVoYldVcExDQnBibVp2SURvZ2FXNW1iMzBwT3dvSkNRbDlDZ2tKQ1dsbUtIUmxlSFJVY21GamEzTXViR1Z1WjNSb0lENGdNQ2tnZXdvSkNRa0pZV1JrVFdWdWRTZ2lWR1Y0ZENCMGNtRmphM01pTEhSbGVIUlVjbUZqYTNNc1puVnVZM1JwYjI0b1pTa2dld29KQ1FrSkNYQnNZWGxsY2k1emRXSjBhWFJzWlZSeVlXTnJJRDBnWlM1MFlYSm5aWFF1YzJWc1pXTjBaV1JKYm1SbGVEc0tDUWtKQ1gwc2NHeGhlV1Z5TG5OMVluUnBkR3hsVkhKaFkyc3BPd29KQ1FsOUNna0pmU2s3Q2dsOUlHVnNjMlVnYVdZb2RtbGtaVzh1WTJGdVVHeGhlVlI1Y0dVb0ltRndjR3hwWTJGMGFXOXVMM1p1WkM1aGNIQnNaUzV0Y0dWbmRYSnNJaWt1YkdWdVozUm9JRDRnTUNrZ2V3b0pDU1JuYkc5aVlXd3VZMjl1YzI5c1pTNXNiMmNvSWtkdmFXNW5JR1p2Y2lCdVlYUnBkbVVnU0V4VElIQnNZWGxpWVdOcklHOW1JQ0lnS3lCMWNta3BPd29KQ1hacFpHVnZMbk55WXlBOUlIVnlhVHNLQ1FsMmFXUmxieTVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLQ0pzYjJGa1pXUnRaWFJoWkdGMFlTSXNablZ1WTNScGIyNG9LU0I3Q2drSkNYWnBaR1Z2TG5Cc1lYa29LVHNLQ1FsOUtUc0tDWDBLZlRzS1NHeHpTbk11Wlhod2IzTmxYM0JzWVhsbGNpQTlJR1oxYm1OMGFXOXVLSEFwSUhzS0NYZHBibVJ2ZHk1d2JHRjVaWElnUFNCd093b0pjbVYwZFhKdUlIQTdDbjA3Q25aaGNpQkllRTkyWlhKeWFXUmxjeUE5SUdaMWJtTjBhVzl1S0NrZ2V5QjlPd29rYUhoRGJHRnpjMlZ6V3lKSWVFOTJaWEp5YVdSbGN5SmRJRDBnU0hoUGRtVnljbWxrWlhNN0NraDRUM1psY25KcFpHVnpMbDlmYm1GdFpWOWZJRDBnZEhKMVpUc0tTSGhQZG1WeWNtbGtaWE11YzNSeVJHRjBaU0E5SUdaMWJtTjBhVzl1S0hNcElIc0tDWE4zYVhSamFDaHpMbXhsYm1kMGFDa2dld29KWTJGelpTQTRPZ29KQ1haaGNpQnJJRDBnY3k1emNHeHBkQ2dpT2lJcE93b0pDWFpoY2lCa0lEMGdibVYzSUVSaGRHVW9LVHNLQ1Fsa1d5SnpaWFJVYVcxbElsMG9NQ2s3Q2drSlpGc2ljMlYwVlZSRFNHOTFjbk1pWFNocld6QmRLVHNLQ1Fsa1d5SnpaWFJWVkVOTmFXNTFkR1Z6SWwwb2Exc3hYU2s3Q2drSlpGc2ljMlYwVlZSRFUyVmpiMjVrY3lKZEtHdGJNbDBwT3dvSkNYSmxkSFZ5YmlCa093b0pZMkZ6WlNBeE1Eb0tDUWwyWVhJZ2F5QTlJSE11YzNCc2FYUW9JaTBpS1RzS0NRbHlaWFIxY200Z2JtVjNJRVJoZEdVb2Exc3dYU3hyV3pGZElDMGdNU3hyV3pKZExEQXNNQ3d3S1RzS0NXTmhjMlVnTVRrNkNna0pkbUZ5SUdzZ1BTQnpMbk53YkdsMEtDSWdJaWs3Q2drSmRtRnlJSGtnUFNCcld6QmRMbk53YkdsMEtDSXRJaWs3Q2drSmRtRnlJSFFnUFNCcld6RmRMbk53YkdsMEtDSTZJaWs3Q2drSmNtVjBkWEp1SUc1bGR5QkVZWFJsS0hsYk1GMHNlVnN4WFNBdElERXNlVnN5WFN4MFd6QmRMSFJiTVYwc2RGc3lYU2s3Q2dsa1pXWmhkV3gwT2dvSkNYUm9jbTkzSUdoaGVHVmZSWGhqWlhCMGFXOXVMblJvY205M2JpZ2lTVzUyWVd4cFpDQmtZWFJsSUdadmNtMWhkQ0E2SUNJZ0t5QnpLVHNLQ1gwS2ZUc0tTSGhQZG1WeWNtbGtaWE11WTJOaElEMGdablZ1WTNScGIyNG9jeXhwYm1SbGVDa2dld29KZG1GeUlIZ2dQU0J6TG1Ob1lYSkRiMlJsUVhRb2FXNWtaWGdwT3dvSmFXWW9lQ0FoUFNCNEtTQjdDZ2tKY21WMGRYSnVJSFZ1WkdWbWFXNWxaRHNLQ1gwS0NYSmxkSFZ5YmlCNE93cDlPd3BJZUU5MlpYSnlhV1JsY3k1emRXSnpkSElnUFNCbWRXNWpkR2x2YmloekxIQnZjeXhzWlc0cElIc0tDV2xtS0d4bGJpQTlQU0J1ZFd4c0tTQjdDZ2tKYkdWdUlEMGdjeTVzWlc1bmRHZzdDZ2w5SUdWc2MyVWdhV1lvYkdWdUlEd2dNQ2tnZXdvSkNXbG1LSEJ2Y3lBOVBTQXdLU0I3Q2drSkNXeGxiaUE5SUhNdWJHVnVaM1JvSUNzZ2JHVnVPd29KQ1gwZ1pXeHpaU0I3Q2drSkNYSmxkSFZ5YmlBaUlqc0tDUWw5Q2dsOUNnbHlaWFIxY200Z2N5NXpkV0p6ZEhJb2NHOXpMR3hsYmlrN0NuMDdDa2g0VDNabGNuSnBaR1Z6TG01dmR5QTlJR1oxYm1OMGFXOXVLQ2tnZXdvSmNtVjBkWEp1SUVSaGRHVXVibTkzS0NrN0NuMDdDazFoZEdndVgxOXVZVzFsWDE4Z1BTQjBjblZsT3dwMllYSWdVbVZtYkdWamRDQTlJR1oxYm1OMGFXOXVLQ2tnZXlCOU93b2thSGhEYkdGemMyVnpXeUpTWldac1pXTjBJbDBnUFNCU1pXWnNaV04wT3dwU1pXWnNaV04wTGw5ZmJtRnRaVjlmSUQwZ2RISjFaVHNLVW1WbWJHVmpkQzVtYVdWc1pDQTlJR1oxYm1OMGFXOXVLRzhzWm1sbGJHUXBJSHNLQ1hSeWVTQjdDZ2tKY21WMGRYSnVJRzliWm1sbGJHUmRPd29KZlNCallYUmphQ2dnWDJjZ0tTQjdDZ2tKY21WMGRYSnVJRzUxYkd3N0NnbDlDbjA3Q2xKbFpteGxZM1F1Wm1sbGJHUnpJRDBnWm5WdVkzUnBiMjRvYnlrZ2V3b0pkbUZ5SUdFZ1BTQmJYVHNLQ1dsbUtHOGdJVDBnYm5Wc2JDa2dld29KQ1haaGNpQm9ZWE5QZDI1UWNtOXdaWEowZVNBOUlFOWlhbVZqZEM1d2NtOTBiM1I1Y0dVdWFHRnpUM2R1VUhKdmNHVnlkSGs3Q2drSlptOXlLQ0IyWVhJZ1ppQnBiaUJ2SUNrZ2V3b0pDV2xtS0dZZ0lUMGdJbDlmYVdSZlh5SWdKaVlnWmlBaFBTQWlhSGhmWDJOc2IzTjFjbVZ6WDE4aUlDWW1JR2hoYzA5M2JsQnliM0JsY25SNUxtTmhiR3dvYnl4bUtTa2dld29KQ1FsaExuQjFjMmdvWmlrN0Nna0pmUW9KQ1gwS0NYMEtDWEpsZEhWeWJpQmhPd3A5T3dwU1pXWnNaV04wTG1selJuVnVZM1JwYjI0Z1BTQm1kVzVqZEdsdmJpaG1LU0I3Q2dscFppaDBlWEJsYjJZb1ppa2dQVDBnSW1aMWJtTjBhVzl1SWlrZ2V3b0pDWEpsZEhWeWJpQWhLR1l1WDE5dVlXMWxYMThnZkh3Z1ppNWZYMlZ1WVcxbFgxOHBPd29KZlNCbGJITmxJSHNLQ1FseVpYUjFjbTRnWm1Gc2MyVTdDZ2w5Q24wN0NuWmhjaUJUZEdRZ1BTQm1kVzVqZEdsdmJpZ3BJSHNnZlRzS0pHaDRRMnhoYzNObGMxc2lVM1JrSWwwZ1BTQlRkR1E3Q2xOMFpDNWZYMjVoYldWZlh5QTlJSFJ5ZFdVN0NsTjBaQzV6ZEhKcGJtY2dQU0JtZFc1amRHbHZiaWh6S1NCN0NnbHlaWFIxY200Z2FuTmZRbTl2ZEM1ZlgzTjBjbWx1WjE5eVpXTW9jeXdpSWlrN0NuMDdDblpoY2lCVWVYQmxJRDBnWm5WdVkzUnBiMjRvS1NCN0lIMDdDaVJvZUVOc1lYTnpaWE5iSWxSNWNHVWlYU0E5SUZSNWNHVTdDbFI1Y0dVdVgxOXVZVzFsWDE4Z1BTQjBjblZsT3dwVWVYQmxMbU55WldGMFpVbHVjM1JoYm1ObElEMGdablZ1WTNScGIyNG9ZMndzWVhKbmN5a2dld29KZG1GeUlHTjBiM0lnUFNCR2RXNWpkR2x2Ymk1d2NtOTBiM1I1Y0dVdVltbHVaQzVoY0hCc2VTaGpiQ3hiYm5Wc2JGMHVZMjl1WTJGMEtHRnlaM01wS1RzS0NYSmxkSFZ5YmlCdVpYY2dLR04wYjNJcE93cDlPd3BVZVhCbExtTnlaV0YwWlVWdWRXMGdQU0JtZFc1amRHbHZiaWhsTEdOdmJuTjBjaXh3WVhKaGJYTXBJSHNLQ1haaGNpQm1JRDBnVW1WbWJHVmpkQzVtYVdWc1pDaGxMR052Ym5OMGNpazdDZ2xwWmlobUlEMDlJRzUxYkd3cElIc0tDUWwwYUhKdmR5Qm9ZWGhsWDBWNFkyVndkR2x2Ymk1MGFISnZkMjRvSWs1dklITjFZMmdnWTI5dWMzUnlkV04wYjNJZ0lpQXJJR052Ym5OMGNpazdDZ2w5Q2dscFppaFNaV1pzWldOMExtbHpSblZ1WTNScGIyNG9aaWtwSUhzS0NRbHBaaWh3WVhKaGJYTWdQVDBnYm5Wc2JDa2dld29KQ1FsMGFISnZkeUJvWVhobFgwVjRZMlZ3ZEdsdmJpNTBhSEp2ZDI0b0lrTnZibk4wY25WamRHOXlJQ0lnS3lCamIyNXpkSElnS3lBaUlHNWxaV1FnY0dGeVlXMWxkR1Z5Y3lJcE93b0pDWDBLQ1FseVpYUjFjbTRnWmk1aGNIQnNlU2hsTEhCaGNtRnRjeWs3Q2dsOUNnbHBaaWh3WVhKaGJYTWdJVDBnYm5Wc2JDQW1KaUJ3WVhKaGJYTXViR1Z1WjNSb0lDRTlJREFwSUhzS0NRbDBhSEp2ZHlCb1lYaGxYMFY0WTJWd2RHbHZiaTUwYUhKdmQyNG9Ja052Ym5OMGNuVmpkRzl5SUNJZ0t5QmpiMjV6ZEhJZ0t5QWlJR1J2WlhNZ2JtOTBJRzVsWldRZ2NHRnlZVzFsZEdWeWN5SXBPd29KZlFvSmNtVjBkWEp1SUdZN0NuMDdDblpoY2lCb1lYaGxYMGxOWVhBZ1BTQm1kVzVqZEdsdmJpZ3BJSHNnZlRzS0pHaDRRMnhoYzNObGMxc2lhR0Y0WlM1SlRXRndJbDBnUFNCb1lYaGxYMGxOWVhBN0NtaGhlR1ZmU1UxaGNDNWZYMjVoYldWZlh5QTlJSFJ5ZFdVN0NuWmhjaUJvWVhobFgwVjRZMlZ3ZEdsdmJpQTlJR1oxYm1OMGFXOXVLRzFsYzNOaFoyVXNjSEpsZG1sdmRYTXNibUYwYVhabEtTQjdDZ2xGY25KdmNpNWpZV3hzS0hSb2FYTXNiV1Z6YzJGblpTazdDZ2wwYUdsekxtMWxjM05oWjJVZ1BTQnRaWE56WVdkbE93b0pkR2hwY3k1ZlgzQnlaWFpwYjNWelJYaGpaWEIwYVc5dUlEMGdjSEpsZG1sdmRYTTdDZ2wwYUdsekxsOWZibUYwYVhabFJYaGpaWEIwYVc5dUlEMGdibUYwYVhabElDRTlJRzUxYkd3Z1B5QnVZWFJwZG1VZ09pQjBhR2x6T3dwOU93b2thSGhEYkdGemMyVnpXeUpvWVhobExrVjRZMlZ3ZEdsdmJpSmRJRDBnYUdGNFpWOUZlR05sY0hScGIyNDdDbWhoZUdWZlJYaGpaWEIwYVc5dUxsOWZibUZ0WlY5ZklEMGdkSEoxWlRzS2FHRjRaVjlGZUdObGNIUnBiMjR1ZEdoeWIzZHVJRDBnWm5WdVkzUnBiMjRvZG1Gc2RXVXBJSHNLQ1dsbUtDZ29kbUZzZFdVcElHbHVjM1JoYm1ObGIyWWdhR0Y0WlY5RmVHTmxjSFJwYjI0cEtTQjdDZ2tKY21WMGRYSnVJSFpoYkhWbExtZGxkRjl1WVhScGRtVW9LVHNLQ1gwZ1pXeHpaU0JwWmlnb0tIWmhiSFZsS1NCcGJuTjBZVzVqWlc5bUlFVnljbTl5S1NrZ2V3b0pDWEpsZEhWeWJpQjJZV3gxWlRzS0NYMGdaV3h6WlNCN0Nna0pkbUZ5SUdVZ1BTQnVaWGNnYUdGNFpWOVdZV3gxWlVWNFkyVndkR2x2YmloMllXeDFaU2s3Q2drSmNtVjBkWEp1SUdVN0NnbDlDbjA3Q21oaGVHVmZSWGhqWlhCMGFXOXVMbDlmYzNWd1pYSmZYeUE5SUVWeWNtOXlPd3BvWVhobFgwVjRZMlZ3ZEdsdmJpNXdjbTkwYjNSNWNHVWdQU0FrWlhoMFpXNWtLRVZ5Y205eUxuQnliM1J2ZEhsd1pTeDdDZ2xuWlhSZmJtRjBhWFpsT2lCbWRXNWpkR2x2YmlncElIc0tDUWx5WlhSMWNtNGdkR2hwY3k1ZlgyNWhkR2wyWlVWNFkyVndkR2x2YmpzS0NYMEtmU2s3Q25aaGNpQm9ZWGhsWDFKbGMyOTFjbU5sSUQwZ1puVnVZM1JwYjI0b0tTQjdJSDA3Q2lSb2VFTnNZWE56WlhOYkltaGhlR1V1VW1WemIzVnlZMlVpWFNBOUlHaGhlR1ZmVW1WemIzVnlZMlU3Q21oaGVHVmZVbVZ6YjNWeVkyVXVYMTl1WVcxbFgxOGdQU0IwY25WbE93cG9ZWGhsWDFKbGMyOTFjbU5sTG1kbGRGTjBjbWx1WnlBOUlHWjFibU4wYVc5dUtHNWhiV1VwSUhzS0NYWmhjaUJmWnlBOUlEQTdDZ2wyWVhJZ1gyY3hJRDBnYUdGNFpWOVNaWE52ZFhKalpTNWpiMjUwWlc1ME93b0pkMmhwYkdVb1gyY2dQQ0JmWnpFdWJHVnVaM1JvS1NCN0Nna0pkbUZ5SUhnZ1BTQmZaekZiWDJkZE93b0pDU3NyWDJjN0Nna0phV1lvZUM1dVlXMWxJRDA5SUc1aGJXVXBJSHNLQ1FrSmFXWW9lQzV6ZEhJZ0lUMGdiblZzYkNrZ2V3b0pDUWtKY21WMGRYSnVJSGd1YzNSeU93b0pDUWw5Q2drSkNYWmhjaUJpSUQwZ2FHRjRaVjlqY25sd2RHOWZRbUZ6WlRZMExtUmxZMjlrWlNoNExtUmhkR0VwT3dvSkNRbHlaWFIxY200Z1lpNTBiMU4wY21sdVp5Z3BPd29KQ1gwS0NYMEtDWEpsZEhWeWJpQnVkV3hzT3dwOU93cDJZWElnYUdGNFpWOWZKRlZ1YzJWeWFXRnNhWHBsY2w5RVpXWmhkV3gwVW1WemIyeDJaWElnUFNCbWRXNWpkR2x2YmlncElIc0tmVHNLSkdoNFEyeGhjM05sYzFzaWFHRjRaUzVmVlc1elpYSnBZV3hwZW1WeUxrUmxabUYxYkhSU1pYTnZiSFpsY2lKZElEMGdhR0Y0WlY5ZkpGVnVjMlZ5YVdGc2FYcGxjbDlFWldaaGRXeDBVbVZ6YjJ4MlpYSTdDbWhoZUdWZlh5UlZibk5sY21saGJHbDZaWEpmUkdWbVlYVnNkRkpsYzI5c2RtVnlMbDlmYm1GdFpWOWZJRDBnZEhKMVpUc0thR0Y0WlY5ZkpGVnVjMlZ5YVdGc2FYcGxjbDlFWldaaGRXeDBVbVZ6YjJ4MlpYSXVjSEp2ZEc5MGVYQmxJRDBnZXdvSmNtVnpiMngyWlVOc1lYTnpPaUJtZFc1amRHbHZiaWh1WVcxbEtTQjdDZ2tKY21WMGRYSnVJQ1JvZUVOc1lYTnpaWE5iYm1GdFpWMDdDZ2w5Q2drc2NtVnpiMngyWlVWdWRXMDZJR1oxYm1OMGFXOXVLRzVoYldVcElIc0tDUWx5WlhSMWNtNGdKR2g0Ulc1MWJYTmJibUZ0WlYwN0NnbDlDbjA3Q25aaGNpQm9ZWGhsWDFWdWMyVnlhV0ZzYVhwbGNpQTlJR1oxYm1OMGFXOXVLR0oxWmlrZ2V3b0pkR2hwY3k1aWRXWWdQU0JpZFdZN0NnbDBhR2x6TG14bGJtZDBhQ0E5SUhSb2FYTXVZblZtTG14bGJtZDBhRHNLQ1hSb2FYTXVjRzl6SUQwZ01Ec0tDWFJvYVhNdWMyTmhZMmhsSUQwZ1cxMDdDZ2wwYUdsekxtTmhZMmhsSUQwZ1cxMDdDZ2wyWVhJZ2NpQTlJR2hoZUdWZlZXNXpaWEpwWVd4cGVtVnlMa1JGUmtGVlRGUmZVa1ZUVDB4V1JWSTdDZ2xwWmloeUlEMDlJRzUxYkd3cElIc0tDUWx5SUQwZ2JtVjNJR2hoZUdWZlh5UlZibk5sY21saGJHbDZaWEpmUkdWbVlYVnNkRkpsYzI5c2RtVnlLQ2s3Q2drSmFHRjRaVjlWYm5ObGNtbGhiR2w2WlhJdVJFVkdRVlZNVkY5U1JWTlBURlpGVWlBOUlISTdDZ2w5Q2dsMGFHbHpMbkpsYzI5c2RtVnlJRDBnY2pzS2ZUc0tKR2g0UTJ4aGMzTmxjMXNpYUdGNFpTNVZibk5sY21saGJHbDZaWElpWFNBOUlHaGhlR1ZmVlc1elpYSnBZV3hwZW1WeU93cG9ZWGhsWDFWdWMyVnlhV0ZzYVhwbGNpNWZYMjVoYldWZlh5QTlJSFJ5ZFdVN0NtaGhlR1ZmVlc1elpYSnBZV3hwZW1WeUxtbHVhWFJEYjJSbGN5QTlJR1oxYm1OMGFXOXVLQ2tnZXdvSmRtRnlJR052WkdWeklEMGdXMTA3Q2dsMllYSWdYMmNnUFNBd093b0pkbUZ5SUY5bk1TQTlJR2hoZUdWZlZXNXpaWEpwWVd4cGVtVnlMa0pCVTBVMk5DNXNaVzVuZEdnN0NnbDNhR2xzWlNoZlp5QThJRjluTVNrZ2V3b0pDWFpoY2lCcElEMGdYMmNyS3pzS0NRbGpiMlJsYzF0b1lYaGxYMVZ1YzJWeWFXRnNhWHBsY2k1Q1FWTkZOalF1WTJoaGNrTnZaR1ZCZENocEtWMGdQU0JwT3dvSmZRb0pjbVYwZFhKdUlHTnZaR1Z6T3dwOU93cG9ZWGhsWDFWdWMyVnlhV0ZzYVhwbGNpNXlkVzRnUFNCbWRXNWpkR2x2YmloMktTQjdDZ2x5WlhSMWNtNGdibVYzSUdoaGVHVmZWVzV6WlhKcFlXeHBlbVZ5S0hZcExuVnVjMlZ5YVdGc2FYcGxLQ2s3Q24wN0NtaGhlR1ZmVlc1elpYSnBZV3hwZW1WeUxuQnliM1J2ZEhsd1pTQTlJSHNLQ1hKbFlXUkVhV2RwZEhNNklHWjFibU4wYVc5dUtDa2dld29KQ1haaGNpQnJJRDBnTURzS0NRbDJZWElnY3lBOUlHWmhiSE5sT3dvSkNYWmhjaUJtY0c5eklEMGdkR2hwY3k1d2IzTTdDZ2tKZDJocGJHVW9kSEoxWlNrZ2V3b0pDUWwyWVhJZ1l5QTlJSFJvYVhNdVluVm1MbU5vWVhKRGIyUmxRWFFvZEdocGN5NXdiM01wT3dvSkNRbHBaaWhqSUNFOUlHTXBJSHNLQ1FrSkNXSnlaV0ZyT3dvSkNRbDlDZ2tKQ1dsbUtHTWdQVDBnTkRVcElIc0tDUWtKQ1dsbUtIUm9hWE11Y0c5eklDRTlJR1p3YjNNcElIc0tDUWtKQ1FsaWNtVmhhenNLQ1FrSkNYMEtDUWtKQ1hNZ1BTQjBjblZsT3dvSkNRa0pkR2hwY3k1d2IzTXJLenNLQ1FrSkNXTnZiblJwYm5WbE93b0pDUWw5Q2drSkNXbG1LR01nUENBME9DQjhmQ0JqSUQ0Z05UY3BJSHNLQ1FrSkNXSnlaV0ZyT3dvSkNRbDlDZ2tKQ1dzZ1BTQnJJQ29nTVRBZ0t5QW9ZeUF0SURRNEtUc0tDUWtKZEdocGN5NXdiM01yS3pzS0NRbDlDZ2tKYVdZb2N5a2dld29KQ1FscklDbzlJQzB4T3dvSkNYMEtDUWx5WlhSMWNtNGdhenNLQ1gwS0NTeHlaV0ZrUm14dllYUTZJR1oxYm1OMGFXOXVLQ2tnZXdvSkNYWmhjaUJ3TVNBOUlIUm9hWE11Y0c5ek93b0pDWGRvYVd4bEtIUnlkV1VwSUhzS0NRa0pkbUZ5SUdNZ1BTQjBhR2x6TG1KMVppNWphR0Z5UTI5a1pVRjBLSFJvYVhNdWNHOXpLVHNLQ1FrSmFXWW9ZeUFoUFNCaktTQjdDZ2tKQ1FsaWNtVmhhenNLQ1FrSmZRb0pDUWxwWmloaklENDlJRFF6SUNZbUlHTWdQQ0ExT0NCOGZDQmpJRDA5SURFd01TQjhmQ0JqSUQwOUlEWTVLU0I3Q2drSkNRbDBhR2x6TG5CdmN5c3JPd29KQ1FsOUlHVnNjMlVnZXdvSkNRa0pZbkpsWVdzN0Nna0pDWDBLQ1FsOUNna0pjbVYwZFhKdUlIQmhjbk5sUm14dllYUW9TSGhQZG1WeWNtbGtaWE11YzNWaWMzUnlLSFJvYVhNdVluVm1MSEF4TEhSb2FYTXVjRzl6SUMwZ2NERXBLVHNLQ1gwS0NTeDFibk5sY21saGJHbDZaVTlpYW1WamREb2dablZ1WTNScGIyNG9ieWtnZXdvSkNYZG9hV3hsS0hSeWRXVXBJSHNLQ1FrSmFXWW9kR2hwY3k1d2IzTWdQajBnZEdocGN5NXNaVzVuZEdncElIc0tDUWtKQ1hSb2NtOTNJR2hoZUdWZlJYaGpaWEIwYVc5dUxuUm9jbTkzYmlnaVNXNTJZV3hwWkNCdlltcGxZM1FpS1RzS0NRa0pmUW9KQ1FscFppaDBhR2x6TG1KMVppNWphR0Z5UTI5a1pVRjBLSFJvYVhNdWNHOXpLU0E5UFNBeE1ETXBJSHNLQ1FrSkNXSnlaV0ZyT3dvSkNRbDlDZ2tKQ1haaGNpQnJJRDBnZEdocGN5NTFibk5sY21saGJHbDZaU2dwT3dvSkNRbHBaaWgwZVhCbGIyWW9heWtnSVQwZ0luTjBjbWx1WnlJcElIc0tDUWtKQ1hSb2NtOTNJR2hoZUdWZlJYaGpaWEIwYVc5dUxuUm9jbTkzYmlnaVNXNTJZV3hwWkNCdlltcGxZM1FnYTJWNUlpazdDZ2tKQ1gwS0NRa0pkbUZ5SUhZZ1BTQjBhR2x6TG5WdWMyVnlhV0ZzYVhwbEtDazdDZ2tKQ1c5YmExMGdQU0IyT3dvSkNYMEtDUWwwYUdsekxuQnZjeXNyT3dvSmZRb0pMSFZ1YzJWeWFXRnNhWHBsUlc1MWJUb2dablZ1WTNScGIyNG9aV1JsWTJ3c2RHRm5LU0I3Q2drSmFXWW9kR2hwY3k1aWRXWXVZMmhoY2tOdlpHVkJkQ2gwYUdsekxuQnZjeXNyS1NBaFBTQTFPQ2tnZXdvSkNRbDBhSEp2ZHlCb1lYaGxYMFY0WTJWd2RHbHZiaTUwYUhKdmQyNG9Ja2x1ZG1Gc2FXUWdaVzUxYlNCbWIzSnRZWFFpS1RzS0NRbDlDZ2tKZG1GeUlHNWhjbWR6SUQwZ2RHaHBjeTV5WldGa1JHbG5hWFJ6S0NrN0Nna0phV1lvYm1GeVozTWdQVDBnTUNrZ2V3b0pDUWx5WlhSMWNtNGdWSGx3WlM1amNtVmhkR1ZGYm5WdEtHVmtaV05zTEhSaFp5azdDZ2tKZlFvSkNYWmhjaUJoY21keklEMGdXMTA3Q2drSmQyaHBiR1VvYm1GeVozTXRMU0ErSURBcElHRnlaM011Y0hWemFDaDBhR2x6TG5WdWMyVnlhV0ZzYVhwbEtDa3BPd29KQ1hKbGRIVnliaUJVZVhCbExtTnlaV0YwWlVWdWRXMG9aV1JsWTJ3c2RHRm5MR0Z5WjNNcE93b0pmUW9KTEhWdWMyVnlhV0ZzYVhwbE9pQm1kVzVqZEdsdmJpZ3BJSHNLQ1FsemQybDBZMmdvZEdocGN5NWlkV1l1WTJoaGNrTnZaR1ZCZENoMGFHbHpMbkJ2Y3lzcktTa2dld29KQ1dOaGMyVWdOalU2Q2drSkNYWmhjaUJ1WVcxbElEMGdkR2hwY3k1MWJuTmxjbWxoYkdsNlpTZ3BPd29KQ1FsMllYSWdZMndnUFNCMGFHbHpMbkpsYzI5c2RtVnlMbkpsYzI5c2RtVkRiR0Z6Y3lodVlXMWxLVHNLQ1FrSmFXWW9ZMndnUFQwZ2JuVnNiQ2tnZXdvSkNRa0pkR2h5YjNjZ2FHRjRaVjlGZUdObGNIUnBiMjR1ZEdoeWIzZHVLQ0pEYkdGemN5QnViM1FnWm05MWJtUWdJaUFySUc1aGJXVXBPd29KQ1FsOUNna0pDWEpsZEhWeWJpQmpiRHNLQ1FsallYTmxJRFkyT2dvSkNRbDJZWElnYm1GdFpTQTlJSFJvYVhNdWRXNXpaWEpwWVd4cGVtVW9LVHNLQ1FrSmRtRnlJR1VnUFNCMGFHbHpMbkpsYzI5c2RtVnlMbkpsYzI5c2RtVkZiblZ0S0c1aGJXVXBPd29KQ1FscFppaGxJRDA5SUc1MWJHd3BJSHNLQ1FrSkNYUm9jbTkzSUdoaGVHVmZSWGhqWlhCMGFXOXVMblJvY205M2JpZ2lSVzUxYlNCdWIzUWdabTkxYm1RZ0lpQXJJRzVoYldVcE93b0pDUWw5Q2drSkNYSmxkSFZ5YmlCbE93b0pDV05oYzJVZ05qYzZDZ2tKQ1haaGNpQnVZVzFsSUQwZ2RHaHBjeTUxYm5ObGNtbGhiR2w2WlNncE93b0pDUWwyWVhJZ1kyd2dQU0IwYUdsekxuSmxjMjlzZG1WeUxuSmxjMjlzZG1WRGJHRnpjeWh1WVcxbEtUc0tDUWtKYVdZb1kyd2dQVDBnYm5Wc2JDa2dld29KQ1FrSmRHaHliM2NnYUdGNFpWOUZlR05sY0hScGIyNHVkR2h5YjNkdUtDSkRiR0Z6Y3lCdWIzUWdabTkxYm1RZ0lpQXJJRzVoYldVcE93b0pDUWw5Q2drSkNYWmhjaUJ2SUQwZ1QySnFaV04wTG1OeVpXRjBaU2hqYkM1d2NtOTBiM1I1Y0dVcE93b0pDUWwwYUdsekxtTmhZMmhsTG5CMWMyZ29ieWs3Q2drSkNXOHVhSGhWYm5ObGNtbGhiR2w2WlNoMGFHbHpLVHNLQ1FrSmFXWW9kR2hwY3k1aWRXWXVZMmhoY2tOdlpHVkJkQ2gwYUdsekxuQnZjeXNyS1NBaFBTQXhNRE1wSUhzS0NRa0pDWFJvY205M0lHaGhlR1ZmUlhoalpYQjBhVzl1TG5Sb2NtOTNiaWdpU1c1MllXeHBaQ0JqZFhOMGIyMGdaR0YwWVNJcE93b0pDUWw5Q2drSkNYSmxkSFZ5YmlCdk93b0pDV05oYzJVZ056YzZDZ2tKQ1haaGNpQm9JRDBnYm1WM0lHaGhlR1ZmWkhOZlQySnFaV04wVFdGd0tDazdDZ2tKQ1hSb2FYTXVZMkZqYUdVdWNIVnphQ2hvS1RzS0NRa0pkbUZ5SUdKMVppQTlJSFJvYVhNdVluVm1Pd29KQ1FsM2FHbHNaU2gwYUdsekxtSjFaaTVqYUdGeVEyOWtaVUYwS0hSb2FYTXVjRzl6S1NBaFBTQXhNRFFwSUhzS0NRa0pDWFpoY2lCeklEMGdkR2hwY3k1MWJuTmxjbWxoYkdsNlpTZ3BPd29KQ1FrSmFDNXpaWFFvY3l4MGFHbHpMblZ1YzJWeWFXRnNhWHBsS0NrcE93b0pDUWw5Q2drSkNYUm9hWE11Y0c5ekt5czdDZ2tKQ1hKbGRIVnliaUJvT3dvSkNXTmhjMlVnT0RJNkNna0pDWFpoY2lCdUlEMGdkR2hwY3k1eVpXRmtSR2xuYVhSektDazdDZ2tKQ1dsbUtHNGdQQ0F3SUh4OElHNGdQajBnZEdocGN5NXpZMkZqYUdVdWJHVnVaM1JvS1NCN0Nna0pDUWwwYUhKdmR5Qm9ZWGhsWDBWNFkyVndkR2x2Ymk1MGFISnZkMjRvSWtsdWRtRnNhV1FnYzNSeWFXNW5JSEpsWm1WeVpXNWpaU0lwT3dvSkNRbDlDZ2tKQ1hKbGRIVnliaUIwYUdsekxuTmpZV05vWlZ0dVhUc0tDUWxqWVhObElEazNPZ29KQ1FsMllYSWdZblZtSUQwZ2RHaHBjeTVpZFdZN0Nna0pDWFpoY2lCaElEMGdXMTA3Q2drSkNYUm9hWE11WTJGamFHVXVjSFZ6YUNoaEtUc0tDUWtKZDJocGJHVW9kSEoxWlNrZ2V3b0pDUWtKZG1GeUlHTWdQU0IwYUdsekxtSjFaaTVqYUdGeVEyOWtaVUYwS0hSb2FYTXVjRzl6S1RzS0NRa0pDV2xtS0dNZ1BUMGdNVEEwS1NCN0Nna0pDUWtKZEdocGN5NXdiM01yS3pzS0NRa0pDUWxpY21WaGF6c0tDUWtKQ1gwS0NRa0pDV2xtS0dNZ1BUMGdNVEUzS1NCN0Nna0pDUWtKZEdocGN5NXdiM01yS3pzS0NRa0pDUWwyWVhJZ2JpQTlJSFJvYVhNdWNtVmhaRVJwWjJsMGN5Z3BPd29KQ1FrSkNXRmJZUzVzWlc1bmRHZ2dLeUJ1SUMwZ01WMGdQU0J1ZFd4c093b0pDUWtKZlNCbGJITmxJSHNLQ1FrSkNRbGhMbkIxYzJnb2RHaHBjeTUxYm5ObGNtbGhiR2w2WlNncEtUc0tDUWtKQ1gwS0NRa0pmUW9KQ1FseVpYUjFjbTRnWVRzS0NRbGpZWE5sSURrNE9nb0pDUWwyWVhJZ2FDQTlJRzVsZHlCb1lYaGxYMlJ6WDFOMGNtbHVaMDFoY0NncE93b0pDUWwwYUdsekxtTmhZMmhsTG5CMWMyZ29hQ2s3Q2drSkNYWmhjaUJpZFdZZ1BTQjBhR2x6TG1KMVpqc0tDUWtKZDJocGJHVW9kR2hwY3k1aWRXWXVZMmhoY2tOdlpHVkJkQ2gwYUdsekxuQnZjeWtnSVQwZ01UQTBLU0I3Q2drSkNRbDJZWElnY3lBOUlIUm9hWE11ZFc1elpYSnBZV3hwZW1Vb0tUc0tDUWtKQ1haaGNpQjJZV3gxWlNBOUlIUm9hWE11ZFc1elpYSnBZV3hwZW1Vb0tUc0tDUWtKQ1dndWFGdHpYU0E5SUhaaGJIVmxPd29KQ1FsOUNna0pDWFJvYVhNdWNHOXpLeXM3Q2drSkNYSmxkSFZ5YmlCb093b0pDV05oYzJVZ09UazZDZ2tKQ1haaGNpQnVZVzFsSUQwZ2RHaHBjeTUxYm5ObGNtbGhiR2w2WlNncE93b0pDUWwyWVhJZ1kyd2dQU0IwYUdsekxuSmxjMjlzZG1WeUxuSmxjMjlzZG1WRGJHRnpjeWh1WVcxbEtUc0tDUWtKYVdZb1kyd2dQVDBnYm5Wc2JDa2dld29KQ1FrSmRHaHliM2NnYUdGNFpWOUZlR05sY0hScGIyNHVkR2h5YjNkdUtDSkRiR0Z6Y3lCdWIzUWdabTkxYm1RZ0lpQXJJRzVoYldVcE93b0pDUWw5Q2drSkNYWmhjaUJ2SUQwZ1QySnFaV04wTG1OeVpXRjBaU2hqYkM1d2NtOTBiM1I1Y0dVcE93b0pDUWwwYUdsekxtTmhZMmhsTG5CMWMyZ29ieWs3Q2drSkNYUm9hWE11ZFc1elpYSnBZV3hwZW1WUFltcGxZM1FvYnlrN0Nna0pDWEpsZEhWeWJpQnZPd29KQ1dOaGMyVWdNVEF3T2dvSkNRbHlaWFIxY200Z2RHaHBjeTV5WldGa1JteHZZWFFvS1RzS0NRbGpZWE5sSURFd01qb0tDUWtKY21WMGRYSnVJR1poYkhObE93b0pDV05oYzJVZ01UQTFPZ29KQ1FseVpYUjFjbTRnZEdocGN5NXlaV0ZrUkdsbmFYUnpLQ2s3Q2drSlkyRnpaU0F4TURZNkNna0pDWFpoY2lCdVlXMWxJRDBnZEdocGN5NTFibk5sY21saGJHbDZaU2dwT3dvSkNRbDJZWElnWldSbFkyd2dQU0IwYUdsekxuSmxjMjlzZG1WeUxuSmxjMjlzZG1WRmJuVnRLRzVoYldVcE93b0pDUWxwWmlobFpHVmpiQ0E5UFNCdWRXeHNLU0I3Q2drSkNRbDBhSEp2ZHlCb1lYaGxYMFY0WTJWd2RHbHZiaTUwYUhKdmQyNG9Ja1Z1ZFcwZ2JtOTBJR1p2ZFc1a0lDSWdLeUJ1WVcxbEtUc0tDUWtKZlFvSkNRbDBhR2x6TG5CdmN5c3JPd29KQ1FsMllYSWdhVzVrWlhnZ1BTQjBhR2x6TG5KbFlXUkVhV2RwZEhNb0tUc0tDUWtKZG1GeUlGOTBhR2x6SUQwZ1pXUmxZMnd1WDE5amIyNXpkSEoxWTNSelgxODdDZ2tKQ1haaGNpQnlaWE4xYkhRZ1BTQnVaWGNnUVhKeVlYa29YM1JvYVhNdWJHVnVaM1JvS1RzS0NRa0pkbUZ5SUY5bklEMGdNRHNLQ1FrSmRtRnlJRjluTVNBOUlGOTBhR2x6TG14bGJtZDBhRHNLQ1FrSmQyaHBiR1VvWDJjZ1BDQmZaekVwSUhzS0NRa0pDWFpoY2lCcElEMGdYMmNyS3pzS0NRa0pDWEpsYzNWc2RGdHBYU0E5SUY5MGFHbHpXMmxkTGw5b2VGOXVZVzFsT3dvSkNRbDlDZ2tKQ1haaGNpQjBZV2NnUFNCeVpYTjFiSFJiYVc1a1pYaGRPd29KQ1FscFppaDBZV2NnUFQwZ2JuVnNiQ2tnZXdvSkNRa0pkR2h5YjNjZ2FHRjRaVjlGZUdObGNIUnBiMjR1ZEdoeWIzZHVLQ0pWYm10dWIzZHVJR1Z1ZFcwZ2FXNWtaWGdnSWlBcklHNWhiV1VnS3lBaVFDSWdLeUJwYm1SbGVDazdDZ2tKQ1gwS0NRa0pkbUZ5SUdVZ1BTQjBhR2x6TG5WdWMyVnlhV0ZzYVhwbFJXNTFiU2hsWkdWamJDeDBZV2NwT3dvSkNRbDBhR2x6TG1OaFkyaGxMbkIxYzJnb1pTazdDZ2tKQ1hKbGRIVnliaUJsT3dvSkNXTmhjMlVnTVRBM09nb0pDUWx5WlhSMWNtNGdUbUZPT3dvSkNXTmhjMlVnTVRBNE9nb0pDUWwyWVhJZ2JDQTlJRzVsZHlCb1lYaGxYMlJ6WDB4cGMzUW9LVHNLQ1FrSmRHaHBjeTVqWVdOb1pTNXdkWE5vS0d3cE93b0pDUWwyWVhJZ1luVm1JRDBnZEdocGN5NWlkV1k3Q2drSkNYZG9hV3hsS0hSb2FYTXVZblZtTG1Ob1lYSkRiMlJsUVhRb2RHaHBjeTV3YjNNcElDRTlJREV3TkNrZ2JDNWhaR1FvZEdocGN5NTFibk5sY21saGJHbDZaU2dwS1RzS0NRa0pkR2hwY3k1d2IzTXJLenNLQ1FrSmNtVjBkWEp1SUd3N0Nna0pZMkZ6WlNBeE1EazZDZ2tKQ1hKbGRIVnliaUF0U1c1bWFXNXBkSGs3Q2drSlkyRnpaU0F4TVRBNkNna0pDWEpsZEhWeWJpQnVkV3hzT3dvSkNXTmhjMlVnTVRFeE9nb0pDUWwyWVhJZ2J5QTlJSHNnZlRzS0NRa0pkR2hwY3k1allXTm9aUzV3ZFhOb0tHOHBPd29KQ1FsMGFHbHpMblZ1YzJWeWFXRnNhWHBsVDJKcVpXTjBLRzhwT3dvSkNRbHlaWFIxY200Z2J6c0tDUWxqWVhObElERXhNam9LQ1FrSmNtVjBkWEp1SUVsdVptbHVhWFI1T3dvSkNXTmhjMlVnTVRFek9nb0pDUWwyWVhJZ2FDQTlJRzVsZHlCb1lYaGxYMlJ6WDBsdWRFMWhjQ2dwT3dvSkNRbDBhR2x6TG1OaFkyaGxMbkIxYzJnb2FDazdDZ2tKQ1haaGNpQmlkV1lnUFNCMGFHbHpMbUoxWmpzS0NRa0pkbUZ5SUdNZ1BTQjBhR2x6TG1KMVppNWphR0Z5UTI5a1pVRjBLSFJvYVhNdWNHOXpLeXNwT3dvSkNRbDNhR2xzWlNoaklEMDlJRFU0S1NCN0Nna0pDUWwyWVhJZ2FTQTlJSFJvYVhNdWNtVmhaRVJwWjJsMGN5Z3BPd29KQ1FrSmRtRnlJSFpoYkhWbElEMGdkR2hwY3k1MWJuTmxjbWxoYkdsNlpTZ3BPd29KQ1FrSmFDNW9XMmxkSUQwZ2RtRnNkV1U3Q2drSkNRbGpJRDBnZEdocGN5NWlkV1l1WTJoaGNrTnZaR1ZCZENoMGFHbHpMbkJ2Y3lzcktUc0tDUWtKZlFvSkNRbHBaaWhqSUNFOUlERXdOQ2tnZXdvSkNRa0pkR2h5YjNjZ2FHRjRaVjlGZUdObGNIUnBiMjR1ZEdoeWIzZHVLQ0pKYm5aaGJHbGtJRWx1ZEUxaGNDQm1iM0p0WVhRaUtUc0tDUWtKZlFvSkNRbHlaWFIxY200Z2FEc0tDUWxqWVhObElERXhORG9LQ1FrSmRtRnlJRzRnUFNCMGFHbHpMbkpsWVdSRWFXZHBkSE1vS1RzS0NRa0phV1lvYmlBOElEQWdmSHdnYmlBK1BTQjBhR2x6TG1OaFkyaGxMbXhsYm1kMGFDa2dld29KQ1FrSmRHaHliM2NnYUdGNFpWOUZlR05sY0hScGIyNHVkR2h5YjNkdUtDSkpiblpoYkdsa0lISmxabVZ5Wlc1alpTSXBPd29KQ1FsOUNna0pDWEpsZEhWeWJpQjBhR2x6TG1OaFkyaGxXMjVkT3dvSkNXTmhjMlVnTVRFMU9nb0pDUWwyWVhJZ2JHVnVJRDBnZEdocGN5NXlaV0ZrUkdsbmFYUnpLQ2s3Q2drSkNYWmhjaUJpZFdZZ1BTQjBhR2x6TG1KMVpqc0tDUWtKYVdZb2RHaHBjeTVpZFdZdVkyaGhja052WkdWQmRDaDBhR2x6TG5CdmN5c3JLU0FoUFNBMU9DQjhmQ0IwYUdsekxteGxibWQwYUNBdElIUm9hWE11Y0c5eklEd2diR1Z1S1NCN0Nna0pDUWwwYUhKdmR5Qm9ZWGhsWDBWNFkyVndkR2x2Ymk1MGFISnZkMjRvSWtsdWRtRnNhV1FnWW5sMFpYTWdiR1Z1WjNSb0lpazdDZ2tKQ1gwS0NRa0pkbUZ5SUdOdlpHVnpJRDBnYUdGNFpWOVZibk5sY21saGJHbDZaWEl1UTA5RVJWTTdDZ2tKQ1dsbUtHTnZaR1Z6SUQwOUlHNTFiR3dwSUhzS0NRa0pDV052WkdWeklEMGdhR0Y0WlY5VmJuTmxjbWxoYkdsNlpYSXVhVzVwZEVOdlpHVnpLQ2s3Q2drSkNRbG9ZWGhsWDFWdWMyVnlhV0ZzYVhwbGNpNURUMFJGVXlBOUlHTnZaR1Z6T3dvSkNRbDlDZ2tKQ1haaGNpQnBJRDBnZEdocGN5NXdiM003Q2drSkNYWmhjaUJ5WlhOMElEMGdiR1Z1SUNZZ016c0tDUWtKZG1GeUlITnBlbVVnUFNBb2JHVnVJRDQrSURJcElDb2dNeUFySUNoeVpYTjBJRDQ5SURJZ1B5QnlaWE4wSUMwZ01TQTZJREFwT3dvSkNRbDJZWElnYldGNElEMGdhU0FySUNoc1pXNGdMU0J5WlhOMEtUc0tDUWtKZG1GeUlHSjVkR1Z6SUQwZ2JtVjNJR2hoZUdWZmFXOWZRbmwwWlhNb2JtVjNJRUZ5Y21GNVFuVm1abVZ5S0hOcGVtVXBLVHNLQ1FrSmRtRnlJR0p3YjNNZ1BTQXdPd29KQ1FsM2FHbHNaU2hwSUR3Z2JXRjRLU0I3Q2drSkNRbDJZWElnWXpFZ1BTQmpiMlJsYzF0aWRXWXVZMmhoY2tOdlpHVkJkQ2hwS3lzcFhUc0tDUWtKQ1haaGNpQmpNaUE5SUdOdlpHVnpXMkoxWmk1amFHRnlRMjlrWlVGMEtHa3JLeWxkT3dvSkNRa0pZbmwwWlhNdVlsdGljRzl6S3l0ZElEMGdZekVnUER3Z01pQjhJR015SUQ0K0lEUTdDZ2tKQ1FsMllYSWdZek1nUFNCamIyUmxjMXRpZFdZdVkyaGhja052WkdWQmRDaHBLeXNwWFRzS0NRa0pDV0o1ZEdWekxtSmJZbkJ2Y3lzclhTQTlJR015SUR3OElEUWdmQ0JqTXlBK1BpQXlPd29KQ1FrSmRtRnlJR00wSUQwZ1kyOWtaWE5iWW5WbUxtTm9ZWEpEYjJSbFFYUW9hU3NyS1YwN0Nna0pDUWxpZVhSbGN5NWlXMkp3YjNNcksxMGdQU0JqTXlBOFBDQTJJSHdnWXpRN0Nna0pDWDBLQ1FrSmFXWW9jbVZ6ZENBK1BTQXlLU0I3Q2drSkNRbDJZWElnWXpFZ1BTQmpiMlJsYzF0aWRXWXVZMmhoY2tOdlpHVkJkQ2hwS3lzcFhUc0tDUWtKQ1haaGNpQmpNaUE5SUdOdlpHVnpXMkoxWmk1amFHRnlRMjlrWlVGMEtHa3JLeWxkT3dvSkNRa0pZbmwwWlhNdVlsdGljRzl6S3l0ZElEMGdZekVnUER3Z01pQjhJR015SUQ0K0lEUTdDZ2tKQ1FscFppaHlaWE4wSUQwOUlETXBJSHNLQ1FrSkNRbDJZWElnWXpNZ1BTQmpiMlJsYzF0aWRXWXVZMmhoY2tOdlpHVkJkQ2hwS3lzcFhUc0tDUWtKQ1FsaWVYUmxjeTVpVzJKd2IzTXJLMTBnUFNCak1pQThQQ0EwSUh3Z1l6TWdQajRnTWpzS0NRa0pDWDBLQ1FrSmZRb0pDUWwwYUdsekxuQnZjeUFyUFNCc1pXNDdDZ2tKQ1hSb2FYTXVZMkZqYUdVdWNIVnphQ2hpZVhSbGN5azdDZ2tKQ1hKbGRIVnliaUJpZVhSbGN6c0tDUWxqWVhObElERXhOam9LQ1FrSmNtVjBkWEp1SUhSeWRXVTdDZ2tKWTJGelpTQXhNVGc2Q2drSkNYWmhjaUJrT3dvSkNRbHBaaWgwYUdsekxtSjFaaTVqYUdGeVEyOWtaVUYwS0hSb2FYTXVjRzl6S1NBK1BTQTBPQ0FtSmlCMGFHbHpMbUoxWmk1amFHRnlRMjlrWlVGMEtIUm9hWE11Y0c5ektTQThQU0ExTnlBbUppQjBhR2x6TG1KMVppNWphR0Z5UTI5a1pVRjBLSFJvYVhNdWNHOXpJQ3NnTVNrZ1BqMGdORGdnSmlZZ2RHaHBjeTVpZFdZdVkyaGhja052WkdWQmRDaDBhR2x6TG5CdmN5QXJJREVwSUR3OUlEVTNJQ1ltSUhSb2FYTXVZblZtTG1Ob1lYSkRiMlJsUVhRb2RHaHBjeTV3YjNNZ0t5QXlLU0ErUFNBME9DQW1KaUIwYUdsekxtSjFaaTVqYUdGeVEyOWtaVUYwS0hSb2FYTXVjRzl6SUNzZ01pa2dQRDBnTlRjZ0ppWWdkR2hwY3k1aWRXWXVZMmhoY2tOdlpHVkJkQ2gwYUdsekxuQnZjeUFySURNcElENDlJRFE0SUNZbUlIUm9hWE11WW5WbUxtTm9ZWEpEYjJSbFFYUW9kR2hwY3k1d2IzTWdLeUF6S1NBOFBTQTFOeUFtSmlCMGFHbHpMbUoxWmk1amFHRnlRMjlrWlVGMEtIUm9hWE11Y0c5eklDc2dOQ2tnUFQwZ05EVXBJSHNLQ1FrSkNXUWdQU0JJZUU5MlpYSnlhV1JsY3k1emRISkVZWFJsS0VoNFQzWmxjbkpwWkdWekxuTjFZbk4wY2loMGFHbHpMbUoxWml4MGFHbHpMbkJ2Y3l3eE9Ta3BPd29KQ1FrSmRHaHBjeTV3YjNNZ0t6MGdNVGs3Q2drSkNYMGdaV3h6WlNCN0Nna0pDUWxrSUQwZ2JtVjNJRVJoZEdVb2RHaHBjeTV5WldGa1JteHZZWFFvS1NrN0Nna0pDWDBLQ1FrSmRHaHBjeTVqWVdOb1pTNXdkWE5vS0dRcE93b0pDUWx5WlhSMWNtNGdaRHNLQ1FsallYTmxJREV4T1RvS0NRa0pkbUZ5SUc1aGJXVWdQU0IwYUdsekxuVnVjMlZ5YVdGc2FYcGxLQ2s3Q2drSkNYWmhjaUJsWkdWamJDQTlJSFJvYVhNdWNtVnpiMngyWlhJdWNtVnpiMngyWlVWdWRXMG9ibUZ0WlNrN0Nna0pDV2xtS0dWa1pXTnNJRDA5SUc1MWJHd3BJSHNLQ1FrSkNYUm9jbTkzSUdoaGVHVmZSWGhqWlhCMGFXOXVMblJvY205M2JpZ2lSVzUxYlNCdWIzUWdabTkxYm1RZ0lpQXJJRzVoYldVcE93b0pDUWw5Q2drSkNYWmhjaUJsSUQwZ2RHaHBjeTUxYm5ObGNtbGhiR2w2WlVWdWRXMG9aV1JsWTJ3c2RHaHBjeTUxYm5ObGNtbGhiR2w2WlNncEtUc0tDUWtKZEdocGN5NWpZV05vWlM1d2RYTm9LR1VwT3dvSkNRbHlaWFIxY200Z1pUc0tDUWxqWVhObElERXlNRG9LQ1FrSmRHaHliM2NnYUdGNFpWOUZlR05sY0hScGIyNHVkR2h5YjNkdUtIUm9hWE11ZFc1elpYSnBZV3hwZW1Vb0tTazdDZ2tKWTJGelpTQXhNakU2Q2drSkNYWmhjaUJzWlc0Z1BTQjBhR2x6TG5KbFlXUkVhV2RwZEhNb0tUc0tDUWtKYVdZb2RHaHBjeTVpZFdZdVkyaGhja052WkdWQmRDaDBhR2x6TG5CdmN5c3JLU0FoUFNBMU9DQjhmQ0IwYUdsekxteGxibWQwYUNBdElIUm9hWE11Y0c5eklEd2diR1Z1S1NCN0Nna0pDUWwwYUhKdmR5Qm9ZWGhsWDBWNFkyVndkR2x2Ymk1MGFISnZkMjRvSWtsdWRtRnNhV1FnYzNSeWFXNW5JR3hsYm1kMGFDSXBPd29KQ1FsOUNna0pDWFpoY2lCeklEMGdTSGhQZG1WeWNtbGtaWE11YzNWaWMzUnlLSFJvYVhNdVluVm1MSFJvYVhNdWNHOXpMR3hsYmlrN0Nna0pDWFJvYVhNdWNHOXpJQ3M5SUd4bGJqc0tDUWtKY3lBOUlHUmxZMjlrWlZWU1NVTnZiWEJ2Ym1WdWRDaHpMbk53YkdsMEtDSXJJaWt1YW05cGJpZ2lJQ0lwS1RzS0NRa0pkR2hwY3k1elkyRmphR1V1Y0hWemFDaHpLVHNLQ1FrSmNtVjBkWEp1SUhNN0Nna0pZMkZ6WlNBeE1qSTZDZ2tKQ1hKbGRIVnliaUF3T3dvSkNXUmxabUYxYkhRNkNna0pmUW9KQ1hSb2FYTXVjRzl6TFMwN0Nna0pkR2h5YjNjZ2FHRjRaVjlGZUdObGNIUnBiMjR1ZEdoeWIzZHVLQ0pKYm5aaGJHbGtJR05vWVhJZ0lpQXJJSFJvYVhNdVluVm1MbU5vWVhKQmRDaDBhR2x6TG5CdmN5a2dLeUFpSUdGMElIQnZjMmwwYVc5dUlDSWdLeUIwYUdsekxuQnZjeWs3Q2dsOUNuMDdDblpoY2lCb1lYaGxYMVpoYkhWbFJYaGpaWEIwYVc5dUlEMGdablZ1WTNScGIyNG9kbUZzZFdVc2NISmxkbWx2ZFhNc2JtRjBhWFpsS1NCN0NnbG9ZWGhsWDBWNFkyVndkR2x2Ymk1allXeHNLSFJvYVhNc1UzUnlhVzVuS0haaGJIVmxLU3h3Y21WMmFXOTFjeXh1WVhScGRtVXBPd29KZEdocGN5NTJZV3gxWlNBOUlIWmhiSFZsT3dwOU93b2thSGhEYkdGemMyVnpXeUpvWVhobExsWmhiSFZsUlhoalpYQjBhVzl1SWwwZ1BTQm9ZWGhsWDFaaGJIVmxSWGhqWlhCMGFXOXVPd3BvWVhobFgxWmhiSFZsUlhoalpYQjBhVzl1TGw5ZmJtRnRaVjlmSUQwZ2RISjFaVHNLYUdGNFpWOVdZV3gxWlVWNFkyVndkR2x2Ymk1ZlgzTjFjR1Z5WDE4Z1BTQm9ZWGhsWDBWNFkyVndkR2x2YmpzS2FHRjRaVjlXWVd4MVpVVjRZMlZ3ZEdsdmJpNXdjbTkwYjNSNWNHVWdQU0FrWlhoMFpXNWtLR2hoZUdWZlJYaGpaWEIwYVc5dUxuQnliM1J2ZEhsd1pTeDdDbjBwT3dwMllYSWdhR0Y0WlY5cGIxOUNlWFJsY3lBOUlHWjFibU4wYVc5dUtHUmhkR0VwSUhzS0NYUm9hWE11YkdWdVozUm9JRDBnWkdGMFlTNWllWFJsVEdWdVozUm9Pd29KZEdocGN5NWlJRDBnYm1WM0lGVnBiblE0UVhKeVlYa29aR0YwWVNrN0NnbDBhR2x6TG1JdVluVm1abVZ5Vm1Gc2RXVWdQU0JrWVhSaE93b0paR0YwWVM1b2VFSjVkR1Z6SUQwZ2RHaHBjenNLQ1dSaGRHRXVZbmwwWlhNZ1BTQjBhR2x6TG1JN0NuMDdDaVJvZUVOc1lYTnpaWE5iSW1oaGVHVXVhVzh1UW5sMFpYTWlYU0E5SUdoaGVHVmZhVzlmUW5sMFpYTTdDbWhoZUdWZmFXOWZRbmwwWlhNdVgxOXVZVzFsWDE4Z1BTQjBjblZsT3dwb1lYaGxYMmx2WDBKNWRHVnpMbTltVTNSeWFXNW5JRDBnWm5WdVkzUnBiMjRvY3l4bGJtTnZaR2x1WnlrZ2V3b0phV1lvWlc1amIyUnBibWNnUFQwZ2FHRjRaVjlwYjE5RmJtTnZaR2x1Wnk1U1lYZE9ZWFJwZG1VcElIc0tDUWwyWVhJZ1luVm1JRDBnYm1WM0lGVnBiblE0UVhKeVlYa29jeTVzWlc1bmRHZ2dQRHdnTVNrN0Nna0pkbUZ5SUY5bklEMGdNRHNLQ1FsMllYSWdYMmN4SUQwZ2N5NXNaVzVuZEdnN0Nna0pkMmhwYkdVb1gyY2dQQ0JmWnpFcElIc0tDUWtKZG1GeUlHa2dQU0JmWnlzck93b0pDUWwyWVhJZ1l5QTlJSE11WTJoaGNrTnZaR1ZCZENocEtUc0tDUWtKWW5WbVcya2dQRHdnTVYwZ1BTQmpJQ1lnTWpVMU93b0pDUWxpZFdaYmFTQThQQ0F4SUh3Z01WMGdQU0JqSUQ0K0lEZzdDZ2tKZlFvSkNYSmxkSFZ5YmlCdVpYY2dhR0Y0WlY5cGIxOUNlWFJsY3loaWRXWXVZblZtWm1WeUtUc0tDWDBLQ1haaGNpQmhJRDBnVzEwN0NnbDJZWElnYVNBOUlEQTdDZ2wzYUdsc1pTaHBJRHdnY3k1c1pXNW5kR2dwSUhzS0NRbDJZWElnWXlBOUlITXVZMmhoY2tOdlpHVkJkQ2hwS3lzcE93b0pDV2xtS0RVMU1qazJJRHc5SUdNZ0ppWWdZeUE4UFNBMU5qTXhPU2tnZXdvSkNRbGpJRDBnWXlBdElEVTFNak15SUR3OElERXdJSHdnY3k1amFHRnlRMjlrWlVGMEtHa3JLeWtnSmlBeE1ESXpPd29KQ1gwS0NRbHBaaWhqSUR3OUlERXlOeWtnZXdvSkNRbGhMbkIxYzJnb1l5azdDZ2tKZlNCbGJITmxJR2xtS0dNZ1BEMGdNakEwTnlrZ2V3b0pDUWxoTG5CMWMyZ29NVGt5SUh3Z1l5QStQaUEyS1RzS0NRa0pZUzV3ZFhOb0tERXlPQ0I4SUdNZ0ppQTJNeWs3Q2drSmZTQmxiSE5sSUdsbUtHTWdQRDBnTmpVMU16VXBJSHNLQ1FrSllTNXdkWE5vS0RJeU5DQjhJR01nUGo0Z01USXBPd29KQ1FsaExuQjFjMmdvTVRJNElId2dZeUErUGlBMklDWWdOak1wT3dvSkNRbGhMbkIxYzJnb01USTRJSHdnWXlBbUlEWXpLVHNLQ1FsOUlHVnNjMlVnZXdvSkNRbGhMbkIxYzJnb01qUXdJSHdnWXlBK1BpQXhPQ2s3Q2drSkNXRXVjSFZ6YUNneE1qZ2dmQ0JqSUQ0K0lERXlJQ1lnTmpNcE93b0pDUWxoTG5CMWMyZ29NVEk0SUh3Z1l5QStQaUEySUNZZ05qTXBPd29KQ1FsaExuQjFjMmdvTVRJNElId2dZeUFtSURZektUc0tDUWw5Q2dsOUNnbHlaWFIxY200Z2JtVjNJR2hoZUdWZmFXOWZRbmwwWlhNb2JtVjNJRlZwYm5RNFFYSnlZWGtvWVNrdVluVm1abVZ5S1RzS2ZUc0thR0Y0WlY5cGIxOUNlWFJsY3k1d2NtOTBiM1I1Y0dVZ1BTQjdDZ2xuWlhSVGRISnBibWM2SUdaMWJtTjBhVzl1S0hCdmN5eHNaVzRzWlc1amIyUnBibWNwSUhzS0NRbHBaaWh3YjNNZ1BDQXdJSHg4SUd4bGJpQThJREFnZkh3Z2NHOXpJQ3NnYkdWdUlENGdkR2hwY3k1c1pXNW5kR2dwSUhzS0NRa0pkR2h5YjNjZ2FHRjRaVjlGZUdObGNIUnBiMjR1ZEdoeWIzZHVLR2hoZUdWZmFXOWZSWEp5YjNJdVQzVjBjMmxrWlVKdmRXNWtjeWs3Q2drSmZRb0pDV2xtS0dWdVkyOWthVzVuSUQwOUlHNTFiR3dwSUhzS0NRa0paVzVqYjJScGJtY2dQU0JvWVhobFgybHZYMFZ1WTI5a2FXNW5MbFZVUmpnN0Nna0pmUW9KQ1haaGNpQnpJRDBnSWlJN0Nna0pkbUZ5SUdJZ1BTQjBhR2x6TG1JN0Nna0pkbUZ5SUdrZ1BTQndiM003Q2drSmRtRnlJRzFoZUNBOUlIQnZjeUFySUd4bGJqc0tDUWx6ZDJsMFkyZ29aVzVqYjJScGJtY3VYMmg0WDJsdVpHVjRLU0I3Q2drSlkyRnpaU0F3T2dvSkNRbDJZWElnWkdWaWRXY2dQU0J3YjNNZ1BpQXdPd29KQ1FsM2FHbHNaU2hwSUR3Z2JXRjRLU0I3Q2drSkNRbDJZWElnWXlBOUlHSmJhU3NyWFRzS0NRa0pDV2xtS0dNZ1BDQXhNamdwSUhzS0NRa0pDUWxwWmloaklEMDlJREFwSUhzS0NRa0pDUWtKWW5KbFlXczdDZ2tKQ1FrSmZRb0pDUWtKQ1hNZ0t6MGdVM1J5YVc1bkxtWnliMjFEYjJSbFVHOXBiblFvWXlrN0Nna0pDUWw5SUdWc2MyVWdhV1lvWXlBOElESXlOQ2tnZXdvSkNRa0pDWFpoY2lCamIyUmxJRDBnS0dNZ0ppQTJNeWtnUER3Z05pQjhJR0piYVNzclhTQW1JREV5TnpzS0NRa0pDUWx6SUNzOUlGTjBjbWx1Wnk1bWNtOXRRMjlrWlZCdmFXNTBLR052WkdVcE93b0pDUWtKZlNCbGJITmxJR2xtS0dNZ1BDQXlOREFwSUhzS0NRa0pDUWwyWVhJZ1l6SWdQU0JpVzJrcksxMDdDZ2tKQ1FrSmRtRnlJR052WkdVeElEMGdLR01nSmlBek1Ta2dQRHdnTVRJZ2ZDQW9ZeklnSmlBeE1qY3BJRHc4SURZZ2ZDQmlXMmtySzEwZ0ppQXhNamM3Q2drSkNRa0pjeUFyUFNCVGRISnBibWN1Wm5KdmJVTnZaR1ZRYjJsdWRDaGpiMlJsTVNrN0Nna0pDUWw5SUdWc2MyVWdld29KQ1FrSkNYWmhjaUJqTWpFZ1BTQmlXMmtySzEwN0Nna0pDUWtKZG1GeUlHTXpJRDBnWWx0cEt5dGRPd29KQ1FrSkNYWmhjaUIxSUQwZ0tHTWdKaUF4TlNrZ1BEd2dNVGdnZkNBb1l6SXhJQ1lnTVRJM0tTQThQQ0F4TWlCOElDaGpNeUFtSURFeU55a2dQRHdnTmlCOElHSmJhU3NyWFNBbUlERXlOenNLQ1FrSkNRbHpJQ3M5SUZOMGNtbHVaeTVtY205dFEyOWtaVkJ2YVc1MEtIVXBPd29KQ1FrSmZRb0pDUWw5Q2drSkNXSnlaV0ZyT3dvSkNXTmhjMlVnTVRvS0NRa0pkMmhwYkdVb2FTQThJRzFoZUNrZ2V3b0pDUWtKZG1GeUlHTWdQU0JpVzJrcksxMGdmQ0JpVzJrcksxMGdQRHdnT0RzS0NRa0pDWE1nS3owZ1UzUnlhVzVuTG1aeWIyMURiMlJsVUc5cGJuUW9ZeWs3Q2drSkNYMEtDUWtKWW5KbFlXczdDZ2tKZlFvSkNYSmxkSFZ5YmlCek93b0pmUW9KTEhSdlUzUnlhVzVuT2lCbWRXNWpkR2x2YmlncElIc0tDUWx5WlhSMWNtNGdkR2hwY3k1blpYUlRkSEpwYm1jb01DeDBhR2x6TG14bGJtZDBhQ2s3Q2dsOUNuMDdDblpoY2lCb1lYaGxYMmx2WDBWdVkyOWthVzVuSUQwZ0pHaDRSVzUxYlhOYkltaGhlR1V1YVc4dVJXNWpiMlJwYm1jaVhTQTlJSHNnWDE5bGJtRnRaVjlmT25SeWRXVXNYMTlqYjI1emRISjFZM1J6WDE4NmJuVnNiQW9KTEZWVVJqZzZJSHRmYUhoZmJtRnRaVG9pVlZSR09DSXNYMmg0WDJsdVpHVjRPakFzWDE5bGJuVnRYMTg2SW1oaGVHVXVhVzh1Ulc1amIyUnBibWNpTEhSdlUzUnlhVzVuT2lSbGMzUnlmUW9KTEZKaGQwNWhkR2wyWlRvZ2UxOW9lRjl1WVcxbE9pSlNZWGRPWVhScGRtVWlMRjlvZUY5cGJtUmxlRG94TEY5ZlpXNTFiVjlmT2lKb1lYaGxMbWx2TGtWdVkyOWthVzVuSWl4MGIxTjBjbWx1Wnpva1pYTjBjbjBLZlRzS2FHRjRaVjlwYjE5RmJtTnZaR2x1Wnk1ZlgyTnZibk4wY25WamRITmZYeUE5SUZ0b1lYaGxYMmx2WDBWdVkyOWthVzVuTGxWVVJqZ3NhR0Y0WlY5cGIxOUZibU52WkdsdVp5NVNZWGRPWVhScGRtVmRPd3AyWVhJZ2FHRjRaVjlqY25sd2RHOWZRbUZ6WlRZMElEMGdablZ1WTNScGIyNG9LU0I3SUgwN0NpUm9lRU5zWVhOelpYTmJJbWhoZUdVdVkzSjVjSFJ2TGtKaGMyVTJOQ0pkSUQwZ2FHRjRaVjlqY25sd2RHOWZRbUZ6WlRZME93cG9ZWGhsWDJOeWVYQjBiMTlDWVhObE5qUXVYMTl1WVcxbFgxOGdQU0IwY25WbE93cG9ZWGhsWDJOeWVYQjBiMTlDWVhObE5qUXVaR1ZqYjJSbElEMGdablZ1WTNScGIyNG9jM1J5TEdOdmJYQnNaVzFsYm5RcElIc0tDV2xtS0dOdmJYQnNaVzFsYm5RZ1BUMGdiblZzYkNrZ2V3b0pDV052YlhCc1pXMWxiblFnUFNCMGNuVmxPd29KZlFvSmFXWW9ZMjl0Y0d4bGJXVnVkQ2tnZXdvSkNYZG9hV3hsS0VoNFQzWmxjbkpwWkdWekxtTmpZU2h6ZEhJc2MzUnlMbXhsYm1kMGFDQXRJREVwSUQwOUlEWXhLU0J6ZEhJZ1BTQkllRTkyWlhKeWFXUmxjeTV6ZFdKemRISW9jM1J5TERBc0xURXBPd29KZlFvSmNtVjBkWEp1SUc1bGR5Qm9ZWGhsWDJOeWVYQjBiMTlDWVhObFEyOWtaU2hvWVhobFgyTnllWEIwYjE5Q1lYTmxOalF1UWxsVVJWTXBMbVJsWTI5a1pVSjVkR1Z6S0doaGVHVmZhVzlmUW5sMFpYTXViMlpUZEhKcGJtY29jM1J5S1NrN0NuMDdDblpoY2lCb1lYaGxYMk55ZVhCMGIxOUNZWE5sUTI5a1pTQTlJR1oxYm1OMGFXOXVLR0poYzJVcElIc0tDWFpoY2lCc1pXNGdQU0JpWVhObExteGxibWQwYURzS0NYWmhjaUJ1WW1sMGN5QTlJREU3Q2dsM2FHbHNaU2hzWlc0Z1BpQXhJRHc4SUc1aWFYUnpLU0FySzI1aWFYUnpPd29KYVdZb2JtSnBkSE1nUGlBNElIeDhJR3hsYmlBaFBTQXhJRHc4SUc1aWFYUnpLU0I3Q2drSmRHaHliM2NnYUdGNFpWOUZlR05sY0hScGIyNHVkR2h5YjNkdUtDSkNZWE5sUTI5a1pTQTZJR0poYzJVZ2JHVnVaM1JvSUcxMWMzUWdZbVVnWVNCd2IzZGxjaUJ2WmlCMGQyOHVJaWs3Q2dsOUNnbDBhR2x6TG1KaGMyVWdQU0JpWVhObE93b0pkR2hwY3k1dVltbDBjeUE5SUc1aWFYUnpPd3A5T3dva2FIaERiR0Z6YzJWeld5Sm9ZWGhsTG1OeWVYQjBieTVDWVhObFEyOWtaU0pkSUQwZ2FHRjRaVjlqY25sd2RHOWZRbUZ6WlVOdlpHVTdDbWhoZUdWZlkzSjVjSFJ2WDBKaGMyVkRiMlJsTGw5ZmJtRnRaVjlmSUQwZ2RISjFaVHNLYUdGNFpWOWpjbmx3ZEc5ZlFtRnpaVU52WkdVdWNISnZkRzkwZVhCbElEMGdld29KYVc1cGRGUmhZbXhsT2lCbWRXNWpkR2x2YmlncElIc0tDUWwyWVhJZ2RHSnNJRDBnVzEwN0Nna0pkbUZ5SUY5bklEMGdNRHNLQ1FsM2FHbHNaU2hmWnlBOElESTFOaWtnZXdvSkNRbDJZWElnYVNBOUlGOW5LeXM3Q2drSkNYUmliRnRwWFNBOUlDMHhPd29KQ1gwS0NRbDJZWElnWDJjZ1BTQXdPd29KQ1haaGNpQmZaekVnUFNCMGFHbHpMbUpoYzJVdWJHVnVaM1JvT3dvSkNYZG9hV3hsS0Y5bklEd2dYMmN4S1NCN0Nna0pDWFpoY2lCcElEMGdYMmNyS3pzS0NRa0pkR0pzVzNSb2FYTXVZbUZ6WlM1aVcybGRYU0E5SUdrN0Nna0pmUW9KQ1hSb2FYTXVkR0pzSUQwZ2RHSnNPd29KZlFvSkxHUmxZMjlrWlVKNWRHVnpPaUJtZFc1amRHbHZiaWhpS1NCN0Nna0pkbUZ5SUc1aWFYUnpJRDBnZEdocGN5NXVZbWwwY3pzS0NRbDJZWElnWW1GelpTQTlJSFJvYVhNdVltRnpaVHNLQ1FscFppaDBhR2x6TG5SaWJDQTlQU0J1ZFd4c0tTQjdDZ2tKQ1hSb2FYTXVhVzVwZEZSaFlteGxLQ2s3Q2drSmZRb0pDWFpoY2lCMFltd2dQU0IwYUdsekxuUmliRHNLQ1FsMllYSWdjMmw2WlNBOUlHSXViR1Z1WjNSb0lDb2dibUpwZEhNZ1BqNGdNenNLQ1FsMllYSWdiM1YwSUQwZ2JtVjNJR2hoZUdWZmFXOWZRbmwwWlhNb2JtVjNJRUZ5Y21GNVFuVm1abVZ5S0hOcGVtVXBLVHNLQ1FsMllYSWdZblZtSUQwZ01Ec0tDUWwyWVhJZ1kzVnlZbWwwY3lBOUlEQTdDZ2tKZG1GeUlIQnBiaUE5SURBN0Nna0pkbUZ5SUhCdmRYUWdQU0F3T3dvSkNYZG9hV3hsS0hCdmRYUWdQQ0J6YVhwbEtTQjdDZ2tKQ1hkb2FXeGxLR04xY21KcGRITWdQQ0E0S1NCN0Nna0pDUWxqZFhKaWFYUnpJQ3M5SUc1aWFYUnpPd29KQ1FrSlluVm1JRHc4UFNCdVltbDBjenNLQ1FrSkNYWmhjaUJwSUQwZ2RHSnNXMkl1WWx0d2FXNHJLMTFkT3dvSkNRa0phV1lvYVNBOVBTQXRNU2tnZXdvSkNRa0pDWFJvY205M0lHaGhlR1ZmUlhoalpYQjBhVzl1TG5Sb2NtOTNiaWdpUW1GelpVTnZaR1VnT2lCcGJuWmhiR2xrSUdWdVkyOWtaV1FnWTJoaGNpSXBPd29KQ1FrSmZRb0pDUWtKWW5WbUlIdzlJR2s3Q2drSkNYMEtDUWtKWTNWeVltbDBjeUF0UFNBNE93b0pDUWx2ZFhRdVlsdHdiM1YwS3l0ZElEMGdZblZtSUQ0K0lHTjFjbUpwZEhNZ0ppQXlOVFU3Q2drSmZRb0pDWEpsZEhWeWJpQnZkWFE3Q2dsOUNuMDdDblpoY2lCb1lYaGxYMlJ6WDBsdWRFMWhjQ0E5SUdaMWJtTjBhVzl1S0NrZ2V3b0pkR2hwY3k1b0lEMGdleUI5T3dwOU93b2thSGhEYkdGemMyVnpXeUpvWVhobExtUnpMa2x1ZEUxaGNDSmRJRDBnYUdGNFpWOWtjMTlKYm5STllYQTdDbWhoZUdWZlpITmZTVzUwVFdGd0xsOWZibUZ0WlY5ZklEMGdkSEoxWlRzS2RtRnlJR2hoZUdWZlpITmZUR2x6ZENBOUlHWjFibU4wYVc5dUtDa2dld29KZEdocGN5NXNaVzVuZEdnZ1BTQXdPd3A5T3dva2FIaERiR0Z6YzJWeld5Sm9ZWGhsTG1SekxreHBjM1FpWFNBOUlHaGhlR1ZmWkhOZlRHbHpkRHNLYUdGNFpWOWtjMTlNYVhOMExsOWZibUZ0WlY5ZklEMGdkSEoxWlRzS2FHRjRaVjlrYzE5TWFYTjBMbkJ5YjNSdmRIbHdaU0E5SUhzS0NXRmtaRG9nWm5WdVkzUnBiMjRvYVhSbGJTa2dld29KQ1haaGNpQjRJRDBnYm1WM0lHaGhlR1ZmWkhOZlh5Uk1hWE4wWDB4cGMzUk9iMlJsS0dsMFpXMHNiblZzYkNrN0Nna0phV1lvZEdocGN5NW9JRDA5SUc1MWJHd3BJSHNLQ1FrSmRHaHBjeTVvSUQwZ2VEc0tDUWw5SUdWc2MyVWdld29KQ1FsMGFHbHpMbkV1Ym1WNGRDQTlJSGc3Q2drSmZRb0pDWFJvYVhNdWNTQTlJSGc3Q2drSmRHaHBjeTVzWlc1bmRHZ3JLenNLQ1gwS2ZUc0tkbUZ5SUdoaGVHVmZaSE5mWHlSTWFYTjBYMHhwYzNST2IyUmxJRDBnWm5WdVkzUnBiMjRvYVhSbGJTeHVaWGgwS1NCN0NnbDBhR2x6TG1sMFpXMGdQU0JwZEdWdE93b0pkR2hwY3k1dVpYaDBJRDBnYm1WNGREc0tmVHNLSkdoNFEyeGhjM05sYzFzaWFHRjRaUzVrY3k1ZlRHbHpkQzVNYVhOMFRtOWtaU0pkSUQwZ2FHRjRaVjlrYzE5ZkpFeHBjM1JmVEdsemRFNXZaR1U3Q21oaGVHVmZaSE5mWHlSTWFYTjBYMHhwYzNST2IyUmxMbDlmYm1GdFpWOWZJRDBnZEhKMVpUc0tkbUZ5SUdoaGVHVmZaSE5mVDJKcVpXTjBUV0Z3SUQwZ1puVnVZM1JwYjI0b0tTQjdDZ2wwYUdsekxtZ2dQU0I3SUY5ZmEyVjVjMTlmSURvZ2V5QjlmVHNLZlRzS0pHaDRRMnhoYzNObGMxc2lhR0Y0WlM1a2N5NVBZbXBsWTNSTllYQWlYU0E5SUdoaGVHVmZaSE5mVDJKcVpXTjBUV0Z3T3dwb1lYaGxYMlJ6WDA5aWFtVmpkRTFoY0M1ZlgyNWhiV1ZmWHlBOUlIUnlkV1U3Q21oaGVHVmZaSE5mVDJKcVpXTjBUV0Z3TG5CeWIzUnZkSGx3WlNBOUlIc0tDWE5sZERvZ1puVnVZM1JwYjI0b2EyVjVMSFpoYkhWbEtTQjdDZ2tKZG1GeUlHbGtJRDBnYTJWNUxsOWZhV1JmWHpzS0NRbHBaaWhwWkNBOVBTQnVkV3hzS1NCN0Nna0pDV2xrSUQwZ0tHdGxlUzVmWDJsa1gxOGdQU0FrWjJ4dlltRnNMaVJvWVhobFZVbEVLeXNwT3dvSkNYMEtDUWwwYUdsekxtaGJhV1JkSUQwZ2RtRnNkV1U3Q2drSmRHaHBjeTVvTGw5ZmEyVjVjMTlmVzJsa1hTQTlJR3RsZVRzS0NYMEtmVHNLZG1GeUlHaGhlR1ZmWkhOZlUzUnlhVzVuVFdGd0lEMGdablZ1WTNScGIyNG9LU0I3Q2dsMGFHbHpMbWdnUFNCUFltcGxZM1F1WTNKbFlYUmxLRzUxYkd3cE93cDlPd29rYUhoRGJHRnpjMlZ6V3lKb1lYaGxMbVJ6TGxOMGNtbHVaMDFoY0NKZElEMGdhR0Y0WlY5a2MxOVRkSEpwYm1kTllYQTdDbWhoZUdWZlpITmZVM1J5YVc1blRXRndMbDlmYm1GdFpWOWZJRDBnZEhKMVpUc0tkbUZ5SUdoaGVHVmZhVzlmUlhKeWIzSWdQU0FrYUhoRmJuVnRjMXNpYUdGNFpTNXBieTVGY25KdmNpSmRJRDBnZXlCZlgyVnVZVzFsWDE4NmRISjFaU3hmWDJOdmJuTjBjblZqZEhOZlh6cHVkV3hzQ2drc1FteHZZMnRsWkRvZ2UxOW9lRjl1WVcxbE9pSkNiRzlqYTJWa0lpeGZhSGhmYVc1a1pYZzZNQ3hmWDJWdWRXMWZYem9pYUdGNFpTNXBieTVGY25KdmNpSXNkRzlUZEhKcGJtYzZKR1Z6ZEhKOUNna3NUM1psY21ac2IzYzZJSHRmYUhoZmJtRnRaVG9pVDNabGNtWnNiM2NpTEY5b2VGOXBibVJsZURveExGOWZaVzUxYlY5Zk9pSm9ZWGhsTG1sdkxrVnljbTl5SWl4MGIxTjBjbWx1Wnpva1pYTjBjbjBLQ1N4UGRYUnphV1JsUW05MWJtUnpPaUI3WDJoNFgyNWhiV1U2SWs5MWRITnBaR1ZDYjNWdVpITWlMRjlvZUY5cGJtUmxlRG95TEY5ZlpXNTFiVjlmT2lKb1lYaGxMbWx2TGtWeWNtOXlJaXgwYjFOMGNtbHVaem9rWlhOMGNuMEtDU3hEZFhOMGIyMDZJQ2drWHoxbWRXNWpkR2x2YmlobEtTQjdJSEpsZEhWeWJpQjdYMmg0WDJsdVpHVjRPak1zWlRwbExGOWZaVzUxYlY5Zk9pSm9ZWGhsTG1sdkxrVnljbTl5SWl4MGIxTjBjbWx1Wnpva1pYTjBjbjA3SUgwc0pGOHVYMmg0WDI1aGJXVTlJa04xYzNSdmJTSXNKRjh1WDE5d1lYSmhiWE5mWHlBOUlGc2laU0pkTENSZktRcDlPd3BvWVhobFgybHZYMFZ5Y205eUxsOWZZMjl1YzNSeWRXTjBjMTlmSUQwZ1cyaGhlR1ZmYVc5ZlJYSnliM0l1UW14dlkydGxaQ3hvWVhobFgybHZYMFZ5Y205eUxrOTJaWEptYkc5M0xHaGhlR1ZmYVc5ZlJYSnliM0l1VDNWMGMybGtaVUp2ZFc1a2N5eG9ZWGhsWDJsdlgwVnljbTl5TGtOMWMzUnZiVjA3Q25aaGNpQm9ZWGhsWDJsMFpYSmhkRzl5YzE5QmNuSmhlVWwwWlhKaGRHOXlJRDBnWm5WdVkzUnBiMjRvWVhKeVlYa3BJSHNLQ1hSb2FYTXVZM1Z5Y21WdWRDQTlJREE3Q2dsMGFHbHpMbUZ5Y21GNUlEMGdZWEp5WVhrN0NuMDdDaVJvZUVOc1lYTnpaWE5iSW1oaGVHVXVhWFJsY21GMGIzSnpMa0Z5Y21GNVNYUmxjbUYwYjNJaVhTQTlJR2hoZUdWZmFYUmxjbUYwYjNKelgwRnljbUY1U1hSbGNtRjBiM0k3Q21oaGVHVmZhWFJsY21GMGIzSnpYMEZ5Y21GNVNYUmxjbUYwYjNJdVgxOXVZVzFsWDE4Z1BTQjBjblZsT3dwb1lYaGxYMmwwWlhKaGRHOXljMTlCY25KaGVVbDBaWEpoZEc5eUxuQnliM1J2ZEhsd1pTQTlJSHNLQ1doaGMwNWxlSFE2SUdaMWJtTjBhVzl1S0NrZ2V3b0pDWEpsZEhWeWJpQjBhR2x6TG1OMWNuSmxiblFnUENCMGFHbHpMbUZ5Y21GNUxteGxibWQwYURzS0NYMEtDU3h1WlhoME9pQm1kVzVqZEdsdmJpZ3BJSHNLQ1FseVpYUjFjbTRnZEdocGN5NWhjbkpoZVZ0MGFHbHpMbU4xY25KbGJuUXJLMTA3Q2dsOUNuMDdDblpoY2lCcWMxOUNiMjkwSUQwZ1puVnVZM1JwYjI0b0tTQjdJSDA3Q2lSb2VFTnNZWE56WlhOYkltcHpMa0p2YjNRaVhTQTlJR3B6WDBKdmIzUTdDbXB6WDBKdmIzUXVYMTl1WVcxbFgxOGdQU0IwY25WbE93cHFjMTlDYjI5MExsOWZjM1J5YVc1blgzSmxZeUE5SUdaMWJtTjBhVzl1S0c4c2N5a2dld29KYVdZb2J5QTlQU0J1ZFd4c0tTQjdDZ2tKY21WMGRYSnVJQ0p1ZFd4c0lqc0tDWDBLQ1dsbUtITXViR1Z1WjNSb0lENDlJRFVwSUhzS0NRbHlaWFIxY200Z0lqd3VMaTQrSWpzS0NYMEtDWFpoY2lCMElEMGdkSGx3Wlc5bUtHOHBPd29KYVdZb2RDQTlQU0FpWm5WdVkzUnBiMjRpSUNZbUlDaHZMbDlmYm1GdFpWOWZJSHg4SUc4dVgxOWxibUZ0WlY5ZktTa2dld29KQ1hRZ1BTQWliMkpxWldOMElqc0tDWDBLQ1hOM2FYUmphQ2gwS1NCN0NnbGpZWE5sSUNKbWRXNWpkR2x2YmlJNkNna0pjbVYwZFhKdUlDSThablZ1WTNScGIyNCtJanNLQ1dOaGMyVWdJbTlpYW1WamRDSTZDZ2tKYVdZb2J5NWZYMlZ1ZFcxZlh5a2dld29KQ1FsMllYSWdaU0E5SUNSb2VFVnVkVzF6VzI4dVgxOWxiblZ0WDE5ZE93b0pDUWwyWVhJZ1kyOXVJRDBnWlM1ZlgyTnZibk4wY25WamRITmZYMXR2TGw5b2VGOXBibVJsZUYwN0Nna0pDWFpoY2lCdUlEMGdZMjl1TGw5b2VGOXVZVzFsT3dvSkNRbHBaaWhqYjI0dVgxOXdZWEpoYlhOZlh5a2dld29KQ1FrSmN5QTlJSE1nS3lBaVhIUWlPd29KQ1FrSmNtVjBkWEp1SUc0Z0t5QWlLQ0lnS3lBb0tHWjFibU4wYVc5dUtDUjBhR2x6S1NCN0Nna0pDUWtKZG1GeUlDUnlPd29KQ1FrSkNYWmhjaUJmWnlBOUlGdGRPd29KQ1FrSkNYc0tDUWtKQ1FrSmRtRnlJRjluTVNBOUlEQTdDZ2tKQ1FrSkNYWmhjaUJmWnpJZ1BTQmpiMjR1WDE5d1lYSmhiWE5mWHpzS0NRa0pDUWtKZDJocGJHVW9kSEoxWlNrZ2V3b0pDUWtKQ1FrSmFXWW9JU2hmWnpFZ1BDQmZaekl1YkdWdVozUm9LU2tnZXdvSkNRa0pDUWtKQ1dKeVpXRnJPd29KQ1FrSkNRa0pmUW9KQ1FrSkNRa0pkbUZ5SUhBZ1BTQmZaekpiWDJjeFhUc0tDUWtKQ1FrSkNWOW5NU0E5SUY5bk1TQXJJREU3Q2drSkNRa0pDUWxmWnk1d2RYTm9LR3B6WDBKdmIzUXVYMTl6ZEhKcGJtZGZjbVZqS0c5YmNGMHNjeWtwT3dvSkNRa0pDUWw5Q2drSkNRa0pmUW9KQ1FrSkNTUnlJRDBnWDJjN0Nna0pDUWtKY21WMGRYSnVJQ1J5T3dvSkNRa0pmU2gwYUdsektTa3BMbXB2YVc0b0lpd2lLU0FySUNJcElqc0tDUWtKZlNCbGJITmxJSHNLQ1FrSkNYSmxkSFZ5YmlCdU93b0pDUWw5Q2drSmZRb0pDV2xtS0Nnb2J5a2dhVzV6ZEdGdVkyVnZaaUJCY25KaGVTa3BJSHNLQ1FrSmRtRnlJSE4wY2lBOUlDSmJJanNLQ1FrSmN5QXJQU0FpWEhRaU93b0pDUWwyWVhJZ1gyY2dQU0F3T3dvSkNRbDJZWElnWDJjeElEMGdieTVzWlc1bmRHZzdDZ2tKQ1hkb2FXeGxLRjluSUR3Z1gyY3hLU0I3Q2drSkNRbDJZWElnYVNBOUlGOW5LeXM3Q2drSkNRbHpkSElnS3owZ0tHa2dQaUF3SUQ4Z0lpd2lJRG9nSWlJcElDc2dhbk5mUW05dmRDNWZYM04wY21sdVoxOXlaV01vYjF0cFhTeHpLVHNLQ1FrSmZRb0pDUWx6ZEhJZ0t6MGdJbDBpT3dvSkNRbHlaWFIxY200Z2MzUnlPd29KQ1gwS0NRbDJZWElnZEc5emRISTdDZ2tKZEhKNUlIc0tDUWtKZEc5emRISWdQU0J2TG5SdlUzUnlhVzVuT3dvSkNYMGdZMkYwWTJnb0lGOW5JQ2tnZXdvSkNRbHlaWFIxY200Z0lqOC9QeUk3Q2drSmZRb0pDV2xtS0hSdmMzUnlJQ0U5SUc1MWJHd2dKaVlnZEc5emRISWdJVDBnVDJKcVpXTjBMblJ2VTNSeWFXNW5JQ1ltSUhSNWNHVnZaaWgwYjNOMGNpa2dQVDBnSW1aMWJtTjBhVzl1SWlrZ2V3b0pDUWwyWVhJZ2N6SWdQU0J2TG5SdlUzUnlhVzVuS0NrN0Nna0pDV2xtS0hNeUlDRTlJQ0piYjJKcVpXTjBJRTlpYW1WamRGMGlLU0I3Q2drSkNRbHlaWFIxY200Z2N6STdDZ2tKQ1gwS0NRbDlDZ2tKZG1GeUlITjBjaUE5SUNKN1hHNGlPd29KQ1hNZ0t6MGdJbHgwSWpzS0NRbDJZWElnYUdGemNDQTlJRzh1YUdGelQzZHVVSEp2Y0dWeWRIa2dJVDBnYm5Wc2JEc0tDUWwyWVhJZ2F5QTlJRzUxYkd3N0Nna0pabTl5S0NCcklHbHVJRzhnS1NCN0Nna0phV1lvYUdGemNDQW1KaUFoYnk1b1lYTlBkMjVRY205d1pYSjBlU2hyS1NrZ2V3b0pDUWxqYjI1MGFXNTFaVHNLQ1FsOUNna0phV1lvYXlBOVBTQWljSEp2ZEc5MGVYQmxJaUI4ZkNCcklEMDlJQ0pmWDJOc1lYTnpYMThpSUh4OElHc2dQVDBnSWw5ZmMzVndaWEpmWHlJZ2ZId2dheUE5UFNBaVgxOXBiblJsY21aaFkyVnpYMThpSUh4OElHc2dQVDBnSWw5ZmNISnZjR1Z5ZEdsbGMxOWZJaWtnZXdvSkNRbGpiMjUwYVc1MVpUc0tDUWw5Q2drSmFXWW9jM1J5TG14bGJtZDBhQ0FoUFNBeUtTQjdDZ2tKQ1hOMGNpQXJQU0FpTENCY2JpSTdDZ2tKZlFvSkNYTjBjaUFyUFNCeklDc2dheUFySUNJZ09pQWlJQ3NnYW5OZlFtOXZkQzVmWDNOMGNtbHVaMTl5WldNb2IxdHJYU3h6S1RzS0NRbDlDZ2tKY3lBOUlITXVjM1ZpYzNSeWFXNW5LREVwT3dvSkNYTjBjaUFyUFNBaVhHNGlJQ3NnY3lBcklDSjlJanNLQ1FseVpYUjFjbTRnYzNSeU93b0pZMkZ6WlNBaWMzUnlhVzVuSWpvS0NRbHlaWFIxY200Z2J6c0tDV1JsWm1GMWJIUTZDZ2tKY21WMGRYSnVJRk4wY21sdVp5aHZLVHNLQ1gwS2ZUc0tKR2RzYjJKaGJDNGthR0Y0WlZWSlJDQjhQU0F3T3dwcFppaDBlWEJsYjJZb2NHVnlabTl5YldGdVkyVXBJQ0U5SUNKMWJtUmxabWx1WldRaUlEOGdkSGx3Wlc5bUtIQmxjbVp2Y20xaGJtTmxMbTV2ZHlrZ1BUMGdJbVoxYm1OMGFXOXVJaUE2SUdaaGJITmxLU0I3Q2dsSWVFOTJaWEp5YVdSbGN5NXViM2NnUFNCd1pYSm1iM0p0WVc1alpTNXViM2N1WW1sdVpDaHdaWEptYjNKdFlXNWpaU2s3Q24wS0pHaDRRMnhoYzNObGMxc2lUV0YwYUNKZElEMGdUV0YwYURzS2FXWW9JRk4wY21sdVp5NW1jbTl0UTI5a1pWQnZhVzUwSUQwOUlHNTFiR3dnS1NCVGRISnBibWN1Wm5KdmJVTnZaR1ZRYjJsdWRDQTlJR1oxYm1OMGFXOXVLR01wSUhzZ2NtVjBkWEp1SUdNZ1BDQXdlREV3TURBd0lEOGdVM1J5YVc1bkxtWnliMjFEYUdGeVEyOWtaU2hqS1NBNklGTjBjbWx1Wnk1bWNtOXRRMmhoY2tOdlpHVW9LR00rUGpFd0tTc3dlRVEzUXpBcEsxTjBjbWx1Wnk1bWNtOXRRMmhoY2tOdlpHVW9LR01tTUhnelJrWXBLekI0UkVNd01DazdJSDBLVTNSeWFXNW5MbDlmYm1GdFpWOWZJRDBnZEhKMVpUc0tKR2g0UTJ4aGMzTmxjMXNpUVhKeVlYa2lYU0E5SUVGeWNtRjVPd3BCY25KaGVTNWZYMjVoYldWZlh5QTlJSFJ5ZFdVN0NrUmhkR1V1WDE5dVlXMWxYMThnUFNBaVJHRjBaU0k3Q21oaGVHVmZVbVZ6YjNWeVkyVXVZMjl1ZEdWdWRDQTlJRnQ3SUc1aGJXVWdPaUFpWDJobGJIQmZiV0Z3SWl3Z1pHRjBZU0E2SUNKWmJtdDVUV3B3ZW1SSVNteGtSMDV2VlRKb2RtTnVVbGRoVjFKc1lqRlNlVmxYVG5KaU0yc3dUMjFvYkdKSVFsTk5TR3MwVDIxU2JGcHRSakZpU0ZKbVpWUlZObHB0Um5Oak1sWnVaVlJKZUU5dGVIQmtiVlpVWlZjMWFsSklWbmxaV0ZKd1lqSTFSR0l6Vm5Wa1J6bFRUVlpKTUZWcVNqVk5WRzk0V2pOcmVFMXFjR3hpYlVacFlrZFdXR0l6U25KYVdFcDJWV3BHVTA1c1NYbGxWRkUyWkVoS01WcFhaRFZOVkdzMldraEtkRmd6VG14amJscHNZMnc1TTJGWFVteGtiV3gxV2xjNVUwMVlhM2hQUkhCcVlqSXdkV1F5Ykd0YVdGcHdZbTFWZFZsWGVIZGhSMFpUVFc1ck1FOUVjRzlrU0ZKM1kzbFZlbEZUVlhsU2FWVjVVbTVrY0ZwSFZqSmhWelZzVEZoQ2VXSXphRFZNYlVaM1kwaE9kMkl6VVhWWk1qbDBTbFJLUjJOSVNuWmxTR3h1WVVFaWZWMDdDbWhoZUdWZlpITmZUMkpxWldOMFRXRndMbU52ZFc1MElEMGdNRHNLYW5OZlFtOXZkQzVmWDNSdlUzUnlJRDBnS0hzZ2ZTa3VkRzlUZEhKcGJtYzdDa0Z5WjJGdUxraEZURkJmVWtWVFQxVlNRMFZmUzBWWklEMGdJbDlvWld4d1gyMWhjQ0k3Q2toc2MwcHpMbWhzYzBOdmJtWnBaeUE5SUhzZ1pHVmlkV2NnT2lCbVlXeHpaU3dnZDJsa1pYWnBibVZNYVdObGJuTmxWWEpzSURvZ1FYSm5ZVzR1WVhKbmN5QWhQU0J1ZFd4c0lDWW1JRTlpYW1WamRDNXdjbTkwYjNSNWNHVXVhR0Z6VDNkdVVISnZjR1Z5ZEhrdVkyRnNiQ2hCY21kaGJpNWhjbWR6TG1nc0ltUnliVjl6WlhKMlpYSmZkMmxrWlhacGJtVWlLU0EvSUVGeVoyRnVMbUZ5WjNNdWFGc2laSEp0WDNObGNuWmxjbDkzYVdSbGRtbHVaU0pkSURvZ0ltaDBkSEJ6T2k4dmQybGtaWFpwYm1VdGNISnZlSGt1WVhCd2MzQnZkQzVqYjIwdmNISnZlSGtpTENCbGJXVkZibUZpYkdWa0lEb2dkSEoxWlN3Z2MzUnlaWFJqYUZOb2IzSjBWbWxrWlc5VWNtRmpheUE2SUVGeVoyRnVMbUZ5WjNNZ0lUMGdiblZzYkNBbUppQlBZbXBsWTNRdWNISnZkRzkwZVhCbExtaGhjMDkzYmxCeWIzQmxjblI1TG1OaGJHd29RWEpuWVc0dVlYSm5jeTVvTENKemRISmxkR05vVTJodmNuUldhV1JsYjFSeVlXTnJJaWtnUHlCQmNtZGhiaTVoY21kekxtaGJJbk4wY21WMFkyaFRhRzl5ZEZacFpHVnZWSEpoWTJzaVhTQTZJQ0ptWVd4elpTSXNJR1Z1WVdKc1pWZHZjbXRsY2lBNklFRnlaMkZ1TG1GeVozTWdJVDBnYm5Wc2JDQW1KaUJQWW1wbFkzUXVjSEp2ZEc5MGVYQmxMbWhoYzA5M2JsQnliM0JsY25SNUxtTmhiR3dvUVhKbllXNHVZWEpuY3k1b0xDSmxibUZpYkdWWGIzSnJaWElpS1NBL0lFRnlaMkZ1TG1GeVozTXVhRnNpWlc1aFlteGxWMjl5YTJWeUlsMGdPaUFpZEhKMVpTSXNJR1J5YlZONWMzUmxiU0E2SUNKWFNVUkZWa2xPUlNKOU93cG9ZWGhsWDFWdWMyVnlhV0ZzYVhwbGNpNUVSVVpCVlV4VVgxSkZVMDlNVmtWU0lEMGdibVYzSUdoaGVHVmZYeVJWYm5ObGNtbGhiR2w2WlhKZlJHVm1ZWFZzZEZKbGMyOXNkbVZ5S0NrN0NtaGhlR1ZmVlc1elpYSnBZV3hwZW1WeUxrSkJVMFUyTkNBOUlDSkJRa05FUlVaSFNFbEtTMHhOVGs5UVVWSlRWRlZXVjFoWldtRmlZMlJsWm1kb2FXcHJiRzF1YjNCeGNuTjBkWFozZUhsNk1ERXlNelExTmpjNE9TVTZJanNLYUdGNFpWOWpjbmx3ZEc5ZlFtRnpaVFkwTGtOSVFWSlRJRDBnSWtGQ1EwUkZSa2RJU1VwTFRFMU9UMUJSVWxOVVZWWlhXRmxhWVdKalpHVm1aMmhwYW10c2JXNXZjSEZ5YzNSMWRuZDRlWG93TVRJek5EVTJOemc1S3k4aU93cG9ZWGhsWDJOeWVYQjBiMTlDWVhObE5qUXVRbGxVUlZNZ1BTQm9ZWGhsWDJsdlgwSjVkR1Z6TG05bVUzUnlhVzVuS0doaGVHVmZZM0o1Y0hSdlgwSmhjMlUyTkM1RFNFRlNVeWs3Q2toc2MwcHpMbTFoYVc0b0tUc0tmU2tvZEhsd1pXOW1JSGRwYm1SdmR5QWhQU0FpZFc1a1pXWnBibVZrSWlBL0lIZHBibVJ2ZHlBNklIUjVjR1Z2WmlCbmJHOWlZV3dnSVQwZ0luVnVaR1ZtYVc1bFpDSWdQeUJuYkc5aVlXd2dPaUIwZVhCbGIyWWdjMlZzWmlBaFBTQWlkVzVrWldacGJtVmtJaUEvSUhObGJHWWdPaUIwYUdsektUc0s"},{ name : "logo", data : "PHN2ZyB2aWV3Qm94PSIwIDAgMjM1IDI2MCIgdmVyc2lvbj0iMS4xIiAKICAgICAgICAgICAgICAgICAgICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogICAgPHN0eWxlIHR5cGU9InRleHQvY3NzIiA+CiAgICAgICAgPCFbQ0RBVEFbCiAgICAgICAgICAgIC5saW5lIGxpbmUgewogICAgICAgICAgICAgICAgbWFya2VyLWVuZDogdXJsKCNjYXBweSk7CiAgICAgICAgICAgICAgICBzdHJva2UtbGluZWNhcDogInJvdW5kIjsKICAgICAgICAgICAgICAgIHN0cm9rZS13aWR0aDogMTQ7CiAgICAgICAgICAgICAgICBzdHJva2U6IGN1cnJlbnRDb2xvcjsKICAgICAgICAgICAgICAgIHN0cm9rZS1kYXNoYXJyYXk6IDEwMCAxMDA7CiAgICAgICAgICAgICAgICBzdHJva2UtZGFzaG9mZnNldDogLTQ7CiAgICAgICAgICAgIH0KICAgICAgICBdXT4KICAgIDwvc3R5bGU+CiAgICA8ZGVmcz4KICAgIDxtYXJrZXIgaWQ9ImNhcHB5IgogICAgICAgIHZpZXdCb3g9Ii0yIDAgMzAgMTAiIHJlZlg9IjAiIHJlZlk9IjUiIAogICAgICAgIG1hcmtlclVuaXRzPSJzdHJva2VXaWR0aCIKICAgICAgICBtYXJrZXJXaWR0aD0iMy4wIiBtYXJrZXJIZWlnaHQ9IjEiCiAgICAgICAgb3JpZW50PSJhdXRvIj4KICAgICAgICA8cmVjdCBmaWxsPSJjdXJyZW50Q29sb3IiIHg9Ii01IiB3aWR0aD0iMzAiIGhlaWdodD0iMTAiIHJ4PSI1IiByeT0iNSI+PC9yZWN0PgogICAgPC9tYXJrZXI+CiAgICA8L2RlZnM+CiAgICA8ZyBjbGFzcz0ibGluZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzAsMzApIj4KICAgICAgICA8cG9seWxpbmUgaWQ9ImhleGFnb24iIHBvaW50cz0iODcsMCAxNzQsNTAgMTc0LDE1MCA4NywyMDAgMCwxNTAgMCw1MCA4NywwIiBmaWxsPSIjRUJFQkVCMDAiPjwvcG9seWxpbmU+CiAgICAgICAgPGxpbmUgeDE9Ijg3IiAgIHkxPSIwIiAgICAgIHgyPSIxNzQiICAgIHkyPSI1MCIgLz4KICAgICAgICA8bGluZSB4MT0iMTc0IiAgeTE9IjUwIiAgICAgeDI9IjE3NCIgICAgeTI9IjE1MCIvPgogICAgICAgIDxsaW5lIHgxPSIxNzQiICB5MT0iMTUwIiAgICB4Mj0iODciICAgICB5Mj0iMjAwIi8+CiAgICAgICAgPGxpbmUgeDE9Ijg3IiAgIHkxPSIyMDAiICAgIHgyPSIwIiAgICAgIHkyPSIxNTAiLz4KICAgICAgICA8bGluZSB4MT0iMCIgICAgeTE9IjE1MCIgICAgeDI9IjAiICAgICAgeTI9IjUwIiAvPgogICAgICAgIDxsaW5lIHgxPSIwIiAgICB5MT0iNTAiICAgIHgyPSI4NyIgICAgICB5Mj0iMCIgIC8+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzAsNzUpIj4KICAgICAgICAgICAgPCEtLXBvbHlsaW5lIGlkPSJwbGF5IiBwb2ludHM9IjAsMCA1MCwyNSAwLDUwIDAsMCIgZmlsbD0iY3VycmVudENvbG9yIi8tLT4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg"},{ name : "hlsjs-argan", data : "eyJlbmFibGVXb3JrZXIiOnsiaGVscCI6ImVuYWJsZVdvcmtlciIsImRlZmF1bHRfIjoidHJ1ZSJ9LCJsaXZlU3luY0R1cmF0aW9uQ291bnQiOnsiaGVscCI6ImxpdmVTeW5jRHVyYXRpb25Db3VudCIsImRlZmF1bHRfIjoiMSJ9LCJkcm1fc2VydmVyX3dpZGV2aW5lIjp7ImhlbHAiOiJjb20ud2lkZXZpbmUuYWxwaGEiLCJkZWZhdWx0XyI6Imh0dHBzOi8vd2lkZXZpbmUtcHJveHkuYXBwc3BvdC5jb20vcHJveHkifSwic3RyZXRjaFNob3J0VmlkZW9UcmFjayI6eyJoZWxwIjoic3RyZXRjaFNob3J0VmlkZW9UcmFjayIsImRlZmF1bHRfIjoiZmFsc2UifX0"},{ name : "controls_template", data : "PGRpdiBpZD0iY29udHJvbHNfZWxlbWVudHMiPgogICAgPHNjcmlwdD4KICAgICAgICAvKgogICAgICAgIHZhciBjb250cm9sc19lbGVtZW50cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOwogICAgICAgIHZhciB0YXJnZXQgPSB3aW5kb3cuZnJhbWVFbGVtZW50LnBhcmVudEVsZW1lbnQ7CiAgICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNvbnRyb2xzX2VsZW1lbnRzLCB0YXJnZXQubmV4dFNpYmxpbmcpOwogICAgICAgICovCiAgICAgICAgdmFyIGxvYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJsb2FkZXIiKTsKICAgICAgICAKICAgICAgICB2YXIgY29udGFpbmVyID0gd2luZG93LmZyYW1lRWxlbWVudC5wYXJlbnRFbGVtZW50OwogICAgICAgIGNsZWFyTWVudSA9IGZ1bmN0aW9uKCl7CiAgICAgICAgICAgIHdoaWxlKGNvbnRyb2xzX2VsZW1lbnRzLmZpcnN0Q2hpbGQpCiAgICAgICAgICAgICAgICBjb250cm9sc19lbGVtZW50cy5yZW1vdmVDaGlsZChjb250cm9sc19lbGVtZW50cy5maXJzdENoaWxkKTsKICAgICAgICB9CiAgICAgICAgdmFyIHJlc2V0Q29udHJvbHNIZWlnaHQgPSBmdW5jdGlvbigpewogICAgICAgICAgICAvL29mZnNldCBjb250YWluZXIgaGVpZ2h0IHdpdGggaGVpZ2h0IG9mIGNvbnRyb2xzCiAgICAgICAgICAgIGNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBjb250cm9sc19lbGVtZW50cy5wYXJlbnRFbGVtZW50Lm9mZnNldEhlaWdodCArICJweCI7CiAgICAgICAgfQogICAgICAgIHZhciByZXNldEFzcGVjdFJhdGlvID0gZnVuY3Rpb24oKXsKICAgICAgICAgICAgLy9jb3JyZWN0IGNvbnRhaW5lciBhc3BlY3QgcmF0aW8gd2l0aCB2aWRlbyBhc3BlY3QgcmF0aW8KICAgICAgICAgICAgY29udGFpbmVyLnN0eWxlLnBhZGRpbmdCb3R0b20gPSAxMDAvdmlkZW8ub2Zmc2V0V2lkdGgqdmlkZW8ub2Zmc2V0SGVpZ2h0ICsgIiUiOwogICAgICAgICAgICBsb2FkZXIuc3R5bGUuaGVpZ2h0ID0gdmlkZW8ub2Zmc2V0SGVpZ2h0ICsgInB4IjsKICAgICAgICB9CiAgICAgICAgdmFyIG1lbnVzID0ge307CiAgICAgICAgcmVtb3ZlTWVudSA9IGZ1bmN0aW9uKHRpdGxlKSB7CiAgICAgICAgICAgIGlmKHRpdGxlIGluIG1lbnVzKXsKICAgICAgICAgICAgICAgIG1lbnVzW3RpdGxlXS5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKG1lbnVzW3RpdGxlXSk7CiAgICAgICAgICAgICAgICBkZWxldGUgbWVudXNbdGl0bGVdOwogICAgICAgICAgICB9CiAgICAgICAgfQogICAgICAgIGFkZE1lbnUgPSBmdW5jdGlvbih0aXRsZSwgb3B0aW9ucywgaGFuZGxlciwgc2VsZWN0ZWRJbmRleCl7CiAgICAgICAgICAgIHZhciBkaXYgPSBtZW51c1t0aXRsZV0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCJkaXYiKTsKICAgICAgICAgICAgdmFyIGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgibGFiZWwiKTsKICAgICAgICAgICAgbGFiZWwuaW5uZXJUZXh0ID0gdGl0bGU7CiAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChsYWJlbCk7CiAgICAgICAgICAgIAogICAgICAgICAgICAKICAgICAgICAgICAgdmFyIHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoInNlbGVjdCIpOwogICAgICAgICAgICBsYWJlbC5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsIGZ1bmN0aW9uKGUpewogICAgICAgICAgICAgICAgc2VsZWN0LmNsaWNrKCk7CiAgICAgICAgICAgIH0pOwogICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKyl7CiAgICAgICAgICAgICAgICB2YXIgbyA9IG9wdGlvbnNbaV07CiAgICAgICAgICAgICAgICB2YXIgb3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgib3B0aW9uIik7CiAgICAgICAgICAgICAgICBvcHQuaW5uZXJUZXh0ID0gby50aXRsZTsKICAgICAgICAgICAgICAgIG9wdC5pbmZvID0gby5pbmZvOwogICAgICAgICAgICAgICAgaWYoaSA9PSBzZWxlY3RlZEluZGV4KQogICAgICAgICAgICAgICAgICAgIG9wdC5zZWxlY3RlZCA9IHRydWU7CiAgICAgICAgICAgICAgICBzZWxlY3QuYXBwZW5kQ2hpbGQob3B0KTsKICAgICAgICAgICAgfQogICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoc2VsZWN0KTsKICAgICAgICAgICAgc2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoImNoYW5nZSIsIGhhbmRsZXIpOwogICAgICAgICAgICBjb250cm9sc19lbGVtZW50cy5hcHBlbmRDaGlsZChkaXYpOwogICAgICAgICAgICAKICAgICAgICAgICAgcmVzZXRDb250cm9sc0hlaWdodCgpOwogICAgICAgIH07CiAgICAgICAgdmFyIGxvYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJsb2FkZXIiKTsKICAgICAgICBmdW5jdGlvbiBoaWRlTG9hZGVyKCl7CiAgICAgICAgICAgIGlmKCFsb2FkZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCJoaWRlIikpCiAgICAgICAgICAgICAgICBsb2FkZXIuY2xhc3NMaXN0LmFkZCgiaGlkZSIpOwogICAgICAgIH0KICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCJsb2FkZWRkYXRhIiwgcmVzZXRBc3BlY3RSYXRpbyk7CiAgICAgICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigiZXJyb3IiLCBoaWRlTG9hZGVyKTsKICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCJsb2Fkc3RhcnQiLCByZXNldEFzcGVjdFJhdGlvKTsKICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCJwbGF5aW5nIiwgcmVzZXRBc3BlY3RSYXRpbyk7CiAgICAgICAgdmFyIGJvdGggPSBmdW5jdGlvbihlKXsKICAgICAgICAgICAgcmVzZXRBc3BlY3RSYXRpbygpOwogICAgICAgICAgICByZXNldENvbnRyb2xzSGVpZ2h0KCk7CiAgICAgICAgICAgIGhpZGVMb2FkZXIoKTsKICAgICAgICB9OwogICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCJyZXNpemUiLCBib3RoKTsKICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCJsb2FkZWRtZXRhZGF0YSIsIGJvdGgpOwogICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCJsb2FkIiwgYm90aCk7CiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoImtleWRvd24iLCBmdW5jdGlvbihlKXsKICAgICAgICAgICAgY29udGFpbmVyLmRpc3BhdGNoRXZlbnQobmV3IGUuY29uc3RydWN0b3IoZS50eXBlLCBlKSk7CiAgICAgICAgfSk7CiAgICA8L3NjcmlwdD4KPC9kaXY+Cg"},{ name : "dashjs-argan", data : "eyJkcm1fc2VydmVyX3BsYXlyZWFkeSI6eyJoZWxwIjoiY29tLm1pY3Jvc29mdC5wbGF5cmVhZHkiLCJkZWZhdWx0XyI6Imh0dHBzOi8vcGxheXJlYWR5LmRpcmVjdHRhcHMubmV0L3ByL3N2Yy9yaWdodHNtYW5hZ2VyLmFzbXg/UGxheVJpZ2h0PTEmVXNlU2ltcGxlTm9uUGVyc2lzdGVudExpY2Vuc2U9MSZQbGF5RW5hYmxlcnM9Nzg2NjI3RDgtQzJBNi00NEJFLThGODgtMDhBRTI1NUIwMUE3In0sInNldEFCUlN0cmF0ZWd5Ijp7ImhlbHAiOiJhYnJEeW5hbWljIC8gYWJyQm9sYSAvIGFiclRocm91Z2hwdXQiLCJkZWZhdWx0XyI6ImFickR5bmFtaWMifSwic2V0SnVtcEdhcHMiOnsiaGVscCI6InNldEp1bXBHYXBzIiwiZGVmYXVsdF8iOnRydWV9LCJkcm1fc2VydmVyX3dpZGV2aW5lIjp7ImhlbHAiOiJjb20ud2lkZXZpbmUuYWxwaGEiLCJkZWZhdWx0XyI6Imh0dHBzOi8vd2lkZXZpbmUtcHJveHkuYXBwc3BvdC5jb20vcHJveHkifSwic2V0RmFzdFN3aXRjaEVuYWJsZWQiOnsiaGVscCI6InNldEZhc3RTd2l0Y2hFbmFibGVkIiwiZGVmYXVsdF8iOnRydWV9LCJkYXNoanNfbG9nbGV2ZWwiOnsiaGVscCI6IjAgPT0gbm9uZSB0byA1ID09IGRlYnVnIiwiZGVmYXVsdF8iOjR9LCJzZXRMb3dMYXRlbmN5RW5hYmxlZCI6eyJoZWxwIjoic2V0TG93TGF0ZW5jeUVuYWJsZWQiLCJkZWZhdWx0XyI6ZmFsc2V9LCJzZXRMaXZlRGVsYXkiOnsiaGVscCI6InNldExpdmVEZWxheSIsImRlZmF1bHRfIjoxMH19"}];
haxe_ds_ObjectMap.count = 0;
js_Boot.__toStr = ({ }).toString;
Argan.HELP_RESOURCE_KEY = "_help_map";
Main.playerSrcExtended = new haxe_ds_StringMap();
Main.id = 0;
Xml.Element = 0;
Xml.PCData = 1;
Xml.CData = 2;
Xml.Comment = 3;
Xml.DocType = 4;
Xml.ProcessingInstruction = 5;
Xml.Document = 6;
haxe_Template.splitter = new EReg("(::[A-Za-z0-9_ ()&|!+=/><*.\"-]+::|\\$\\$([A-Za-z0-9_-]+)\\()","");
haxe_Template.expr_splitter = new EReg("(\\(|\\)|[ \r\n\t]*\"[^\"]*\"[ \r\n\t]*|[!+=/><*.&|-]+)","");
haxe_Template.expr_trim = new EReg("^[ ]*([^ ]+)[ ]*$","");
haxe_Template.expr_int = new EReg("^[0-9]+$","");
haxe_Template.expr_float = new EReg("^([+-]?)(?=\\d|,\\d)\\d*(,\\d*)?([Ee]([+-]?\\d+))?$","");
haxe_Template.globals = { };
haxe_Template.hxKeepArrayIterator = new haxe_iterators_ArrayIterator([]);
haxe_Unserializer.DEFAULT_RESOLVER = new haxe__$Unserializer_DefaultResolver();
haxe_Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe_crypto_Base64.CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
haxe_crypto_Base64.BYTES = haxe_io_Bytes.ofString(haxe_crypto_Base64.CHARS);
haxe_xml_Parser.escapes = (function($this) {
	var $r;
	var h = new haxe_ds_StringMap();
	h.h["lt"] = "<";
	h.h["gt"] = ">";
	h.h["amp"] = "&";
	h.h["quot"] = "\"";
	h.h["apos"] = "'";
	$r = h;
	return $r;
}(this));
uapi_ui_Timeline.dragging = false;
uapi_ui_Tree.ID = "mse-toolbox-tree-";
Main.main();
})(typeof exports != "undefined" ? exports : typeof window != "undefined" ? window : typeof self != "undefined" ? self : this, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
