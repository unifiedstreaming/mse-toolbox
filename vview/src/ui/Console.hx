package ui;

class Console {
    public var log:Dynamic = null;
    var element:js.html.DivElement = null;
    public function new(parent:js.html.Element) {
        element = js.Browser.document.createDivElement();
        parent.appendChild(element);
        log = Reflect.makeVarArgs(_log);
        log([1,2,3], "aap");
        
    }

    function _log(args:Array<Dynamic>){
        for(obj in args)
            switch(Type.getClassName(Type.getClass(obj))){
                default:
            }
    }
    
}
