[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:name=getStrProp(macro.args,"name")]
[h:source=getStrProp(macro.args,"source")]

[h:outputPC=getLibProperty("PC Output", "Lib:Character")]
[h:outputGM=getLibProperty("GM Output", "Lib:Character")]

[h:output=if(isGM()==1,outputGM,outputPC)]

[macro("Get Spell Level@Lib:Character"):"group=Spells;name="+name]
[h:level=macro.return]

[h:slotList=level]

[h,count(9),if(level==0 || isNumber(level)==0),code:{};{

	[h,if(level<=roll.count):slotList=listAppend(slotList,roll.count+1)]

}]

[h,if(level==0):slotList="Doesn't use slots"]
[h,if(level==0):"";slotList=listappend(slotList,"Don't use slots")]
[h:res=input("UseSlot|"+slotList+"|Slot Level|list|value=string",
"template|0|Make spell template|check")]
[h:abort(res)]

[h,if(template==1),code:{
	[macro("Drop Template@Lib:Character"):tokenName]
}]


[h:id=findToken(tokenName)]
[h:switchToken(id)]

[h,switch(UseSlot):
	case "1":ordinal="st";
	case "2":ordinal="nd";
	case "3":ordinal="rd";
	default:ordinal="th"
]

[h,if(isNumber(UseSlot)==1),code:{

	[h:resourcesObj=getProperty("Resources")]
	[h,if(json.type(resourcesObj)=="UNKNOWN"):resourcesObj="{}";""]

	[h:CurrentSlot=json.get(resourcesObj,UseSlot+ordinal+" level")]

	[h,if(json.type(CurrentSlot)=="UNKNOWN"):CurrentSlot='{"value":0,"total":0}';""]

	[h:value=json.get(CurrentSlot,"value")]

	[h:CurrentSlot=json.set(CurrentSlot,"value",value+1)]
	[h:resourcesObj=json.set(resourcesObj,UseSlot+ordinal+" level",CurrentSlot)]

	[h:setProperty("Resources",resourcesObj)]

}]


[h:level=if(isNumber(UseSlot)==1," using a "+UseSlot+ordinal+" level slot.",".")]
[h:broadcast("<font style='text-decoration:none'>"+tokenName+" casts <b>"+macroLink(function.Capitalize(name),"Args Dialog@Lib:Bestiary","","prop=Spells;name="+name+";tokenName="+tokenName)+"</b>"+level,Output)]


[h,if(isFrameVisible(tokenName+" - Statblock")==1),code:{
[macro("Macro Frame@Lib:Bestiary"):tokenName]
};{}]