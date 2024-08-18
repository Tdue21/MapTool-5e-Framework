[h:tokenName=getStrProp(macro.args,"tokenName")]

[h:id=findToken(tokenName)]
[h:switchToken(id)]

[h:charClass=getProperty("Class&Level")]
[h,if(json.type(charClass)=="UNKNOWN"):charClassList="";charClassList=json.fields(charClass)]

[h:spellcasterLevel=0]

[h,count(listcount(charClassList)),code:{

	[h:currentClass=listget(charClassList,roll.count)]
	[h:currentObj=json.get(charClass,currentClass)]
	[h:subclass=json.get(currentObj,"subclass")]
	[h:level=json.get(currentObj,"level")]

	[h:Multiplier=0]
	[h:Multiplier=if(currentClass=="Paladin" || currentClass=="Ranger",1/2,Multiplier)]
	[h:Multiplier=if(currentClass=="Wizard" || currentClass=="Cleric" || currentClass=="Druid" || currentClass=="Bard" || currentClass=="Sorcerer",1,Multiplier)]
	[h:Multiplier=if(subclass=="Eldritch Knight" || subclass=="Arcane Trickster",1/3,Multiplier)]

	[h:spellcasterLevel=spellcasterLevel+if(level*Multiplier<1,floor(level*Multiplier),ceil(level*Multiplier))]

}]

[h:slots=getProperty("Slots")]

[h,if(spellcasterLevel==1),code:{

	[h:slots=setStrProp(slots,"total1",2)]
	[h:slots=setStrProp(slots,"total2",0)]
	[h:slots=setStrProp(slots,"total3",0)]
	[h:slots=setStrProp(slots,"total4",0)]
	[h:slots=setStrProp(slots,"total5",0)]
	[h:slots=setStrProp(slots,"total6",0)]
	[h:slots=setStrProp(slots,"total7",0)]
	[h:slots=setStrProp(slots,"total8",0)]
	[h:slots=setStrProp(slots,"total9",0)]
	[h:setProperty("Slots",slots)]

};{}]

[h,if(spellcasterLevel==2),code:{

	[h:slots=setStrProp(slots,"total1",3)]
	[h:slots=setStrProp(slots,"total2",0)]
	[h:slots=setStrProp(slots,"total3",0)]
	[h:slots=setStrProp(slots,"total4",0)]
	[h:slots=setStrProp(slots,"total5",0)]
	[h:slots=setStrProp(slots,"total6",0)]
	[h:slots=setStrProp(slots,"total7",0)]
	[h:slots=setStrProp(slots,"total8",0)]
	[h:slots=setStrProp(slots,"total9",0)]
	[h:setProperty("Slots",slots)]

};{}]

[h,if(spellcasterLevel==3),code:{

	[h:slots=setStrProp(slots,"total1",4)]
	[h:slots=setStrProp(slots,"total2",2)]
	[h:slots=setStrProp(slots,"total3",0)]
	[h:slots=setStrProp(slots,"total4",0)]
	[h:slots=setStrProp(slots,"total5",0)]
	[h:slots=setStrProp(slots,"total6",0)]
	[h:slots=setStrProp(slots,"total7",0)]
	[h:slots=setStrProp(slots,"total8",0)]
	[h:slots=setStrProp(slots,"total9",0)]
	[h:setProperty("Slots",slots)]

};{}]

[h,if(spellcasterLevel==4),code:{

	[h:slots=setStrProp(slots,"total1",4)]
	[h:slots=setStrProp(slots,"total2",3)]
	[h:slots=setStrProp(slots,"total3",0)]
	[h:slots=setStrProp(slots,"total4",0)]
	[h:slots=setStrProp(slots,"total5",0)]
	[h:slots=setStrProp(slots,"total6",0)]
	[h:slots=setStrProp(slots,"total7",0)]
	[h:slots=setStrProp(slots,"total8",0)]
	[h:slots=setStrProp(slots,"total9",0)]
	[h:setProperty("Slots",slots)]

};{}]

[h,if(spellcasterLevel==5),code:{

	[h:slots=setStrProp(slots,"total1",4)]
	[h:slots=setStrProp(slots,"total2",3)]
	[h:slots=setStrProp(slots,"total3",2)]
	[h:slots=setStrProp(slots,"total4",0)]
	[h:slots=setStrProp(slots,"total5",0)]
	[h:slots=setStrProp(slots,"total6",0)]
	[h:slots=setStrProp(slots,"total7",0)]
	[h:slots=setStrProp(slots,"total8",0)]
	[h:slots=setStrProp(slots,"total9",0)]
	[h:setProperty("Slots",slots)]

};{}]

