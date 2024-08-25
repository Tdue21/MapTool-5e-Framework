[h:gameplay=getLibProperty("Gameplay",function.getNamespace())]
[h:rollNPC=getStrProp(gameplay,"rollNPC")]

[h,if(rollNPC==1):outputNPC=function.getOutput();outputNPC="none"]

<h5>Characters</h5>

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
[h,if(isGM()==1),count(listcount(maps)),code:{
[h:ListPC=list]
};{

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
<p>
[r,count(listCount(ListPC),"<br>"),code:{

	[h:tokenName=listget(ListPC,roll.count)]
	[h:tokenName=replace(tokenName,"^Lib:","")]

	[r:macroLink(tokenName,"character/Macro Frame@this","","macro=Statblock;tokenName="+tokenName)]

}]
[r,if(listCount(ListPC)==0): macroLink("New Character","character/New PC Token@this");"<br>"+
                             macroLink("<span title='New Character'>+</span>","character/New PC Token@this")]
</p>


<h5>Notebooks</h5>

[h:info=getInfo("client")]
[h:libtokens=json.get(info,"library tokens")]
[h:libList=json.fields(libtokens)]

[h:list=libList]
[h,count(listcount(libList)),code:{
	[h:currentLib=listget(libList,roll.count)]
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
<table style="margin:0px;padding:0px;">
[r,count(listcount(ListNotes),""),code:{

	[h:currentNote=listget(ListNotes,roll.count)]

	[h:settings=getLibProperty("Settings",currentNote)]
	[h:label=json.get(settings,"label")]
	[h:label=if(label=="" || label=="none","<td width=5 style='margin:0px;margin-right:1px;padding:0'>","<td width=5 style='border:0px solid black;background-color:"+ label+";margin-right:1px';padding:0>")]

	[h:ChaNumber=json.get(settings,"ChaNumber")]

	[h:visible=if(listfind(ListNotesPC,currentNote)==-1,0,1)]

	
	<tr>
	[r:label]<td style="margin:0px;padding:0px;">
	[r,if(visible==0):"<span style='background-color:#e6e6e6'>"]
		<!------------------------------------BOLD/NORMAL TITLES----------------------------------------->
	[r:macroLink(replace(currentNote,"^Lib:",""),"Notebook@"+currentNote,"")]

	[h:noteValue=getLibProperty("Value",currentNote)]
	[h:chapters=json.fields(noteValue)]
	[h:chapters=listsort(chapters,"N")]

	<!------------------------------------HIDE/SHOW NOTEBOOK CONTENT----------------------------------------->
	[h,count(listCount(chapters),"<br>"),code:{
		[r:if(roll.count==0,"<br>","")]
		[h:currentChapter=listget(chapters,roll.count)]

		[h:jsonValue=json.get(noteValue,currentChapter)]

		[h,if(ChaNumber==0):chapterName=replace(currentChapter,"^.*?\\d.*?\\s","");chapterName=currentChapter]
		
		[r:macroLink(chapterName,"notebook/Content@this","","key="+currentChapter+";description="+encode(jsonValue)+";tokenName="+currentNote)]
	
	}]
	[r,if(visible==0):"</span>"]
	

}]</table>
<p>
[r:macroLink(if(ListNotes=="","New Notebook","+"),"notebook/Set Notebook@this")]
</p>





<h5>Races</h5>

<p>
[h:raceList=getLibProperty("Races", function.getNamespace())]

[r,count(listcount(raceList),""),code:{

	[h:currentRace=listget(raceList,roll.count)]

	[r:macroLink(currentRace,"tables/Races Window@this","",currentRace)]<br>

}]
</p>

<h5>Classes</h5>


[h:classesObj=getLibProperty("Classes",function.getNamespace())]
[h:classlist=json.fields(classesObj)]
[h:classlist=listsort(classlist,"a")]
<p style="margin-top:0px;margin-bottom:0px">
[r,count(listcount(classlist),""),code:{

	[h:currentClass=listget(classlist,roll.count)]

	<!---------------------------CAPITALIZE----------------------------->
	[h:CapitalName=function.Capitalize(currentClass)]

	[r:macroLink(CapitalName,"tables/Class Window@this","","class="+currentClass)]<br>



}]

</p>

<h5>Backgrounds</h5>

<p>
[h:bgList=getLibProperty("Backgrounds", function.getNamespace())]

[r,count(listcount(bgList),""),code:{
	[h:currentBG=listget(bgList,roll.count)]
	[r:macroLink(currentBG,"tables/Backgrounds Window@this","",currentBG)]<br>
}]
</p>


<h5>Equipment</h5>

[h:permissions=getLibProperty("PlayerPermission", function.getNamespace())]
[h:viewMagicItems=getStrProp(permissions,"viewMagicItems")]

<p>
[r:macroLink("Weapons",          "tables/Equipment Table@this","","Weapons")]<br>
[r:macroLink("Armor",            "tables/Equipment Table@this","","Armor")]<br>
[r:macroLink("Adventuring Gear", "tables/Equipment Table@this","","Adventuring Gear")]<br>
[r:macroLink("Equipment Packs",  "tables/Equipment Table@this","","Equipment Packs")]<br>
[r:macroLink("Tools",            "tables/Equipment Table@this","","Tools")]<br>
[r:macroLink("Mounts & Vehicles","tables/Equipment Table@this","","Mounts")]<br>
[r:macroLink("Other",            "tables/Equipment Table@this","","Other")]<br>

[r,if(viewMagicItems==1):"";"<span style='background-color:#e6e6e6'>"]

[r,if(viewMagicItems==1 || isGM()==1):macroLink("Magic Items","tables/Equipment Table@this","","Magic Items")+"<br>";""]

[r,if(viewMagicItems==1):"";"</span>"]

</p>

<h5>Spell Lists</h5>

<p>	
[h:spellLists=getLibProperty("Spell Lists", function.getNamespace())]
[h:spellLists=listsort(spellLists,"A")]

[r,count(listcount(spellLists),""),code:{
	[h:currentClass=listget(spellLists,roll.count)]
	[r:macroLink(currentClass+" Spells","tables/Spells Window@this","",currentClass)]<br>
}]
</p>

<h5>Feats</h5>
<p>
[r:macroLink("Feats List","tables/Feats Window@this","")]<br>
</p>

<h5>Other Options</h5>

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
<p>
[r,count(listcount(fields),"<br>"),code:{

	[h:currentOption=listget(fields,roll.count)]
	[h:currentList=json.get(OtherObj,currentOption)]

	<!---------------------------CAPITALIZE----------------------------->
	[h:CapitalName=function.Capitalize(currentOption)]

	[r:macroLink(CapitalName,"tables/Options Window@this","",currentOption)]
}]
</p>





[h:viewBestiary=getStrProp(permissions,"viewBestiary")]


[r,if(viewBestiary==1 || isGM()==1),code:{
<h5>Bestiary</h5>
<p>
[r,if(viewBestiary==1):"";"<span style='background-color:#e6e6e6'>"]
[r:macroLink("Creature List","tables/Creature Window@this","")]
<br>
[r:macroLink("New NPC","bestiary/NPC Wizard@this",outputNPC)]
[r,if(viewBestiary==1):"";"</span>"]
</p>
};{}]

<h5>Maps</h5>

<p>
[h:maps=getAllMapNames()]
[h:maps=listsort(maps,"N")]
[h:visibleMaps=maps]
[h,count(listcount(maps)),code:{
	[h:map=listget(maps,roll.count)]
	[h,if(getMapVisible(map)==1):"";visibleMaps=listdelete(visibleMaps,listfind(visibleMaps,map))]
}]
[h,if(isGM()==1):maps=maps;maps=visibleMaps]

[r,count(listcount(maps),"<br>"),code:{

	[h:CurrentMap=listget(maps,roll.count)]
	[r,if(getMapVisible(CurrentMap)==1):"";"<span style='background-color:#e6e6e6'>"]
	[r:macroLink(CurrentMap,"campaign/Select Map process@this","",json.fromStrProp(CurrentMap))]
	[r,if(getMapVisible(CurrentMap)==1):"";"</span>"]
}]
</p>

[h:tableList=getTableNames()]
[h:tableblacklist=getLibProperty("blacklist", function.getNamespace())]
[h,count(listcount(tableList)),code:{

	[h:keep=listfind(tableList,listget(tableblacklist,roll.count))]
	[h,if(keep>=0):tableList=listdelete(tableList,keep)]

}]

<h5>Rollable Tables</h5>
<p>
[r,count(listcount(tableList),""),code:{

	[h:currentTable=listget(tableList,roll.count)]
	
	[h:playerVisible=getTableVisible(currentTable)]

	[r,if(playerVisible==1):"";"<span style='background-color:#e6e6e6'>"]

	[r,if(playerVisible==1 || isGM()==1):macroLink(currentTable,"tables/Tables Window@this","",currentTable)]<br>

	[r,if(playerVisible==1):"";"</span>"]

}]
</p>