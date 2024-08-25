[dialog5("Manage Bestiary", "width=750; height=600; temporary=0; noframe=0; input=1"):{

<link rel="stylesheet" type="text/css" href="GitHub@Lib:Campaign">

<p class='topbar'>

[r:macroLink("Settings","Campaign Settings@Lib:Campaign")]&nbsp;
[r:macroLink("Import","Json Merge@Lib:Campaign","","macroName=Manage Bestiary;lib=Lib:Compendium;value=Bestiary")]&nbsp;
[r:macroLink("Export","Json Export@Lib:Campaign","","lib=Lib:Compendium;value=Bestiary")]&nbsp;

</p>
	
	[h:BestiaryObj=getLibProperty("Bestiary","Lib:Compendium")]

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

		[r:macroLink(CapitalName,"Viewer Frame@Lib:Bestiary","",currentNPC)]

		
		<td width=0% align=right>
		[r,if(json.type(creatureObj)=="UNKNOWN"):"test";json.toList(json.get(creatureObj,"sources"))]
		<font color=red>
		[r:macroLink("X","Delete Creature@Lib:Bestiary","",currentNPC)]
		
	}]
	
	</table>
	</table>
	[r:macroLink("+","Edit Creature@Lib:Bestiary","","creature=;prop=")]
}]