"use strict";

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

