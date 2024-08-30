[h:tokenName=getStrProp(macro.args,"tokenName")]

[h:id=findToken(tokenName)]
[h,if(id==""):abort(0);switchToken(id)]

[h: setState("Reaction Used", if(getState("Reaction Used")==0,1,0))]

[r:if(getState("Reaction Used")==1,tokenName+" used its Reaction","")]



[h,if(isFrameVisible(tokenName+" - Character Sheet")==1),code:{
[macro("character/Macro Frame@this"):"macro=Character Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Statblock")==1),code:{
[macro("character/Macro Frame@this"):"macro=Statblock;tokenName="+tokenName]
};{}]