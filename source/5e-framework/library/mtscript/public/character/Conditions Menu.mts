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


[dialog("Conditions", "width=380; height=450; temporary=0; noframe=0; input=1"):{

<title>
[r:tokenName] Conditions
</title>

<link rel="stylesheet" type="text/css" href="GitHub@Lib:Campaign">

[h: link = macroLinkText("Conditions Menu@Lib:Character", "none","","tokenName="+tokenName)]
<link rel="onChangeSelection" type="macro" href="[r:link]">

[h:processorLink=macroLinkText("Conditions process@Lib:Character","")]
<form action="[r:processorLink]" method="json">

<table>
<tr>
<td align=right>
[h:bg=if(getState("Dead")==1,"bgcolor=silver","")]
<input type="submit" name="Dead" value="<html><table width=70 cellspacing=0 cellpadding=0><tr><td height=46 [r:bg] aligin=center style='margin:0px;padding:0px'><font size=6 color=red>X</font><br><font size=2>Dead</html>">

<td align=center width=0%>

[h:bg=if(getState("Dying")==1,"bgcolor=silver","")]
<input type="submit" name="Dying" value="<html><table width=70 cellspacing=0 cellpadding=0><tr><td height=46 [r:bg] aligin=center style='margin:0px;padding:0px'><font size=6 color=Gray>X</font><br><font size=2>Dying</html>">
<td align=left>

[h:bg=if(getState("Concentration")==1,"bgcolor=silver","")]
<input type="submit" name="Concentrating" value="<html><table width=70 cellspacing=0 cellpadding=0><tr><td [r:bg] aligin=center style='margin:0px;padding:0px'><img src=asset://bc986e526dfd79f1ec98a24a27cd4792-30><br><font size=2>Concentrating</html>">
<tr><td align=right>

[h:bg=if(getState("Blinded")==1,"bgcolor=silver","")]
<input type="submit" name="Blinded" value="<html><table width=70 cellspacing=0 cellpadding=0><tr><td [r:bg] aligin=center style='margin:0px;padding:0px'><img src=asset://322784269e951cefe1070b222f2f396d-30><br>&nbsp;<font size=2>Blinded</html>">
<td align=center>

[h:bg=if(getState("Grappled")==1,"bgcolor=silver","")]
<input type="submit" name="Grappled" value="<html><table width=70 cellspacing=0 cellpadding=0><tr><td [r:bg] aligin=center style='margin:0px;padding:0px'><img src=asset://35e63eb49871c0d7b3adba5f86760f4c-30><br><font size=2>Grappled</html>">
<td align=left>

[h:bg=if(getState("Poisoned")==1,"bgcolor=silver","")]
<input type="submit" name="Poisoned" value="<html><table width=70 cellspacing=0 cellpadding=0><tr><td [r:bg] aligin=center style='margin:0px;padding:0px'><img src=asset://3585324a36e6c6178949edd7a8b53170-30><br>&nbsp;<font size=2>Poisoned</html>">
<tr><td align=right>

[h:bg=if(getState("Charmed")==1,"bgcolor=silver","")]
<input type="submit" name="Charmed" value="<html><table width=70 cellspacing=0 cellpadding=0><tr><td [r:bg] aligin=center style='margin:0px;padding:0px'><img src=asset://eb3f7375ce9ffc5d56a4816caa9267c5-30><br><font size=2>Charmed</html>">
<td align=center>

[h:bg=if(getState("Incapacitated")==1,"bgcolor=silver","")]
<input type="submit" name="Incapacitated" value="<html><table width=70 cellspacing=0 cellpadding=0><tr><td [r:bg] aligin=center style='margin:0px;padding:0px'><img src=asset://4c74abf7994106a2ce2e26db8dfd55cd-30><br><font size=2>Incapacitated</html>">
<td align=left>

[h:bg=if(getState("Prone")==1,"bgcolor=silver","")]
<input type="submit" name="Prone" value="<html><table width=70 cellspacing=0 cellpadding=0><tr><td [r:bg] aligin=center style='margin:0px;padding:0px'><img src=asset://a9fd677869b63ea0a143e1e4d47ef0ba-30><br>&nbsp;<font size=2>Prone</html>">
<tr><td align=right>

[h:bg=if(getState("Deafened")==1,"bgcolor=silver","")]
<input type="submit" name="Deafened" value="<html><table width=70 cellspacing=0 cellpadding=0><tr><td [r:bg] aligin=center style='margin:0px;padding:0px'><img src=asset://beb98be4251735cb2ffdccf923c12038-30><br><font size=2>Deafened</html>">
<td align=center>

[h:bg=if(getState("Invisible")==1,"bgcolor=silver","")]
<input type="submit" name="Invisible" value="<html><table width=70 cellspacing=0 cellpadding=0><tr><td [r:bg] aligin=center style='margin:0px;padding:0px'><img src=asset://d6d0408dd8d640219d79a958bb49866d-30><br><font size=2>Invisible</html>">
<td align=left>

[h:bg=if(getState("Restrained")==1,"bgcolor=silver","")]
<input type="submit" name="Restrained" value="<html><table width=70 cellspacing=0 cellpadding=0><tr><td [r:bg] aligin=center style='margin:0px;padding:0px'><img src=asset://e1dd27d2b13c0380d2cfb2502d447b3e-30><br>&nbsp;<font size=2>Restrained</html>">
<tr><td align=right>



[h:bg=if(getState("Exhaustion 1")==1 || getState("Exhaustion 2")==1 || getState("Exhaustion 3")==1 || getState("Exhaustion 4")==1 || getState("Exhaustion 5")==1 || getState("Exhaustion 6")==1,"bgcolor=silver","")]
<input type="submit" name="Exhaustion" value="<html><table width=70 cellspacing=0 cellpadding=0><tr><td [r:bg] aligin=center style='margin:0px;padding:0px'><img src=asset://5aa28875290dfe123a17afcc8c88b8dd-30><br><font size=2>Exhaustion</html>">
<td align=center>

[h:bg=if(getState("Paralyzed")==1,"bgcolor=silver","")]
<input type="submit" name="Paralyzed" value="<html><table width=70 cellspacing=0 cellpadding=0><tr><td [r:bg] aligin=center style='margin:0px;padding:0px'><img src=asset://7117d83aede5c58953f56ea1e8264aac-30><br><font size=2>Paralyzed</html>">
<td align=left>

[h:bg=if(getState("Stunned")==1,"bgcolor=silver","")]
<input type="submit" name="Stunned" value="<html><table width=70 cellspacing=0 cellpadding=0><tr><td [r:bg] aligin=center style='margin:0px;padding:0px'><img src=asset://0bdbdd89c88edff0a25be3ab96ecaec7-30><br>&nbsp;<font size=2>Stunned</html>">
<tr><td align=right>

[h:bg=if(getState("Frightened")==1,"bgcolor=silver","")]
<input type="submit" name="Frightened" value="<html><table width=70 cellspacing=0 cellpadding=0><tr><td [r:bg] aligin=center style='margin:0px;padding:0px'><img src=asset://9b9ab5f6eb7296800d58e8bd87786dd1-30><br><font size=2>Frightened</html>">
<td align=center>

[h:bg=if(getState("Petrified")==1,"bgcolor=silver","")]
<input type="submit" name="Petrified" value="<html><table width=70 cellspacing=0 cellpadding=0><tr><td [r:bg] aligin=center style='margin:0px;padding:0px'><img src=asset://f26705636ba42b60eb7337f53a6a6499-30><br><font size=2>Petrified</html>">
<td align=left>

[h:bg=if(getState("Unconscious")==1,"bgcolor=silver","")]
<input type="submit" name="Unconscious" value="<html><table width=70 cellspacing=0 cellpadding=0><tr><td [r:bg] aligin=center style='margin:0px;padding:0px'><img src=asset://5637f330ca548f389e92171c95cc652b-30><br>&nbsp;<font size=2>Unconscious</html>">



</table>


}]
