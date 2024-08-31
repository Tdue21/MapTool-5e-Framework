[h:res=input("var|Paste the content from an exported JSON file||label|span=true",
	"json1||Merge Libraries with")]
[h:abort(res)]

[h,if(json.type(json1)=="OBJECT"):"";abort(0)]

<!-------------Races--------------->
[h:value="Races"]
[h:listImport=json.get(json1,value)]
[h:list=getLibProperty(value,"Lib:Character Creation")]
[h,count(listcount(listImport)),code:{
	[h:currentItem=listget(listImport,roll.count)]
	[h:find=listfind(list,currentItem)]
	[h,if(find==-1):"";list=listdelete(list,find)]
	[h:list=listappend(list,currentItem)]
}]
[h:setLibProperty(value, list, function.getNamespace())]

<!-------------Backgrounds--------------->
[h:value="Backgrounds"]
[h:listImport=json.get(json1,value)]
[h:list=getLibProperty(value,"Lib:Character Creation")]
[h,count(listcount(listImport)),code:{
	[h:currentItem=listget(listImport,roll.count)]
	[h:find=listfind(list,currentItem)]
	[h,if(find==-1):"";list=listdelete(list,find)]
	[h:list=listappend(list,currentItem)]
}]
[h:setLibProperty(value, list, function.getNamespace())]

<!-------------Languages--------------->
[h:value="Languages"]
[h:listImport=json.get(json1,value)]
[h:list=getLibProperty(value,"Lib:Character Creation")]
[h,count(listcount(listImport)),code:{
	[h:currentItem=listget(listImport,roll.count)]
	[h:find=listfind(list,currentItem)]
	[h,if(find==-1):"";list=listdelete(list,find)]
	[h:list=listappend(list,currentItem)]
}]
[h:setLibProperty(value, list, function.getNamespace())]

<!-------------Simple Melee Weapons--------------->
[h:value="Simple Melee Weapons"]
[h:listImport=json.get(json1,value)]
[h:list=getLibProperty(value,"Lib:Character Creation")]
[h,count(listcount(listImport)),code:{
	[h:currentItem=listget(listImport,roll.count)]
	[h:find=listfind(list,currentItem)]
	[h,if(find==-1):"";list=listdelete(list,find)]
	[h:list=listappend(list,currentItem)]
}]
[h:setLibProperty(value, list, function.getNamespace())]

<!-------------Simple Ranged Weapons--------------->
[h:value="Simple Ranged Weapons"]
[h:listImport=json.get(json1,value)]
[h:list=getLibProperty(value,"Lib:Character Creation")]
[h,count(listcount(listImport)),code:{
	[h:currentItem=listget(listImport,roll.count)]
	[h:find=listfind(list,currentItem)]
	[h,if(find==-1):"";list=listdelete(list,find)]
	[h:list=listappend(list,currentItem)]
}]
[h:setLibProperty(value, list, function.getNamespace())]

<!-------------Martial Melee Weapons--------------->
[h:value="Martial Melee Weapons"]
[h:listImport=json.get(json1,value)]
[h:list=getLibProperty(value,"Lib:Character Creation")]
[h,count(listcount(listImport)),code:{
	[h:currentItem=listget(listImport,roll.count)]
	[h:find=listfind(list,currentItem)]
	[h,if(find==-1):"";list=listdelete(list,find)]
	[h:list=listappend(list,currentItem)]
}]
[h:setLibProperty(value, list, function.getNamespace())]

<!-------------Martial Ranged Weapons--------------->
[h:value="Martial Ranged Weapons"]
[h:listImport=json.get(json1,value)]
[h:list=getLibProperty(value,"Lib:Character Creation")]
[h,count(listcount(listImport)),code:{
	[h:currentItem=listget(listImport,roll.count)]
	[h:find=listfind(list,currentItem)]
	[h,if(find==-1):"";list=listdelete(list,find)]
	[h:list=listappend(list,currentItem)]
}]
[h:setLibProperty(value, list, function.getNamespace())]

