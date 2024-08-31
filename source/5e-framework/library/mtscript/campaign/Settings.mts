[r,if(macro.args=="Attributes"),code:{

	[h:attributeList=getLibProperty("Attributes", function.getNamespace())]
	[h:res=input("attributeList|"+attributeList+"|List of Attributes|text|width=36",
	"default|0|Use defaults|check",
	"var|Strength,Dexterity,Constitution,Intelligence,Wisdom,Charisma|Defaults|label")]
	[h:abort(res)]
	[h:setLibProperty("Attributes", if(default==1, function.getNamespace())]

};{}]

[r,if(macro.args=="Skills"),code:{

	[h:skillList=getLibProperty("Skills", function.getNamespace())]
	[h:res=input("skillList|"+skillList+"|List of Skills and Atributes|text|width=40",
	"default|0|Use defaults|check")]
	[h:abort(res)]
	[h:setLibProperty("Skills", if(default==1, function.getNamespace())]

};{}]

[r,if(macro.args=="Output"),code:{
	[h:pcOutput=getLibProperty("PC Output",function.getNamespace())]
	[h:gmOutput=getLibProperty("GM Output",function.getNamespace())]
	[h:outputList="all,self,gm,gm-self,ask"]
	
	[h:res=input(
		"pcOutput|"+outputList+"|PC Output|list|value=string select="+listfind(outputList,pcOutput),
		"gmOutput|"+outputList+"|GM Output|list|value=string select="+listfind(outputList,gmOutput))]
	[h:abort(res)]
	
	[h:setLibProperty("PC Output",pcOutput,function.getNamespace())]
	[h:setLibProperty("GM Output",gmOutput,function.getNamespace()
};{}]

[r,if(macro.args=="Passive"),code:{

	[h:checklist=getLibProperty("Passive Checks", function.getNamespace())]
	[h:res=input("checklist|"+checklist+"|List of Attributes|text|width=20",
	"default|0|Use defaults|check",
	"var|Perception|Defaults|label")]
	[h:abort(res)]
	[h:setLibProperty("Passive Checks", if(default==1, function.getNamespace())]

};{}]

[r,if(macro.args=="Feats"),code:{

	[h:featlist=getLibProperty("Feats", function.getNamespace())]
	[h:res=input("featlist|"+featlist+"|List of Feats|text|width=20",
	"default|0|Use SRD|check",
	"var|Grappler|SRD|label")]
	[h:abort(res)]
	[h:setLibProperty("Feats", if(default==1, function.getNamespace())]

};{}]

[r,if(macro.args=="Languages"),code:{

	[h:languagelist=getLibProperty("Languages", function.getNamespace())]
	[h:res=input("languagelist|"+languagelist+"|List of Languages|text|width=40",
	"default|0|Use Defaults|check",
	"var|Common,Dwarvish,Elvish,Giant,Gnomish,Goblin,Halfling,Orc|Defaults|label",
	"var|Abyssal,Celestial,Draconic,Deep Speech,Infernal,Primordial,Sylvan,Undercommon|Defaults|label")]
	[h:abort(res)]
	[h:setLibProperty("Languages", if(default==1, function.getNamespace())]

};{}]

[r,if(macro.args=="Races"),code:{

	[h:raceList=getLibProperty("Races", function.getNamespace())]
	[h:res=input("raceList|"+raceList+"|List of Races|text|width=40",
	"default|0|Use SRD|check",
	"var|Human,High Elf,Hill Dwarf,Lightfoot Halfling,Rock Gnome,Half-Elf,Half-Orc,Dragonborn,Tiefling|SRD|label")]
	[h:abort(res)]
	[h:setLibProperty("Races", if(default==1, function.getNamespace())]

};{}]


[r,if(macro.args=="Backgrounds"),code:{

	[h:bgList=getLibProperty("Backgrounds", function.getNamespace())]
	[h:res=input("bgList|"+bgList+"|List of Backgrounds|text|width=40",
	"default|0|Use SRD|check",
	"var|Acolyte|SRD|label")]
	[h:abort(res)]
	[h:setLibProperty("Backgrounds", if(default==1, function.getNamespace())]

};{}]


[r,if(macro.args=="Equipment"),code:{

	[h:smw=getLibProperty("Simple Melee Weapons", function.getNamespace())]
	[h:srw=getLibProperty("Simple Ranged Weapons", function.getNamespace())]
	[h:mmw=getLibProperty("Martial Melee Weapons", function.getNamespace())]
	[h:mrw=getLibProperty("Martial Ranged Weapons", function.getNamespace())]
	
	[h:res=input(
		"smw|"+smw+"|Simple Melee Weapons|text|width=40",
		"srw|"+srw+"|Simple Ranged Weapons|text|width=40",
		"mmw|"+mmw+"|Martial Melee Weapons|text|width=40",
		"mrw|"+mrw+"|Martial Ranged Weapons|text|width=40")]
	[h:abort(res)]
	[h:setLibProperty("Simple Melee Weapons", smw, function.getNamespace())]
	[h:setLibProperty("Simple Ranged Weapons", srw, function.getNamespace())]
	[h:setLibProperty("Martial Melee Weapons", mmw, function.getNamespace())]
	[h:setLibProperty("Martial Ranged Weapons", mrw, function.getNamespace())]

};{}]

[r,if(macro.args=="Spells"),code:{

	[h:spellLists=getLibProperty("Spell Lists", function.getNamespace())]

	
	[h:res=input(
		"spellLists|"+spellLists+"|Spell Lists|text|width=40")]
	[h:abort(res)]
	[h:setLibProperty("Spell Lists", spellLists, function.getNamespace())]


};{}]


[r,if(macro.args=="Start"),code:{

	[h:maps=getAllMapNames()]
	[h:maps=listsort(maps,"N")]

	[h:start=getLibProperty("Start", function.getNamespace())]
	[h:res=input("start|"+maps+"|Start map|list|value=string select="+listfind(maps,start))]
	[h:abort(res)]
	[h:setLibProperty("Start", start, function.getNamespace())]

};{}]

[r,if(macro.args=="Welcome"),code:{


	[h:welcome=getLibProperty("Welcome", function.getNamespace())]
	[h:res=input("welcome|"+welcome+"|Welcome Message|text|width=40")]
	[h:abort(res)]
	[h:setLibProperty("Welcome", welcome, function.getNamespace())]

};{}]



[r,if(macro.args=="Currency"),code:{


	[h:currencyValue=getLibProperty("Currency", function.getNamespace())]
	[h:PP=getStrProp(currencyValue,"PP")]
	[h:GP=getStrProp(currencyValue,"GP")]
	[h:EP=getStrProp(currencyValue,"EP")]
	[h:SP=getStrProp(currencyValue,"SP")]
	[h:CP=getStrProp(currencyValue,"CP")]
	[h:weight=getStrProp(currencyValue,"weight")]
	[h:res=input(
	"PP|"+PP+"|Platinum (default 10)",
	"GP|"+GP+"|Gold (default 1)",
	"EP|"+EP+"|Electrum (default 0.5)",
	"SP|"+SP+"|Silver (default 0.1)",
	"CP|"+CP+"|Copper (default 0.01)",
	"weight|"+weight+"|weight (default 0.02 lb.)",
	"default|0|Use defaults|check"
	)]
	[h:currencyValue=setStrProp(currencyValue,"PP",PP)]
	[h:currencyValue=setStrProp(currencyValue,"GP",GP)]
	[h:currencyValue=setStrProp(currencyValue,"EP",EP)]
	[h:currencyValue=setStrProp(currencyValue,"SP",SP)]
	[h:currencyValue=setStrProp(currencyValue,"CP",CP)]
	[h:currencyValue=setStrProp(currencyValue,"weight",weight)]
	[h:abort(res)]
	[h,if(default==1):currencyValue="PP=10 ; GP=1 ; EP=0.5 ; SP=0.1 ; CP=0.01 ; weight=0.02"]
	[h:setLibProperty("Currency", currencyValue, function.getNamespace())]

};{}]


[r,if(macro.args=="RulesLink"),code:{


	[h:rules=getLibProperty("RulesURL", function.getNamespace())]
	[h:res=input("rules|"+rules+"|Rules URL|text|Width=56")]
	[h:abort(res)]
	[h:setLibProperty("RulesURL", rules, function.getNamespace())]

};{}]

[r,if(macro.args=="Clips"),code:{


	[h:clips=getLibProperty("Audio", function.getNamespace())]
	[h:loadAudio=getLibProperty("LoadAudio", function.getNamespace())]
	[h:door=getLibProperty("Door", function.getNamespace())]
	[h:res=input("clips|"+clips+"|Dice Audio Clips URL list|text|Width=56",
	"door|"+door+"|Door Audio Clip URL|text|Width=56",
	"loadAudio|"+loadAudio+"|Load on startup|Check")]
	[h:abort(res)]
	[h:setLibProperty("Audio", clips, function.getNamespace())]
	[h:setLibProperty("loadAudio", loadAudio, function.getNamespace())]
	[h:setLibProperty("door", door, function.getNamespace())]

};{}]

[r,if(macro.args=="OutputAudio"),code:{

	[h:pcOutput=getLibProperty("PC Audio", function.getNamespace())]
	[h:gmOutput=getLibProperty("GM Audio", function.getNamespace())]

	[h:outputList="all,self,gm,gm-self,none"]
	
	[h:res=input(
		"pcAudio|"+outputList+"|PC Audio Output|list|value=string select="+listfind(outputList,pcOutput),
		"gmAudio|"+outputList+"|GM Audio Output|list|value=string select="+listfind(outputList,gmOutput))]
	[h:abort(res)]
	
	[h:setLibProperty("PC Audio", pcAudio, function.getNamespace())]
	[h:setLibProperty("GM Audio", gmAudio, function.getNamespace())]


};{}]


[r,if(macro.args=="Permissions"),code:{

	[h:permissions=getLibProperty("PlayerPermission", function.getNamespace())]
	

	[h:edit=getStrProp(permissions,"edit")]
	[h:share=getStrProp(permissions,"share")]
	[h:closeShared=getStrProp(permissions,"closeShared")]
	[h:viewBestiary=getStrProp(permissions,"viewBestiary")]
	[h:identify=getStrProp(permissions,"identify")]
	[h:viewMagicItems=getStrProp(permissions,"viewMagicItems")]
	[h:applyDMG=getStrProp(permissions,"applyDMG")]
	
	[h:res=input("var|<html><h3>Player Permissions</h3></html>||label|span=true",
	"edit|"+edit+"|Edit Compendium|check|select",
	"share|"+share+"|Open Shared Window|check|select",
	"closeShared|"+closeShared+"|Close Shared Window|check|select",
	"viewBestiary|"+viewBestiary+"|Access the Bestiary|check|select",
	"identify|"+identify+"|Identify Equipment|check|select",
	"viewMagicItems|"+viewMagicItems+"|View Magic Items|check|select",
	"applyDMG|"+applyDMG+"|Apply damage to any token|check|select")]
	[h:abort(res)]

	[h:permissions=setStrProp(permissions,"edit",edit)]
	[h:permissions=setStrProp(permissions,"share",share)]
	[h:permissions=setStrProp(permissions,"closeShared",closeShared)]
	[h:permissions=setStrProp(permissions,"viewBestiary",viewBestiary)]
	[h:permissions=setStrProp(permissions,"identify",identify)]
	[h:permissions=setStrProp(permissions,"viewMagicItems",viewMagicItems)]
	[h:permissions=setStrProp(permissions,"applyDMG",applyDMG)]

	[h:setLibProperty("PlayerPermission", permissions, function.getNamespace())]


};{}]


[r,if(macro.args=="Gameplay"),code:{


	[h:gameplay=getLibProperty("Gameplay", function.getNamespace())]
	[h:initiative=getStrProp(gameplay,"autosetInitiative")]1
	[h:dexInit=getStrProp(gameplay,"dexInit")]
	[h:rerollInit=getStrProp(gameplay,"rerollInit")]
	[h:KeepPlayers=getStrProp(gameplay,"KeepPlayers")]
	[h:rollNPC=getStrProp(gameplay,"rollNPC")]
	[h:interactDistance=getStrProp(gameplay,"interactDistance")]


	
	[h:res=input("initiative|"+initiative+"|Auto Set Initiative|check",
	"dexInit|"+dexInit+"|Use Dexterity to break ties|check",
	"rerollInit|"+rerollInit+"|Re-Roll Initiative every Round|check",
	"KeepPlayers|"+KeepPlayers+"|Default to keep players on initiative tracker|check",
	"var|<html><table width=280><tr><td><hr noshade></html>||label|span=true",
	"rollNPC|"+rollNPC+"|Roll for NPC HP|check",
	"var|<html><table width=280><tr><td><hr noshade></html>||label|span=true",
	"interactDistance|"+interactDistance+"|Interaction distance|text|width=3")]
	[h:abort(res)]

	[h,if(isNumber(interactDistance)==0):interactDistance=0]

	[h:gameplay=setStrProp(gameplay,"autosetInitiative",initiative)]
	[h:gameplay=setStrProp(gameplay,"dexInit",dexInit)]
	[h:gameplay=setStrProp(gameplay,"rerollInit",rerollInit)]
	[h:gameplay=setStrProp(gameplay,"KeepPlayers",KeepPlayers)]
	[h:gameplay=setStrProp(gameplay,"rollNPC",rollNPC)]
	[h:gameplay=setStrProp(gameplay,"interactDistance",interactDistance)]

	
	[h:setLibProperty("Gameplay", gameplay, function.getNamespace())]

};{}]


[r,if(macro.args=="Display"),code:{


	[h:display=getLibProperty("Display", function.getNamespace())]
	[h:InitSize=getStrProp(display,"InitSize")]
	[h:ElevScale=getStrProp(display,"ElevScale")]
	[h:darkMode=getStrProp(display,"darkMode")]
	[h:replaceDiceRoll=getStrProp(display,"replaceDiceRoll")]
	[h:replaceSpellList=getStrProp(display,"replaceSpellList")]
	[h:NPCVisibility=getStrProp(display,"NPCVisibility")]
	[h:HiddenOpacity=getStrProp(display,"HiddenOpacity")]
	[h:StatblockFrame=getStrProp(display,"StatblockFrame")]
	
	[h:res=input("InitSize|"+InitSize+"|Initiative token size (30-100)|text|width=3",
	"ElevScale|"+ElevScale+"|Elevation Bar scale (in feet)|text|width=3",
	"darkMode|"+darkMode+"|Dark Mode|Check",
	"replaceDiceRoll|"+replaceDiceRoll+"|Automatically replace dice formulas|Check",
	"replaceSpellList|"+replaceSpellList+"|Automatically link NPC spell lists|Check",
	"var|<html><table width=280><tr><td><hr noshade></html>||label|span=true",
	"NPCVisibility|"+NPCVisibility+"|Hide new NPCs from players|check",
	"HiddenOpacity|"+HiddenOpacity+"|Hidden Opacity|text|width=3",
	"var|<html><table width=280><tr><td><hr noshade></html>||label|span=true",
	"StatblockFrame|Individual,PCs and NPCs,Single Frame|Statblock Frame|List|select="+StatblockFrame)]
	[h,if(isNumber(InitSize)==0):InitSize=50]
	[h,if(isNumber(NPCVisibility)==0):NPCVisibility=40]
	[h:abort(res)]

	[h:display=setStrProp(display,"InitSize",InitSize)]
	[h:display=setStrProp(display,"ElevScale",ElevScale)]
	[h:display=setStrProp(display,"darkMode",darkMode)]
	[h:display=setStrProp(display,"replaceDiceRoll",replaceDiceRoll)]
	[h:display=setStrProp(display,"replaceSpellList",replaceSpellList)]
	[h:display=setStrProp(display,"NPCVisibility",NPCVisibility)]
	[h:display=setStrProp(display,"HiddenOpacity",HiddenOpacity)]
	[h:display=setStrProp(display,"StatblockFrame",StatblockFrame)]
	
	[h:setLibProperty("Display", display, function.getNamespace())]

	[h,if(isOverlayRegistered("Initiative")==1),code:{
	[macro("overlay/Initiative Overlay@this"):"output=self"]
	};{}]
	[h,if(isOverlayRegistered("Framework Macros")==1),code:{
	[macro("overlay/OverlayMiniMenu@this"):"output=self"]
	};{}]

};{}]

[r,if(macro.args=="blacklist"),code:{


	[h:tableblacklist=getLibProperty("blacklist", function.getNamespace())]

	
	[h:res=input("tableblacklist|"+tableblacklist+"|Table Blacklist")]
	[h:abort(res)]

	
	[h:setLibProperty("blacklist", tableblacklist, function.getNamespace())]


};{}]


[h,if(isDialogVisible("Settings")==1),code:{
[macro("campaign/Campaign Settings@this"):""]
};{}]