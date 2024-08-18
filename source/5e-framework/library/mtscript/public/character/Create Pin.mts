[h:id=getSelected()]
[h:id=listget(id,0)]

[h,if(id==""),code:{

	[h:res=input("var|No tokens selected, create new pin?||label|span=true",
	"name|Pin "+1d100+"|Pin Name")]
	[h:abort(res)]


	[h:id=findToken("Monster","00.DM")]
	[h:center=getViewCenter(0,";")]
	[h:xCoord=getStrProp(center,"centerX")]
	[h:yCoord=getStrProp(center,"centerY")]
	[h:id=copyToken(id,1,"00.DM","{'name':'"+name+"','x':"+xCoord+",'y':"+yCoord+"}")]

	[h:tokenName=getName(id)]
	[h:switchToken(id)]

	[h:setTokenImage("asset://98a35b9f71208a7cc03e80fbf3a839a3")]
	
};{

	[h:tokenName=getName(id)]
	[h:switchToken(id)]

	<!-----------------CONFIRM------------------->
	[h:res=input("var|Set "+tokenName+"'s token as Pin?||label|span=true")]
	[h:abort(res)]

}]







<!-----------------MACROS------------------->


[h:macroList=getMacros()]

[h,if(listfind(macroList,"Focus")<0):createMacro("Focus","[macro('Set Map@Lib:Campaign'):''][h: xcoord=getTokenX(0)][h: ycoord=getTokenY(0)][h:width=getTokenWidth()][h:height=getTokenHeight()][h:setViewArea(xcoord-5, ycoord-5, xcoord+5, ycoord+5, 0, 1)]", "minWidth=120;fontColor=black;color=lime;sortBy=0;playerEditable=0")]

[h,if(listfind(macroList,"Notes")<0):createMacro("Notes","[macro('Pin Notes@Lib:Character'):'tokenName='+token.name]", "minWidth=120;fontColor=black;color=yellow;sortBy=0")]

[h,if(listfind(macroList,"Send to Hidden")<0):createMacro("Send to Hidden","[h:setLayer('GM')]", "minWidth=120;sortBy=3")]

[h:setTokenSnapToGrid(0)]
[h:token.visible=0]
[h:display=getLibProperty("Display","Lib:Campaign")]
[h:HiddenOpacity=getStrProp(display,"HiddenOpacity")]
[h:setTokenOpacity(HiddenOpacity*0.01)]
[h:setSize("Large")]
[h:setPC()]
[h:setHasSight(0)]

[h,if(isDialogVisible("Manage")==1),code:{
[macro("Pin Notes@Lib:Character"):"tokenName="+tokenName)]
};{}]