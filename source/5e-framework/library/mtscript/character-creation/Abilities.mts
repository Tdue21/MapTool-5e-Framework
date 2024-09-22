[h:tokenName=json.get(macro.args,"tokenName")]
[h,if(findToken(tokenName)==""),code:{
	[h:start=getLibProperty("Start", function.getNamespace())]
	[h:setCurrentMap(start)]
};{}]

[h:id=findToken(tokenName)]
[h:switchToken(id)]
[h:output= function.getOutput())]
[h,if(matches(tokenName,"^Lib:.*")==1):"";tokenName="Lib:"+tokenName]

<div class="content">
	<h1>Determine Ability Scores</h1>

	<p>The main methods to determine your ability scores are Rolling 
	[r:macrolink("4d6 and dropping the lowest", "character-creation/Stat Roll@this", output,"",tokenName)] 
	for each ability, using Standard Array (<b>15, 14, 13, 12, 10, 8</b>) or spending points (usually 27) 
	to customize your ability score individually using the 
	<a href="https://www.dndbeyond.com/sources/dnd/basic-rules-2014/step-by-step-characters#AbilityScorePointCost">Ability Score Point Cost</a> 
	table, at your Dungeon Master&apos;s option.
	</p>


	<table style="margin-left:10px">
	<tr>
		<td><b>Strength:
		<td>[h:atr=getProperty("Strength")]
			[h:value=getStrProp(atr,"value")]
			<input type="text" name="Str" value="[r:value]" size="5">
		<td>[r:getStrProp(atr,"text")]
	<tr>
		<td><b>Dexterity:
		<td>[h:atr=getProperty("Dexterity")]
			[h:value=getStrProp(atr,"value")]
			<input type="text" name="Dex" value="[r:value]" size="5">
		<td>[r:getStrProp(atr,"text")]
	<tr>
		<td><b>Constitution:
		<td>[h:atr=getProperty("Constitution")]
			[h:value=getStrProp(atr,"value")]
			<input type="text" name="Con" value="[r:value]" size="5">
		<td>[r:getStrProp(atr,"text")]
	<tr>
		<td><b>Intelligence:
		<td>[h:atr=getProperty("Intelligence")]
			[h:value=getStrProp(atr,"value")]
			<input type="text" name="Int" value="[r:value]" size="5">
		<td>[r:getStrProp(atr,"text")]
	<tr>
		<td><b>Wisdom:
		<td>[h:atr=getProperty("Wisdom")]
			[h:value=getStrProp(atr,"value")]
			<input type="text" name="Wis" value="[r:value]" size="5">
		<td>[r:getStrProp(atr,"text")]
	<tr>
		<td><b>Charisma:
		<td>[h:atr=getProperty("Charisma")]
			[h:value=getStrProp(atr,"value")]
			<input type="text" name="Cha" value="[r:value]" size="5">
		<td>[r:getStrProp(atr,"text")]
	</table>
	<p>Click <b>Next</b> to continue.</p>
</div>

<input type="hidden" name="tokenName" value="[r:tokenName]">
<input type="hidden" name="window" value="Abilities">

<div class="buttons">
<button type="submit" name="submit" value="Back">&lt; Back</button>
<button type="submit" name="submit" value="Skip">Skip</button>
<button type="submit" name="submit" value="Next">Next &gt;</button>
</div>


