[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:pinName=getStrProp(macro.args,"tokenName")]
[h:output=getLibProperty("PC Output", function.getNamespace())]

[h,if(pinName=="Select Pin"):pinName=""]
[h,if(pinName==""),code:{
	[h:pinName=""]
	[h:XPvalue=0]
	[h:treasureCurrency=""]
	[h:Equipment=""]
};{
	[h:id=findToken(pinName)]
	[h:switchToken(id)]
	[h:pinXP=getProperty("XP")]
	[h:XPvalue=getStrProp(string(pinXP),"value")]
	[h:treasureCurrency=getProperty("Currency")]
	[h:Equipment=getProperty("Equipment")]
}]
[h:EquipCount=listcount(json.fields(Equipment))]

<!----------List PC Libs----------->
[h:info=getInfo("client")]
[h:libtokens=json.get(info,"library tokens")]
[h:libList=json.fields(libtokens)]

[h:list=libList]
[h,count(listcount(libList)),code:{
	[h:currentLib=listget(libList,roll.count)]
	[h:settingsProp=getLibProperty("LibName",currentLib)]
	[h,if(settingsProp==""):list=listdelete(list,listfind(list,currentLib));""]
	[h:hidden=getLibProperty("hidden",currentLib)]
	[h,if(hidden==1):list=listdelete(list,listfind(list,currentLib));""]
}]
[h:ListPC=""]
[h:maps=getAllMapNames()]

[h,if(isGM()==1),count(listcount(maps)),code:{
	[h:ListPC=list]
};{
	[h:map=listget(maps,roll.count)]
	[h:ownedtokens=getOwnedNames(getPlayerName(),",",map)]
	[h,count(listcount(ownedtokens)),code:{
		[h:currentOwned=listget(ownedtokens,roll.count)]
		[h:find=listfind(list,currentOwned)]
		[h,if(find==-1):"";ListPC=listappend(ListPC,currentOwned)]
	}]
}]
[h:tokens=listsort(ListPC,"N")]
[h:partySize=listcount(tokens)]

[dialog5("Manage", "width=580; height=400; temporary=1; noframe=0; input=1"):{
	<link rel="stylesheet" type="text/css" href="[r:function.getCss('GitHub')]">
	<title>[r:tokenName]</title>

	[h:startMap=getLibProperty("Start", function.getNamespace())]
	[h:CurrentMap=getCurrentMapName()]

	<p class='topbar'>

	[r:macrolink("Party", "character/Manage Party@this")"","tokenName="+tokenName)]&nbsp;
	<span title="Open the encounter manager">[r:macrolink("Encounter", "bestiary/Manage Encounter@this")"","tokenName="+pinName+";reload=1")]</span>&nbsp;
	<span title="Open the current loaded Pin ([r:pinName])">[r:macrolink("Pin", "character/Pin Notes@this")"","tokenName="+pinName)]</span>&nbsp;
	
	</p>

<table>
<tr>
<td>

<b><font size=5>
Party
</b>
<font size=3>

<span title="Make or move tokens to the current map">[r:macrolink("Make tokens", "campaign/Move Tokens@this")"")]</span>
|
[r:macroLink("Create Poll","vote/New Vote@this")]
|
[r:macroLink("Results","vote/Open Results@this")]

<td align=right>

<!-----------------Load Pin------------------->

	[h: processorLink = macroLinkText("character/Load Pin@this", "")]
	<form action="[r:processorLink]" method="json">


	
	[h:Pins=getTokens(",","{'pc':1,'owned':'none'}")]
	[h:repeat=listcount(Pins)]

	<input type="submit" name="load" value="Load">&nbsp;

	<select name="Pin" size="1">
	<option [r:if(pinName=="","selected='selected'","")]>Select Pin</option>
	[r,count(repeat,""),code:{
		[h:pinID=listget(Pins,roll.count)]
		[h:CurrentPin=getName(pinID)]		
		<option [r:if(pinName==CurrentPin,"selected='selected'","")]>[r:CurrentPin]</option>	
	}]


	</select>
	
	</form>

