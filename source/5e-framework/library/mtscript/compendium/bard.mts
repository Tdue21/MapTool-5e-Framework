[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:Equip=getStrProp(macro.args,"Equipment")]
[h:class=getStrProp(macro.args,"class")]

[h:id=findToken(tokenName)]
[h:switchToken(id)]

[h:classes=getLibProperty("Classes","Lib:Character Creation")]

[h:AllClassObj=json.get(classes,class)]

[h:ClassObj=getProperty("Class&Level")]

	[h:classList=json.fields(ClassObj)]
	[h:match=listFind(classList,class)]
	[h:currentClassObj=json.get(ClassObj,class)]
	[h,if(json.type(currentClassObj)=="UNKNOWN"):level=0;level=json.get(currentClassObj,"level")]
	[h,if(json.type(currentClassObj)=="UNKNOWN"):subclass=0;subclass=json.get(currentClassObj,"subclass")]
}]


[h:musicalInstrument="Viol,Shawm,Pan Flute,Lyre,Lute,Horn,Flute,Dulcimer,Drum,Bagpipes,Other (Edit Later)"]

[h,if(listcount(classList)==1 && level==1),code:{
	
	<!-----------------Set Skills if empty------------------->
	[h:skillList=getLibProperty("Skills", "Lib:Character")]
	[h:SkillObject=getProperty("Skills")]
	[h:array=json.fromList(skillList,";")]
	[h:object=""]
	[h,if(json.type(SkillObject)=="UNKNOWN"),count(countStrProp(skillList),"<br><br>"),code:{
		[h:skillName=indexKeyStrProp(skillList,roll.count)]
		[h:skillAttribute=indexValueStrProp(skillList,roll.count)]
		[h:object=json.set(object,"name",skillName)]
		[h:object=json.set(object,"prof",0)]
		[h:object=json.set(object,"attribute",skillAttribute)]
		[h:object=json.set(object,"other",0)]
		[r:array=json.set(array,roll.count,object)]
	};{}]
	
	[h,if(json.type(SkillObject)=="UNKNOWN"),code:{
		[h:setProperty("Skills",array)]
		[h:SkillObject=array]
	};{}]
	<!-----------------Skill------------------->
	
	[h:attributeList=getLibProperty("Skills", "Lib:Character")]
	[h:repeat=countStrProp(attributeList)]
	[h:skillList=""]
	[h,count(repeat,""),code:{
		[h:skillList=listappend(skillList,indexKeyStrProp(attributeList,roll.count))]
	}]
	[h:skillAvailable=skillList]
	[h:characterSkills=getProperty("Skills")]
	[h:fields=json.fields(characterSkills)]
	[h,count(listcount(fields),""),code:{
	
		[h:currentSkill=json.get(characterSkills,roll.count)]
		[h:currentName=json.get(currentSkill,"name")]
		[h:currentProf=json.get(currentSkill,"prof")]
	
		[h,if(currentProf>0):skillAvailable=listdelete(skillAvailable,listfind(skillAvailable,currentName))]
	
	}]
	
	[h:res=input("var|Choose any 3 skill||label|span=true",
	"skill1|"+skillAvailable+"|Skill 1|list|value=string",
	"skill2|"+skillAvailable+"|Skill 2|list|value=string",
	"skill3|"+skillAvailable+"|Skill 3|list|value=string")]
	[h:abort(res)]
	
	[h:skill=skill1+","+skill2+","+skill3]
	
	[h:skills=getProperty("Skills")]
	[h,count(listcount(skill)),code:{
	
		[h:currentSkill=listget(skill,roll.count)]
		[h:index=listfind(skillList,currentSkill)]
	
		[h:chosenskill=json.get(skills,index)]
		[h:value=json.get(chosenskill,"prof")]
		[h:chosenskill=json.set(chosenskill,"prof",if(value>1,value,1))]
		[h:skills=json.set(skills,index,chosenskill)]
	
	}]
	[h:setProperty("Skills",skills)]
	
	<!-----------------Set Saves if empty------------------->
	[h:attributeList=getLibProperty("Attributes", "Lib:Character")]
	[h:SaveObject=getProperty("SavingTrows")]
	[h:array=json.fromList(attributeList)]
	[h:object=""]
	[h,if(json.type(SaveObject)=="UNKNOWN"),count(listcount(attributeList),"<br><br>"),code:{
	
		[h:currentAtr=listget(attributeList,roll.count)]
		[h:object=json.set(object,"name",currentAtr)]
		[h:object=json.set(object,"prof",0)]
		[h:object=json.set(object,"other",0)]
		[h:array=json.set(array,roll.count,object)]
	
	};{}]
	
	[h,if(json.type(SaveObject)=="UNKNOWN"),code:{
	
		[h:setProperty("SavingTrows",array)]
		[h:SaveObject=array]
	
	};{}]
	<!-----------------Saves------------------->
	
	[h:SaveObject=getProperty("SavingTrows")]
	[h:repeat=listcount(json.fields(SaveObject))]
	[h,count(repeat,""),code:{
	
		[h:currentSave=json.get(SaveObject,roll.count)]
		[h:SaveName=json.get(currentSave,"name")]
		[h:SaveProf=json.get(currentSave,"prof")]
		[h,if(saveName=="Dexterity" || saveName=="Charisma"):currentSave=json.set(currentSave,"prof",if(SaveProf==0,1,SaveProf))]
		[h:SaveObject=json.set(SaveObject,roll.count,currentSave)]
	
	}]
	[h:setProperty("SavingTrows",SaveObject)]
	
	
	
	<!-----------------Resources------------------->
	[h:resourcesObj=getProperty("Resources")]
	[h,if(json.type(resourcesObj)=="UNKNOWN"):resourcesObj="{}";""]
	
	[h:atribute=getProperty("Charisma")]
	[h:atrValue=getStrProp(atribute,"value")]
	[h,if(atrValue==""):atrValue=0;atrValue=eval(string(atrValue))]
	[h:mod=floor(number(atrValue)/2)-5]
	[h:mod=if(mod<1,1,mod)]
	
	[h:resourcesObj=json.set(resourcesObj,"bardic inspiration",json.fromStrProp("value=0;total="+mod+";reset=1"))]
	
	[h:setProperty("Resources",resourcesObj)]
	
	
	
	<!-----------------Armor------------------->
	[h:atr=getProperty("Armor Proficiency")]
	[h:value=getStrProp(atr,"value")]
	
	[h:Armors="light armor"]
	
	[h,count(listcount(Armors),""),code:{
		[h:CurrentItem=listget(Armors,roll.count)]
		[h,if(listfind(value,CurrentItem)==-1):value=listappend(value,CurrentItem)]
	}]
	
	[h:atr=setStrProp(atr,"value",value)]
	[h:setProperty("Armor Proficiency",atr)]
	
	<!-----------------Weapons------------------->
	[h:atr=getProperty("Weapon Proficiency")]
	[h:value=getStrProp(atr,"value")]
	
	[h:Weapons="simple weapons,hand crossbows,longswords,rapiers,shortswords"]
	
	[h,count(listcount(Weapons),""),code:{
		[h:CurrentItem=listget(Weapons,roll.count)]
		[h,if(listfind(value,CurrentItem)==-1):value=listappend(value,CurrentItem)]
	}]
	
	[h:atr=setStrProp(atr,"value",value)]
	[h:setProperty("Weapon Proficiency",atr)]
	
	
	
	
	<!-----------------Tools------------------->
	[h:atr=getProperty("Tool Proficiency")]
	[h:value=getStrProp(atr,"value")]

	
	[h,count(listcount(value),""),code:{
		[h:item=listget(value,roll.count)]
		[h:itemFind=listfind(musicalInstrument,item)]
		[h,if(itemFind==-1):"";musicalInstrument=listdelete(musicalInstrument,listfind(musicalInstrument,item))]
	}]
	
	[h:res=input("var|Instrument Proficiency||label|span=true",
	"tool1|"+musicalInstrument+"|Instrument 1|list|value=string",
	"tool2|"+musicalInstrument+"|Instrument 2|list|value=string",
	"tool3|"+musicalInstrument+"|Instrument 3|list|value=string")]
	[h:abort(res)]
	
	[h,if(listfind(value,tool1)==-1):value=listappend(value,tool1)]
	[h,if(listfind(value,tool2)==-1):value=listappend(value,tool2)]
	[h,if(listfind(value,tool3)==-1):value=listappend(value,tool3)]
	
	[h:atr=setStrProp(atr,"value",value)]
	
	[h:setProperty("Tool Proficiency",atr)]
	
	

	
};{}]
	
	
<!-----------------Equipment------------------->
[r,if(Equip=="Starting Equipment"),code:{


	[h:group="Equipment"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):Property="{}";""]
	
	[h:res=input("var|Starting Equipment||label|span=true",
	"weapon|Rapier,Longsword,Simple Weapon|Weapon|list",
	"pack|Diplomat's Pack,Entertainer's Pack|Pack|list",
	"instrument|Lute,Musical Instrument|Instrument|list",
	"armor|Leather Armor, and a dagger|Armor|label")]
	[h:abort(res)]

	[h:AddItem="character Creation/Add Item@this"]

	[h:smw=getLibProperty("Simple Melee Weapons","Lib:Character Creation")]
	[h:mmw=getLibProperty("Martial Melee Weapons","Lib:Character Creation")]
	[h:srw=getLibProperty("Simple Ranged Weapons","Lib:Character Creation")]
	[h:mrw=getLibProperty("Martial Ranged Weapons","Lib:Character Creation")]

	[h,if(weapon==0),code:{
		[macro(AddItem):"tokenName="+tokenName+";item=Rapier;Quantity=1;customName="]
	}]
	[h,if(weapon==1),code:{
		[macro(AddItem):"tokenName="+tokenName+";item=Longsword;Quantity=1;customName="]
	}]
	[h,if(weapon==2),code:{
		[h:input("var|Choose one||label|span=true",
		"w1|"+smw+","+srw+"|Simple Weapon|list|value=string")]
		[h:abort(res)]
		[macro(AddItem):"tokenName="+tokenName+";item="+w1+";Quantity=1;customName="]
	}]

	[macro(AddItem):"tokenName="+tokenName+";item=Leather Armor;Quantity=1;customName="]
	[macro(AddItem):"tokenName="+tokenName+";item=Dagger;Quantity=1;customName="]

	[h,if(instrument==0),code:{
		[macro(AddItem):"tokenName="+tokenName+";item=Lute;Quantity=1;customName="]
	}]
	[h,if(instrument==1),code:{
		[h:input("var|Choose one||label|span=true",
		"i1|"+musicalInstrument+"|Musical Instrument|list|value=string")]
		[h:abort(res)]
		[macro(AddItem):"tokenName="+tokenName+";item="+i1+";Quantity=1;customName="]
	}]

	[h,if(pack==0),code:{
		[macro(AddItem):"tokenName="+tokenName+";item=Chest;Quantity=1;customName="]
		[macro(AddItem):"tokenName="+tokenName+";item=Map or Scroll Case;Quantity=1;customName="]
		[macro(AddItem):"tokenName="+tokenName+";item=Fine Clothes;Quantity=1;customName="]
		[macro(AddItem):"tokenName="+tokenName+";item=Ink;Quantity=1;customName="]
		[macro(AddItem):"tokenName="+tokenName+";item=Ink Pen;Quantity=1;customName="]
		[macro(AddItem):"tokenName="+tokenName+";item=Lamp;Quantity=1;customName="]
		[macro(AddItem):"tokenName="+tokenName+";item=Oil (Flask);Quantity=2;customName="]
		[macro(AddItem):"tokenName="+tokenName+";item=Paper (one sheet);Quantity=5;customName="]
		[macro(AddItem):"tokenName="+tokenName+";item=Perfume (Vial);Quantity=1;customName="]
		[macro(AddItem):"tokenName="+tokenName+";item=Sealing Wax;Quantity=1;customName="]
		[macro(AddItem):"tokenName="+tokenName+";item=Soap;Quantity=1;customName="]
	}]
	[h,if(pack==1),code:{
		[macro(AddItem):"tokenName="+tokenName+";item=Backpack;Quantity=1;customName="]
		[macro(AddItem):"tokenName="+tokenName+";item=Bedroll;Quantity=1;customName="]
		[macro(AddItem):"tokenName="+tokenName+";item=Costume Clothes;Quantity=1;customName="]
		[macro(AddItem):"tokenName="+tokenName+";item=Candle;Quantity=5;customName="]
		[macro(AddItem):"tokenName="+tokenName+";item=Disquise Kit;Quantity=1;customName="]
		[macro(AddItem):"tokenName="+tokenName+";item=Rations (1 day);Quantity=5;customName="]
		[macro(AddItem):"tokenName="+tokenName+";item=Waterskin;Quantity=1;customName="]
	}]
	
	
};{}]
	
	<!-----------------Currency------------------->