[h,if(spellcasterLevel==6),code:{

	[h:slots=setStrProp(slots,"total1",4)]
	[h:slots=setStrProp(slots,"total2",3)]
	[h:slots=setStrProp(slots,"total3",3)]
	[h:slots=setStrProp(slots,"total4",0)]
	[h:slots=setStrProp(slots,"total5",0)]
	[h:slots=setStrProp(slots,"total6",0)]
	[h:slots=setStrProp(slots,"total7",0)]
	[h:slots=setStrProp(slots,"total8",0)]
	[h:slots=setStrProp(slots,"total9",0)]
	[h:setProperty("Slots",slots)]

};{}]

[h,if(spellcasterLevel==7),code:{

	[h:slots=setStrProp(slots,"total1",4)]
	[h:slots=setStrProp(slots,"total2",3)]
	[h:slots=setStrProp(slots,"total3",3)]
	[h:slots=setStrProp(slots,"total4",1)]
	[h:slots=setStrProp(slots,"total5",0)]
	[h:slots=setStrProp(slots,"total6",0)]
	[h:slots=setStrProp(slots,"total7",0)]
	[h:slots=setStrProp(slots,"total8",0)]
	[h:slots=setStrProp(slots,"total9",0)]
	[h:setProperty("Slots",slots)]

};{}]

[h,if(spellcasterLevel==8),code:{

	[h:slots=setStrProp(slots,"total1",4)]
	[h:slots=setStrProp(slots,"total2",3)]
	[h:slots=setStrProp(slots,"total3",3)]
	[h:slots=setStrProp(slots,"total4",2)]
	[h:slots=setStrProp(slots,"total5",0)]
	[h:slots=setStrProp(slots,"total6",0)]
	[h:slots=setStrProp(slots,"total7",0)]
	[h:slots=setStrProp(slots,"total8",0)]
	[h:slots=setStrProp(slots,"total9",0)]
	[h:setProperty("Slots",slots)]

};{}]

[h,if(spellcasterLevel==9),code:{

	[h:slots=setStrProp(slots,"total1",4)]
	[h:slots=setStrProp(slots,"total2",3)]
	[h:slots=setStrProp(slots,"total3",3)]
	[h:slots=setStrProp(slots,"total4",3)]
	[h:slots=setStrProp(slots,"total5",1)]
	[h:slots=setStrProp(slots,"total6",0)]
	[h:slots=setStrProp(slots,"total7",0)]
	[h:slots=setStrProp(slots,"total8",0)]
	[h:slots=setStrProp(slots,"total9",0)]
	[h:setProperty("Slots",slots)]

};{}]

[h,if(spellcasterLevel==10),code:{

	[h:slots=setStrProp(slots,"total1",4)]
	[h:slots=setStrProp(slots,"total2",3)]
	[h:slots=setStrProp(slots,"total3",3)]
	[h:slots=setStrProp(slots,"total4",3)]
	[h:slots=setStrProp(slots,"total5",2)]
	[h:slots=setStrProp(slots,"total6",0)]
	[h:slots=setStrProp(slots,"total7",0)]
	[h:slots=setStrProp(slots,"total8",0)]
	[h:slots=setStrProp(slots,"total9",0)]
	[h:setProperty("Slots",slots)]

};{}]

[h,if(spellcasterLevel==11),code:{

	[h:slots=setStrProp(slots,"total1",4)]
	[h:slots=setStrProp(slots,"total2",3)]
	[h:slots=setStrProp(slots,"total3",3)]
	[h:slots=setStrProp(slots,"total4",3)]
	[h:slots=setStrProp(slots,"total5",2)]
	[h:slots=setStrProp(slots,"total6",1)]
	[h:slots=setStrProp(slots,"total7",0)]
	[h:slots=setStrProp(slots,"total8",0)]
	[h:slots=setStrProp(slots,"total9",0)]
	[h:setProperty("Slots",slots)]

};{}]

[h,if(spellcasterLevel==12),code:{

	[h:slots=setStrProp(slots,"total1",4)]
	[h:slots=setStrProp(slots,"total2",3)]
	[h:slots=setStrProp(slots,"total3",3)]
	[h:slots=setStrProp(slots,"total4",3)]
	[h:slots=setStrProp(slots,"total5",2)]
	[h:slots=setStrProp(slots,"total6",1)]
	[h:slots=setStrProp(slots,"total7",0)]
	[h:slots=setStrProp(slots,"total8",0)]
	[h:slots=setStrProp(slots,"total9",0)]
	[h:setProperty("Slots",slots)]

};{}]

[h,if(spellcasterLevel==13),code:{

	[h:slots=setStrProp(slots,"total1",4)]
	[h:slots=setStrProp(slots,"total2",3)]
	[h:slots=setStrProp(slots,"total3",3)]
	[h:slots=setStrProp(slots,"total4",3)]
	[h:slots=setStrProp(slots,"total5",2)]
	[h:slots=setStrProp(slots,"total6",1)]
	[h:slots=setStrProp(slots,"total7",1)]
	[h:slots=setStrProp(slots,"total8",0)]
	[h:slots=setStrProp(slots,"total9",0)]
	[h:setProperty("Slots",slots)]

};{}]

