<!----------------------------RACE NAME----------------------------->
[h:race="High Elf"]
<!------------------------------BONUS------------------------------->
[h:str=0]
[h:dex=0]
[h:con=0]
[h:int=0]
[h:wis=0]
[h:cha=0]
<!------------------------------SKILLS------------------------------>
<!--------------LIST OF SKILLS DELIMITED BY COMMAS------------------>
[h:skillAvailable="Perception"]
<!---------------NUMBER OF SKILLS TO CHOOSE FROM-------------------->
[h:skillChoices=1]
<!------------------------------SPEED------------------------------->
[h:speed="30 ft."]
[h:speedText=""]
<!-------------------------------SIZE------------------------------->
[h:size="Medium"]
<!--------SIGHT - Normal, Darkvision or Superior Darkvision--------->
[h:sight="Darkvision"]
<!------------------------------------------------------------------>


[h:tokenName=macro.args]
[h:id=findToken(tokenName)]
[h:switchToken(id)]
<!-----------------Strength------------------->
[h:atr=getProperty("Strength")]
[h:value=getStrProp(atr,"value")]
[h:value=if(value=="",0,value)]
[h:atr=setStrProp(atr,"value",string(value+"+"+str))]
[h:atr=setStrProp(atr,"text","+"+str+" racial")]
[h:setProperty("Strength",atr)]
<!-----------------Dexterity------------------->
[h:atr=getProperty("Dexterity")]
[h:value=getStrProp(atr,"value")]
[h:value=if(value=="",0,value)]
[h:atr=setStrProp(atr,"value",string(value+"+"+dex))]
[h:atr=setStrProp(atr,"text","+"+dex+" racial")]
[h:setProperty("Dexterity",atr)]
<!-----------------Constitution------------------->
[h:atr=getProperty("Constitution")]
[h:value=getStrProp(atr,"value")]
[h:value=if(value=="",0,value)]
[h:atr=setStrProp(atr,"value",string(value+"+"+con))]
[h:atr=setStrProp(atr,"text","+"+con+" racial")]
[h:setProperty("Constitution",atr)]
<!-----------------Intelligence------------------->
[h:atr=getProperty("Intelligence")]
[h:value=getStrProp(atr,"value")]
[h:value=if(value=="",0,value)]
[h:atr=setStrProp(atr,"value",string(value+"+"+int))]
[h:atr=setStrProp(atr,"text","+"+int+" racial")]
[h:setProperty("Intelligence",atr)]
<!-----------------Wisdom------------------->
[h:atr=getProperty("Wisdom")]
[h:value=getStrProp(atr,"value")]
[h:value=if(value=="",0,value)]
[h:atr=setStrProp(atr,"value",string(value+"+"+wis))]
[h:atr=setStrProp(atr,"text","+"+wis+" racial")]
[h:setProperty("Wisdom",atr)]
<!-----------------Charisma------------------->
[h:atr=getProperty("Charisma")]
[h:value=getStrProp(atr,"value")]
[h:value=if(value=="",0,value)]
[h:atr=setStrProp(atr,"value",string(value+"+"+cha))]
[h:atr=setStrProp(atr,"text","+"+cha+" racial")]
[h:setProperty("Charisma",atr)]



<!------------------------------------------------------------------>
<!-------------------------PROFICIENCIES---------------------------->
<!------------------------------------------------------------------>
<!------------------------------Armor------------------------------->
[h:Armors=""]
<!----------------------------Weapons------------------------------->
[h:Weapons="longsword,shortsword,shortbow,longbow"]
<!-----------------------------Tools-------------------------------->
[h:Tools=""]
<!----------------------------Languages----------------------------->
[h:Languages="Common, Elvish, One of your choice"]
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


<!------------------------------------------------------------------>
<!--------------------------SKILLS PROCESS-------------------------->
<!------------------------------------------------------------------>
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
	[h:attributeList=getLibProperty("Skills", "Lib:Character")]
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
<!------------------------------------------------------------------>
<!--------------------------END OF SKILLS--------------------------->
<!------------------------------------------------------------------>



<!-----------------Speed------------------->
[h:atr=getProperty("Speed")]
[h:value=getStrProp(atr,"value")]

[h:atr=setStrProp(atr,"value",speed)]
[h:atr=setStrProp(atr,"text",speedText)]

[h:setProperty("Speed",atr)]

<!-----------------Size------------------->
[h:setSize(size)]
<!-----------------Sight------------------->
[h:setSightType(sight)]





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