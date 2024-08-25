[h:tokenName="Lib:Character"]


[dialog5("Manage Equipment", "width=450; height=600; temporary=0; noframe=0; input=1"):{

<link rel="stylesheet" type="text/css" href="GitHub@Lib:Campaign">

<p class='topbar'>

[r:macroLink("Settings","Campaign Settings@Lib:Campaign")]&nbsp;
[r:macroLink("Import","Json Merge@Lib:Campaign","","macroName=Manage Equipment;lib=Lib:Compendium;value=Equipment")]&nbsp;
[r:macroLink("Export","Json Export@Lib:Campaign","","lib=Lib:Compendium;value=Equipment")]&nbsp;

</p>

<h5>Equipment</h5>
[macro("Equipment List@Lib:Character"):"tokenName="+tokenName]

}]