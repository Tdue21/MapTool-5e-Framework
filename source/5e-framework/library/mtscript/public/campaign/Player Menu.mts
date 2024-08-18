
[dialog("Player Menu", "width=340; height=240; temporary=1; noframe=0; input=1"):{

<link rel="stylesheet" type="text/css" href="GitHub@Lib:Campaign">




[h:processorLink=macroLinkText("Menu process@Lib:Campaign","")]
<form action="[r:processorLink]" method="json">

<table>
<tr>
<td align=right>

<input type="submit" name="PCMacros" value="<html><table width=60 cellspacing=0 cellpadding=0><tr><td aligin=center style='margin:0px;padding:0px'><img src=asset://8a0b10d13b3c5d66ec8a342e1ed4f50e><br><font size=2>New PC</html>">
<td align=center width=0%>

<input type="submit" name="New" value="<html><table width=60 cellspacing=0 cellpadding=0><tr><td aligin=center style='margin:0px;padding:0px'><img src=asset://9431a91860a997a3b66f65bfc5430c11><br><font size=2>1st Level</html>">
<td align=left>

<input type="submit" name="LevelUp" value="<html><table width=60 cellspacing=0 cellpadding=0><tr><td aligin=center style='margin:0px;padding:0px'><img src=asset://e89b8ef1ec30249c323952fdd70b696a><br><font size=2>Level Up</html>">
<tr><td align=right>

<input type="submit" name="Dice" value="<html><table width=60 cellspacing=0 cellpadding=0><tr><td aligin=center style='margin:0px;padding:0px'><img src=asset://274cb2ad110af815ee7c7d5b47989b0b><br>&nbsp;<font size=2>Roll Dice</html>">
<td align=center>

<input type="submit" name="Distance" value="<html><table width=60 cellspacing=0 cellpadding=0><tr><td aligin=center style='margin:0px;padding:0px'><img src=asset://6909f4c13ad9ab84e52ba0e0af41ce4f><br><font size=2>Distance</html>">
<td align=left>

<input type="submit" name="Rules" value="<html><table width=60 cellspacing=0 cellpadding=0><tr><td aligin=center style='margin:0px;padding:0px'><img src=asset://4625dbf1c172c2408fd3d80692331fc5><br>&nbsp;<font size=2>Link Rules</html>">
<tr><td align=right>

<input type="submit" name="Library" value="<html><table width=60 cellspacing=0 cellpadding=0><tr><td aligin=center style='margin:0px;padding:0px'><img src=asset://aed6269a99576e707a8b2e5081a11fed><br><font size=2>Compendium</html>">
<td align=center>

<input type="submit" name="Notebooks" value="<html><table width=60 cellspacing=0 cellpadding=0><tr><td aligin=center style='margin:0px;padding:0px'><img src=asset://b92cef77adaee8657caaed183e14fc90><br><font size=2>Notebooks</html>">
<td align=left>

<input type="submit" name="Map" value="<html><table width=60 cellspacing=0 cellpadding=0><tr><td aligin=center style='margin:0px;padding:0px'><img src=asset://0fcfa25c7bce6c353f089fa6baa111aa><br>&nbsp;<font size=2>Select Map</html>">



</table>


}]
