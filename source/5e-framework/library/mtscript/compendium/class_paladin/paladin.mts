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



[h,if(listcount(classList)==1 && level==1),code:{


<!-----------------Set Skills if empty------------------->
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
<!-----------------Skill------------------->



[h:attributeList=getLibProperty("Skills", function.getNamespace())]
[h:repeat=countStrProp(attributeList)]
[h:skillList=""]
[h,count(repeat,""),code:{
	[h:skillList=listappend(skillList,indexKeyStrProp(attributeList,roll.count))]
}]
[h:skillAvailable="Athletics,Insight,Intimidation,Medicine,Persuasion,Religion"]

[h:characterSkills=getProperty("Skills")]
[h:fields=json.fields(characterSkills)]
[h,count(listcount(fields),""),code:{

	[h:currentSkill=json.get(characterSkills,roll.count)]
	[h:currentName=json.get(currentSkill,"name")]
	[h:currentProf=json.get(currentSkill,"prof")]

	[h,if(currentProf>0):skillAvailable=listdelete(skillAvailable,listfind(skillAvailable,currentName))]

}]


[h:res=input("var|Choose two skills||label|span=true",
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
		[h:chosenskill=json.set(chosenskill,"prof",if(value>1,value,1))]
		[h:skills=json.set(skills,index,chosenskill)]
	
	}]
	[h:setProperty("Skills",skills)]

<!-----------------Set Saves if empty------------------->
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
<!-----------------Saves------------------->

[h:SaveObject=getProperty("SavingTrows")]
[h:repeat=listcount(json.fields(SaveObject))]
[h,count(repeat,""),code:{

	[h:currentSave=json.get(SaveObject,roll.count)]
	[h:SaveName=json.get(currentSave,"name")]
	[h:SaveProf=json.get(currentSave,"prof")]
	[h,if(saveName=="Wisdom" || saveName=="Charisma"):currentSave=json.set(currentSave,"prof",if(SaveProf==0,1,SaveProf))]
	[h:SaveObject=json.set(SaveObject,roll.count,currentSave)]

}]
[h:setProperty("SavingTrows",SaveObject)]



<!-----------------Armor------------------->
[h:atr=getProperty("Armor Proficiency")]
[h:value=getStrProp(atr,"value")]

[h:Armors="light armor,medium armor,heavy armor,shields"]

[h,count(listcount(Armors),""),code:{
	[h:CurrentItem=listget(Armors,roll.count)]
	[h,if(listfind(value,CurrentItem)==-1):value=listappend(value,CurrentItem)]
}]

[h:atr=setStrProp(atr,"value",value)]
[h:setProperty("Armor Proficiency",atr)]

<!-----------------Weapons------------------->
[h:atr=getProperty("Weapon Proficiency")]
[h:value=getStrProp(atr,"value")]

[h:Weapons="simple weapons,martial weapons"]

[h,count(listcount(Weapons),""),code:{
	[h:CurrentItem=listget(Weapons,roll.count)]
	[h,if(listfind(value,CurrentItem)==-1):value=listappend(value,CurrentItem)]
}]

[h:atr=setStrProp(atr,"value",value)]
[h:setProperty("Weapon Proficiency",atr)]


<!-----------------Resources------------------->
[h:resourcesObj=getProperty("Resources")]
[h,if(json.type(resourcesObj)=="UNKNOWN"):resourcesObj="{}";""]

[h:chaValue=getStrProp(getProperty("Charisma"),"value")]
[h,if(chaValue==""):"";chaValue=eval(string(chaValue))]
[h,if(isNumber(chaValue)==1):chaMod=floor(chaValue/2-5);chaMod=-5]

[h:resourcesObj=json.set(resourcesObj,"divine sense",json.fromStrProp("value=0;total="+number(1+chaMod)+";reset=1"))]
[h:resourcesObj=json.set(resourcesObj,"lay on hands",json.fromStrProp("value=0;total=5;reset=1"))]

[h:setProperty("Resources",resourcesObj)]


};{}]

