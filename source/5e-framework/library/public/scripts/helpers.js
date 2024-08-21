"use strict";

/**
 * Creates a temporary token on the current map, with the defined image url for image. 
 * The asset id is then read of the token, and the token is removed. 
 * @param {*} imageUrl - 
 * @returns The asset id of the image. 
 */
function getAssetId(imageUrl) {
    if(imageUrl.includes("{ns}")) {
        imageUrl = imageUrl.replace("{ns}", "")
    }
    
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

/**
 * Apparently the atob js is not defined in the GraalVM environment, so this is a work-around. 
 * Decodes a base64 encoded string, into plain text. 
 * @param {*} data 
 * @returns The decoded base64 string. 
 */
function atob(data) {
    MTScript.setVariable("data", data);
    MTScript.evalMacro("[h:result=base64.decode(data)]");
    return MTScript.getVariable("result");
}

/**
 * Partner function to atob. Encodes a string to base64.
 * @param {*} data 
 * @returns 
 */
function btoa(data) {
    MTScript.setVariable("data", data);
    MTScript.evalMacro("[h:result=base64.encode(data)]");
    return MTScript.getVariable("result");
}

