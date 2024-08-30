[h:ns = "org.maptool.dnd5e"]

[h:js.createNS(ns)]
[h:js.evalUri(ns, "lib://" + ns + "/scripts/onFirstInit.js?libcache=false")]

[h: audio = "https://raw.githubusercontent.com/rtakehara/5e-Framework/master/Resources/Audio%20Clips/Dice%201.wav," +
            "https://raw.githubusercontent.com/rtakehara/5e-Framework/master/Resources/Audio%20Clips/Dice%202.wav," +
            "https://raw.githubusercontent.com/rtakehara/5e-Framework/master/Resources/Audio%20Clips/Dice%203.wav," +
            "https://raw.githubusercontent.com/rtakehara/5e-Framework/master/Resources/Audio%20Clips/Dice%204.wav," +
            "https://raw.githubusercontent.com/rtakehara/5e-Framework/master/Resources/Audio%20Clips/Dice%205.wav," +
            "https://raw.githubusercontent.com/rtakehara/5e-Framework/master/Resources/Audio%20Clips/Dice%206.wav," +
            "https://raw.githubusercontent.com/rtakehara/5e-Framework/master/Resources/Audio%20Clips/Dice%207.wav," +
            "https://raw.githubusercontent.com/rtakehara/5e-Framework/master/Resources/Audio%20Clips/Dice%208.wav," +
            "https://raw.githubusercontent.com/rtakehara/5e-Framework/master/Resources/Audio%20Clips/Dice%209.wav," +
            "https://raw.githubusercontent.com/rtakehara/5e-Framework/master/Resources/Audio%20Clips/Dice%2010.wav," +
            "https://raw.githubusercontent.com/rtakehara/5e-Framework/master/Resources/Audio%20Clips/Dice%2011.wav"]

[h:setLibProperty("Start", "01.Start", ns)]
[h:setLibProperty("LoadAudio", "0", ns)]
[h:setLibProperty("Audio", audio, ns)]
[h:setLibProperty("door", "https://raw.githubusercontent.com/rtakehara/5e-Framework/master/Resources/Audio%20Clips/Door%20Locked.wav", ns)]
[h:setLibProperty("Weather", "0,0,0", ns)]
[h:setLibProperty("PC Output", "", ns)]
[h:setLibProperty("GM Output", "", ns)]
[h:setLibProperty("Display", "InitSize=50; darkMode=0; replaceDiceRoll=1; replaceSpellList=1; NPCVisibility=1; HiddenOpacity=40; ElevScale=60; StatblockFrame=0", ns)]
[h:setLibProperty("Gameplay", "autosetInitiative=1 ; dexInit=0 ; rerollInit=0 ; KeepPlayers=0 ; interactDistance=5 ; NPCVisibility=1 ; HiddenOpacity=40 ; rollNPC=0", ns)]
[h:setLibProperty("Spell Lists", "Bard, Cleric, Druid, Paladin, Ranger, Sorcerer, Warlock, Wizard", ns)]
[h:setLibProperty("Races", "Human, High Elf, Hill Dwarf, Lightfoot Halfling, Rock Gnome, Half-Elf, Half-Orc, Dragonborn, Tiefling", ns)]
[h:setLibProperty("Backgrounds", "Acolyte", ns)]
[h:setLibProperty("PlayerPermission", "edit=1 ; share=1 ; closeShared=0 ; viewBestiary=0 ; identify=0 ; applyDMG=1 ; viewMagicItems=0", ns)]
[h:setLibProperty("blacklist", "draconic,infernal,dwarvish,common,abyssal,druidic,elvish,celestial,Effects,BlankDice", ns)]

[h:setLibProperty("Welcome", encode(data.getStaticData(ns, function.getNamespace())), ns)]
[h:setLibProperty("Classes", data.getStaticData(ns, function.getNamespace()), ns)]
[h:setLibProperty("Equipment", data.getStaticData(ns, function.getNamespace()), ns)]
[h:setLibProperty("Spells", data.getStaticData(ns, function.getNamespace()), ns)]
[h:setLibProperty("Feats", data.getStaticData(ns, function.getNamespace()), ns)]
[h:setLibProperty("AdditionalFeats", data.getStaticData(ns, function.getNamespace()), ns)]
[h:setLibProperty("Bestiary", data.getStaticData(ns, function.getNamespace()), ns)]

[h:classSpells = data.getStaticData(ns, "/public/assets/data/class-spells.json")]
[h:classes = json.fields(classSpells)]
[h,foreach(class, classes, ""), code: {
    [h:spellList = json.get(classSpells, class)]
    [h:setLibProperty(class, spellList, ns)]
}]

[h:tokenImage = "lib://" + ns + "/assets/images/bgtexture.jpeg"]
[h:assetId = js.getAssetId(tokenImage)]

[h:mapData = data.getStaticData(ns, "/public/assets/data/initial-maps.json")]
[h:mapData = replace(mapData, "%bgpaint%", if(assetId == "", "#CEA883", assetId))]
[h:maps = base64.encode(mapData)]
[h:js.createMaps(maps)]

[h:tableData = data.getStaticData(ns, "/public/assets/data/initial-tables.json")]
[h:tableData = replace(tableData, "%ns%", ns)]
[h:tables = base64.encode(tableData)]
[h:js.createTables(tables)]

[h:setCurrentMap("00.DM")]

[h:data = json.append("", 
    data.getStaticData(ns, "/public/assets/data/notebooks/welcome.json"), 
    data.getStaticData(ns, "/public/assets/data/notebooks/rules.json"), 
    data.getStaticData(ns, "/public/assets/data/notebooks/dmtools.json")
)]
[h:notebooks = base64.encode(data)]
[h:js.createNotebooks(notebooks)]
