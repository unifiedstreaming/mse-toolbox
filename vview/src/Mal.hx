package ;
import js.html.Element;
import js.html.Node;
import js.Browser;
import Xml;

typedef GuiTemplate = {
  var name:String;
  var xml:Xml;
  var parentId:String;
  var index:Int;
};

typedef GuiElement = {
  var element:Element;
  var param:Map<String, Node>;
};

/**
 * XHTML and QuerySelector based template engine, using 'template' attributes to reserve elements for script invoking/creationg.
 **/
class Mal {
  
  private var container:Element;
  private var rootNode:Xml = null;
  private var shadowDom:Element = null;
  private var templates:Map<String, GuiTemplate> = null;
  private var addedElements:Map<String, GuiElement> = null;
  private var tempElementsCache:Map<String, {element:Element, parent:Element}> = null;
  public function new(container:Element, ?xml:Xml = null) {
    this.container = container;
    this.tempElementsCache = new Map<String, {element:Element, parent:Element}>();
    if(xml != null)
      parseGui(container, xml);
  }

  private static inline var GUI_PARSER_ATTRIBUTE:String = "data-tmpid";
  private static inline var GUI_PARSER_TEMPLATE:String = "template";
  private static inline var GUI_PARSER_TEMPLATE_PARAM:String = "param";
  
  public function getTemplate(name:String)
    return addedElements.get(name);
  
  public function updateTemplate(name:String, ?args:Map<String, String>){
    var el = addedElements.get(name);
    if(el != null){
      for(k in el.param.keys()){
        if(args.exists(k)){
          el.param.get(k).textContent = args.get(k);
        }
      }
    }else{
      throw 'template name "${name}" not added';
    }
  }
  
  public function addTemplate(name:String, ?args:Map<String, String>, ?rename:String, ?alwaysAppendLast:Bool = false, ?parentName:String = null){
    //
    //Fill templates
    //
    if(addedElements.exists(name))
      Browser.console.warn('an element with the name:$name already exists, overwriting');
    if(addedElements.exists(rename))
      Browser.console.warn('an renamed element with the name:$rename already exists, overwriting');
    
    var retval = null; //return the added (rendered) dom element
    var template = templates.get(name);
    var append = function(element:Element, parent:Element){
      var guiElement:GuiElement = { element: cast element.cloneNode(true), param: new Map<String, Node>() };
      //guiElement.element.setAttribute("param", element.getAttribute("param"));
      if(args != null){
        var mapParams = function(param){
          var paramNode:js.html.Node = cast param;
          var paramEl:js.html.Element = cast param;
          //Browser.console.log(element);
          if(paramEl != null){
            var paramName = paramEl.getAttribute(GUI_PARSER_TEMPLATE_PARAM);
            paramEl.removeAttribute(GUI_PARSER_TEMPLATE_PARAM);
            for(paramName in paramName.split(",")){
              if(StringTools.startsWith(paramName, "@")){
                var parms = ~/@(.*):(.*)/;
                if(parms.match(paramName)){
                  paramName = parms.matched(2);
                  paramNode = paramEl.getAttributeNode(parms.matched(1));  
                }
              }
              //set paraNode in map;
              guiElement.param.set(paramName, paramNode);
              if(args.exists(paramName))
                paramNode.textContent = args.get(paramName);
            }
          }
        }
        for(param in guiElement.element.querySelectorAll('*[${GUI_PARSER_TEMPLATE_PARAM}]')){
          mapParams(param);
        }
        if(guiElement.element.hasAttribute(GUI_PARSER_TEMPLATE_PARAM)){
          mapParams(guiElement.element);
        }
      }
    
      if(!alwaysAppendLast && template.index <= parent.children.length ){
        parent.insertBefore(guiElement.element, parent.children[template.index]);
      }else{
        parent.appendChild(guiElement.element);
      }
      addedElements.set(name, guiElement);

      return guiElement.element;
    }
    
    var parent = parentName == null ? null : addedElements.get(parentName).element.querySelector('*[data-tmpid="${template.parentId}"]');
    if(template != null){
      if(rename != null)
        name = rename;
        
      //reuse already serialized elements
      var el = tempElementsCache.get(template.name);
      if(el != null){
        retval = append(el.element, parent != null ? parent : el.parent);
        if(args != null){
          for(k in args.keys()){
            var el = addedElements.get(name).param.get(k);
            if(el != null){
              el.textContent = args.get(k);
            }
          }
        }
        return retval;
      }
      
      //serialize new template to DOM elements
      if(parent == null)
        parent = container.querySelector('*[data-tmpid="${template.parentId}"]');
      if(parent != null){
        //parent.removeAttribute(GUI_PARSER_ATTRIBUTE);
        
        var tempParent = shadowDom.querySelector('*[data-tmpid="${template.parentId}"]');
        if(tempParent != null){
          tempParent.innerHTML += template.xml.toString();
          //put element back in the right position
          if(tempParent.children.length > 0){
            tempElementsCache.set(template.name, {element:tempParent.lastElementChild, parent:parent});
            retval = append(tempParent.lastElementChild, parent);
          }
        } else { throw 'data-tmpid="${template.parentId}" is not in shadowDom'; }
      }else{
        throw 'data-tmpid="${template.parentId}" is not in DOMTree';
      };
    }else{
      throw 'template $name not found';
    }
    return retval;
  }
  
  /**
   * Static template engine
   **/
  public function parseGui(container:Element, rootNode:Xml):Void {
    if(rootNode.nodeType != XmlType.Element)
      throw 'expected rootNode to be an XmlType Element';
    templates = new Map<String,GuiTemplate>();
    addedElements = new Map<String, GuiElement>();
    //shake all template= elements out of the tree, into the templates array :)
    shake(rootNode);
    shadowDom = Browser.document.createDivElement();
    shadowDom.innerHTML = rootNode.toString();
    
    //Create empty template
    cleanupTemplateNodes(rootNode);

    //Render on tmp element and append to DOM
    var tmp = Browser.document.createDivElement();
    tmp.innerHTML = rootNode.toString();
    for(child in tmp.children)
      container.appendChild(tmp.removeChild(child));
    tmp = null;
    //js.Browser.console.dir(templates);  
  }

  private inline function shake(rootNode:Xml, ?index:Int = 0) : Void {
    var att = rootNode.get(GUI_PARSER_TEMPLATE);
    var count = 0;
    for(sub in rootNode.elements()){
      shake(sub, count++);
    }
    if(att != null){
      var parent = rootNode.parent;
      var uuid;
      if(parent.exists(GUI_PARSER_ATTRIBUTE)){
        uuid = parent.get(GUI_PARSER_ATTRIBUTE);
      } else {
        uuid = uapi.Utils.GenerateUUID("maluuid-");
        parent.set(GUI_PARSER_ATTRIBUTE, uuid);
      }
      var name = att;
      
      //rootNode.remove(GUI_PARSER_TEMPLATE);
      //parent.removeChild(rootNode);
      
      if(templates.exists(name))
        throw 'duplicate template name (${name}) found, aborting';
      templates.set(name, { name: name, xml: rootNode, parentId: uuid, index: index});
    }
    
  }
  
  private inline function cleanupTemplateNodes(rootNode:Xml){
    for(sub in rootNode.elements()){
      cleanupTemplateNodes(sub);
    }
    for(att in rootNode.attributes()){
      if(att == GUI_PARSER_TEMPLATE){
        rootNode.remove(GUI_PARSER_TEMPLATE);
        rootNode.parent.removeChild(rootNode);
      }
    }
  }
  
 
}