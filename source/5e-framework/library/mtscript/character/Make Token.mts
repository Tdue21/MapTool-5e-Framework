[h,if(macro.args==""):name=getProperty("LibName");name=getLibProperty("LibName",macro.args)]

[h,if(findToken(name)==""),code:{



	
	
	[h:start=getLibProperty("Start", function.getNamespace())]
	
	[h:id=findToken("Monster","00.DM")]
	[h:center=getViewCenter(0,";")]
	[h:xCoord=getStrProp(center,"centerX")]
	[h:yCoord=getStrProp(center,"centerY")]
	[h:newId=copyToken(id,1,"00.DM",'{"name":"'+name+'","x":'+xCoord+',"y":'+yCoord+'}')]
	
	
	[h:id=findToken("Lib:"+name,start)]
	[h:owners=getOwners(",",id,start)]
	[h:setOwner(owners,newId)]
	
	[h:switchToken(newId)]
	
	
	[h:macroList=getMacros()]
	
	[h,if(listfind(macroList,"Character")<0):createMacro("Character","[macro('character/Macro Frame@this'):'macro=Character Sheet;tokenName='+token.name]", "minWidth=120;sortBy=1")]
	[h,if(listfind(macroList,"Spellcasting")<0):createMacro("Spellcasting","[macro('character/Macro Frame@this'):'macro=Spellcasting Sheet;tokenName='+token.name]", "minWidth=120;sortBy=3")]
	[h,if(listfind(macroList,"Description")<0):createMacro("Description","[macro('character/Macro Frame@this'):'macro=Description Sheet;tokenName='+token.name]", "minWidth=120;sortBy=2")]
	[h,if(listfind(macroList,"Statblock")<0):createMacro("Statblock","[macro('character/Macro Frame@this'):'macro=Statblock;tokenName='+token.name]", "minWidth=120;fontColor=black;color=maroon;fontColor=white;sortBy=0")]
	
	[h,if(listfind(macroList,"Interact")<0):createMacro("Interact","[macro('campaign/Interact@this'):'']", "minWidth=120;sortBy=1;color=teal;fontColor=white;group=Other Macros")]

	[h,if(listfind(macroList,"Rest")<0):createMacro("Rest","[macro('character/Rest@this'):token.name]", "minWidth=120;sortBy=2;color=cyan;fontColor=black;group=Other Macros")]

	[h,if(listfind(macroList,"Area Template")<0):createMacro("Area Template","[macro('character/Drop Template@this'):token.name]", "minWidth=120;sortBy=3;fontColor=red;group=Other Macros")]
	
	[h,if(listfind(macroList,"Range")<0):createMacro("Range","[macro('campaign/Range@this'):'']", "minWidth=120;sortBy=4;color=orange;group=Other Macros")]
	[h,if(listfind(macroList,"Light")<0):createMacro("Light","[macro('campaign/Light@this'):'']", "minWidth=120;sortBy=5;color=yellow;group=Other Macros")]
	
	
	[h,if(listfind(macroList,"- Elev")<0):createMacro("- Elev","[macro('character/Elevation@this'):'elevation=-1;tokenName='+token.name]", "minWidth=53;sortBy=6;group=Other Macros")]
	[h,if(listfind(macroList,"Elev +")<0):createMacro("Elev +","[macro('character/Elevation@this'):'elevation=1;tokenName='+token.name]", "minWidth=53;sortBy=7;group=Other Macros")]
	
	[h:setName(name)]
	
	[h:setPC()]
	
	[h:setPropertyType("Basic")]
	
	[h,token("Lib:"+name):value=getSize(id,start)]
	[h:setSize(value)]
	
	[h,token("Lib:"+name):value=getSightType(id,start)]
	[h:setSightType(value)]
	
	
	[h,token("Lib:"+name):value=getTokenImage("",id,start)]
	[h:setTokenImage(value)]
	
	[h,token("Lib:"+name):value=getTokenPortrait("",id,start)]
	[h:setTokenPortrait(value)]
	
	[h,token("Lib:"+name):value=getTokenHandout("",id,start)]
	[h:setTokenHandout(value)]

	[h:value=getLibProperty("HP","Lib:"+name)]
	[h,if(value=="" || value==0):value=1;value=eval(value)]
	[h:setBar("Health",value)]
	[h,if(value==1):setBarVisible("Health",0),setBarVisible("Health",1)]
	
	[h,if(isFrameVisible(name+" - Character Sheet")==1),code:{
		[h:closeFrame(name+" - Character Sheet")]
		[macro("character/Macro Frame@this"):"macro=Character Sheet;tokenName="+name]
	};{}]
	[h,if(isFrameVisible(name+" - Spellcasting Sheet")==1),code:{
		[h:closeFrame(name+" - Spellcasting Sheet")]
		[macro("character/Macro Frame@this"):"macro=Spellcasting Sheet;tokenName="+name]
	};{}]
	[h,if(isFrameVisible(name+" - Description Sheet")==1),code:{
		[h:closeFrame(name+" - Description Sheet")]
		[macro("character/Macro Frame@this"):"macro=Description Sheet;tokenName="+name]
	};{}]
	[h,if(isFrameVisible(name+" - Statblock")==1),code:{
		[h:closeFrame(name+" - Statblock")]
		[macro("character/Macro Frame@this"):"macro=Statblock;tokenName="+name]
	};{}]
	





};{

	[h:id=findToken(name)]
	[h:center=getViewCenter(0,";")]
	[h:xCoord=getStrProp(center,"centerX")]
	[h:yCoord=getStrProp(center,"centerY")]

	[h:moveToken(xCoord,yCoord,0,id)]
	
}]
