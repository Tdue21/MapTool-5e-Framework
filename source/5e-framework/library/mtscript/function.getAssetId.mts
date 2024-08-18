[h:tokenImage = macro.args]
[h:tokenId = createToken(
    json.set("{}", 
        "name", "temp",
        "tokenImage", tokenImage,
        "layer","Hidden"
    )
)]
[h:assetId=getTokenImage("", tokenId)]
[h:removeToken(tokenId)]
[h:macro.return = assetId]