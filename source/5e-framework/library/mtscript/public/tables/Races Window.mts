[h:raceList=getLibProperty("Races","Lib:Character Creation")]


[h,if(macro.args==""),code:{


	
	[h:res=input("race|"+raceList+"|Race|list|value=string")]
	[h:abort(res)]
};{

	[h:race=macro.args]

}]
[h:race=lower(race)]

[dialog("Race", "width=750; height=600; temporary=1; noframe=0; input=1"):{

<link rel="stylesheet" type="text/css" href="D&D@Lib:Campaign">



<title>[r:race]</title>



<table>
<tr><td width=150 valign=top>

[h:raceList=getLibProperty("Races","Lib:Character Creation")]

[r,count(listcount(raceList),""),code:{

	[h:currentRace=listget(raceList,roll.count)]

	[r,if(currentRace==race):"<b>"]
	[r:macroLink(currentRace,"Races Window@Lib:Tables","",currentRace)]<br>
	[r,if(currentRace==race):"</b>"]
}]

<td>

[h:featProps=getLibProperty("Feats","Lib:Compendium")]


<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=capitalize(race)]
[h:CapitalName=replace(CapitalName,"(?<=\\s)Of(?=\\s)","of")]
[h:CapitalName=replace(CapitalName,"(?<=\\s)A(?=n?\\s)","a")]
[h:CapitalName=replace(CapitalName,"(?<=\\s)Th(?=(?:e|at|ose)\\s)","th")]
[h:CapitalName=replace(CapitalName,"'S(?=\\s)","'s")]

<!--------------------------Feature------------------------------->


[h:object=json.get(featProps,race)]
[h,if(json.type(object)=="UNKNOWN"):description="";description=json.get(object,"description")]
<h1>[r:CapitalName]
<font size=3>
[r:macroLink("Edit","Change Form@Lib:Character","","prop=Feats;source=;name="+race+";description=;tokenName=Lib:Campaign")] |
[r:macrolink("Move","Move@Lib:Character","","tokenName=Lib:Compendium;description=;name="+race+";prop=Feats")]</h1>
<p>
Your [r:race] character has these traits.
</p>
[macro("Markdown@Lib:Campaign"):"tokenName=Lib:Tables;description="+encode(description)+";source=Race;name="+race+";group=Feats"]




}]