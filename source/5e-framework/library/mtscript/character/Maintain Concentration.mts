[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:dmg=getStrProp(macro.args,"dmg")]

[h:id=findToken(tokenName)]
[h,if(id==""):abort(0);switchToken(id)]

[h:SaveObject=getLibProperty("SavingTrows","Lib:"+tokenName)]

[h:object=json.get(SaveObject,2)]
[h:name=json.get(object,"name")]
[h:prof=json.get(object,"prof")]
[h:other=json.get(object,"other")]

[h:con=getLibProperty("Constitution","Lib:"+tokenName)]
[h:con=getStrProp(con,"value")]
[h:con=if(con=="",0,con)]
[h,if(isNumber(con)==0):con=eval(con);""]
[h:mod=if(isNumber(con)==0,0,con)]
[h:mod=floor(mod/2-5)]

[h:totalLevel=getLibProperty("TotalLevel","Lib:"+tokenName)]

[h,if(isNumber(totalLevel)==0):totalLevel=1]

[h:profBonus=ceil(totalLevel/4)+1]



[h:value=mod+(profBonus*prof)+other]

[macro("d20 Roller@Lib:Character"):"text=Constitution save;value=+"+if(value<0,value,"+"+value)+";id="+id+";tokenName="+tokenName+";color=ff9900")]