[h:tokenName=macro.args]
[h:id=findToken(tokenName)]
[h:switchToken(id)]


<!-----------------Race------------------->
[h:setProperty("Race","value=High Elf;text=")]

<!-----------------Dexterity------------------->
[h:atr=getProperty("Dexterity")]
[h:value=getStrProp(atr,"value")]

[h:value=if(value=="",0,value)]

[h:atr=setStrProp(atr,"value",string(value+"+2"))]
[h:atr=setStrProp(atr,"text","+2 racial")]

[h:setProperty("Dexterity",atr)]

<!-----------------Intelligence------------------->
[h:atr=getProperty("Intelligence")]
[h:value=getStrProp(atr,"value")]

[h:value=if(value=="",0,value)]

[h:atr=setStrProp(atr,"value",string(value+"+1"))]
[h:atr=setStrProp(atr,"text","+1 racial")]

[h:setProperty("Intelligence",atr)]

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
[h:skillAvailable=skillList]
[h:characterSkills=getProperty("Skills")]
[h:fields=json.fields(characterSkills)]
[h,count(listcount(fields),""),code:{

	[h:currentSkill=json.get(characterSkills,roll.count)]
	[h:currentName=json.get(currentSkill,"name")]
	[h:currentProf=json.get(currentSkill,"prof")]

	[h,if(currentProf>0):skillAvailable=listdelete(skillAvailable,listfind(skillAvailable,currentName))]

}]

[h:skill1="Perception"]

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



<!-----------------Speed------------------->
[h:atr=getProperty("Speed")]
[h:value=getStrProp(atr,"value")]

[h:atr=setStrProp(atr,"value","30 ft.")]

[h:setProperty("Speed",atr)]

<!-----------------Size------------------->
[h:setSize("Medium")]
<!-----------------Sight------------------->
[h:setSightType("Darkvision")]

<!-----------------Languages------------------->
[h:atr=getProperty("Language Proficiency")]
[h:value=getStrProp(atr,"value")]

[h:languages=getLibProperty("Languages", function.getNamespace())]

[h:language1="Common"]
[h:language2="Elvish"]
[h:languages=listdelete(languages,listfind(languages,language1))]
[h:languages=listdelete(languages,listfind(languages,language2))]

[h,count(listcount(value),""),code:{
	[h:item=listget(value,roll.count)]
	[h:itemFind=listfind(languages,item)]
	[h,if(itemFind==-1):"";languages=listdelete(languages,listfind(languages,item))]
}]

[h:res=input("lang|Languages||label|span=true",
"language1|"+language1+"|Language 1|label",
"language2|"+language2+"|Language 2|label",
"language3|Choose one,"+languages+"|Language 3|list|value=string")]
[h:abort(res)]

[h,if(listfind(value,language1)==-1):value=listappend(value,language1)]
[h,if(listfind(value,language2)==-1):value=listappend(value,language2)]
[h,if(listfind(value,language3)==-1):value=listappend(value,language3)]

[h:atr=setStrProp(atr,"value",value)]

[h:setProperty("Language Proficiency",atr)]


<!-----------------Weapons------------------->
[h:atr=getProperty("Weapon Proficiency")]
[h:value=getStrProp(atr,"value")]

[h:Weapons="longsword,shortsword,shortbow,longbow"]

[h,count(listcount(Weapons),""),code:{
	[h:CurrentItem=listget(Weapons,roll.count)]
	[h,if(listfind(value,CurrentItem)==-1):value=listappend(value,CurrentItem)]
}]

[h:atr=setStrProp(atr,"value",value)]
[h:setProperty("Weapon Proficiency",atr)]

<!-----------------Spells------------------->
[h:group="Level 0"]
[h:spellobj=getLibProperty("Wizard", function.getNamespace())]
[h:spellobj=json.get(spellobj,group)]
[h:spellList=json.toList(spellobj)]

[h:inputList=getLibProperty(group,"Lib:Compendium")]
[h:inputList=json.fields(inputList)]
[h:inputList=listSort(inputList,"N")]
[h:Property=getProperty("Spells")]

[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]

[h:value=json.fields(currentList)]
[h,count(listcount(value),""),code:{
	[h:item=listget(value,roll.count)]
	[h:itemFind=listfind(spellList,item)]
	[h,if(itemFind==-1):"";spellList=listdelete(spellList,listfind(spellList,item))]
}]


[h:res=input("var|Choose one from Wizard Spells||label|span=true",
"spell1|"+spellList+"|Cantrip|list|value=string")]
[h:abort(res)]

[h:Property=json.set(Property,spell1,json.fromStrProp("level=0;prep=1;source=Race;customAtr=Intelligence"))]


[h:setProperty("Spells",Property)]




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

