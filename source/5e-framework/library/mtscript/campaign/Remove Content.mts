[h:id=findToken("Lib:Bestiary")]
[h:switchToken(id)]

[h:sourcesList=""]
[h:obj=getLibProperty("Bestiary","Lib:Compendium")]

[h:fields=json.fields(obj)]
[h,count(listcount(fields)),code:{
	[h:objName=listget(fields,roll.count)]
	[h:currentObj=json.get(obj,objName)]
	[h:sources=json.toList(json.get(currentObj,"sources"))]
	[h,count(listcount(sources)),code:{
		[h:source=listget(sources,roll.count)]
		[h:find=listFind(sourcesList,source)]
		[h,if(find==-1):sourcesList=listAppend(sourcesList,source)]
	}]
}]


[h:obj=getLibProperty("Equipment","Lib:Compendium")]

[h:fields=json.fields(obj)]
[h,count(listcount(fields)),code:{
	[h:objName=listget(fields,roll.count)]
	[h:currentObj=json.get(obj,objName)]
	[h:sources=json.toList(json.get(currentObj,"sources"))]
	[h,count(listcount(sources)),code:{
		[h:source=listget(sources,roll.count)]
		[h:find=listFind(sourcesList,source)]
		[h,if(find==-1):sourcesList=listAppend(sourcesList,source)]
	}]
}]

[h:obj=getLibProperty("Feats","Lib:Compendium")]

[h:fields=json.fields(obj)]
[h,count(listcount(fields)),code:{
	[h:objName=listget(fields,roll.count)]
	[h:currentObj=json.get(obj,objName)]
	[h:sources=json.toList(json.get(currentObj,"sources"))]
	[h,count(listcount(sources)),code:{
		[h:source=listget(sources,roll.count)]
		[h:find=listFind(sourcesList,source)]
		[h,if(find==-1):sourcesList=listAppend(sourcesList,source)]
	}]
}]

[h:obj=getLibProperty("AdditionalFeats","Lib:Compendium")]

[h:fields=json.fields(obj)]
[h,count(listcount(fields)),code:{
	[h:objName=listget(fields,roll.count)]
	[h:currentObj=json.get(obj,objName)]
	[h:sources=json.toList(json.get(currentObj,"sources"))]
	[h,count(listcount(sources)),code:{
		[h:source=listget(sources,roll.count)]
		[h:find=listFind(sourcesList,source)]
		[h,if(find==-1):sourcesList=listAppend(sourcesList,source)]
	}]
}]

[h:obj=getLibProperty("Spells","Lib:Compendium")]

[h:fields=json.fields(obj)]
[h,count(listcount(fields)),code:{
	[h:objName=listget(fields,roll.count)]
	[h:currentObj=json.get(obj,objName)]
	[h:sources=json.toList(json.get(currentObj,"sources"))]
	[h,count(listcount(sources)),code:{
		[h:source=listget(sources,roll.count)]
		[h:find=listFind(sourcesList,source)]
		[h,if(find==-1):sourcesList=listAppend(sourcesList,source)]
	}]
}]


[h:height=170+listcount(sourcesList)*25]

[h:height=if(height>600,600,height)]

[dialog5("Remove Content", "width=350; height="+height+"; temporary=1; input=1; noframe=0"):{


<link rel="stylesheet" type="text/css" href="GitHub@Lib:Campaign">

[h:processorLink=macroLinkText("Remove Content process@Lib:Campaign","")]
<form action="[r:processorLink]" method="json">


<table width=100%>

<tr><td colspan=2 align=center>

<h4>Select sources to Remove</h4>






[r,count(listcount(sourcesList),""),code:{

	<tr><td align=right>
	[r:currentSource=listget(sourcesList,roll.count)]
	<td>
	
	<input type="checkbox" name="[r:currentSource]" value="1">

}]
<tr><td align=right>
No Source
<td>
<input type="checkbox" name="NULL" value="1">

<tr><td colspan=2 align=center>
<input type="submit" name="submit" value="Apply">

}]