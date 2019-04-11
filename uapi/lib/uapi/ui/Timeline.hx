package uapi.ui;

import js.html.DivElement;
import js.Browser;

typedef TimePoint = {
    updateTimePoint:Float->Void,
    pos:TimeRange,
    el:DivElement,
    delete:Void->Void
}

typedef TimeRange = {
    start:Float,
    end:Float,
    duration:Float
}
//macro replace the internal markup SRC by function SRC(), returning data
/**
 * Usage from javascript:
 * 
 * window.tl = new uapi.timeline(timelinecontainer, 230, 3, function(){
 *     console.dir(arguments); return JSON.stringify(arguments);
 * }, true, 15);
 * tl.createTimePoint(0);
 * 
 */
@:build(Macros.buildInlineMarkup(["SRC"]))
class Timeline {
    static var dragging = false;
    var timepoints:Array<TimePoint> = [];
    var innerOffsetX:Float = null;
    var updateTextCb:TimeRange->String = null;
    var resizable:Bool = null;
    var defaultLength:Float = null;
    var timelineLength:Float = null;
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
                border-left: 1px solid black;
                border-right: 1px solid black;
                transition: opacity 100ms ease;
                z-index: 1;
            }
            .point .grabber {
                position:absolute;
                right:0px;
                width:9px;
                height:100%;
            }
            .point::after{
                content:"▼";
                position:absolute;
                left: -7px;
                top: -17px;
            }
            .point:hover .point{
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
            .tfield{
                position:absolute;
            }
        </style>
        <div template="timeline_base" style="width:100%;position:relative;padding-top: 24px;padding-bottom: 24px;">
            <div class="timeline">
                <div id="timeline"></div>
            </div>
            <div class="caret" style="left:0;"></div>
            <div class="caret" style="right:0;"></div>
            <div class="tfield" style="left:6px;">00:00:00</div>
            <div class="tfield" style="right:6px;">00:00:00</div>
        </div>
    </div>;
    
    public function new(parent:js.html.Element, timelineLength:Float, maxSelectors:Int = null, updateTextCb:TimeRange->String = null, resizable:Bool = false, defaultLength:Int = 15){
        var mal = new Mal(parent, SRC().firstChild());
        this.updateTextCb = updateTextCb;
        this.resizable = resizable;
        this.defaultLength = defaultLength;
        this.timelineLength = timelineLength;
        if(maxSelectors == null)
            maxSelectors = 6;
        tl = mal.addTemplate("timeline_base").getElementsByClassName("timeline")[0].firstElementChild;
        tl.addEventListener("click", function(e:js.html.MouseEvent) {
            if(!dragging && e.target == tl && timepoints.length < maxSelectors){
                var tlrect = tl.getBoundingClientRect();
                createTimePoint(e.clientX - tlrect.left - innerOffsetX, defaultLength);
            }
        });
        
        
        js.Browser.window.addEventListener("resize", function(e:Dynamic){
            var tlrect = tl.getBoundingClientRect();
            for(t in timepoints){
                t.el.style.width = '${tlrect.width/timelineLength * t.pos.duration}px';
                updateTimePoint(t.el, t.pos, false, tlrect.width * (t.pos.start/timelineLength), false);
            }
        });
        var tlrect = tl.getBoundingClientRect();
        this.innerOffsetX = ((this.defaultLength/timelineLength) * tlrect.width)/2;
    }

    function createGrabbable(el:js.html.DOMElement, callback:js.html.MouseEvent->Bool){
        var window = Browser.window;
        uapi.JsUtils.AddEventListeners(el, ["mouseleave", "mouseover", "mousedown", "mouseup"], function(e:js.html.MouseEvent){
            if(e.type == "mousedown"){
                dragging = true;
                el.style.cursor = "grabbing";
                window.addEventListener("mouseup", function(e){
                    el.style.cursor = "grab";
                    window.removeEventListener("mousemove", callback);
                    callback(e);
                    return false;
                }, { once:true });
                window.addEventListener("mousemove", callback);
            }
            if(e.type == "mouseup"){
                dragging = false;
                return false;
            }
            callback(e);
            return false;
        });
    }

    function updateTimePoint(tp:js.html.DOMElement, pos:TimeRange, allowOverlap:Bool, offsetX:Float, updateStart:Bool = true) {
        var tlrect = tl.getBoundingClientRect();
        var tprect = tp.getBoundingClientRect();
        
        var lowerLimit = 0;
        var upperLimit = tlrect.width;
        if(!allowOverlap)
            for(t in timepoints)
                if(t.pos != pos){
                    var trect = t.el.getBoundingClientRect();
                    if(offsetX < trect.right - tlrect.left && offsetX > trect.left - tlrect.left){
                        offsetX = trect.right - tlrect.left;
                        break;
                    }
                    if((offsetX + innerOffsetX + tprect.width) > trect.left - tlrect.left && (offsetX + innerOffsetX  + tprect.width) < trect.right - tlrect.left){
                        offsetX = trect.left - tprect.width - tlrect.left;
                        break;
                    }
                }

        if(offsetX < lowerLimit)
            offsetX = lowerLimit;
        if(offsetX + tprect.width > upperLimit){
            offsetX = upperLimit - tprect.width;
        }
        if(pos.duration < timelineLength){
            tp.style.marginLeft = '${offsetX}px';
            updateTimePointData(tp, pos, updateStart);
        }
    }

    function updateTimePointData(tp:js.html.DOMElement, tr:TimeRange, updateStart:Bool = true){
        var label = tp.getElementsByTagName("span")[0];
        var rect = tp.getBoundingClientRect();
        var tlrect = tl.getBoundingClientRect();
        
        if(updateStart)
            tr.start = ((rect.left-tlrect.left) / tlrect.width) * timelineLength;
        
        tr.end = tr.start + tr.duration;
        //snapping output
        if(timelineLength - tr.end < .33){
            if(updateStart)
                tr.start = timelineLength - tr.duration;
            
            tr.end = timelineLength;
            tr.duration = tr.end - tr.start;
        }
        
        if(updateTextCb != null)
            label.innerHTML = updateTextCb(tr);
        else{
            label.innerHTML = untyped (tr.start).toFixed(2) + "<br>";
            label.innerHTML += untyped (tr.end).toFixed(2);
        }
        return false;
    }
    
    public function createTimePoint(start:Float,
                                    length:Float = null,
                                    overlap:Bool = false){
        if(length == null)
            length = defaultLength;
        var tp = Browser.document.createDivElement();
        var pos:TimeRange = { start: start, end: length, duration: length };
        var tlrect = tl.getBoundingClientRect();
        tp.className = "point";
        tp.tabIndex = 0;
        
        timepoints.push({ pos:pos,
                          el: tp,
                          updateTimePoint:updateTimePoint.bind(tp, pos, overlap),
                          delete: deleteTimePoint.bind(pos)
                        });

        tp.style.width = '${tlrect.width/timelineLength * length}px';

        if(resizable){
            var hndl_r = Browser.document.createElement("div");
            hndl_r.className = "grabber";
            createGrabbable(hndl_r, e -> {
                var tlrect = tl.getBoundingClientRect();
                if(e.type == "mousedown"){
                    var hndl_rect = hndl_r.getBoundingClientRect();
                    innerOffsetX = hndl_rect.width - (e.clientX - hndl_rect.left);
                }
                if(e.type == "mousemove"){
                    var tprect = tp.getBoundingClientRect();
                    var size = tprect.right + (e.clientX+innerOffsetX-tprect.right);
                    if(size <= tlrect.right){
                        tp.style.width = (e.clientX-tprect.left+innerOffsetX) + "px";
                        pos.end = ((e.clientX-tlrect.left+innerOffsetX) / tlrect.width) * timelineLength;
                        pos.duration = pos.end - pos.start;
                    }
                    updateTimePointData(tp, pos, false);
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
        createGrabbable(tp, function(e){
            var tlrect = tl.getBoundingClientRect();
            switch(e.type){
                case "mousedown":   innerOffsetX = e.clientX - tp.getBoundingClientRect().left;
                                    return false;
                case "mouseup":     innerOffsetX = 0; 
                                    return false;
                case "mousemove":   var offsetX = e.clientX - tlrect.left - innerOffsetX;
                                    updateTimePoint(tp, pos, overlap, offsetX);
            }
            
            e.stopImmediatePropagation();
            return false;
        });

        // append it
        tl.appendChild(tp);
        
        updateTimePoint(tp, pos, overlap, (start / timelineLength) * tlrect.width, false);

        return updateTimePoint.bind(tp, pos, overlap);
    }

    private function deleteTimePoint(pos){
        for(o in timepoints){
            if(o.pos == pos){
                timepoints.remove(o);
                o.el.parentElement.removeChild(o.el);
                break;
            }
        }
    }

    @:keep
    public function updateLabel(text:String, left_right:String = "right"){
        var field = tl.parentElement.parentElement.getElementsByClassName("tfield")[left_right == "right" ? 1 : 0];
        field.innerHTML = text;
    }
}