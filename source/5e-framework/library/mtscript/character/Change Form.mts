[h:macro.args=replace(macro.args,"\\n","%0A")]
[h:group=getStrProp(macro.args,"prop")]
[h:name=getStrProp(macro.args,"name")]
[h:oldName=decode(getStrProp(macro.args,"name"))]
[h:index=getStrProp(macro.args,"index")]
[h:source=getStrProp(macro.args,"source")]
[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:description=getStrProp(macro.args,"description")]
[h:customName=getStrProp(macro.args,"customName")]

<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=capitalize(name)]
[h:CapitalName=replace(CapitalName,"(?<=\\s)Of(?=\\s)","of")]
[h:CapitalName=replace(CapitalName,"(?<=\\s)A(?=n?\\s)","a")]
[h:CapitalName=replace(CapitalName,"(?<=\\s)Th(?=(?:e|at|ose)\\s)","th")]
[h:CapitalName=replace(CapitalName,"'S(?=\\s)","'s")]

[h:compendium=getLibProperty(group, function.getNamespace())]

[h,if(json.type(compendium)=="UNKNOWN"):compendium="{}"]
[h:item=json.get(compendium,name)]
[h,if(json.type(item)=="UNKNOWN"):item="{}"]
[h:description=encode(json.get(item,"description"))]
[h:sources=json.toList(json.get(item,"sources"))]


[h:description=replace(description,"\\s*\$","")]


[h:id=findToken(tokenName)]

[h,if(id==""):"";switchToken(id)]

[dialog5(tokenName+" - "+CapitalName+" - Edit", "width=650; height=550; temporary=1; input=1; noframe=0"): {
<!DOCTYPE html>
<html>
<head> 
    <link rel="stylesheet" type="text/css" href="[r:function.getCss('GitHub')]">
</head>
<body>
    [h: processorLink = macroLinkText("character/Change Form process@this", "")]
    <form action="[r:processorLink]" method="json">
        <input type="submit" name="button" value="Save">[r,count(2,""):"&nbsp;"]
        <input type="hidden" name="prop" value="[r:group]">
        <input type="hidden" name="name" value="[r:name]">
        <input type="hidden" name="customName" value="[r:customName]">
        <input type="hidden" name="oldName" value="[r:oldName]">
        <input type="hidden" name="index" value="[r:index]">
        <input type="hidden" name="source" value="[r:source]">
        <input type="hidden" name="tokenName" value="[r:tokenName]">
        <input type="hidden" name="id" value="[r:id]">

        <input type="submit" name="cancel" value="Cancel">[r,count(10,""):"&nbsp;"]<span title="<html><h1><font size=5># Heading</h1><b>**Bold**</b> | <i>*Italic*</i> | <s>~~striketrough~~</s> | _ <u>underline</u> _ | <u>&#91;link](url)</u></html>">[r:macroLink("Help","notebook/Help@this")]</span>[r,count(11,""):"&nbsp;"]Sources: <input type="text" name="sources" value="[r:sources]" size="28">
        <input type="text" name="title" value="[r:if(name=='new','',CapitalName)]" size="55">

        <textarea name="value" cols="55" rows="27">[r:if(decode(name)=="new","",decode(description))]</textarea>
    </form>
</body>
</html>
}]