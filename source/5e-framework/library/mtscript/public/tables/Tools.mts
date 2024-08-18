<h5>Tools [r:macrolink("+","Args Dialog@Lib:Campaign","","prop=Equipment;index=new;name=new;description=new;tokenName=Lib:Compendium")]</h5>


[h:LibProperty=getLibProperty("Equipment","Lib:Compendium")]

[h:fields=json.fields(LibProperty)]

[h:tools=""]
[h:gaming=""]
[h:instrument=""]


[h,count(listcount(fields),"<br>"),code:{

	[h:currentObj=listget(fields,roll.count)]

	[h:description=encode(json.get(LibProperty,currentObj))]

	[h:info=substring(description,0,if(indexOf(description,"---")==-1,length(description),indexOf(description,"---")))]

	[h:match=matches(info,".*[Tt]ools.*")]
	[h:match2=matches(info,".*common.*|.*rare.*|.*legendary.*|.*artifact.*|.*magic.*|.*attunement.*")]
	[h,if(match==1 && match2==0):tools=listappend(tools,currentObj)]

	[h:match=matches(info,".*[Gg]aming.*")]
	[h,if(match==1 && match2==0):gaming=listappend(gaming,currentObj)]

	[h:match=matches(info,".*[Ii]nstrument.*")]
	[h,if(match==1 && match2==0):instrument=listappend(instrument,currentObj)]

}]

[h:tools=listsort(tools,"A")]
[h:gaming=listsort(gaming,"A")]
[h:instrument=listsort(instrument,"A")]

<table>
<tr><th>
Name
<th>
Cost
<th>
Weight
<th width=0%>

[h:odd=1]

<!----------------------Tools-------------------------->
<tr class=[r:if(odd==1,"bg","")]>
<td colspan=4 style="padding-left:0px">
[h:odd=if(odd==1,0,1)]
<i>
Tools
</i>

[r,count(listcount(tools),""),code:{

	<tr class=[r:if(odd==1,"bg","")]>
	[h:odd=if(odd==1,0,1)]
	<td style="padding-left:15px">

	[h:currentObj=listget(tools,roll.count)]
	[h:object=json.get(LibProperty,currentObj)]
	[h:description=json.get(object,"description")]

	<!---------------------------CAPITALIZE----------------------------->
	[h:CapitalName=capitalize(currentObj)]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)Of(?=\\s)","of")]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)A(?=n?\\s)","a")]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)Th(?=(?:e|at|ose)\\s)","th")]
	[h:CapitalName=replace(CapitalName,"'S(?=\\s)","'s")]

	[r:macrolink(if(CapitalName=="","Untitled",CapitalName),"Args Dialog@Lib:Campaign","","prop=Equipment;index=;name="+currentObj+";customName=;identified=1;description=;tokenName=Lib:Compendium")]

	[h:findCost=strfind(description,"([\\d,.]\\s(?:p|g|e|s|c)p)")]
	[h:findDmg=strfind(description,"\\[(.*?)\\]")]
	[h:findLb=strfind(description,"([\\d,.]+\\slbs?\\.)")]
	[h:findProps=strfind(description,"-\\s([\\w\\W]*)\\s-{3,}")]

	[h:find1=""]
	<td>
	[h,count(getFindCount(findCost)):find1=getGroup(findCost,1,1)]
	[r:if(find1=="","&mdash;",find1)]

	[h:find2=""]
	<td>
	[h,count(getFindCount(findLb)):find2=getGroup(findLb,1,1)]
	[r:if(find2=="","&mdash;",find2)]

	<td>
	[r:macrolink("Move","Move@Lib:Character","","tokenName=Lib:Compendium;description=;name="+currentObj+";prop=Equipment")]
	[r,if(isGM()):macroLink("<font color=red>X","Delete Source@Lib:Character","","prop=Equipment;name="+currentObj+";tokenName=Lib:Compendium")]
}]

<!----------------------Gaming Set-------------------------->
<tr class=[r:if(odd==1,"bg","")]>
<td colspan=4 style="padding-left:0px">
[h:odd=if(odd==1,0,1)]
<i>
Gaming Set
</i>

