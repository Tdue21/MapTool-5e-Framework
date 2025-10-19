"use strict";

function showStatblock(name) {
    MTScript.SetVariable("propName", propName);
    MTScript.SetVariable("nameSpace", "dovesoft.dnd5e");

    var data = MTScript.evalMacro("[r:getLibProperty(propName, nameSpace)]");

    let bestiary = JSON.parse(data);
    let monster = bestiary[name];


    MTScript.SetVariable("dialogName", `NPC Statblock - ${monster.name}`);
    MTScript.SetVariable("uri", "lib://dovesoft.dnd5e/html/statblock.html");
    MTScript.SetVariable("options", JSON.stringify(monster));
    
    MTScript.evalMacro("[h:html.dialog5(dialogName, uri, options)]");
}
MTScript.RegisterMacro("showStatblock", showStatblock);

/*

function showDialog(dialogName, uri, options) {
    MTScript.setVariable("dialogName", dialogName);
    MTScript.setVariable("uri", uri);
    MTScript.setVariable("options", options);

    MTScript.evalMacro("[h:html.dialog5(dialogName, uri, options)]");
}

function closeDialog(dialogName) {
    MTScript.setVariable("dialogName", dialogName);
    MTScript.evalMacro("[h:closeDialog(dialogName)]");
}

function showFrame(frameName, uri, options) {
    MTScript.setVariable("frameName", frameName);
    MTScript.setVariable("uri", uri);
    MTScript.setVariable("options", options);

    MTScript.evalMacro("[h:html.frame5(frameName, uri, options)]");
}

function closeFrame(frameName) {
    MTScript.setVariable("dialogName", frameName);
    MTScript.evalMacro("[h:closeFrame(dialogName)]");
}

function showOverlay(name, uri, options){
    MTScript.setVariable("name", name);
    MTScript.setVariable("uri", uri);
    MTScript.setVariable("options", options);

    MTScript.evalMacro("[h:html.overlay(name, uri, options)]");
}

function closeOverlay(name) {
    MTScript.setVariable("name", name);
    MTScript.evalMacro("[h:closeOverlay(name)]");
}

function isOverlayRegistered(name) {
    MTScript.setVariable("name", name);
    return MTScript.evalMacro("[r:isOverlayRegistered(name)]") === 1;
}

function isOverlayVisible(name) {
    MTScript.setVariable("name", name);
    return MTScript.evalMacro("[r:isOverlayVisible(name)]") === 1;
}

function setOverlayVisible(name, isVisible) {
    MTScript.setVariable("name", name);
    MTScript.setVariable("isVisible", isVisible ? 1 : 0);
    MTScript.evalMacro("[r:setOverlayVisible(name, isVisible)]");
}
    */