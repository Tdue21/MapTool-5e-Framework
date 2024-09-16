[h:broadcast("Conditions Menu: <br><pre>" + json.indent(macro.args, 4) + "</pre>")]
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

[dialog5("Conditions", "width=380; height=450; temporary=0; noframe=0; input=1"):{
<!DOCTYPE html>
<html>
<head>
	<title>[r:tokenName] Conditions</title>
	<link rel="stylesheet" type="text/css" href="[r:function.getCss('GitHub')]">
	[h: link = macroLinkText("character/Conditions Menu@this", "none","","tokenName="+tokenName)]
	<link rel="onChangeSelection" type="macro" href="[r:link]">
</head>
<body>
	[h:processorLink=macroLinkText("character/Conditions process@this","")]
	<form action="[r:processorLink]" method="json">

		[h:bg=if(getState("Dead")==1,"bgcolor=silver","")]
		<button type="submit" name="Dead" value="height=46 [r:bg]"><font size=6 color=red>X</font><br>Dead</button>

		[h:bg=if(getState("Dying")==1,"bgcolor=silver","")]
		<button type="submit" name="Dying" value="height=46 [r:bg]"><font size=6 color=Gray>X</font><br>Dying</button>

		[h:bg=if(getState("Concentration")==1,"bgcolor=silver","")]
		<button type="submit" name="Concentrating" value="[r:bg] ">
			<img src="lib://[r:function.getNamespace()]/assets/conditions/Concentration.png">
			<br>Concentrating
		</button>

		[h:bg=if(getState("Blinded")==1,"bgcolor=silver","")]
		<button type="submit" name="Blinded" value="[r:bg] ">
			<img src="lib://[r:function.getNamespace()]/assets/conditions/Blinded.png">
			<br>Blinded
		</button>

		[h:bg=if(getState("Grappled")==1,"bgcolor=silver","")]
		<button type="submit" name="Grappled" value="[r:bg] ">
			<img src="lib://[r:function.getNamespace()]/assets/conditions/Grappled.png">
			<br>Grappled
		</button>

		[h:bg=if(getState("Poisoned")==1,"bgcolor=silver","")]
		<button type="submit" name="Poisoned" value="[r:bg] ">
			<img src="lib://[r:function.getNamespace()]/assets/conditions/Poisoned.png">
			<br>Poisoned
		</button>

		[h:bg=if(getState("Charmed")==1,"bgcolor=silver","")]
		<button type="submit" name="Charmed" value="[r:bg] ">
			<img src="lib://[r:function.getNamespace()]/assets/conditions/Charmed.png">
			<br>Charmed
		</button>

		[h:bg=if(getState("Incapacitated")==1,"bgcolor=silver","")]
		<button type="submit" name="Incapacitated" value="[r:bg] ">
			<img src="lib://[r:function.getNamespace()]/assets/conditions/Incapacitated.png">
			<br>Incapacitated
		</button>

		[h:bg=if(getState("Prone")==1,"bgcolor=silver","")]
		<button type="submit" name="Prone" value="[r:bg] ">
			<img src="lib://[r:function.getNamespace()]/assets/conditions/Prone.png">
			<br>Prone
		</button>

		[h:bg=if(getState("Deafened")==1,"bgcolor=silver","")]
		<button type="submit" name="Deafened" value="[r:bg] ">
			<img src="lib://[r:function.getNamespace()]/assets/conditions/Deafened.png">
			<br>Deafened
		</button>

		[h:bg=if(getState("Invisible")==1,"bgcolor=silver","")]
		<button type="submit" name="Invisible" value="[r:bg] ">
			<img src="lib://[r:function.getNamespace()]/assets/conditions/Invisible.png">
			<br>Invisible
		</button>

		[h:bg=if(getState("Restrained")==1,"bgcolor=silver","")]
		<button type="submit" name="Restrained" value="[r:bg] ">
			<img src="lib://[r:function.getNamespace()]/assets/conditions/Restrained.png">
			<br>Restrained
		</button>

		[h:bg=if(getState("Exhaustion 1")==1 || getState("Exhaustion 2")==1 || getState("Exhaustion 3")==1 || getState("Exhaustion 4")==1 || getState("Exhaustion 5")==1 || getState("Exhaustion 6")==1,"bgcolor=silver","")]
		<button type="submit" name="Exhaustion" value="[r:bg] ">
			<img src="lib://[r:function.getNamespace()]/assets/conditions/Exhaustion 1.png">
			<br>Exhaustion
		</button>

		[h:bg=if(getState("Paralyzed")==1,"bgcolor=silver","")]
		<button type="submit" name="Paralyzed" value="[r:bg] ">
			<img src="lib://[r:function.getNamespace()]/assets/conditions/Paralyzed.png">
			<br>Paralyzed
		</button>

		[h:bg=if(getState("Stunned")==1,"bgcolor=silver","")]
		<button type="submit" name="Stunned" value="[r:bg] ">
			<img src="lib://[r:function.getNamespace()]/assets/conditions/Stunned.png">
			<br>Stunned
		</button>

		[h:bg=if(getState("Frightened")==1,"bgcolor=silver","")]
		<button type="submit" name="Frightened" value="[r:bg] ">
			<img src="lib://[r:function.getNamespace()]/assets/conditions/Frightened.png">
			<br>Frightened
		</button>

		[h:bg=if(getState("Petrified")==1,"bgcolor=silver","")]
		<button type="submit" name="Petrified" value="[r:bg] ">
			<img src="lib://[r:function.getNamespace()]/assets/conditions/Petrified.png">
			<br>Petrified
		</button>

		[h:bg=if(getState("Unconscious")==1,"bgcolor=silver","")]
		<button type="submit" name="Unconscious" value="[r:bg] ">
			<img src="lib://[r:function.getNamespace()]/assets/conditions/Unconscious.png">
			<br>Unconscious
		</button>
	</form>
</body>
</html>
}]