[r,if(Equip=="Starting Money"),code:{
	
	[h:link=macroLinkText("character Creation/Starting Money@this","all","text="+tokenName+": Starting Money;value=5d4;tokenName="+tokenName+";multiplier=10")]
	
	[h:execLink(link,0,"self")]
	
};{}]



<!-----------------LEVEL 1 (MULTICLASSING)------------------->
[r,if(listcount(classList)>1 && level==1),code:{


	<!-----------------Set Skills if empty------------------->
	[h:skillList=getLibProperty("Skills", "Lib:Character")]
	[h:SkillObject=getProperty("Skills")]
	[h:array=json.fromList(skillList,";")]
	[h:object=""]
	[h,if(json.type(SkillObject)=="UNKNOWN"),count(countStrProp(skillList),"<br><br>"),code:{
		[h:skillName=indexKeyStrProp(skillList,roll.count)]
		[h:skillAttribute=indexValueStrProp(skillList,roll.count)]
		[h:object=json.set(object,"name",skillName)]
		[h:object=json.set(object,"prof",0)]
		[h:object=json.set(object,"attribute",skillAttribute)]
		[h:object=json.set(object,"other",0)]
		[r:array=json.set(array,roll.count,object)]
	};{}]
	
	[h,if(json.type(SkillObject)=="UNKNOWN"),code:{
		[h:setProperty("Skills",array)]
		[h:SkillObject=array]
	};{}]
	<!-----------------Skill------------------->
	
	[h:attributeList=getLibProperty("Skills", "Lib:Character")]
	[h:repeat=countStrProp(attributeList)]
	[h:skillList=""]
	[h,count(repeat,""),code:{
		[h:skillList=listappend(skillList,indexKeyStrProp(attributeList,roll.count))]
	}]
	[h:skillAvailable=skillList]
	[h:characterSkills=getProperty("Skills")]
	[h:fields=json.fields(characterSkills)]
	[h,count(listcount(fields),""),code:{
	
		[h:currentSkill=json.get(characterSkills,roll.count)]
		[h:currentName=json.get(currentSkill,"name")]
		[h:currentProf=json.get(currentSkill,"prof")]
	
		[h,if(currentProf>0):skillAvailable=listdelete(skillAvailable,listfind(skillAvailable,currentName))]
	
	}]
	
	[h:res=input("var|Choose any skill||label|span=true",
	"skill1|"+skillAvailable+"|Skill|list|value=string")]
	[h:abort(res)]
	
	[h:skill=skill1]
	
	[h:skills=getProperty("Skills")]
	[h,count(listcount(skill)),code:{
	
		[h:currentSkill=listget(skill,roll.count)]
		[h:index=listfind(skillList,currentSkill)]
	
		[h:chosenskill=json.get(skills,index)]
		[h:value=json.get(chosenskill,"prof")]
		[h:chosenskill=json.set(chosenskill,"prof",if(value>1,value,1))]
		[h:skills=json.set(skills,index,chosenskill)]
	
	}]
	[h:setProperty("Skills",skills)]

	<!-----------------Resources------------------->
	[h:resourcesObj=getProperty("Resources")]
	[h,if(json.type(resourcesObj)=="UNKNOWN"):resourcesObj="{}";""]
	
	[h:atribute=getProperty("Charisma")]
	[h:atrValue=getStrProp(atribute,"value")]
	[h,if(atrValue==""):atrValue=0;atrValue=eval(string(atrValue))]
	[h:mod=floor(number(atrValue)/2)-5]
	[h:mod=if(mod<1,1,mod)]
	
	[h:resourcesObj=json.set(resourcesObj,"bardic inspiration",json.fromStrProp("value=0;total="+mod+";reset=1"))]
	
	[h:setProperty("Resources",resourcesObj)]
	


	<!-----------------Armor------------------->
	[h:atr=getProperty("Armor Proficiency")]
	[h:value=getStrProp(atr,"value")]
	
	[h:Armors="light armor"]
	
	[h,count(listcount(Armors),""),code:{
		[h:CurrentItem=listget(Armors,roll.count)]
		[h,if(listfind(value,CurrentItem)==-1):value=listappend(value,CurrentItem)]
	}]
	
	[h:atr=setStrProp(atr,"value",value)]
	[h:setProperty("Armor Proficiency",atr)]
	
	<!-----------------Tools------------------->
	[h:atr=getProperty("Tool Proficiency")]
	[h:value=getStrProp(atr,"value")]
	
	
	[h,count(listcount(value),""),code:{
		[h:item=listget(value,roll.count)]
		[h:itemFind=listfind(musicalInstrument,item)]
		[h,if(itemFind==-1):"";musicalInstrument=listdelete(musicalInstrument,listfind(musicalInstrument,item))]
	}]
	
	[h:res=input("var|Instrument Proficiency||label|span=true",
	"tool1|"+musicalInstrument+"|Instrument|list|value=string")]
	[h:abort(res)]
	
	[h,if(listfind(value,tool1)==-1):value=listappend(value,tool1)]

	
	[h:atr=setStrProp(atr,"value",value)]
	
	[h:setProperty("Tool Proficiency",atr)]




};{}]



