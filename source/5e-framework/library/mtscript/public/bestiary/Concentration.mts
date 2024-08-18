[h:tokenName=getStrProp(macro.args,"tokenName")]

[h:id=findToken(tokenName)]
[h:switchToken(id)]
	
[h:setState("Concentration", if(getState("Concentration")==0,1,0))]
