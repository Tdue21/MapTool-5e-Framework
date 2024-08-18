<h5>Other [r:macrolink("+","Args Dialog@Lib:Campaign","","prop=Equipment;index=new;name=new;description=new;tokenName=Lib:Compendium")]</h5>


[h:LibProperty=getLibProperty("Equipment","Lib:Compendium")]

[h:fields=json.fields(LibProperty)]


[h:other=""]

[h,count(listcount(fields),"<br>"),code:{

	[h:currentObj=listget(fields,roll.count)]

	[h:description=encode(json.get(LibProperty,currentObj))]

	[h:info=substring(description,0,if(indexOf(description,"---")==-1,length(description),indexOf(description,"---")))]

	[h:match=matches(info,".*\\*.*\\*.*")]
	[h,if(match==0):other=listappend(other,currentObj)]


}]

[h:other=listsort(other,"A")]


<table>
<tr><th>
Name
<th>
Cost
<th>
Weight
<th width=0%>

[h:odd=1]


[r,count(listcount(other),""),code:{

	<tr class=[r:if(odd==1,"bg","")]>
	[h:odd=if(odd==1,0,1)]
	<td style="padding-left:15px">

	[h:currentObj=listget(other,roll.count)]
	[h:object=json.get(LibProperty,currentObj)]
	[h:description=json.get(object,"description")]

	<!---------------------------CAPITALIZE----------------------------->
	[h:CapitalName=capitalize(currentObj)]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)Of(?=\\s)","of")]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)A(?=n?\\s)","a")]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)Th(?=(?:e|at|ose)\\s)","th")]
	[h:CapitalName=replace(CapitalName,"'S(?=\\s)","'s")]

	[r:macrolink(if(CapitalName=="","Untitled",CapitalName),"Args Dialog@Lib:Campaign","","prop=Equipment;index=;name="+currentObj+";customName=;identified=1;description=;tokenName=Lib:Compendium")]

	[h:Cost=strfind(description,"([\\d,.]+\\s(?:p|g|e|s|c)p)")]
	[h:findLb=strfind(description,"([\\d,.]+\\slbs?\\.)")]
	[h:findProps=strfind(description,"(.*\\w.*)")]

	[h:find1=""]
	<td>
	[h,count(getFindCount(Cost)):find1=getGroup(Cost,1,1)]
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