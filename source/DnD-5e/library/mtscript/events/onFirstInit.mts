[h:ns = "dovesoft.dnd5e"]

[h:js.createNS(ns)]
[h:js.evalUri(ns, "lib://" + ns + "/scripts/onFirstInit.js?cachelib=false")]

[h:data = data.getStaticData(ns, "/public/assets/data/initial-data.json"))]
[h:keys = json.fields(data)]
[h,foreach(key, data, ""), code: {
    [h:value=json.get(data, key)]
    [h:setLibProperty(key, value, ns)]
}]
