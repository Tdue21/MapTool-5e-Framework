[h:jsonExport=""]

[h:json=getLibProperty("Races","Lib:Character Creation")]
[h:jsonExport=json.set(jsonExport,"Races",json)]

[h:json=getLibProperty("Backgrounds","Lib:Character Creation")]
[h:jsonExport=json.set(jsonExport,"Backgrounds",json)]

[h:json=getLibProperty("Languages","Lib:Character Creation")]
[h:jsonExport=json.set(jsonExport,"Languages",json)]

[h:json=getLibProperty("Classes","Lib:Character Creation")]
[h:jsonExport=json.set(jsonExport,"Classes",json)]

[h:json=getLibProperty("Simple Melee Weapons","Lib:Character Creation")]
[h:jsonExport=json.set(jsonExport,"Simple Melee Weapons",json)]

[h:json=getLibProperty("Simple Ranged Weapons","Lib:Character Creation")]
[h:jsonExport=json.set(jsonExport,"Simple Ranged Weapons",json)]

[h:json=getLibProperty("Martial Melee Weapons","Lib:Character Creation")]
[h:jsonExport=json.set(jsonExport,"Martial Melee Weapons",json)]

[h:json=getLibProperty("Martial Ranged Weapons","Lib:Character Creation")]
[h:jsonExport=json.set(jsonExport,"Martial Ranged Weapons",json)]


[h:json=getLibProperty("Feats","Lib:Character Creation")]
[h:jsonExport=json.set(jsonExport,"FeatsList",json)]

[h:json=getLibProperty("Feats","Lib:Compendium")]
[h:jsonExport=json.set(jsonExport,"Feats",json)]

[h:json=getLibProperty("AdditionalFeats","Lib:Compendium")]
[h:jsonExport=json.set(jsonExport,"AdditionalFeats",json)]

[h:json=getLibProperty("Spell Lists","Lib:Character Creation")]
[h:jsonExport=json.set(jsonExport,"Spell Lists",json)]

[h,count(listcount(json)),code:{

	[h:currentList=listget(json,roll.count)]
	[h:spellJson=getLibProperty(currentList,"Lib:Character Creation")]
	[h:jsonExport=json.set(jsonExport,currentList+" Spell List",spellJson)]

}]

[h:json=getLibProperty("Spells","Lib:Compendium")]
[h:jsonExport=json.set(jsonExport,"Spells",json)]

[h:json=getLibProperty("Equipment","Lib:Compendium")]
[h:jsonExport=json.set(jsonExport,"Equipment",json)]

[h:json=getLibProperty("Bestiary","Lib:Compendium")]
[h:jsonExport=json.set(jsonExport,"Bestiary",json)]


[h:path=getLibProperty("Path","Lib:Campaign")]

[h:res=input("var|Path must exist||label|span=true",
	"path|"+path+"|File Path",
	"name|Exported Content|File Name")]
[h:abort(res)]

[h:setLibProperty("Path",path,"Lib:Campaign")]

[h:exportData(path+"/"+name+".json",jsonExport,0)]