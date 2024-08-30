<h5>Weapons [r:macrolink("+", "campaign/Args Dialog@this")"","prop=Equipment;index=new;name=new;description=new;tokenName=Lib:Compendium")]</h5>


[h:LibProperty=getLibProperty("Equipment", function.getNamespace())]

[h:fields=json.fields(LibProperty)]

[h:smw=""]
[h:srw=""]
[h:mmw=""]
[h:mrw=""]

[h,count(listcount(fields),"<br>"),code:{

	[h:currentObj=listget(fields,roll.count)]

	[h:description=encode(json.get(LibProperty,currentObj))]

	[h:info=substring(description,0,if(indexOf(description,"---")==-1,length(description),indexOf(description,"---")))]

	[h:match=matches(info,".*[Ww]eapon.*")]
	[h:match2=matches(info,".*[Ss]imple.*")]
	[h:match3=matches(info,".*[Mm]elee.*")]
	[h:match4=matches(info,".*common.*|.*rare.*|.*legendary.*|.*artifact.*|.*magic.*|.*attunement.*")]
	[h,if(match==1 && match2==1 && match3==1 && match4==0):smw=listappend(smw,currentObj)]

	[h:match3=matches(info,".*[Rr]anged.*")]
	[h,if(match==1 && match2==1 && match3==1 && match4==0):srw=listappend(srw,currentObj)]

	[h:match2=matches(info,".*[Mm]artial.*")]
	[h:match3=matches(info,".*[Mm]elee.*")]
	[h,if(match==1 && match2==1 && match3==1 && match4==0):mmw=listappend(mmw,currentObj)]

	[h:match3=matches(info,".*[Rr]anged.*")]
	[h,if(match==1 && match2==1 && match3==1 && match4==0):mrw=listappend(mrw,currentObj)]


}]

[h:smw=listsort(smw,"A")]
[h:srw=listsort(srw,"A")]
[h:mmw=listsort(mmw,"A")]
[h:mrw=listsort(mrw,"A")]

<table>
<tr><th>
Name
<th>
Cost
<th>
Damage
<th>
Weight
<th>
Properties
<th width=0%>

[h:odd=1]

<!----------------------Simple Melee Weapons-------------------------->
<tr class=[r:if(odd==1,"bg","")]>
<td colspan=5 style="padding-left:0px">
[h:odd=if(odd==1,0,1)]
<i>
Simple Melee Weapons
</i>

[r,count(listcount(smw),""),code:{

	<tr class=[r:if(odd==1,"bg","")]>
	[h:odd=if(odd==1,0,1)]
	<td style="padding-left:15px">

	[h:currentObj=listget(smw,roll.count)]
	[h:description=json.get(LibProperty,currentObj)]

	<!---------------------------CAPITALIZE----------------------------->
	[h:CapitalName=function.Capitalize(currentObj)]


	[r:macrolink(if(CapitalName=="","Untitled",CapitalName),"campaign/Args Dialog@this","","prop=Equipment;index=;name="+currentObj+";customName=;identified=1;description=;tokenName=Lib:Compendium")]

	[h:findCost=strfind(description,"([\\d,.]+\\s(?:p|g|e|s|c)p)")]
	[h:findDmg=strfind(description,"\\[(.*?)\\]")]
	[h:findLb=strfind(description,"([\\d,.]+\\slbs?\\.)")]
	[h:findProps=strfind(description,"-\\s([\\w\\W]*?)\\\\n")]

	[h:find1=""]
	<td>
	[h,count(getFindCount(findCost)):find1=getGroup(findCost,1,1)]
	[r:if(find1=="","&mdash;",find1)]

	[h:find2=""]
	<td>
	[h,count(getFindCount(findDmg)):find2=getGroup(findDmg,1,1)]
	[r:if(find2=="","&mdash;",find2)]

	[h:find3=""]
	<td>
	[h,count(getFindCount(findLb)):find3=getGroup(findLb,1,1)]
	[r:if(find3=="","&mdash;",find3)]

	[h:find4=""]
	<td>
	[h,count(getFindCount(findProps)):find4=getGroup(findProps,1,1)]
	[h:find4=replace(find4,"\\].*?\\)","")]
	[h:find4=replace(find4,"\\[","")]
	[r:if(find4=="","&mdash;",find4)]

	<td>
	[r:macrolink("Move", "character/Move@this")"","tokenName=Lib:Compendium;description=;name="+currentObj+";prop=Equipment")]
	[r,if(isGM()):macrolink("<font color=red>X", "character/Delete Source@this")"","prop=Equipment;name="+currentObj+";tokenName=Lib:Compendium")]
}]

