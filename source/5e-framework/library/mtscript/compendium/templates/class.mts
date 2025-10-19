<!----------------------CLASS SAVING THROWS------------------------->
[h:Save1="Strength"]
[h:Save2="Constitution"]

<!--------------------------CLASS SKILLS---------------------------->

<!--------------LIST OF SKILLS DELIMITED BY COMMAS------------------>
[h:skillAvailable="Animal Handling,Athletics,Intimidation,Nature,Perception,Survival"]

<!---------------NUMBER OF SKILLS TO CHOOSE FROM-------------------->
[h:skillChoices=2]





[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:Equip=getStrProp(macro.args,"Equipment")]
[h:class=getStrProp(macro.args,"class")]
[h:id=findToken(tokenName)]
[h:switchToken(id)]
[h:classes=getLibProperty("Classes", function.getNamespace())]
[h:AllClassObj=json.get(classes,class)]
[h:ClassObj=getProperty("Class&Level")]
	[h:classList=json.fields(ClassObj)]
	[h:match=listFind(classList,class)]
	[h:currentClassObj=json.get(ClassObj,class)]
	[h,if(json.type(currentClassObj)=="UNKNOWN"):level=0;level=json.get(currentClassObj,"level")]
	[h,if(json.type(currentClassObj)=="UNKNOWN"):subclass=0;subclass=json.get(currentClassObj,"subclass")]
}]

