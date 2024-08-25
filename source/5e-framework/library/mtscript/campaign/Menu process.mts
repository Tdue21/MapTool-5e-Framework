[h:Settings=json.get(macro.args,"Settings")]
[h:Rules=json.get(macro.args,"Rules")]
[h:Party=json.get(macro.args,"Party")]
[h:Search=json.get(macro.args,"Search")]
[h:Distance=json.get(macro.args,"Distance")]
[h:Map=json.get(macro.args,"Map")]
[h:NewNotebook=json.get(macro.args,"NewNotebook")]
[h:Notebooks=json.get(macro.args,"Notebooks")]
[h:NewNPC=json.get(macro.args,"NewNPC")]
[h:NewPin=json.get(macro.args,"NewPin")]
[h:Request=json.get(macro.args,"Request")]
[h:New=json.get(macro.args,"New")]
[h:LevelUp=json.get(macro.args,"LevelUp")]
[h:NoteList=decode(json.get(macro.args,"NoteList"))]
[h:Library=decode(json.get(macro.args,"Library"))]
[h:Dice=decode(json.get(macro.args,"Dice"))]
[h:PCMacros=decode(json.get(macro.args,"PCMacros"))]


[h:output= function.getOutput())]

[h,count(listcount(NoteList)),code:{

	[h:currentNote=listget(NoteList,roll.count)]
	[h:Note=json.get(macro.args,currentNote)]

	[h,if(Note==""),code:{};{
		[macro("Notebook@"+currentNote):""]
	}]

}]


[h,if(Settings==""),code:{};{
	[macro("Campaign Settings@Lib:Campaign"):""]
}]

[h,if(Rules==""),code:{};{
	[macro("Basic Rules@Lib:Campaign"):""]
}]

[h,if(Party==""),code:{};{
	[macro("Manage Party@Lib:Character"):""]
}]

[h,if(Search==""),code:{};{
	[macro("Search@Lib:Campaign"):""]
}]

[h,if(Distance==""),code:{};{
	[macro("Get Distance@Lib:Campaign"):""]
}]

[h,if(Map==""),code:{};{
	[macro("Select Map@Lib:Campaign"):""]
}]

[h,if(Request==""),code:{};{
	[macro("Request Roll@Lib:Campaign"):""]
}]

[h,if(Notebooks==""),code:{};{
	[macro("Notebooks@Lib:Campaign"):""]
}]

[h,if(New==""),code:{};{
	[macro("Character Creation Wizard@lib:Character Creation"):"{'route':'New'}"]
}]

[h,if(LevelUp==""),code:{};{
	[macro("Character Creation Wizard@lib:Character Creation"):"{'route':'Level Up'}"]
}]
[h,if(Library==""),code:{};{
	[macro("Tables List@lib:Tables"):""]
}]

[h,if(Dice==""),code:{};{
	[h:link=macroLinkText("Dice Roller@lib:Campaign","")]
	[h:execLink(link)]
}]

[h,if(NewPin==""),code:{};{
	[macro("Create Pin@lib:Character"):""]
}]

[h,if(NewNPC==""),code:{};{
	[macro("NPC Wizard@lib:Bestiary"):""]
}]

[h,if(NewNotebook==""),code:{};{
	[macro("Set Notebook@Lib:Notebook"):""]
}]

[h,if(PCMacros==""),code:{};{
	[macro("Create Macros@lib:Character Creation"):""]
}]

