[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:map=getStrProp(macro.args,"map")]
[h:settings=getStrProp(macro.args,"settings")]



[h,if(getCurrentMapName()==map):"";setCurrentMap(map)]

[h,if(tokenName==0):goto(5,5);goto(tokenName)]
[h:setZoom(1)]

[h,if(tokenName==0):"";selectTokens(tokenName)]

[h,if(tokenName==0 || settings==1),code:{

	[h:closeDialog("Manage Party")]
	[macro("Manage Party@Lib:Character"):""]

};{}]

