[h:tokenId = json.get(macro.args, "tokenId")]
[h:tokenName = json.get(macro.args, "tokenName")]

[if(isPC(tokenId) == 1), code: {
    [h:CurrentHP = getLibProperty("Current Hit Points",  "Lib:"+tokenName)]
    [h:TotalHP   = getLibProperty("Total Hit Points",    "Lib:"+tokenName)]
    [h:TempHP    = getLibProperty("Temporary Hit Points","Lib:"+tokenName)]
};{
    [h:CurrentHP = 45]
    [h:TotalHP   = 65]
    [h:TempHP    = 0]
}]
[h:CurrentHP = if(CurrentHP == "", TotalHP, CurrentHP)]

[h:macro.return = json.set("{}", "current", CurrentHP, "total", TotalHP, "temp", TempHP)]