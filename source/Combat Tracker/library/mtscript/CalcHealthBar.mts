[h:tokenId = json.get(macro.args, "tokenId")]
[h:tokenName = json.get(macro.args, "tokenName")]
[h:tokenHealth = json.get(macro.args, "tokenHealth")]
[h:CurrentHP = json.get(tokenHealth, "current")]
[h:TotalHP = json.get(tokenHealth, "total")]
[h:TempHP = json.get(tokenHealth, "temp")]

[h:showFull = (isGM() == 1) || (isOwner(getPlayerName(), tokenId) == 1)]
[if(showFull), code: {
    [h:link = if(isPC(tokenId), 'Damage@Lib:Character', 'Damage@Lib:Bestiary')]
    [h:args = if(isPC(tokenId), strformat('tokenName=%{tokenName}; total=%{TotalHP}; temp=%{TempHP}; id=%{tokenId};current=%{CurrentHP}'), 
                                strformat('tokenName=%{tokenName}; value=%{CurrentHP}/%{TotalHP}'))]

    <a href="[r:macroLinkText(link, '', args)]" tabindex="-1">
        <span>[r:CurrentHP]</span> / <span>[r:TotalHP]</span>
        [h:CurrentPercent = math.floor((CurrentHP * 100) / TotalHP)]
        [h:divClass=if(CurrentPercent > 75, "full", if(CurrentPercent > 25, "high", "low"))]
        <div class="meter">
            <div class="[r:divClass]" style="width:[r:CurrentPercent]%">&nbsp;</div>
        </div>
    </a>
};{
    [h:CurrentPercent = math.floor((CurrentHP * 100) / TotalHP)]
    [h:divClass=if(CurrentPercent > 75, "full", if(CurrentPercent > 25, "high", "low"))]
    <div class="meter">
        <div class="[r:divClass]" style="width:[r:CurrentPercent]%">&nbsp;</div>
    </div>
}]
