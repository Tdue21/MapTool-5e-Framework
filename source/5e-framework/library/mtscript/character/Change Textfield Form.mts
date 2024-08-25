[h:macro.args=replace(macro.args,"\\n","%0A")]
[h:group=getStrProp(macro.args,"prop")]
[h:name=getStrProp(macro.args,"name")]
[h:oldName=decode(getStrProp(macro.args,"name"))]
[h:index=getStrProp(macro.args,"index")]
[h:source=getStrProp(macro.args,"source")]
[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:description=getStrProp(macro.args,"description")]
[h:customName=getStrProp(macro.args,"customName")]

[h:description=replace(description,"\\s*\$","")]

[h:id=findToken(tokenName)]

[h,if(id==""):"";switchToken(id)]

[dialog5(tokenName+" - "+name+" - Edit", "width=650; height=550; temporary=1; input=1; noframe=0"): {

<link rel="stylesheet" type="text/css" href="GitHub@Lib:Campaign">

[h: processorLink = macroLinkText("Change Textfield Form process@Lib:Character", "")]
<form action="[r:processorLink]" method="json">

<input type="submit" name="button" value="Save">[r,count(10,""):"&nbsp;"]
<input type="submit" name="cancel" value="Cancel">[r,count(10,""):"&nbsp;"]<span title="<html><h1><font size=5># Heading</h1><b>**Bold**</b> | <i>*Italic*</i> | <s>~~striketrough~~</s> | _ <u>underline</u> _ | <u>&#91;link](url)</u></html>">[r:macroLink("Help","Help@Lib:Notebook")]</span>

<input type="hidden" name="prop" value="[r:group]">
<input type="hidden" name="name" value="[r:name]">
<input type="hidden" name="customName" value="[r:customName]">
<input type="hidden" name="oldName" value="[r:oldName]">
<input type="hidden" name="index" value="[r:index]">
<input type="hidden" name="source" value="[r:source]">
<input type="hidden" name="tokenName" value="[r:tokenName]">
<input type="hidden" name="id" value="[r:id]">

<input type="text" name="title" value="[r:if(name=='new','',name)]" size="59">

<textarea name="value" cols="60" rows="30">[r:if(decode(name)=="new","",decode(description))]</textarea>

<br>






</form>

}]