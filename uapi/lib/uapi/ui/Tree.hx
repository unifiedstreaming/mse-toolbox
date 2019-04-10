package uapi.ui;
import js.html.HTMLCollection;
import haxe.Json;
import js.html.DOMElement;
import js.Browser;
@:keep
@:expose("Tree")
@:build(Macros.buildInlineDom(["node", "styles"]))
class Tree extends js.html.DOMElement{
    static var node = <div onclick="if(event.target == this) this.classList.toggle('collapsed'); return false;" 
                           class="::_class::">
        ::key::
        <section>::value::</section>
    </div>;
    static var styles = <style>
         .collapsed section{
             height: 0px;
         }
         .treenode::before {
            content: '▲';
            transform: rotate(180deg);
            position: absolute;
            left: -15px;
            transition: transform 220ms ease-out;
        }
        .treenode.collapsed::before {
            transform: rotate(90deg);
        }
         .treenode {
             margin-left: 20px;
             display: flex;
             justify-content: space-between;
             position: relative;
             border-bottom: 1px solid grey;
         }
         .treenode section {
             background:honeydew;
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
            base.style.marginLeft = (100 * depth) + "px";
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