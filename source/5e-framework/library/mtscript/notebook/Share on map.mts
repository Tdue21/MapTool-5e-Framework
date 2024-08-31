[h:name=getStrProp(macro.args,"key")]
[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:target=getStrProp(macro.args,"target")]
[h:description=getStrProp(macro.args,"description")]


[h:id=findToken("Monster","00.DM")]
[h:center=getViewCenter(0,";")]
[h:xCoord=getStrProp(center,"centerX")]
[h:yCoord=getStrProp(center,"centerY")]
[h:newId=copyToken(id,1,"00.DM",'{"name":"'+name+'","x":'+xCoord+',"y":'+yCoord+'}')]

[h:switchToken(newId)]

[h:getTokenImage("asset://b92cef77adaee8657caaed183e14fc90")]

[h,switch(target):
	case "all":setOwnedByAll(1);
	case "GM":setOwnedByAll(0);
	default:setOwner(listget(target,0))]

[h:createMacro("Notebook",'


[h:value=getLibProperty("Value", function.getNamespace())]
[h:description=json.get(value,"'+name+'")]


[h,if(isGM()==1):share=0;share=1]

[macro("notebook/Content@this"):"key='+name+';description="+encode(description)+";tokenName='+tokenName+';share="+share]


', "minWidth=;sortBy=;group=")]