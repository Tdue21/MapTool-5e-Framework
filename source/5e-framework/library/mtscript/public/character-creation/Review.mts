[h:tokenName=json.get(macro.args,"tokenName")]
[h:id=findToken(tokenName)]
[h:switchToken(id)]

[macro("Set Spell Slots@Lib:Character Creation"):"tokenName="+tokenName]

[h:submit=json.get(macro.args,"submit")]
[h,if(submit=="Skip"),code:{};{

	[macro("Apply Details@Lib:Character Creation"):macro.args]

}]

<h1>Review</h1>

<p style="margin-top: 10px; margin-bottom: 10px">

This Wizard completed setting <b>[r:tokenName]'s</b> Abilities, Race, Background and Class, description and personality, some details may still be missing but you can edit manually any time, have fun playing the game.

<br>
<br>

Click <b>Finish</b> to close the Wizard.

</p>


<tr>
<td valign=bottom style="padding:0px;margin=0px">


[h: processorLink=macroLinkText("Character Creation Wizard@Lib:Character Creation","")]
<form action="[r:processorLink]" method="json">




<input type="hidden" name="tokenName" value="[r:tokenName]">
<input type="hidden" name="window" value="Review">


<div class="div" style="padding-left: 250px;padding-top: 13px;padding-bottom: 12px;margin:0px;" bgcolor=#D8D8D8>
<input type="submit" name="submit" value="< Back">&nbsp;
<input type="submit" name="submit" value=" Finish ">
</div>

