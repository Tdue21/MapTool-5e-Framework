
[h:bgList=getLibProperty("Backgrounds","Lib:Character Creation")]

[r,count(listcount(bgList),""),code:{

	[h:currentBG=listget(bgList,roll.count)]

	<li>[r:macroLink(currentBG,"tables/Backgrounds Window@this","",currentBG)]</li>

}]