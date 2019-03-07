package uapi.ui;

import js.Browser;

typedef TimeRange = {
    start:Float,
    end:Float
}
//macro replace the internal markup SRC by function SRC(), returning data
@:build(Macros.buildInlineMarkup(["SRC"]))
class Timeline {
    var timepoints:Array<TimeRange> = [];
    var innerOffsetX:Float = 25;
    var tl:js.html.DOMElement = null;
    static var SRC = 
    <div>
        <style>
            .timeline {
                border: 1px solid black;
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;        
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
                overflow:hidden;
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
                margin: 0;
                border: 0;
            }
        </style>
        <div template="timeline_base" style="width: 100%; position:relative; padding-top: 22px;">
            <div class="timeline">
                <div id="timeline"></div>
            </div>
            <div class="caret" style="left:0;"></div>
            <div class="caret" style="right:0;"></div>
        </div>
    </div>;
    
    public function new(parent:js.html.Element, maxSelectors:Int = null, fixedLength:Float = null){
        var mal = new Mal(parent, SRC().firstChild());
        if(maxSelectors == null)
            maxSelectors = 6;
        tl = mal.addTemplate("timeline_base").getElementsByClassName("timeline")[0].firstElementChild;
        tl.addEventListener("click", function(e:js.html.MouseEvent) {
            if(e.target == tl && timepoints.length < maxSelectors){
                createTimePoint(e, fixedLength);
            }
        });
    }
    function createGrabbable(el:js.html.DOMElement, callback:js.html.MouseEvent->Bool){
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
    function updateTimePoint(tp:js.html.DOMElement, pos:TimeRange, allowOverlap:Bool, e:js.html.MouseEvent):Bool{
        switch(e.type){
            case "mousedown":   innerOffsetX = e.clientX - tp.getBoundingClientRect().left;
                                return false;
            case "mouseup":     innerOffsetX = 0; 
                                return false;
        }
        {
            var tlrect = tl.getBoundingClientRect();
            var tprect = tp.getBoundingClientRect();
            var offsetX = e.clientX - tlrect.left - innerOffsetX;
            
            var lowerLimit = 0;
            var upperLimit = tlrect.width;
            
            if(!allowOverlap)
                for(t in timepoints)
                    if(t != pos){
                        if(offsetX/tlrect.width < t.end && offsetX/tlrect.width > t.start)
                            offsetX = t.end * tl.offsetWidth;
                        if((offsetX + tprect.width)/tlrect.width > t.start && (offsetX + tprect.width)/tlrect.width < t.end)
                            offsetX = (t.start * tlrect.width) - tprect.width;
                    }

            if(offsetX < lowerLimit)
                offsetX = lowerLimit;
            if(offsetX + tprect.width > upperLimit){
                offsetX = upperLimit - tprect.width;
            }
            
            tp.style.marginLeft = '${offsetX}px';
        }
        updateTimePointText(tp, pos);
        return false;
    }

    function updateTimePointText(tp:js.html.DOMElement, tr:TimeRange){
        var label = tp.getElementsByTagName("span")[0];
        var rect = tp.getBoundingClientRect();
        var tlrect = tl.getBoundingClientRect();
        
        tr.start = ((rect.left-tlrect.left) / tlrect.width);
        label.innerHTML = untyped (tr.start * 100).toFixed(2) + "<br>";
        
        tr.end = ((rect.right-tlrect.left) / tlrect.width);
        label.innerHTML += untyped (tr.end * 100).toFixed(2);
        
        return false;
    }

    public function createTimePoint(e:js.html.MouseEvent,
                                    length:Float = null,
                                    overlap:Bool = false){
        var tp = Browser.document.createElement("div");
        var pos:TimeRange = { start:0, end:0 };
        var tlrect = tl.getBoundingClientRect();
        tp.className = "point";
        tp.tabIndex = 0;
        
        timepoints.push(pos);
        if(length != null){
            tp.style.width = '${tlrect.width * length}px';
        }else{
            // resize handle for the time point
            var hndl_r = Browser.document.createElement("div");
            hndl_r.className = "grabber";
            createGrabbable(hndl_r, e -> {
                if(e.type == "mousemove"){
                    var tprect = tp.getBoundingClientRect();
                    var size = tprect.right + (e.clientX-tprect.right + 2);
                    if(size <= tlrect.right)
                        tp.style.width = (e.clientX-tprect.left + 2) + "px";
                    else
                        tp.style.width = (tlrect.right - tprect.left) + "px";
                    updateTimePointText(tp, pos);
                }
                e.stopImmediatePropagation();
                return false;
            });
            // append it
            tp.appendChild(hndl_r);
        }
        
        // add a label to the timepoint
        var label = Browser.document.createElement("span");
        tp.appendChild(label);
        
        // make timepoint movable
        createGrabbable(tp, updateTimePoint.bind(tp, pos, overlap));

        // append it
        tl.appendChild(tp);
        tl.addEventListener("resize", updateTimePoint.bind(tp, pos, overlap));
        updateTimePoint(tp, pos, overlap, e);
    }

}