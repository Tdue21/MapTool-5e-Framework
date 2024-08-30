[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:profBonus=getStrProp(macro.args,"profBonus")]

[h:id=findToken(tokenName)]
[h,if(id==""):"";switchToken(id)]



[h:output= function.getOutput())]

<!-----------------Attacks------------------->

<table>

<tr>
<td style="margin:0px; padding:0px">
<font size=1 color=gray>
<b>NAME
<td width=55 style="margin:0px; padding:0px">
<font size=1 color=gray>
<b>ATK BONUS
<td style="margin:0px; padding:0px">
<font size=1 color=gray>
<b>DAMAGE/TYPE

[h:WeaponStats=getLibProperty("Weapons","Lib:"+tokenName)]
[h,if(json.type(WeaponStats)=="UNKNOWN"):WeaponStats="{}";""]

[h:CustomAtk=getLibProperty("Attacks","Lib:"+tokenName)]
[h,if(json.type(CustomAtk)=="UNKNOWN"):CustomAtk="{}";""]

[h:WeaponStats=json.merge(WeaponStats,CustomAtk)]

[h,if(json.type(WeaponStats)=="UNKNOWN"),code:{

	[h:weaponStats=setStrProp("","nameLink","Unarmed Strike")]
	[h:weaponStats=setStrProp(weaponStats,"versatile",0)]
	[h:weaponStats=setStrProp(weaponStats,"offHand",0)]
	[h:weaponStats=setStrProp(weaponStats,"isProf",1)]
	[h:weaponStats=setStrProp(weaponStats,"range","Melee")]
	[h:atkLink=macrolink("-5", "character/d20 Roller@this")output,"text=Unarmed Strike;value=+-5;tokenName="+tokenName+";color=red")]
	[h:weaponStats=setStrProp(weaponStats,"atklink",atkLink)]
	[h:dmgLink=macroLink(-4,"character/Dice Roller@this","","text=1 + your Strength modifier;value=1+str;tokenName="+tokenName)]
	[h:weaponStats=setStrProp(weaponStats,"dmglink",dmgLink)]
	[h:weaponStats=json.set("","Unarmed Strike",json.fromStrProp(weaponStats))]

};{}]





[h,if(json.type(WeaponStats)=="UNKNOWN"):list="";list=json.fields(WeaponStats)]

[r,count(listcount(list),""),code:{

	

	[h:currentWeapon=listget(list,roll.count)]
	[h:obj=json.get(WeaponStats,currentWeapon)]
	[h:nameLink=json.get(obj,"nameLink")]
	[h:atklink=json.get(obj,"atklink")]
	[h:dmglink=json.get(obj,"dmglink")]
	[h:dmglink2=json.get(obj,"dmglink2")]
	[h:versatile=json.get(obj,"versatile")]
	[h:offHand=json.get(obj,"offHand")]
	[h:otherType=json.get(obj,"otherType")]
	[h:isProf=json.get(obj,"isProf")]

	[h:atklink=replace(atklink,"OUTPUTPLACEHOLDER",output)]
	[h:dmglink=replace(dmglink,"OUTPUTPLACEHOLDER",output)]
	[h:dmglink2=replace(dmglink2,"OUTPUTPLACEHOLDER",output)]

	<tr><td bgcolor=#DCDCDC align=left valign=middle style='margin:0px; padding:0px'>
	<font size=2>
	[r:nameLink]

	
	<td bgcolor=#DCDCDC align=center valign=middle style='margin:0px; padding:0px'>
	[r,if(isProf==0):"<span title='not proficient'>"][r:atklink][r,if(isProf==0):"*</span>"]

	
	<td bgcolor=#DCDCDC align=right valign=middle style='margin:0px; padding:0px'>
	<font size=2>
	[r:dmglink][r,if(versatile==1 || offHand==1 || otherType==1):"<br>"]
	[r,if(versatile==1):"<span title='two handed'>("+dmglink2+")</span>"][r,if(offHand==1):"<span title='off hand'>"+dmglink2+"*</span>"][r,if(otherType==1):"<span title='other sources'>"+dmglink2+"**</span>"]

}]

</table>





[h:color="8a61ae"]

[h:attributeList=getLibProperty("Attributes", "Lib:Character")]

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
<!-----------------SPELLS------------------->
[h:object="Spells"]
[h:obj=getLibProperty(object,"Lib:"+tokenName)]


[h,if(json.type(obj)=="UNKNOWN"):"";objList=json.fields(obj)]
[h,if(json.type(obj)=="UNKNOWN"):repeat=0;repeat=listcount(objList)]