<!-----------------Equipment------------------->
[r,if(Equip=="Starting Equipment"),code:{


	[h:group="Equipment"]
	[h:inputList=getLibProperty(group,function.getNamespace())]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):Property="{}";""]
	
	[h:res=input("var|Starting Equipment||label|span=true",
	"weapon1|Martial Weapon and Shield,2 Martial Weapons|Weapon 1|list",
	"weapon2|5 Javelins,Simple Melee Weapon|Secondary Weapon|list",
	"pack|Priest's Pack,Explorer's Pack|Pack|list",
	"offhand|Amulet,Emblem,Reliquary|Holy Symbol|list",
	"shield|Shield|Offhand|label")]
	[h:abort(res)]

	[h:AddItem="character-creation/Add Item@this"]

	[h:smw=getLibProperty("Simple Melee Weapons", function.getNamespace())]
	[h:mmw=getLibProperty("Martial Melee Weapons", function.getNamespace())]
	[h:srw=getLibProperty("Simple Ranged Weapons", function.getNamespace())]
	[h:mrw=getLibProperty("Martial Ranged Weapons", function.getNamespace())]

	[h,if(weapon1==0),code:{
		[h:input("var|Choose one||label|span=true",
		"w1|"+mmw+","+mrw+"|Martial Weapon|list|value=string")]
		[h:abort(res)]
		[macro(AddItem):"tokenName="+tokenName+";item="+w1+";Quantity=1;customName="]
		[macro(AddItem):"tokenName="+tokenName+";item=Shield;Quantity=1;customName="]
	}]
	[h,if(weapon1==1),code:{
		[h:input("var|Choose one||label|span=true",
		"w1|"+mmw+","+mrw+"|Martial Weapon 1|list|value=string",
		"w2|"+mmw+","+mrw+"|Martial Weapon 2|list|value=string")]
		[h:abort(res)]
		[macro(AddItem):"tokenName="+tokenName+";item="+w1+";Quantity=1;customName="]
		[macro(AddItem):"tokenName="+tokenName+";item="+w2+";Quantity=1;customName="]
	}]

	[h,if(weapon2==0),code:{
		[macro(AddItem):"tokenName="+tokenName+";item=Javelin;Quantity=5;customName="]
	}]
	[h,if(weapon2==1),code:{
		[h:input("var|Choose one||label|span=true",
		"w1|"+smw+"|Simple Melee Weapon|list|value=string")]
		[h:abort(res)]
		[macro(AddItem):"tokenName="+tokenName+";item="+w1+";Quantity=1;customName="]
	}]

	[h,if(pack==0),code:{
		[macro(AddItem):"tokenName="+tokenName+";item=Backpack;Quantity=1;customName="]
		[macro(AddItem):"tokenName="+tokenName+";item=Blanket;Quantity=1;customName="]
		[macro(AddItem):"tokenName="+tokenName+";item=Candle;Quantity=10;customName="]
		[macro(AddItem):"tokenName="+tokenName+";item=Tinderbox;Quantity=1;customName="]
		[macro(AddItem):"tokenName="+tokenName+";item=Alms Box;Quantity=1;customName="]
		[macro(AddItem):"tokenName="+tokenName+";item=Block of Incense;Quantity=2;customName="]
		[macro(AddItem):"tokenName="+tokenName+";item=Censer;Quantity=1;customName="]
		[macro(AddItem):"tokenName="+tokenName+";item=Vestments;Quantity=1;customName="]
		[macro(AddItem):"tokenName="+tokenName+";item=Rations (1 day);Quantity=2;customName="]
		[macro(AddItem):"tokenName="+tokenName+";item=Waterskin;Quantity=1;customName="]
	}]
	[h,if(pack==1),code:{
		[macro(AddItem):"tokenName="+tokenName+";item=Backpack;Quantity=1;customName="]
		[macro(AddItem):"tokenName="+tokenName+";item=Bedroll;Quantity=1;customName="]
		[macro(AddItem):"tokenName="+tokenName+";item=Mess Kit;Quantity=1;customName="]
		[macro(AddItem):"tokenName="+tokenName+";item=Tinderbox;Quantity=1;customName="]
		[macro(AddItem):"tokenName="+tokenName+";item=Torch;Quantity=10;customName="]
		[macro(AddItem):"tokenName="+tokenName+";item=Hempen Rope (50 feet);Quantity=1;customName="]
		[macro(AddItem):"tokenName="+tokenName+";item=Rations (1 day);Quantity=10;customName="]
		[macro(AddItem):"tokenName="+tokenName+";item=Waterskin;Quantity=1;customName="]
	}]

	[macro(AddItem):"tokenName="+tokenName+";item=Chain Mail;Quantity=1;customName="]

	[h,if(offhand==0),code:{
		[macro(AddItem):"tokenName="+tokenName+";item=Amulet;Quantity=1;customName="]
	}]
	[h,if(offhand==1),code:{
		[macro(AddItem):"tokenName="+tokenName+";item=Emblem;Quantity=1;customName="]
	}]
	[h,if(offhand==2),code:{
		[macro(AddItem):"tokenName="+tokenName+";item=Reliquary;Quantity=1;customName="]
	}]


};{}]
	
	<!-----------------Currency------------------->
