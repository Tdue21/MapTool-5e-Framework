[h:levelList=getStrProp(macro.args,"levelList")]
[h:prop=getStrProp(macro.args,"prop")]
[h:spellCount=getStrProp(macro.args,"spellCount")]
[h:spellCountTotal=getStrProp(macro.args,"spellCountTotal")]
[h:levelList=lower(listsort(levelList,"A"))]

[r,if(levelList==""),code:{};{
	[h:SpellsProp=getLibProperty("Spells",function.getNamespace())]
	[h:propName=prop]
	[h,if(matches(prop,".*0.*")==1):propName="Cantrips (0 Level)";""]
	[h,if(matches(prop,".*1.*")==1):propName="1st Level";""]
	[h,if(matches(prop,".*2.*")==1):propName="2nd Level";""]
	[h,if(matches(prop,".*3.*")==1):propName="3rd Level";""]
	[h,if(matches(prop,".*4.*")==1):propName="4th Level";""]
	[h,if(matches(prop,".*5.*")==1):propName="5th Level";""]
	[h,if(matches(prop,".*6.*")==1):propName="6th Level";""]
	[h,if(matches(prop,".*7.*")==1):propName="7th Level";""]
	[h,if(matches(prop,".*8.*")==1):propName="8th Level";""]
	[h,if(matches(prop,".*9.*")==1):propName="9th Level";""]
	
	<h5>[r:propName]</h5>
	
	<p><font size=3 face="sans">
	[r,count(listcount(levelList),""),code:{
	
		[h:spellName=listget(levelList,roll.count)]
		[h:description=json.get(SpellsProp,spellName)]

		<!---------------------------CAPITALIZE----------------------------->
		[h:CapitalName=capitalize(spellName)]
		[h:CapitalName=replace(CapitalName,"(?<=\\s)Of(?=\\s)","of")]
		[h:CapitalName=replace(CapitalName,"(?<=\\s)A(?=n?\\s)","a")]
		[h:CapitalName=replace(CapitalName,"(?<=\\s)Th(?=(?:e|at|ose)\\s)","th")]
		[h:CapitalName=replace(CapitalName,"'S(?=\\s)","'s")]

		<table style="margin:0px;padding:0px;padding-left:5px"><tr><td style="margin:0px;padding:0px">
	
		[r:macrolink(CapitalName,"campaign/Args Dialog@this","","prop=Spells;source=;name="+spellName+";description=;tokenName=Lib:Compendium")]

		<td align=right style="margin:0px;padding:0px">
		<font size=2 color="gray">
		[r:macrolink("add","character/Move@this","","tokenName=Lib:Compendium;description=;name="+spellName+";prop=Spells")]
		</table>

		[h:spellCount=spellCount+1]
		[h:macro.return=spellCount]

		[r:if(spellCount==floor(spellCountTotal/4),"<td width=25% valign=top>","")]
		[r:if(spellCount==floor(spellCountTotal/2),"<td width=25% valign=top>","")]
		[r:if(spellCount==floor(spellCountTotal/4)*3,"<td width=25% valign=top>","")]
	}]
}]