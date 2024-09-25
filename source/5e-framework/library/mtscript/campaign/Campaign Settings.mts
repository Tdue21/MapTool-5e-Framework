[h:setCurrentMap("00.DM")]
[h:tokenName="Lib:Character"]

[h:macroList=getMacros(",",findToken("Lib:Compendium"),"00.DM")]
[h:setLibProperty("macroList", macroList, function.getNamespace())]


[dialog5("Settings", "width=350; height=600; temporary=0; noframe=0; input=1"):{

<link rel="stylesheet" type="text/css" href="[r:function.getCss('GitHub')]">


<!-----------------GENERAL------------------->
<table>
<tr><th colspan=2>
General

<tr class=bg><td>
<span title="Close Shared Frame for all players">
[r:macroLink("Close Shared Frame","campaign/Close Shared@this")]
<td align=right>

<tr><td>
<span title="Shows current version">
[r:macroLink("About","campaign/About@this")]
<td align=right>
v[r,token("Lib:Campaign"):getProperty("libversion")]

<tr class=bg><td>
<span title="Change value of currency (not working)">
[r:macrolink("Currency Value", "campaign/Settings@this", "","Currency")]
<td align=right>

<tr><td>
<span title="Set map to load by default">
[r:macrolink("Starting Map", "campaign/Settings@this", "","Start")]
<td align=right>
[r,token("Lib:Campaign"):value=getProperty("Start")]

<tr class=bg><td>
<span title="Quick link to the game rules">
[r:macrolink("Rules URL", "campaign/Settings@this", "","RulesLink")]


<tr><td>
<span title="Define a welcome message">
[r:macrolink("Welcome Message", "campaign/Change Property@this", "","tokenName=Lib:Campaign;prop=Welcome")]
<td align=right>
[h,token("Lib:Campaign"):value=getProperty("Welcome")]
[r:if(value==0 || value=="","empty","")]

<tr class=bg><td>
<span title="Define preferences for framework behavior">
[r:macrolink("Gameplay Settings", "campaign/Settings@this", "","Gameplay")]
<td align=right>

<tr><td>
<span title="Define display preferences">
[r:macrolink("Display Settings", "campaign/Settings@this", "","Display")]
<td align=right>

</table>


<!-----------------COMPENDIUM------------------->
<table>
<tr><th colspan=2>
Compendium

<tr class=bg><td>
<span title="Export everything stored on the Lib:Compendium, as well as Classes, Races, Backgrounds and many more.">
[r:macroLink("Export Compendium","campaign/Json Export All@this")]

<tr><td>
<span title="Import data exported by the Export Compendium above, larger files may crash the program, save before importing.">
[r:macroLink("Import Compendium","campaign/Json Import All@this")]

<tr class=bg><td>
<span title="Remove content by source">
[r:macroLink("Remove Content","campaign/Remove Content@this")]

<tr><td>
<span title="Manage Equipment">
[r:macroLink("Equipment","character/Manage Equipment@this")]
<td align=right>
[h:value=getLibProperty("Equipment", function.getNamespace())]
[h:fields=json.fields(value)]
[r:listcount(fields)]

<tr class=bg><td>
<span title="Manage Feats">
[r:macroLink("Feats","character/Manage Feats@this")]
<td align=right>
[h:value=getLibProperty("Feats", function.getNamespace())]
[h:fields=json.fields(value)]
[r:listcount(fields)]

<tr><td>
<span title="Manage Additional Feats">
[r:macroLink("Additional Feats","character/Manage Additional Feats@this")]
<td align=right>
[h:value=getLibProperty("AdditionalFeats", function.getNamespace())]
[h:fields=json.fields(value)]
[r:listcount(fields)]

<tr class=bg><td>
<span title="Manage Spells">
[r:macroLink("Manage Spells","character/Manage Spells@this")]
<td align=right>
[h:value=getLibProperty("Spells", function.getNamespace())]
[h:fields=json.fields(value)]
[r:listcount(fields)]


<tr>
<span title="Manage Bestiary">
[r:macroLink("Bestiary","bestiary/Manage@this")]
<td align=right>
[h:value=getLibProperty("Bestiary", function.getNamespace())]
[h:fields=json.fields(value)]
[r:listcount(fields)]


</table>

<!-----------------CHARACTER SHEET------------------->
<table>
<tr><th colspan=2>
Character Sheet
<tr class=bg><td>
<span title="Define custom atributes">
[r:macrolink("Attributes", "campaign/Settings@this", "","Attributes")]
<td align=right>
[h:value=getLibProperty("Attributes", function.getNamespace())]
[r:listcount(value)]

<tr><td>
<span title="Define custom skills">
[r:macrolink("Skills", "campaign/Settings@this", "","Skills")]
<td align=right>
[h:value=getLibProperty("Skills", function.getNamespace())]
[r:listcount(value,";")]


<tr class=bg><td>
<span title="Define passive checks to display on the Character Sheet">
[r:macrolink("Passive Checks", "campaign/Settings@this", "","Passive")]
<td align=right>
[h:value=getLibProperty("Passive Checks", function.getNamespace())]
[r:listcount(value)]

<tr><td>
<span title="Define list of Feat Options">
[r:macrolink("Feat Options", "campaign/Settings@this", "","Feats")]
<td align=right>
[h:value=getLibProperty("Feats", function.getNamespace())]
[r:listcount(value)]

<tr class=bg><td>
<span title="Define default languages">
[r:macrolink("Languages", "campaign/Settings@this", "","Languages")]
<td align=right>
[h:value=getLibProperty("Languages", function.getNamespace())]
[r:listcount(value)]

<tr><td>
<span title="Define races">
[r:macrolink("Races", "campaign/Settings@this", "","Races")]
<td align=right>
[h:value=getLibProperty("Races", function.getNamespace())]
[r:listcount(value)]

<tr class=bg><td>
<span title="Define backgrounds">
[r:macrolink("Backgrounds", "campaign/Settings@this", "","Backgrounds")]
<td align=right>
[h:value=getLibProperty("Backgrounds", function.getNamespace())]
[r:listcount(value)]

<tr><td>
<span title="Manage Classes and Subclasses">
[r:macrolink("Classes", "character-creation/Change Classes@this", "")]
<td align=right>
[h:value=getLibProperty("Classes", function.getNamespace())]
[h:fields=json.fields(value)]
[r:total=listcount(fields)]
[h:sum=0]
[h,count(total),code:{

	[h:currentName=listget(fields,roll.count)]
	[h:currentObj=json.get(value,currentName)]
	[h:subclass=json.get(currentObj,"subclass")]
	[h:subclassList=json.fields(subclass)]
	[h:sum=sum+listcount(subclassList)]

}]
([r:sum])

<tr class=bg><td>
<span title="Define weapon lists by type">
[r:macrolink("Equipment Lists", "campaign/Settings@this", "","Equipment")]
<td align=right>

<tr><td>
<span title="Define spell lists to display on the library">
[r:macrolink("Spell Lists", "campaign/Settings@this", "","Spells")]

<tr class=bg><td>

<span title="Define spells by class and level">
[r:macrolink("Spells", "character-creation/Change Spells@this", "")]


</table>

<!-----------------PERMISSIONS------------------->
<table>
<tr><th colspan=2>
Player Permissions
<tr class=bg><td>

<span title="Define output of rolls made by the players and GM">
[r:macrolink("Roll Output", "campaign/Settings@this", "","Output")]
<td align=right>
[r:getLibProperty("PC Output",function.getNamespace())] /
[r:getLibProperty("GM Output",function.getNamespace())]

<tr><td>

<span title="Define output of dice sounds made by the players and GM">
[r:macrolink("Audio Output", "campaign/Settings@this", "","OutputAudio")]
<td align=right>
[r:getLibProperty("PC Audio",function.getNamespace())] /
[r:getLibProperty("GM Audio",function.getNamespace())]

<tr class=bg><td>
<span title="Define link to audio clips and set audio to preload on startup or when required, multiple links delimited by comma">
[r:macrolink("Audio Clips", "campaign/Settings@this", "","Clips")]
<td align=right>
[r:listcount(getLibProperty("Audio", function.getNamespace()))]

<tr><td>
<span title="Define what players are allowed to access or edit">
[r:macrolink("Player Permissions", "campaign/Settings@this", "","Permissions")]
<td align=right>

<tr class=bg><td>
<span title="Define tables to be ignored on the compendium, delimited by comma">
[r:macrolink("Table Blacklist", "campaign/Settings@this", "","blacklist")]
<td align=right>
[r:listcount(getLibProperty("blacklist", function.getNamespace()))]


</table>

}]