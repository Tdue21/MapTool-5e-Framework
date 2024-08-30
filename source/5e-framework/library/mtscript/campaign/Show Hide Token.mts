
	[h:display=getLibProperty("Display", function.getNamespace())]
	[h:HiddenOpacity=getStrProp(display,"HiddenOpacity")]
	
[h:token.visible = 1 - token.visible]
[h:opacity=if(getVisible()==1,1,HiddenOpacity*0.01)]
[h:setTokenOpacity(opacity)]
[h:sendToBack()]
[h:setProperty("hidden",1 - token.visible)]
[h,if(isOverlayRegistered("Initiative")==1),code:{
[macro("overlay/Initiative Overlay@this"):"output=all"]
};{}]

