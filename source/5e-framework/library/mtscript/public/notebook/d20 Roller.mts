[h:outputPC=getLibProperty("PC Output","Lib:Character")]
[h:outputGM=getLibProperty("GM Output","Lib:Character")]

[h:output=if(isGM()==1,outputGM,outputPC)]

[h:output=function.AskOutput(output)]

[h:link=macroLinkText("d20 Roller process@Lib:Notebook",output,macro.args)]

[h:execLink(link,0)]
