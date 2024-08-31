[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:successes=getStrProp(macro.args,"successes")]
[h:failures=getStrProp(macro.args,"failures")]

[h:id=findToken(tokenName)]

[h,if(id==""):"";switchToken(id)]



[h:death=getLibProperty("Death Saves","Lib:"+tokenName)]

[h:successesCurrent=getStrProp(death,"successes")]
[h:failuresCurrent=getStrProp(death,"failures")]

[h:death=setStrProp(death,"successes",if(isNumber(successes)==1,successes,successesCurrent))]

[h:death=setStrProp(death,"failures",if(isNumber(failures)==1,failures,failuresCurrent))]

[h:setLibProperty("Death Saves",death,"Lib:"+tokenName)]




[h,if(isFrameVisible(tokenName+" - Character Sheet")==1),code:{
[macro("character/Macro Frame@this"):"macro=Character Sheet;tokenName="+tokenName]
};{}]
