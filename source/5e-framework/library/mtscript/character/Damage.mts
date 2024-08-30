[h:current=getStrProp(macro.args,"current")]
[h:total=getStrProp(macro.args,"total")]
[h:temp=getStrProp(macro.args,"temp")]

[h:tokenName=getStrProp(macro.args,"tokenName")]

[h:id=findToken(tokenName)]
[h,if(id==""):"";switchToken(id)]

[h:attributeList=getLibProperty("Attributes", "Lib:Character")]
[h:AtrProps=""]
[h,count(listcount(attributeList),""),code:{
	[h:attribute=listget(attributeList,roll.count)]
	[h:value=getLibProperty(attribute,"Lib:"+tokenName)]
	[h:value=getStrProp(value,"value")]
	[h:value=if(value=="",0,value)]
	[h,if(isNumber(value)==0):value=eval(value);value]
	[h:mod=floor(number(eval(string(value)))/2-5)]
	[h:AtrProps=setStrProp(AtrProps,substring(lower(attribute),0,3),mod)]
}]
[h:varsFromStrProp(AtrProps)]

[h:res=input(
"label|<html><table width=150><tr><td align=center><h3>Hit Points</h3><hr noshade>||label|span=true",
"dmg||Damage|text|width=6",
"heal||Heal|text|width=6",
"label|<html><table width=150><tr><td align=center><hr noshade>||label|span=true",
"tempInput|"+temp+"|Temporary|text|width=6",
"label|<html><table width=150><tr><td align=center><hr noshade>||label|span=true",
"currentInput|"+current+"|Current|text|width=6",
"maxInput|"+total+"|Total|text|width=6")]
[h:abort(res)]
[h,if(maxInput==0):abort(0)]


[h,if(isNumber(tempInput)==1):"";tempInput=eval(tempInput)]
[h,if(isNumber(currentInput)==1):"";currentInput=eval(currentInput)]
[h,if(isNumber(maxInput)==1):"";maxInput=eval(maxInput)]



[h:NoInput=if(currentInput==current && maxInput==total && tempInput==temp && dmg==0 && heal==0,0,1)]
[h:abort(NoInput)]

[h:tempInput=tempInput-dmg]

[h:effectiveDmg=if(tempInput>0,0,tempInput)]

[h:currentInput=if(tempInput<0,currentInput+tempInput,currentInput)]

[h:currentInput=currentInput+heal]

[h:effectiveDmg=effectiveDmg+heal]

[h:tempInput=if(tempInput<0,0,tempInput)]

[h:currentInput=if(currentInput<0,0,currentInput)]
[h:currentInput=if(currentInput>maxInput,maxInput,currentInput)]

[r:if(effectiveDmg<0,"<font color=red><b>"+tokenName+"</b> received <b>"+number(effectiveDmg*-1)+"</b> damage",if(effectiveDmg==0,"<b>"+tokenName+"</b>","<font color=green><b>"+tokenName+"</b> recovered <b>"+effectiveDmg+"</b> HP"))]
<br>
Current HP: <b>[r:currentInput]</b>/<b>[r:maxInput]</b> [r:if(tempInput==0,"","(<b>"+tempInput+"</b>)")]



[macro("character/HP Bar@this"):"MaxLen=65;MaxValue="+maxInput+";Value="+currentInput+";Color=Green"]

[h,if(id==""):concentration=0;concentration=getState("Concentration")]

[r,if(concentration==1 && effectiveDmg<0):"<font size=2>Concentration DC: <font color=red><b>"+if(floor(number((effectiveDmg*-1)/2))>10,floor(number((effectiveDmg*-1)/2)),10)+"</b> <font color=gray style='text-decoration:none'>"+macrolink("[roll con]", "character/Maintain Concentration@this")"","tokenName="+tokenName+";dmg="+number(effectiveDmg*-1))+"</font>";""]



[h,if(id==""),code:{};{
	[h:setBar("Health", currentInput/maxInput)]
	[h,if(currentInput==maxInput):setBarVisible("Health",0),setBarVisible("Health",1)]
}]

[h:setLibProperty("Current Hit Points",currentInput,"Lib:"+tokenName)]

[h:setLibProperty("Temporary Hit Points",tempInput,"Lib:"+tokenName)]

[h:setLibProperty("Total Hit Points",maxInput,"Lib:"+tokenName)]


[h,if(id==""):"";setProperty("HP",currentInput+"/"+maxInput+if(tempInput<0," ("+tempInput+")",""))]
[h:setLibProperty("HP",currentInput+"/"+maxInput+if(tempInput<0," ("+tempInput+")",""),"Lib:"+tokenName)]


[h,if(isFrameVisible(tokenName+" - Character Sheet")==1),code:{
[macro("character/Macro Frame@this"):"macro=Character Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Statblock")==1),code:{
[macro("character/Macro Frame@this"):"macro=Statblock;tokenName="+tokenName]
};{}]
[h,if(isDialogVisible("Manage")==1),code:{
[h:pinName=getStrProp(macro.args,"pinName")]
[macro("character/Manage Party@this"):"tokenName="+pinName]
};{}]

[h,if(isOverlayRegistered("Initiative")==1),code:{
[macro("overlay/Initiative Overlay@this"):"output=all"]
};{}]