
[dialog5("Manage", "width=580; height=400; temporary=0; noframe=0; input=1"):{

<link rel="stylesheet" type="text/css" href="[r:function.getCss('GitHub')]">



[h:tokenName=getStrProp(macro.args,"tokenName")]

[h,if(tokenName=="Select Pin"):tokenName=""]


<title>[r:tokenName]</title>

[h:id=findToken(tokenName)]


[h,if(tokenName==""),code:{};{
[h:switchToken(id)]
}]

<p bgcolor=white style='border-bottom: 1px solid gray;padding:0px;margin:0px;font-family:sans;font-size:10px'>
[r:macrolink("Party", "character/Manage Party@this", "","tokenName="+tokenName)]&nbsp;
[r:macrolink("Encounter", "bestiary/Manage Encounter@this", "","tokenName="+tokenName+";reload=1")]&nbsp;
<span title="Open the current loaded Pin ([r:tokenName])">[r:macrolink("Pin", "character/Pin Notes@this", "","tokenName="+tokenName)]</span>&nbsp;
</p>



<table>
<tr>
<td>

<b><font size=5>
Pin Notes
</b>
<font size=3>
[r,if(tokenName==""):macrolink("Create Pin","character/Create Pin@this","");macroLink("Select", "campaign/Center Token@this", "","tokenName="+tokenName+";map="+getCurrentMapName())]

[r,if(tokenName==""):"";"| "+macroLink("Focus","Focus@Token","","",tokenName)]

[h,if(tokenName==""):descriptionGMNotes="";descriptionGMNotes=getGMNotes()]

[r,if(tokenName==""):"";"| "+macrolink("GM Notes", "character/Change Pin Form@this", "","prop=GMNotes;name=GMNotes;description="+descriptionGMNotes+";tokenName="+tokenName)]


<td align=right>

<!-----------------Load Pin------------------->

	[h: processorLink = macroLinkText("character/Load Pin Notes@this", "")]
	<form action="[r:processorLink]" method="json">


	
	[h:Pins=getTokens(",","{'pc':1,'owned':'none'}")]
	[h:repeat=listcount(Pins)]

	<input type="submit" name="load" value="Load">&nbsp;

	<select name="Pin" size="1">
	<option [r:if(tokenName=="","selected='selected'","")]>Select Pin</option>
	[r,count(repeat,""),code:{
		[h:pinID=listget(Pins,roll.count)]
		[h:CurrentPin=getName(pinID)]		
		<option [r:if(tokenName==CurrentPin,"selected='selected'","")]>[r:CurrentPin]</option>	
	}]


	</select>
	
	</form>
<!------------------------------------------------------------------->
</table>





<!-----------------NOTES------------------->

[h:key="Notes"]



[h,if(tokenName==""):descriptionNotes="";descriptionNotes=getNotes()]
[r,if(descriptionNotes!=""),code:{


	<b>[r:key]:</b>
	
	[macro("campaign/Markdown@this"):"tokenName="+tokenName+";description="+encode(descriptionNotes)]

	
	
};{}]






[r,if(descriptionNotes!="" && descriptionGMNotes!="" && isGM()==1):"<hr noshade><b>GM Notes:</b>";""]

[r,if(tokenName!=""),code:{
	<!-----------------GM NOTES------------------->

	

	
	
	[macro("campaign/Markdown@this"):"tokenName="+tokenName+";description="+encode(descriptionGMNotes)]


};{}]


[r,if(tokenName==""):"<table><tr><td align=center><font color=gray size=5>[no pin loaded]</table>";"<div>"]


<!-----------------EXPERIENCE------------------->
<p>
[h,if(tokenName==""):xp="";xp=getProperty("XP")]

[h:value=getStrProp(string(xp),"value")]
[h:text=getStrProp(string(xp),"text")]

<b><i>
[r,if(tokenName==""):"";macrolink("Experience Points.", "character/Pin Change Property@this", "","name=XP;value="+encode(xp)+";id="+id+";tokenName="+tokenName)]</b></i>

[r,if(tokenName==""):"";if(value=="","0",value))]

[r,if(tokenName==""):"";if(text=="" || text==0,"","("+text+")")]

</p>
<!-----------------ITEMS------------------->
[h:object="Equipment"]
<p>
<b><i>
[r,if(tokenName==""):"";macrolink("Items.", "character/Pin Add@this", "","prop="+object+";tokenName="+tokenName)]
</i></b>


[h:totalWeight=0]


[h,if(tokenName==""):obj="";obj=getProperty(object)]
[h,if(json.type(obj)=="UNKNOWN"):objList="";objList=json.fields(obj)]
[h,if(json.type(obj)=="UNKNOWN"):repeat=0;repeat=listcount(objList)]



[h:EquipLib=getLibProperty("Equipment", function.getNamespace())]
[h:EquipList=json.fields(EquipLib)]

[h,count(repeat,""),code:{
	[h:objName=listGet(objList,roll.count)]
	[h:exists=listFind(EquipList,objName)]
	[h,if(exists==-1):obj=json.remove(obj,objName);""]
		[h,if(exists==-1):obj=setProperty(object,obj);""]

}]

[h,if(json.type(obj)=="UNKNOWN"):objList="";objList=json.fields(obj)]
[h,if(json.type(obj)=="UNKNOWN"):repeat=0;repeat=listcount(objList)]

[r,count(repeat,""),code:{

	[h:objName=listGet(objList,roll.count)]
	[h:currentObj=json.get(obj,objName)]
	[h:Quantity=json.get(currentObj,"Quantity")]
	[h:customName=json.get(currentObj,"customName")]
	[h:identified=json.get(currentObj,"identified")]

	[h:name=if(customName=="" || customName==0,objName,customName)]
	
	[h:name=if(Quantity==1,name,name+"s")]
	
	[r:Quantity]
	
	[r:macrolink(lower(if(name=="","Untitled",name)),"character/Pin Args Dialog@this","","prop="+object+";index="+roll.count+";name="+objName+";customName="+customName+";description=;tokenName="+tokenName+";identified="+identified)][r:if(repeat==roll.count+2," and ",if(repeat==roll.count+1,".",", "))]


}]

</p>


<p>

<!-----------------CURRENCY------------------->

[h,if(tokenName==""):currency="";currency=getProperty("Currency")]

<i><b>[r,if(tokenName==""):"";macrolink("Treasure.", "character/Pin Change Currency@this", "","tokenName="+tokenName)]</b></i>

[h:PP=getStrProp(currency,"PP")]
[h,if(PP==0 || PP==""):currency=deleteStrProp(currency,"PP");""]

[h:GP=getStrProp(currency,"GP")]
[h,if(GP==0 || GP==""):currency=deleteStrProp(currency,"GP");""]

[h:EP=getStrProp(currency,"EP")]
[h,if(EP==0 || EP==""):currency=deleteStrProp(currency,"EP");""]

[h:SP=getStrProp(currency,"SP")]
[h,if(SP==0 || SP==""):currency=deleteStrProp(currency,"SP");""]

[h:CP=getStrProp(currency,"CP")]
[h,if(CP==0 || CP==""):currency=deleteStrProp(currency,"CP");""]

[r,count(countStrProp(currency),""),code:{

	[r:indexValueStrProp(currency, roll.count)]
	[r:lower(indexKeyStrProp(currency,roll.count))][r:if(countStrProp(currency)==roll.count+2," and ",if(countStrProp(currency)==roll.count+1,".",", "))]

}]


</p>


[r,if(tokenName==""):"";"</div>"]


}]

