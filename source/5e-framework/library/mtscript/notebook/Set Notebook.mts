[h:id=getSelected()]
[h:id=listget(id,0)]

[h,if(id==""),code:{

	[h:res=input("var|No tokens selected, create new notebook?||label|span=true",
	"name|Notebook ("+getPlayerName()+")|Notebook Name")]
	[h:abort(res)]

	[h:broadcast("Notebook: " + name)]

	[h:center=getViewCenter(0,";")]
	[h:xCoord=getStrProp(center,"centerX")]
	[h:yCoord=getStrProp(center,"centerY")]
	[h:tokenImage="lib://" + function.getNamespace() + "/assets/images/book.png"]

	[h:id=createToken(
		json.set("{}",
			"name", name, 
			"x", xCoord, 
			"y", yCoord, 
			"size", "medium",
			"tokenImage", tokenImage)
	)]
	[h:tokenName=getName(id)]
	[h:switchToken(id)]
};{
	[h:tokenName=getName(id)]
	[h:switchToken(id)]
	<!-----------------CONFIRM------------------->
	[h:res=input("var|Set "+tokenName+"'s token as a notebook?||label|span=true")]
	[h:abort(res)]
}]

[h,if(isGM()==0):setOwnedByAll(1)]
[h:setProperty("Settings",'{"theme":"GitHub"}')]
<!-----------------MACROS------------------->
[h,if(matches(tokenName,"^Lib:.*")==1):"";setName("Lib:"+tokenName)]
[h:macroList=getMacros()]
[h,if(listfind(macroList,"Notebook")<0):createMacro("Notebook","[macro('notebook/Index@Lib:" + function.getNamespace() + "'):'Lib:"+tokenName+"']", "minWidth=120;fontColor=white;color=gray50;")]