<!------------------------------------------------------------------>
<!-----------------LEVEL 1 - NO MULTICLASSING----------------------->
<!------------------------------------------------------------------>
[h,if(listcount(classList)==1 && level==1),code:{	
<!--------------------------Skills---------------------------->
	[h:skillList=getLibProperty("Skills", function.getNamespace())]
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
	[h:attributeList=getLibProperty("Skills", function.getNamespace())]
	[h:repeat=countStrProp(attributeList)]
	[h:skillList=""]
	[h,count(repeat,""),code:{
		[h:skillList=listappend(skillList,indexKeyStrProp(attributeList,roll.count))]
	}]
	[h:characterSkills=getProperty("Skills")]
	[h:fields=json.fields(characterSkills)]
	[h,count(listcount(fields),""),code:{	
		[h:currentSkill=json.get(characterSkills,roll.count)]
		[h:currentName=json.get(currentSkill,"name")]
		[h:currentProf=json.get(currentSkill,"prof")]
		[h,if(currentProf>0):skillAvailable=listdelete(skillAvailable,listfind(skillAvailable,currentName))]
	}]
	[h:res=input("var|Choose "+skillChoices+" skills||label|span=true",
	"skill1|"+skillAvailable+"|Skill 1|list|value=string",
	"skill2|"+skillAvailable+"|Skill 2|list|value=string",if(skillChoices>2,"skill3|"+skillAvailable+"|Skill 3|list|value=string",if(skillChoices>3,"skill4|"+skillAvailable+"|Skill 4|list|value=string","")))]
	[h:abort(res)]	
	[h:skill=skill1+","+skill2]
	[h,if(skillChoices>2):skill=skill+","+skill3;""]
	[h,if(skillChoices>3):skill=skill+","+skill4;""]
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
<!--------------------------Saves---------------------------->
	[h:attributeList=getLibProperty("Attributes", function.getNamespace())]
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
	[h:SaveObject=getProperty("SavingTrows")]
	[h:repeat=listcount(json.fields(SaveObject))]
	[h,count(repeat,""),code:{
		[h:currentSave=json.get(SaveObject,roll.count)]
		[h:SaveName=json.get(currentSave,"name")]
		[h:SaveProf=json.get(currentSave,"prof")]
		[h,if(saveName==Save1 || saveName==Save2):currentSave=json.set(currentSave,"prof",if(SaveProf==0,1,SaveProf))]
		[h:SaveObject=json.set(SaveObject,roll.count,currentSave)]
	}]
	[h:setProperty("SavingTrows",SaveObject)]



<!------------------------------------------------------------------>
<!-------------------------PROFICIENCIES---------------------------->
<!------------------------------------------------------------------>
<!------------------------------Armor------------------------------->
[h:Armors="light armor,medium armor,shields"]
<!----------------------------Weapons------------------------------->
[h:Weapons="simple weapons, martial weapons"]
<!-----------------------------Tools-------------------------------->
[h:Tools=""]
<!----------------------------Languages----------------------------->
[h:Languages=""]
<!-----------------------------Other-------------------------------->
[h:Other=""]
<!------------------------------------------------------------------>
[h:atr=getProperty("Armor Proficiency")]
[h:value=getStrProp(atr,"value")]
[h,count(listcount(Armors),""),code:{
	[h:CurrentItem=listget(Armors,roll.count)]
	[h,if(listfind(value,CurrentItem)==-1):value=listappend(value,CurrentItem)]
}]
[h:atr=setStrProp(atr,"value",value)]
[h:setProperty("Armor Proficiency",atr)]
<!------------------------------------------------------------------>
[h:atr=getProperty("Weapon Proficiency")]
[h:value=getStrProp(atr,"value")]
[h,count(listcount(Weapons),""),code:{
	[h:CurrentItem=listget(Weapons,roll.count)]
	[h,if(listfind(value,CurrentItem)==-1):value=listappend(value,CurrentItem)]
}]
[h:atr=setStrProp(atr,"value",value)]
[h:setProperty("Weapon Proficiency",atr)]
<!------------------------------------------------------------------>
[h:atr=getProperty("Tool Proficiency")]
[h:value=getStrProp(atr,"value")]
[h,count(listcount(Tools),""),code:{
	[h:CurrentItem=listget(Tools,roll.count)]
	[h,if(listfind(value,CurrentItem)==-1):value=listappend(value,CurrentItem)]
}]
[h:atr=setStrProp(atr,"value",value)]
[h:setProperty("Tool Proficiency",atr)]
<!------------------------------------------------------------------>
[h:atr=getProperty("Language Proficiency")]
[h:value=getStrProp(atr,"value")]
[h,count(listcount(Languages),""),code:{
	[h:CurrentItem=listget(Languages,roll.count)]
	[h,if(listfind(value,CurrentItem)==-1):value=listappend(value,CurrentItem)]
}]
[h:atr=setStrProp(atr,"value",value)]
[h:setProperty("Language Proficiency",atr)]
<!------------------------------------------------------------------>
[h:atr=getProperty("Other Proficiency")]
[h:value=getStrProp(atr,"value")]
[h,count(listcount(Other),""),code:{
	[h:CurrentItem=listget(Other,roll.count)]
	[h,if(listfind(value,CurrentItem)==-1):value=listappend(value,CurrentItem)]
}]
[h:atr=setStrProp(atr,"value",value)]
[h:setProperty("Other Proficiency",atr)]
<!------------------------------------------------------------------>
<!-----------------------END OF PROFICIENCIES----------------------->
<!------------------------------------------------------------------>

};{}]
<!------------------------------------------------------------------>
<!-----------------------STARTING EQUIPMENT------------------------->
<!------------------------------------------------------------------>
[r,if(Equip=="Starting Equipment"),code:{
	[h:group="Equipment"]
	[h:inputList=getLibProperty(group,function.getNamespace())]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	[h,if(json.type(Property)=="UNKNOWN"):Property="{}";""]



<!-----------------------ITEM CHOICE INPUT------------------------->
	[h:res=input("var|Starting Equipment||label|span=true",
	"weapon1|Greataxe,Martial Melee Weapon|Weapon|list",
	"weapon2|2 Handaxes,Simple Weapon|Secondary Weapon|list",
	"pack|An Explorer's Pack, and four javelins|Pack|label")]
	[h:abort(res)]

	[h:AddItem="character-creation/Add Item@this"]
	[h:smw=getLibProperty("Simple Melee Weapons", function.getNamespace())]
	[h:mmw=getLibProperty("Martial Melee Weapons", function.getNamespace())]
	[h:srw=getLibProperty("Simple Ranged Weapons", function.getNamespace())]
	[h:mrw=getLibProperty("Martial Ranged Weapons", function.getNamespace())]

<!-------------------------PLACE CHOICES--------------------------->
	[h,if(weapon1==0),code:{
		[macro(AddItem):"tokenName="+tokenName+";item=Greataxe;Quantity=1;customName="]
	}]
	[h,if(weapon1==1),code:{
		[h:input("var|Choose one||label|span=true",
		"w1|"+mmw+"|Martial Melee Weapon|list|value=string")]
		[h:abort(res)]
		[macro(AddItem):"tokenName="+tokenName+";item="+w1+";Quantity=1;customName="]
	}]
	
	[h,if(weapon2==0),code:{
		[macro(AddItem):"tokenName="+tokenName+";item=Handaxe;Quantity=2;customName="]
	}]
	[h,if(weapon2==1),code:{
		[h:input("var|Choose one||label|span=true",
		"w1|"+smw+","+srw+"|Simple Weapon|list|value=string")]
		[h:abort(res)]
		[macro(AddItem):"tokenName="+tokenName+";item="+w1+";Quantity=1;customName="]
	}]
<!-------------------------------PACK------------------------------->
	[macro(AddItem):"tokenName="+tokenName+";item=Backpack;Quantity=1;customName="]
	[macro(AddItem):"tokenName="+tokenName+";item=Bedroll;Quantity=1;customName="]
	[macro(AddItem):"tokenName="+tokenName+";item=Mess Kit;Quantity=1;customName="]
	[macro(AddItem):"tokenName="+tokenName+";item=Tinderbox;Quantity=1;customName="]
	[macro(AddItem):"tokenName="+tokenName+";item=Torch;Quantity=10;customName="]
	[macro(AddItem):"tokenName="+tokenName+";item=Hempen Rope (50 feet);Quantity=1;customName="]
	[macro(AddItem):"tokenName="+tokenName+";item=Rations (1 day);Quantity=10;customName="]
	[macro(AddItem):"tokenName="+tokenName+";item=Waterskin;Quantity=1;customName="]

	[macro(AddItem):"tokenName="+tokenName+";item=Javelin;Quantity=4;customName="]
<!------------------------------------------------------------------>
<!------------------END OF STARTING EQUIPMENT----------------------->
<!------------------------------------------------------------------>

	
};{}]
	
