[h:macro.args=replace(macro.args,"\\n","%0A")]
[h:name=getStrProp(macro.args,"name")]
[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:description=decode(getStrProp(macro.args,"description"))]
[h:description=decode(description)]

[dialog5(tokenName+" - "+name+" - Edit", "width=650; height=550; temporary=1; input=1; noframe=0"): {

<link rel="stylesheet" type="text/css" href="lib://[r:function.getNamespace()]/css/GitHub.css">
[h: processorLink = macroLinkText("notebook/Change Form process@this", "")]
<form action="[r:processorLink]" method="json">
<div class="div" style="margin-left: 5px">
<input type="submit" name="button" value="Save">
[r,count(10,""):"&nbsp;"]
<input type="submit" name="cancel" value="Cancel">
[r,count(10,""):"&nbsp;"]
<input type="submit" name="delete" value="Delete">
[r,count(10,""):"&nbsp;"]
<span title="<html><h1><font size=5># Heading</h1><b>**Bold**</b> | <i>*Italic*</i> | <s>~~striketrough~~</s> | _ <u>underline</u> _ | <u>&#91;link](url)</u></html>">[r:macroLink("Help","Help@Lib:Notebook")]</span>
<input type="hidden" name="name" value="[r:name]">
<input type="hidden" name="tokenName" value="[r:tokenName]">
</div>

<input type="text" name="title" value="[r:if(name=='new','',name)]" size="55">
<textarea name="value" cols="54" rows="27">[r:if(decode(name)=="new","",description)]</textarea>
</form>
}]