package uapi.ui;

import js.Browser;
@:build(Macros.buildInlineMarkup(["SRC"]))
class Timeline {
    var innerOffsetX:Float = 25;
    static var aap = { aap: 1 };
    static var SRC = 
        <div>
            <style>
                .timeline {
                    border: 1px solid black;
                }
                .timeline #timeline {
                    background:lightgrey;
                    width: 100%;
                    height: 50px;
                    cursor: pointer;
                    font-family: monospace;
                    font-stretch: extra-condensed;
                    box-shadow: inset 0 0px 1em 0.1em #00000066;
                }
                .timeline .point {
                    position: absolute;
                    cursor: grab;
                    width: 50px;
                    height: inherit;
                    background: whitesmoke;
                    opacity: .86;
                    overflow:hidden;
                    border-left: 1px solid black;
                    border-right: 1px solid black;
                    transition: opacity 100ms ease;
                }
                .point .grabber {
                    position:absolute;
                    right:0px;
                    width:9px;
                    height:100%;
                }
                .point:hover {
                    opacity: 1.0;
                }
                .point:focus {
                    outline-width: 1px;
                    outline-style: dashed;
                    outline-color: red;
                }
                .grabber:hover {
                    background:crimson;
                    opacity: .8;
                }
                .point span {
                    font-size: 10px;
                    user-select: none;
                    text-align: center;
                    user-select: none;
                }
                .caret {
                    top: 0;
                    position: absolute;
                    width: 1px;
                    height: 100px;
                    background: red;
                }
            </style>
            <div template="timeline_base" style="width: 500px; position:relative; padding-top: 22px;">
                <div class="timeline">
                    <div id="timeline"></div>
                </div>
                <div class="caret" style="left:0;"></div>
                <div class="caret" style="right:0;"></div>
            </div>
        </div>;
    
    var tl:js.html.DOMElement = null;
    public function new(parent:js.html.Element){
        var mal = new Mal(parent, SRC().firstChild());
        tl = mal.addTemplate("timeline_base").getElementsByClassName("timeline")[0].firstElementChild;
        tl.addEventListener("click", function(e:js.html.MouseEvent) {
            if(e.target == tl){
                createTimePoint(tl, e);
            }
        });
    }
    public function createGrabbable(el:js.html.DOMElement, callback:js.html.MouseEvent->Bool){
        var window = Browser.window;
        el.addEventListener("mousedown", function(e){
            el.style.cursor = "grabbing";
            window.addEventListener("mouseup", function(e){
                el.style.cursor = "grab";
                window.removeEventListener("mousemove", callback);
                callback(e);
                return false;
            }, { once:true });
            window.addEventListener("mousemove", callback);
            callback(e);
            return false;
        });
    }
    function updateTimePoint(tp:js.html.DOMElement, e:js.html.MouseEvent):Bool{
        switch(e.type){
            case "mousedown":   innerOffsetX = e.clientX - tp.getBoundingClientRect().left;
                                return false;
            case "mouseup":     innerOffsetX = 0; 
                                return false;
        }
        {
            var rect = tl.getBoundingClientRect();
            var offsetX = e.clientX - rect.left - innerOffsetX;
            
            if(offsetX <= 0)
                offsetX = 0;
            if(offsetX + tp.offsetWidth >= tl.offsetWidth)
                offsetX = tl.offsetWidth - tp.offsetWidth;
            tp.style.marginLeft = '${offsetX}px';
        }
        updateTimePointText(tp);
        return false;
    }

    function updateTimePointText(tp:js.html.DOMElement){
        var label = tp.getElementsByTagName("span")[0];
        var rect = tp.getBoundingClientRect();
        var tlrect = tl.getBoundingClientRect();
        var perc = ((rect.left-tlrect.left) / tl.offsetWidth)*100;
        if(perc < 0)
            perc = 0;
        label.innerHTML = untyped perc.toFixed(2) + "<br>";

        var perc = ((rect.right-tlrect.left) / tl.offsetWidth)*100;
        if(perc < 0)
            perc = 0;
        
        label.innerHTML += untyped perc.toFixed(2);
        return false;
    }

    public function createTimePoint(parent:js.html.DOMElement, e:js.html.MouseEvent){
        
        var tp = Browser.document.createElement("div");
        tp.className = "point";
        tp.tabIndex = 0;
        var hndl_r = Browser.document.createElement("div");
        hndl_r.className = "grabber";
        createGrabbable(hndl_r, e -> {
            if(e.type == "mousemove"){
                var rect = tp.getBoundingClientRect();
                if(rect.right <= tl.getBoundingClientRect().right)
                    tp.style.width = (e.clientX-rect.left + 2.5) + "px";
                else
                    tp.style.width = (tl.getBoundingClientRect().right - rect.right) + "px";
                updateTimePointText(tp);
            }
            e.stopImmediatePropagation();
            return false;
        });
        tp.appendChild(hndl_r);

        var label = Browser.document.createElement("span");
        tp.appendChild(label);
        
        
        createGrabbable(tp, updateTimePoint.bind(tp));
        parent.appendChild(tp);
        updateTimePoint(tp, e);
    }

}