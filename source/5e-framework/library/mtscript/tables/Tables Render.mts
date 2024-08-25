[h:gameplay=getLibProperty("Gameplay",function.getNamespace())]
[h:rollNPC=getStrProp(gameplay,"rollNPC")]

[h,if(rollNPC==1):outputNPC=function.getOutput();outputNPC="none"]

<h3>Characters</h3>
<ul style="list-style-type:none; margin:0px; padding:0px;">
	[h:ListPC=function.listCharacters()]
	[r,foreach(tokenName, ListPC, ""),code:{
		<li>
		[h:tokenName=replace(tokenName,"^Lib:","")]
		[r:macroLink(tokenName,"character/Macro Frame@this","","macro=Statblock;tokenName="+tokenName)]
		</li>
	}]
	<li>
	[r,if(listCount(ListPC)==0): 
			macroLink("New Character","character/New PC Token@this");
			macroLink("<span title='New Character'>+</span>","character/New PC Token@this")
	]
	</li>							 
</ul>


<h3>Notebooks</h3>
[h:lists=function.listNotebooks()]
[h:ListNotes=json.get(lists, 0)]
[h:ListNotesPC=json.get(lists, 1)]

<ul style="list-style-type:none; margin:0px; padding:0px;">
	[r,foreach(currentNote, ListNotes, ""),code:{

		[h:settings=getLibProperty("Settings",currentNote)]
		[h:label=json.get(settings,"label")]
		[h:label=if(label=="" || label=="none",
			"width:20px;margin:0px;margin-right:1px;padding:0",
			"width:20px;border:0px solid black;background-color:"+ label+";margin-right:1px;padding:0")]
		[h:ChaNumber=json.get(settings,"ChaNumber")]
		[h:visible=if(listfind(ListNotesPC,currentNote)==-1,0,1)]

		[h:style= if(visible==0, "background-color:#e6e6e6", "")]
		
		<li>
			[r:if(visible==0, "<span style='background-color:#e6e6e6'>", "")]
			
			<span style="[r:label]">&nbsp;&nbsp;</span>
			
			<!------------------------------------BOLD/NORMAL TITLES----------------------------------------->
			[r:macroLink(replace(currentNote,"^Lib:",""),"Notebook@"+currentNote,"")]
			[h:noteValue=getLibProperty("Value",currentNote)]
			[h:chapters=json.fields(noteValue)]
			[h:chapters=listsort(chapters,"N")]

			[r:if(visible==0, "</span>", "")]
		</li>
	}]
	<li>
	[r:macroLink(if(ListNotes=="","New Notebook","+"),"notebook/Set Notebook@this")]
	</li>
</ul>


<h3>Races</h3>
[h:raceList=getLibProperty("Races", function.getNamespace())]
<ul style="list-style-type:none; margin:0px; padding:0px;">
	[r,foreach(currentRace, raceList,""),code:{
		<li>
			[r:macroLink(currentRace,"tables/Races Window@this","",currentRace)]
		</li>
	}]
</p>


<h3>Classes</h3>

[h:classesObj=getLibProperty("Classes",function.getNamespace())]
[h:classlist=json.fields(classesObj)]
[h:classlist=listsort(classlist,"a")]
<ul style="list-style-type:none; margin:0px; padding:0px;">
	[r,foreach(currentClass, classlist,""),code:{
		<li>
			[h:CapitalName=function.Capitalize(currentClass)]
			[r:macroLink(CapitalName,"tables/Class Window@this","","class="+currentClass)]
		</li>
	}]
</ul>



<h5>Backgrounds</h5>
[h:bgList=getLibProperty("Backgrounds", function.getNamespace())]
<ul style="list-style-type:none; margin:0px; padding:0px;">
	[r,foreach(currentBG, bgList,""),code:{
		<li>
			[r:macroLink(currentBG,"tables/Backgrounds Window@this","",currentBG)]
		</li>
	}]
</ul>


<h3>Equipment</h3>

[h:permissions=getLibProperty("PlayerPermission", function.getNamespace())]
[h:viewMagicItems=getStrProp(permissions,"viewMagicItems")]

<ul style="list-style-type:none; margin:0px; padding:0px;">
	<li>[r:macroLink("Weapons",          "tables/Equipment Table@this","","Weapons")]</li>
	<li>[r:macroLink("Armor",            "tables/Equipment Table@this","","Armor")]</li>
	<li>[r:macroLink("Adventuring Gear", "tables/Equipment Table@this","","Adventuring Gear")]</li>
	<li>[r:macroLink("Equipment Packs",  "tables/Equipment Table@this","","Equipment Packs")]</li>
	<li>[r:macroLink("Tools",            "tables/Equipment Table@this","","Tools")]</li>
	<li>[r:macroLink("Mounts & Vehicles","tables/Equipment Table@this","","Mounts")]</li>
	<li>[r:macroLink("Other",            "tables/Equipment Table@this","","Other")]</li>

	[r, if(viewMagicItems == 1 || isGM() == 1), code: {
		<li>
			[r:if(isGM() == 1, "<span style='background-color:#e6e6e6'>", "")]
			[r:macroLink("Magic Items","tables/Equipment Table@this","","Magic Items")]
			[r:if(isGM() == 1, "</span>", "")]
		</li>
	};{}]
