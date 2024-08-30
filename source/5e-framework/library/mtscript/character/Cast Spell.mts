[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:name=getStrProp(macro.args,"name")]
[h:source=getStrProp(macro.args,"source")]

[h:output= function.getOutput())]
[h:spellsObj=getLibProperty("Spells","Lib:"+tokenName)]


[h,if(json.type(spellsObj)=="UNKNOWN"):obj="";obj=json.get(spellsObj,name)]



[macro("character/Get Spell Level@this"):"group=Spells;name="+name]


[h,if(json.type(obj)=="UNKNOWN"):level=macro.return;level=json.get(obj,"level")]



[h:SpellSlots=getLibProperty("Slots","Lib:"+tokenName)]

[h:SlotList=""]
[h,count(9),code:{

	[h:total=getStrProp(SpellSlots,"total"+number(roll.count+1))]
	[h,if(total==0):"";SlotList=listappend(SlotList,number(roll.count+1))]
}]

[h:availableSlots=""]
[h,count(listcount(SlotList)),code:{

	[h:currentLevel=listget(SlotList,roll.count)]
	[h:total=getStrProp(SpellSlots,"total"+currentLevel)]
	[h:value=getStrProp(SpellSlots,"value"+currentLevel)]
	[h,if(isNumber(total)==0):total=0]
	[h,if(isNumber(value)==0):value=0]
	[h:remaining=total-value]
	[h,if(remaining>0):availableSlots=listappend(availableSlots,currentLevel)]

}]

[h:availableSlotsLevel=""]
[h,count(listcount(availableSlots)),code:{

	[h:currentLevel=listget(availableSlots,roll.count)]
	[h,if(level>currentLevel || json.type(obj)=="UNKNOWN"):"";availableSlotsLevel=listappend(availableSlotsLevel,currentLevel)]

}]
[h,if(listcount(availableSlotsLevel)==0):availableSlotsLevel=if(json.type(obj)=="UNKNOWN","Unknown spell","No slots available")]
[h,if(level==0):availableSlotsLevel="Doesn't use slots"]
[h,if(level==0):"";availableSlotsLevel=listappend(availableSlotsLevel,"Use resources")]
[h:availableSlotsLevel=listappend(availableSlotsLevel,"Don't use slots")]

[h,macro("character/Get Spell Info@this"):"name="+name+";tokenName="+tokenName+";source="+source]
[h:mod=getStrProp(macro.return,"mod")]
[h:profBonus=getStrProp(macro.return,"profBonus")]
[h:attack=getStrProp(macro.return,"attack")]
[h:save=getStrProp(macro.return,"save")]
[h:template=getStrProp(macro.return,"template")]

[h:attributeList=getLibProperty("Attributes", "Lib:Character")]

<!------Needs Concentration?------->
[h:allSpells=getLibProperty("Spells","Lib:Compendium")]
[h:SpellObj=json.get(allSpells,name)]
[h:description=json.get(SpellObj,"description")]
[h:needsConcentration=matches(description,"[\\w\\W]*[Cc]oncentration[\\w\\W]*")]
[h:concentrationSpell=getLibProperty("Concentration","Lib:"+tokenName)]

[h:res=1]
[h,if(needsConcentration==1 && concentrationSpell!=""):res=input("cast|1|Break concentration on "+function.Capitalize(concentrationSpell)+"?|check");cast=0]
[h:abort(res)]



[h:res=input("UseSlot|"+availableSlotsLevel+"|Slot Level|list|value=string",
"template|"+template+"|Make spell template|check",
"rollAtk|"+attack+"|Roll Spell Attack|check",
"ShowDC|"+if(save=="",0,1)+"|Show Save DC|check",
"SavingThrow|-,"+attributeList+"|Saving Throw Attribute|list|value=string select="+listfind("-,"+attributeList,save))]
[h:abort(res)]




<!------Replace Concentration?------->
[h,if(needsConcentration==1 && cast==1),code:{

	[h:setState("Concentration",1)]
	[h:setLibProperty("Concentration",function.Capitalize(name),"Lib:"+tokenName)]

}]


[h,if(UseSlot=="Use resources"),code:{

	[h:resourcesObj=getLibProperty("Resources","Lib:"+tokenName)]
	[h:fields=json.fields(resourcesObj)]
	[h,if(UseSlot=="Use resources"):res=input("resourceName|"+fields+"|Resource|List|value=string select="+listfind(fields,name),
	"quantity|1|Quantity",
	if(rollAtk==1,"ATKValue||Spell Attack Bonus",""),
	if(ShowDC==1,"DCValue||Spell Save DC",""))]
	[h:abort(res)]

	[h:currentObj=json.get(resourcesObj,resourceName)]
	[h:value=json.get(currentObj,"value")]
	[h:value=value+quantity]
	[h:currentObj=json.set(currentObj,"value",value)]
	[h:resourcesObj=json.set(resourcesObj,resourceName,currentObj)]

	[h:setLibProperty("Resources",resourcesObj,"Lib:"+tokenName)]

}]


[h,if(rollAtk==1),code:{

	[h,if(UseSlot=="Use resources"):"";ATKValue=profBonus+mod]
	[macro("character/d20 Roller@this"):"text=Spell Attack;value=++"+ATKValue+";tokenName="+tokenName+";color=8a61ae;group=Spells;name="+name]

}]

[h,if(ShowDC==1),code:{
	[h,if(UseSlot=="Use resources"):"";DCValue=8+profBonus+mod]
	[macro("character/Dice Roller@this"):"text="+save+" Saving Throw DC:;value="+DCValue+";tokenName="+tokenName+";group=Spells;name="+name]

}]


[h,if(template==1),code:{
	[macro("character/Drop Template@this"):tokenName]
}]

[h,if(isNumber(UseSlot)==0),code:{};{
	[h:value=getStrProp(SpellSlots,"value"+UseSlot)]
	
	[h:value=value+1]
	
	[h:SpellSlots=setStrProp(SpellSlots,"value"+UseSlot,value)]
	
	[h:setLibProperty("Slots",SpellSlots,"Lib:"+tokenName)]
}]

[h,switch(UseSlot):
	case "1":ordinal="st";
	case "2":ordinal="nd";
	case "3":ordinal="rd";
	default:ordinal="th"
]



[h:level=if(isNumber(UseSlot)==1," using a "+UseSlot+ordinal+" level slot.",".")]

[h,if(UseSlot=="Use resources"):resource=" using "+resourceName+" ("+quantity+").";resource="."]

[h,if(isNumber(UseSlot)==1):resourceText=level;resourceText=resource]

[h:broadcast("<font style='text-decoration:none'>"+tokenName+" casts <b>"+macroLink(function.Capitalize(name),"character/Args Dialog@this","","prop=Spells;name="+name+";tokenName="+tokenName)+"</b>"+resourceText,Output)]

[h,if(isFrameVisible(tokenName+" - Character Sheet")==1),code:{
[macro("character/Macro Frame@this"):"macro=Character Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Spellcasting Sheet")==1),code:{
[macro("character/Macro Frame@this"):"macro=Spellcasting Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Statblock")==1),code:{
[macro("character/Macro Frame@this"):"macro=Statblock;tokenName="+tokenName]
};{}]