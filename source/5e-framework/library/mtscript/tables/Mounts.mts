


[h:LibProperty=getLibProperty("Equipment", function.getNamespace())]

[h:fields=json.fields(LibProperty)]

[h:harness=""]
[h:land=""]
[h:water=""]
[h:mount=""]


[h,count(listcount(fields),"<br>"),code:{

	[h:currentObj=listget(fields,roll.count)]

	[h:description=encode(json.get(LibProperty,currentObj))]

	[h:info=substring(description,0,if(indexOf(description,"---")==-1,length(description),indexOf(description,"---")))]

	[h:match=matches(info,".*[Hh]arness.*")]
	[h:match2=matches(info,".*common.*|.*rare.*|.*legendary.*|.*artifact.*|.*magic.*|.*attunement.*")]
	[h,if(match==1 && match2==0):harness=listappend(harness,currentObj)]

	[h:match=matches(info,".*[Vv]ehicle.*")]
	[h:match1=matches(info,".*[Ll]and.*")]
	[h,if(match==1 && match1==1 && match2==0):land=listappend(land,currentObj)]

	[h:match=matches(info,".*[Vv]ehicle.*")]
	[h:match1=matches(info,".*[Ww]ater.*")]
	[h,if(match==1 && match1==1 && match2==0):water=listappend(water,currentObj)]

	[h:match=matches(info,".*[Mm]ount.*")]
	[h,if(match==1 && match2==0):mount=listappend(mount,currentObj)]


}]

[h:harness=listsort(harness,"A")]
[h:land=listsort(land,"A")]
[h:water=listsort(water,"A")]
[h:mount=listsort(mount,"A")]



<h5>Mounts and  Other Animals [r:macrolink("+", "campaign/Args Dialog@this", "","prop=Equipment;index=new;name=new;description=new;tokenName=Lib:Compendium")]</h5>

<table>
<tr><th>
Item
<th>
Cost
<th>
Speed
<th>
Carrying Capacity

<th width=0%>

[h:odd=1]

<!----------------------Mounts and  Other Animals-------------------------->


[r,count(listcount(mount),""),code:{

	<tr class=[r:if(odd==1,"bg","")]>
	[h:odd=if(odd==1,0,1)]
	<td style="padding-left:15px">

	[h:currentObj=listget(mount,roll.count)]
	[h:object=json.get(LibProperty,currentObj)]
	[h:description=json.get(object,"description")]

	<!---------------------------CAPITALIZE----------------------------->
	[h:CapitalName=capitalize(currentObj)]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)Of(?=\\s)","of")]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)A(?=n?\\s)","a")]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)Th(?=(?:e|at|ose)\\s)","th")]
	[h:CapitalName=replace(CapitalName,"'S(?=\\s)","'s")]

	[r:macrolink(if(CapitalName=="","Untitled",CapitalName),"campaign/Args Dialog@this","","prop=Equipment;index=;name="+currentObj+";customName=;identified=1;description=;tokenName=Lib:Compendium")]

	[h:findCost=strfind(description,"([\\d,.]+\\s(?:p|g|e|s|c)p)")]
	[h:speed=strfind(description,"[Ss]peed:\\s(\\d+)")]
	[h:findLb=strfind(description,"([\\d,.]+\\slbs?\\.)")]

	[h:find1=""]
	<td>
	[h,count(getFindCount(findCost)):find1=getGroup(findCost,1,1)]
	[r:if(find1=="","&mdash;",find1)]

	[h:find2=""]
	<td>
	[h,count(getFindCount(speed)):find2=getGroup(speed,1,1)]
	[r:if(find2=="","&mdash;",find2+" ft.")]

	[h:find3=""]
	<td>
	[h,count(getFindCount(findLb)):find3=getGroup(findLb,1,1)]
	[r:if(find3=="","&mdash;",find3)]


	<td>
	[r:macrolink("Move", "character/Move@this", "","tokenName=Lib:Compendium;description=;name="+currentObj+";prop=Equipment")]
	[r,if(isGM()):macrolink("<font color=red>X", "character/Delete Source@this", "","prop=Equipment;name="+currentObj+";tokenName=Lib:Compendium")]
}]

</table>

<h5>Tack, Harness, and Drawn Vehicles</h5>

<table>
<tr><th>
Item
<th>
Cost
<th>
Weight

<th width=0%>

[h:odd=1]

<!----------------------Tack and Harness-------------------------->
<tr class=[r:if(odd==1,"bg","")]>
<td colspan=4 style="padding-left:0px">
[h:odd=if(odd==1,0,1)]
<i>
Tack and Harness
</i>

