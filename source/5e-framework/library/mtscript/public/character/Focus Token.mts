[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:map=getStrProp(macro.args,"map")]

[h:setCurrentMap(map)]

[h:id=findToken(tokenName)]

[h,if(id==""),code:{


	[h:maps=getAllMapNames()]
	[h:maps=listsort(maps,"N")]
	[h:visibleMaps=maps]
	[h,count(listcount(maps)),code:{
		[h:map=listget(maps,roll.count)]
		[h,if(getMapVisible(map)==1):"";visibleMaps=listdelete(visibleMaps,listfind(visibleMaps,map))]
	}]
	[h,if(isGM()==1):maps=maps;maps=visibleMaps]


	[h:res=input("var|"+tokenName+" not found on current map. Change Map to proceed or cancel to abort.||label|span=true",
	"ChangeMap|"+maps+"|Change Map|list|value=string")]
	[h:abort(res)]

	[h:setCurrentMap(ChangeMap)]
	[h:id=findToken(tokenName)]

}]


[h:switchToken(id)]

[h:selectTokens(id)]

[h: xcoord=getTokenX(0)][h: ycoord=getTokenY(0)][h:width=getTokenWidth()][h:height=getTokenHeight()][h:setViewArea(xcoord-7, ycoord-7, xcoord+7, ycoord+7, 0, 0)]