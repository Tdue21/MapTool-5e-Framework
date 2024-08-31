[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:totalHitDice=decode(getStrProp(macro.args,"totalHitDice"))]

[h:id=findToken(tokenName)]
[h,if(id==""):"";switchToken(id)]


[h:currentHitDice=getLibProperty("Hit Dice","Lib:"+tokenName)]

[h:cd4=getStrProp(currentHitDice,"d4")]
[h:cd6=getStrProp(currentHitDice,"d6")]
[h:cd8=getStrProp(currentHitDice,"d8")]
[h:cd10=getStrProp(currentHitDice,"d10")]
[h:cd12=getStrProp(currentHitDice,"d12")]
[h:cd20=getStrProp(currentHitDice,"d20")]

[h:td4=getStrProp(totalHitDice,"d4")]
[h:td6=getStrProp(totalHitDice,"d6")]
[h:td8=getStrProp(totalHitDice,"d8")]
[h:td10=getStrProp(totalHitDice,"d10")]
[h:td12=getStrProp(totalHitDice,"d12")]
[h:td20=getStrProp(totalHitDice,"d20")]



[h:res=input("var|Hit Dice||label|span=true",
	if(td4==""||td4==0,"","cd4|"+cd4+"|"+td4+"d4"),
	if(td6==""||td6==0,"","cd6|"+cd6+"|"+td6+"d6"),
	if(td8==""||td8==0,"","cd8|"+cd8+"|"+td8+"d8"),
	if(td10==""||td10==0,"","cd10|"+cd10+"|"+td10+"d10"),
	if(td12==""||td12==0,"","cd12|"+cd12+"|"+td12+"d12"),
	if(td20==""||td20==0,"","cd20|"+cd20+"|"+td20+"d20")
	)]
[h:abort(res)]

[h,if(isNumber(cd4)==1 || cd4==""):"";cd4=eval(cd4)]
[h,if(isNumber(cd6)==1 || cd6==""):"";cd6=eval(cd6)]
[h,if(isNumber(cd8)==1 || cd8==""):"";cd8=eval(cd8)]
[h,if(isNumber(cd10)==1 || cd10==""):"";cd10=eval(cd10)]
[h,if(isNumber(cd12)==1 || cd12==""):"";cd12=eval(cd12)]
[h,if(isNumber(cd20)==1 || cd20==""):"";cd20=eval(cd20)]

[h:setLibProperty("Hit Dice","d4="+cd4+";d6="+cd6+";d8="+cd8+";d10="+cd10+";d12="+cd12+";d20="+cd20,"Lib:"+tokenName)]




[h,if(isFrameVisible(tokenName+" - Character Sheet")==1),code:{
[macro("character/Macro Frame@this"):"macro=Character Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Statblock")==1),code:{
[macro("character/Macro Frame@this"):"macro=Statblock;tokenName="+tokenName]
};{}]