<!-----------------LEVEL 2------------------->
[r,if(level==2),code:{

<!-----------------Jack of All Trades------------------->

	[h:skillObj=getProperty("Skills")]
	[h:fields=json.fields(skillObj)]
	[h:repeat=listcount(fields)]
	[h,count(repeat),code:{
	
		[h:currentAtr=json.get(skillObj,roll.count)]
		[h:currentAtr=json.set(currentAtr,"half",1)]
		[h:skillObj=json.set(skillObj,roll.count,currentAtr)]
	
	}]
	[h:setProperty("Skills",skillObj)]
};{}]

<!-----------------LEVEL 3------------------->
[r,if(level==3),code:{
	

	<!-----------------Expertise------------------->
	
	[h:attributeList=getLibProperty("Skills", "Lib:Character")]
	[h:repeat=countStrProp(attributeList)]
	[h:skillList=""]
	[h,count(repeat,""),code:{
		[h:skillList=listappend(skillList,indexKeyStrProp(attributeList,roll.count))]
	}]
	[h:skillAvailable=skillList]
	[h:characterSkills=getProperty("Skills")]
	[h:fields=json.fields(characterSkills)]
	[h,count(listcount(fields),""),code:{
	
		[h:currentSkill=json.get(characterSkills,roll.count)]
		[h:currentName=json.get(currentSkill,"name")]
		[h:currentProf=json.get(currentSkill,"prof")]
	
		[h,if(currentProf!=1):skillAvailable=listdelete(skillAvailable,listfind(skillAvailable,currentName))]
	
	}]
	
	[h:res=input("var|Expertise||label|span=true",
	"skill1|"+skillAvailable+"|Skill 1|list|value=string",
	"skill2|"+skillAvailable+"|Skill 2|list|value=string")]
	[h:abort(res)]
	
	[h:skill=skill1+","+skill2]

	[h:skills=getProperty("Skills")]
	[h,count(listcount(skill)),code:{
	
		[h:currentSkill=listget(skill,roll.count)]
		[h:index=listfind(skillList,currentSkill)]
	
		[h:chosenskill=json.get(skills,index)]
		[h:value=json.get(chosenskill,"prof")]
		[h:chosenskill=json.set(chosenskill,"prof",if(value>2,value,2))]
		[h:skills=json.set(skills,index,chosenskill)]
	
	}]
	[h:setProperty("Skills",skills)]

};{}]



