[h:tokenName=json.get(macro.args,"tokenName")]
[h:id=findToken(tokenName)]
[h:switchToken(id)]

[macro("character Creation/Set Spell Slots@this"):"tokenName="+tokenName]

[h:HP=json.get(macro.args,"HP")]

[h:attributeList=getLibProperty("Attributes", "Lib:Character")]
[h:AtrProps=""]
[h,count(listcount(attributeList),""),code:{
	[h:attribute=listget(attributeList,roll.count)]
	[h:value=getLibProperty(attribute,tokenName)]
	[h:value=getStrProp(value,"value")]
	[h:value=if(value=="",0,value)]
	[h,if(isNumber(value)==0):value=eval(value);value]
	[h:mod=floor(number(eval(string(value)))/2-5)]
	[h:AtrProps=setStrProp(AtrProps,substring(lower(attribute),0,3),mod)]
}]
[h:varsFromStrProp(AtrProps)]

[h,if(isNumber(HP)==0):HP=eval(HP)]

[h:HP=if(HP=="" || isNumber(HP)==0,0,HP)]
[h:setProperty("Total Hit Points",HP,id)]

[h:CurrentHP=getProperty("Current Hit Points")]
[h:setProperty("Current Hit Points",if(CurrentHP=="",0,CurrentHP),id)]
[h:TempHP=getProperty("Temporary Hit Points")]
[h:setProperty("Temporary Hit Points",if(TempHP=="",0,TempHP),id)]

<h1>Review</h1>

<p style="margin-top: 10px; margin-bottom: 10px">

This Wizard completed setting <b>[r:tokenName]'s</b> new level and hit points, some details may still be missing but you can edit manually any time, have fun playing the game.

<br>
<br>

Click <b>Finish</b> to close the Wizard.

</p>


<tr>
<td valign=bottom style="padding:0px;margin=0px">


[h: processorLink=macroLinkText("character Creation/Character Creation Wizard@this","")]
<form action="[r:processorLink]" method="json">




<input type="hidden" name="tokenName" value="[r:tokenName]">
<input type="hidden" name="window" value="ReviewUP">
<input type="hidden" name="route" value="Level Up">

<div class="div" style="padding-left: 250px;padding-top: 13px;padding-bottom: 12px;margin:0px;" bgcolor=#D8D8D8>
<input type="submit" name="submit" value="< Back">&nbsp;
<input type="submit" name="submit" value=" Finish ">
</div>

