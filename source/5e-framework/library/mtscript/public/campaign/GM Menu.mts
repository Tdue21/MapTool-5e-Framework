
[dialog5("GM Menu", "width=340; height=240; temporary=1; noframe=0; input=1"):{

<link rel="stylesheet" type="text/css" href="lib://[r:function.getNamespace()]/css/GitHub.css">

[h:processorLink=macroLinkText("campaign/Menu process@this","")]
<form action="[r:processorLink]" method="json">
<table>
<tr>
    <td align=right>
        <input type="submit" name="Party" value="<html><table width=60 cellspacing=0 cellpadding=0><tr><td aligin=center style='margin:0px;padding:0px'><img src=asset://6ea9e45fbc6820f74ab0e626f0596f47><br><font size=2>Party</html>">
    <td align=center width=0%>
        <input type="submit" name="Request" value="<html><table width=60 cellspacing=0 cellpadding=0><tr><td aligin=center style='margin:0px;padding:0px'><img src=asset://274cb2ad110af815ee7c7d5b47989b0b><br><font size=2>Request Roll</html>">
    <td align=left>
        <input type="submit" name="Settings" value="<html><table width=60 cellspacing=0 cellpadding=0><tr><td aligin=center style='margin:0px;padding:0px'><img src=asset://c0100f0ce673af4ea0208892dd25fd01><br><font size=2>Settings</html>">
<tr>
    <td align=right>
        <input type="submit" name="NewNPC" value="<html><table width=60 cellspacing=0 cellpadding=0><tr><td aligin=center style='margin:0px;padding:0px'><img src=asset://75f89d8c364ca21bda9aa7a6e1c7adb1><br>&nbsp;<font size=2>Set NPC</html>">
    <td align=center>
        <input type="submit" name="Distance" value="<html><table width=60 cellspacing=0 cellpadding=0><tr><td aligin=center style='margin:0px;padding:0px'><img src=asset://6909f4c13ad9ab84e52ba0e0af41ce4f><br><font size=2>Distance</html>">
    <td align=left>
        <input type="submit" name="NewPin" value="<html><table width=60 cellspacing=0 cellpadding=0><tr><td aligin=center style='margin:0px;padding:0px'><img src=asset://c8f8cbf97c984caec577d9512e94483a><br>&nbsp;<font size=2>Set Pin</html>">
<tr>
    <td align=right>
        <input type="submit" name="Library" value="<html><table width=60 cellspacing=0 cellpadding=0><tr><td aligin=center style='margin:0px;padding:0px'><img src=asset://aed6269a99576e707a8b2e5081a11fed><br><font size=2>Compendium</html>">
    <td align=center>
        <input type="submit" name="Notebooks" value="<html><table width=60 cellspacing=0 cellpadding=0><tr><td aligin=center style='margin:0px;padding:0px'><img src=asset://b92cef77adaee8657caaed183e14fc90><br><font size=2>Notebooks</html>">
    <td align=left>
        <input type="submit" name="Map" value="<html><table width=60 cellspacing=0 cellpadding=0><tr><td aligin=center style='margin:0px;padding:0px'><img src=asset://0fcfa25c7bce6c353f089fa6baa111aa><br>&nbsp;<font size=2>Select Map</html>">
</table>
}]
