[h:ns = "dovesoft.dnd5e"]

[h:js.createNS(ns)]
[h:js.evalUri(ns, "lib://" + ns + "/scripts/onFirstInit.js?cachelib=false")]

[h:data = data.getStaticData(ns, "/public/assets/data/initial-data.json"))]
[h:keys = json.fields(data)]
[h,foreach(key, data, ""), code: {
    [h:value=json.get(data, key)]
    [h:setLibProperty(key, value, ns)]
}]

[h:setLibProperty("Welcome", encode(data.getStaticData(ns, "/public/assets/data/welcome.md")), ns)]
[h:setLibProperty("Classes", data.getStaticData(ns, "/public/assets/data/Classes.json"), ns)]
[h:setLibProperty("Equipment", data.getStaticData(ns, "/public/assets/data/equipment.json"), ns)]
[h:setLibProperty("Spells", data.getStaticData(ns, "/public/assets/data/Spells.json"), ns)]
[h:setLibProperty("Feats", data.getStaticData(ns, "/public/assets/data/Feats.json"), ns)]
[h:setLibProperty("AdditionalFeats", data.getStaticData(ns, "/public/assets/data/AdditionalFeats.json"), ns)]
[h:setLibProperty("Bestiary", data.getStaticData(ns, "/public/assets/data/Bestiary.json"), ns)]

[h:classSpells = data.getStaticData(ns, "/public/assets/data/class-spells.json")]
[h:classes = json.fields(classSpells)]
[h,foreach(class, classes, ""), code: {
    [h:spellList = json.get(classSpells, class)]
    [h:setLibProperty(class, spellList, ns)]
}]

[h:tableData = data.getStaticData(ns, "/public/assets/data/initial-tables.json")]
[h:tableData = replace(tableData, "%ns%", ns)]
[h:tables = base64.encode(tableData)]
[h:js.createTables(tables)]

[h:tokenImage = "lib://" + ns + "/assets/images/bgtexture.jpeg"]
[h:assetId = js.getAssetId(tokenImage)]

[h:mapData = data.getStaticData(ns, "/public/assets/data/initial-maps.json")]
[h:mapData = replace(mapData, "%bgpaint%", if(assetId == "", "#CEA883", assetId))]
[h:maps = base64.encode(mapData)]
[h:js.createMaps(maps)]

[h:setCurrentMap("00.DM")]

[h:data = json.append("", 
    data.getStaticData(ns, "/public/assets/data/notebooks/welcome.json"), 
    data.getStaticData(ns, "/public/assets/data/notebooks/rules.json"), 
    data.getStaticData(ns, "/public/assets/data/notebooks/dmtools.json")
)]
[h:notebooks = base64.encode(data)]
[h:js.createNotebooks(notebooks)]

[h:macroData = strformat(data.getStaticData(ns, "/public/assets/data/initial-macros.json"))]
[h:keys = json.fields(macroData)]
[foreach(panel, keys, ""),code:{
    [h:panelMacros = json.get(macroData, panel)]
    [foreach(props, panelMacros, ""): createMacro(props, panel)]
}]

[h:broadcast("onFirstInit done")]