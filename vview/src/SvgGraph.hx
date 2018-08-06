package ;
import Macros;
import haxe.crypto.Base64;
class SvgGraph {
    var buffer = [for (i in 0...350) 0.];
    var maxValue = 0.01;
    var svgmal:Mal;
    public function new(parent:js.html.Element) {
        svgmal = new Mal(parent, Xml.parse(Base64.decode(Macros.importFilesAsB64String(["svggraph.svg"], false)[0].data).toString()).firstElement());
        svgmal.addTemplate("bezier",[ "d" => "" ]);
    }

    var height = 45;
    var base = 50;
    var width = 350;
    public function updateGraph(data:Float){
        if(buffer.length > width)
            buffer.shift();
        if(data > maxValue){
            maxValue = data;
        }
        buffer.push(-data);

        var buf = [];
        var i = buffer.length -1;
        buf.push('M${width-.5},${base + ((buffer[i]/maxValue)*height)}');
        buf.push('C${width-.5},${base + ((buffer[i]/maxValue)*height)} ${width-1.5},${base + ((buffer[i-1]/maxValue)*height)} ${width-2.5},${base + ((buffer[i-2]/maxValue)*height)}');
        i = buffer.length -4;
        while(i > 0){
            buf.push('S${i+1}.5,${base + ((((buffer[i+1]+buffer[i+2])/2)/maxValue)*height)} ${(i)}.5,${base + ((buffer[i]/maxValue)*height)}');
            i--;
        }
        svgmal.updateTemplate("bezier",[ "d" => buf.join(" ") ]);
    }
}
