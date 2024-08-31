[h:id=getStrProp(macro.args,"id")]
[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:index=getStrProp(macro.args,"index")]

[h,if(id==""):"";switchToken(id)]

[h:saveObject=getLibProperty("SavingTrows","Lib:"+tokenName)]
[h:object=json.get(saveObject,index)]

[h:name=json.get(object,"name")]
[h:prof=json.get(object,"prof")]
[h:other=json.get(object,"other")]

[h:res=input("label|"+name+"||label|span=true",
"prof|-,Proficient,Expert|Proficiency|list|select="+prof,
"bonus|"+other+"|Bonus|text|width=7")]
[h:abort(res)]

[h:bonus=if(bonus=="",0,bonus)]
[h,if(isNumber(bonus)==0),code:{
	[h:input("label|Bonus must be a number||label|span=true")]
	[h:abort(0)]
};{}]


[h:object=json.set(object,"prof",prof)]
[h:object=json.set(object,"other",bonus)]


[h:saveObject=json.set(saveObject,index,object)]
[h:setLibProperty("SavingTrows",saveObject,"Lib:"+tokenName)]

[h,if(isFrameVisible(tokenName+" - Character Sheet")==1),code:{
[macro("character/Macro Frame@this"):"macro=Character Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Statblock")==1),code:{
[macro("character/Macro Frame@this"):"macro=Statblock;tokenName="+tokenName]
};{}]