[h,if(spellcasterLevel==14),code:{

	[h:slots=setStrProp(slots,"total1",4)]
	[h:slots=setStrProp(slots,"total2",3)]
	[h:slots=setStrProp(slots,"total3",3)]
	[h:slots=setStrProp(slots,"total4",3)]
	[h:slots=setStrProp(slots,"total5",2)]
	[h:slots=setStrProp(slots,"total6",1)]
	[h:slots=setStrProp(slots,"total7",1)]
	[h:slots=setStrProp(slots,"total8",0)]
	[h:slots=setStrProp(slots,"total9",0)]
	[h:setProperty("Slots",slots)]

};{}]

[h,if(spellcasterLevel==15),code:{

	[h:slots=setStrProp(slots,"total1",4)]
	[h:slots=setStrProp(slots,"total2",3)]
	[h:slots=setStrProp(slots,"total3",3)]
	[h:slots=setStrProp(slots,"total4",3)]
	[h:slots=setStrProp(slots,"total5",2)]
	[h:slots=setStrProp(slots,"total6",1)]
	[h:slots=setStrProp(slots,"total7",1)]
	[h:slots=setStrProp(slots,"total8",1)]
	[h:slots=setStrProp(slots,"total9",0)]
	[h:setProperty("Slots",slots)]

};{}]

[h,if(spellcasterLevel==16),code:{

	[h:slots=setStrProp(slots,"total1",4)]
	[h:slots=setStrProp(slots,"total2",3)]
	[h:slots=setStrProp(slots,"total3",3)]
	[h:slots=setStrProp(slots,"total4",3)]
	[h:slots=setStrProp(slots,"total5",2)]
	[h:slots=setStrProp(slots,"total6",1)]
	[h:slots=setStrProp(slots,"total7",1)]
	[h:slots=setStrProp(slots,"total8",1)]
	[h:slots=setStrProp(slots,"total9",0)]
	[h:setProperty("Slots",slots)]

};{}]

[h,if(spellcasterLevel==17),code:{

	[h:slots=setStrProp(slots,"total1",4)]
	[h:slots=setStrProp(slots,"total2",3)]
	[h:slots=setStrProp(slots,"total3",3)]
	[h:slots=setStrProp(slots,"total4",3)]
	[h:slots=setStrProp(slots,"total5",2)]
	[h:slots=setStrProp(slots,"total6",1)]
	[h:slots=setStrProp(slots,"total7",1)]
	[h:slots=setStrProp(slots,"total8",1)]
	[h:slots=setStrProp(slots,"total9",1)]
	[h:setProperty("Slots",slots)]

};{}]

[h,if(spellcasterLevel==18),code:{

	[h:slots=setStrProp(slots,"total1",4)]
	[h:slots=setStrProp(slots,"total2",3)]
	[h:slots=setStrProp(slots,"total3",3)]
	[h:slots=setStrProp(slots,"total4",3)]
	[h:slots=setStrProp(slots,"total5",3)]
	[h:slots=setStrProp(slots,"total6",1)]
	[h:slots=setStrProp(slots,"total7",1)]
	[h:slots=setStrProp(slots,"total8",1)]
	[h:slots=setStrProp(slots,"total9",1)]
	[h:setProperty("Slots",slots)]

};{}]

[h,if(spellcasterLevel==19),code:{

	[h:slots=setStrProp(slots,"total1",4)]
	[h:slots=setStrProp(slots,"total2",3)]
	[h:slots=setStrProp(slots,"total3",3)]
	[h:slots=setStrProp(slots,"total4",3)]
	[h:slots=setStrProp(slots,"total5",3)]
	[h:slots=setStrProp(slots,"total6",2)]
	[h:slots=setStrProp(slots,"total7",1)]
	[h:slots=setStrProp(slots,"total8",1)]
	[h:slots=setStrProp(slots,"total9",1)]
	[h:setProperty("Slots",slots)]

};{}]

[h,if(spellcasterLevel==20),code:{

	[h:slots=setStrProp(slots,"total1",4)]
	[h:slots=setStrProp(slots,"total2",3)]
	[h:slots=setStrProp(slots,"total3",3)]
	[h:slots=setStrProp(slots,"total4",3)]
	[h:slots=setStrProp(slots,"total5",3)]
	[h:slots=setStrProp(slots,"total6",2)]
	[h:slots=setStrProp(slots,"total7",2)]
	[h:slots=setStrProp(slots,"total8",1)]
	[h:slots=setStrProp(slots,"total9",1)]
	[h:setProperty("Slots",slots)]

};{}]