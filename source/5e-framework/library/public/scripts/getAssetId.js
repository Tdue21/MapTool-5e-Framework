"use strict";

/**
 * Creates a temporary token on the current map, with the defined image url for image. 
 * The asset id is then read of the token, and the token is removed. 
 * @param {string} imageUrl - The lib:// route of the image. 
 * @returns The asset id of the image. 
 */
function getAssetId(imageUrl) {
    let tokenData = {
        "name": "temp",
        "tokenImage": imageUrl,
        "layer": "Hidden"
    };
    MTScript.setVariable("tokenData", JSON.stringify(tokenData));
    MTScript.evalMacro(`
        [h:tokenId = createToken(tokenData)]
        [h:assetId = getTokenImage('', tokenId)]
        [h:removeToken(tokenId)]
    `);
    let assetId = MTScript.getVariable("assetId");
    return assetId;
}
MTScript.registerMacro("getAssetId", getAssetId);