</table>


	[h:class="odd"]
	<table>
	<tr><th align=center>
	Level
	<th align=left>
	Name
	<th align=left>
	Player
	<th align=right>
	HP
	<th align=right>
	GP
	[h:partyGold=""]
	<th align=right>
	XP
	[r,count(partySize,"<br>"),code:{

		<tr [r:if(class=="even",""," class=bg")]><td valign=top align=center>
		[h:class=if(class=="odd","even","odd")]


		[h:currentPC=listget(tokens,roll.count)]
		[h:tokenName=getLibProperty("LibName",currentPC)]
<!-----------------Level------------------->
		[h:level=getLibProperty("TotalLevel","Lib:"+tokenName)]
		[r:if(level=="",0,level)]
<!-----------------NAME------------------->
		<td valign=top>
		[r:macroLink(tokenName,"character/Macro Frame@this","","macro=Character Sheet;tokenName="+tokenName)]
<!-----------------OWNERS------------------->
		<td valign=top>
		[r:getOwners(",","Lib:"+tokenName,startMap)]

<!-----------------HP------------------->
		<td valign=top align=right>
		[h:tokenHP=getLibProperty("HP","Lib:"+tokenName)]
		[h:CurrentHP=getLibProperty("Current Hit Points","Lib:"+tokenName)]
		[h:TotalHP=getLibProperty("Total Hit Points","Lib:"+tokenName)]
		[h:TempHP=getLibProperty("Temporary Hit Points","Lib:"+tokenName)]

		 [r:macroLink(if(tokenHP=="","0/0",tokenHP),"character/Damage@this",getLibProperty("PC Output"),"current="+CurrentHP+";total="+TotalHP+";temp="+TempHP+";id=;tokenName="+tokenName+";pinName="+pinName)]
		
<!-----------------Currency------------------->
		<td valign=top align=right>
		[h:playerCurrency=getLibProperty("currency","Lib:"+tokenName)]
		[h:conversion=getLibProperty("currency", function.getNamespace())]
		
		[h:PlayerPP=getStrProp(playerCurrency,"PP")]
		[h:PlayerPP=if(PlayerPP=="",0,PlayerPP)]
		[h:conversionPP=getStrProp(conversion,"PP")]
		[h:conversionPP=if(conversionPP=="",0,conversionPP)]

		[h:PlayerGP=getStrProp(playerCurrency,"GP")]
		[h:PlayerGP=if(PlayerGP=="",0,PlayerGP)]
		[h:conversionGP=getStrProp(conversion,"GP")]
		[h:conversionGP=if(conversionGP=="",0,conversionGP)]

		[h:PlayerEP=getStrProp(playerCurrency,"EP")]
		[h:PlayerEP=if(PlayerEP=="",0,PlayerEP)]
		[h:conversionEP=getStrProp(conversion,"EP")]
		[h:conversionEP=if(conversionEP=="",0,conversionEP)]

		[h:PlayerSP=getStrProp(playerCurrency,"SP")]
		[h:PlayerSP=if(PlayerSP=="",0,PlayerSP)]
		[h:conversionSP=getStrProp(conversion,"SP")]
		[h:conversionSP=if(conversionSP=="",0,conversionSP)]

		[h:PlayerCP=getStrProp(playerCurrency,"CP")]
		[h:PlayerCP=if(PlayerCP=="",0,PlayerCP)]
		[h:conversionCP=getStrProp(conversion,"CP")]
		[h:conversionCP=if(conversionCP=="",0,conversionCP)]
		
		[h:totalGP=(PlayerPP*conversionPP)+(PlayerGP*conversionGP)+(PlayerEP*conversionEP)+(PlayerSP*conversionSP)+(PlayerCP*conversionCP)]

		[h:partyGold=partyGold+totalGP]

		[r:macrolink(totalGP,"character/Change Currency@this",output,"tokenName="+tokenName)]



<!-----------------XP------------------->
		<td valign=top align=right>
		[h:tokenXP=getLibProperty("XP","Lib:"+tokenName)]
		
		[h:value=getStrProp(string(tokenXP),"value")]

		[r:macroLink(if(value=="","0",value),"character/Change Property@this","","name=XP;value="+encode(tokenXP)+";id=;tokenName="+tokenName)]

		

	
	}]
	</table>





<!-----------------Distribute------------------->
<table>


<tr><td colspan=2 align=center>

<div>

	[h: processorLink = macroLinkText("character/Change Party process@this", "")]
	<form action="[r:processorLink]" method="json">

