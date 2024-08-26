[h:namespace = function.getNamespace()]
[h:toggle    = getStrProp(macro.args,"toggle")]
[h:visibility= if(toggle==0 || toggle=="","inline","none")]
[h:output    = function.getOutput()]

<!-----------------------Get Notebooks----------------------->

[h:info=getInfo("client")]
[h:libtokens=json.get(info,"library tokens")]
[h:libList=json.fields(libtokens)]
[h:list=libList]
[h,foreach(currentLib, libList, ""), code: {
	[h:settingsProp=getLibProperty("Settings",currentLib)]
	[h,if(json.type(settingsProp)=="UNKNOWN"):fields="";fields=json.fields(settingsProp)]
	[h,if(listfind(fields,"theme")>=0):"";list=listdelete(list,listfind(list,currentLib))]
}]

[h:ListNotesPC=""]
[h:maps=getAllMapNames()]
[h:ListNotesGM=list]
[h,count(listcount(maps)),code:{
	[h:map=listget(maps,roll.count)]
	[h:ownedtokens=getOwnedNames(getPlayerName(),",",map)]
	[h,count(listcount(ownedtokens)),code:{
		[h:currentOwned=listget(ownedtokens,roll.count)]
		[h:find=listfind(list,currentOwned)]
		[h,if(find==-1):"";ListNotesPC=listappend(ListNotesPC,currentOwned)]
	}]
}]
[h:ListNotes=if(isGM()==1,ListNotesGM,ListNotesPC)]
[h:ListNotes=listsort(ListNotes,"N")]

<!----------List PC Libs----------->
[h:info=getInfo("client")]
[h:libtokens=json.get(info,"library tokens")]
[h:libList=json.fields(libtokens)]

[h:list=libList]
[h,count(listcount(libList)),code:{
	[h:currentLib=listget(libList,roll.count)]
	[h:settingsProp=getLibProperty("LibName",currentLib)]
	[h,if(settingsProp==""):list=listdelete(list,listfind(list,currentLib));""]
}]
[h:ListPC=""]
[h:maps=getAllMapNames()]
[h,count(listcount(maps)),code:{

	[h:map=listget(maps,roll.count)]
	[h:ownedtokens=getOwnedNames(getPlayerName(),",",map)]
	
	[h,count(listcount(ownedtokens)),code:{
	
		[h:currentOwned=listget(ownedtokens,roll.count)]
		[h:find=listfind(list,currentOwned)]
		[h,if(find==-1):"";ListPC=listappend(ListPC,currentOwned)]
	}]
}]
[h:ListPC=listsort(ListPC,"N")]
<!----------End of List PC Libs----------->



<!----------------------Get Maps----------------------->
[h:maps=getAllMapNames()]
[h:maps=listsort(maps,"N")]
[h:visibleMaps=maps]
[h,count(listcount(maps)),code:{
	[h:map=listget(maps,roll.count)]
	[h,if(getMapVisible(map)==1):"";visibleMaps=listdelete(visibleMaps,listfind(visibleMaps,map))]
}]
[h,if(isGM()==1):maps=maps;maps=visibleMaps]
[h:maps=listsort(maps,"N")]
[h:display=getLibProperty("Display",namespace)]
[h:darkMode=getStrProp(display,"darkMode")]

