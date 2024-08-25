[h:statblock=macro.args]

[h:BestiaryObj=getLibProperty("Bestiary","Lib:Compendium")]

[h:statblockValue=json.get(BestiaryObj,statblock)]

[h,if(json.type(statblockValue)=="UNKNOWN"),code:{

	[h:statblockValue='{"name":"'+statblock+'"}']
	
};{}]

[h:name=json.get(statblockValue,"name")]
[h:name=replace(name,'"',"'")]

[h:id=findToken("Monster","00.DM")]
[h:center=getViewCenter(0,";")]
[h:xCoord=getStrProp(center,"centerX")]
[h:yCoord=getStrProp(center,"centerY")]
[h:newId=copyToken(id,1,"00.DM",'{"name":"'+name+'","x":'+xCoord+',"y":'+yCoord+'}')]

[h:switchToken(newId)]
<!-----------------ASSET------------------->
[h:dragon="asset://87f4e9bfa4f1f3db250b57b3599fa4e9"]
[h:eagle="asset://931c72c41be77a3b317cc6627c959f94"]
[h:elf="asset://c4a499da1e97010b2ff20dcdb4e2054f"]
[h:hero="asset://0b21e8af0c7e51d2876cef4cd79da722"]
[h:mage="asset://8bd5d42f6f7dca7057a86f790ceecb3c"]
[h:mystic="asset://d214a2592e7dcc526be2c5e11c14b52b"]
[h:troll="asset://85382ae371d18220e98fccc16221326a"]
[h:wolf="asset://741ecc9e6639bf092f55440f1ddbe9f9"]

[h:typeField=json.get(statblockValue,"type")]

[h:type=substring(typeField,0,if(indexOf(typeField," ")==-1,length(typeField),indexOf(typeField," ")))]
[h:asset=""]
[h,switch(type),code:
	case "aberration":{[h:asset=dragon]};
	case "beast":{
		[h:speed=json.get(statblockValue,"speed")]
		[h:fly=matches(speed,".*fly.*")]
			[h:asset=if(fly==1,eagle,wolf)]
		
		};
	case "celestial":{[h:asset=hero]};
	case "construct":{[h:asset=hero]};
	case "dragon":{[h:asset=dragon]};
	case "elemental":{[h:asset=eagle]};
	case "fey":{[h:asset=elf]};
	case "fiend":{[h:asset=troll]};
	case "giant":{[h:asset=troll]};
	case "humanoid":{
		
		[h:elfToken=matches(typeField,".*(elf|gnome|merfolk).*")]
		[h:trollToken=matches(typeField,".*(goblin|sahuagin|orc|grimlock).*")]
		[h:dragonToken=matches(typeField,".*(kobold|lizardfolk|dragonborn).*")]
		[h:eagleToken=matches(typeField,".*aarakocra.*")]
		[h:wolfToken=matches(typeField,".*(shapechanger|tabaxi|gnoll).*")]

		[h:acField=json.get(statblockValue,"ac")]
		[h:acField=replace(acField,"\\(.*","")]
		[h,if(isNumber(acField)==1):heavy=if(number(acField)>=16,1,0);heavy=0]

		[h,if(heavy==1):asset=hero]
		[h,if(elfToken==1):asset=elf]
		[h,if(trollToken==1):asset=troll]
		[h,if(dragonToken==1):asset=dragon]
		[h,if(eagleToken==1):asset=eagle]
		[h,if(wolfToken==1):asset=wolf]

		
		[h,if(asset==""):asset=mage]
		
		};
	case "monstrosity":{[h:asset=dragon]};
	case "ooze":{[h:asset=wolf]};
	case "plant":{[h:asset=troll]};
	case "undead":{[h:asset=mage]};
	case "swarm":{

		[h:speed=json.get(statblockValue,"speed")]
		[h:fly=matches(speed,".*fly.*")]
			[h:asset=if(fly==1,eagle,wolf)]
		
		};
	default:{[h:asset=mage]}
]

[h:assetField=json.get(statblockValue,"asset")]

