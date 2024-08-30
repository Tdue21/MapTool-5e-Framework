[h:jsonExport=""]

[h:json=getLibProperty("Races", function.getNamespace())]
[h:jsonExport=json.set(jsonExport,"Races",json)]

[h:json=getLibProperty("Backgrounds", function.getNamespace())]
[h:jsonExport=json.set(jsonExport,"Backgrounds",json)]

[h:json=getLibProperty("Languages", function.getNamespace())]
[h:jsonExport=json.set(jsonExport,"Languages",json)]

[h:json=getLibProperty("Classes", function.getNamespace())]
[h:jsonExport=json.set(jsonExport,"Classes",json)]

[h:json=getLibProperty("Simple Melee Weapons", function.getNamespace())]
[h:jsonExport=json.set(jsonExport,"Simple Melee Weapons",json)]

[h:json=getLibProperty("Simple Ranged Weapons", function.getNamespace())]
[h:jsonExport=json.set(jsonExport,"Simple Ranged Weapons",json)]

[h:json=getLibProperty("Martial Melee Weapons", function.getNamespace())]
[h:jsonExport=json.set(jsonExport,"Martial Melee Weapons",json)]

[h:json=getLibProperty("Martial Ranged Weapons", function.getNamespace())]
[h:jsonExport=json.set(jsonExport,"Martial Ranged Weapons",json)]


[h:json=getLibProperty("Feats", function.getNamespace())]
[h:jsonExport=json.set(jsonExport,"FeatsList",json)]

[h:json=getLibProperty("Feats", function.getNamespace())]
[h:jsonExport=json.set(jsonExport,"Feats",json)]

[h:json=getLibProperty("AdditionalFeats", function.getNamespace())]
[h:jsonExport=json.set(jsonExport,"AdditionalFeats",json)]

[h:json=getLibProperty("Spell Lists", function.getNamespace())]
[h:jsonExport=json.set(jsonExport,"Spell Lists",json)]

[h,count(listcount(json)),code:{

	[h:currentList=listget(json,roll.count)]
	[h:spellJson=getLibProperty(currentList,"Lib:Character Creation")]
	[h:jsonExport=json.set(jsonExport,currentList+" Spell List",spellJson)]

}]

[h:json=getLibProperty("Spells", function.getNamespace())]
[h:jsonExport=json.set(jsonExport,"Spells",json)]

[h:json=getLibProperty("Equipment", function.getNamespace())]
[h:jsonExport=json.set(jsonExport,"Equipment",json)]

[h:json=getLibProperty("Bestiary", function.getNamespace())]
[h:jsonExport=json.set(jsonExport,"Bestiary",json)]


[h:path=getLibProperty("Path", function.getNamespace())]

[h:res=input("var|Path must exist||label|span=true",
	"path|"+path+"|File Path",
	"name|Exported Content|File Name")]
[h:abort(res)]

[h:setLibProperty("Path", path, function.getNamespace())]

[h:exportData(path+"/"+name+".json",jsonExport,0)]