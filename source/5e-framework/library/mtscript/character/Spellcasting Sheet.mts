[h:attributeList=getLibProperty("Attributes", function.getNamespace())]
[h:skillList=getLibProperty("Skills", function.getNamespace())]
[h:output= function.getOutput())]
[h:tokenName=getStrProp(macro.args,"tokenName")]




<table width=100%>
<tr>
<td width=240 style="margin:0px; padding:0px">

<table width=100%>
<tr bgcolor=#DCDCDC>
<td style="margin:0px; padding:0px; font-size:8px" align=left>
[r:macrolink("Load", "character/Selector@this", "","macro=Spellcasting Sheet;tokenName="+tokenName)]
<td style="margin:0px; padding:0px; font-size:8px" align=right><b>D&D
<tr>
<td colspan=2 height=35 style="border-style: double none double solid; border-width:3px;font-size:15px;margin:0px; padding:0px" align=center>


<!-----------------NAME------------------->

[h,token(tokenName):tokenName=getLibProperty("LibName","Lib:"+tokenName)]

[h:id=findToken(tokenName)]

[h,if(id==""):"";switchToken(id)]

[h:setLibProperty("Attributes",attributeList,"Lib:"+tokenName)]

[h:AtrProps=""]
[h,count(listcount(attributeList),""),code:{
	[h:attribute=listget(attributeList,roll.count)]
	[h:value=getLibProperty(attribute,"Lib:"+tokenName)]
	[h:value=getStrProp(value,"value")]
	[h:value=if(value=="",0,value)]
	[h,if(isNumber(value)==0):value=eval(value);value]
	[h:mod=floor(number(eval(string(value)))/2-5)]
	[h:AtrProps=setStrProp(AtrProps,substring(lower(attribute),0,3),mod)]
}]
[h:varsFromStrProp(AtrProps)]




[h:spellcasting=""]
[h:classes=getLibProperty("Class&Level","Lib:"+tokenName)]
[h:totalLevel=0]
[h,if(json.type(classes)=="UNKNOWN"),code:{
	[h:classList=setLibProperty("Class&Level","{}","Lib:"+tokenName)]
	[h:repeat=0]
};{
	[h:classList=json.fields(classes)]	
	[h:repeat=listcount(classList)]
}]
[h:spellClassList=""]
[h:spellClassLinks=""]
[r,count(repeat,""),code:{

	[h:name=listget(classList,roll.count)]
	[h:object=json.get(classes,name)]
	[h:class=json.get(object,"name")]
	[h:level=json.get(object,"level")]


	[h:totalLevel=totalLevel+level]
<!-----------------SPELLCASTING CLASS------------------->	
	[h:spellAtr=json.get(object,"spellcasting")]
	
	[h,if(spellAtr=="-"),code:{};{
		
		[h:spellClassList=listappend(spellClassList,name," /")]
		[h:spellClassLinks=listappend(spellClassLinks,"<span title='"+capitalize(name)+" Spells'>"+macroLink(capitalize(name),"tables/Spells Window@this","",capitalize(name))+"</span>"," /")]
	
	}]



}]

[r:spellClassLinks]

[h:profBonus=ceil(totalLevel/4)+1]



<tr style="font-size:6px">
<td style="margin:0px; padding:0px">SPELLCASTING CLASS
<td bgcolor=#DCDCDC>

</table>

<td height=35 style="margin:0px; padding:0px">

<table bgcolor=#DCDCDC width=100% style="border-style: double; border-width:3px; margin:0px; padding:0px">
<tr>
<td width=33% align=center valign=middle style="margin:0px; padding:0;font-size:6px">

<!-----------------ABILITY------------------->

[h:spellAtributeList=""]
[h,count(listcount(spellClassList," /")),code:{

	[h:spellClass=listget(spellClassList,roll.count,"/")]
	[h:spellObj=json.get(classes,spellClass)]
	[h:spellAtribute=json.get(spellObj,"spellcasting")]
	[h:spellAtributeList=listappend(spellAtributeList,spellAtribute," /")]
	[h:isDuplicate=listcontains(spellAtributeList,spellAtribute," /")]
	[h:listLocation=listfind(spellAtributeList,spellAtribute," /")]
	[h,if(isDuplicate==1):"";spellAtributeList=listdelete(spellAtributeList,listLocation," /")]

}]

<table bgcolor=white width=90% style="border-style: solid double solid double; border-width:2px 3px 2px 3px; margin:0px; padding:0px">
<tr>
<td align=center valign=middle height=35>

<font size=[r:if(listcount(spellAtributeList," /")>1,3,5)]>
[r:spellAtributeList]
</table>
SPELLCASTING ABILITY

