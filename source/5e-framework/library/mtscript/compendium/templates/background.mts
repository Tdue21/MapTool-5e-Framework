<!------------------------------------------------------------------>
<!--------------------------BACKGROUND NAME------------------------->
[h:BackgroundName="Acolyte"]
<!----Blank IF NO SPECIALTIES, LIST DELIMITED BY COMMAS OTHERWISE--->
[h:SpecialtyList=""]
<!-------------------------------SKILLS----------------------------->
[h:skill="Insight,Religion"]




[h:tokenName=macro.args]
[h:id=findToken(tokenName)]
[h:switchToken(id)]
[h:atr=setStrProp("","value",BackgroundName)]
[h:if(listcount(SpecialtyList)==0),code:{};{
	[h:res=input("Specialty|"+Specialty+"|Specialty|List|value=string")]
	[h:abort(res)]
}]
[h:atr=setStrProp("","text",Specialty)]
[h:setProperty("Background",atr)]
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




<!------------------------------------------------------------------>
<!-------------------PROFICIENCIES, FLAT VALUES--------------------->
<!------------------------------------------------------------------>

<!-----------------------------Tools-------------------------------->
[h:Tools=""]
<!----------------------------Languages----------------------------->
[h:Languages=""]
<!-----------------------------Other-------------------------------->
[h:Other=""]
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



<!------------------------------------------------------------------>
<!-------------------------TOOLS, CHOICES--------------------------->
<!------------------------------------------------------------------>
[h:toolChoiceList="Carpenter's Tools,Jeweler's Tools,Mason's Tools,Smith's Tools"]
<!------------------------------------------------------------------>
[h:atr=getProperty("Tool Proficiency")]
[h:value=getStrProp(atr,"value")]
[h,count(listcount(value),""),code:{
	[h:item=listget(value,roll.count)]
	[h:itemFind=listfind(toolChoiceList,item)]
	[h,if(itemFind==-1):"";toolChoiceList=listdelete(toolChoiceList,listfind(toolChoiceList,item))]
}]
[h,if(toolChoiceList==""),code:{};{
[h:res=input("var|Tool Proficiency||label|span=true",
"tool1|Choose one,"+languages+"|Choose 1|list|value=string")]
[h:abort(res)]
}]
[h,if(listfind(value,tool1)==-1):value=listappend(value,tool1)]


[h,if(toolChoiceList==""):"";atr=setStrProp(atr,"value",value)]

[h:setProperty("Tool Proficiency",atr)]
<!------------------------------------------------------------------>
<!-------------------------END OF TOOLS----------------------------->
<!------------------------------------------------------------------>



<!------------------------------------------------------------------>
<!----------------------LANGUAGES, CHOICES-------------------------->
<!------------------------------------------------------------------>
[h:languageChoices=2]
<!------------------------------------------------------------------>
[h:atr=getProperty("Language Proficiency")]
[h:value=getStrProp(atr,"value")]
[h:languages=getLibProperty("Languages", function.getNamespace())]
[h,count(listcount(value),""),code:{
	[h:item=listget(value,roll.count)]
	[h:itemFind=listfind(languages,item)]
	[h,if(itemFind==-1):"";languages=listdelete(languages,listfind(languages,item))]
}]
[h,if(languageChoices==0),code:{};{
[h:res=input("lang|Languages||label|span=true",
"language1|Choose one,"+languages+"|Language 1|list|value=string",
if(languageChoices>1,"language2|Choose one,"+languages+"|Language 2|list|value=string",if(languageChoices>2,"language3|Choose one,"+languages+"|Language 3|list|value=string","")))]
[h:abort(res)]
}]
[h,if(listfind(value,language1)==-1 && languageChoices>=1):value=listappend(value,language1)]
[h,if(listfind(value,language2)==-1 && languageChoices>=2):value=listappend(value,language2)]
[h,if(listfind(value,language3)==-1 && languageChoices>=3):value=listappend(value,language3)]

[h,if(languageChoices==0):"";atr=setStrProp(atr,"value",value)]

[h:setProperty("Language Proficiency",atr)]
<!------------------------------------------------------------------>
<!------------------------END OF LANGUAGES-------------------------->
<!------------------------------------------------------------------>



<!-----------------FEATURE------------------->
[h:BGs=getLibProperty("Backgrounds", function.getNamespace())]
[h:featureName=getStrProp(BGs,BackgroundName)]
[h:group="Feats"]
[h:inputList=getLibProperty(group,"Lib:Compendium")]
[h:inputList=json.fields(inputList)]
[h:inputList=listSort(inputList,"N")]
[h:Property=getProperty(group)]
[h:Property=json.set(Property,lower(BackgroundName),"Background")]
[h:Property=json.set(Property,lower(featureName),"Background")]
[h:setProperty(group,Property)]

<!------------------------------------------------------------------>
<!----------------------------EQUIPMENT----------------------------->
<!------------------------------------------------------------------>
[h:group="Equipment"]
[h:inputList=getLibProperty(group,function.getNamespace())]
[h:inputList=json.fields(inputList)]
[h:inputList=listSort(inputList,"N")]
[h:Property=getProperty(group)]

[h,if(json.type(Property)=="UNKNOWN"):Property="{}";""]

[h:AddItem="character-creation/Add Item@this"]

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
<!------------------------------------------------------------------>
<!-------------------------END OF EQUIPMENT------------------------->
<!------------------------------------------------------------------>


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
[h:macro.return=""]