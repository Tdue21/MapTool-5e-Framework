[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:level=getStrProp(macro.args,"level")]

[h:id=findToken(tokenName)]
[h,if(id==""):"";switchToken(id)]


[h:Slots=getLibProperty("Slots","Lib:"+tokenName)]

[h:value=getStrProp(Slots,"value"+level)]
[h:total=getStrProp(Slots,"total"+level)]




[h:res=input("var|Level "+level+" Slots||label|span=true","value|"+value+"|Value","total|"+total+"|Total")]
[h:abort(res)]

[h,if(isNumber(value)==1):"";value=eval(value)]
[h,if(isNumber(total)==1):"";total=eval(total)]

[h:Slots=setStrProp(Slots,"value"+level,value)]
[h:Slots=setStrProp(Slots,"total"+level,total)]



[h:setLibProperty("Slots",Slots,"Lib:"+tokenName)]




[h,if(isFrameVisible(tokenName+" - Spellcasting Sheet")==1),code:{
[macro("character/Macro Frame@this"):"macro=Spellcasting Sheet;tokenName="+tokenName]
};{}]

[h,if(isFrameVisible(tokenName+" - Character Sheet")==1),code:{
[macro("character/Macro Frame@this"):"macro=Character Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Statblock")==1),code:{
[macro("character/Macro Frame@this"):"macro=Statblock;tokenName="+tokenName]
};{}]