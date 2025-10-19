[h:id = getSelected()]
[h:id = listget(id,0)]

[h,if(id==""),code:{
	[h:res=input("var|No tokens selected, create new Player Character?||label|span=true")]
	[h:abort(res)]

	[macro("character/New PC Token@this"):""]
	[h:tokenName=macro.return]

	[h,if(matches(tokenName,"^Lib:.*")==1):"";tokenName="Lib:"+tokenName]
	[h:id=findToken(tokenName)]
	[h:switchToken(id)]
};{
	[h:tokenName=getName(id)]
	[h:switchToken(id)]
	[h,if(macro.args!=""):"";res=input("var|Set "+tokenName+"'s token as Player Character?||label|span=true")]
	[h,if(macro.args!=""):"";abort(res)]
}]

[h,if(matches(tokenName,"^Lib:.*")==1):"";setName("Lib:"+tokenName)]
[h:macroList=getMacros()]
[h:tokenName=replace(tokenName,"^Lib:","")]
[h:setProperty("LibName", tokenName)]
[h:setProperty("sizeMod", getSize())]
[h:setPC()]
[h:switchToken(id)]
[h,if(listfind(macroList,"Make Token")<0):createMacro(json.set("{}",
                        "label", "Make Token",
                        "autoExec", true,
                        "color", "teal",
                        "fontColor", "white",
                        "fontSize", "1.2em",
                        "minWidth", "120",
						"playerEditable",0,
                        "command": "[h:token.createToken()]"))]
