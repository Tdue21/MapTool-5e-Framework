"use strict";

try {
    const args = MTScript.getMTScriptCallingArgs()[0];
    const data = JSON.parse(atob(args));

    const mapName = data.name;
    const settings = JSON.stringify(data.settings);
    const tokens = data.tokens;

/*


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

    "tokens": [
            {
                "name": "Image:DmBackground",
                "tokenImage": "lib://{ns}/assets/images/dm-background.png",
                "size": "Free",
                "layer": "Background",
                "opacity": "0.6",
                "position": {
                    "display": "relative",
                    "position": "center",
                    "x": -150,
                    "y": 0,
                    "width": -1,
                    "height": -1
                }
            }
        ]
*/


} catch (e) {
    MapTool.chat.broadcast("createMap: " + e + "\n" + e.stack);
}
