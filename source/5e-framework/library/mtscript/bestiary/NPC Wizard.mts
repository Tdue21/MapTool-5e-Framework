[h:id=getSelected()]
[h:id=listget(id,0)]


[h:replaceAsset=0]
[h,if(id==""),code:{

	[h:replaceAsset=1]

	[h:res=input("var|No tokens selected, create new NPC?||label|span=true",
	"name|Enemy "+1d100+"|NPC Name")]
	[h:abort(res)]


	[h:id=findToken("Monster","00.DM")]
	[h:center=getViewCenter(0,";")]
	[h:xCoord=getStrProp(center,"centerX")]
	[h:yCoord=getStrProp(center,"centerY")]
	[h:id=copyToken(id,1,"00.DM","{'name':'"+name+"','x':"+xCoord+",'y':"+yCoord+"}")]

	[h:tokenName=getName(id)]
	[h:switchToken(id)]

	[h:display=getLibProperty("Display", function.getNamespace())]
	[h:NPCVisibility=getStrProp(display,"NPCVisibility")]
	[h:HiddenOpacity=getStrProp(display,"HiddenOpacity")]
	
	[h,if(isGM()==1 && NPCVisibility==1):token.visible=0]
	[h,if(isGM()==1 && NPCVisibility==1):setTokenOpacity(HiddenOpacity*0.01)]
	
};{

	[h:tokenName=getName(id)]
	[h:switchToken(id)]


	<!-----------------CONFIRM------------------->
	[h:res=input("var|Set "+tokenName+"'s token as NPC?||label|span=true")]
	[h:abort(res)]
	


}]

<!-----------------MACROS------------------->
[h:setPropertyType("NPC")]


[h:macroList=getMacros()]

[h,if(listfind(macroList,"Statblock")<0):createMacro("Statblock","[macro('bestiary/Macro Frame@this'):token.name]", "minWidth=120;fontColor=black;color=maroon;fontColor=white;sortBy=0")]
[h,if(listfind(macroList,"Initiative")<0):createMacro("Initiative","[macro('bestiary/Mass Initiative@this'):'']", "minWidth=53;sortBy=1")]
[h,if(listfind(macroList,"Hide")<0):createMacro("Hide","[macro('campaign/Show Hide All@this'):'idList='+getSelected()]", "minWidth=53;sortBy=2;playerEditable=0")]
[h,if(listfind(macroList,"- Elev")<0):createMacro("- Elev","[macro('character/Elevation@this'):'elevation=-1;tokenName='+token.name]", "minWidth=53;sortBy=4;group=Other Macros")]
[h,if(listfind(macroList,"Elev +")<0):createMacro("Elev +","[macro('character/Elevation@this'):'elevation=1;tokenName='+token.name]", "minWidth=53;sortBy=5;group=Other Macros")]
[h,if(listfind(macroList,"Range")<0):createMacro("Range","[macro('campaign/Range@this'):'']", "minWidth=120;sortBy=1;color=orange;group=Other Macros")]
[h,if(listfind(macroList,"Light")<0):createMacro("Light","[macro('campaign/Light@this'):'']", "minWidth=120;sortBy=2;color=yellow;group=Other Macros")]

[h:BestiaryObj=getLibProperty("Bestiary", function.getNamespace())]
[h:list=json.fields(BestiaryObj)]

[h:list=listSort(list,"A")]

[h:res=input("statblock|Add New,"+list+"||list|value=string")]
[h:abort(res)]


[r,if(statblock=="Add New"),code:{

	[h,macro("bestiary/Edit Creature@this"):"creature=;prop="]
	[h:statblock=getStrProp(macro.return,"creature")]
	[h:statblockValue=getStrProp(macro.return,"prop")]
	
	[h:setProperty("Stats",statblockValue)]
	[h:setProperty("CreatureName",statblock)]

};{

	[h:statblockValue=json.get(BestiaryObj,statblock)]
	[h:setProperty("Stats",statblockValue)]
	[h:setProperty("CreatureName",statblock)]
	
	[h:settings=decode(json.get(statblockValue,"settings"))]
	[h:size=getStrProp(settings,"size")]
	[h:setSize(size)]

	[h:assetField=json.get(statblockValue,"asset")]
	
	[h,if(assetField==""):"";assProps=getAssetProperties(assetField)]
	[h,if(assetField==""):assStatus="";assStatus=json.get(assProps,"status")]
	
	[h,if(replaceAsset==0),code:{};{
		[h,if(assetField=="" || assStatus=="broken"):"I should include the default tokens here, but I am too lazy for that...";setTokenImage(assetField)]
	}]


	[h:hp=json.get(statblockValue,"hp")]
	[h:hpRoll=replace(hp,".*\\(|\\).*|\\s","")]
	[h:hp=replace(hp,"\\s.*","")]

	[h:gameplay=getLibProperty("Gameplay", function.getNamespace())]
	[h:rollNPC=getStrProp(gameplay,"rollNPC")]
	
	[r,if(rollNPC==1),code:{
	
		[macro("campaign/Dice Roller@this"):"text="+name+" HP;value="+hpRoll+";tokenName="+name]
		[h:hp=macro.return]
	
	};{}]

	[h:setProperty("Hit Points",hp+"/"+hp)]

	[h:ac=json.get(statblockValue,"ac")]
	[h:setProperty("Armor Class",ac)]
	

}]

[h:setProperty("Elevation",0)]