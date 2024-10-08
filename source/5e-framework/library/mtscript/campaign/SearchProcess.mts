[h:terms=json.get(macro.args,"terms")]
[h:results=json.get(macro.args,"results")]
[h:window=json.get(macro.args,"window")]

[h:broadcast("Entering Search process")]

[h:abort(if(terms=="",0,1))]

[h:output=""]
<!-------------------PCs------------------->
[h:outputPCs=""]
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
[r,count(listcount(ListPC),""),code:{
	[h:currentPC=listget(ListPC,roll.count)]
	[h:currentPC=replace(currentPC,"^Lib:","")]
	[h:match=matches(lower(replace(currentPC,"[\\s'-]","")),".*"+lower(replace(terms,"[\\s'-]",""))+".*")]
	[h,if(match==1):results=results+1]
	[h,if(match==1):outputPCs=listappend(outputPCs,currentPC)]
}]
[h:outputPCs=listsort(outputPCs,"N")]
[h:output=setStrProp(output,"PC",outputPCs)]





<!-------------------NOTEBOOKS------------------->
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
[h:ListNotes=""]
[h:maps=getAllMapNames()]
[h,if(isGM()==1),count(listcount(maps)),code:{
[h:ListNotes=list]
};{

	[h:map=listget(maps,roll.count)]
	[h:ownedtokens=getOwnedNames(getPlayerName(),",",map)]
	
	[h,count(listcount(ownedtokens)),code:{
	
		[h:currentOwned=listget(ownedtokens,roll.count)]
		[h:find=listfind(list,currentOwned)]
		[h,if(find==-1):"";ListNotes=listappend(ListNotes,currentOwned)]
	}]
}]
[h:ListNotes=listsort(ListNotes,"N")]


[h:outputNotes=""]
[h:outputChapters=""]
[r,count(listcount(ListNotes),""),code:{

	[h:currentNoteName=listget(ListNotes,roll.count)]
	[h:match=matches(lower(replace(currentNoteName,"[\\s'-]","")),".*"+lower(replace(terms,"[\\s'-]",""))+".*")]

	[h,if(match==1):results=results+1]
	[h,if(match==1):outputNotes=listappend(outputNotes,currentNoteName)]

<!-------------------NOTES------------------->

	[h:valueField=getLibProperty("Value",currentNoteName)]
	[h:fields=json.fields(valueField)]

	[r,count(listcount(fields),""),code:{
	
		[h:currentNoteChapterName=listget(fields,roll.count)]
		[h:match=matches(lower(replace(currentNoteChapterName,"[\\s'-]","")),".*"+lower(replace(terms,"[\\s'-]",""))+".*")]
	
		[h,if(match==1):results=results+1]
		[h,if(match==1):outputChapters=listappend(outputChapters,currentNoteChapterName+"@"+currentNoteName)]
	
	}]

}]
[h:outputNotes=listsort(outputNotes,"N")]
[h:output=setStrProp(output,"Notebooks",outputNotes)]
[h:outputChapters=listsort(outputChapters,"N")]
[h:output=setStrProp(output,"Notes",outputChapters)]






<!-------------------CLASSES------------------->
[h:outputClasses=""]
[h:outputSubclasses=""]
[h:classesObj=getLibProperty("Classes",function.getNamespace())]
[h:classlist=json.fields(classesObj)]
[r,count(listcount(classlist),""),code:{
	[h:currentClass=listget(classlist,roll.count)]
	[h:match=matches(lower(replace(currentClass,"[\\s'-]","")),".*"+lower(replace(terms,"[\\s'-]",""))+".*")]
	[h,if(match==1):results=results+1]
	[h,if(match==1):outputClasses=listappend(outputClasses,currentClass)]

<!-------------------SUBCLASSES------------------->
	[h:currentClassObj=json.get(classesObj,currentClass)]
	[h:subclassList=json.toList(json.get(CurrentClassObj,"subclass"))]
	[r,count(listcount(subclassList),""),code:{
		[h:currentSubclass=listget(subclassList,roll.count)]
		[h:match=matches(lower(replace(currentSubclass,"[\\s'-]","")),".*"+lower(replace(terms,"[\\s'-]",""))+".*")]
		[h,if(match==1):results=results+1]
		[h,if(match==1):outputSubclasses=listappend(outputSubclasses,currentClass+"/"+currentSubclass)]
	}]
}]
[h:outputClasses=listsort(outputClasses,"N")]
[h:output=setStrProp(output,"Classes",outputClasses)]
[h:outputSubclasses=listsort(outputSubclasses,"N")]
[h:output=setStrProp(output,"SubClasses",outputSubclasses)]