<!-------------Spell Lists--------------->
[h:value="Spell Lists"]
[h:listImport=json.get(json1,value)]
[h:list=getLibProperty(value,"Lib:Character Creation")]
[h,count(listcount(listImport)),code:{
	[h:currentItem=listget(listImport,roll.count)]
	[h:find=listfind(list,currentItem)]
	[h,if(find==-1):"";list=listdelete(list,find)]
	[h:list=listappend(list,currentItem)]
}]
[h:setLibProperty(value, list, function.getNamespace())]

[h,count(listcount(list)),code:{

	[h:currentList=listget(list,roll.count)]
	[h:jsonImport=json.get(json1,currentList+" Spell List")]
	[h:json2=getLibProperty(currentList,"Lib:Character Creation")]

	<!-------------Merge Spell list level 0--------------->
	[h:LevelName="Level 0"]
	[h:LevelImport=json.get(jsonImport,LevelName)]
	[h:importList=json.toList(LevelImport)]
	[h,if(json.type(json2)=="UNKNOWN"):json2="{}"]
	[h:CurrentLevel=json.get(json2,LevelName)]
	[h:listLevel=json.toList(CurrentLevel)]
	[h,count(listcount(importList)),code:{
		[h:currentItem=listget(importList,roll.count)]
		[h:find=listfind(listLevel,currentItem)]
		[h,if(find==-1):"";listLevel=listdelete(listLevel,find)]
		[h:listLevel=listappend(listLevel,currentItem)]
	}]
	[h:LevelImport=json.fromList(listLevel)]
	[h:jsonImport=json.set(jsonImport,LevelName,LevelImport)]

	<!-------------Merge Spell list level 1--------------->
	[h:LevelName="Level 1"]
	[h:LevelImport=json.get(jsonImport,LevelName)]
	[h:importList=json.toList(LevelImport)]
	[h:CurrentLevel=json.get(json2,LevelName)]
	[h:listLevel=json.toList(CurrentLevel)]
	[h,count(listcount(importList)),code:{
		[h:currentItem=listget(importList,roll.count)]
		[h:find=listfind(listLevel,currentItem)]
		[h,if(find==-1):"";listLevel=listdelete(listLevel,find)]
		[h:listLevel=listappend(listLevel,currentItem)]
	}]
	[h:LevelImport=json.fromList(listLevel)]
	[h:jsonImport=json.set(jsonImport,LevelName,LevelImport)]
	<!-------------Merge Spell list level 2--------------->
	[h:LevelName="Level 2"]
	[h:LevelImport=json.get(jsonImport,LevelName)]
	[h:importList=json.toList(LevelImport)]
	[h:CurrentLevel=json.get(json2,LevelName)]
	[h:listLevel=json.toList(CurrentLevel)]
	[h,count(listcount(importList)),code:{
		[h:currentItem=listget(importList,roll.count)]
		[h:find=listfind(listLevel,currentItem)]
		[h,if(find==-1):"";listLevel=listdelete(listLevel,find)]
		[h:listLevel=listappend(listLevel,currentItem)]
	}]
	[h:LevelImport=json.fromList(listLevel)]
	[h:jsonImport=json.set(jsonImport,LevelName,LevelImport)]

	<!-------------Merge Spell list level 3--------------->
	[h:LevelName="Level 3"]
	[h:LevelImport=json.get(jsonImport,LevelName)]
	[h:importList=json.toList(LevelImport)]
	[h:CurrentLevel=json.get(json2,LevelName)]
	[h:listLevel=json.toList(CurrentLevel)]
	[h,count(listcount(importList)),code:{
		[h:currentItem=listget(importList,roll.count)]
		[h:find=listfind(listLevel,currentItem)]
		[h,if(find==-1):"";listLevel=listdelete(listLevel,find)]
		[h:listLevel=listappend(listLevel,currentItem)]
	}]	
	[h:LevelImport=json.fromList(listLevel)]
	[h:jsonImport=json.set(jsonImport,LevelName,LevelImport)]

	<!-------------Merge Spell list level 4--------------->
	[h:LevelName="Level 4"]
	[h:LevelImport=json.get(jsonImport,LevelName)]
	[h:importList=json.toList(LevelImport)]
	[h:CurrentLevel=json.get(json2,LevelName)]
	[h:listLevel=json.toList(CurrentLevel)]
	[h,count(listcount(importList)),code:{
		[h:currentItem=listget(importList,roll.count)]
		[h:find=listfind(listLevel,currentItem)]
		[h,if(find==-1):"";listLevel=listdelete(listLevel,find)]
		[h:listLevel=listappend(listLevel,currentItem)]
	}]	
	[h:LevelImport=json.fromList(listLevel)]
	[h:jsonImport=json.set(jsonImport,LevelName,LevelImport)]

	<!-------------Merge Spell list level 5--------------->
	[h:LevelName="Level 5"]
	[h:LevelImport=json.get(jsonImport,LevelName)]
	[h:importList=json.toList(LevelImport)]
	[h:CurrentLevel=json.get(json2,LevelName)]
	[h:listLevel=json.toList(CurrentLevel)]
	[h,count(listcount(importList)),code:{
		[h:currentItem=listget(importList,roll.count)]
		[h:find=listfind(listLevel,currentItem)]
		[h,if(find==-1):"";listLevel=listdelete(listLevel,find)]
		[h:listLevel=listappend(listLevel,currentItem)]
	}]	
	[h:LevelImport=json.fromList(listLevel)]
	[h:jsonImport=json.set(jsonImport,LevelName,LevelImport)]

	<!-------------Merge Spell list level 6--------------->
	[h:LevelName="Level 6"]
	[h:LevelImport=json.get(jsonImport,LevelName)]
	[h:importList=json.toList(LevelImport)]
	[h:CurrentLevel=json.get(json2,LevelName)]
	[h:listLevel=json.toList(CurrentLevel)]
	[h,count(listcount(importList)),code:{
		[h:currentItem=listget(importList,roll.count)]
		[h:find=listfind(listLevel,currentItem)]
		[h,if(find==-1):"";listLevel=listdelete(listLevel,find)]
		[h:listLevel=listappend(listLevel,currentItem)]
	}]	
	[h:LevelImport=json.fromList(listLevel)]
	[h:jsonImport=json.set(jsonImport,LevelName,LevelImport)]
	
	<!-------------Merge Spell list level 7--------------->
	[h:LevelName="Level 7"]
	[h:LevelImport=json.get(jsonImport,LevelName)]
	[h:importList=json.toList(LevelImport)]
	[h:CurrentLevel=json.get(json2,LevelName)]
	[h:listLevel=json.toList(CurrentLevel)]
	[h,count(listcount(importList)),code:{
		[h:currentItem=listget(importList,roll.count)]
		[h:find=listfind(listLevel,currentItem)]
		[h,if(find==-1):"";listLevel=listdelete(listLevel,find)]
		[h:listLevel=listappend(listLevel,currentItem)]
	}]	
	[h:LevelImport=json.fromList(listLevel)]
	[h:jsonImport=json.set(jsonImport,LevelName,LevelImport)]

	<!-------------Merge Spell list level 8--------------->
	[h:LevelName="Level 8"]
	[h:LevelImport=json.get(jsonImport,LevelName)]
	[h:importList=json.toList(LevelImport)]
	[h:CurrentLevel=json.get(json2,LevelName)]
	[h:listLevel=json.toList(CurrentLevel)]
	[h,count(listcount(importList)),code:{
		[h:currentItem=listget(importList,roll.count)]
		[h:find=listfind(listLevel,currentItem)]
		[h,if(find==-1):"";listLevel=listdelete(listLevel,find)]
		[h:listLevel=listappend(listLevel,currentItem)]
	}]	
	[h:LevelImport=json.fromList(listLevel)]
	[h:jsonImport=json.set(jsonImport,LevelName,LevelImport)]

	<!-------------Merge Spell list level 9--------------->
	[h:LevelName="Level 9"]
	[h:LevelImport=json.get(jsonImport,LevelName)]
	[h:importList=json.toList(LevelImport)]
	[h:CurrentLevel=json.get(json2,LevelName)]
	[h:listLevel=json.toList(CurrentLevel)]
	[h,count(listcount(importList)),code:{
		[h:currentItem=listget(importList,roll.count)]
		[h:find=listfind(listLevel,currentItem)]
		[h,if(find==-1):"";listLevel=listdelete(listLevel,find)]
		[h:listLevel=listappend(listLevel,currentItem)]
	}]	
	[h:LevelImport=json.fromList(listLevel)]
	[h:jsonImport=json.set(jsonImport,LevelName,LevelImport)]


	
	[h:jsonMerged=json.merge(json2,jsonImport)]
	[h:setLibProperty(currentList, jsonMerged, function.getNamespace())]

}]


