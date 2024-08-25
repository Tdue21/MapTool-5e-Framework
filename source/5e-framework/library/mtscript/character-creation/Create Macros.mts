[h:idReference=findToken("PC","00.DM")]

[h:newId=copyToken(idReference,1,"00.DM")]
[h:switchToken(newId)]

[h:macroList=getMacros()]
[h:index=getMacroIndexes("Make Token")]
[h:command=getMacroCommand(listget(index,0),idReference,"00.DM")]
[h:removeToken(newId)]

[h:id=getSelected()]
[h:id=listget(id,0)]

[h,if(id==""),code:{

	[h:res=input("var|No tokens selected, create new Player Character?||label|span=true")]
	[h:abort(res)]


	[macro("New PC Token@Lib:Character"):""]

	[h:tokenName=macro.return]
	[h,if(matches(tokenName,"^Lib:.*")==1):"";tokenName="Lib:"+tokenName]
	[h:id=findToken(tokenName)]
	[h:switchToken(id)]

};{

	[h:tokenName=getName(id)]
	[h:switchToken(id)]


	<!-----------------CONFIRM------------------->
	[h,if(macro.args!=""):"";res=input("var|Set "+tokenName+"'s token as Player Character?||label|span=true")]
	[h,if(macro.args!=""):"";abort(res)]
	


}]







[h,if(matches(tokenName,"^Lib:.*")==1):"";setName("Lib:"+tokenName)]

[h:macroList=getMacros()]

[h:tokenName=replace(tokenName,"^Lib:","")]
[h:setProperty("LibName",tokenName)]

[h:setProperty("sizeMod",getSize())]

[h:setPC()]

[h:switchToken(id)]
[h,if(listfind(macroList,"Make Token")<0):createMacro("Make Token",command, "minWidth=120;fontColor=black;fontSize=1.15em;color=teal;fontColor=white;playerEditable=0")]