[h,if(assetField==""):assProps="";assProps=getAssetProperties(assetField)]
[h,if(json.type(assProps)=="UNKNOWN"):assStatus="broken";assStatus=json.get(assProps,"status")]


[h,if(assetField=="" || assStatus=="broken"):setTokenImage(asset);setTokenImage(assetField)]
[h:setPropertyType("NPC")]
<!-----------------MACROS------------------->
[h:macroList=getMacros()]

[h,if(listfind(macroList,"Statblock")<0):createMacro("Statblock","[macro('Macro Frame@Lib:Bestiary'):token.name]", "minWidth=120;fontColor=black;color=maroon;fontColor=white;sortBy=0")]
[h,if(listfind(macroList,"Initiative")<0):createMacro("Initiative","[macro('Mass Initiative@Lib:Bestiary'):'']", "minWidth=53;sortBy=1")]
[h,if(listfind(macroList,"Hide")<0):createMacro("Hide","[macro('Show Hide All@Lib:Campaign'):'idList='+getSelected()]", "minWidth=53;sortBy=2;playerEditable=0")]
[h,if(listfind(macroList,"Interact")<0):createMacro("Interact","[macro('Interact@Lib:Campaign'):'']", "minWidth=120;sortBy=1;color=teal;fontColor=white;group=Other Macros")]
[h,if(listfind(macroList,"Light")<0):createMacro("Light","[macro('Light@Lib:Campaign'):'']", "minWidth=120;sortBy=2;color=yellow;group=Other Macros")]
[h,if(listfind(macroList,"Range")<0):createMacro("Range","[macro('Range@Lib:Campaign'):'']", "minWidth=120;sortBy=3;color=orange;group=Other Macros")]

[h,if(listfind(macroList,"- Elev")<0):createMacro("- Elev","[macro('Elevation@Lib:Character'):'elevation=-1;tokenName='+token.name]", "minWidth=53;sortBy=4;group=Other Macros")]
[h,if(listfind(macroList,"Elev +")<0):createMacro("Elev +","[macro('Elevation@Lib:Character'):'elevation=1;tokenName='+token.name]", "minWidth=53;sortBy=5;group=Other Macros")]


[h:list=getLibProperty("List","Lib:Bestiary")]

[h:closeFrame(macro.args)]


[h:setProperty("Stats",statblockValue)]
[h:setProperty("CreatureName",statblock)]

[h:settings=decode(json.get(statblockValue,"settings"))]
[h:size=getStrProp(settings,"size")]
[h:setSize(if(size=="","Medium",size))]


[h:hp=json.get(statblockValue,"hp")]
[h:hpRoll=replace(hp,".*\\(|\\).*|\\s","")]
[h:hp=replace(hp,"\\s.*","")]

[h:gameplay=getLibProperty("Gameplay","Lib:Campaign")]
[h:rollNPC=getStrProp(gameplay,"rollNPC")]

[r,if(rollNPC==1),code:{

	[macro("Dice Roller@Lib:Campaign"):"text="+name+" HP;value="+hpRoll+";tokenName="+name]
	[h:hp=macro.return]

};{}]



[h:setProperty("Hit Points",hp+"/"+hp)]

[h:ac=json.get(statblockValue,"ac")]
[h:setProperty("Armor Class",ac)]

[h:setProperty("Elevation",0)]

[h:display=getLibProperty("Display","Lib:Campaign")]
[h:NPCVisibility=getStrProp(display,"NPCVisibility")]
[h:HiddenOpacity=getStrProp(display,"HiddenOpacity")]

[h,if(isGM()==1 && NPCVisibility==1),code:{

	[h:token.visible=0]

	[h:setTokenOpacity(HiddenOpacity*0.01)]

};{

	[h:playerName=getPlayerName()]
	
	[h:setOwner(playerName)]

}]

[h,if(isDialogVisible(statblock)==1),code:{
[h:closeDialog(statblock)]
[macro('Macro Frame@Lib:Bestiary'):token.name]
};{}]





