<h5>Armor [r:macrolink("+", "campaign/Args Dialog@this")"","prop=Equipment;index=new;name=new;description=new;tokenName=Lib:Compendium")]</h5>


[h:LibProperty=getLibProperty("Equipment","Lib:Compendium")]

[h:fields=json.fields(LibProperty)]

[h:la=""]
[h:ma=""]
[h:ha=""]
[h:shield=""]


[h,count(listcount(fields),"<br>"),code:{

	[h:currentObj=listget(fields,roll.count)]

	[h:description=decode(json.get(LibProperty,currentObj))]
	

	[h:info=substring(description,0,if(indexOf(description,"---")==-1,length(description),indexOf(description,"---")))]

	[h:match=matches(info,".*[Aa]rmor.*")]
	[h:match3=matches(info,".*common.*|.*rare.*|.*legendary.*|.*artifact.*|.*magic.*|.*attunement.*")]

	[h:match2=matches(info,".*[Ll]ight.*")]
	[h,if(match==1 && match2==1 && match3==0):la=listappend(la,currentObj)]

	[h:match2=matches(info,".*[Mm]edium.*")]
	[h,if(match==1 && match2==1 && match3==0):ma=listappend(ma,currentObj)]

	[h:match2=matches(info,".*[Hh]eavy.*")]
	[h,if(match==1 && match2==1 && match3==0):ha=listappend(ha,currentObj)]

	[h:match=matches(info,".*[Ss]hield.*")]
	[h,if(match==1 && match3==0):shield=listappend(shield,currentObj)]

}]

[h:la=listsort(la,"A")]
[h:ma=listsort(ma,"A")]
[h:ha=listsort(ha,"A")]
[h:shield=listsort(shield,"A")]


<table>
<tr><th>
Armor
<th>
Cost
<th>
Armor Class (AC)
<th>
Strength
<th>
Stealth
<th>
Weight
<th width=0%>


[h:odd=1]

<!----------------------Light Armor-------------------------->
<tr class=[r:if(odd==1,"bg","")]>
<td colspan=5 style="padding-left:0px">
[h:odd=if(odd==1,0,1)]
<i>
Light Armor
</i>

[r,count(listcount(la),""),code:{

	<tr class=[r:if(odd==1,"bg","")]>
	[h:odd=if(odd==1,0,1)]
	<td style="padding-left:15px">

	[h:currentObj=listget(la,roll.count)]
	[h:object=json.get(LibProperty,currentObj)]
	[h:description=json.get(object,"description")]

	<!---------------------------CAPITALIZE----------------------------->
	[h:CapitalName=capitalize(currentObj)]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)Of(?=\\s)","of")]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)A(?=n?\\s)","a")]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)Th(?=(?:e|at|ose)\\s)","th")]
	[h:CapitalName=replace(CapitalName,"'S(?=\\s)","'s")]

	[r:macrolink(if(CapitalName=="","Untitled",CapitalName),"campaign/Args Dialog@this","","prop=Equipment;index=;name="+currentObj+";customName=;identified=1;description=;tokenName=Lib:Compendium")]

	[h:Cost=strfind(description,"([\\d,.]+\\s(?:p|g|e|s|c)p)")]
	[h:AC=strfind(description,"AC(.*)")]
	[h:Str=strfind(description,"[Ss]trength\\sscore\\slower.*?(\\d+)")]
	[h:Stealth=strfind(description,"[Hh]as\\s([Dd]isadvantage)")]
	[h:Weight=strfind(description,"([\\d,.]+\\slbs?\\.)")]

	[h:find1=""]
	<td>
	[h,count(getFindCount(Cost)):find1=getGroup(Cost,1,1)]
	[r:if(find1=="","&mdash;",find1)]

	[h:find2=""]
	<td>
	[h,count(getFindCount(AC)):find2=getGroup(AC,1,1)]
	[r:if(find2=="","&mdash;",replace(find2,"[Dd]ex","Dex modifier"))]

	[h:find3=""]
	<td>
	[h,count(getFindCount(Str)):find3=getGroup(Str,1,1)]
	[r:if(find3=="","&mdash;","Str "+find3)]

	[h:find4=""]
	<td>
	[h,count(getFindCount(Stealth)):find4=getGroup(Stealth,1,1)]
	[r:if(find4=="","&mdash;",upper(find4,1))]

	[h:find5=""]
	<td>
	[h,count(getFindCount(Weight)):find5=getGroup(Weight,1,1)]
	[r:if(find5=="","",upper(find5,1))]

	<td>
	[r:macrolink("Move", "character/Move@this")"","tokenName=Lib:Compendium;description=;name="+currentObj+";prop=Equipment")]
	[r,if(isGM()):macrolink("<font color=red>X", "character/Delete Source@this")"","prop=Equipment;name="+currentObj+";tokenName=Lib:Compendium")]
}]

