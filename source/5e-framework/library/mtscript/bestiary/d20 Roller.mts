[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:id=findToken(tokenName)]
[h:impersonate(id)]

[h:output= function.getOutput())]
[h:output=function.AskOutput(output)]

[h:link=macroLinkText("d20 Roller process@Lib:Bestiary",output,macro.args)]

[h:execLink(link,0)]

