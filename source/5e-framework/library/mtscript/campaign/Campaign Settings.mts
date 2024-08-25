[h:setCurrentMap("00.DM")]
[h:tokenName="Lib:Character"]

[h:macroList=getMacros(",",findToken("Lib:Compendium"),"00.DM")]
[h:setLibProperty("macroList",macroList,"Lib:Compendium")]


[dialog5("Settings", "width=350; height=600; temporary=0; noframe=0; input=1"):{

<link rel="stylesheet" type="text/css" href="[r:function.getCss('GitHub')]">


<!-----------------GENERAL------------------->
<table>
<tr><th colspan=2>
General

<tr class=bg><td>
<span title="Close Shared Frame for all players">
[r:macroLink("Close Shared Frame","Close Shared@Lib:Campaign")]
<td align=right>

<tr><td>
<span title="Shows current version">
[r:macroLink("About","About@Lib:Campaign")]
<td align=right>
v[r,token("Lib:Campaign"):getProperty("libversion")]

<tr class=bg><td>
<span title="Change value of currency (not working)">
[r:macroLink("Currency Value","Settings@Lib:Campaign","","Currency")]
<td align=right>

<tr><td>
<span title="Set map to load by default">
[r:macroLink("Starting Map","Settings@Lib:Campaign","","Start")]
<td align=right>
[r,token("Lib:Campaign"):value=getProperty("Start")]

<tr class=bg><td>
<span title="Quick link to the game rules">
[r:macroLink("Rules URL","Settings@Lib:Campaign","","RulesLink")]


<tr><td>
<span title="Define a welcome message">
[r:macroLink("Welcome Message","Change Property@Lib:Campaign","","tokenName=Lib:Campaign;prop=Welcome")]
<td align=right>
[h,token("Lib:Campaign"):value=getProperty("Welcome")]
[r:if(value==0 || value=="","empty","")]

<tr class=bg><td>
<span title="Define preferences for framework behavior">
[r:macroLink("Gameplay Settings","Settings@Lib:Campaign","","Gameplay")]
<td align=right>

<tr><td>
<span title="Define display preferences">
[r:macroLink("Display Settings","Settings@Lib:Campaign","","Display")]
<td align=right>

</table>


<!-----------------COMPENDIUM------------------->
<table>
<tr><th colspan=2>
Compendium

<tr class=bg><td>
<span title="Export everything stored on the Lib:Compendium, as well as Classes, Races, Backgrounds and many more.">
[r:macroLink("Export Compendium","Json Export All@Lib:Campaign")]

<tr><td>
<span title="Import data exported by the Export Compendium above, larger files may crash the program, save before importing.">
[r:macroLink("Import Compendium","Json Import All@Lib:Campaign")]

<tr class=bg><td>
<span title="Remove content by source">
[r:macroLink("Remove Content","Remove Content@Lib:Campaign")]

<tr><td>
<span title="Manage Equipment">
[r:macroLink("Equipment","Manage Equipment@Lib:Character")]
<td align=right>
[h:value=getLibProperty("Equipment","Lib:Compendium")]
[h:fields=json.fields(value)]
[r:listcount(fields)]

<tr class=bg><td>
<span title="Manage Feats">
[r:macroLink("Feats","Manage Feats@Lib:Character")]
<td align=right>
[h:value=getLibProperty("Feats","Lib:Compendium")]
[h:fields=json.fields(value)]
[r:listcount(fields)]

<tr><td>
<span title="Manage Additional Feats">
[r:macroLink("Additional Feats","Manage Additional Feats@Lib:Character")]
<td align=right>
[h:value=getLibProperty("AdditionalFeats","Lib:Compendium")]
[h:fields=json.fields(value)]
[r:listcount(fields)]

<tr class=bg><td>
<span title="Manage Spells">
[r:macroLink("Manage Spells","Manage Spells@Lib:Character")]
<td align=right>
[h:value=getLibProperty("Spells","Lib:Compendium")]
[h:fields=json.fields(value)]
[r:listcount(fields)]


<tr>
<span title="Manage Bestiary">
[r:macroLink("Bestiary","Manage@Lib:Bestiary")]
<td align=right>
[h:value=getLibProperty("Bestiary","Lib:Compendium")]
[h:fields=json.fields(value)]
[r:listcount(fields)]


</table>

<!-----------------CHARACTER SHEET------------------->
<table>
<tr><th colspan=2>
Character Sheet
<tr class=bg><td>
<span title="Define custom atributes">
[r:macroLink("Attributes","Settings@Lib:Campaign","","Attributes")]
<td align=right>
[h:value=getLibProperty("Attributes","Lib:Character")]
[r:listcount(value)]

<tr><td>
<span title="Define custom skills">
[r:macroLink("Skills","Settings@Lib:Campaign","","Skills")]
<td align=right>
[h:value=getLibProperty("Skills","Lib:Character")]
[r:listcount(value,";")]


<tr class=bg><td>
<span title="Define passive checks to display on the Character Sheet">
[r:macroLink("Passive Checks","Settings@Lib:Campaign","","Passive")]
<td align=right>
[h:value=getLibProperty("Passive Checks","Lib:Character")]
[r:listcount(value)]

<tr><td>
<span title="Define list of Feat Options">
[r:macroLink("Feat Options","Settings@Lib:Campaign","","Feats")]
<td align=right>
[h:value=getLibProperty("Feats","Lib:Character Creation")]
[r:listcount(value)]

<tr class=bg><td>
<span title="Define default languages">
[r:macroLink("Languages","Settings@Lib:Campaign","","Languages")]
<td align=right>
[h:value=getLibProperty("Languages","Lib:Character Creation")]
[r:listcount(value)]

<tr><td>
<span title="Define races">
[r:macroLink("Races","Settings@Lib:Campaign","","Races")]
<td align=right>
[h:value=getLibProperty("Races","Lib:Character Creation")]
[r:listcount(value)]

<tr class=bg><td>
<span title="Define backgrounds">
[r:macroLink("Backgrounds","Settings@Lib:Campaign","","Backgrounds")]
<td align=right>
[h:value=getLibProperty("Backgrounds","Lib:Character Creation")]
[r:listcount(value)]

<tr><td>
<span title="Manage Classes and Subclasses">
[r:macroLink("Classes","Change Classes@Lib:Character Creation","")]
<td align=right>
[h:value=getLibProperty("Classes","Lib:Character Creation")]
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
[r:macroLink("Equipment Lists","Settings@Lib:Campaign","","Equipment")]
<td align=right>

<tr><td>
<span title="Define spell lists to display on the library">
[r:macroLink("Spell Lists","Settings@Lib:Campaign","","Spells")]

<tr class=bg><td>

<span title="Define spells by class and level">
[r:macroLink("Spells","Change Spells@Lib:Character Creation","")]


</table>

<!-----------------PERMISSIONS------------------->
<table>
<tr><th colspan=2>
Player Permissions
<tr class=bg><td>

<span title="Define output of rolls made by the players and GM">
[r:macroLink("Roll Output","Settings@Lib:Campaign","","Output")]
<td align=right>
[r:getLibProperty("PC Output",function.getNamespace())] /
[r:getLibProperty("GM Output",function.getNamespace())]

<tr><td>

<span title="Define output of dice sounds made by the players and GM">
[r:macroLink("Audio Output","Settings@Lib:Campaign","","OutputAudio")]
<td align=right>
[r:getLibProperty("PC Audio",function.getNamespace())] /
[r:getLibProperty("GM Audio",function.getNamespace())]

<tr class=bg><td>
<span title="Define link to audio clips and set audio to preload on startup or when required, multiple links delimited by comma">
[r:macroLink("Audio Clips","Settings@Lib:Campaign","","Clips")]
<td align=right>
[r:listcount(getLibProperty("Audio","Lib:Campaign"))]

<tr><td>
<span title="Define what players are allowed to access or edit">
[r:macroLink("Player Permissions","Settings@Lib:Campaign","","Permissions")]
<td align=right>

<tr class=bg><td>
<span title="Define tables to be ignored on the compendium, delimited by comma">
[r:macroLink("Table Blacklist","Settings@Lib:Campaign","","blacklist")]
<td align=right>
[r:listcount(getLibProperty("blacklist","Lib:Campaign"))]


</table>

}]