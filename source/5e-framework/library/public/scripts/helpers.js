"use strict";

function getAssetId(imageUrl) {
    let tokenData = {
        name: "temp",
        tokenImage: imageUrl,
        layer: "Hidden"
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

function atob(data) {
    MTScript.setVariable("data", data);
    MTScript.evalMacro("[h:result=base64.decode(data)]");
    return MTScript.getVariable("result");
}
