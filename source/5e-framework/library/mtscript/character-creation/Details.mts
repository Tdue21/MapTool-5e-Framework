[h:tokenName=json.get(macro.args,"tokenName")]
[h:id=findToken(tokenName)]
[h:switchToken(id)]

[h:class=json.get(macro.args,"class")]
[h:subclass=json.get(macro.args,"subclass")]
[h:subclass=lower(json.get(macro.args,"subclass"))]
[h,if(subclass=="" || subclass==0),code:{};{
	[h:subclass=replace(subclass,"\\s*:.*","")]

	<!-----------------Feats------------------->
	[macro("character-creation/Add Subclass Features@this"):"tokenName="+tokenName+";class="+class+";subclass="+subclass]

	[h:macroList=getLibProperty("macroList", function.getNamespace())]
	[h:hasClassMacro=listfind(macroList,subclass)]

	[h,if(hasClassMacro==-1),code:{};{
		<!-----------------Subclass------------------->
		[macro(subclass+"compendium/@this"):"tokenName="+tokenName+";class="+class+";subclass="+subclass]
	}]
}]


<h1>Final Details</h1>

<tr>
<td valign=bottom style="padding:0px;margin=0px">


[h: processorLink=macroLinkText("character-creation/CharacterCreationWizard@this","")]
<form action="[r:processorLink]" method="json">


<table style="margin-left:10px">
<tr><td>
<b>Alignment:
<td>
<select name="law" size="1">

[h:align=getProperty("Alignment")]
[h:align=getStrProp(align,"value")]

<option [r:if(align=="","selected='selected'","")]>-</option>
<option [r:if(matches(align,"Lawful.*"),"selected='selected'","")]>Lawful</option>
<option [r:if(matches(align,"Neutral.*"),"selected='selected'","")]>Neutral</option>
<option [r:if(matches(align,"Chaotic.*"),"selected='selected'","")]>Chaotic</option>

</select>
<td>
<select name="moral" size="1">

<option [r:if(align=="","selected='selected'","")]>-</option>
<option [r:if(matches(align,".*Good"),"selected='selected'","")]>Good</option>
<option [r:if(matches(align,".*Neutral"),"selected='selected'","")]>Neutral</option>
<option [r:if(matches(align,".*Evil"),"selected='selected'","")]>Evil</option>

</select>
<td>
<tr><td>
<b>Armor Class:
<td>
[h:AC=getProperty("AC")]
[h:value=getStrProp(AC,"value")]
[h:value=if(value=="","10+dex",value)]
<input type="text" name="AC" value="[r:value]" size="5">
<td>
<b>Total Hit Points:
<td>
[h:value=getProperty("Total Hit Points")]
<input type="text" name="HP" value="[r:value]" size="5">
<td>
<tr><td>
<b>Personality Traits:
<td>
[h:Other=getProperty("OtherNotes")]
[h,if(json.type(Other)=="UNKNOWN"):value="";value=json.get(Other,"Personality")]
<input type="text" name="Personality" value="[r:value]" size="5">
<td>
<b>Ideals:
<td>
[h,if(json.type(Other)=="UNKNOWN"):value="";value=json.get(Other,"Ideals")]
<input type="text" name="Ideals" value="[r:value]" size="5">
<tr><td>
<b>Bonds:
<td>
[h,if(json.type(Other)=="UNKNOWN"):value="";value=json.get(Other,"Bonds")]
<input type="text" name="Bonds" value="[r:value]" size="5">
<td>
<b>Flaws:
<td>
[h,if(json.type(Other)=="UNKNOWN"):value="";value=json.get(Other,"Flaws")]
<input type="text" name="Flaws" value="[r:value]" size="5">
<tr><td>
<b>Age:
<td>
[h:value=getProperty("Age")]
[h:value=getStrProp(value,"value")]
<input type="text" name="Age" value="[r:value]" size="5">
<td>
<b>Height:
<td>
[h:value=getProperty("Height")]
[h:value=getStrProp(value,"value")]
<input type="text" name="Height" value="[r:value]" size="5">
<tr><td>
<b>Weight:
<td>
[h:value=getProperty("Weight")]
[h:value=getStrProp(value,"value")]
<input type="text" name="Weight" value="[r:value]" size="5">
<td>
<b>Eyes:
<td>
[h:value=getProperty("Eyes")]
[h:value=getStrProp(value,"value")]
<input type="text" name="Eyes" value="[r:value]" size="5">
<tr><td>
<b>Skin:
<td>
[h:value=getProperty("Skin")]
[h:value=getStrProp(value,"value")]
<input type="text" name="Skin" value="[r:value]" size="5">
<td>
<b>Hair:
<td>
[h:value=getProperty("Hair")]
[h:value=getStrProp(value,"value")]
<input type="text" name="Hair" value="[r:value]" size="5">
<tr><td>
<b>Backstory:
<tr><td colspan=4>
[h,if(json.type(Other)=="UNKNOWN"):value="";value=json.get(Other,"Backstory")]
<textarea name="backstory" cols="37" rows="8">
[r:value]
</textarea>
</table>



<input type="hidden" name="tokenName" value="[r:tokenName]">
<input type="hidden" name="window" value="Details">


<div class="div" style="padding-left: 207px;padding-top: 13px;padding-bottom: 12px;margin:0px;" bgcolor=#D8D8D8>
<input type="submit" name="submit" value="< Back">&nbsp;
<input type="submit" name="submit" value="Skip">&nbsp;
<input type="submit" name="submit" value="Next >">
</div>

