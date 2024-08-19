"use strict";

function createTable(tableName, visible, rollable, tableRoll, imageUrl, entries) {
    MTScript.setVariable("tableName", tableName);
    MTScript.setVariable("visible", visible ? 1 : 0);
    MTScript.setVariable("rollable", rollable ? 1 : 0);
    MTScript.setVariable("assetId", getAssetId(imageUrl));
    MTScript.setVariable("tableRoll", tableRoll);

    MTScript.evalMacro(`
        [h:createTable(tableName, visible, rollable, assetId)]
        [h:setTableRoll(tableName, tableRoll)]
    `);

    for (const element of entries) {
        MTScript.setVariable("tableName", tableName);
        MTScript.setVariable("rangeStart", element.start);
        MTScript.setVariable("rangeEnd", element.end);
        MTScript.setVariable("result", element.value);
        MTScript.setVariable("assetId", getAssetId(element.imageUrl));

        MTScript.evalMacro(`[h:addTableEntry(tableName, rangeStart, rangeEnd, result, assetId)]`);
    }
}

try {
    const args = MTScript.getMTScriptCallingArgs()[0];
    const data = JSON.parse(atob(args));

    createTable(data.tableName, data.visible, data.rollable, data.tableRoll, data.imageUrl, data.entries);
} catch (e) {
    MapTool.chat.broadcast("" + e + "\n" + e.stack);
}
