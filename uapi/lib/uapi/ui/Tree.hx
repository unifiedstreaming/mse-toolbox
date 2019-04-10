package uapi.ui;
import js.html.HTMLCollection;
import haxe.Json;
import js.html.DOMElement;
import js.Browser;
@:keep
@:expose("Tree")
@:build(Macros.buildInlineDom(["node", "styles"]))
class Tree extends js.html.DOMElement{
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
    public static function create(obj:Dynamic):js.html.DOMElement {
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
        var walk:Dynamic->js.html.DOMElement->?Int->Void = null;
        var maxDepth = 3;
        walk =  function(obj, base, ?depth=0) {
            var sections:js.html.HTMLCollection = base.getElementsByTagName("section");
            base = (sections.length > 0 ? sections.item(0) : base);
            var fields = Reflect.fields(obj);
            var cls = Type.getClass(obj);
            if(depth > maxDepth)
                return;
            if(cls != null)
                fields = fields.concat(Type.getInstanceFields(cls));
            for(o in fields){
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
                                          ),
                        depth++);
                }else{
                    
                    base.appendChild(node({ _class: "treenode", key: '${o}', value:'${Json.stringify(field)}'}));
                }
            }
        }
        walk(obj, base);
        Browser.document.body.appendChild(styles({}));
        return base;
    }
}