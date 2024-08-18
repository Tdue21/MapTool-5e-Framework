[r:tokenName=getStrProp(macro.args,"tokenName")]
[h:value=getStrProp(macro.args,"value")]

[h:id=findToken(tokenName)]
[h,if(id==""),code:{};{
[h:switchToken(id)]

[h:addToInitiative()]

[h:gameplay=getLibProperty("Gameplay","Lib:Campaign")]
[h:dexInit=getStrProp(gameplay,"dexInit")]

[h,if(dexInit==1 && isPC()==1),code:{

	[h:atr=getLibProperty("Dexterity","Lib:"+tokenName)]
	[h:atr=getStrProp(atr,"value")]
	[h:atr=if(atr=="",0,atr)]
	[h,if(isNumber(atr)==0):atr=eval(atr);atr]

	[h:atr=atr/100]

	[h:value=value+atr]

};{}]

[h,if(dexInit==1 && isNPC()==1),code:{

	[h:object=getProperty("Stats")]
	[h:atr=json.get(object,"dex")]

	[h:atr=if(atr=="",0,atr)]
	[h:atr=atr/100]

	[h:value=value+atr]

};{}]


[h:setInitiative(value)]

[h:sortInitiative()]

[macro("Initiative Overlay@Lib:Overlay"):"output=all"]
}]