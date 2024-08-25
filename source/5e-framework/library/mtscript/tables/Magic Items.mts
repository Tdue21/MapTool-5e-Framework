<h5>Magic Items [r:macrolink("+","Args Dialog@Lib:Campaign","","prop=Equipment;index=new;name=new;description=new;tokenName=Lib:Compendium")]</h5>


[h:LibProperty=getLibProperty("Equipment","Lib:Compendium")]

[h:fields=json.fields(LibProperty)]

[h:weapon=""]
[h:armor=""]
[h:shield=""]
[h:item=""]

[h,count(listcount(fields),"<br>"),code:{

	[h:currentObj=listget(fields,roll.count)]

	[h:description=encode(json.get(LibProperty,currentObj))]

	[h:info=substring(description,0,if(indexOf(description,"---")==-1,length(description),indexOf(description,"---")))]

	[h:match=matches(info,".*[Ww]eapon.*")]
	[h:match1=matches(info,".*common.*|.*rare.*|.*legendary.*|.*artifact.*|.*magic.*|.*attunement.*")]
	[h,if(match==1 && match1==1):weapon=listappend(weapon,currentObj)]

	[h:match2=matches(info,".*[Aa]rmor.*")]
	[h,if(match2==1 && match1==1):armor=listappend(armor,currentObj)]

	[h:match3=matches(info,".*[Ss]hield.*")]
	[h,if(match3==1 && match1==1):shield=listappend(shield,currentObj)]

	[h,if(match==0 && match2==0 && match3==0 && match1==1):item=listappend(item,currentObj)]


}]

[h:weapon=listsort(weapon,"A")]
[h:armor=listsort(armor,"A")]
[h:shield=listsort(shield,"A")]
[h:item=listsort(item,"A")]

<table>
<tr><th>
Name
<th>
Rarity
<th>
Damage
<th>
Weight
<th>
Properties
<th width=0%>

[h:odd=1]

<!----------------------Weapons-------------------------->
<tr class=[r:if(odd==1,"bg","")]>
<td colspan=5 style="padding-left:0px">
[h:odd=if(odd==1,0,1)]
<i>
Weapons
</i>

[r,count(listcount(weapon),""),code:{

	<tr class=[r:if(odd==1,"bg","")]>
	[h:odd=if(odd==1,0,1)]
	<td style="padding-left:15px">

	[h:currentObj=listget(weapon,roll.count)]
	[h:description=json.get(LibProperty,currentObj)]

	<!---------------------------CAPITALIZE----------------------------->
	[h:CapitalName=function.Capitalize(currentObj)]

	[r:macrolink(if(CapitalName=="","Untitled",CapitalName),"Args Dialog@Lib:Campaign","","prop=Equipment;index=;name="+currentObj+";customName=;identified=1;description=;tokenName=Lib:Compendium")]

	[h:findRare=strfind(description,"(\\w*common|\\w*\\s*rare|legendary|artifact)")]
	[h:findDmg=strfind(description,"\\[(.*?)\\]")]
	[h:findLb=strfind(description,"([\\d,.]+\\slbs?\\.)")]
	[h:findProps=strfind(description,"-\\s([\\w\\W]*?)\\\\n")]

	[h:find1=""]
	<td>
	[h,count(getFindCount(findRare)):find1=getGroup(findRare,1,1)]
	[r:if(find1=="","&mdash;",upper(find1,1))]

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
	[r:macrolink("Move","Move@Lib:Character","","tokenName=Lib:Compendium;description=;name="+currentObj+";prop=Equipment")]
	[r,if(isGM()):macroLink("<font color=red>X","Delete Source@Lib:Character","","prop=Equipment;name="+currentObj+";tokenName=Lib:Compendium")]
}]
</table>

<table>
<tr><th>
Armor
<th>
Rarity
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

<!----------------------Armor-------------------------->
<tr class=[r:if(odd==1,"bg","")]>
<td colspan=5 style="padding-left:0px">
[h:odd=if(odd==1,0,1)]
<i>
Armor
</i>


