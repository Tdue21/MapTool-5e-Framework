[h:tokenName=json.get(macro.args,"tokenName")]
[h:id=findToken(tokenName)]
[h:switchToken(id)]

[h:output= function.getOutput())]
[h:characterName=if(matches(tokenName,"^Lib:.*")==1,replace(tokenName,"^Lib:",""),tokenName)]

[h:dice=json.get(macro.args,"HitDice")]
[h:subclass=lower(json.get(macro.args,"subclass"))]
[h:class=json.get(macro.args,"class")]
[h,if(subclass=="" || subclass==0),code:{};{
	[h:subclass=replace(subclass,"\\s*:.*","")]
	<!-----------------Feats------------------->
	[macro("character Creation/Add Subclass Features@this"):"tokenName="+tokenName+";class="+class+";subclass="+subclass]
	
	[h:macroList=getLibProperty("macroList","Lib:Compendium")]
	[h:hasClassMacro=listfind(macroList,subclass)]

	[h,if(hasClassMacro==-1),code:{};{
	<!-----------------Subclass------------------->
	[macro(subclass+"compendium/@this"):"tokenName="+tokenName+";class="+class+";subclass="+subclass]
	}]
}]

[h:averageHP=ceil(number(replace(dice,"d",""))/2+1)]

[h:conValue=getStrProp(getProperty("Constitution"),"value")]
[h,if(conValue==""):"";conValue=eval(string(conValue))]
[h,if(isNumber(conValue)==1):conMod=floor(conValue/2-5);conMod=-5]

[h:HP=getProperty("Total Hit Points")]

<h1>Final Details</h1>

<p style="margin-top: 10px; margin-bottom: 10px">
<font style="text-decoration:none">

Determine [r:characterName]'s <b>HP</b> by rolling

[r:macroLink("1"+dice,"character/Dice Roller@this",output,"text="+characterName+"'s Hit Points;value=1"+dice+"+"+conMod+"+"+HP+";tokenName="+characterName)]


(or [r:macroLink(averageHP,"character/Dice Roller@this",output,"text="+characterName+"'s Hit Points;value="+averageHP+"+"+conMod+"+"+HP+";tokenName="+characterName)]) + your <b>Constitution</b> modifier.



</p>


<tr>
<td valign=bottom style="padding:0px;margin=0px">


[h: processorLink=macroLinkText("character Creation/Character Creation Wizard@this","")]
<form action="[r:processorLink]" method="json">

<table>
<tr><td>
<b>Total Hit Points:
<td>
[h:value=getProperty("Total Hit Points")]
<input type="text" name="HP" value="[r:value]" size="5">
</table>

<p style="margin-top: 150px;margin-bottom: 10px;margin-left:10px">

Click <b>Next</b> to continue.

</p>


<input type="hidden" name="tokenName" value="[r:tokenName]">
<input type="hidden" name="window" value="DetailsUP">
<input type="hidden" name="route" value="Level Up">

<div class="div" style="padding-left: 207px;padding-top: 13px;padding-bottom: 12px;margin:0px;" bgcolor=#D8D8D8>
<input type="submit" name="submit" value="< Back">&nbsp;
<input type="submit" name="submit" value="Skip">&nbsp;
<input type="submit" name="submit" value="Next >">
</div>

