package ;
import haxe.io.Bytes;
import haxe.io.BytesOutput;
import haxe.io.BytesInput;
import haxe.crypto.Base64;
import haxe.io.Path;
#if macro
import haxe.macro.Compiler;
import haxe.macro.Context;
import haxe.macro.Expr;
import haxe.macro.Expr.Field;
import haxe.macro.Type.ClassType;
import haxe.macro.Type.Ref;
import sys.io.File;
import sys.FileSystem;
#end
import haxe.Utf8;

class Macros
{
	public static macro function getPlayerCode(filePath:String, data_uri:Bool=false, delete_temp:Bool=#if debug false #else true #end):ExprOf<String> {
		//disable this macro in code completion mode
		if(haxe.macro.Context.defined('display'))
			return macro null;
		//haxe.macro.Compiler.getOutput();
		var arr = filePath.split("@"); filePath = arr[0];
		var path = new haxe.io.Path(filePath);
		var resourceName = arr.length > 1 ? arr[1] : path.file;

		var isInitMacro = StringTools.startsWith(haxe.macro.PositionTools.getInfos(haxe.macro.Context.currentPos()).file, "--macro");
		trace("Compiling inline, initiated from " + haxe.macro.PositionTools.getInfos(haxe.macro.Context.currentPos()).file + ", environment:\n\n\tCwd: " + Sys.getCwd() +"\n");

		if (FileSystem.exists(filePath)) {
			var command = "haxe";
			var filenameBase = '__generated_${path.file}';
			var filename = filenameBase + ".js";
			var argan_options = '${filenameBase}.json';
			var command_args = ["-cp" , path.dir, "-main", path.file, "-lib", "argan", "-js", filename, '-D', 'argan_json_output=$argan_options']; //"-D=source-map-content"
			trace("Compiling...\nRunning: " + command + " " + command_args.join(" "));
			var p = try new sys.io.Process(command, command_args) catch ( e : Dynamic ) { trace("getPlayerCode error: no haxe in path?:\n\n\t" +  e); return macro null; };
			var output = p.stdout.readAll().toString();
			var error = p.stderr.readAll().toString();
			Sys.println('----------------------------------------');
			if(error.length > 0)
				Sys.println('getPlayerCode("$filePath") -> error compiling "$filePath":\n\n\t' + StringTools.trim(error));
			if(output.length > 0)
				Sys.println('${StringTools.trim(output)}');
			Sys.println('----------------------------------------');
			if(FileSystem.exists(argan_options)){
				haxe.macro.Context.addResource(resourceName + "-argan", File.getBytes(argan_options));
				if(delete_temp)
					FileSystem.deleteFile(argan_options);
			}
			if (FileSystem.exists(filename)) {
				var fileContent = File.getBytes(filename);
				var fileBase64 = haxe.crypto.Base64.encode(fileContent);
				if(delete_temp)
					FileSystem.deleteFile(filename);

				if(isInitMacro){
					if(data_uri)
						haxe.macro.Context.addResource(resourceName, haxe.io.Bytes.ofString('data:text/plain;charset=UTF-8;base64,${fileBase64}'));
					else
						haxe.macro.Context.addResource(resourceName, fileContent);

					trace('added haxe.Resource["${resourceName}"]');
					return macro null;
				}else{
					// return as expression
					if(data_uri){
						return macro {
							"data:text/plain;charset=UTF-8;base64,"+$v{fileBase64};
						};
					}else{
						return macro {
							haxe.crypto.Base64.decode($v{fileBase64});
						};
					}
				}
			}else{
				return macro null;
			}
		}  else {
			trace('getPlayerCode("$filePath") error: $filePath does not exist');
			return macro null;
		}
	}
	macro public static function GetVersion(?name:String = "", ?version:String = null)
	{
		var date = Date.now().toString();
		if(version == null)
			version = GetLastGitTag();
		if(version == "unknown")
			version = "1.0";
		var arr = [];
		if(name != "")
			arr.push(name);
		arr.push(version);

		var output = '${arr.join(" ")}, $date';

		return { expr : EConst(CString(output)), pos : haxe.macro.Context.currentPos() };
	}
	#if macro
	public static function GetGitShortHead()
	{
		var p = try new sys.io.Process("git", ["rev-parse" ,"--short", "HEAD"]) catch ( e : Dynamic ) { trace("no git command found: " +  e); return ""; };
		var output = 'Git short SHA1:' + p.stderr.readAll().toString() + p.stdout.readAll().toString();
		return output.split("\r").join("").split("\n").join("");
	}
	