<!-------------------SPELL LISTS------------------->
[h:outputSpellList=""]
[h:spellLists=getLibProperty("Spell Lists",function.getNamespace())]
[r,count(listcount(spellLists),""),code:{

	[h:currentSpellList=listget(spellLists,roll.count)]
	[h:match=matches(lower(replace(currentSpellList,"[\\s'-]","")),".*"+lower(replace(terms,"[\\s'-]",""))+".*")]

	[h,if(match==1):results=results+1]
	[h,if(match==1):outputSpellList=listappend(outputSpellList,currentSpellList)]

}]
[h:outputSpellList=listsort(outputSpellList,"N")]
[h:output=setStrProp(output,"SpellLists",outputSpellList)]

<!-------------------EQUIPMENT------------------->
[h:outputEquip=""]
[h:equipmentObject=getLibProperty("Equipment",function.getNamespace())]
[h:equipmentNames=json.fields(equipmentObject)]

[r,count(listcount(equipmentNames),""),code:{

	[h:currentEquipmentName=listget(equipmentNames,roll.count)]
	[h:match=matches(lower(replace(currentEquipmentName,"[\\s'-]","")),".*"+lower(replace(terms,"[\\s'-]",""))+".*")]

	[h,if(match==1):results=results+1]
	[h,if(match==1):outputEquip=listappend(outputEquip,currentEquipmentName)]

}]
[h:outputEquip=listsort(outputEquip,"N")]

<!------player view magic items---------->
[h:permissions=getLibProperty("PlayerPermission",function.getNamespace())]
[h:viewMagicItems=getStrProp(permissions,"viewMagicItems")]
[h,if(isGM()==0 && viewMagicItems==0 && listCount(outputEquip)>0):LibProperty=getLibProperty("Equipment", function.getNamespace())]

[h,if(isGM()==0 && viewMagicItems==0 && listCount(outputEquip)>0),count(listcount(equipmentNames)),code:{

	[h:currentObj=listget(outputEquip,roll.count)]
	[h:description=encode(json.get(LibProperty,currentObj))]
	[h:info=substring(description,0,if(indexOf(description,"---")==-1,length(description),indexOf(description,"---")))]
	[h:match=matches(info,".*common.*|.*rare.*|.*legendary.*|.*artifact.*|.*magic.*|.*attunement.*")]
	[h,if(match==1):outputEquip=listdelete(outputEquip,listfind(outputEquip,currentObj))]

};{}]
[h:output=setStrProp(output,"Equipment",outputEquip)]


<!-------------------Feats------------------->
[h:outputFeats=""]
[h:featsObject=getLibProperty("Feats",function.getNamespace())]
[h:featsNames=json.fields(featsObject)]

[r,count(listcount(featsNames),""),code:{

	[h:currentFeatsName=listget(featsNames,roll.count)]
	[h:match=matches(lower(replace(currentfeatsName,"[\\s'-]","")),".*"+lower(replace(terms,"[\\s'-]",""))+".*")]

	[h,if(match==1):results=results+1]
	[h,if(match==1):outputFeats=listappend(outputFeats,currentFeatsName)]

}]
[h:outputFeats=listsort(outputFeats,"N")]
[h:output=setStrProp(output,"Feats",outputFeats)]


<!-------------------Spells------------------->
[h:outputSpells=""]
[h:SpellsObject=getLibProperty("Spells",function.getNamespace())]
[h:SpellsNames=json.fields(SpellsObject)]