<!------------------------------------------------------------------>
<!------------------------STARTING MONEY---------------------------->
<!------------------------------------------------------------------>
[h:moneyDiceFormula="2d4"]
[h:multiplier=10]
<!------------------------------------------------------------------>
[r,if(Equip=="Starting Money"),code:{
[h:link=macroLinkText("character-creation/Starting Money@this","all","text="+tokenName+": Starting Money;value="+moneyDiceFormula+";tokenName="+tokenName+";multiplier="+multiplier)]
[h:execLink(link,0,"self")]
};{}]
<!------------------------------------------------------------------>
<!---------------------END OF STARTING MONEY------------------------>
<!------------------------------------------------------------------>




<!------------------------------------------------------------------>
<!------------------LEVEL 1 - MULTICLASSING------------------------->
<!------------------------------------------------------------------>
[r,if(listcount(classList)>1 && level==1),code:{

};{}]





<!------------------------------------------------------------------>
<!-----------------------------LEVEL 2------------------------------>
<!------------------------------------------------------------------>
[r,if(level==2),code:{

};{}]





<!------------------------------------------------------------------>
<!-----------------------------LEVEL 3------------------------------>
<!------------------------------------------------------------------>
[r,if(level==3),code:{

};{}]





<!------------------------------------------------------------------>
<!-----------------------------LEVEL 4------------------------------>
<!------------------------------------------------------------------>
[r,if(level==4),code:{

<!--------------ABILITY SCORE IMPROVEMENT OR FEAT------------------->
	[macro("character-creation/Ability Score Improvement@this"):"tokenName="+tokenName]

};{}]