[r,count(listcount(armor),""),code:{

	<tr class=[r:if(odd==1,"bg","")]>
	[h:odd=if(odd==1,0,1)]
	<td style="padding-left:15px">

	[h:currentObj=listget(armor,roll.count)]
	[h:object=json.get(LibProperty,currentObj)]
	[h:description=json.get(object,"description")]

	<!---------------------------CAPITALIZE----------------------------->
	[h:CapitalName=capitalize(currentObj)]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)Of(?=\\s)","of")]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)A(?=n?\\s)","a")]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)Th(?=(?:e|at|ose)\\s)","th")]
	[h:CapitalName=replace(CapitalName,"'S(?=\\s)","'s")]

	[r:macrolink(if(CapitalName=="","Untitled",CapitalName),"Args Dialog@Lib:Campaign","","prop=Equipment;index=;name="+currentObj+";customName=;identified=1;description=;tokenName=Lib:Compendium")]

	[h:Rarity=strfind(description,"(\\w*common|\\w*\\s*rare|legendary|artifact)")]
	[h:AC=strfind(description,"AC(.*)")]
	[h:Str=strfind(description,"[Ss]trength\\sscore\\slower.*?(\\d+)")]
	[h:Stealth=strfind(description,"[Hh]as\\s([Dd]isadvantage)")]
	[h:Weight=strfind(description,"([\\d,.]+\\slbs?\\.)")]

	[h:find1=""]
	<td>
	[h,count(getFindCount(Rarity)):find1=getGroup(Rarity,1,1)]
	[r:if(find1=="","&mdash;",upper(find1,1))]

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
	[r:macrolink("Move","Move@Lib:Character","","tokenName=Lib:Compendium;description=;name="+currentObj+";prop=Equipment")]
	[r,if(isGM()):macroLink("<font color=red>X","Delete Source@Lib:Character","","prop=Equipment;name="+currentObj+";tokenName=Lib:Compendium")]
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

	[r:macrolink(if(CapitalName=="","Untitled",CapitalName),"Args Dialog@Lib:Campaign","","prop=Equipment;index=;name="+currentObj+";customName=;identified=1;description=;tokenName=Lib:Compendium")]

	[h:Rarity=strfind(description,"(\\w*common|\\w*\\s*rare|legendary|artifact)")]
	[h:AC=strfind(description,"AC(.*)")]
	[h:Str=strfind(description,"[Ss]trength\\sscore\\slower.*?(\\d+)")]
	[h:Stealth=strfind(description,"[Hh]as\\s([Dd]isadvantage)")]
	[h:Weight=strfind(description,"([\\d,.]+\\slbs?\\.)")]

	[h:find1=""]
	<td>
	[h,count(getFindCount(Rarity)):find1=getGroup(Rarity,1,1)]
	[r:if(find1=="","&mdash;",upper(find1,1))]

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
	[r:macrolink("Move","Move@Lib:Character","","tokenName=Lib:Compendium;description=;name="+currentObj+";prop=Equipment")]
	[r,if(isGM()):macroLink("<font color=red>X","Delete Source@Lib:Character","","prop=Equipment;name="+currentObj+";tokenName=Lib:Compendium")]
}]
</table>


<table>
<tr><th>
Name
<th>
Rarity
<th>
Weight
<th width=0%>

[h:odd=1]

<!----------------------Other-------------------------->
<tr class=[r:if(odd==1,"bg","")]>
<td colspan=4 style="padding-left:0px">
[h:odd=if(odd==1,0,1)]
<i>
Other
</i>

[r,count(listcount(item),""),code:{

	<tr class=[r:if(odd==1,"bg","")]>
	[h:odd=if(odd==1,0,1)]
	<td style="padding-left:15px">

	[h:currentObj=listget(item,roll.count)]
	[h:object=json.get(LibProperty,currentObj)]
	[h:description=json.get(object,"description")]

	<!---------------------------CAPITALIZE----------------------------->
	[h:CapitalName=capitalize(currentObj)]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)Of(?=\\s)","of")]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)A(?=n?\\s)","a")]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)Th(?=(?:e|at|ose)\\s)","th")]
	[h:CapitalName=replace(CapitalName,"'S(?=\\s)","'s")]

	[r:macrolink(if(CapitalName=="","Untitled",CapitalName),"Args Dialog@Lib:Campaign","","prop=Equipment;index=;name="+currentObj+";customName=;identified=1;description=;tokenName=Lib:Compendium")]

	[h:findRarity=strfind(description,"(\\w*common|\\w*\\s*rare|legendary|artifact)")]
	[h:findDmg=strfind(description,"\\[(.*?)\\]")]
	[h:findLb=strfind(description,"([\\d,.]+\\slbs?\\.)")]
	[h:findProps=strfind(description,"-\\s([\\w\\W]*)\\s-{3,}")]

	[h:find1=""]
	<td>
	[h,count(getFindCount(findRarity)):find1=getGroup(findRarity,1,1)]
	[r:if(find1=="","&mdash;",upper(find1,1))]

	[h:find2=""]
	<td>
	[h,count(getFindCount(findLb)):find2=getGroup(findLb,1,1)]
	[r:if(find2=="","&mdash;",find2)]

	<td>
	[r:macrolink("Move","Move@Lib:Character","","tokenName=Lib:Compendium;description=;name="+currentObj+";prop=Equipment")]
	[r,if(isGM()):macroLink("<font color=red>X","Delete Source@Lib:Character","","prop=Equipment;name="+currentObj+";tokenName=Lib:Compendium")]
}]
</table>