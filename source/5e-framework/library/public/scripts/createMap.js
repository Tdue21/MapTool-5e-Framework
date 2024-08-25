"use strict";

function createMap(mapData) {
    try {
        const data = JSON.parse(atob(mapData));

        MTScript.setVariable("mapName", data.mapName);
        MTScript.setVariable("settings", data.settings);
        MTScript.evalMacro(`[h:createMap(mapName, settings)][h:setCurrentMap(mapName)]`);

        for (const token of tokens) {
            const tokenData = {
                name: token.name,
                tokenImage: getAssetId(token.tokenImage),
                size: token.size,
                layer: token.layer
            };
            const opacity = token.opacity;
            MTScript.setVariable("data", JSON.stringify(tokenData));
            MTScript.setVariable("opacity", opacity);
            MTScript.evalMacro(`[h:tokenId = createToken(data)][h:setTokenOpacity(opacity, tokenId)]`);

            if(token.command != undefined) {
                
            }
        }

    } catch (e) {
        MapTool.chat.broadcast("createMap: " + e + "\n" + e.stack);
    }
}
MTScript.registerMacro("createMap", createMap);
