package ui;
import js.Browser;
import JsUtils;
import js.html.DivElement;
import js.html.MutationObserver;
import js.html.MutationRecord;
typedef Window_Position = {x:Float, y:Float};
typedef Window_Dimensions = {width:Int, height:Int};

enum WindowType {
    MAINWINDOW();
    STANDARD(title:String, ?pos:Window_Position, ?size:Window_Dimensions );
    CLOSEABLE(title:String, ?pos:Window_Position, ?size:Window_Dimensions );
}

class UIManager {
    private static inline var DEFAULT_WIDTH = 710;
    private static inline var DEFAULT_HEIGHT = 540;
    private static inline var TOPBAR_HEIGHT = 15;

    private static inline var BASE_INDEX = 0;
    var activeWindows:Array<Dynamic> = [];

    public function new (){
        JsUtils.addStyleSheet('
        .mse_frame {
            z-index: ${BASE_INDEX};
            resize: both;
            overflow: auto;
            min-height: ${TOPBAR_HEIGHT}px;
            will-change: transform;
            display: flex;
            justify-content: stretch;
            flex-direction: column;
            position: absolute;
            width: ${DEFAULT_WIDTH}px;
            height: ${DEFAULT_HEIGHT}px;
            max-width: 100%;
            max-height: 100%;
            background: rgba(248, 248, 255, 0.8);
            border: 1px inset black;
             box-shadow: 0px 0px 3px;
            transition: box-shadow 60ms ease-in;
        }
        .mse_frame:focus {
            outline-width: 1px;
            outline-style: solid;
            outline-color: grey;
            z-index: 1;
            box-shadow: 0px 5px 15px;
        }
        .mse_frame_close {
            width: 10px;
            height: 10px;
            float: left;
            background: whitesmoke;
            margin: 2px;
            border: 1px inset black;
            transition: background-color 100ms cubic-bezier(0, 0.44, 0, 1.29);
            text-indent: 1.5px;
            color: black;
            line-height: 8px;
            font-size: 100%;
        }
        .mse_frame_close:hover {
            background:darkgrey;
            
        }
    ', false);
    }

    @:keep
    public function addWindow(?title = 'window', ?x = 0, ?y = 0, ?width = DEFAULT_WIDTH, ?height = DEFAULT_HEIGHT, ?windowType:WindowType = null, ?append:Bool = true) {
        //windowType = CLOSEABLE("aal",  { x: 0, y: 0 }, { width:123, height:123 });
        return createWindow(windowType != null ? windowType : CLOSEABLE(title, { x: x, y: y }, { width:width, height:height }));
    }
    
    /**
    * Create a draggable window to show off the debug stats.
    **/
    private function createWindow(?windowType:WindowType = null):DivElement{
        var pos:Window_Position = { x: 0, y:0 };
        var size:Window_Dimensions =  { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT };
        var title:String = null;

        switch(windowType){
            case MAINWINDOW | null:
            case STANDARD(t, p, s) | CLOSEABLE(t, p, s): title = t; if(p != null) pos = p; if(s != null) size = s;
        }
         
        var im = Macros.importFilesAsB64String(["res/unified-streaming-logo.png"], false);
        var image = Browser.document.createImageElement();
        image.src = 'data:image/png;base64,${im[0].data}';
        JsUtils.setCSSStyles(image.style, [ "height" => '${TOPBAR_HEIGHT}px', "float" => "right" ]);

        var div = Browser.document.createDivElement();
        JsUtils.setCSSStyles(div.style, [
            'width' => '${size.width}px',
            'height' => '${size.height}px'
        ]);
        
        div.setAttribute('tabindex', '${ 1 + activeWindows.length }');
        div.classList.add("mse_frame");

        div.draggable = true;
        div.setAttribute("draggable", "true");
        var topbar = Browser.document.createDivElement();
        JsUtils.setCSSStyles(topbar.style, [
            "background"              => "grey",
            "color"                   => "whitesmoke",
            "fontFamily"              => "sans-serif",
            "fontSize,textIndent"     => ".7em",
            "padding"                 => "1px",
            "minWidth"                => "200px",
            "zIndex"                  => '1'
        ]);

        topbar.innerText = null != title ? title : 'USP MSE Debugger: ${Macros.GetBuildHost()}, ${Macros.GetGitShortHead()}';
        topbar.appendChild(image);

        topbar.style.cursor = 'pointer';

        var toggle = false;
        var height = size.height;
        topbar.addEventListener('click', function(_){
            div.style.height = (toggle = !toggle) ? '${TOPBAR_HEIGHT}px' : '${height}px';
        });
        var startPos:{ y:Float, x:Float } = { y: 0, x:0 };
        var offset:{ y:Float, x:Float }   = pos;
        var mmHandler = function(e){
            offset.y = e.clientY - startPos.y;
            offset.x = e.clientX - startPos.x;
            div.style.transform = 'translate(${offset.x}px, ${offset.y}px)';
        };
        div.style.transform = 'translate(${offset.x}px, ${offset.y}px)';

        var dragImgEl = Browser.document.createImageElement();
        dragImgEl.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        div.addEventListener("dragstart", function(e:js.html.DragEvent){
            //firefox fucks up the drag event handler (no mouse coordinates??)
            //so 'dragover' is used on root level inplace of div.addEventListener("drag", function(e){});
            Browser.document.addEventListener("dragover", mmHandler);
            //firefox also fucks up draggable=true, as its not doing anything unless 'dataTransfer' property is set to the event:
            e.dataTransfer.setData('text/plain', "dummy");
            e.dataTransfer.setDragImage(dragImgEl, 0, 0);
            startPos.y = e.clientY - offset.y;
            startPos.x = e.clientX - offset.x;
        });

        function moveToFront(el:haxe.extern.EitherType<js.html.Element, js.html.EventTarget>){
            var windowIndex = activeWindows.indexOf(el);
            if(-1 != windowIndex){
                activeWindows.push(activeWindows.splice(windowIndex, 1)[0]);
                for(i in 0...activeWindows.length)
                    activeWindows[i].style.zIndex = 1 + BASE_INDEX + i;
            }
        }

        div.addEventListener("mousedown", function(e:js.html.MouseEvent){
            moveToFront(e.currentTarget);
        });

        div.addEventListener("drop", function(e:js.html.DragEvent){
            e.preventDefault();
        });

        div.addEventListener("dragend", function(e:js.html.DragEvent){
            Browser.document.removeEventListener("dragover", mmHandler);        
        });

        if(windowType.match(WindowType.CLOSEABLE(title))){
            var close:DivElement = Browser.document.createDivElement();
            close.classList.add("mse_frame_close");
            close.innerText = '\u{00d7}';
            topbar.insertBefore(close, topbar.childNodes[0]);
            var remove = function()
                div.parentElement.removeChild(div);
            
            div.onkeyup = function(e:js.html.KeyboardEvent)
                if(e.keyCode == 27) remove();
            close.onclick = function()
                remove();
        }

        var observer = new MutationObserver(function(mutationsList:Array<MutationRecord>, observer:MutationObserver){
            for(m in mutationsList){
                switch(m.type){
                    case 'attributes': 
                        if(!toggle && m.attributeName == 'style')
                            height = div.clientHeight;
                }
            }
        });
        observer.observe(div, { attributes: true });
        //observer.disconnect();
        

        div.appendChild(topbar);

        if(!windowType.match(WindowType.MAINWINDOW)){
            activeWindows.push(div);
        }

        moveToFront(div);
        
        return div;
    }
    
}
