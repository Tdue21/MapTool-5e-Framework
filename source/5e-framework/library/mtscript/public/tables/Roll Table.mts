[h:outputPC=getLibProperty("PC Output", "Lib:Character")]
[h:outputGM=getLibProperty("GM Output", "Lib:Character")]

[h:output=if(isGM()==1,outputGM,outputPC)]



[macro("Dice Roller process@Lib:Notebook"):macro.args]

[h:tableName=getStrProp(macro.args,"text")]

[h:entry=getTableEntry(tableName,macro.return)]

<table style="border:1px solid black;">
<tr>
<td>

[r:currentValue=json.get(entry,"value")]
[h:currentAsset=json.get(entry,"assetid")]

[r,if(currentAsset==""):"";"<img src="+currentAsset+">"]