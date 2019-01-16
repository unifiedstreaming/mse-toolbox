package uapi.ui;
import js.Browser;
@:keep
@:expose("Tree")
class Tree {
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
 
        for(f in Reflect.fields(data)){
            var el = Browser.document.createDivElement();
            var sub = Reflect.field(data, f);
            var _key = Browser.document.createDivElement();
            _key.innerText = 'Key:$f';
            el.appendChild(_key);
            switch(Type.typeof(sub)){
                
                case TObject: 
                    el.appendChild(test(sub));
                default:
                    var _value = Browser.document.createDivElement();
                    _value.innerText = 'Value:$sub';
                    el.appendChild(_value);
            }
            base.appendChild(el);
            
        }

        return base;
    }
}