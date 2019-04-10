package uapi.ui;
import js.html.HTMLCollection;
import haxe.Json;
import haxe.macro.Format;
import js.html.DOMElement;
import js.Browser;
@:keep
@:expose("Tree")
@:build(Macros.buildInlineDom(["node", "styles"]))
class Tree {
    static var node = <div onclick="if(event.target == this) this.firstElementChild.classList.toggle('collapsed'); return false;" class="::_class::" style="width: 100px;">        
        ::key::
        <section>::value::</section>
    </div>;
    static var styles = <style>
         .collapsed {
             height: 0px;
         }
         .treenode section {
             background:pink;
             overflow:hidden;
         }
        </style>;

    private static inline var ID = "mse-toolbox-tree-";
    public function new(obj:Dynamic):Void {
        obj = obj == null ? {
            aa: 1,
            bb: [ 2,3,4 ],
            cc: { 
                dd : {
                    ee: [123],
                    ff: "aa"
                }
            }
        } : obj;
        var base:js.html.DOMElement = cast Browser.document.createDivElement();
        var walk:Dynamic->js.html.DOMElement->Void = null;
        walk =  function(obj, base) {
            var sections:js.html.HTMLCollection = base.getElementsByTagName("section");
            base = (sections.length > 0 ? sections.item(0) : base);
            for(o in Reflect.fields(obj)){
                var field = Reflect.field(obj, o);
                if(!Std.is(field, Array) && !Std.is(field, String) && !Std.is(field, Bool) && !Std.is(field, Int) && !Std.is(field, Float)){
                    
                    walk(Reflect.field(obj, o), cast
                         base.appendChild(
                                          node(
                                               { _class: "treenode", 
                                                 key: '${o}',
                                                 value: ''
                                               }
                                              )
                                          )
                        );
                }else{
                    
                    base.appendChild(node({ _class: "treenode", key: '${o}', value:'${Json.stringify(field)}'}));
                }
            }
        }
        walk(obj, base);
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