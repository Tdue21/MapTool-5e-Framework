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
	[macro("campaign/Campaign Settings@this"):""]
}]

[h,if(Rules==""),code:{};{
	[macro("campaign/Basic Rules@this"):""]
}]

[h,if(Party==""),code:{};{
	[macro("character/Manage Party@this"):""]
}]

[h,if(Search==""),code:{};{
	[macro("campaign/Search@this"):""]
}]

[h,if(Distance==""),code:{};{
	[macro("campaign/Get Distance@this"):""]
}]

[h,if(Map==""),code:{};{
	[macro("campaign/Select Map@this"):""]
}]

[h,if(Request==""),code:{};{
	[macro("campaign/Request Roll@this"):""]
}]

[h,if(Notebooks==""),code:{};{
	[macro("campaign/Notebooks@this"):""]
}]

[h,if(New==""),code:{};{
	[macro("character-creation/Character Creation Wizard@this"):"{'route':'New'}"]
}]

[h,if(LevelUp==""),code:{};{
	[macro("character-creation/Character Creation Wizard@this"):"{'route':'Level Up'}"]
}]
[h,if(Library==""),code:{};{
	[macro("tables/Tables List@this"):""]
}]

[h,if(Dice==""),code:{};{
	[h:link=macroLinkText("campaign/Dice Roller@this","")]
	[h:execLink(link)]
}]

[h,if(NewPin==""),code:{};{
	[macro("character/Create Pin@this"):""]
}]

[h,if(NewNPC==""),code:{};{
	[macro("bestiary/NPC Wizard@this"):""]
}]

[h,if(NewNotebook==""),code:{};{
	[macro("notebook/Set Notebook@this"):""]
}]

[h,if(PCMacros==""),code:{};{
	[macro("character-creation/Create Macros@this"):""]
}]

