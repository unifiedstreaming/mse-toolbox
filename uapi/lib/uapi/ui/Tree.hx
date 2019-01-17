package uapi.ui;
import js.Browser;
@:keep
@:expose("Tree")
class Tree {
    private static inline var ID = "mse-toolbox-tree-";
    function new(data:Dynamic):Void {
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
        trace(test(obj));
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