<!----------------------Simple Ranged Weapons-------------------------->
<tr class=[r:if(odd==1,"bg","")]>
<td colspan=5 style="padding-left:0px">
[h:odd=if(odd==1,0,1)]
<i>
Simple Ranged Weapons
</i>

[r,count(listcount(srw),""),code:{

	<tr class=[r:if(odd==1,"bg","")]>
	[h:odd=if(odd==1,0,1)]
	<td style="padding-left:15px">

	[h:currentObj=listget(srw,roll.count)]
	[h:description=json.get(LibProperty,currentObj)]



	<!---------------------------CAPITALIZE----------------------------->
	[h:CapitalName=function.Capitalize(currentObj)]

	[r:macrolink(if(CapitalName=="","Untitled",CapitalName),"campaign/Args Dialog@this","","prop=Equipment;index=;name="+currentObj+";customName=;identified=1;description=;tokenName=Lib:Compendium")]

	[h:findCost=strfind(description,"([\\d,.]+\\s(?:p|g|e|s|c)p)")]
	[h:findDmg=strfind(description,"\\[(.*?)\\]")]
	[h:findLb=strfind(description,"([\\d,.]+\\slbs?\\.)")]
	[h:findProps=strfind(description,"-\\s([\\w\\W]*?)\\\\n")]

	[h:find1=""]
	<td>
	[h,count(getFindCount(findCost)):find1=getGroup(findCost,1,1)]
	[r:if(find1=="","&mdash;",find1)]

	[h:find2=""]
	<td>
	[h,count(getFindCount(findDmg)):find2=getGroup(findDmg,1,1)]
	[r:if(find2=="","&mdash;",find2)]

	[h:find3=""]
	<td>
	[h,count(getFindCount(findLb)):find3=getGroup(findLb,1,1)]
	[r:if(find3=="","&mdash;",find3)]

	[h:find4=""]
	<td>
	[h,count(getFindCount(findProps)):find4=getGroup(findProps,1,1)]
	[h:find4=replace(find4,"\\].*?\\)","")]
	[h:find4=replace(find4,"\\[","")]
	[r:if(find4=="","&mdash;",find4)]

	<td>
	[r:macrolink("Move", "character/Move@this")"","tokenName=Lib:Compendium;description=;name="+currentObj+";prop=Equipment")]
	[r,if(isGM()):macrolink("<font color=red>X", "character/Delete Source@this")"","prop=Equipment;name="+currentObj+";tokenName=Lib:Compendium")]
}]


<!----------------------Martial Melee Weapons-------------------------->
<tr class=[r:if(odd==1,"bg","")]>
<td colspan=5 style="padding-left:0px">
[h:odd=if(odd==1,0,1)]
<i>
Martial Melee Weapons
</i>

