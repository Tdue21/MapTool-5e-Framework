<!----------List PC Libs----------->
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
<!----------End of List PC Libs----------->
[h:position=0]
[h,count(listcount(ListPC),""),code:{

	[h:currentPC=listget(ListPC,roll.count)]

	[h:name=replace(currentPC,"^Lib:","")]

	
	[h,if(findToken(name)==""),code:{
		
		
		[h:start=getLibProperty("Start","Lib:Campaign")]
		
		[h:id=findToken("Monster","00.DM")]
		[h:center=getViewCenter(0,";")]
		[h:xCoord=getStrProp(center,"centerX")]
		[h:xCoord=xCoord+position]
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
		[h,if(listfind(macroList,"- Elev")<0):createMacro("- Elev","[macro('character/Elevation@this'):'elevation=-1;tokenName='+token.name]", "minWidth=53;sortBy=3;group=Other Macros")]
		[h,if(listfind(macroList,"Elev +")<0):createMacro("Elev +","[macro('character/Elevation@this'):'elevation=1;tokenName='+token.name]", "minWidth=53;sortBy=4;group=Other Macros")]
		[h,if(listfind(macroList,"Range")<0):createMacro("Range","[macro('campaign/Range@this'):'']", "minWidth=120;sortBy=1;color=orange;group=Other Macros")]
		[h,if(listfind(macroList,"Light")<0):createMacro("Light","[macro('campaign/Light@this'):'']", "minWidth=120;sortBy=2;color=yellow;group=Other Macros")]
		
		[h:setName(name)]
		
		[h:setPC()]
		
		[h:setPropertyType("Basic")]
		
		[h,token("Lib:"+name):value=getSize(id,start)]
		[h:setSize(value)]
		
		[h,token("Lib:"+name):value=getSightType(id,start)]
		[h,if(value==""):setSightType("Normal");setSightType(value)]
		
		
		[h,token("Lib:"+name):value=getTokenImage("",id,start)]
		[h:setTokenImage(value)]
		
		[h,token("Lib:"+name):value=getTokenPortrait("",id,start)]
		[h:setTokenPortrait(value)]
		
		[h,token("Lib:"+name):value=getTokenHandout("",id,start)]
		[h:setTokenHandout(value)]
		[h:value=getLibProperty("HP","Lib:"+name)]
		[h,if(value==""):value=1;value=eval(value)]
		[h:setBar("Health",value)]
		[h,if(value==1):setBarVisible("Health",0),setBarVisible("Health",1)]
	
	};{

		[h:id=findToken(name)]
		[h:center=getViewCenter(0,";")]
		[h:xCoord=getStrProp(center,"centerX")]
		[h:yCoord=getStrProp(center,"centerY")]
		[h:xCoord=xCoord+position]

		[h:moveToken(xCoord,yCoord,0,id)]
	
	}]

	[h:position=position+1]

}]