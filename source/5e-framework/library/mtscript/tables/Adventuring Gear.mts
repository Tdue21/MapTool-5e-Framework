<h5>Adventuring Gear [r:macrolink("+", "character/Args Dialog@this")"","prop=Equipment;index=new;name=new;description=new;tokenName=Lib:Compendium")]</h5>


[h:LibProperty=getLibProperty("Equipment","Lib:Compendium")]

[h:fields=json.fields(LibProperty)]

[h:adventuring=""]
[h:ammo=""]
[h:focus=""]

[h,count(listcount(fields),"<br>"),code:{

	[h:currentObj=listget(fields,roll.count)]

	[h:description=encode(json.get(LibProperty,currentObj))]

	[h:info=substring(description,0,if(indexOf(description,"---")==-1,length(description),indexOf(description,"---")))]

	[h:match=matches(info,".*[Aa]dventuring.*")]
	[h:match1=matches(currentObj,".*'[Ss]\\s[Pp]ack.*")]
	[h:match3=matches(info,".*common.*|.*rare.*|.*legendary.*|.*artifact.*|.*magic.*|.*attunement.*")]
	[h,if(match==1 && match3==0 && match1==0):adventuring=listappend(adventuring,currentObj)]

	[h:match=matches(info,".*[Aa]mmunition.*")]
	[h:match2=matches(info,".*[Ww]eapon.*")]
	[h,if(match==1 && match2==0 && match3==0):ammo=listappend(ammo,currentObj)]

	[h:match=matches(info,".*[Ff]ocus.*")]
	[h,if(match==1 && match3==0):focus=listappend(focus,currentObj)]
}]

[h:adventuring=listsort(adventuring,"A")]
[h:ammo=listsort(ammo,"A")]
[h:focus=listsort(focus,"A")]


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

<!----------------------Adventuring Gear-------------------------->
<tr class=[r:if(odd==1,"bg","")]>
<td colspan=4 style="padding-left:0px">
[h:odd=if(odd==1,0,1)]
<i>
Adventuring Gear
</i>

[r,count(listcount(adventuring),""),code:{

	[h:repeat=roll.count]

	[h:t1=listcount(adventuring)]

	[h:total=t1+listcount(ammo)+listcount(focus)]

	[h:half=ceil(total/2)]
	
	[r,if(half==roll.count),code:{
	
	</table>
	<td valign=top style="margin:0px;padding:0px">
	<table>
	<tr><th>
	Name
	<th>
	Cost
	<th>
	Weight
	<th width=0%>
	
	[h:odd=1]
	
	};{}]

	<tr class=[r:if(odd==1,"bg","")]>
	[h:odd=if(odd==1,0,1)]
	<td style="padding-left:15px">

	[h:currentObj=listget(adventuring,repeat)]
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

<!----------------------Ammo-------------------------->
<tr class=[r:if(odd==1,"bg","")]>
<td colspan=4 style="padding-left:0px">
[h:odd=if(odd==1,0,1)]
<i>
Ammo
</i>

[r,count(listcount(ammo),""),code:{

	<tr class=[r:if(odd==1,"bg","")]>
	[h:odd=if(odd==1,0,1)]
	<td style="padding-left:15px">

	[h:currentObj=listget(ammo,roll.count)]
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


<!----------------------Spellcasting Focus-------------------------->
<tr class=[r:if(odd==1,"bg","")]>
<td colspan=4 style="padding-left:0px">
[h:odd=if(odd==1,0,1)]
<i>
Spellcasting Focus
</i>

[r,count(listcount(focus),""),code:{

	<tr class=[r:if(odd==1,"bg","")]>
	[h:odd=if(odd==1,0,1)]
	<td style="padding-left:15px">

	[h:currentObj=listget(focus,roll.count)]
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

