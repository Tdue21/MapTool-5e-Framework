"use strict";

/**
 * 
 */
function getCharacterLibs() {

	/*
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
	*/
	let tokens = MapTool.clientInfo.libraryTokens();
	let list = [];

	for (const item in tokens) {
		MTScript.setVariable("libName", item);
		MTScript.evalMacro(`
			[h:prop = getLibProperty("LibName", libName)]
			[h:hidden = getLibProperty("hidden", libName)]
		`);
		const prop = MTScript.getVariable("prop");
		const hidden = MTScript.getVariable("hidden") === "1";

		if (prop !== "" && !hidden) {
			list.push(item);
		}
	}

	if (!Helpers.isGM()) {
		const maps = Helpers.getAllMapNames();
		for (const map of maps) {

		}
	}




	/*
	
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

}
MTScript.RegisterMacro("getCharacterLibs", getCharacterLibs);

/**
 * 
 */
function getEncounterNpcs() {

}
MTScript.RegisterMacro("getEncounterNpcs", getEncounterNpcs);

/**
 * 
 * @returns 
 */
function getMapEncounters() {
	let tokens = MapTool.tokens.getMapTokens();
	let result = [];
	for (const token of tokens) {
		if (token.isPC() && token.isOwner("none")) {
			result.push({ "id": token.getId(), "name": token.getName() });
		}
	}
	return result;
}
MTScript.RegisterMacro("getMapEncounters", getMapEncounters);

/**
 * 
 */
class Helpers {
	static isGM() {
		MTScript.evalMacro(`[h:isGM = isGM()]`);
		const isGM = MTScript.getVariable("isGM") === "1";
		return isGM;
	}

	static getAllMapNames() {
		MTScript.evalMacro(`[h:maps = getAllMapNames("json")]`);
		const maps = JSON.parse(MTScript.getVariable("maps"));
		return maps;
	}
}