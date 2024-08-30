[h:tokenName=json.get(macro.args,"tokenName")]
[h:id=findToken(tokenName)]
[h:switchToken(id)]

[h:submit=json.get(macro.args,"submit")]
[h,if(submit=="Skip"),code:{};{

	[h:str=json.get(macro.args,"Str")]
	[h:props=setStrProp("","value",str)]
	[h:setProperty("Strength",props,id)]
	
	[h:dex=json.get(macro.args,"Dex")]
	[h:props=setStrProp("","value",dex)]
	[h:setProperty("Dexterity",props,id)]
	
	[h:con=json.get(macro.args,"Con")]
	[h:props=setStrProp("","value",con)]
	[h:setProperty("Constitution",props,id)]
	
	[h:int=json.get(macro.args,"Int")]
	[h:props=setStrProp("","value",int)]
	[h:setProperty("Intelligence",props,id)]
	
	[h:wis=json.get(macro.args,"Wis")]
	[h:props=setStrProp("","value",wis)]
	[h:setProperty("Wisdom",props,id)]
	
	[h:cha=json.get(macro.args,"Cha")]
	[h:props=setStrProp("","value",cha)]
	[h:setProperty("Charisma",props,id)]

}]

<h1>Race</h1>

<p style="margin-top: 10px; margin-bottom: 10px">

Select a <b>race</b>, <b>subrace</b> or <b>variant race</b> from the following list.

</p>


<tr>
<td valign=bottom style="padding:0px;margin=0px">


[h: processorLink=macroLinkText("character-creation/Character Creation Wizard@this","")]
<form action="[r:processorLink]" method="json">


[h:races=getLibProperty("Races", function.getNamespace())]


<select name="race" size="15">

[r,count(listcount(races),""),code:{

<option[r:if(roll.count==0," selected='selected'","")]>[r:listget(races,roll.count)]</option>

}]
<option>Custom Race</option>
</select>



<p style="margin-top: 10px;margin-bottom: 10px;margin-left:10px">

Click <b>Next</b> to continue.

</p>


<input type="hidden" name="tokenName" value="[r:tokenName]">
<input type="hidden" name="window" value="Race">


<div class="div" style="padding-left: 207px;padding-top: 13px;padding-bottom: 12px;margin:0px;" bgcolor=#D8D8D8>
<input type="submit" name="submit" value="< Back">&nbsp;
<input type="submit" name="submit" value="Skip">&nbsp;
<input type="submit" name="submit" value="Next >">
</div>


