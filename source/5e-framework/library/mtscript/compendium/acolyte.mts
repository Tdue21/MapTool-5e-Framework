[h:tokenName=macro.args]
[h:id=findToken(tokenName)]
[h:switchToken(id)]


<!-----------------Background------------------->
[h:atr=setStrProp("","value","Acolyte")]
[h:setProperty("Background",atr)]


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

[h:skill="Insight,Religion"]

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


<!-----------------Languages------------------->
[h:atr=getProperty("Language Proficiency")]
[h:value=getStrProp(atr,"value")]

[h:languages=getLibProperty("Languages","Lib:Character Creation")]

[h,count(listcount(value),""),code:{
	[h:item=listget(value,roll.count)]
	[h:itemFind=listfind(languages,item)]
	[h,if(itemFind==-1):"";languages=listdelete(languages,listfind(languages,item))]
}]

[h:res=input("lang|Languages||label|span=true",
"language1|Choose one,"+languages+"|Language 1|list|value=string",
"language2|Choose one,"+languages+"|Language 2|list|value=string")]
[h:abort(res)]

[h,if(listfind(value,language1)==-1):value=listappend(value,language1)]
[h,if(listfind(value,language2)==-1):value=listappend(value,language2)]

[h:atr=setStrProp(atr,"value",value)]

[h:setProperty("Language Proficiency",atr)]

<!-----------------Equipment------------------->

[h:group="Equipment"]
[h:inputList=getLibProperty(group,"Lib:Character")]
[h:inputList=json.fields(inputList)]
[h:inputList=listSort(inputList,"N")]
[h:Property=getProperty(group)]

[h,if(json.type(Property)=="UNKNOWN"):Property="{}";""]

[h:AddItem="character Creation/Add Item@this"]

[h:res=input("lang|Background Equipment||label|span=true",
"holy|Amulet,Emblem,Reliquary|Holy Symbol|list|value=string",
"book|Prayer Book,Prayer Wheel|Prayer Equipment|list|value=string")]
[h:abort(res)]

[macro(AddItem):"tokenName="+tokenName+";item="+holy+";Quantity=1;customName="]
[macro(AddItem):"tokenName="+tokenName+";item=Book;Quantity=1;customName="+book]
[macro(AddItem):"tokenName="+tokenName+";item=Stick of Incense;Quantity=5;customName="]
[macro(AddItem):"tokenName="+tokenName+";item=Vestments;Quantity=1;customName="]
[macro(AddItem):"tokenName="+tokenName+";item=Common Clothes;Quantity=1;customName="]
[macro(AddItem):"tokenName="+tokenName+";item=Pouch;Quantity=1;customName="]

<!-----------------Currency------------------->
[h:currentmoney=getProperty("Currency")]
[h:gp=getStrProp(currentmoney,"GP")]
[h:gp=if(gp=="",0,gp)]
[h:currentmoney=setStrProp(currentmoney,"GP",gp+15)]
[h:setProperty("Currency",currentmoney)]



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
[h:macro.return=""]
