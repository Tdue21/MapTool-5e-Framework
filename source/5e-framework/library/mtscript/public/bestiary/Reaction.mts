[h:tokenName=getStrProp(macro.args,"tokenName")]

[h:id=findToken(tokenName)]
[h:switchToken(id)]

[h: setState("Reaction Used", if(getState("Reaction Used")==0,1,0))]

[r:if(getState("Reaction Used")==1,tokenName+" used its Reaction","")]



[macro("Macro Frame@Lib:Bestiary"):tokenName]