<!----------------------Medium Armor-------------------------->
<tr class=[r:if(odd==1,"bg","")]>
<td colspan=5 style="padding-left:0px">
[h:odd=if(odd==1,0,1)]
<i>
Medium Armor
</i>

[r,count(listcount(ma),""),code:{

	<tr class=[r:if(odd==1,"bg","")]>
	[h:odd=if(odd==1,0,1)]
	<td style="padding-left:15px">

	[h:currentObj=listget(ma,roll.count)]
	[h:object=json.get(LibProperty,currentObj)]
	[h:description=json.get(object,"description")]

	<!---------------------------CAPITALIZE----------------------------->
	[h:CapitalName=capitalize(currentObj)]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)Of(?=\\s)","of")]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)A(?=n?\\s)","a")]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)Th(?=(?:e|at|ose)\\s)","th")]
	[h:CapitalName=replace(CapitalName,"'S(?=\\s)","'s")]

	[r:macrolink(if(CapitalName=="","Untitled",CapitalName),"campaign/Args Dialog@this","","prop=Equipment;index=;name="+currentObj+";customName=;identified=1;description=;tokenName=Lib:Compendium")]

	[h:Cost=strfind(description,"([\\d,.]+\\s(?:p|g|e|s|c)p)")]
	[h:AC=strfind(description,"AC(.*)")]
	[h:Str=strfind(description,"[Ss]trength\\sscore\\slower.*?(\\d+)")]
	[h:Stealth=strfind(description,"[Hh]as\\s([Dd]isadvantage)")]
	[h:Weight=strfind(description,"([\\d,.]+\\slbs?\\.)")]

	[h:find1=""]
	<td>
	[h,count(getFindCount(Cost)):find1=getGroup(Cost,1,1)]
	[r:if(find1=="","&mdash;",find1)]

	[h:find2=""]
	<td>
	[h,count(getFindCount(AC)):find2=getGroup(AC,1,1)]
	[r:if(find2=="","&mdash;",replace(find2,"[Dd]ex","Dex modifier"))]

	[h:find3=""]
	<td>
	[h,count(getFindCount(Str)):find3=getGroup(Str,1,1)]
	[r:if(find3=="","&mdash;","Str "+find3)]

	[h:find4=""]
	<td>
	[h,count(getFindCount(Stealth)):find4=getGroup(Stealth,1,1)]
	[r:if(find4=="","&mdash;",upper(find4,1))]

	[h:find5=""]
	<td>
	[h,count(getFindCount(Weight)):find5=getGroup(Weight,1,1)]
	[r:if(find5=="","&mdash;",upper(find5,1))]

	<td>
	[r:macrolink("Move", "character/Move@this")"","tokenName=Lib:Compendium;description=;name="+currentObj+";prop=Equipment")]
	[r,if(isGM()):macrolink("<font color=red>X", "character/Delete Source@this")"","prop=Equipment;name="+currentObj+";tokenName=Lib:Compendium")]
}]


<!----------------------Heavy Armor-------------------------->
<tr class=[r:if(odd==1,"bg","")]>
<td colspan=5 style="padding-left:0px">
[h:odd=if(odd==1,0,1)]
<i>
Heavy Armor
</i>

