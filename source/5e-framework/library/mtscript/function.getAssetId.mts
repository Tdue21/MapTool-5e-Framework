[h:tokenImage = macro.args]
[h:tokenData  = json.set("{}", 
        "name", "temp",
        "tokenImage", tokenImage,
        "size","Free",
        "layer","Hidden")]
[h:broadcast("<pre>" + json.indent(tokenData))]
[h:tokenId = createToken(tokenData)]

[h:assetId=getTokenImage("", tokenId)]
[h:removeToken(tokenId)]
[h:macro.return = assetId]