[r,if(Equip=="Starting Money"),code:{
[h:link=macroLinkText("character-creation/Starting Money@this","all","text="+tokenName+": Starting Money;value=5d4;tokenName="+tokenName+";multiplier=10")]

[h:execLink(link,0,"self")]

};{}]



<!-----------------LEVEL 1 (MULTICLASSING)------------------->
[r,if(level==1),code:{
	


<!-----------------Armor------------------->
[h:atr=getProperty("Armor Proficiency")]
[h:value=getStrProp(atr,"value")]

[h:Armors="light armor,medium armor,shields"]

[h,count(listcount(Armors),""),code:{
	[h:CurrentItem=listget(Armors,roll.count)]
	[h,if(listfind(value,CurrentItem)==-1):value=listappend(value,CurrentItem)]
}]

[h:atr=setStrProp(atr,"value",value)]
[h:setProperty("Armor Proficiency",atr)]

<!-----------------Weapons------------------->
[h:atr=getProperty("Weapon Proficiency")]
[h:value=getStrProp(atr,"value")]

[h:Weapons="simple weapons,martial weapons"]

[h,count(listcount(Weapons),""),code:{
	[h:CurrentItem=listget(Weapons,roll.count)]
	[h,if(listfind(value,CurrentItem)==-1):value=listappend(value,CurrentItem)]
}]

[h:atr=setStrProp(atr,"value",value)]
[h:setProperty("Weapon Proficiency",atr)]


<!-----------------Resources------------------->
[h:resourcesObj=getProperty("Resources")]
[h,if(json.type(resourcesObj)=="UNKNOWN"):resourcesObj="{}";""]

[h:chaValue=getStrProp(getProperty("Charisma"),"value")]
[h,if(chaValue==""):"";chaValue=eval(string(chaValue))]
[h,if(isNumber(chaValue)==1):chaMod=floor(chaValue/2-5);chaMod=-5]

[h:resourcesObj=json.set(resourcesObj,"divine sense",json.fromStrProp("value=0;total="+number(1+chaMod)+";reset=1"))]
[h:resourcesObj=json.set(resourcesObj,"lay on hands",json.fromStrProp("value=0;total=5;reset=1"))]

[h:setProperty("Resources",resourcesObj)]


};{}]






<!-----------------LEVEL 2------------------->
[r,if(level==2),code:{

	<!-----------------Resources------------------->
	[h:resourcesObj=getProperty("Resources")]
	[h,if(json.type(resourcesObj)=="UNKNOWN"):resourcesObj="{}";""]
	
	[h:chaValue=getStrProp(getProperty("Charisma"),"value")]
	[h,if(chaValue==""):"";chaValue=eval(string(chaValue))]
	[h,if(isNumber(chaValue)==1):chaMod=floor(chaValue/2-5);chaMod=-5]
	
	[h:resourcesObj=json.set(resourcesObj,"lay on hands",json.fromStrProp("value=0;total="+number(level*5)+";reset=1"))]
	
	[h:setProperty("Resources",resourcesObj)]

};{}]

<!-----------------LEVEL 3------------------->
[r,if(level==3),code:{

	<!-----------------Resources------------------->
	[h:resourcesObj=getProperty("Resources")]
	[h,if(json.type(resourcesObj)=="UNKNOWN"):resourcesObj="{}";""]
	
	[h:chaValue=getStrProp(getProperty("Charisma"),"value")]
	[h,if(chaValue==""):"";chaValue=eval(string(chaValue))]
	[h,if(isNumber(chaValue)==1):chaMod=floor(chaValue/2-5);chaMod=-5]
	
	[h:resourcesObj=json.set(resourcesObj,"lay on hands",json.fromStrProp("value=0;total="+number(level*5)+";reset=1"))]

};{}]



