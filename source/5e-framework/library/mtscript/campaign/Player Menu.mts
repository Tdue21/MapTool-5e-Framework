[dialog5("Player Menu", "width=360; height=220; temporary=1; noframe=0; input=1"):{
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="[r:function.getCss('GitHub')]">
    <link rel="stylesheet" type="text/css" href="[r:function.getCss('menus')]">
</head>
<body>
    [h:processorLink=macroLinkText("campaign/MenuProcess@this","")]
    <form class="gridmenu" action="[r:processorLink]" method="json">

        <button type="submit" name="Action" value="PCMacros">
            <img src="lib://[r:function.getNamespace()]/assets/icons/add-person.png"><br>New PC
        </button>

        <button type="submit" name="Action" value="New">
            <img src="lib://[r:function.getNamespace()]/assets/icons/setup.png"><br>1st Level
        </button>

        <button type="submit" name="Action" value="LevelUp">
            <img src="lib://[r:function.getNamespace()]/assets/icons/level-up.png"><br>Level Up
        </button>

        <button type="submit" name="Action" value="Dice">
            <img src="lib://[r:function.getNamespace()]/assets/icons/dice.png"><br>Roll Dice
        </button>

        <button type="submit" name="Action" value="Distance">
            <img src="lib://[r:function.getNamespace()]/assets/icons/distance.png"><br>Distance
        </button>

        <button type="submit" name="Action" value="Rules">
            <img src="lib://[r:function.getNamespace()]/assets/icons/dnd.png"><br>Link Rules
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