<!------------------------------------------------------------------>
<!-----------------------------LEVEL 5------------------------------>
<!------------------------------------------------------------------>
[r,if(level==5),code:{

};{}]


<!------------------------------------------------------------------>
<!-----------------------------LEVEL 6------------------------------>
<!------------------------------------------------------------------>
[r,if(level==6),code:{

};{}]


<!------------------------------------------------------------------>
<!-----------------------------LEVEL 7------------------------------>
<!------------------------------------------------------------------>
[r,if(level==7),code:{



};{}]


<!------------------------------------------------------------------>
<!-----------------------------LEVEL 8------------------------------>
<!------------------------------------------------------------------>
[r,if(level==8),code:{

<!--------------ABILITY SCORE IMPROVEMENT OR FEAT------------------->
	[macro("character-creation/Ability Score Improvement@this"):"tokenName="+tokenName]

};{}]


<!------------------------------------------------------------------>
<!-----------------------------LEVEL 9------------------------------>
<!------------------------------------------------------------------>
[r,if(level==9),code:{

};{}]

<!------------------------------------------------------------------>
<!-----------------------------LEVEL 10----------------------------->
<!------------------------------------------------------------------>
[r,if(level==10),code:{

};{}]

<!------------------------------------------------------------------>
<!-----------------------------LEVEL 11----------------------------->
<!------------------------------------------------------------------>
[r,if(level==11),code:{

	
};{}]


<!------------------------------------------------------------------>
<!-----------------------------LEVEL 12----------------------------->
<!------------------------------------------------------------------>
[r,if(level==12),code:{

<!--------------ABILITY SCORE IMPROVEMENT OR FEAT------------------->
	[macro("character-creation/Ability Score Improvement@this"):"tokenName="+tokenName]

};{}]

<!------------------------------------------------------------------>
<!-----------------------------LEVEL 13----------------------------->
<!------------------------------------------------------------------>
[r,if(level==13),code:{

};{}]

<!------------------------------------------------------------------>
<!-----------------------------LEVEL 14----------------------------->
<!------------------------------------------------------------------>
[r,if(level==14),code:{


};{}]

<!------------------------------------------------------------------>
<!-----------------------------LEVEL 15----------------------------->
<!------------------------------------------------------------------>
[r,if(level==15),code:{


};{}]


<!------------------------------------------------------------------>
<!-----------------------------LEVEL 16----------------------------->
<!------------------------------------------------------------------>
[r,if(level==16),code:{

<!--------------ABILITY SCORE IMPROVEMENT OR FEAT------------------->
	[macro("character-creation/Ability Score Improvement@this"):"tokenName="+tokenName]

};{}]


<!------------------------------------------------------------------>
<!-----------------------------LEVEL 17----------------------------->
<!------------------------------------------------------------------>
[r,if(level==17),code:{


};{}]

<!------------------------------------------------------------------>
<!-----------------------------LEVEL 18----------------------------->
<!------------------------------------------------------------------>
[r,if(level==18),code:{

};{}]


<!------------------------------------------------------------------>
<!-----------------------------LEVEL 19----------------------------->
<!------------------------------------------------------------------>
[r,if(level==19),code:{

<!--------------ABILITY SCORE IMPROVEMENT OR FEAT------------------->
	[macro("character-creation/Ability Score Improvement@this"):"tokenName="+tokenName]

};{}]


<!------------------------------------------------------------------>
<!-----------------------------LEVEL 20----------------------------->
<!------------------------------------------------------------------>
[r,if(level==20),code:{

};{}]


<!------------------------------------------------------------------>
<!-----------------------------FIX CASE----------------------------->
<!------------------------------------------------------------------>
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