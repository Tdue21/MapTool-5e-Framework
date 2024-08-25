[h,if(macro.args==""):tokenName=token.name;tokenName=macro.args]
[h:Buffs=getLibProperty("Buffs","Lib:"+tokenName)]


[h,if(json.type(Buffs)=="UNKNOWN"),code:{

[h:Buffs="{}"]

};{}]


[h:LongBuff=""]
[h:ShortBuff=""]
[h:ConcentrationBuff=""]
[h:currentConcentration=""]
[h:fields=json.fields(Buffs)]
[h,count(listcount(fields)),code:{

[h:CurrentBuff=listget(fields,roll.count)]
[h:CurrentObject=json.get(Buffs,CurrentBuff)]
[h:duration=json.get(CurrentObject,"duration")]
[h:name=json.get(CurrentObject,"name")]
[h:unit=json.get(CurrentObject,"unit")]
[h:round=json.get(CurrentObject,"round")]
[h:roundEnd=round-getInitiativeRound()+if(unit=="round",duration,duration*10)]



[h,if(CurrentBuff=="concentration"),code:{

[h:BuffDescription=name+
if(unit=="minute"||unit=="round"," (ends in "+roundEnd+" Round"+if(roundEnd==1,")","s)"),""))]

[h:ConcentrationBuff=if(CurrentBuff=="concentration",listappend(ConcentrationBuff,BuffDescription),ConcentrationBuff)]

[h:currentConcentration=name]

};{

[h:BuffDescription=CurrentBuff+
if(unit=="minute"||unit=="round"," (ends in "+roundEnd+" Round"+if(roundEnd==1,")","s)"),""))]

[h:LongBuff=if(unit=="minute"||unit=="round",LongBuff,listappend(LongBuff,BuffDescription))]


[h:ShortBuff=if(unit=="minute"||unit=="round",listappend(ShortBuff,BuffDescription),ShortBuff)]

}]

}]

[h:LongBuff=if(LongBuff=="","-",LongBuff)]
[h:ShortBuff=if(ShortBuff=="","-",ShortBuff)]
[h:ConcentrationBuff=if(ConcentrationBuff=="","-",ConcentrationBuff)]
[h:fields=replace(fields,"concentration",currentConcentration)]

[h:res=input(
"All buffs | Buffs || TAB", 
"label|Long Duration:|label|label|span=true ## label|"+LongBuff+"|label|label|span=true ## label|Short Duration:|label|label|span=true ## label|"+ShortBuff+"|label|label|span=true ## label|Concentration:|label|label|span=true ## label|"+ConcentrationBuff+"|label|label|span=true",
"Create new buffs | New || TAB", 
"name ## duration ## unit|minute,round,other|Unit|list|value=string ## concentration|0|Concentration|Check",
"Remove buff | Remove || TAB", 
"remove|-,"+fields+"|Remove|list|value=string"
)]
[h:abort(res)]


[h,if(name=="0"),code:{};{







[h,if(concentration==1),code:{

[h:setState("Concentration",1)]
[h:setProperty("Concentration",name)]

[h:newBuff=json.fromStrProp("name="+name+";duration="+duration+";unit="+unit+";round="+getInitiativeRound())]
[h:Buffs=json.set(Buffs,"concentration",newBuff)]
	
};{

[h:newBuff=json.fromStrProp("duration="+duration+";unit="+unit+";round="+getInitiativeRound())]
[h:Buffs=json.set(Buffs,name,newBuff)]

}]





}]




[h,if(remove=="-"),code:{};{

[h:remove=if(remove==currentConcentration,"concentration",remove)]

[h,if(remove=="concentration"):setState("Concentration",0)]
[h,if(remove=="concentration"):setLibProperty("Concentration",0,"Lib:"+tokenName)]

[h:Buffs=json.remove(Buffs,remove)]

}]


[h:setLibProperty("Buffs",Buffs,"Lib:"+tokenName)]




[h,if(isFrameVisible(tokenName+" - Character Sheet")==1),code:{
[macro("Macro Frame@Lib:Character"):"macro=Character Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Statblock")==1),code:{
[macro("Macro Frame@Lib:Character"):"macro=Statblock;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName)==1),code:{
[macro("Macro Frame@Lib:Bestiary"):tokenName]
};{}]