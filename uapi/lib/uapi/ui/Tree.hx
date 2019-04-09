package uapi.ui;
import haxe.Json;
import haxe.macro.Format;
import js.html.DOMElement;
import js.Browser;
@:keep
@:expose("Tree")
@:build(Macros.buildInlineDom(["node", "styles"]))
class Tree {
    static var node = <div onclick="this.firstElementChild.classList.toggle('collapsed');" class="::_class::" style="width: 100px;">        
        ::key::
        <section>::value::</section>
    </div>;
    static var styles = <style>
         .collapsed {
             height: 0px;
         }
         .treenode {
             background:pink;
             width: 10px;
             overflow:hidden;
         }
        </style>;

    private static inline var ID = "mse-toolbox-tree-";
    public function new(data:Dynamic):Void {
        var obj = {
            aa: 1,
            bb: [ 2,3,4 ],
            cc: { 
                dd : {
                    ee: [123],
                    ff: "aa"
                }
            }
        }
        var base = Browser.document.createDivElement();
        var walk:Dynamic->Dynamic->Void = null;
        walk =  function(obj, base) {
            for(o in Reflect.fields(obj)){
                var field = Reflect.field(obj, o);
                var subfields = Reflect.fields(field);
                
                if(!Std.is(field, Array) && !Std.is(field, String) && !Std.is(field, Bool) && !Std.is(field, Int) && !Std.is(field, Float)){
                    walk(Reflect.field(obj, o), base.firstElementChild.appendChild(node({ _class: "treenode", key: '${o}', value: ''})));
                }else{
                    base.appendChild(node({ _class: "treenode", key: '${o}', value:'${Json.stringify(field)}'}));
                }
            }
        }
        walk(obj, base);


        var xml:Xml = Xml.parse("");
        Browser.document.body.appendChild(styles({}));
        Browser.document.body.appendChild(base);
    }
    static function test(data:Dynamic):js.html.DOMElement{
        var base = Browser.document.createDivElement();
        base.className = '${ID}column';
        for(f in Reflect.fields(data)){
            var sub = Reflect.field(data, f);
            var _key = Browser.document.createDivElement();
            _key.innerText = 'key: $f';
            var el = Browser.document.createDivElement();
            el.className = '${ID}row';
            el.appendChild(_key);
            switch(Type.typeof(sub)){
                
                case TObject: 
                    el.appendChild(test(sub));
                default:
                    var _value = Browser.document.createDivElement();
                    _value.innerText = 'value: $sub';
                    el.appendChild(_value);
            }
            base.appendChild(el);
            
        }

        return base;
    }
}