[dialog5("Manage Bestiary", "width=750; height=600; temporary=0; noframe=0; input=1"):{

<link rel="stylesheet" type="text/css" href="[r:function.getCss('GitHub)]">

<p class='topbar'>

[r:macroLink("Settings","campaign/Campaign Settings@this")]&nbsp;
[r:macrolink("Import", "campaign/Json Merge@this")"","macroName=Manage Bestiary;lib=Lib:Compendium;value=Bestiary")]&nbsp;
[r:macrolink("Export", "campaign/Json Export@this")"","lib=Lib:Compendium;value=Bestiary")]&nbsp;

</p>
	
	[h:BestiaryObj=getLibProperty("Bestiary", function.getNamespace())]

	[h:creatureList=json.fields(BestiaryObj)]

	
	[h:creatureList=listsort(creatureList,"A")]
	
	
	<h5>Monsters</h5>

	<table>
	<tr><td valign=top>
	<table>

	[h:odd=1]
	[h:repeat=listcount(creatureList)]
	[r,count(repeat,""),code:{

		[r:if(floor(repeat/3)==roll.count || floor(repeat/3*2)==roll.count,"</table><td valign=top><table>","")]
		[h:odd=if(floor(repeat/3)==roll.count || floor(repeat/3*2)==roll.count,1,odd)]

		<tr class=[r:if(odd==1,"bg","")]><td>
		[h:odd=if(odd==1,0,1)]
		
		[h:currentNPC=listget(creatureList,roll.count)]
		[h:creatureObj=json.get(BestiaryObj,currentNPC)]

<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=capitalize(currentNPC)]
[h:CapitalName=replace(CapitalName,"(?<=\\s)Of(?=\\s)","of")]
[h:CapitalName=replace(CapitalName,"(?<=\\s)A(?=n?\\s)","a")]
[h:CapitalName=replace(CapitalName,"(?<=\\s)Th(?=(?:e|at|ose)\\s)","th")]
[h:CapitalName=replace(CapitalName,"'S(?=\\s)","'s")]

		[r:macroLink(CapitalName,"bestiary/Viewer Frame@this","",currentNPC)]

		
		<td width=0% align=right>
		[r,if(json.type(creatureObj)=="UNKNOWN"):"test";json.toList(json.get(creatureObj,"sources"))]
		<font color=red>
		[r:macrolink("X", "bestiary/Delete Creature@this")"",currentNPC)]
		
	}]
	
	</table>
	</table>
	[r:macrolink("+", "bestiary/Edit Creature@this")"","creature=;prop=")]
}]