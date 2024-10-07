[h:tokenId = macro.args]
[h:args = json.set("{}", "event", "onChangeToken", "tokenId", tokenId)]
[h:link = macroLinkText("Initiative Frame@this", "", args)]
[h:execLink(link, 1)]
