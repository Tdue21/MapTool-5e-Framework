[h:ns = "org.maptool.dnd5e"]
[h:js.createNS(ns)]

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

[h:setLibProperty("Welcome", encode(data.getStaticData(ns, "/public/assets/data/welcome.md")), ns)]
[h:setLibProperty("Classes", data.getStaticData(ns, "/public/assets/data/Classes.json"), ns)]
[h:setLibProperty("Equipment", data.getStaticData(ns, "/public/assets/data/equipment.json"), ns)]
[h:setLibProperty("Spells", data.getStaticData(ns, "/public/assets/data/Spells.json"), ns)]
[h:setLibProperty("Feats", data.getStaticData(ns, "/public/assets/data/Feats.json"), ns)]
[h:setLibProperty("AdditionalFeats", data.getStaticData(ns, "/public/assets/data/AdditionalFeats.json"), ns)]
[h:setLibProperty("Bestiary", data.getStaticData(ns, "/public/assets/data/Bestiary.json"), ns)]



<!-- ### create the DM map for storing tokens and other stuff for the GM only. ### -->
[h:screenTexture = "lib://" + ns + "/assets/images/paper-background.png")]
[h: screenId = createMap("00.DM",
    json.set("{}",
        "player visible", json.false,
        "vision type", "Off",
        "vision distance", 100,
        "lighting style", "OVERTOP",
        "has fog", json.false,
        "ai rounding", "CELL_UNIT",
        "background paint", "#C19F7C",
        
        "grid", json.set("{}", 
            "type", "None",
            "color", "#333333"
        )
    )
)]

<!-- ### Work-around for placing an image on the background, as createMap does not yet understand lib:// uris ### -->
[h:tokenImage = "lib://" + ns + "/assets/images/dm-background.png")]
[h:tokenId = createToken(
    json.set("{}",
        "name","Image:DmBackground",
        "tokenImage", tokenImage,
        "size","Free",
        "layer", "Background"
    )
)]
[h:setTokenOpacity(0.6, tokenId)]
[h:tokenX = floor(getTokenX(1, tokenId) - (getTokenWidth(tokenId) / 2))]
[h:tokenY = floor(getTokenY(1, tokenId) - (getTokenHeight(tokenId) / 2))]
[h:moveToken(tokenX - 150, tokenY, 1, tokenId)]

<!-- ### create the DM map for storing tokens and other stuff for the GM only. ### -->
[h: screenId = createMap("01.Start",
    json.set("{}",
        "player visible", json.true,
        "vision type", "Off",
        "vision distance", 100,
        "lighting style", "OVERTOP",
        "has fog", json.false,
        "ai rounding", "CELL_UNIT",
        "background paint", "#C19F7C",
        
        "grid", json.set("{}", 
            "type", "Square",
            "color", "#333333"
        )
    )
)]

<!-- ### Work-around for placing an image on the background, as createMap does not yet understand lib:// uris ### -->
[h:setCurrentMap("01.Start")]
[h:tokenImage = "lib://" + ns + "/assets/images/start-background.png")]
[h:tokenId = createToken(
    json.set("{}",
        "name","Image:BG",
        "tokenImage", tokenImage,
        "size","Free",
        "layer", "Background"
    )
)]
[h:setTokenOpacity(0.5, tokenId)]
[h:tokenX = floor(getTokenX(1, tokenId) - (getTokenWidth(tokenId) / 2))]
[h:tokenY = floor(getTokenY(1, tokenId) - (getTokenHeight(tokenId) / 2))]
[h:moveToken(tokenX, tokenY, 1, tokenId)]

[h:tokenImage = "lib://" + ns + "/assets/images/dnd-logo.png")]
[h:tokenId = createToken(
    json.set("{}",
        "name","Image:Logo",
        "tokenImage", tokenImage,
        "size","Free",
        "layer", "Background"
    )
)]
[h:setTokenOpacity(1, tokenId)]
[h:setTokenWidth(400, tokenId)]
[h:setTokenHeight(200, tokenId)]
[h:moveToken(-5, 2, 0, tokenId)]

[h:tableData = json.set("{}", 
    "tableName", "BlankDice",
    "visible", json.false, 
    "rollable", json.true, 
    "tableRoll", "d17+3", 
    "imageUrl", "lib://" + ns + "/assets/dice/d20.png", 
    "entries", json.append("", 
        json.set("{}", "start",  "1", "end",  "4", "value", "", "imageUrl", "lib://" + ns + "/assets/dice/d4.png" ),
        json.set("{}", "start",  "5", "end",  "6", "value", "", "imageUrl", "lib://" + ns + "/assets/dice/d6.png" ),
        json.set("{}", "start",  "7", "end",  "8", "value", "", "imageUrl", "lib://" + ns + "/assets/dice/d8.png" ),
        json.set("{}", "start",  "9", "end", "10", "value", "", "imageUrl", "lib://" + ns + "/assets/dice/d10.png"),
        json.set("{}", "start", "11", "end", "12", "value", "", "imageUrl", "lib://" + ns + "/assets/dice/d12.png"),
        json.set("{}", "start", "13", "end", "20", "value", "", "imageUrl", "lib://" + ns + "/assets/dice/d20.png")
    )
)]
[h:broadcast("<pre>" + json.indent(tableData, 4) + "</pre>")]
[h:js.evalUri(ns, "lib://" + ns + "/scripts/createTable.js", base64.encode(tableData))]

