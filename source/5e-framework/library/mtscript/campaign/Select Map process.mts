[h,if(json.type(macro.args)=="UNKNOWN"):map=macro.args;map=json.fields(macro.args)]


[h:broadcast("<pre>" + json.indent(macro.args, 4) + "</pre>")]

[h:setCurrentMap(map)]

[h:goto(0,0)]

[h:setZoom(1)]

[h:overValue=json.get(macro.args,map)]
[h,if(overValue==""),code:{};{
	[h,macro("overlay/OverlayMiniMenu@this"):""]
}]