[overlay("Framework Macros","zorder=4;"):{
<style>
[r:'
#hide {
	display: '+visibility+';
}
img	{
	filter:invert('+if(darkMode==1,"100%","0%")+');
}
.menu {
	width:28;
	position: relative;
	border-radius: 4px;
	border-style: solid;
	border-color: #'+if(darkMode==1,"000000","424242")+';
	border-width: 1px;
	background: #'+if(darkMode==1,"303030","eaeaea")+';
	padding: 2px;
	text-align:center;
	margin:2;
}
.menu:hover {
	background-color: #'+if(darkMode==1,"5d5d5d","c5c5c5")+';
}
.menu:hover .submenu {
	display: block;
}
.submenu {
	display: none;
	position: absolute;
	top:0;
	right:-300;
	left:30;
	text-align:left;
	padding-left:10;
}
.border {
	border-radius: 4px;
	border-style: solid;
	border-color: #'+if(darkMode==1,"000000","424242")+';
	border-width: 1px;
	background: #'+if(darkMode==1,"303030","eaeaea")+';
	padding: 2px;
	text-align:center;
}
a {
	text-decoration:none;
	color:#'+if(darkMode==1,"ffffff","000000")+';
	display: block;
}
a:hover {
	background-color: #'+if(darkMode==1,"5d5d5d","c5c5c5")+';
}
td {
	text-align:left;
}
.center {
	text-align:center;
}
td:hover {
	background-color: #'+if(darkMode==1,"5d5d5d","c5c5c5")+';
}
hr {
	border-top: 1px solid gray;
	margin:0;
	padding:0;
}']
</style>

<!-------------------Toggle------------------->
<div class="menu">
	[r:macrolink("<img style='transform: rotate("+if(toggle==0 || toggle=="","180deg","0deg")+");' src='lib://org.maptool.dnd5e/assets/icons/chevron.png'>","overlay/OverlayMiniMenu@this","","toggle="+if(toggle==0 || toggle=="",1,0))]
</div>

<div id="hide">
	<!-------------------Compendium------------------->
	<div class="menu">
		[r:macroLink("<img src='lib://org.maptool.dnd5e/assets/icons/library.png'>","tables/Tables List@this")]
		<div class="submenu">
			<table class="border">
				<tr><td>
				[r:macroLink("<img src='lib://org.maptool.dnd5e/assets/icons/library.png' width='17'>Compendium","tables/Tables List@this")]
				<hr noshade>
				<tr><td>
				[r:macroLink("<img src='lib://org.maptool.dnd5e/assets/icons/search.png' width='17'>Search","campaign/Search@this")]
			</table>
		</div>
	</div>

	<!-------------------Notebooks------------------->
	<div class="menu">
		[r:macroLink("<img src='lib://org.maptool.dnd5e/assets/icons/notebook.png'>","campaign/Notebooks@this")]
		<div class="submenu">
			<table class="border">
				<tr><td>
				[r:macroLink("<img src='lib://org.maptool.dnd5e/assets/icons/notebook.png' width='17'>New Notebook","notebook/Set Notebook@this")]
				<hr noshade>
				<tr><td>
				[r,count(listcount(ListNotes),"<tr><td>"),code:{
					[h:currentNote=listget(ListNotes,roll.count)]
					[h:visible=if(listfind(ListNotesPC,currentNote)==-1,0,1)]
					[h:CurrentName=replace(currentNote,"^Lib:","")]
					[h:settings=getLibProperty("Settings",currentNote)]
					[h:label=json.get(settings,"label")]
					[h:label=if(label=="" || label=="none","<div style='float:left;margin-right:4px;height: 15px;width: 5px;'></div>","<div style='float:left;margin-right:4px;height: 15px;width: 5px;background-color: "+label+";'></div>")]
					[r:macroLink(label+CurrentName+if(visible==0," (<b>H</b>)",""),"Notebook@"+currentNote)]
				}]
			</table>
		</div>
	</div>

	<!-------------------Player Menu------------------->
	<div class="menu">
		[r:macroLink("<img src='lib://org.maptool.dnd5e/assets/icons/person.png'>","campaign/Player Menu@this")]
		<div class="submenu">
			<table class="border">
				<tr><td>
				[r:macroLink("<img src='lib://org.maptool.dnd5e/assets/icons/person.png' width='17'>Player Menu","campaign/Player Menu@this")]
				<hr noshade>
				[r,if(ListPC==""),code:{};{
					<tr><td>
					[r:macroLink("<img src='lib://org.maptool.dnd5e/assets/icons/combat.png' width='17'>Statblock","overlay/Open PC@this","","Sheet=Statblock;ListPC="+ListPC)]
					<tr><td>
					[r:macroLink("<img src='lib://org.maptool.dnd5e/assets/icons/dnd.png' width='17'>Character","overlay/Open PC@this","","Sheet=Character Sheet;ListPC="+ListPC)]
					<tr><td>
					[r:macroLink("<img src='lib://org.maptool.dnd5e/assets/icons/notebook.png' width='17'>Description","overlay/Open PC@this","","Sheet=Description Sheet;ListPC="+ListPC)]
					<tr><td>	
					[r:macroLink("<img src='lib://org.maptool.dnd5e/assets/icons/library.png' width='17'>Spellcasting","overlay/Open PC@this","","Sheet=Spellcasting Sheet;ListPC="+ListPC)]
					<hr noshade>
				}]
	
				<tr><td>
				[r:macroLink("<img src='lib://org.maptool.dnd5e/assets/icons/add-person.png' width='17'>New PC","character-creation/Create Macros@this")]
				<tr><td>
				[r:macroLink("<img src='lib://org.maptool.dnd5e/assets/icons/setup.png' width='17'>1st Level","character-creation/Character Creation Wizard@this","","{'route':'New'}")]
				<tr><td>
				[r:macroLink("<img src='lib://org.maptool.dnd5e/assets/icons/level-up.png' width='17'>Level Up","character-creation/Character Creation Wizard@this","","{'route':'Level Up'}")]
				<hr noshade>
				<tr><td>
				[r:macroLink("<img src='lib://org.maptool.dnd5e/assets/icons/library.png' width='17'>Languages","languages/Chat Frame@this")]
			</table>
		</div>
	</div>

<!-------------------GM Menu------------------->
[r,if(isGM()==1),code:{
<div class=menu>
[r:macroLink("<img src='lib://org.maptool.dnd5e/assets/icons/dm.png'>","campaign/GM Menu@this")]
	<div class=submenu>
	<table class=border>
	<tr><td>
	[r:macroLink("<img src='lib://org.maptool.dnd5e/assets/icons/dm.png' width='17'>GM Menu","campaign/GM Menu@this")]
	<hr noshade>
	<tr><td>
	[r:macroLink("<img src='lib://org.maptool.dnd5e/assets/icons/party.png' width='17'>Manage Party","campaign/Manage Party@this")]
	<tr><td>

	[r:macroLink("<img src='lib://org.maptool.dnd5e/assets/icons/combat.png' width='17'>Encounter","bestiary/Manage Encounter@this","","tokenName=;reload=1")]
	<tr><td>

	[r:macroLink("<img src='lib://org.maptool.dnd5e/assets/icons/pin.png' width='17'>Pin Notes","character/Pin Notes@this")]
	<hr noshade>
	<tr><td>
	
	[r:macroLink("<img src='lib://org.maptool.dnd5e/assets/icons/dice.png' width='17'>Request Roll","campaign/Request Roll@this")]
	<tr><td>
	
	[r:macroLink("<img src='lib://org.maptool.dnd5e/assets/icons/monster.png' width='17'>Set NPC","bestiary/NPC Wizard@this")]
	<tr><td>
	[r:macroLink("<img src='lib://org.maptool.dnd5e/assets/icons/settings.png' width='17'>Settings","campaign/Campaign Settings@this")]
	</table>
	</div>
</div>
};{}]

<!-------------------Initiative------------------->
<div class=menu>
[r:macroLink("<img src='lib://org.maptool.dnd5e/assets/icons/combat.png'>","overlay/Initiative Render@this")]
	<div class=submenu>
	<table class=border>
	<tr><td>
	[r:macroLink("<img src='lib://org.maptool.dnd5e/assets/icons/combat.png' width='17'>Initiative Tracker","overlay/Initiative Render@this")]
	<hr noshade>
	<tr><td>
	[r:macroLink("<img src='lib://org.maptool.dnd5e/assets/icons/dice.png' width='17'>Roll Initiative","bestiary/Mass Initiative@this")]
	</table>
	</div>
</div>

<!-------------------Dice Roller------------------->
<div class=menu>
	[r:macroLink("<img src='lib://org.maptool.dnd5e/assets/icons/dice.png'>","campaign/Roll Any Dice@this","")]
	<div class=submenu>
		<table class=border width=200>
		[r,if(isGM()==1):"<tr><td colspan=5 class=center>"+macroLink("GM Output: "+output,"campaign/Quick Output@this")]
		<tr>
		<td width=50>
		[r:macroLink("1d4","campaign/Dice Roller@this","","text=Dice Roller;color=Black;value=1d4")]
		<td class=center>
		[r:macroLink("2","campaign/Dice Roller@this","","text=Dice Roller;color=Black;value=2d4")]
		<td class=center>
		[r:macroLink("3","campaign/Dice Roller@this","","text=Dice Roller;color=Black;value=3d4")]
		<td class=center>
		[r:macroLink("4","campaign/Dice Roller@this","","text=Dice Roller;color=Black;value=4d4")]
		<td class=center>
		[r:macroLink("5","campaign/Dice Roller@this","","text=Dice Roller;color=Black;value=5d4")]
		<tr>
		<td>
		[r:macroLink("1d6","campaign/Dice Roller@this","","text=Dice Roller;color=Black;value=1d6")]
		<td class=center>
		[r:macroLink("2","campaign/Dice Roller@this","","text=Dice Roller;color=Black;value=2d6")]
		<td class=center>
		[r:macroLink("3","campaign/Dice Roller@this","","text=Dice Roller;color=Black;value=3d6")]
		<td class=center>
		[r:macroLink("4","campaign/Dice Roller@this","","text=Dice Roller;color=Black;value=4d6")]
		<td class=center>
		[r:macroLink("5","campaign/Dice Roller@this","","text=Dice Roller;color=Black;value=5d6")]
		<tr>
		<td>
		[r:macroLink("1d8","campaign/Dice Roller@this","","text=Dice Roller;color=Black;value=1d8")]
		<td class=center>
		[r:macroLink("2","campaign/Dice Roller@this","","text=Dice Roller;color=Black;value=2d8")]
		<td class=center>
		[r:macroLink("3","campaign/Dice Roller@this","","text=Dice Roller;color=Black;value=3d8")]
		<td class=center>
		[r:macroLink("4","campaign/Dice Roller@this","","text=Dice Roller;color=Black;value=4d8")]
		<td class=center>
		[r:macroLink("5","campaign/Dice Roller@this","","text=Dice Roller;color=Black;value=5d8")]
		<tr>
		<td>
		[r:macroLink("1d10","campaign/Dice Roller@this","","text=Dice Roller;color=Black;value=1d10")]
		<td class=center>
		[r:macroLink("2","campaign/Dice Roller@this","","text=Dice Roller;color=Black;value=2d10")]
		<td class=center>
		[r:macroLink("3","campaign/Dice Roller@this","","text=Dice Roller;color=Black;value=3d10")]
		<td class=center>
		[r:macroLink("4","campaign/Dice Roller@this","","text=Dice Roller;color=Black;value=4d10")]
		<td class=center>
		[r:macroLink("5","campaign/Dice Roller@this","","text=Dice Roller;color=Black;value=5d10")]
		<tr>
		<td>
		[r:macroLink("1d12","campaign/Dice Roller@this","","text=Dice Roller;color=Black;value=1d12")]
		<td class=center>
		[r:macroLink("2","campaign/Dice Roller@this","","text=Dice Roller;color=Black;value=2d12")]
		<td class=center>
		[r:macroLink("3","campaign/Dice Roller@this","","text=Dice Roller;color=Black;value=3d12")]
		<td class=center>
		[r:macroLink("4","campaign/Dice Roller@this","","text=Dice Roller;color=Black;value=4d12")]
		<td class=center>
		[r:macroLink("5","campaign/Dice Roller@this","","text=Dice Roller;color=Black;value=5d12")]
		<tr>
		<td>
		[r:macroLink("1d20","campaign/Dice Roller@this","","text=Dice Roller;color=Black;value=1d20")]
		<td class=center>
		[r:macroLink("2","campaign/Dice Roller@this","","text=Dice Roller;color=Black;value=2d20")]
		<td class=center>
		[r:macroLink("3","campaign/Dice Roller@this","","text=Dice Roller;color=Black;value=3d20")]
		<td class=center>
		[r:macroLink("4","campaign/Dice Roller@this","","text=Dice Roller;color=Black;value=4d20")]
		<td class=center>
		[r:macroLink("5","campaign/Dice Roller@this","","text=Dice Roller;color=Black;value=5d20")]
		<tr>
		<td>
		[r:macroLink("1d100","campaign/Dice Roller@this","","text=Dice Roller;color=Black;value=1d100")]
		<td class=center colspan=5>
		[r:macroLink("Dice Roller","campaign/Menu process@this","","{'Dice':'1'}")]
		</table>
	</div>
</div>

<!-------------------Map------------------->
<div class=menu>
[r:macroLink("<img src='lib://org.maptool.dnd5e/assets/icons/globe.png'>","campaign/Select Map@this")]
	<div class=submenu>
	<table class=border>
	[r,if(isGM()==1):"<tr><td>"+macroLink("Weather","overlay/Weather Select@this")+"<hr noshade>";""]
	
	<tr><td>
[r,count(listcount(maps),"<tr><td>"),code:{
	[h:CurrentMap=listget(maps,roll.count)]
	[h,if(getCurrentMapName()==CurrentMap):current="<b>";current=""]
	[r:macroLink(current+CurrentMap+if(getMapVisible(CurrentMap)==1==0,"</b> (<b>H</b>)",""),"campaign/Select Map process@this","",json.fromStrProp(CurrentMap+"=overlay"))]
	
}]
	</table>
	</div>
</div>

<!-------------------Help------------------->
<div class=menu>
<a href="https://github.com/rtakehara/5e-Framework/wiki"><img src="lib://org.maptool.dnd5e/assets/icons/help.png"></a>

	<div class=submenu>
	<table class=border>
	<tr><td>
	
	<a href="https://github.com/rtakehara/5e-Framework/wiki">
	<img src="lib://org.maptool.dnd5e/assets/icons/globe.png" width="17">
	Help & Documentation</a>
	<hr noshade>
	<tr><td>
	<a href="[r:getLibProperty('RulesURL',namespace)]">
	<img src="lib://org.maptool.dnd5e/assets/icons/dnd.png" width="17">
	Game Rules</a>
	<tr><td>
	<a href="https://github.com/rtakehara/5e-Framework/issues">
	<img src="lib://org.maptool.dnd5e/assets/icons/settings.png" width="17">
	Report a Bug</a>
	</table>
	</div>

</div>


</div>

}]