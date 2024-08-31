[h:macro.args=replace(macro.args,"\\n","%0A")]
[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:prop=decode(getStrProp(macro.args,"prop"))]



[dialog5(prop+" - Edit", "width=650; height=535; temporary=1; input=1; noframe=0"): {

<link rel="stylesheet" type="text/css" href="[r:function.getCss('GitHub')]">


[h: processorLink = macroLinkText("campaign/Change Property process@this", "")]
<form action="[r:processorLink]" method="json">


<div class="div" style="margin-left: 5px">
<input type="submit" name="button" value="Save">

[r,count(10,""):"&nbsp;"]

<input type="submit" name="cancel" value="Cancel">[r,count(10,""):"&nbsp;"]<span title="<html><h1><font size=5># Heading</h1><b>**Bold**</b> | <i>*Italic*</i> | <s>~~striketrough~~</s> | _ <u>underline</u> _ | <u>&#91;link](url)</u></html>">[r:macroLink("Help","notebook/Help@this")]</span>

</div>


<textarea name="value" cols="60" rows="30">[r:decode(getLibProperty(prop,tokenName))]</textarea>

<input type="hidden" name="prop" value="[r:prop]">
<input type="hidden" name="tokenName" value="[r:tokenName]">


</form>

}]