[r,count(listcount(mmw),""),code:{

	<tr class=[r:if(odd==1,"bg","")]>
	[h:odd=if(odd==1,0,1)]
	<td style="padding-left:15px">

	[h:currentObj=listget(mmw,roll.count)]
	[h:description=json.get(LibProperty,currentObj)]

	<!---------------------------CAPITALIZE----------------------------->
	[h:CapitalName=function.Capitalize(currentObj)]


	[r:macrolink(if(CapitalName=="","Untitled",CapitalName),"campaign/Args Dialog@this","","prop=Equipment;index=;name="+currentObj+";customName=;identified=1;description=;tokenName=Lib:Compendium")]

	[h:findCost=strfind(description,"([\\d,.]+\\s(?:p|g|e|s|c)p)")]
	[h:findDmg=strfind(description,"\\[(.*?)\\]")]
	[h:findLb=strfind(description,"([\\d,.]+\\slbs?\\.)")]
	[h:findProps=strfind(description,"-\\s([\\w\\W]*?)\\\\n")]

	[h:find1=""]
	<td>
	[h,count(getFindCount(findCost)):find1=getGroup(findCost,1,1)]
	[r:if(find1=="","&mdash;",find1)]

	[h:find2=""]
	<td>
	[h,count(getFindCount(findDmg)):find2=getGroup(findDmg,1,1)]
	[r:if(find2=="","&mdash;",find2)]

	[h:find3=""]
	<td>
	[h,count(getFindCount(findLb)):find3=getGroup(findLb,1,1)]
	[r:if(find3=="","&mdash;",find3)]

	[h:find4=""]
	<td>
	[h,count(getFindCount(findProps)):find4=getGroup(findProps,1,1)]
	[h:find4=replace(find4,"\\].*?\\)","")]
	[h:find4=replace(find4,"\\[","")]
	[r:if(find4=="","&mdash;",find4)]

	<td>
	[r:macrolink("Move", "character/Move@this")"","tokenName=Lib:Compendium;description=;name="+currentObj+";prop=Equipment")]
	[r,if(isGM()):macrolink("<font color=red>X", "character/Delete Source@this")"","prop=Equipment;name="+currentObj+";tokenName=Lib:Compendium")]
}]



<!----------------------Martial Ranged Weapons-------------------------->
<tr class=[r:if(odd==1,"bg","")]>
<td colspan=5 style="padding-left:0px">
[h:odd=if(odd==1,0,1)]
<i>
Martial Ranged Weapons
</i>

[r,count(listcount(mrw),""),code:{

	<tr class=[r:if(odd==1,"bg","")]>
	[h:odd=if(odd==1,0,1)]
	<td style="padding-left:15px">

	[h:currentObj=listget(mrw,roll.count)]
	[h:description=json.get(LibProperty,currentObj)]

	<!---------------------------CAPITALIZE----------------------------->
	[h:CapitalName=function.Capitalize(currentObj)]


	[r:macrolink(if(CapitalName=="","Untitled",CapitalName),"campaign/Args Dialog@this","","prop=Equipment;index=;name="+currentObj+";customName=;identified=1;description=;tokenName=Lib:Compendium")]

	[h:findCost=strfind(description,"([\\d,.]+\\s(?:p|g|e|s|c)p)")]
	[h:findDmg=strfind(description,"\\[(.*?)\\]")]
	[h:findLb=strfind(description,"([\\d,.]+\\slbs?\\.)")]
	[h:findProps=strfind(description,"-\\s([\\w\\W]*?)\\\\n")]

	[h:find1=""]
	<td>
	[h,count(getFindCount(findCost)):find1=getGroup(findCost,1,1)]
	[r:if(find1=="","&mdash;",find1)]

	[h:find2=""]
	<td>
	[h,count(getFindCount(findDmg)):find2=getGroup(findDmg,1,1)]
	[r:if(find2=="","&mdash;",find2)]

	[h:find3=""]
	<td>
	[h,count(getFindCount(findLb)):find3=getGroup(findLb,1,1)]
	[r:if(find3=="","&mdash;",find3)]

	[h:find4=""]
	<td>
	[h,count(getFindCount(findProps)):find4=getGroup(findProps,1,1)]
	[h:find4=replace(find4,"\\].*?\\)","")]
	[h:find4=replace(find4,"\\[","")]
	[r:if(find4=="","&mdash;",find4)]

	<td>
	[r:macrolink("Move", "character/Move@this")"","tokenName=Lib:Compendium;description=;name="+currentObj+";prop=Equipment")]
	[r,if(isGM()):macrolink("<font color=red>X", "character/Delete Source@this")"","prop=Equipment;name="+currentObj+";tokenName=Lib:Compendium")]
}]
</table>