[h:tokenName=function.getNamespace()]


[dialog5("Manage Spells", "width=450; height=600; temporary=0; noframe=0; input=1"):{

<link rel="stylesheet" type="text/css" href="[r:function.getCss('GitHub')]">
<p class='topbar'>

[r:macroLink("Settings","campaign/Campaign Settings@this")]&nbsp;
[r:macrolink("Import", "campaign/Json Merge@this", "","macroName=Manage Spells;lib=Lib:Compendium;value=Spells")]&nbsp;
[r:macrolink("Export", "campaign/Json Export@this", "","lib=Lib:Compendium;value=Spells")]&nbsp;

</p>

<h5>Spells</h5>

<table>
<tr>
<td valign=top>
[macro("character/Spells List@this"):"tokenName="+tokenName]
</table>
}]