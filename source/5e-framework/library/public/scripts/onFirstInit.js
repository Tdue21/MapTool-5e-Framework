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

/**
 * 
 * @param {*} imageUrl 
 * @returns 
 */
function getAssetId(imageUrl) {
    try {
        let props = {
            name: "temp",
            tokenImage: imageUrl,
            layer: "Hidden"
        };
        MTScript.setVariable("props", JSON.stringify(props));
        MTScript.evalMacro(`[h:tokenId = createToken(props)][h:assetId = getTokenImage('', tokenId)][h:removeToken(tokenId)]`);
        let assetId = MTScript.getVariable("assetId");
        return assetId;
    } catch (e) {
        MapTool.chat.broadcast("getAssetId: " + e + "\n" + e.stack);
    }
}
MTScript.registerMacro("getAssetId", getAssetId);

/**
 * 
 * @param {*} tableData 
 */
function createTable(tableData) {
    try {
        const data = JSON.parse(atob(tableData));

        MTScript.setVariable("tableName", data.tableName);
        MTScript.setVariable("visible", data.visible ? 1 : 0);
        MTScript.setVariable("rollable", data.rollable ? 1 : 0);
        MTScript.setVariable("assetId", getAssetId(data.imageUrl));
        MTScript.setVariable("tableRoll", data.tableRoll);

        MTScript.evalMacro(`[h:createTable(tableName, visible, rollable, assetId)][h:setTableRoll(tableName, tableRoll)]`);

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

/**
 * 
 * @param {*} tableData 
 */
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

/**
 * 
 * @param {*} mapData 
 */
function createMap(mapData) {
    try {
        const data = JSON.parse(atob(mapData));

        MTScript.setVariable("mapName", data.name);
        MTScript.setVariable("settings", data.settings);
        MTScript.evalMacro(`[h:createMap(mapName, settings)][h:setCurrentMap(mapName)]`);

        if (data.hasOwnProperty("tokens")) {
            for (const token of data.tokens) {
                const tokenData = {
                    name: token.name,
                    tokenImage: getAssetId(token.tokenImage),
                    size: token.size,
                    layer: token.layer,
                    x: token.x,
                    y: token.y
                };
                const opacity = token.opacity;
                MTScript.setVariable("data", JSON.stringify(tokenData));
                MTScript.setVariable("opacity", opacity);
                MTScript.evalMacro(`[h:tokenId = createToken(data)][h:setTokenOpacity(opacity, tokenId)]`);
                const tokenId = MTScript.getVariable("tokenId");

                if (token.hasOwnProperty("macros")) {
                    MapTool.chat.broadcast("createMacro: <pre>" + JSON.stringify(token.macros, null, 4) + "</pre>");

                    for (const macro of token.macros) {
                        MTScript.setVariable("tokenId", tokenId);
                        MTScript.setVariable("props", JSON.stringify(macro));
                        MTScript.evalMacro("[h:createMacro(props, tokenId)]");
                    }
                }
            }
        }
    } catch (e) {
        MapTool.chat.broadcast("createMap: " + e + "\n" + e.stack);
    }
}
MTScript.registerMacro("createMap", createMap);

/**
 * 
 * @param {*} mapsData 
 */
function createMaps(mapsData) {
    try {
        const rawData = atob(mapsData);
        const data = JSON.parse(rawData);

        for (const map of data) {
            const mapData = btoa(JSON.stringify(map));
            createMap(mapData);
        }
    } catch (e) {
        MapTool.chat.broadcast("createMaps: " + e + "\n" + e.stack);
    }
}
MTScript.registerMacro("createMaps", createMaps);

/**
 * 
 * @param {*} notebookData 
 */
function createNotebooks(notebookData) {
    try {
        const rawData = atob(notebookData);
        const notebooks = JSON.parse(rawData);

        let x = 2;
        let y = 2;
        for(const notebook of notebooks) {
            const name = notebook.name;
            const hidden = notebook.hidden;
            const settings = JSON.stringify(notebook.settings);
            const content = JSON.stringify(notebook.content);
            const tokenData = {
                name: "Lib:" + notebook.name,
                tokenImage: "lib://dovesoft.dnd5e/assets/images/book.png",
                layer: "Token",
                Size: "Medium",
                x: x,
                y: y
            };
            const macroProps = {
                label: "Notebook",
                autoExecute: true,
                color: "gray50",
                fontColor: "white",
                minWidth: 120,
                command:"[function.showNotebook('Lib:"+ name + "')]"
            };

            MTScript.setVariable("tokenData", JSON.stringify(tokenData));
            MTScript.setVariable("type", "Notebook");
            MTScript.setVariable("name", name);
            MTScript.setVariable("settings", settings);
            MTScript.setVariable("value", content);
            MTScript.setVariable("owned", hidden ? 0 : 1);
            MTScript.setVariable("props", JSON.stringify(macroProps));

            MTScript.evalMacro(`[h:tokenId=createToken(tokenData)]
[h:setPropertyType(type, tokenId)]
[h:setProperty("Name", name, tokenId)]
[h:setProperty("Settings", settings, tokenId)]
[h:setProperty("Value", value, tokenId)]
[h:setOwnedByAll(owned, tokenId)]
[h:broadcast("<pre>" + json.indent(props) + "</pre>")]
[h:createMacro(props, tokenId)]
`);
            x += 2;
        }
    } catch (e) {
        MapTool.chat.broadcast("createNotebooks: " + e + "\n" + e.stack);
    }
}
MTScript.registerMacro("createNotebooks", createNotebooks);
