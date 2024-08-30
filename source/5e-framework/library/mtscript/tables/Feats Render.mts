
[h:featsList=getLibProperty("Feats", function.getNamespace())]

[h:featsList=lower(featsList)]

[h:featProps=getLibProperty("Feats", function.getNamespace())]



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
		[r:macrolink("Edit", "character/Change Form@this")"","prop=Feats;source=;name="+name+";description=;tokenName=Lib:Campaign")] |
	[r:macrolink("Move", "character/Move@this")"","tokenName=Lib:Compendium;description=;name="+name+";prop=Feats")]</h3>
		[macro("campaign/Markdown@this"):"tokenName=Lib:Tables;description="+encode(description)+";source=Class;name="+name+";group=Feats"]
	



}]