<!-----------------LEVEL 4------------------->
[r,if(level==4),code:{



	[macro("character-creation/Ability Score Improvement@this"):"tokenName="+tokenName]

	<!-----------------Resources------------------->
	[h:resourcesObj=getProperty("Resources")]
	[h,if(json.type(resourcesObj)=="UNKNOWN"):resourcesObj="{}";""]
	
	[h:chaValue=getStrProp(getProperty("Charisma"),"value")]
	[h,if(chaValue==""):"";chaValue=eval(string(chaValue))]
	[h,if(isNumber(chaValue)==1):chaMod=floor(chaValue/2-5);chaMod=-5]
	
	[h:resourcesObj=json.set(resourcesObj,"lay on hands",json.fromStrProp("value=0;total="+number(level*5)+";reset=1"))]


};{}]


<!-----------------LEVEL 5------------------->
[r,if(level==5),code:{


	<!-----------------Resources------------------->
	[h:resourcesObj=getProperty("Resources")]
	[h,if(json.type(resourcesObj)=="UNKNOWN"):resourcesObj="{}";""]
	
	[h:chaValue=getStrProp(getProperty("Charisma"),"value")]
	[h,if(chaValue==""):"";chaValue=eval(string(chaValue))]
	[h,if(isNumber(chaValue)==1):chaMod=floor(chaValue/2-5);chaMod=-5]
	
	[h:resourcesObj=json.set(resourcesObj,"lay on hands",json.fromStrProp("value=0;total="+number(level*5)+";reset=1"))]


};{}]


<!-----------------LEVEL 6------------------->
[r,if(level==6),code:{
	<!-----------------Resources------------------->
	[h:resourcesObj=getProperty("Resources")]
	[h,if(json.type(resourcesObj)=="UNKNOWN"):resourcesObj="{}";""]
	
	[h:chaValue=getStrProp(getProperty("Charisma"),"value")]
	[h,if(chaValue==""):"";chaValue=eval(string(chaValue))]
	[h,if(isNumber(chaValue)==1):chaMod=floor(chaValue/2-5);chaMod=-5]
	
	[h:resourcesObj=json.set(resourcesObj,"lay on hands",json.fromStrProp("value=0;total="+number(level*5)+";reset=1"))]


};{}]


<!-----------------LEVEL 7------------------->
[r,if(level==7),code:{

	<!-----------------Resources------------------->
	[h:resourcesObj=getProperty("Resources")]
	[h,if(json.type(resourcesObj)=="UNKNOWN"):resourcesObj="{}";""]
	
	[h:chaValue=getStrProp(getProperty("Charisma"),"value")]
	[h,if(chaValue==""):"";chaValue=eval(string(chaValue))]
	[h,if(isNumber(chaValue)==1):chaMod=floor(chaValue/2-5);chaMod=-5]
	
	[h:resourcesObj=json.set(resourcesObj,"lay on hands",json.fromStrProp("value=0;total="+number(level*5)+";reset=1"))]


};{}]

<!-----------------LEVEL 8------------------->
[r,if(level==8),code:{

	[macro("character-creation/Ability Score Improvement@this"):"tokenName="+tokenName]

	<!-----------------Resources------------------->
	[h:resourcesObj=getProperty("Resources")]
	[h,if(json.type(resourcesObj)=="UNKNOWN"):resourcesObj="{}";""]
	
	[h:chaValue=getStrProp(getProperty("Charisma"),"value")]
	[h,if(chaValue==""):"";chaValue=eval(string(chaValue))]
	[h,if(isNumber(chaValue)==1):chaMod=floor(chaValue/2-5);chaMod=-5]
	
	[h:resourcesObj=json.set(resourcesObj,"lay on hands",json.fromStrProp("value=0;total="+number(level*5)+";reset=1"))]


};{}]

<!-----------------LEVEL 9------------------->
[r,if(level==9),code:{
	<!-----------------Resources------------------->
	[h:resourcesObj=getProperty("Resources")]
	[h,if(json.type(resourcesObj)=="UNKNOWN"):resourcesObj="{}";""]
	
	[h:chaValue=getStrProp(getProperty("Charisma"),"value")]
	[h,if(chaValue==""):"";chaValue=eval(string(chaValue))]
	[h,if(isNumber(chaValue)==1):chaMod=floor(chaValue/2-5);chaMod=-5]
	
	[h:resourcesObj=json.set(resourcesObj,"lay on hands",json.fromStrProp("value=0;total="+number(level*5)+";reset=1"))]


};{}]

