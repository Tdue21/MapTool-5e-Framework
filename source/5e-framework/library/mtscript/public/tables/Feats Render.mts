
[h:featsList=getLibProperty("Feats","Lib:Character Creation")]

[h:featsList=lower(featsList)]

[h:featProps=getLibProperty("Feats","Lib:Compendium")]



[r,count(listcount(featsList),""),code:{
	
	[h:name=listget(featsList,roll.count)]
	<!---------------------------CAPITALIZE----------------------------->
	[h:CapitalName=capitalize(name)]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)Of(?=\\s)","of")]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)A(?=n?\\s)","a")]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)Th(?=(?:e|at|ose)\\s)","th")]
	[h:CapitalName=replace(CapitalName,"'S(?=\\s)","'s")]
		<!--------------------------Feature------------------------------->
	
		[h:object=json.get(featProps,name)]
		[h,if(json.type(object)=="UNKNOWN"):description="";description=json.get(object,"description")]
		<h3>[r:CapitalName]
		<font size=3>
		[r:macroLink("Edit","Change Form@Lib:Character","","prop=Feats;source=;name="+name+";description=;tokenName=Lib:Campaign")] |
	[r:macrolink("Move","Move@Lib:Character","","tokenName=Lib:Compendium;description=;name="+name+";prop=Feats")]</h3>
		[macro("Markdown@Lib:Campaign"):"tokenName=Lib:Tables;description="+encode(description)+";source=Class;name="+name+";group=Feats"]
	



}]
