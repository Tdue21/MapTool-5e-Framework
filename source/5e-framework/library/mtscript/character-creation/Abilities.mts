[h:tokenName=json.get(macro.args,"tokenName")]

[h,if(findToken(tokenName)==""),code:{

	[h:start=getLibProperty("Start", function.getNamespace())]
	[h:setCurrentMap(start)]

};{}]

[h:id=findToken(tokenName)]
[h:switchToken(id)]

[h:output= function.getOutput())]

[h,if(matches(tokenName,"^Lib:.*")==1):"";tokenName="Lib:"+tokenName]

<h1>Determine Ability Scores</h1>




<p style="margin-top: 10px; margin-bottom: 10px;">
<font style="text-decoration:none">
The main methods to determine your ability scores are Rolling [r:macrolink("4d6 and dropping the lowest", "character-creation/Stat Roll@this")output,"",tokenName)] for each ability, using Standard Array (<b>15, 14, 13, 12, 10, 8</b>) or spending points (usually 27) to customize your ability score individually using the <a href="https://media.wizards.com/2018/dnd/downloads/DnD_BasicRules_2018.pdf#page=10">Ability Score Point Cost</a> table, at your Dungeon Master’s option.
</p>


<tr>
<td valign=bottom style="padding:0px;margin=0px;margin-left:10px">


[h: processorLink=macroLinkText("character-creation/Character Creation Wizard@this","")]
<form action="[r:processorLink]" method="json">


<table style="margin-left:10px">
<tr><td>
<b>Strength:
<td>
[h:atr=getProperty("Strength")]
[h:value=getStrProp(atr,"value")]
<input type="text" name="Str" value="[r:value]" size="5">
<td>
[r:getStrProp(atr,"text")]
<tr><td>
<b>Dexterity:
<td>
[h:atr=getProperty("Dexterity")]
[h:value=getStrProp(atr,"value")]
<input type="text" name="Dex" value="[r:value]" size="5">
<td>
[r:getStrProp(atr,"text")]
<tr><td>
<b>Constitution:
<td>
[h:atr=getProperty("Constitution")]
[h:value=getStrProp(atr,"value")]
<input type="text" name="Con" value="[r:value]" size="5">
<td>
[r:getStrProp(atr,"text")]
<tr><td>
<b>Intelligence:
<td>
[h:atr=getProperty("Intelligence")]
[h:value=getStrProp(atr,"value")]
<input type="text" name="Int" value="[r:value]" size="5">
<td>
[r:getStrProp(atr,"text")]
<tr><td>
<b>Wisdom:
<td>
[h:atr=getProperty("Wisdom")]
[h:value=getStrProp(atr,"value")]
<input type="text" name="Wis" value="[r:value]" size="5">
<td>
[r:getStrProp(atr,"text")]
<tr><td>
<b>Charisma:
<td>
[h:atr=getProperty("Charisma")]
[h:value=getStrProp(atr,"value")]
<input type="text" name="Cha" value="[r:value]" size="5">
<td>
[r:getStrProp(atr,"text")]
</table>


<p style="margin-top: 10px; margin-bottom: 50px;margin-left:10px">

Click <b>Next</b> to continue.

</p>

<input type="hidden" name="tokenName" value="[r:tokenName]">
<input type="hidden" name="window" value="Abilities">


<div class="div" style="padding-left: 207px;padding-top: 13px;padding-bottom: 12px;margin:0px;" bgcolor=#D8D8D8>
<input type="submit" name="submit" value="< Back">&nbsp;
<input type="submit" name="submit" value="Skip">&nbsp;
<input type="submit" name="submit" value="Next >">
</div>


