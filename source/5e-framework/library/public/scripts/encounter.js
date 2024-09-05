"use strict";

function getCharacterLibs() {
    let tokens = MapTool.clientInfo.libraryTokens();
	let list = [];
	
    for (const item in tokens) {        
        MTScript.setVariable("libName", item);
        MTScript.evalMacro(`[h:prop = getLibProperty("LibName", item)][h:hidden = getLibProperty("hidden", item)]`);
		let prop = MTScript.getVariable("prop");
		let hidden = MTScript.getVariable("hidden") === "1";

		if(prop !== "" && !hidden) {
			list.push(item);
		}
    }
} 
MTScript.RegisterMacro("getCharacterLibs", getCharacterLibs);

function getMapEncounters() {
	let tokens = MapTool.tokens.getMapTokens();
	let result = [];
	for (const token of tokens) {
		if(token.isPC() && token.isOwner("none")) {
			result.push({ "id": token.getId(), "name": token.getName()});
		}				
	}
	return result;
}
MTScript.RegisterMacro("getMapEncounters", getMapEncounters);
        

            
/*

[h:]


<!----------List PC Libs----------->
[h:info=getInfo("client")]
[h:libtokens=json.get(info,"library tokens")]
[h:libList=json.fields(libtokens)]

[h:list=libList]
[h,count(listcount(libList)),code:{
	[h:currentLib=listget(libList,roll.count)]
	[h:settingsProp=getLibProperty("LibName",currentLib)]
	[h,if(settingsProp==""):list=listdelete(list,listfind(list,currentLib));""]
	[h:hidden=getLibProperty("hidden",currentLib)]
	[h,if(hidden==1):list=listdelete(list,listfind(list,currentLib));""]
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
[h:tokens=listsort(ListPC,"N")]






[h:libtokens=json.get(info,"library tokens")]
[h:list=json.fields(libtokens)]
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
[h:tokens=listsort(ListPC,"N")]





*/    

