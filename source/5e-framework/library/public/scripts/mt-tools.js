"use strict";

class MT {

    /**
     * 
     * @returns 
     */
    static async getMapEncounters() {
        if (typeof MapTool === typeof undefined) {
            return [
                { "id": 1, "name": "Encounter 1" },
                { "id": 2, "name": "Encounter 2" },
                { "id": 3, "name": "Encounter 3" }
            ];
        }
        else {
            return JSON.parse(await this.evalMacro("[r:js.getMapEncounters()]"));
        }
    }

    static async getEncounterNpcs(pinId) {
        if (typeof MapTool === typeof undefined) {
            if (pinId === 1) {
                return [
                    { tokenId: "", name: "Goblin 1", currentHP: 7, totalHP: 7, init: "+2", AC: 15, attack: "+4", damage: "1d6+1", CR: "0.25", visible: false },
                    { tokenId: "", name: "Goblin 2", currentHP: 7, totalHP: 7, init: "+2", AC: 15, attack: "+4", damage: "1d6+1", CR: "0.25", visible: false },
                    { tokenId: "", name: "Goblin 3", currentHP: 7, totalHP: 7, init: "+2", AC: 15, attack: "+4", damage: "1d6+1", CR: "0.25", visible: false },
                    { tokenId: "", name: "Goblin 4", currentHP: 7, totalHP: 7, init: "+2", AC: 15, attack: "+4", damage: "1d6+1", CR: "0.25", visible: false },
                    { tokenId: "", name: "Goblin 5", currentHP: 7, totalHP: 7, init: "+2", AC: 15, attack: "+4", damage: "1d6+1", CR: "0.25", visible: false },
                    { tokenId: "", name: "Bugbear", currentHP: 27, totalHP: 27, init: "+2", AC: 16, attack: "+4", damage: "2d8+2", CR: "1", visible: true },
                ];
            } else if (pinId === 2) {
                return [
                    { tokenId: "", name: "Bugbear 1", currentHP: 27, totalHP: 27, init: "+2", AC: 16, attack: "+4", damage: "2d8+2", CR: "1", visible: true },
                    { tokenId: "", name: "Bugbear 2", currentHP: 27, totalHP: 27, init: "+2", AC: 16, attack: "+4", damage: "2d8+2", CR: "1", visible: true },
                    { tokenId: "", name: "Bugbear 3", currentHP: 27, totalHP: 27, init: "+2", AC: 16, attack: "+4", damage: "2d8+2", CR: "1", visible: true },
                ];
            } else if (pinId === 3) {
                return [
                    { tokenId: "", name: "Ogre 1", currentHP: 47, totalHP: 59, init: "-1", AC: 11, attack: "+6", damage: "2d8+4", CR: "2", visible: false },
                    { tokenId: "", name: "Ogre 2", currentHP: 59, totalHP: 59, init: "-1", AC: 11, attack: "+6", damage: "2d8+4", CR: "2", visible: false },
                ];
            }
        } else {
            return JSON.parse(await this.evalMacro(`[r:js.getEncounterNpcs("${pinId}")]`));
        }
    }

    /**
     * 
     */
    static async getCharacters() {
        if (typeof MapTool === typeof undefined) {
            return [
                { tokenId: "", name: "Kalidar", level: 9, playerName: "William", currentHP: 67, totalHP: 67, GP: 242.3, XP: 14000, init: "+4" },
                { tokenId: "", name: "Violet", level: 9, playerName: "Marcus", currentHP: 67, totalHP: 91, GP: 136.4, XP: 14000, init: "+2" },
                { tokenId: "", name: "Rowan", level: 9, playerName: "Jesper", currentHP: 57, totalHP: 57, GP: 324.43, XP: 14000, init: "+2" },
                { tokenId: "", name: "Max", level: 9, playerName: "Max", currentHP: 86, totalHP: 94, GP: 34.543, XP: 14000, init: "+3" }
            ];
        } else {
            const rawData = await evalMacro(`[h:info=getInfo("client")]
[h:libTokens = json.getr(info, "library tokens")]
[h:libList = json.fields(libTokens)]

[h:tokenIds=getTokens("json", "${JSON.stringify(args)}")]
[h,foreach(tokenId, tokenIds, ""),code: {
    [h:name=getTokenName(tokenId)]
    [h:tokens=json.set(tokens, tokenId, name)]
}]`);


        }



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