<!-------------FeatsList--------------->
[h:value="Feats"]
[h:listImport=json.get(json1,"FeatsList")]
[h:list=getLibProperty(value,"Lib:Character Creation")]
[h,count(listcount(listImport)),code:{
	[h:currentItem=listget(listImport,roll.count)]
	[h:find=listfind(list,currentItem)]
	[h,if(find==-1):"";list=listdelete(list,find)]
	[h:list=listappend(list,currentItem)]
}]
[h:setLibProperty(value, list, function.getNamespace())]

<!-------------Classes--------------->
[h:value="Classes"]
[h:jsonImport=json.get(json1,value)]
[h:json2=getLibProperty(value,"Lib:Character Creation")]
[h,if(json.type(json2)=="UNKNOWN"):json2="{}"]
[h:jsonMerged=json.merge(json2,jsonImport)]
[h:setLibProperty(value, jsonMerged, function.getNamespace())]

<!-------------Feats--------------->
[h:value="Feats"]
[h:jsonImport=json.get(json1,value)]
[h:json2=getLibProperty(value,"Lib:Compendium")]

[h:jsonMerged=json.merge(json2,jsonImport)]
[h:setLibProperty(value, jsonMerged, function.getNamespace())]

<!-------------AdditionalFeats--------------->
[h:value="AdditionalFeats"]
[h:jsonImport=json.get(json1,value)]
[h:json2=getLibProperty(value,"Lib:Compendium")]

[h:jsonMerged=json.merge(json2,jsonImport)]
[h:setLibProperty(value, jsonMerged, function.getNamespace())]

<!-------------Spells--------------->
[h:value="Spells"]
[h:jsonImport=json.get(json1,value)]
[h:json2=getLibProperty(value,"Lib:Compendium")]

[h:jsonMerged=json.merge(json2,jsonImport)]
[h:setLibProperty(value, jsonMerged, function.getNamespace())]


<!-------------Equipment--------------->
[h:value="Equipment"]
[h:jsonImport=json.get(json1,value)]
[h:json2=getLibProperty(value,"Lib:Compendium")]

[h:jsonMerged=json.merge(json2,jsonImport)]
[h:setLibProperty(value, jsonMerged, function.getNamespace())]

<!-------------Bestiary--------------->
[h:value="Bestiary"]
[h:jsonImport=json.get(json1,value)]
[h:json2=getLibProperty(value,"Lib:Compendium")]

[h:jsonMerged=json.merge(json2,jsonImport)]
[h:setLibProperty(value, jsonMerged, function.getNamespace())]




[h,if(isDialogVisible("Settings")==1),code:{
[macro("campaign/Campaign Settings@this"):""]
};{}]