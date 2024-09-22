[h,if(json.type(macro.args)=="UNKNOWN"):map=macro.args;map=json.get(macro.args, "MapName")]

[h:setCurrentMap(map)]
[h:goto(0,0)]
[h:setZoom(1)]

[h,macro("overlay/OverlayMiniMenu@this"):""]