[r,count(listcount(gaming),""),code:{

	<tr class=[r:if(odd==1,"bg","")]>
	[h:odd=if(odd==1,0,1)]
	<td style="padding-left:15px">

	[h:currentObj=listget(gaming,roll.count)]
	[h:object=json.get(LibProperty,currentObj)]
	[h:description=json.get(object,"description")]

	<!---------------------------CAPITALIZE----------------------------->
	[h:CapitalName=capitalize(currentObj)]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)Of(?=\\s)","of")]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)A(?=n?\\s)","a")]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)Th(?=(?:e|at|ose)\\s)","th")]
	[h:CapitalName=replace(CapitalName,"'S(?=\\s)","'s")]

	[r:macrolink(if(CapitalName=="","Untitled",CapitalName),"Args Dialog@Lib:Campaign","","prop=Equipment;index=;name="+currentObj+";customName=;identified=1;description=;tokenName=Lib:Compendium")]

	[h:findCost=strfind(description,"([\\d,.]\\s(?:p|g|e|s|c)p)")]
	[h:findDmg=strfind(description,"\\[(.*?)\\]")]
	[h:findLb=strfind(description,"([\\d,.]+\\slbs?\\.)")]
	[h:findProps=strfind(description,"-\\s([\\w\\W]*)\\s-{3,}")]

	[h:find1=""]
	<td>
	[h,count(getFindCount(findCost)):find1=getGroup(findCost,1,1)]
	[r:if(find1=="","&mdash;",find1)]

	[h:find2=""]
	<td>
	[h,count(getFindCount(findLb)):find2=getGroup(findLb,1,1)]
	[r:if(find2=="","&mdash;",find2)]

	<td>
	[r:macrolink("Move","Move@Lib:Character","","tokenName=Lib:Compendium;description=;name="+currentObj+";prop=Equipment")]
	[r,if(isGM()):macroLink("<font color=red>X","Delete Source@Lib:Character","","prop=Equipment;name="+currentObj+";tokenName=Lib:Compendium")]
}]


<!----------------------Instrument-------------------------->
<tr class=[r:if(odd==1,"bg","")]>
<td colspan=4 style="padding-left:0px">
[h:odd=if(odd==1,0,1)]
<i>
Instrument
</i>

[r,count(listcount(instrument),""),code:{

	<tr class=[r:if(odd==1,"bg","")]>
	[h:odd=if(odd==1,0,1)]
	<td style="padding-left:15px">

	[h:currentObj=listget(instrument,roll.count)]
	[h:object=json.get(LibProperty,currentObj)]
	[h:description=json.get(object,"description")]

	<!---------------------------CAPITALIZE----------------------------->
	[h:CapitalName=capitalize(currentObj)]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)Of(?=\\s)","of")]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)A(?=n?\\s)","a")]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)Th(?=(?:e|at|ose)\\s)","th")]
	[h:CapitalName=replace(CapitalName,"'S(?=\\s)","'s")]

	[r:macrolink(if(CapitalName=="","Untitled",CapitalName),"Args Dialog@Lib:Campaign","","prop=Equipment;index=;name="+currentObj+";customName=;identified=1;description=;tokenName=Lib:Compendium")]

	[h:findCost=strfind(description,"([\\d,.]\\s(?:p|g|e|s|c)p)")]
	[h:findDmg=strfind(description,"\\[(.*?)\\]")]
	[h:findLb=strfind(description,"([\\d,.]+\\slbs?\\.)")]
	[h:findProps=strfind(description,"-\\s([\\w\\W]*)\\s-{3,}")]

	[h:find1=""]
	<td>
	[h,count(getFindCount(findCost)):find1=getGroup(findCost,1,1)]
	[r:if(find1=="","&mdash;",find1)]

	[h:find2=""]
	<td>
	[h,count(getFindCount(findLb)):find2=getGroup(findLb,1,1)]
	[r:if(find2=="","&mdash;",find2)]

	<td>
	[r:macrolink("Move","Move@Lib:Character","","tokenName=Lib:Compendium;description=;name="+currentObj+";prop=Equipment")]
	[r,if(isGM()):macroLink("<font color=red>X","Delete Source@Lib:Character","","prop=Equipment;name="+currentObj+";tokenName=Lib:Compendium")]
}]
</table>