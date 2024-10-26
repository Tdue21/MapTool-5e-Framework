[h:tokenId = json.get(macro.args, "tokenId")]
[h:tokenName = json.get(macro.args, "tokenName")]

[if(isPC(tokenId) == 1), code: {
    [h:CurrentHP = getLibProperty("Current Hit Points",  "Lib:"+tokenName)]
    [h:TotalHP   = getLibProperty("Total Hit Points",    "Lib:"+tokenName)]
    [h:TempHP    = getLibProperty("Temporary Hit Points","Lib:"+tokenName)]

    [h:TotalHP = if(TotalHP == "", 1, TotalHP)]
};{
    [h:health    = getProperty("Hit Points", tokenId)]
    [h:CurrentHP = listget(health, 0, "/")]
    [h:TotalHP   = listget(health, 1, "/")]
    [h:TempHP    = 0]
}]
[h:CurrentHP = if(CurrentHP == "", TotalHP, CurrentHP)]

[h:healthArgs = json.set("{}", "current", CurrentHP, "total", TotalHP, "temp", TempHP)]
[h:macro.return = healthArgs]