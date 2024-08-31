<h5>Equipment Packs [r:macrolink("+", "character/Args Dialog@this")"","prop=Equipment;index=new;name=new;description=new;tokenName=Lib:Compendium")]</h5>


[h:LibProperty=getLibProperty("Equipment", function.getNamespace())]

[h:fields=json.fields(LibProperty)]

[h:pack=""]


[h,count(listcount(fields),"<br>"),code:{

	[h:currentObj=listget(fields,roll.count)]

	[h:description=encode(json.get(LibProperty,currentObj))]

	[h:info=substring(description,0,if(indexOf(description,"---")==-1,length(description),indexOf(description,"---")))]

	[h:match1=matches(currentObj,".*'[Ss]\\s[Pp]ack.*")]
	[h,if(match1==1):pack=listappend(pack,currentObj)]


}]

[h:pack=listsort(pack,"A")]



<table  style="margin:0px;padding:0px">
<tr>
<td valign=top  style="margin:0px;padding:0px">


<table>
<tr><th>
Name
<th>
Cost
<th>
Weight
<th width=0%>

[h:odd=1]

<!----------------------Equipment Packs-------------------------->

[r,count(listcount(pack),""),code:{

	[h:repeat=roll.count]


	<tr class=[r:if(odd==1,"bg","")]>
	[h:odd=if(odd==1,0,1)]
	<td style="padding-left:15px">

	[h:currentObj=listget(pack,repeat)]
	[h:object=json.get(LibProperty,currentObj)]
	[h:description=json.get(object,"description")]

	<!---------------------------CAPITALIZE----------------------------->
	[h:CapitalName=function.Capitalize(currentObj)]

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
	[r:macrolink("Move", "character/Move@this")"","tokenName=Lib:Compendium;description=;name="+currentObj+";prop=Equipment")]
	[r,if(isGM()):macrolink("<font color=red>X", "character/Delete Source@this")"","prop=Equipment;name="+currentObj+";tokenName=Lib:Compendium")]
}]


</table>

</table>

