[h:macro.args=replace(macro.args,"\\n","%0A")]
[h:group=getStrProp(macro.args,"group")]
[h:name=getStrProp(macro.args,"name")]
[h:tokenName=getStrProp(macro.args,"tokenName")]

[h:description=getStrProp(macro.args,"description")]
[h:description=replace(description,"\\+","PLUSPLACEHOLDER")]
[h:description=decode(description)]
[h:description=replace(description,"PLUSPLACEHOLDER","+")]
[h:description=replace(description,"SEMICOLONPLACEHOLDER",";")]

[h:id=findToken(tokenName)]
[h:switchToken(id)]

[dialog5(tokenName+" - "+name+" - Edit", "width=650; height=550; temporary=1; input=1; noframe=0"): {

<link rel="stylesheet" type="text/css" href="[r:function.getCss('GitHub')]">

[h: processorLink = macroLinkText("bestiary/Change Form process@this", "")]
<form action="[r:processorLink]" method="json">

    <input type="submit" name="button" value="Save">[r,count(10,""):"&nbsp;"]
    <input type="submit" name="cancel" value="Cancel">[r,count(10,""):"&nbsp;"]
    <input type="submit" name="delete" value="Delete">[r,count(10,""):"&nbsp;"]
    <span>
<!-- title="<html>
<h1><font size=5># Heading</h1>
<b>**Bold**</b> | 
<i>*Italic*</i> | 
<s>~~striketrough~~</s> | 
_ <u>underline</u> _ | 
<u>&#91;link](url)</u></html>">
-->
    [r:macroLink("Help","notebook/Help@this")]</span>

    <input type="hidden" name="prop" value="[r:group]">
    <input type="hidden" name="name" value="[r:name]">
    <input type="hidden" name="tokenName" value="[r:tokenName]">

    <input type="text" name="title" value="[r:if(name=='new','',name)]" size="59">

    <textarea name="value" cols="60" rows="30">[r:if(decode(name)=="new","",description)]</textarea>
</form>
}]