[r,count(listcount(ha),""),code:{

	<tr class=[r:if(odd==1,"bg","")]>
	[h:odd=if(odd==1,0,1)]
	<td style="padding-left:15px">

	[h:currentObj=listget(ha,roll.count)]
	[h:object=json.get(LibProperty,currentObj)]
	[h:description=json.get(object,"description")]

	<!---------------------------CAPITALIZE----------------------------->
	[h:CapitalName=capitalize(currentObj)]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)Of(?=\\s)","of")]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)A(?=n?\\s)","a")]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)Th(?=(?:e|at|ose)\\s)","th")]
	[h:CapitalName=replace(CapitalName,"'S(?=\\s)","'s")]

	[r:macrolink(if(CapitalName=="","Untitled",CapitalName),"campaign/Args Dialog@this","","prop=Equipment;index=;name="+currentObj+";customName=;identified=1;description=;tokenName=Lib:Compendium")]

	[h:Cost=strfind(description,"([\\d,.]+\\s(?:p|g|e|s|c)p)")]
	[h:AC=strfind(description,"AC(.*)")]
	[h:Str=strfind(description,"[Ss]trength\\sscore\\slower.*?(\\d+)")]
	[h:Stealth=strfind(description,"[Hh]as\\s([Dd]isadvantage)")]
	[h:Weight=strfind(description,"([\\d,.]+\\slbs?\\.)")]

	[h:find1=""]
	<td>
	[h,count(getFindCount(Cost)):find1=getGroup(Cost,1,1)]
	[r:if(find1=="","&mdash;",find1)]

	[h:find2=""]
	<td>
	[h,count(getFindCount(AC)):find2=getGroup(AC,1,1)]
	[r:if(find2=="","&mdash;",replace(find2,"[Dd]ex","Dex modifier"))]

	[h:find3=""]
	<td>
	[h,count(getFindCount(Str)):find3=getGroup(Str,1,1)]
	[r:if(find3=="","&mdash;","Str "+find3)]

	[h:find4=""]
	<td>
	[h,count(getFindCount(Stealth)):find4=getGroup(Stealth,1,1)]
	[r:if(find4=="","&mdash;",upper(find4,1))]

	[h:find5=""]
	<td>
	[h,count(getFindCount(Weight)):find5=getGroup(Weight,1,1)]
	[r:if(find5=="","&mdash;",upper(find5,1))]

	<td>
	[r:macrolink("Move", "character/Move@this")"","tokenName=Lib:Compendium;description=;name="+currentObj+";prop=Equipment")]
	[r,if(isGM()):macrolink("<font color=red>X", "character/Delete Source@this")"","prop=Equipment;name="+currentObj+";tokenName=Lib:Compendium")]
}]



<!----------------------Shield-------------------------->
<tr class=[r:if(odd==1,"bg","")]>
<td colspan=5 style="padding-left:0px">
[h:odd=if(odd==1,0,1)]
<i>
Shield
</i>

[r,count(listcount(shield),""),code:{

	<tr class=[r:if(odd==1,"bg","")]>
	[h:odd=if(odd==1,0,1)]
	<td style="padding-left:15px">
	
	[h:currentObj=listget(shield,roll.count)]
	[h:object=json.get(LibProperty,currentObj)]
	[h:description=json.get(object,"description")]

	<!---------------------------CAPITALIZE----------------------------->
	[h:CapitalName=capitalize(currentObj)]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)Of(?=\\s)","of")]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)A(?=n?\\s)","a")]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)Th(?=(?:e|at|ose)\\s)","th")]
	[h:CapitalName=replace(CapitalName,"'S(?=\\s)","'s")]

	[r:macrolink(if(CapitalName=="","Untitled",CapitalName),"campaign/Args Dialog@this","","prop=Equipment;index=;name="+currentObj+";customName=;identified=1;description=;tokenName=Lib:Compendium")]

	[h:Cost=strfind(description,"([\\d,.]+\\s(?:p|g|e|s|c)p)")]
	[h:AC=strfind(description,"AC(.*)")]
	[h:Str=strfind(description,"[Ss]trength\\sscore\\slower.*?(\\d+)")]
	[h:Stealth=strfind(description,"[Hh]as\\s([Dd]isadvantage)")]
	[h:Weight=strfind(description,"([\\d,.]+\\slbs?\\.)")]

	[h:find1=""]
	<td>
	[h,count(getFindCount(Cost)):find1=getGroup(Cost,1,1)]
	[r:if(find1=="","&mdash;",find1)]

	[h:find2=""]
	<td>
	[h,count(getFindCount(AC)):find2=getGroup(AC,1,1)]
	[r:if(find2=="","&mdash;",replace(find2,"[Dd]ex","Dex modifier"))]

	[h:find3=""]
	<td>
	[h,count(getFindCount(Str)):find3=getGroup(Str,1,1)]
	[r:if(find3=="","&mdash;","Str "+find3)]

	[h:find4=""]
	<td>
	[h,count(getFindCount(Stealth)):find4=getGroup(Stealth,1,1)]
	[r:if(find4=="","&mdash;",upper(find4,1))]

	[h:find5=""]
	<td>
	[h,count(getFindCount(Weight)):find5=getGroup(Weight,1,1)]
	[r:if(find5=="","&mdash;",upper(find5,1))]

	<td>
	[r:macrolink("Move", "character/Move@this")"","tokenName=Lib:Compendium;description=;name="+currentObj+";prop=Equipment")]
	[r,if(isGM()):macrolink("<font color=red>X", "character/Delete Source@this")"","prop=Equipment;name="+currentObj+";tokenName=Lib:Compendium")]
}]
</table>