<!-----------------LEVEL 4------------------->
[r,if(level==4),code:{

	[macro("character Creation/Ability Score Improvement@this"):"tokenName="+tokenName]


};{}]


<!-----------------LEVEL 5------------------->
[r,if(level==5),code:{
	
	<!-----------------Resources------------------->
	[h:resourcesObj=getProperty("Resources")]
	[h,if(json.type(resourcesObj)=="UNKNOWN"):resourcesObj="{}";""]
	
	[h:atribute=getProperty("Charisma")]
	[h:atrValue=getStrProp(atribute,"value")]
	[h,if(atrValue==""):atrValue=0;atrValue=eval(string(atrValue))]
	[h:mod=floor(number(atrValue)/2)-5]
	[h:mod=if(mod<1,1,mod)]
	
	[h:resourcesObj=json.set(resourcesObj,"bardic inspiration",json.fromStrProp("value=0;total="+mod+";reset=0"))]
	
	[h:setProperty("Resources",resourcesObj)]


};{}]


<!-----------------LEVEL 6------------------->
[r,if(level==6),code:{


};{}]


<!-----------------LEVEL 7------------------->
[r,if(level==7),code:{


};{}]

<!-----------------LEVEL 8------------------->
[r,if(level==8),code:{

	[macro("character Creation/Ability Score Improvement@this"):"tokenName="+tokenName]

};{}]

