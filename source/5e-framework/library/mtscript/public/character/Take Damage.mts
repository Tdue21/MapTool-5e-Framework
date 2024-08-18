[h:outputPC=getLibProperty("PC Output", "Lib:Character")]
[h:outputGM=getLibProperty("GM Output", "Lib:Character")]

[h:output=if(isGM()==1,outputGM,outputPC)]

[h:link=macroLinkText("Take Damage process@Lib:Character",output,macro.args)]
[h:execLink(link)]