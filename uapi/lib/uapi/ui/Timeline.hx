package uapi.ui;

import js.Browser;
@:build(Macros.buildInlineMarkup(["SRC"]))
class Timeline {
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
    
    public function new(){
        var mal = new Mal(js.Browser.document.body, SRC().firstChild());
        js.Browser.console.log(mal.addTemplate("timeline_base"));
    }
}