<!-----------------LEVEL 9------------------->
[r,if(level==9),code:{

};{}]

<!-----------------LEVEL 10------------------->
[r,if(level==10),code:{
	<!-----------------Expertise------------------->
	
	[h:attributeList=getLibProperty("Skills", "Lib:Character")]
	[h:repeat=countStrProp(attributeList)]
	[h:skillList=""]
	[h,count(repeat,""),code:{
		[h:skillList=listappend(skillList,indexKeyStrProp(attributeList,roll.count))]
	}]
	[h:skillAvailable=skillList]
	[h:characterSkills=getProperty("Skills")]
	[h:fields=json.fields(characterSkills)]
	[h,count(listcount(fields),""),code:{
	
		[h:currentSkill=json.get(characterSkills,roll.count)]
		[h:currentName=json.get(currentSkill,"name")]
		[h:currentProf=json.get(currentSkill,"prof")]
	
		[h,if(currentProf!=1):skillAvailable=listdelete(skillAvailable,listfind(skillAvailable,currentName))]
	
	}]
	
	[h:res=input("var|Expertise||label|span=true",
	"skill1|"+skillAvailable+"|Skill 1|list|value=string",
	"skill2|"+skillAvailable+"|Skill 2|list|value=string")]
	[h:abort(res)]
	
	[h:skill=skill1+","+skill2]

	[h:skills=getProperty("Skills")]
	[h,count(listcount(skill)),code:{
	
		[h:currentSkill=listget(skill,roll.count)]
		[h:index=listfind(skillList,currentSkill)]
		
		[h:chosenskill=json.get(skills,index)]
		[h:value=json.get(chosenskill,"prof")]
		[h:chosenskill=json.set(chosenskill,"prof",if(value>2,value,2))]
		[h:skills=json.set(skills,index,chosenskill)]
	
	}]
	[h:setProperty("Skills",skills)]

};{}]

<!-----------------LEVEL 11------------------->
[r,if(level==11),code:{

};{}]

<!-----------------LEVEL 12------------------->
[r,if(level==12),code:{

	[macro("character Creation/Ability Score Improvement@this"):"tokenName="+tokenName]

};{}]

<!-----------------LEVEL 13------------------->
[r,if(level==13),code:{

};{}]

<!-----------------LEVEL 14------------------->
[r,if(level==14),code:{

};{}]

<!-----------------LEVEL 15------------------->
[r,if(level==15),code:{

};{}]

<!-----------------LEVEL 16------------------->
[r,if(level==16),code:{

	[macro("character Creation/Ability Score Improvement@this"):"tokenName="+tokenName]

};{}]

<!-----------------LEVEL 17------------------->
[r,if(level==17),code:{

};{}]

<!-----------------LEVEL 18------------------->
[r,if(level==18),code:{
	
};{}]

<!-----------------LEVEL 19------------------->
[r,if(level==19),code:{

	[macro("character Creation/Ability Score Improvement@this"):"tokenName="+tokenName]

};{}]


<!-----------------LEVEL 20------------------->
[r,if(level==20),code:{


};{}]



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

