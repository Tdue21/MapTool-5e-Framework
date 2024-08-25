[h:raceList=getLibProperty("Races",function.getNamespace())]
[r,foreach(currentRace, raceList, ""),code:{
	<li>[r:macroLink(currentRace,"tables/Races Window@this","",currentRace)]</li>
}]