	public static function GetLastGitTag()
	{
		var p = try new sys.io.Process("git", ["describe" ,"--tags"]) catch ( e : Dynamic ) { trace("no git command found: " +  e); return ""; };
		var output = p.stdout.readAll().toString();
		return output.split("\r").join("").split("\n").join("");	
	}
	#end
	macro public static function GetNPMPackageVersion()
	{
		var pos = haxe.macro.Context.currentPos();
		var version = "unknown";
		var file = "package.json";
		if(sys.FileSystem.exists(file)){
			var obj = haxe.Json.parse(sys.io.File.getContent(file));
			if(Reflect.hasField(obj, "version"))
				version = Reflect.field(obj, "version");
		}
		return { expr : EConst(CString(version)), pos : pos };
	}

	/**
	 * Import files as compressed base64.
	 * Use path relative to any of the include folders
	 * @param	files
	 * @return
	 */
	macro static public function importFilesAsB64String(files:Array<String>, zip:Bool = true):Expr
	{
		trace("[importFilesAsB64String] Called from " + Context.getLocalModule());

		var retval:Array<Dynamic<{file:String, data:String}>> = new Array<Dynamic<{file:String, data:String}>>();
		trace("[importFilesAsB64String] importing from " + Sys.getCwd());
		for (s in files) {
			try {
				s = Context.resolvePath(s); //resolve the actual path from included directories
				var fin = sys.io.File.read(s, false);
				var buf = new StringBuf();
				buf.add('[importFilesAsB64String] importing: $s');
				if(zip)
					buf.add(', zlib deflate: compressing to zip');
				trace(buf);
				var object:Dynamic<{file:String, data:String}> = { };
				Reflect.setField(object, "file", s);
				Reflect.setField(object, "data", haxe.crypto.Base64.encode(zip ? haxe.zip.Compress.run(fin.readAll(), 5) : fin.readAll()));
				retval.push( object );
				fin.close();
			}catch (e:Error) {
				trace(e.message);
			}

		}
		// an "ExprDef" is just a piece of a syntax tree. Something the compiler
		// creates itself while parsing an a .hx file
		return macro $v { retval };
	}

	macro public static function GetBuildHost()
	{
		return { expr : EConst(CString(sys.net.Host.localhost())), pos : haxe.macro.Context.currentPos() };
	}

	macro public static function PrependVersion(name:String, file:String)
	{
		if(FileSystem.exists(file)) {
			var fileContent = File.getContent(file);
			File.saveContent(file, '/*\n *\t${name} ${GetLastGitTag()}\n */\n${fileContent}');
		}
		return macro null;
	}

