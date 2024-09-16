[h:Action = decode(json.get(macro.args,"Action"))]
[h:output = function.getOutput())]
[h:link = ""]

[switch(Action), code:
	case "Settings":    { [h:link=macroLinkText("campaign/Campaign Settings@this")] };
	case "Rules":       { [h:link=macroLinkText("campaign/Basic Rules@this")] };
	case "Party":       { [h:link=macroLinkText("character/Manage Party@this")] };
	case "Search":      { [h:link=macroLinkText("campaign/Search@this")] };
	case "Distance":    { [h:link=macroLinkText("campaign/Get Distance@this")] };	
	case "Map":         { [h:link=macroLinkText("campaign/Select Map@this")] };	
	case "Request":     { [h:link=macroLinkText("campaign/Request Roll@this")] };
	case "Notebooks":   { [h:link=macroLinkText("campaign/Notebooks@this")] };
	case "New":         { [h:link=macroLinkText("character-creation/CharacterCreationWizard@this", "", json.set("{}", "route", "New"))] };
	case "LevelUp":     { [h:link=macroLinkText("character-creation/CharacterCreationWizard@this", "", json.set("{}", "route", "Level Up"))] };
	case "Library":     { [h:link=macroLinkText("tables/Tables List@this")] };
	case "Dice":        { [h:link=macroLinkText("campaign/Dice Roller@this")] };
	case "NewPin":      { [h:link=macroLinkText("character/Create Pin@this")] };
	case "NewNPC":      { [h:link=macroLinkText("bestiary/NPC Wizard@this")] };
	case "PCMacros":    { [h:link=macroLinkText("character-creation/Create Macros@this")]};
	case "Notebook":    {
		[h:Notebook = decode(json.get(macro.args,"Notebook"))]
		[h,if(Notebook == "NewNotebook"), code: { 
			[h:link=macroLinkText("notebook/Set Notebook@this")] 
		};{
			[h,if(Notebook !=""): link = macroLinkText("Notebook@"+Notebook)]
		}]
	};
	default: { [h:link = ""]  }
]
[h, if(link != ""): execLink(link, 1)]