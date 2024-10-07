[dialog5("Settings", "width=350; height=600; temporary=0; noframe=0; input=1"):{
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="[r:function.getCss('common')]">
	<link rel="stylesheet" type="text/css" href="[r:function.getCss('GitHub')]">
</head>
<body>
	<!-----------------GENERAL------------------->
<table class="settings"> 
	<caption>General</caption>
	<tr>
		<td>
			<span title="Close Shared Frame for all players">
				[r:macroLink("Close Shared Frame","campaign/Close Shared@this")]
			</span>
		</td>
		<td>&nbsp;</td>
	</tr>
	<tr>
		<td>
			<span title="Shows current version">
				[r:macroLink("About","campaign/About@this")]
			</span>
		</td>
		<td>v[r:json.get(library.getInfo(function.getNamespace()), "version")]</td>
	</tr>
	<tr>
		<td>
			<span title="Change value of currency (not working)">
				[r:macrolink("Currency Value", "campaign/Settings@this", "","Currency")]
			</span>
		</td>
		<td>&nbsp;</td>
	</tr>
	<tr>
		<td>
			<span title="Set map to load by default">
				[r:macrolink("Starting Map", "campaign/Settings@this", "","Start")]
			</span>
		</td>
		<td>[r:getLibProperty("Start", function.getNamespace())]</td>
	</tr>
	<tr>
		<td>
			<span title="Quick link to the game rules">
				[r:macrolink("Rules URL", "campaign/Settings@this", "","RulesLink")]
			</span>
		</td>
		<td>&nbsp;</td>
	</tr>
	<tr>
		<td>
			<span title="Define a welcome message">
				[r:macrolink("Welcome Message", "campaign/Change Property@this", "","tokenName=Lib:Campaign;prop=Welcome")]
			</span>
		</td>
		<td>
			[h:value=getLibProperty("Welcome", function.getNamespace())]
			[r:if(value==0 || value=="","empty","")]
		</td>
	</tr>
	<tr>
		<td>
			<span title="Define preferences for framework behavior">
				[r:macrolink("Gameplay Settings", "campaign/Settings@this", "","Gameplay")]
			</span>
		</td>
		<td>&nbsp;</td>
	</tr>
	<tr>
		<td>
			<span title="Define display preferences">
				[r:macrolink("Display Settings", "campaign/Settings@this", "","Display")]
			</span>
		</td>
		<td>&nbsp;</td>
	</tr>
</table>

<!-----------------COMPENDIUM------------------->
<table class="settings"> 
	<caption>Compendium</caption>
	<tr>
		<td>
			<span title="Export everything stored on the Lib:Compendium, as well as Classes, Races, Backgrounds and many more.">
				[r:macroLink("Export Compendium","campaign/Json Export All@this")]
			</span>
		</td>
		<td>&nbsp;</td>
	</tr>
	<tr>
		<td>
			<span title="Import data exported by the Export Compendium above, larger files may crash the program, save before importing.">
				[r:macroLink("Import Compendium","campaign/Json Import All@this")]
			</span>
		</td>
		<td>&nbsp;</td>
	</tr>
	<tr>
		<td>
			<span title="Remove content by source">
				[r:macroLink("Remove Content","campaign/Remove Content@this")]
			</span>
		</td>
		<td>&nbsp;</td>
	</tr>
	<tr>
		<td>
			<span title="Manage Equipment">
				[r:macroLink("Equipment","character/Manage Equipment@this")]
			</span>
		</td>
		<td>
			[h:value=getLibProperty("Equipment", function.getNamespace())]
			[h:fields=json.fields(value)]
			[r:listcount(fields)]
		</td>
	</tr>
	<tr>
		<td>
			<span title="Manage Feats">
				[r:macroLink("Feats","character/Manage Feats@this")]
			</span>
		</td>
		<td>
			[h:value=getLibProperty("Feats", function.getNamespace())]
			[h:fields=json.fields(value)]
			[r:listcount(fields)]
		</td>
	</tr>
	<tr>
		<td>
			<span title="Manage Additional Feats">
				[r:macroLink("Additional Feats","character/Manage Additional Feats@this")]
			</span>
		</td>
		<td>
			[h:value=getLibProperty("AdditionalFeats", function.getNamespace())]
			[h:fields=json.fields(value)]
			[r:listcount(fields)]
		</td>
	</tr>
	<tr>
		<td>
			<span title="Manage Spells">
				[r:macroLink("Manage Spells","character/Manage Spells@this")]
			</span>
		</td>
		<td>
			[h:value=getLibProperty("Spells", function.getNamespace())]
			[h:fields=json.fields(value)]
			[r:listcount(fields)]
		</td>
	</tr>
	<tr>
		<td>
			<span title="Manage Bestiary">
				[r:macroLink("Bestiary","bestiary/Manage@this")]
			</span>
		</td>
		<td>
			[h:value=getLibProperty("Bestiary", function.getNamespace())]
			[h:fields=json.fields(value)]
			[r:listcount(fields)]
		</td>
	</tr>
</table>

<!-----------------CHARACTER SHEET------------------->
<table class="settings">
	<caption>Character Sheet</caption>
	<tr>
		<td>
			<span title="Define custom atributes">
				[r:macrolink("Attributes", "campaign/Settings@this", "","Attributes")]
			</span>
		</td>
		<td>
			[h:value=getLibProperty("Attributes", function.getNamespace())]
			[r:listcount(value)]
		</td>
	</tr>
	<tr>
		<td>
			<span title="Define custom skills">
				[r:macrolink("Skills", "campaign/Settings@this", "","Skills")]
			</span>
		</td>
		<td>
			[h:value=getLibProperty("Skills", function.getNamespace())]
			[r:listcount(value,";")]
		</td>
	</tr>
	<tr>
		<td>
			<span title="Define passive checks to display on the Character Sheet">
				[r:macrolink("Passive Checks", "campaign/Settings@this", "","Passive")]
			</span>
		</td>
		<td>
			[h:value=getLibProperty("Passive Checks", function.getNamespace())]
			[r:listcount(value)]
		</td>
	</tr>
	<tr>
		<td>
			<span title="Define list of Feat Options">
				[r:macrolink("Feat Options", "campaign/Settings@this", "","Feats")]
			</span>
		</td>
		<td>
			[h:value=getLibProperty("Feats List", function.getNamespace())]
			[r:listcount(value)]
		</td>
	</tr>
	<tr>
		<td>
			<span title="Define default languages">
				[r:macrolink("Languages", "campaign/Settings@this", "","Languages")]
			</span>
		</td>
		<td>
			[h:value=getLibProperty("Languages", function.getNamespace())]
			[r:listcount(value)]
		</td>
	</tr>
	<tr>
		<td>
			<span title="Define races">
				[r:macrolink("Races", "campaign/Settings@this", "","Races")]
			</span>
		</td>
		<td>
			[h:value=getLibProperty("Races", function.getNamespace())]
			[r:listcount(value)]
		</td>
	</tr>
	<tr>
		<td>
			<span title="Define backgrounds">
				[r:macrolink("Backgrounds", "campaign/Settings@this", "","Backgrounds")]
			</span>
		</td>
		<td>
			[h:value=getLibProperty("Backgrounds", function.getNamespace())]
			[r:listcount(value)]
		</td>
	</tr>
	<tr>
		<td>
			<span title="Manage Classes and Subclasses">
				[r:macrolink("Classes", "character-creation/Change Classes@this", "")]
			</span>
		</td>
		<td>
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
		</td>
	</tr>
	<tr>
		<td>
			<span title="Define weapon lists by type">
				[r:macrolink("Equipment Lists", "campaign/Settings@this", "","Equipment")]
			</span>
		<td>
		</td>
	</tr>
	<tr>
		<td>
			<span title="Define spell lists to display on the library">
				[r:macrolink("Spell Lists", "campaign/Settings@this", "","Spells")]
			</span>
		<td>
		</td>
	</tr>
	<tr>
		<td>
			<span title="Define spells by class and level">
				[r:macrolink("Spells", "character-creation/Change Spells@this", "")]
			</span>
		<td>
		</td>
	</tr>
</table>

<!-----------------PERMISSIONS------------------->
<table class="settings">
    <caption>Player Permissions</caption>
	<tr>
		<td>
			<span title="Define output of rolls made by the players and GM">
				[r:macrolink("Roll Output", "campaign/Settings@this", "","Output")]
			</span>
		</td>
		<td>
			[r:getLibProperty("PC Output",function.getNamespace())] /
			[r:getLibProperty("GM Output",function.getNamespace())]
		</td>
	</tr>
	<tr>
		<td>
			<span title="Define output of dice sounds made by the players and GM">
				[r:macrolink("Audio Output", "campaign/Settings@this", "","OutputAudio")]
			</span>
		</td>
		<td>
			[r:getLibProperty("PC Audio",function.getNamespace())] /
			[r:getLibProperty("GM Audio",function.getNamespace())]
		</td>
	</tr>
	<tr>
		<td>
			<span title="Define link to audio clips and set audio to preload on startup or when required, multiple links delimited by comma">
				[r:macrolink("Audio Clips", "campaign/Settings@this", "","Clips")]
			</span>
		</td>
		<td>
			[r:listcount(getLibProperty("Audio", function.getNamespace()))]
		</td>
	</tr>
	<tr>
		<td>
			<span title="Define what players are allowed to access or edit">
				[r:macrolink("Player Permissions", "campaign/Settings@this", "","Permissions")]
			</span>
		</td>
		<td>
		</td>
	</tr>
	<tr>
		<td>
			<span title="Define tables to be ignored on the compendium, delimited by comma">
				[r:macrolink("Table Blacklist", "campaign/Settings@this", "","blacklist")]
			</span>
		</td>
		<td>
			[r:listcount(getLibProperty("blacklist", function.getNamespace()))]
		</td>
	</tr>
</table>
</body>
</html>
}]