[r,count(listcount(harness),""),code:{

	<tr class=[r:if(odd==1,"bg","")]>
	[h:odd=if(odd==1,0,1)]
	<td style="padding-left:15px">

	[h:currentObj=listget(harness,roll.count)]
	[h:object=json.get(LibProperty,currentObj)]
	[h:description=json.get(object,"description")]

	<!---------------------------CAPITALIZE----------------------------->
	[h:CapitalName=capitalize(currentObj)]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)Of(?=\\s)","of")]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)A(?=n?\\s)","a")]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)Th(?=(?:e|at|ose)\\s)","th")]
	[h:CapitalName=replace(CapitalName,"'S(?=\\s)","'s")]

	[r:macrolink(if(CapitalName=="","Untitled",CapitalName),"campaign/Args Dialog@this","","prop=Equipment;index=;name="+currentObj+";customName=;identified=1;description=;tokenName=Lib:Compendium")]

	[h:findCost=strfind(description,"([\\d,.]+\\s(?:p|g|e|s|c)p)")]
	[h:findLb=strfind(description,"([\\d,.]+\\slbs?\\.)")]

	[h:find1=""]
	<td>
	[h,count(getFindCount(findCost)):find1=getGroup(findCost,1,1)]
	[r:if(find1=="","&mdash;",find1)]

	[h:find2=""]
	<td>
	[h,count(getFindCount(findLb)):find2=getGroup(findLb,1,1)]
	[r:if(find2=="","&mdash;",find2)]

	<td>
	[r:macrolink("Move", "character/Move@this", "","tokenName=Lib:Compendium;description=;name="+currentObj+";prop=Equipment")]
	[r,if(isGM()):macrolink("<font color=red>X", "character/Delete Source@this", "","prop=Equipment;name="+currentObj+";tokenName=Lib:Compendium")]
}]

<!----------------------Drawn Vehicles-------------------------->
<tr class=[r:if(odd==1,"bg","")]>
<td colspan=4 style="padding-left:0px">
[h:odd=if(odd==1,0,1)]
<i>
Drawn Vehicles
</i>

[r,count(listcount(land),""),code:{

	<tr class=[r:if(odd==1,"bg","")]>
	[h:odd=if(odd==1,0,1)]
	<td style="padding-left:15px">

	[h:currentObj=listget(land,roll.count)]
	[h:object=json.get(LibProperty,currentObj)]
	[h:description=json.get(object,"description")]

	<!---------------------------CAPITALIZE----------------------------->
	[h:CapitalName=capitalize(currentObj)]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)Of(?=\\s)","of")]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)A(?=n?\\s)","a")]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)Th(?=(?:e|at|ose)\\s)","th")]
	[h:CapitalName=replace(CapitalName,"'S(?=\\s)","'s")]

	[r:macrolink(if(CapitalName=="","Untitled",CapitalName),"campaign/Args Dialog@this","","prop=Equipment;index=;name="+currentObj+";customName=;identified=1;description=;tokenName=Lib:Compendium")]

	[h:findCost=strfind(description,"([\\d,.]+\\s(?:p|g|e|s|c)p)")]
	[h:findLb=strfind(description,"([\\d,.]+\\slbs?\\.)")]

	[h:find1=""]
	<td>
	[h,count(getFindCount(findCost)):find1=getGroup(findCost,1,1)]
	[r:if(find1=="","&mdash;",find1)]

	[h:find2=""]
	<td>
	[h,count(getFindCount(findLb)):find2=getGroup(findLb,1,1)]
	[r:if(find2=="","&mdash;",find2)]

	<td>
	[r:macrolink("Move", "character/Move@this", "","tokenName=Lib:Compendium;description=;name="+currentObj+";prop=Equipment")]
	[r,if(isGM()):macrolink("<font color=red>X", "character/Delete Source@this", "","prop=Equipment;name="+currentObj+";tokenName=Lib:Compendium")]
}]


</table>


<h5>Waterborne Vehicles</h5>

<table>
<tr><th>
Item
<th>
Cost
<th>
Speed

<th width=0%>

[h:odd=1]
<!----------------------Waterborne Vehicles-------------------------->

[r,count(listcount(water),""),code:{

	<tr class=[r:if(odd==1,"bg","")]>
	[h:odd=if(odd==1,0,1)]
	<td style="padding-left:15px">

	[h:currentObj=listget(water,roll.count)]
	[h:object=json.get(LibProperty,currentObj)]
	[h:description=json.get(object,"description")]

	<!---------------------------CAPITALIZE----------------------------->
	[h:CapitalName=capitalize(currentObj)]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)Of(?=\\s)","of")]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)A(?=n?\\s)","a")]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)Th(?=(?:e|at|ose)\\s)","th")]
	[h:CapitalName=replace(CapitalName,"'S(?=\\s)","'s")]

	[r:macrolink(if(CapitalName=="","Untitled",CapitalName),"campaign/Args Dialog@this","","prop=Equipment;index=;name="+currentObj+";customName=;identified=1;description=;tokenName=Lib:Compendium")]

	[h:findCost=strfind(description,"([\\d,.]+\\s(?:p|g|e|s|c)p)")]
	[h:findLb=strfind(description,"([\\d,.]+\\slbs?\\.)")]
	[h:speed=strfind(description,"[Ss]peed:\\s(.*)")]

	[h:find1=""]
	<td>
	[h,count(getFindCount(findCost)):find1=getGroup(findCost,1,1)]
	[r:if(find1=="","&mdash;",find1)]

	[h:find2=""]
	<td>
	[h,count(getFindCount(speed)):find2=getGroup(speed,1,1)]
	[r:if(find2=="","&mdash;",find2)]

	<td>
	[r:macrolink("Move", "character/Move@this", "","tokenName=Lib:Compendium;description=;name="+currentObj+";prop=Equipment")]
	[r,if(isGM()):macrolink("<font color=red>X", "character/Delete Source@this", "","prop=Equipment;name="+currentObj+";tokenName=Lib:Compendium")]
}]

</table>