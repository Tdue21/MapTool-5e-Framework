[h:idList=getStrProp(macro.args,"idList")]

[h,if(idList==""):idList=getSelected()]

[h:KeyId=listget(idList,0)]
[h:visible=getVisible(KeyId)]
[h:visible = 1 - visible]

[h,count(listcount(idList)),code:{

	[h:currentId=listget(idList,roll.count)]

	[h:switchToken(currentId)]


	[h:display=getLibProperty("Display","Lib:Campaign")]
	[h:HiddenOpacity=getStrProp(display,"HiddenOpacity")]
[h:opacity=if(visible==1,1,HiddenOpacity*0.01)]
[h:setVisible(visible)]
[h:setTokenOpacity(opacity)]
[h:sendToBack()]
[h:setProperty("hidden",1 - visible)]
[h,if(isOverlayRegistered("Initiative")==1),code:{
[macro("overlay/Initiative Overlay@this"):"output=all"]
};{}]




}]

[h,if(isDialogVisible("Manage")==1),code:{
[h:pinName=getStrProp(macro.args,"pinName")]
[macro("bestiary/Manage Encounter@this"):"reload=1;tokenName="+pinName]
};{}]