<!-----------------LEVEL 10------------------->
[r,if(level==10),code:{
 
	<!-----------------Resources------------------->
	[h:resourcesObj=getProperty("Resources")]
	[h,if(json.type(resourcesObj)=="UNKNOWN"):resourcesObj="{}";""]
	
	[h:chaValue=getStrProp(getProperty("Charisma"),"value")]
	[h,if(chaValue==""):"";chaValue=eval(string(chaValue))]
	[h,if(isNumber(chaValue)==1):chaMod=floor(chaValue/2-5);chaMod=-5]
	
	[h:resourcesObj=json.set(resourcesObj,"lay on hands",json.fromStrProp("value=0;total="+number(level*5)+";reset=1"))]


};{}]

<!-----------------LEVEL 11------------------->
[r,if(level==11),code:{
	
	<!-----------------Resources------------------->
	[h:resourcesObj=getProperty("Resources")]
	[h,if(json.type(resourcesObj)=="UNKNOWN"):resourcesObj="{}";""]
	
	[h:chaValue=getStrProp(getProperty("Charisma"),"value")]
	[h,if(chaValue==""):"";chaValue=eval(string(chaValue))]
	[h,if(isNumber(chaValue)==1):chaMod=floor(chaValue/2-5);chaMod=-5]
	
	[h:resourcesObj=json.set(resourcesObj,"lay on hands",json.fromStrProp("value=0;total="+number(level*5)+";reset=1"))]


};{}]

<!-----------------LEVEL 12------------------->
[r,if(level==12),code:{
	[macro("character-creation/Ability Score Improvement@this"):"tokenName="+tokenName]

	<!-----------------Resources------------------->
	[h:resourcesObj=getProperty("Resources")]
	[h,if(json.type(resourcesObj)=="UNKNOWN"):resourcesObj="{}";""]
	
	[h:chaValue=getStrProp(getProperty("Charisma"),"value")]
	[h,if(chaValue==""):"";chaValue=eval(string(chaValue))]
	[h,if(isNumber(chaValue)==1):chaMod=floor(chaValue/2-5);chaMod=-5]
	
	[h:resourcesObj=json.set(resourcesObj,"lay on hands",json.fromStrProp("value=0;total="+number(level*5)+";reset=1"))]


};{}]

<!-----------------LEVEL 13------------------->
[r,if(level==13),code:{

	<!-----------------Resources------------------->
	[h:resourcesObj=getProperty("Resources")]
	[h,if(json.type(resourcesObj)=="UNKNOWN"):resourcesObj="{}";""]
	
	[h:chaValue=getStrProp(getProperty("Charisma"),"value")]
	[h,if(chaValue==""):"";chaValue=eval(string(chaValue))]
	[h,if(isNumber(chaValue)==1):chaMod=floor(chaValue/2-5);chaMod=-5]
	
	[h:resourcesObj=json.set(resourcesObj,"lay on hands",json.fromStrProp("value=0;total="+number(level*5)+";reset=1"))]


};{}]

<!-----------------LEVEL 14------------------->
[r,if(level==14),code:{

	<!-----------------Resources------------------->
	[h:resourcesObj=getProperty("Resources")]
	[h,if(json.type(resourcesObj)=="UNKNOWN"):resourcesObj="{}";""]
	
	[h:chaValue=getStrProp(getProperty("Charisma"),"value")]
	[h,if(chaValue==""):"";chaValue=eval(string(chaValue))]
	[h,if(isNumber(chaValue)==1):chaMod=floor(chaValue/2-5);chaMod=-5]

	[h:resourcesObj=json.set(resourcesObj,"cleansing touch",json.fromStrProp("value=0;total="+chaMod+";reset=1"))]
	[h:resourcesObj=json.set(resourcesObj,"lay on hands",json.fromStrProp("value=0;total="+number(level*5)+";reset=1"))]


};{}]

