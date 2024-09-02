"use strict";

class MT {

    static async getMapEncounters() {
        const args = { "pc": 1, "owned": "none"};
        const rawData = evalMacro(`[r:getTokens("json", "${JSON.stringify(args)}")]`);
        const data = JSON.parse(rawData);
        



        /*


	
	[h:Pins=getTokens(",","{'pc':1,'owned':'none'}")]
	[h:repeat=listcount(Pins)]

	<input type="submit" name="load" value="Load">&nbsp;

	<select name="Pin" size="1">
	<option [r:if(pinName=="","selected='selected'","")]>Select Pin</option>
	[r,count(repeat,""),code:{
		[h:pinID=listget(Pins,roll.count)]
		[h:CurrentPin=getName(pinID)]		
		<option [r:if(pinName==CurrentPin,"selected='selected'","")]>[r:CurrentPin]</option>	
	}]
        */
    }


    
    getCharacters() {

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