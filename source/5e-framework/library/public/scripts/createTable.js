"use strict";

try {
    const args = MTScript.getMTScriptCallingArgs()[0];
    const data = JSON.parse(atob(args));

    MTScript.setVariable("tableName", data.tableName);
    MTScript.setVariable("visible", data.visible ? 1 : 0);
    MTScript.setVariable("rollable", data.rollable ? 1 : 0);
    MTScript.setVariable("assetId", getAssetId(data.imageUrl));
    MTScript.setVariable("tableRoll", data.tableRoll);

    MTScript.evalMacro(`
        [h:createTable(tableName, visible, rollable, assetId)]
        [h:setTableRoll(tableName, tableRoll)]
    `);

    for (const element of data.entries) {
        MTScript.setVariable("tableName", tableName);
        MTScript.setVariable("rangeStart", element.start);
        MTScript.setVariable("rangeEnd", element.end);
        MTScript.setVariable("result", element.value);
        MTScript.setVariable("assetId", getAssetId(element.imageUrl));

        MTScript.evalMacro(`[h:addTableEntry(tableName, rangeStart, rangeEnd, result, assetId)]`);
    }
} catch (e) {
    MapTool.chat.broadcast("createTable: " + e + "\n" + e.stack);
}