<!-----------------LEVEL 15------------------->
[r,if(level==15),code:{
		<!-----------------Resources------------------->
	[h:resourcesObj=getProperty("Resources")]
	[h,if(json.type(resourcesObj)=="UNKNOWN"):resourcesObj="{}";""]
	
	[h:chaValue=getStrProp(getProperty("Charisma"),"value")]
	[h,if(chaValue==""):"";chaValue=eval(string(chaValue))]
	[h,if(isNumber(chaValue)==1):chaMod=floor(chaValue/2-5);chaMod=-5]
	
	[h:resourcesObj=json.set(resourcesObj,"lay on hands",json.fromStrProp("value=0;total="+number(level*5)+";reset=1"))]


};{}]

<!-----------------LEVEL 16------------------->
[r,if(level==16),code:{

	[macro("character-creation/Ability Score Improvement@this"):"tokenName="+tokenName]

	<!-----------------Resources------------------->
	[h:resourcesObj=getProperty("Resources")]
	[h,if(json.type(resourcesObj)=="UNKNOWN"):resourcesObj="{}";""]
	
	[h:chaValue=getStrProp(getProperty("Charisma"),"value")]
	[h,if(chaValue==""):"";chaValue=eval(string(chaValue))]
	[h,if(isNumber(chaValue)==1):chaMod=floor(chaValue/2-5);chaMod=-5]
	
	[h:resourcesObj=json.set(resourcesObj,"lay on hands",json.fromStrProp("value=0;total="+number(level*5)+";reset=1"))]


};{}]

<!-----------------LEVEL 17------------------->
[r,if(level==17),code:{

	<!-----------------Resources------------------->
	[h:resourcesObj=getProperty("Resources")]
	[h,if(json.type(resourcesObj)=="UNKNOWN"):resourcesObj="{}";""]
	
	[h:chaValue=getStrProp(getProperty("Charisma"),"value")]
	[h,if(chaValue==""):"";chaValue=eval(string(chaValue))]
	[h,if(isNumber(chaValue)==1):chaMod=floor(chaValue/2-5);chaMod=-5]
	
	[h:resourcesObj=json.set(resourcesObj,"lay on hands",json.fromStrProp("value=0;total="+number(level*5)+";reset=1"))]


};{}]

<!-----------------LEVEL 18------------------->
[r,if(level==18),code:{


	<!-----------------Resources------------------->
	[h:resourcesObj=getProperty("Resources")]
	[h,if(json.type(resourcesObj)=="UNKNOWN"):resourcesObj="{}";""]
	
	[h:chaValue=getStrProp(getProperty("Charisma"),"value")]
	[h,if(chaValue==""):"";chaValue=eval(string(chaValue))]
	[h,if(isNumber(chaValue)==1):chaMod=floor(chaValue/2-5);chaMod=-5]
	
	[h:resourcesObj=json.set(resourcesObj,"lay on hands",json.fromStrProp("value=0;total="+number(level*5)+";reset=1"))]


};{}]

<!-----------------LEVEL 19------------------->
[r,if(level==19),code:{

	[macro("character-creation/Ability Score Improvement@this"):"tokenName="+tokenName]

	<!-----------------Resources------------------->
	[h:resourcesObj=getProperty("Resources")]
	[h,if(json.type(resourcesObj)=="UNKNOWN"):resourcesObj="{}";""]
	
	[h:chaValue=getStrProp(getProperty("Charisma"),"value")]
	[h,if(chaValue==""):"";chaValue=eval(string(chaValue))]
	[h,if(isNumber(chaValue)==1):chaMod=floor(chaValue/2-5);chaMod=-5]
	
	[h:resourcesObj=json.set(resourcesObj,"lay on hands",json.fromStrProp("value=0;total="+number(level*5)+";reset=1"))]


};{}]


<!-----------------LEVEL 20------------------->
[r,if(level==20),code:{

	<!-----------------Resources------------------->
	[h:resourcesObj=getProperty("Resources")]
	[h,if(json.type(resourcesObj)=="UNKNOWN"):resourcesObj="{}";""]
	
	[h:chaValue=getStrProp(getProperty("Charisma"),"value")]
	[h,if(chaValue==""):"";chaValue=eval(string(chaValue))]
	[h,if(isNumber(chaValue)==1):chaMod=floor(chaValue/2-5);chaMod=-5]
	
	[h:resourcesObj=json.set(resourcesObj,"lay on hands",json.fromStrProp("value=0;total="+number(level*5)+";reset=1"))]


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

