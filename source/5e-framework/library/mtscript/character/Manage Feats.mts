[h:tokenName="Lib:Character"]


[dialog5("Manage Feats", "width=450; height=600; temporary=0; noframe=0; input=1"):{

<link rel="stylesheet" type="text/css" href="[r:function.getCss('GitHub')]">
<p class='topbar'>

[r:macroLink("Settings","campaign/Campaign Settings@this")]&nbsp;
[r:macrolink("Import", "campaign/Json Merge@this", "","macroName=Manage Feats;lib=Lib:Compendium;value=Feats")]&nbsp;
[r:macrolink("Export", "campaign/Json Export@this", "","lib=Lib:Compendium;value=Feats")]&nbsp;

</p>

<h5>Feats</h5>
[macro("character/Feats List@this"):"tokenName="+tokenName]

}]