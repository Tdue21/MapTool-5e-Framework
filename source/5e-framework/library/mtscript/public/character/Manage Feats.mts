[h:tokenName="Lib:Character"]


[dialog("Manage Feats", "width=450; height=600; temporary=0; noframe=0; input=1"):{

<link rel="stylesheet" type="text/css" href="GitHub@Lib:Campaign">

<p class='topbar'>

[r:macroLink("Settings","Campaign Settings@Lib:Campaign")]&nbsp;
[r:macroLink("Import","Json Merge@Lib:Campaign","","macroName=Manage Feats;lib=Lib:Compendium;value=Feats")]&nbsp;
[r:macroLink("Export","Json Export@Lib:Campaign","","lib=Lib:Compendium;value=Feats")]&nbsp;

</p>

<h5>Feats</h5>
[macro("Feats List@Lib:Character"):"tokenName="+tokenName]

}]