<td width=33% align=center valign=middle style="margin:0px; padding:0;font-size:6px">



<!-----------------DC------------------->
[h:listDC=""]
[h,count(listcount(spellAtributeList," /")),code:{

	[h:spellmod=listget(spellAtributeList,roll.count,"/")]
	[h,if(spellmod==""):"";atrVar=lower(substring(spellmod,0,3))]
	[h,if(spellmod==""):atrVar=0;atrVar=eval(atrVar)]
	[h:spellDC=8+profBonus+atrVar]

	[h:linkDC=macroLink(spellDC,"character/Dice Roller@this","","text="+listget(spellClassList,roll.count,"/")+" DC;value="+spellDC+";tokenName="+tokenName)]
	
	[h:listDC=listappend(listDC,linkDC," /")]

}]


<table bgcolor=white width=90% style="border-style: solid double solid double; border-width:2px 3px 2px 3px; margin:0px; padding:0px">
<tr>
<td align=center valign=middle height=35>
<font size=5>
<span title='Display DC'>
[r:listDC]
</span>
</table>
SPELL SAVE DC

<td width=33% align=center valign=middle style="margin:0px; padding:0;font-size:6px">

<!-----------------ATK BONUS------------------->


<table bgcolor=white width=90% style="border-style: solid double solid double; border-width:2px 3px 2px 3px; margin:0px; padding:0px">
<tr>
<td align=center valign=middle height=35>
<font size=5>
[h:atkList=""]
[r,count(listcount(spellAtributeList," /")," /"),code:{

	[h:spellmod=listget(spellAtributeList,roll.count,"/")]
	[h:atrVar=lower(substring(spellmod,0,3))]
	[h:atrVar=eval(atrVar)]
	[h:spellAtk=profBonus+atrVar]
	<span title='Roll Spell Attack'>
	[r:macroLink(if(spellAtk<0,spellAtk,"+"+spellAtk),"character/d20 Roller@this","","text="+substring(listget(spellAtributeList,roll.count," /"),0,3)+" Spell Attack;value=+"+if(spellAtk<0,spellAtk,"+"+spellAtk)+";tokenName="+tokenName+";color=8a61ae")]
</span>
}]
</table>
SPELL ATTACK BONUS

</table>

</table>



[h:object="Spells"]

[h:obj=getLibProperty(object,"Lib:"+tokenName)]
[h,if(json.type(obj)=="UNKNOWN"):objList="";objList=json.fields(obj)]
[h,if(json.type(obj)=="UNKNOWN"):repeat=0;repeat=listcount(json.fields(obj))]




<!-----------------MISSING SPELLS------------------->
[h:missing=""]
[h:level0=""]
[h:level1=""]
[h:level2=""]
[h:level3=""]
[h:level4=""]
[h:level5=""]
[h:level6=""]
[h:level7=""]
[h:level8=""]
[h:level9=""]

[h,count(repeat),code:{

	[h:objName=listGet(objList,roll.count)]
	[h:spellObj=json.get(obj,objName)]
	[h:spellLevel=json.get(spellObj,"level")]


	[h,switch(spellLevel):
	case "0":level0=listappend(level0,objName);
	case "1":level1=listappend(level1,objName);
	case "2":level2=listappend(level2,objName);
	case "3":level3=listappend(level3,objName);
	case "4":level4=listappend(level4,objName);
	case "5":level5=listappend(level5,objName);
	case "6":level6=listappend(level6,objName);
	case "7":level7=listappend(level7,objName);
	case "8":level8=listappend(level8,objName);
	case "9":level9=listappend(level9,objName);
	default:missing=listappend(missing,objName)
	]

	
}]


[r,count(listcount(missing)),code:{
	[r:if(roll.count==0,"Missing or broken:","")]
	[h:objName=listget(missing,roll.count)]
	[r:macrolink(objName,"character/Args Dialog@this","","prop="+object+";source=;name="+objName+";description=;tokenName="+tokenName)]
}]




<table width=100%>
<tr>
<td valign=top width=33% style="margin:0px; padding:0px">


<table width=100%>
<tr>
<td align=left valign=middle style="border-style: double solid double solid; border-width:3px 1px 3px 1px; border-color:#DCDCDC">





<!-----------------CANTRIPS------------------->


<table>
<tr>
<td width=25 bgcolor=#DCDCDC align=center style="border-style: solid; border-width:2px; margin:0px; padding:0px">

<table>
<tr>
<td align=center bgcolor=white style="font-size:13px; margin:0px; padding:0px;padding-left:3px">
<b>
[r:macrolink("<span title='Add Spell'>0</span>", "character/Add@this", "","prop="+object+";tokenName="+tokenName)]
</table>

