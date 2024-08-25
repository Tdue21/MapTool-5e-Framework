"use strict";

function createTable(tableData) {
    try {
        const data = JSON.parse(atob(tableData));

        MTScript.setVariable("tableName", data.tableName);
        MTScript.setVariable("visible", data.visible ? 1 : 0);
        MTScript.setVariable("rollable", data.rollable ? 1 : 0);
        MTScript.setVariable("assetId", getAssetId(data.imageUrl));
        MTScript.setVariable("tableRoll", data.tableRoll);

        MTScript.evalMacro(`[h:createTable(tableName, visible, rollable, assetId)]
[h:setTableRoll(tableName, tableRoll)]`);

        for (const element of data.entries) {
            MTScript.setVariable("tableName", data.tableName);
            MTScript.setVariable("rangeStart", element.start);
            MTScript.setVariable("rangeEnd", element.end);
            MTScript.setVariable("result", element.value);
            MTScript.setVariable("assetId", getAssetId(element.imageUrl));

            MTScript.evalMacro(`[h:addTableEntry(tableName, rangeStart, rangeEnd, result, assetId)]`);
        }
    } catch (e) {
        MapTool.chat.broadcast("createTable: " + e + "\n" + e.stack);
    }
}
MTScript.registerMacro("createTable", createTable);

function createTables(tableData) {
    try {
        const rawData = atob(tableData);
        const data = JSON.parse(rawData);

        for (const table of data) {
            const tdata = btoa(JSON.stringify(table));
            createTable(tdata);
        }
   
    } catch (e) {
        MapTool.chat.broadcast("createTables: " + e + "\n" + e.stack);
    }
}
MTScript.registerMacro("createTables", createTables);
