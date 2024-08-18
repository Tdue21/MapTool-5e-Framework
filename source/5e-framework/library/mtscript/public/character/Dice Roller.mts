[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:id=findToken(tokenName)]
[h:impersonate(id)]

[h:outputPC=getLibProperty("PC Output","Lib:Character")]
[h:outputGM=getLibProperty("GM Output","Lib:Character")]

[h:output=if(isGM()==1,outputGM,outputPC)]

[h:output=function.AskOutput(output)]

[h:link=macroLinkText("Dice Roller process@Lib:Character",output,macro.args)]

[h:execLink(link,0)]