</ul>


<h3>Spell Lists</h3>
[h:spellLists=getLibProperty("Spell Lists", function.getNamespace())]
[h:spellLists=listsort(spellLists,"A")]
<ul style="list-style-type:none; margin:0px; padding:0px;">
	[r,foreach(currentClass, spellLists,""),code:{
		<li>
			[r:macroLink(currentClass+" Spells","tables/Spells Window@this","",currentClass)]
		</li>
	}]
</ul>


<h3>Feats</h3>
<ul style="list-style-type:none; margin:0px; padding:0px;">
	[r:macroLink("Feats List","tables/Feats Window@this","")]
</ul>

<h3>Other Options</h3>
[h:AddFeats=getLibProperty("AdditionalFeats",function.getNamespace())]
[h:addFeatList=json.fields(AddFeats)]
[h:OtherObj="{}"]
[h:id=strfind(addFeatList,"(?!,)(.*?):(.*?)(?=,|\$)")]

[h,count(getFindCount(id)),code:{
	[h:group1=getGroup(id,roll.count+1,1)]
	[h:group2=getGroup(id,roll.count+1,2)]
	[h:currentOption=json.get(OtherObj,group1)]
	[h:currentOption=listappend(currentOption,group2)]
	[h:OtherObj=json.set(OtherObj,group1,currentOption)]
}]

[h:fields=json.fields(OtherObj)]
<ul style="list-style-type:none; margin:0px; padding:0px;">
	[r,foreach(currentOption, fields,""),code:{
		<li>
		[h:currentList=json.get(OtherObj,currentOption)]
		<!---------------------------CAPITALIZE----------------------------->
		[h:CapitalName=function.Capitalize(currentOption)]
		[r:macroLink(CapitalName,"tables/Options Window@this","",currentOption)]
		</li>
	}]
</ul>


[h:viewBestiary=getStrProp(permissions,"viewBestiary")]
[r,if(viewBestiary==1 || isGM()==1),code:{

<h3>Bestiary</h3>
<ul style="list-style-type:none; margin:0px; padding:0px;">
	<li>
		[r:if(isGM() == 1, "<span style='background-color:#e6e6e6'>", "")]
		[r:macroLink("Creature List","tables/Creature Window@this","")]
		[r:if(isGM() == 1, "</span>", "")]
	</li>	
	<li>
		[r:if(isGM() == 1, "<span style='background-color:#e6e6e6'>", "")]
		[r:macroLink("New NPC","bestiary/NPC Wizard@this",outputNPC)]
		[r:if(isGM() == 1, "</span>", "")]
	</li>
</ul>
};{}]


<h3>Maps</h3>
[h:maps=getAllMapNames()]
[h:maps=listsort(maps,"N")]
[h:visibleMaps=maps]
[h,foreach(map, maps, ""),code:{
	[h,if(getMapVisible(map)==1):"";visibleMaps=listdelete(visibleMaps,listfind(visibleMaps,map))]
}]
[h,if(isGM()==1):maps=maps;maps=visibleMaps]

<ul style="list-style-type:none; margin:0px; padding:0px;">
	[r,foreach(CurrentMap, maps,""),code:{
		<li>
			[r:if(getMapVisible(CurrentMap)==1, "", "<span style='background-color:#e6e6e6'>")]
			[r:macroLink(CurrentMap,"campaign/Select Map process@this","",json.fromStrProp(CurrentMap))]
			[r:if(getMapVisible(CurrentMap)==1, "", "</span>")]
		</li>
	}]
</ul>


<h3>Rollable Tables</h3>
[h:tableList=getTableNames()]
[h:tableblacklist=getLibProperty("blacklist",function.getNamespace())]
[h,count(listcount(tableList)),code:{
	[h:keep=listfind(tableList,listget(tableblacklist,roll.count))]
	[h,if(keep>=0):tableList=listdelete(tableList,keep)]
}]

<ul style="list-style-type:none; margin:0px; padding:0px;">
	[r,count(listcount(tableList),""),code:{
		<li>
			[h:currentTable=listget(tableList,roll.count)]
			[h:playerVisible=getTableVisible(currentTable)]
			[r,if(playerVisible==1):"";"<span style='background-color:#e6e6e6'>"]
			[r,if(playerVisible==1 || isGM()==1):macroLink(currentTable,"tables/Tables Window@this","",currentTable)]
			[r,if(playerVisible==1):"";"</span>"]
		</li>
	}]
</ul>