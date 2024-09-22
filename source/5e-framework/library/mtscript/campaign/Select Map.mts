[h:allMaps=getAllMapNames("json")]
[h:allMaps=json.sort(allMaps)]
[h:mapList="[]"]
[h:height=110]

[h,foreach(map, allMaps, ""), code:{
	[h:visible = getMapVisible(map)]
	[h,if(isGM() == 1 || visible == 1):height=height + 32]
	[h:mapList=json.append(mapList, json.set("{}", "mapName", map, "visible", visible))]
}]

[dialog5("Select Map", "width=200; height="+height+"; temporary=1; input=1; noframe=0"):{

<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="[r:function.getCss('GitHub')]">	
	<link rel="stylesheet" type="text/css" href="[r:function.getCss('menus')]">	
</head>
<body>
	[h:processorLink=macroLinkText("campaign/SelectMapProcess@this","")]
	<form class="stackmenu" style="justify-items: center;" action="[r:processorLink]" method="json">

	[if(isGM() == 1), code: {
		<div style="margin:0px;padding:0px;padding-bottom:3px;margin-bottom:3px;border:none;border-bottom:1px solid #888">
		[r:macrolink("Weather", "overlay/Weather Select@this")]
		</div>
	};{}]

	[foreach(map, mapList, ""), code: {
		[h: visible   = json.get(map, "visible")]
		[h: mapName   = json.get(map, "mapName")]
		[h: bgColor   = if(visible == 1, "transparent", "silver")]
		[h: fontColor = if(getCurrentMapName() == mapName, "blue; font-weight:bold", "black")]
		[h: display   = if(visible == 1 || isGM() == 1, "block", "none")]
	
		<button type="submit" name="MapName" value="[r:mapName]" style="display:[r:display]; height: 25px;padding:0px">
			<div style="border:none; background-color:[r:bgColor]; color:[r:fontColor]; margin:0px;padding:3px">
				[r:mapName]
			</div>
		</button>
	}]
	</form>
</body>
</html>

}]