[r,count(listcount(SpellsNames),""),code:{

	[h:currentSpellsName=listget(SpellsNames,roll.count)]
	[h:match=matches(lower(replace(currentSpellsName,"[\\s'-]","")),".*"+lower(replace(terms,"[\\s'-]",""))+".*")]

	[h,if(match==1):results=results+1]
	[h,if(match==1):outputSpells=listappend(outputSpells,currentSpellsName)]

}]
[h:outputSpells=listsort(outputSpells,"N")]
[h:output=setStrProp(output,"Spells",outputSpells)]




<!-------------------Additional Feats------------------->
[h:outputAddFeats=""]
[h:AddFeatsObject=getLibProperty("AdditionalFeats",function.getNamespace())]
[h:AddFeatsNames=json.fields(AddFeatsObject)]

[r,count(listcount(AddFeatsNames),""),code:{

	[h:currentAddFeatsName=listget(AddFeatsNames,roll.count)]
	[h:match=matches(lower(replace(currentAddFeatsName,"[\\s'-]","")),".*"+lower(replace(terms,"[\\s'-]",""))+".*")]

	[h,if(match==1):results=results+1]
	[h,if(match==1):outputAddFeats=listappend(outputAddFeats,currentAddFeatsName)]

}]
[h:outputAddFeats=listsort(outputAddFeats,"N")]
[h:output=setStrProp(output,"AdditionalFeats",outputAddFeats)]

[h:viewBestiary=getStrProp(permissions,"viewBestiary")]
[h,if(isGM()==1):viewBestiary=1]

[h,if(viewBestiary==1),code:{
<!-------------------BESTIARY------------------->
[h:outputBestiary=""]
[r:BestiaryObj=getLibProperty("Bestiary",function.getNamespace())]
[r:BestiaryNames=json.fields(BestiaryObj)]
[r,count(listcount(BestiaryNames),""),code:{

	[h:currentMonster=listget(BestiaryNames,roll.count)]
	[h:match=matches(lower(replace(currentMonster,"[\\s'-]","")),".*"+lower(replace(terms,"[\\s'-]",""))+".*")]

	[h,if(match==1):results=results+1]
	[h,if(match==1):outputBestiary=listappend(outputBestiary,currentMonster)]
}]
[h:outputBestiary=listsort(outputBestiary,"N")]
[h:output=setStrProp(output,"Bestiary",outputBestiary)]
};{}]



<!-------------------MAPS------------------->
[h:outputMaps=""]
[h:maps=getAllMapNames()]
[h:maps=listsort(maps,"N")]
[h:visibleMaps=maps]
[h,count(listcount(maps)),code:{
	[h:map=listget(maps,roll.count)]
	[h,if(getMapVisible(map)==1):"";visibleMaps=listdelete(visibleMaps,listfind(visibleMaps,map))]
}]
[h,if(isGM()==1):maps=maps;maps=visibleMaps]
[r,count(listcount(maps),""),code:{

	[h:currentMap=listget(maps,roll.count)]
	[h:match=matches(lower(replace(currentMap,"[\\s'-]","")),".*"+lower(replace(terms,"[\\s'-]",""))+".*")]

	[h,if(match==1):results=results+1]
	[h,if(match==1):outputMaps=listappend(outputMaps,currentMap)]
}]
[h:outputMaps=listsort(outputMaps,"N")]
[h:output=setStrProp(output,"Maps",outputMaps)]

<!-------------------IMAGES------------------->
[h:outputHandouts=""]

[h:assetId=getImage("image:"+terms)]
[h,if(assetId!=""):results=results+1]
[h,if(assetId!=""):outputHandouts=listappend(outputHandouts,terms)]

[h:outputHandouts=listsort(outputHandouts,"N")]
[h:output=setStrProp(output,"Handouts",outputHandouts)]



[h,if(window=="Search"),code:{
[macro("campaign/Search@this"):"terms="+terms+";results="+results+";output="+encode(output)]
};{}]
[h,if(window=="Tables List"),code:{
[macro("tables/Tables List@this"):"terms="+terms+";results="+results+";output="+encode(output)]
};{}]
