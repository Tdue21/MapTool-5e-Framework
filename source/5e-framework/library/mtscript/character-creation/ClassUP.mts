[h:tokenName=json.get(macro.args,"tokenName")]

[h,if(findToken(tokenName)==""),code:{

	[h:start=getLibProperty("Start", function.getNamespace())]
	[h:setCurrentMap(start)]

};{}]

[h:id=findToken(tokenName)]
[h:switchToken(id)]



<h1>Class</h1>

<p style="margin-top: 10px; margin-bottom: 10px">

Select a <b>class</b> to level up or multiclass, if you choose to multiclass, be sure to meet the multiclass prerequisites for both current and new class.

</p>


<tr>
<td valign=bottom style="padding:0px;margin=0px">


[h: processorLink=macroLinkText("character-creation/Character Creation Wizard@this","")]
<form action="[r:processorLink]" method="json">

[h:classes=getLibProperty("Classes", function.getNamespace())]
[h:classList=json.fields(classes)]

[h:charClass=getProperty("Class&Level")]
[h,if(json.type(charClass)=="UNKNOWN"):charClassList="{}";charClassList=json.fields(charClass)]


[r,count(listcount(classList),""),code:{


	[h:currentClass=listget(classList,roll.count)]
	[h:hasclass=listfind(charClassList,currentClass)]
	[h:classList=listReplace(classList,roll.count,if(hasclass==-1,currentClass+"*",currentClass+" (Level Up)"))]


}]


<select name="CaracterClass" size="14">

[r,count(listcount(classList),""),code:{

[h:currentClass=listget(classList,roll.count)]

<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=capitalize(currentClass)]
[h:CapitalName=replace(CapitalName,"(?<=\\s)Of(?=\\s)","of")]
[h:CapitalName=replace(CapitalName,"(?<=\\s)A(?=n?\\s)","a")]
[h:CapitalName=replace(CapitalName,"(?<=\\s)Th(?=(?:e|at|ose)\\s)","th")]
[h:CapitalName=replace(CapitalName,"'S(?=\\s)","'s")]

<option[r:if(roll.count==0," selected='selected'","")]>[r:CapitalName]</option>

}]
</select>


<p style="margin-top: 10px;margin-bottom: 10px;margin-left:10px">

Click <b>Next</b> to continue.

</p>

<input type="hidden" name="tokenName" value="[r:tokenName]">
<input type="hidden" name="window" value="ClassUP">
<input type="hidden" name="route" value="Level Up">

<div class="div" style="padding-left: 250px;padding-top: 13px;padding-bottom: 12px;margin:0px;" bgcolor=#D8D8D8>
<input type="submit" name="submit" value="< Back">&nbsp;
<input type="submit" name="submit" value="Next >">
</div>

