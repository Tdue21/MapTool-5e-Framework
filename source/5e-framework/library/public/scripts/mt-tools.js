"use strict";

class MT {

    /**
     * 
     * @returns 
     */
    static async getMapEncounters() {
        const args = { "pc": 1, "owned": "none"};
        const rawData = await evalMacro(`[h:tokens="{}"]
[h:tokenIds=getTokens("json", "${JSON.stringify(args)}")]
[h,foreach(tokenId, tokenIds, ""),code: {
    [h:name=getTokenName(tokenId)]
    [h:tokens=json.set(tokens, tokenId, name)]
}]`);
        const data = JSON.parse(rawData);
        return data;
    }
    
    /**
     * 
     */
    static async getCharacters() {
        const rawData = await evalMacro(`[h:info=getInfo("client")]
[h:libTokens = json.getr(info, "library tokens")]
[h:libList = json.fields(libTokens)]

[h:tokenIds=getTokens("json", "${JSON.stringify(args)}")]
[h,foreach(tokenId, tokenIds, ""),code: {
    [h:name=getTokenName(tokenId)]
    [h:tokens=json.set(tokens, tokenId, name)]
}]`);
            





/*
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
[h:partySize=listcount(tokens)]
*/
    }

    static async evalMacro(macro) {
        try {
            let uri = "macro:EvaluateMacro@lib:dovesoft.dnd5e";
            let r = await fetch(uri, { method: "POST", body: macro });
            let result = await r.text();
            return result;
        } catch (error) {
            console.log("### evaluateMacro: " + error.stack);
        }
    }
}