
[h:bgList=getLibProperty("Backgrounds", function.getNamespace())]

[r,count(listcount(bgList),""),code:{

	[h:currentBG=listget(bgList,roll.count)]

	<li>[r:macroLink(currentBG,"tables/Backgrounds Window@this","",currentBG)]</li>

}]