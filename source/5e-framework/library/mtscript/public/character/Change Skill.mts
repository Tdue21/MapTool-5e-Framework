[h:id=getStrProp(macro.args,"id")]
[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:skill=getStrProp(macro.args,"skill")]
[h:default=decode(getStrProp(macro.args,"default"))]
[h:attributeList=getStrProp(macro.args,"attributeList")]


[h,if(id==""):"";switchToken(id)]

[h:SkillObject=getLibProperty("Skills","Lib:"+tokenName)]

[h:object=json.get(SkillObject,skill)]

[h:name=json.get(object,"name")]
[h:prof=json.get(object,"prof")]
[h:attribute=json.get(object,"attribute")]
[h:other=json.get(object,"other")]
[h:half=json.get(object,"half")]

[h:default=getStrProp(default,name)]

[h:res=input("label|"+name+"||label|span=true",
"prof|-,Proficient,Expert|Proficiency|list|select="+prof,
"attribute|"+attributeList+"|Attribute|list|value=string select="+listfind(attributeList,default),
"bonus|"+other+"|Bonus|text|width=7",
"half|none,round down (jack of all trades),round up (remarkable athlete)|Half Proficiency|radio|span=true select="+half)]
[h:abort(res)]

[h:bonus=if(bonus=="",0,bonus)]
[h,if(isNumber(bonus)==0),code:{
	[h:input("label|Bonus must be a number||label|span=true")]
	[h:abort(0)]
};{}]


[h:object=json.set(object,"prof",prof)]
[h:object=json.set(object,"attribute",attribute)]
[h:object=json.set(object,"other",bonus)]
[h:object=json.set(object,"half",half)]

[h:SkillObject=json.set(SkillObject,skill,object)]
[h:setLibProperty("Skills",SkillObject,"Lib:"+tokenName)]

[h,if(isFrameVisible(tokenName+" - Character Sheet")==1),code:{
[macro("Macro Frame@Lib:Character"):"macro=Character Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Statblock")==1),code:{
[macro("Macro Frame@Lib:Character"):"macro=Statblock;tokenName="+tokenName]
};{}]