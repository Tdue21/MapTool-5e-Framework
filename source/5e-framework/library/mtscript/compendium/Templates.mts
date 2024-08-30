<!------------------------------------------------------------------>
<!---------------------------ADD RESOURCES-------------------------->
<!------------------------------------------------------------------>
[h:resourceName="Bardic Inspiration"]

<!---FILL "usedAttibute" IF THE RESOURCE IS BASED ON AN ATTRIBUTE--->
[h:usedAttribute="Charisma"]

<!---------0 FOR SHORT REST, 1 FOR LONG REST, 2 FOR OTHER----------->
[h:reset=1]

<!------------------------------------------------------------------>
[h:resourcesObj=getProperty("Resources")]
[h,if(json.type(resourcesObj)=="UNKNOWN"):resourcesObj="{}";""]
[h:attribute=getProperty(usedAttribute)]
[h:atrValue=getStrProp(attribute,"value")]
[h,if(atrValue==""):atrValue=0;atrValue=eval(string(atrValue))]
[h:mod=floor(number(atrValue)/2)-5]
[h:mod=if(mod<1,1,mod)]
<!----------------------TOTAL NUMBER OR FORMULA--------------------->
<!--mod FOR ATTRIBUTE MODIFIER, level FOR CLASS LEVEL IN CURRENT CLASS-->
[h:total=mod]

[h:resourcesObj=json.set(resourcesObj,resourceName,json.fromStrProp("value=0;total="+total+";reset="+reset))]

[h:setProperty("Resources",resourcesObj)]
<!------------------------------------------------------------------>
<!-----------------------END OF RESOURCES--------------------------->
<!------------------------------------------------------------------>



<!------------------------------------------------------------------>
<!----------------------INCREASE ATTRIBUTE-------------------------->
<!------------------------------------------------------------------>
[h:increateAtt="Strength"]
[h:increaseValue=4]
[h:Description="+4 Primal Champion"]
<!------------------------------------------------------------------>
	[h:atr=getProperty(increateAtt)]
	[h:value=getStrProp(atr,"value")]
	[h:value=if(value=="",0,value)]
	[h:atr=setStrProp(atr,"value",string(value+"+"+Description))]
	[h:atr=setStrProp(atr,"text",Description)]
	[h:setProperty(increateAtt,atr)]
<!------------------------------------------------------------------>
<!-----------------END OF INCREASE ATTRIBUTE------------------------>
<!------------------------------------------------------------------>


<!------------------------------------------------------------------>
<!--------------ABILITY SCORE IMPROVEMENT OR FEAT------------------->
<!------------------------------------------------------------------>
[macro("character Creation/Ability Score Improvement@this"):"tokenName="+tokenName]



<!------------------------------------------------------------------>
<!---------------------------FEATURE-------------------------------->
<!------------------------------------------------------------------>
<!---------------------Feature Name or List------------------------->
[h:featureName="Rage"]

<!-------------0 for Feats, 1 for Additional Feats------------------>
[h:group=0]

<!---------Race:0, Class:1, Background:2, Feat:3, Other:4----------->
[h:Source=0]

<!------------------------------------------------------------------>
[h,if(group==0):group="Feats";group="AdditionalFeats"]
[h,switch(Source):case "0":Source="Race";case "1":Source="Class";case "2":Source="Background";case "3":Source="Feat";default:Source="Other"]
[h,if(listcount(featureName)==1):res=1;res=input("featureName|"+featureName+"|"+group+"|List|value=string")]
[h:abort(res)]
[h:Property=getProperty(group)]
[h:Property=json.set(Property,featureName,Source)]
[h:setProperty(group,Property)]
<!------------------------------------------------------------------>
<!--------------------------END OF FEATURE-------------------------->
<!------------------------------------------------------------------>



<!------------------------------SKILLS------------------------------>
<!--------------LIST OF SKILLS DELIMITED BY COMMAS------------------>
[h:skillAvailable="Animal Handling,Athletics,Intimidation,Nature,Perception,Survival"]
<!---------------NUMBER OF SKILLS TO CHOOSE FROM-------------------->
[h:skillChoices=2]
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