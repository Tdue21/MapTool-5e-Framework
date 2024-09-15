[h:broadcast("<pre>" + json.indent(macro.args, 4) + "</pre>")]

[h:Action = decode(json.get(macro.args,"Action"))]
[h:output = function.getOutput())]
[h:link = ""]

[switch(Action), code:
	case "Settings":   { [link=macroLinkText("campaign/Campaign Settings@this")] };
	case "Rules":      { [link=macroLinkText("campaign/Basic Rules@this")] };
	case "Party":      { [link=macroLinkText("character/Manage Party@this")] };
	case "Search":     { [link=macroLinkText("campaign/Search@this")] };
	case "Distance":   { [link=macroLinkText("campaign/Get Distance@this")] };	
	case "Map":        { [link=macroLinkText("campaign/Select Map@this")] };	
	case "Request":    { [link=macroLinkText("campaign/Request Roll@this")] };
	case "Notebooks":  { [link=macroLinkText("campaign/Notebooks@this")] };
	case "New":        { [link=macroLinkText("character-creation/Character Creation Wizard@this", "", json.set("{}", "route", "New"))] };
	case "LevelUp":    { [link=macroLinkText("character-creation/Character Creation Wizard@this", "", json.set("{}", "route", "Level Up"))] };
	case "Library":    { [link=macroLinkText("tables/Tables List@this")] };
	case "Dice":       { [link=macroLinkText("campaign/Dice Roller@this")] };
	case "NewPin":     { [link=macroLinkText("character/Create Pin@this")] };
	case "NewNPC":     { [link=macroLinkText("bestiary/NPC Wizard@this")] };
	case "NewNotebook":{ [link=macroLinkText("notebook/Set Notebook@this")] };
	case "PCMacros":   { [link=macroLinkText("character-creation/Create Macros@this")]};
	case "NoteList": {
		[h,count(listcount(Action)),code:{
			[h:currentNote=listget(Action,roll.count)]
			[h:Note=json.get(macro.args,currentNote)]
			[h,if(Note !=""): link = macroLinkText("Notebook@"+currentNote)]
		}]		
	};
	default: { link = ""}
]

[h:broadcast("Link:" + link)]
[h, if(link != ""): execLink(link, 1)]



<!-- 
{
    "Notebook": "Lib:DM Tools",
    "NoteList": "Lib%3ADM+Tools%2C+Lib%3ARules%2C+Lib%3AWelcome"
}

-->