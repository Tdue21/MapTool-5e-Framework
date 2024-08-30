[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:subclass=getStrProp(macro.args,"subclass")]
[h:class=getStrProp(macro.args,"class")]

[h:id=findToken(tokenName)]
[h:switchToken(id)]

[h:classes=getLibProperty("Classes", function.getNamespace())]

[h:AllClassObj=json.get(classes,class)]


[h:level=""]

[h:ClassObj=getProperty("Class&Level")]
[h,if(json.type(ClassObj)=="UNKNOWN" || json.fields(ClassObj)==""),code:{};{

	[h:classList=json.fields(ClassObj)]
	[h:match=listFind(classList,class)]
	[h:currentClassObj=json.get(ClassObj,class)]
	[h,if(json.type(currentClassObj)=="UNKNOWN"):level=0;level=json.get(currentClassObj,"level")]
	[h,if(json.type(currentClassObj)=="UNKNOWN"):subclass=0;subclass=json.get(currentClassObj,"subclass")]

}]


<!-----------------LEVEL 2------------------->
[r,if(level==2),code:{
	<!-----------------Class------------------->
	[h:res=input("var|Circle of the Land||label|span=true",
	"land|Arctic,Coast,Desert,Forest,Grassland,Mountain,Swamp,Underdark|Land|list|value=string")]
	[h:abort(res)]



	[h:currentClass=json.get(ClassObj,class)]
	[h:currentClass=json.set(currentClass,"note",land)]
	[h:ClassObj=json.set(ClassObj,class,currentClass)]

	[h:setProperty("Class&Level",ClassObj)]

	<!-----------------Spells------------------->
	[h:group="Spells"]
	[h:spellobj=getLibProperty(class, "Lib:Character Creation")]
	[h:spellobj=json.get(spellobj,"Level 0")]
	[h:spellList=json.toList(spellobj)]
	
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h:value=json.fields(currentList)]
	[h,count(listcount(value),""),code:{
		[h:item=listget(value,roll.count)]
		[h:itemFind=listfind(spellList,item)]
		[h,if(itemFind==-1):"";spellList=listdelete(spellList,listfind(spellList,item))]
	}]
	
	
	[h:res=input("var|Choose one from Druid Spells||label|span=true",
	"spell1|"+spellList+"|Cantrip|list|value=string")]
	[h:abort(res)]
	
	[h:Property=json.set(Property,spell1,json.fromStrProp("level=0;prep=1;source=Druid;customAtr=0"))]
	
	
	
	[h:setProperty(group,Property)]
}]


<!-----------------LEVEL 3------------------->
[r,if(level==3),code:{

	[h:currentClass=json.get(ClassObj,class)]
	[h:land=json.get(currentClass,"note")]


	<!-----------------Spells------------------->
	[h:group="Spells"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]

[h,switch(land):
	case "Arctic":list="Hold Person,Spike Growth";
	case "Coast":list="Mirror image,Misty step";
	case "Desert":list="Blur,Silence";
	case "Forest":list="Barkskin,Spider Climb";
	case "Grassland":list="Invisibility,Pass without Trace";
	case "Mountain":list="Spider Climb,Spike Growth";
	case "Swamp":list="Darkness, Melf's Acid Arrow";
	case "Underdark":list="	Spider Climb, Web";
]
	[h:Property=json.set(Property,listget(list,0),json.fromStrProp("level=2;;prep=1;source=Druid;customAtr=0"))]
	[h:Property=json.set(Property,listget(list,1),json.fromStrProp("level=2;;prep=1;source=Druid;customAtr=0"))]
	
	[h:setProperty(group,Property)]
	
}]



