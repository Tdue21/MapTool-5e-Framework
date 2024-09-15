[dialog5("GM Menu", "width=360; height=220; temporary=1; noframe=0; input=1"):{
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="[r:function.getCss('GitHub')]">
    <link rel="stylesheet" type="text/css" href="[r:function.getCss('menus')]">
</head>
<body>
    [h:processorLink=macroLinkText("campaign/MenuProcess@this","")]
    <form class="gridmenu" action="[r:processorLink]" method="json">

        <button type="submit" name="Action" value="Party">
            <img src="lib://[r:function.getNamespace()]/assets/icons/party.png"><br>Party
        </button>

        <button type="submit" name="Action" value="Request">
            <img src="lib://[r:function.getNamespace()]/assets/icons/dice.png"><br>Request Roll
        </button>

        <button type="submit" name="Action" value="Settings">
            <img src="lib://[r:function.getNamespace()]/assets/icons/party.png"><br>Settings
        </button>

        <button type="submit" name="Action" value="NewNPC">
            <img src="lib://[r:function.getNamespace()]/assets/icons/monster.png"><br>Set NPC
        </button>

        <button type="submit" name="Action" value="Distance">
            <img src="lib://[r:function.getNamespace()]/assets/icons/distance.png"><br>Distance
        </button>

        <button type="submit" name="Action" value="NewPin">
            <img src="lib://[r:function.getNamespace()]/assets/icons/pin.png"><br>Set Pin
        </button>

        <button type="submit" name="Action" value="Library">
            <img src="lib://[r:function.getNamespace()]/assets/icons/library.png"><br>Compendium
        </button>

        <button type="submit" name="Action" value="Notebooks">
            <img src="lib://[r:function.getNamespace()]/assets/icons/notebook.png"><br>Notebooks
        </button>

        <button type="submit" name="Action" value="Map">
            <img src="lib://[r:function.getNamespace()]/assets/icons/globe.png"><br>Select Map
        </button>
    </form>
</body>
</html>
}]
