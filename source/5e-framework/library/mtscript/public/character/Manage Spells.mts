[h:tokenName="Lib:Character"]


[dialog("Manage Spells", "width=450; height=600; temporary=0; noframe=0; input=1"):{

<link rel="stylesheet" type="text/css" href="GitHub@Lib:Campaign">

<p class='topbar'>

[r:macroLink("Settings","Campaign Settings@Lib:Campaign")]&nbsp;
[r:macroLink("Import","Json Merge@Lib:Campaign","","macroName=Manage Spells;lib=Lib:Compendium;value=Spells")]&nbsp;
[r:macroLink("Export","Json Export@Lib:Campaign","","lib=Lib:Compendium;value=Spells")]&nbsp;

</p>

<h5>Spells</h5>

<table>
<tr>
<td valign=top>
[macro("Spells List@Lib:Character"):"tokenName="+tokenName]
</table>
}]