[h:currentObj=""]
[h:showSpell=""]
[h,count(repeat,""),code:{
	[h:name=listget(objList,roll.count)]
	[h:currentObj=json.get(obj,name)]
	[h:prep=json.get(currentObj,"prep")]
	[h:customAtr=json.get(currentObj,"customAtr")]
	[h:bonusDmg=json.get(currentObj,"bonusDmg")]
	[h:bonusDmg=if(bonusDmg=="",0,bonusDmg)]
	[h:atrValue=getStrProp(getLibProperty(customAtr,"Lib:"+tokenName),"value")]
	[h,if(atrValue==""):"";atrValue=eval(string(atrValue))]
	[h,if(isNumber(atrValue)==1):atrMod=floor(atrValue/2-5);atrMod=-5]
	
	[h:showSpell=if(prep==1,listappend(showSpell,name),showSpell)]
}]
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
[r,count(repeat,""),code:{

	[h:name=listget(classList,roll.count)]
	[h:object=json.get(classes,name)]
	[h:class=json.get(object,"name")]
	[h:level=json.get(object,"level")]


	[h:totalLevel=totalLevel+level]
<!-----------------SPELLCASTING CLASS------------------->	
	[h:spellAtr=json.get(object,"spellcasting")]
	
	[h,if(spellAtr=="-"):"";spellClassList=listappend(spellClassList,name," /")]


}]
[h:SpellcasterLevel=0]
[h,count(listcount(spellClassList,"/"),""),code:{

	[h:name=listget(spellClassList,roll.count,"/")]
	[h:object=json.get(classes,name)]
	[h:level=json.get(object,"level")]
	[h:SpellcasterLevel=SpellcasterLevel+level]
}]

<!-----------------ABILITY------------------->

[h:spellAtributeList=""]
[h,count(listcount(spellClassList," /")),code:{

	[h:spellClass=listget(spellClassList,roll.count,"/")]
	[h:spellObj=json.get(classes,spellClass)]
	[h:spellAtribute=json.get(spellObj,"spellcasting")]
	[h:spellAtributeList=listappend(spellAtributeList,spellAtribute," /")]
	[h:isDuplicate=listfind(spellAtributeList,spellAtribute," /")]
	[h,if(isDuplicate==-1):"";spellAtributeList=listdelete(spellAtributeList,isDuplicate+1," /")]

}]
[h:spellAtributeList=listdelete(spellAtributeList,listfind(spellAtributeList,"","/")," /")]

<!-----------------DC------------------->

[h:listDC=""]
[h,count(listcount(spellAtributeList," /")," /"),code:{

	[h:spellmod=listget(spellAtributeList,roll.count,"/")]
	[h:atrVar=lower(substring(spellmod,0,3))]
	[h:atrVar=eval(atrVar)]
	[h:spellDC=8+profBonus+atrVar]


	[h:linkDC="<span title='"+spellmod+"'>"+macroLink(spellDC,"character/Dice Roller@this","","text=Spell Save DC;value="+spellDC+";tokenName="+tokenName)+"</span>"]

	[h:listDC=listappend(listDC,linkDC," /")]
}]



<table style="padding:0px; margin:0px"><tr><td style="padding:0px; margin:0px" valign=bottom>
<font size=2>

[r,if(listDC==""):"";"<b>DC:</b> "+listDC]




<td style="padding:0px; margin:0px" valign=top align=center><font size=2>

[r:macrolink("<span title='Load Weapons'>Weapons</span>", "character/Get Weapons@this")"","profBonus="+profBonus+";tokenName="+tokenName)]

<td  valign=bottom align=right style="padding:0px; margin:0px"><font size=2>

<!-----------------ATK BONUS------------------->

[h:atkList=""]
[h,count(listcount(spellAtributeList," /")," /"),code:{

	[h:spellmod=listget(spellAtributeList,roll.count,"/")]
	[h:atrVar=lower(substring(spellmod,0,3))]
	[h:atrVar=eval(atrVar)]
	[h:spellAtk=profBonus+atrVar]
	
	[h:atkList="<span title='"+spellmod+"'>"+listappend(atkList,macroLink(if(spellAtk<0,spellAtk,"+"+spellAtk),"character/d20 Roller@this","","text="+substring(listget(spellAtributeList,roll.count," /"),0,3)+" Spell Attack;value=+"+if(spellAtk<0,spellAtk,"+"+spellAtk)+";tokenName="+tokenName+";color=8a61ae")," /")+"</span>"]
}]


[r,if(atkList==""):"";"<b>ATK:</b> "+atkList]

</table>

[h:Slots=getLibProperty("Slots","Lib:"+tokenName)]
[h:SlotList=""]
[h,count(9),code:{

	[h:total=getStrProp(Slots,"total"+number(roll.count+1))]
	[h,if(total==0 || total==""):"";SlotList=listappend(SlotList,number(roll.count+1))]
}]

<table width=100% style="padding:0px; margin:0px">

[r,if(listcount(SlotList)==0):"";"<tr>"]

[r,count(listcount(SlotList),""),code:{

	<td align=center style="padding:0px; margin:0px">

	[h:currentSlot=listget(SlotList,roll.count)]

	[h:value=getStrProp(Slots,"value"+currentSlot)]
	[h:total=getStrProp(Slots,"total"+currentSlot)]

	[h,if(isNumber(total)==0):total=0]
	[h,if(isNumber(value)==0):value=0]
	[h:remaining=total-value]

	<font size=2 [r:if(remaining<=0,"color=silver","")]>

	<span title="[r:value]/[r:total]">
	
	[r:macrolink("lv:<b>"+currentSlot+"</b>", "character/Change Slots@this")"","level="+currentSlot+";tokenName="+tokenName)]
	
	</span>
	

}]

</table>

[r,count(listcount(showSpell),","),code:{
	[h:name=listget(showSpell,roll.count)]
	[h:objData=json.get(obj,name)]
	[h:source=json.get(objData,"source")]
<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=function.Capitalize(name)]


	[r:macrolink(CapitalName,"character/Args Dialog@this","","prop=Spells;index="+roll.count+";name="+name+";source="+source+";description=;tokenName="+tokenName)]

}]
[r:if(showspell=="","","<br>")]
