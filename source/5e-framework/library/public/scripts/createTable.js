"use strict";

function createTable(tableName, visible, rollable, tableRoll, imageUrl, entries) {
    MTScript.setVariable("tableName", tableName);
    MTScript.setVariable("visible", visible ? 1 : 0);
    MTScript.setVariable("rollable", rollable ? 1 : 0);
    
    MTScript.setVariable("tableRoll", tableRoll);

/*
    [macro("function.getAssetId@this"):"lib://" + ns + "/assets/dice/d4.png"]
    [h:d4assetId = macro.return]
    [h:tableName = "BlankDice"]
    [h:createTable(tableName, 0, 1, d20assetId)]
    [h:setTableRoll(tableName, "d17+3")]
*/
}

function getAssetId(imageUrl) {
    let tokenData = {
        name: "temp", 
        tokenImage: imageUrl,
        layer: "Hidden"
    };
    MTScript.SetVariable("tokenData", JSON.stringify(tokenData));
    MTScript.evalMacro(`
        [h:tokenId = createToken(tokenData)]
        [h:assetId = getTokenImage('', tokenId)]
        [h:removeToken(tokenId)]
    `);
    let tokenId = MTScript.getVariable("assetId");
    return tokenId;
}