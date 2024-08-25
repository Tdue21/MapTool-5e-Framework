[h:output= function.getOutput())]


[macro("Dice Roller process@Lib:Notebook"):macro.args]

[h:tableName=getStrProp(macro.args,"text")]

[h:entry=getTableEntry(tableName,macro.return)]

<table style="border:1px solid black;">
<tr>
<td>

[r:currentValue=json.get(entry,"value")]
[h:currentAsset=json.get(entry,"assetid")]

[r,if(currentAsset==""):"";"<img src="+currentAsset+">"]