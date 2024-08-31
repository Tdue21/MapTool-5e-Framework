[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:subclass=getStrProp(macro.args,"subclass")]
[h:class=getStrProp(macro.args,"class")]

[h:id=findToken(tokenName)]
[h:switchToken(id)]

[h:classes=getLibProperty("Classes", function.getNamespace())]

[h:AllClassObj=json.get(classes,class)]


[h:level=""]

[h:ClassObj=getProperty("Class&Level")]
[h,if(json.type(ClassObj)=="UNKNOWN" || json.fields(ClassObj)==""),code:{};{

	[h:classList=json.fields(ClassObj)]
	[h:match=listFind(classList,class)]
	[h:currentClassObj=json.get(ClassObj,class)]
	[h,if(json.type(currentClassObj)=="UNKNOWN"):level=0;level=json.get(currentClassObj,"level")]
	[h,if(json.type(currentClassObj)=="UNKNOWN"):subclass=0;subclass=json.get(currentClassObj,"subclass")]

}]

<!-----------------LEVEL 3------------------->
[r,if(level==3),code:{

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

};{}]

<!-----------------LEVEL 6------------------->
[r,if(level==6),code:{


};{}]



<!-----------------LEVEL 14------------------->
[r,if(level==14),code:{


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

