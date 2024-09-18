[h,if(macro.args==""),code:{
	[h:tokenName=getSelectedNames()]
	[h,if(tokenName==""):abort(0)]
	[h:tokenName=listget(tokenName,0)]
	[h:id=findToken(tokenName)]
	[h:switchToken(id)]
	[h:selectTokens(id,1)]
};{
	[h:tokenName=getStrProp(macro.args,"tokenName")]
	[h:id=findToken(tokenName)]
	[h,if(id==""):abort(0);switchToken(id)]
	[h:selectTokens(id)]
}]

[h:states = json.append("", "Dead", "Dying", "Concentration", "Exhaustion")]
[h:conditions = json.sort(getTokenStates("json", "Conditions"))]
[h:conditions = json.merge(states, conditions)]

[dialog5("Conditions", "width=460; height=475; temporary=1; noframe=0; input=1"):{
<!DOCTYPE html>
<html>
<head>
	<title>[r:tokenName] Conditions</title>
	[h: link = macroLinkText("character/Conditions Menu@this", "none","","tokenName="+tokenName)]
	<link rel="onChangeSelection" type="macro" href="[r:link]">

	<link rel="stylesheet" type="text/css" href="[r:function.getCss('GitHub')]">
    <link rel="stylesheet" type="text/css" href="[r:function.getCss('menus')]">
</head>
<body>
	[h:processorLink=macroLinkText("character/ConditionsProcess@this","")]
	
	<form class="gridmenu conditions" action="[r:processorLink]" method="json">

		<button type="submit" name="State" value="Clear Conditions">
			<img src="lib://[r:function.getNamespace()]/assets/conditions/Clear-All.png"><br>Clear All
		</button>

		[r,foreach(condition, conditions, ""), code: {
			[h:isState = if(getState(condition) == 1, 1, 0)]
			<button type="submit" name="State" value="[r:condition]">
				<img src="lib://[r:function.getNamespace()]/assets/conditions/[r:condition].png">
				<br>
				[r:condition]
			</button>
		}]
	</form>
</body>
</html>
}]