	macro public static function saveScope(?file:String = "scope.txt"){
		var buf:StringBuf = new StringBuf();
		
		
        haxe.macro.Context.onAfterGenerate(function(){
            
        });
        haxe.macro.Context.onGenerate(function(a){
            for(basetype in a){
                switch(basetype){
                    case TInst(a, b): if(!a.get().meta.has(":native")) buf.add(a + "\n"); //a.get().exclude();
                    case TEnum(a, b): if(!a.get().meta.has(":native")) buf.add(a + "\n");
                    default:null;
                }
            }
			File.saveContent(file, buf.toString());
        });
        return macro null;
    }
	macro public static function reuseScope(?file:String = "scope.txt", ?scopeObject:String = "uapi"){
		var exclude = File.getContent(file).split("\n");
        haxe.macro.Context.onAfterGenerate(function(){
			var outputfile = new haxe.io.Path(haxe.macro.Compiler.getOutput());
			var fileContent = File.getContent(outputfile.toString());
			if(StringTools.endsWith(fileContent, ";\n")){
				fileContent = StringTools.replace(fileContent, '"use strict";', "");
				var head = fileContent.substr(0, fileContent.lastIndexOf("(typeof "));
				var tail = fileContent.substr(fileContent.lastIndexOf("(typeof "));
				fileContent = '${head}(${scopeObject}.getScope());';
			}
			File.saveContent(outputfile.toString(), fileContent);
        });
		/*
        haxe.macro.Context.onAfterTyping(function(types){
			for(basetype in types){
                switch(basetype){
                    case TClassDecl(a): if(exclude.indexOf(a.toString()) != -1) a.get().pack.insert(0, "$global");
                    case TAbstract(a):  if(exclude.indexOf(a.toString()) != -1) a.get().pack.insert(0, "$global");
                    case TEnumDecl(a):  if(exclude.indexOf(a.toString()) != -1) a.get().pack.insert(0, "$global");
                    case TTypeDecl(a):  if(exclude.indexOf(a.toString()) != -1) a.get().pack.insert(0, "$global");
                }
            }
		});
		*/
		haxe.macro.Context.onGenerate(function(a){
            for(basetype in a){
                switch(basetype){
                    case TInst(a, b): 
						//todo programmatically get Main class
						if(exclude.indexOf(a.toString()) != -1){
							var newScope = '$$global.${a.toString()}';
							a.get().meta.add(":native", [ macro $v{newScope} ], haxe.macro.PositionTools.here());
							a.toString() != "StringTools" && 
							a.toString() != "haxe.ds.StringMap" && 
							a.toString() != "haxe.Resource" &&
							a.toString() != "uapi.Utils" &&
							a.toString() != "Main" ? a.get().exclude() : null;
						}
                    case TEnum(a, b): 
						exclude.indexOf(a.toString()) != -1 ? a.get().exclude() : null;
                    default:null;
                }
            }
        });
        return macro null;
    }
	#if macro
	public static function updateJson(file, type, url){
		trace(haxe.Http.requestUrl(url));
	}
	public static function GetPlayersCDNJS(player:String)
	{
		var data = haxe.Json.parse(haxe.Http.requestUrl('http://api.cdnjs.com/libraries/${player}/'));
		var result = {};
		if(data != null){
			var assets:Array<Dynamic> = data.assets;
			for(a in assets){
				var arr = [];
				for(f in cast(a.files, Array<Dynamic>))
					if(!StringTools.endsWith(f, ".map"))
						arr.push('http://cdnjs.cloudflare.com/ajax/libs/dashjs/${a.version}/${f}');
				Reflect.setField(result, a.version, arr);
			}
		}
		trace(result);

		//sys.io.File.saveContent('my_folder/my_file.json',content);

	}
	
	/**
	 * Converts inline markup to embedded base64 returning function
	 * static var AAP = <aap></aap>
	 */
	public static function buildInlineMarkup(processFields:Array<String> = null, condensed:Bool = true){
		var fields = Context.getBuildFields();
		processFields = processFields == null ? ["SRC"] : processFields;
		for( f in fields ){
			var name = f.name;
			if( processFields.indexOf(name) >= 0 ) {
				switch( f.kind ) {
					case FVar(_,{ expr : EMeta({ name : ":markup" },{ expr : EConst(CString(str)) }), pos : pos }):
						fields.remove(f);
						var encoded = Base64.encode(
							if(condensed){
								var buf = new BytesOutput();
								for(line in str.split("\n"))
									buf.writeString(StringTools.trim(line));
								buf.getBytes();
							}else{
								Bytes.ofString(str);
							}
						);
						var c = macro : {
							function $name() {
								return Xml.parse(haxe.crypto.Base64.decode($v{encoded}).toString());
							}
						};
						switch(c){
							case TAnonymous(ffields):
								return fields.concat(ffields);
							default:
								throw 'unreachable';
						}
						break;
					default: 
				}
				
			}
		}
		return fields;
	}
	#end

}