<td width=15 align=center style="border-style: solid double solid none; border-width:2px 3px 2px 3px;font-size:13px;margin:0px; padding:0px">




<td align=center style="border-style: double double double none; border-width:3px;font-size:8px; margin:0px; padding:0px">
<b>
CANTRIPS

</table>




<table>


[h:level0=listSort(level0,"N")]

[h:repeat=listcount(level0)]


[h:blank=4]
[r,if(repeat==0),count(blank,""),code:{
	<tr style="border-style: none none solid none; border-width:1px; border-color:gray;font-size:8px;margin:0px; padding:0px">

	<td align=center valign=bottom>

};{}]


[r,count(repeat,""),code:{

	[h:objName=listGet(level0,roll.count)]
	[h:objData=json.get(obj,objName)]
	[h:spellLevel=json.get(objData,"level")]
	[h:prep=json.get(objData,"prep")]
	[h:source=json.get(objData,"source")]
	[h:customAtr=json.get(objData,"customAtr")]
	[h:atrValue=getStrProp(getLibProperty(customAtr,"Lib:"+tokenName),"value")]
	[h,if(atrValue==""):"";atrValue=eval(string(atrValue))]
	[h,if(isNumber(atrValue)==1):atrMod=floor(atrValue/2-5);atrMod=-5]

	[h:match=if(spellLevel==0,1,0)]

	[r,if(match==1),code:{
	
	<tr style="border-style: none none solid none; border-width:1px; border-color:gray;font-size:8px;margin:0px; padding:0px">

	<td>

<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=function.Capitalize(objName)]

	
	[r:macrolink(if(CapitalName=="","Untitled",CapitalName),"character/Args Dialog@this","","prop="+object+";source="+source+";name="+objName+";description=;tokenName="+tokenName)]
	
	<td align=right>
	};{}]

	[r,if(customAtr==0 || customAtr=="" || match==0),code:{};{
		[h:spellMod=atrMod+profBonus]
		DC [r:macroLink(8+spellMod,"character/Dice Roller@this",output,"text="+objName+" DC;value="+number(8+spellMod)+";tokenName="+tokenName)] -
		
		Atk [r:macroLink(if(spellMod<0,spellMod,"+"+spellMod),"character/d20 Roller@this","","text="+objName+";value=+"+if(spellMod<0,spellMod,"+"+spellMod)+";id="+id+";tokenName="+tokenName+";color=8a61ae")] -
	}]

	[r,if(match==1),code:{
		[r:if(source=="Class","",source)]
		
		<br>
	};{}]
	
}]

[h:blank=if(blank-repeat<0,0,blank-repeat)]
[r,if(repeat>0),count(blank,""),code:{
	<tr style="border-style: none none solid none; border-width:1px; border-color:gray;font-size:8px;margin:0px; padding:0px">

	<td align=center valign=bottom>

};{}]

</table>








[macro("character/Spells@this"):"profBonus="+profBonus+";level=1;list="+level1+";tokenName="+tokenName]
<br>
[macro("character/Spells@this"):"profBonus="+profBonus+";level=2;list="+level2+";tokenName="+tokenName]

</table>


<td valign=top width=33% style="font-size:15px; margin:0px; padding:0px">



<table width=100%>
<tr>
<td align=left valign=middle style="border-style: double solid double solid; border-width:3px 1px 3px 1px; border-color:#DCDCDC">


[macro("character/Spells@this"):"profBonus="+profBonus+";level=3;list="+level3+";tokenName="+tokenName]
<br>
[macro("character/Spells@this"):"profBonus="+profBonus+";level=4;list="+level4+";tokenName="+tokenName]
<br>
[macro("character/Spells@this"):"profBonus="+profBonus+";level=5;list="+level5+";tokenName="+tokenName]

</table>



<td valign=top width=33% style="font-size:15px; margin:0px; padding:0px">



<table width=100%>
<tr>
<td align=left valign=middle style="border-style: double solid double solid; border-width:3px 1px 3px 1px; border-color:#DCDCDC">


[macro("character/Spells@this"):"profBonus="+profBonus+";level=6;list="+level6+";tokenName="+tokenName]
<br>
[macro("character/Spells@this"):"profBonus="+profBonus+";level=7;list="+level7+";tokenName="+tokenName]
<br>
[macro("character/Spells@this"):"profBonus="+profBonus+";level=8;list="+level8+";tokenName="+tokenName]
<br>
[macro("character/Spells@this"):"profBonus="+profBonus+";level=9;list="+level9+";tokenName="+tokenName]



</table>



</table>