<!-----------------XP------------------->


	<b>NPCs
	<input type="text" name="NPCs" value="0" size="12">&nbsp;
	XP
	<input type="text" name="XPvalue" value="[r:XPvalue]" size="12">

	<input type="hidden" name="TokenList" value="[r:tokens]">
	<input type="hidden" name="partySize" value="[r:partySize]">
	<input type="hidden" name="pin" value="[r:pinName]">

	<input type="submit" name="distribute" value="Distribute XP">


</div>


<table width=465>
<tr><td width=20%>
<b>Platinum
<td width=20%>
<b>Gold
<td width=20%>
<b>Electrum
<td width=20%>
<b>Silver
<td width=20%>
<b>Copper
</table>

	[h: processorLink = macroLinkText("character/Change Party process@this", "")]
	<form action="[r:processorLink]" method="json">

<!-----------------GOLD------------------->
	[h:PP=getStrProp(treasureCurrency,"PP")]
	&nbsp;<input type="text" name="PP" value="[r:PP]" size="8">


	[h:GP=getStrProp(treasureCurrency,"GP")]
	&nbsp;<input type="text" name="GP" value="[r:GP]" size="8">

	[h:EP=getStrProp(treasureCurrency,"EP")]
	&nbsp;<input type="text" name="EP" value="[r:EP]" size="8">


	[h:SP=getStrProp(treasureCurrency,"SP")]
	&nbsp;<input type="text" name="SP" value="[r:SP]" size="8">


	[h:CP=getStrProp(treasureCurrency,"CP")]
	&nbsp;<input type="text" name="CP" value="[r:CP]" size="8">


	<input type="hidden" name="TokenList" value="[r:tokens]">
	<input type="hidden" name="partySize" value="[r:partySize]">
	<input type="hidden" name="pin" value="[r:pinName]">

	<br>

	<b>Total Party Gold:</b> [r:partyGold] [r,count(34,""):"&nbsp; "]
	
	<input type="submit" name="distribute" value="Distribute Treasure">

	</form>

</table>

<!-----------------ITEMS------------------->
<table>
<tr><td valign=top>
[h:obj=Equipment]
[h,if(json.type(obj)=="UNKNOWN"):objList="";objList=json.fields(obj)]
[h,if(json.type(obj)=="UNKNOWN"):repeat=0;repeat=listcount(objList)]



[h:EquipLib=getLibProperty("Equipment", function.getNamespace())]
[h:EquipList=json.fields(EquipLib)]

[h,count(repeat,""),code:{
	[h:objName=listGet(objList,roll.count)]
	[h:exists=listFind(EquipList,objName)]
	[h,if(exists==-1):obj=json.remove(obj,objName);""]
		[h,if(exists==-1):obj=setLibProperty(object,obj,"Lib:"+tokenName);""]

}]

[h,if(json.type(obj)=="UNKNOWN"):objList="";objList=json.fields(obj)]
[h,if(json.type(obj)=="UNKNOWN"):repeat=0;repeat=listcount(objList)]

[r,count(repeat,""),code:{

	[r,if(floor(repeat/2)==roll.count):"<td valign=top>";if(roll.count==0,"","<br>")]

	[h:objName=listGet(objList,roll.count)]
	[h:currentObj=json.get(obj,objName)]
	[h:Quantity=json.get(currentObj,"Quantity")]
	[h:customName=json.get(currentObj,"customName")]
	[h:identified=json.get(currentObj,"identified")]

	[h:name=if(customName=="" || customName==0,objName,customName)]
	
	[h:name=if(Quantity==1,name,name+"s")]

<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=capitalize(name)]
[h:CapitalName=replace(CapitalName,"(?<=\\s)Of(?=\\s)","of")]
[h:CapitalName=replace(CapitalName,"(?<=\\s)A(?=n?\\s)","a")]
[h:CapitalName=replace(CapitalName,"(?<=\\s)Th(?=(?:e|at|ose)\\s)","th")]
[h:CapitalName=replace(CapitalName,"'S(?=\\s)","'s")]


	
	
	[r:macrolink(if(name=="","Untitled",CapitalName),"character/Pin Args Dialog@this","","prop=Equipment;index="+roll.count+";name="+objName+";customName="+customName+";description=;tokenName="+pinName+";identified="+identified)]
	x
	[r:Quantity]
	
	([r:macrolink("Move", "character/Pin Move@this")"","prop=Equipment;index="+roll.count+";name="+objName+";customName="+customName+";description=;tokenName="+pinName+";identified="+identified)])
	

	


}]

</table>
}]