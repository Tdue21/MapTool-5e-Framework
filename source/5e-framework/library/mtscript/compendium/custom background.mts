[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:name=getStrProp(macro.args,"name")]
[h,if(tokenName==""):tokenName=macro.args]
[h:id=findToken(tokenName)]
[h:switchToken(id)]

[h:attributeList=getLibProperty("Skills", function.getNamespace())]
[h:repeat=countStrProp(attributeList)]
[h:skillList=""]
[h,count(repeat,""),code:{
	[h:skillList=listappend(skillList,indexKeyStrProp(attributeList,roll.count))]
}]

[h,if(name==""):name="Background Name"]

[h:res=input("name|"+name+"|Background Name",
"skill1|-,"+skillList+"|Skill Proficiency 1|list|value=string",
"skill2|-,"+skillList+"|Skill Proficiency 2|list|value=string",
"languagesInput|0|Languages",
"tools|0|Tools",
"equipment|Common Clothes,Pouch|Equipment",
"gpInput|0|Gold Pieces")]
[h:abort(res)]

<!-----------------Background------------------->
[h:atr=setStrProp("","value",name)]
[h:setProperty("Background",atr)]


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

[h:skill=""]
[h,if(skill1=="-"):"";skill=listappend(skill,skill1)]
[h,if(skill2=="-"):"";skill=listappend(skill,skill2)]

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

[h:languages=getLibProperty("Languages", function.getNamespace())]

[h,count(listcount(value),""),code:{
	[h:item=listget(value,roll.count)]
	[h:itemFind=listfind(languages,item)]
	[h,if(itemFind==-1):"";languages=listdelete(languages,listfind(languages,item))]
}]



[h,if(languagesInput==0 || languagesInput==""):"";value=listappend(value,languagesInput)]


[h:atr=setStrProp(atr,"value",value)]

[h:setProperty("Language Proficiency",atr)]


<!-----------------Tools------------------->
[h:atr=getProperty("Tool Proficiency")]
[h:value=getStrProp(atr,"value")]



[h,if(tools==0 || tools==""):"";value=listappend(value,tools)]


[h:atr=setStrProp(atr,"value",value)]

[h:setProperty("Tool Proficiency",atr)]

<!-----------------Equipment------------------->

[h:group="Equipment"]
[h:inputList=getLibProperty(group,"Lib:Character")]
[h:inputList=json.fields(inputList)]
[h:inputList=listSort(inputList,"N")]
[h:Property=getProperty(group)]

[h,if(json.type(Property)=="UNKNOWN"):Property="{}";""]

[h:AddItem="character-creation/Add Item@this"]

[h,count(listcount(equipment)),code:{

	[h:currentItem=listget(equipment,roll.count)]
	[macro(AddItem):"tokenName="+tokenName+";item="+currentItem+";Quantity=1;customName="]

}]


<!-----------------Currency------------------->
[h:currentmoney=getProperty("Currency")]
[h:gp=getStrProp(currentmoney,"GP")]
[h:gp=if(gp=="",0,gp)]
[h:currentmoney=setStrProp(currentmoney,"GP",gp+gpInput)]
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
[h:macro.return=name]
