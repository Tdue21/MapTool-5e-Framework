[h:raceList=getLibProperty("Races","Lib:Character Creation")]

[r,count(listcount(raceList),""),code:{

	[h:currentRace=listget(raceList,roll.count)]

	<li>[r:macroLink(currentRace,"Races Window@Lib:Tables","",currentRace)]</li>

}]