<!-----------------LEVEL 5------------------->
[r,if(level==5),code:{

	[h:currentClass=json.get(ClassObj,class)]
	[h:land=json.get(currentClass,"note")]

	<!-----------------Spells------------------->
	[h:group="Spells"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]

[h,switch(land):
	case "Arctic":list="Sleet Storm,Slow";
	case "Coast":list="Water Breathing,Water Walk";
	case "Desert":list="Create Food and Water,Protection from Energy";
	case "Forest":list="Call Lightning,Plant Growth";
	case "Grassland":list="Daylight,Haste";
	case "Mountain":list="Lightning Bolt,Meld into Stone";
	case "Swamp":list="Water Walk,Stinking Cloud";
	case "Underdark":list="Gaseous Form, Stinking Cloud";
]
	[h:Property=json.set(Property,listget(list,0),json.fromStrProp("level=3;prep=1;source=Druid;customAtr=0"))]
	[h:Property=json.set(Property,listget(list,1),json.fromStrProp("level=3;prep=1;source=Druid;customAtr=0"))]
	
	[h:setProperty(group,Property)]
	
}]



<!-----------------LEVEL 6------------------->
[r,if(level==6),code:{



	
}]



<!-----------------LEVEL 7------------------->
[r,if(level==7),code:{

	[h:currentClass=json.get(ClassObj,class)]
	[h:land=json.get(currentClass,"note")]

	<!-----------------Spells------------------->
	[h:group="Spells"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]

[h,switch(land):
	case "Arctic":list="Freedom of Movement,Ice Storm";
	case "Coast":list="Control Water,Freedom of Movement";
	case "Desert":list="Blight,Hallucinatory Terrain";
	case "Forest":list="Divination,Freedom of Movement";
	case "Grassland":list="Divination,Freedom of Movement";
	case "Mountain":list="Stone Shape,Stoneskin";
	case "Swamp":list="Freedom of Movement,Locate Creature";
	case "Underdark":list="Greater Invisibility,Stone Shape";
]
	[h:Property=json.set(Property,listget(list,0),json.fromStrProp("level=4;prep=1;source=Druid;customAtr=0"))]
	[h:Property=json.set(Property,listget(list,1),json.fromStrProp("level=4;prep=1;source=Druid;customAtr=0"))]
	
	[h:setProperty(group,Property)]
	
}]



<!-----------------LEVEL 9------------------->
[r,if(level==9),code:{

	[h:currentClass=json.get(ClassObj,class)]
	[h:land=json.get(currentClass,"note")]

	<!-----------------Spells------------------->
	[h:group="Spells"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]

[h,switch(land):
	case "Arctic":list="Commune with Nature,Cone of Cold";
	case "Coast":list="Conjure Elemental,Scrying";
	case "Desert":list="Insect Plague,Wall of Stone";
	case "Forest":list="Commune with Nature,Tree Stride";
	case "Grassland":list="Dream,Insect Plague";
	case "Mountain":list="Passwall,Wall of Stone";
	case "Swamp":list="Insect Plague,Scrying";
	case "Underdark":list="Cloudkill,Insect Plague";
]
	[h:Property=json.set(Property,listget(list,0),json.fromStrProp("level=5;prep=1;source=Druid;customAtr=0"))]
	[h:Property=json.set(Property,listget(list,1),json.fromStrProp("level=5;prep=1;source=Druid;customAtr=0"))]
	
	[h:setProperty(group,Property)]
	
}]



<!-----------------LEVEL 10------------------->
[r,if(level==10),code:{



	
}]




<!-----------------LEVEL 14------------------->
[r,if(level==14),code:{


	
}]



<!-----------------FIX CASE----------------------->
[h:props="Feats,AdditionalFeats,Equipment,Spells"]

[h,count(listcount(props)),code:{

	[h:prop=listget(props,roll.count)]

	[h:jsonProp=getProperty(prop)]
	
	[h:fields=json.fields(jsonProp)]
	
	[h,count(listcount(fields)),code:{
	
		[h:objName=listget(fields,roll.count)]
		[h:currentObj=json.get(jsonProp,objName)]
		[r:checkCase=matches(objName,".*[A-Z]+.*")]
		[h,if(checkCase==1):jsonProp=json.set(jsonProp,lower(objName),currentObj)]
		[h,if(checkCase==1):jsonProp=json.remove(jsonProp,objName)]
	}]
	
	[h:setProperty(prop,jsonProp)]

}]


