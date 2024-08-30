[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:value=getStrProp(macro.args,"value")]

[h:SkillObject=getLibProperty("Skills","Lib:"+tokenName)]
[h:SaveObject=getLibProperty("SavingTrows","Lib:"+tokenName)]

[h:object=json.get(if(value=="Skill",SkillObject,SaveObject),0)]
[h:other=json.get(object,"other")]
[h:half=json.get(object,"half")]

[h:res=input("var|Global Skill Modifiers||Label|span=true",
"bonus|"+other+"|Bonus|text|width=7",
if(value=="Skill","half|none,round down (jack of all trades),round up (remarkable athlete)|Half Proficiency|radio|span=true select="+half
,""))]
[h:abort(res)]

[h:fields=json.fields(if(value=="Skill",SkillObject,SaveObject))]

[h,count(listcount(fields)),code:{



	[h,if(value=="Skill"):object=json.get(SkillObject,roll.count);object=json.get(SaveObject,roll.count)]
	[h:object=json.set(object,"other",bonus)]
	[h,if(value=="Skill"):object=json.set(object,"half",half)]
	[h,if(value=="Skill"):SkillObject=json.set(SkillObject,roll.count,object);SaveObject=json.set(SaveObject,roll.count,object)]

}]

[h:res=input("var|<html>Warning!<br>This action will override current "+if(value=="Skill","Skill","Saving Throws")+" values for bonuses"+if(value=="Skill"," and half proficiencies","")+".<br>This will not change proficiency"+if(value=="Skill"," and expertise","")+".<br>Continue?</html>||Label|span=true")]
[h:abort(res)]

[h:setLibProperty(if(value=="Skill","Skills","SavingTrows"),if(value=="Skill",SkillObject,SaveObject),"Lib:"+tokenName)]

[h,if(isFrameVisible(tokenName+" - Character Sheet")==1),code:{
[macro("character/Macro Frame@this"):"macro=Character Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Statblock")==1),code:{
[macro("character/Macro Frame@this"):"macro=Statblock;tokenName="+tokenName]
};{}]