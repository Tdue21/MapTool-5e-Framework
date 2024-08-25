[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:profBonus=getStrProp(macro.args,"profBonus")]

[h:id=findToken(tokenName)]
[h,if(id==""):"";switchToken(id)]



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


[h:noWeapons=""]
[h:weaponList=""]
[h:obj=getLibProperty("Equipment","Lib:"+tokenName)]
[h,if(json.type(obj)=="UNKNOWN"),code:{

	[h:list=""]

};{
	
	[h:list=json.fields(obj)]
	[h,count(listcount(list)),code:{
		[h:currentName=listget(list,roll.count)]
		[h:currentObj=json.get(obj,currentName)]

		[h:isProf=json.get(currentObj,"isProf")]
		[h:Quantity=json.get(currentObj,"Quantity")]
		[h:ammo=json.get(currentObj,"ammo")]
		[h:Equiped=json.get(currentObj,"Equiped")]
		[h:offHand=json.get(currentObj,"offHand")]
		[h:customName=json.get(currentObj,"customName")]
		[h:bonusAtk=json.get(currentObj,"bonusAtk")]
		[h:bonusDmg=json.get(currentObj,"bonusDmg")]
		[h:identified=json.get(currentObj,"identified")]

		[macro("Get Equipment Info@Lib:Character"):"group=Equipment;name="+currentName]
		[h:equipInfo=macro.return]
		
		[h:currentObj=json.fromStrProp(equipInfo+";Quantity="+Quantity+";ammo="+ammo+";Equiped="+Equiped+";offHand="+offHand+";customName="+customName+";bonusAtk="+bonusAtk+";bonusDmg="+bonusDmg+";identified="+identified)]

		[h:obj=json.set(obj,currentName,currentObj)]
		[h:setLibProperty("Equipment",obj,"Lib:"+tokenName)]
		
		[h:isWeapon=json.get(currentObj,"isWeapon")]
		[h,if(isWeapon==0 || isWeapon==""):"";weaponList=listappend(weaponList,currentName)]
	}]
}]

[h:list=weaponList]

[h:list=listSort(list,"N")]

[h:repeat=listcount(list)]

[h:strValue=getStrProp(getLibProperty("Strength","Lib:"+tokenName),"value")]
[h,if(strValue==""):"";strValue=eval(string(strValue))]
[h:dexValue=getStrProp(getLibProperty("Dexterity","Lib:"+tokenName),"value")]
[h,if(dexValue==""):"";dexValue=eval(string(dexValue))]

[h,if(isNumber(strValue)==1):strMod=floor(strValue/2-5);strMod=-5]
[h,if(isNumber(dexValue)==1):dexMod=floor(dexValue/2-5);dexMod=-5]

[h:EquipLib=getLibProperty("Equipment", "Lib:Compendium")]

[h,if(json.type(EquipLib)=="UNKNOWN"):EquipLib="{}";""]

[h:WeaponObj=""]
[r,if(json.type(obj)=="UNKNOWN"),count(repeat,""),code:{};{

	[h:name=listGet(list,roll.count)]
	[h:object=json.get(obj,name)]

	[h:currentCount=roll.count]

	
	

	[h:equiped=json.get(object,"Equiped")]
	[h:offHand=json.get(object,"offHand")]
	[h:customName=json.get(object,"customName")]
	[h:ammo=json.get(object,"ammo")]
	[h:identified=json.get(object,"identified")]
	[h:bonusAtk=json.get(object,"bonusAtk")]
	[h:bonusAtk=if(bonusAtk=="",0,bonusAtk)]
	[h:bonusAtk=evalMacro("[macro('Find Mod@Lib:Character'):'tokenName='+tokenName+';currentMod='+bonusAtk]")]
	[h:bonusDmg=json.get(object,"bonusDmg")]
	[h:bonusDmg=if(bonusDmg=="",0,bonusDmg)]
	[h:equipObj=json.get(EquipLib,name)]
	[h,if(json.type(equipObj)=="UNKNOWN"):objDescription="{}";objDescription=json.get(equipObj,"description")]

	[h:versatile=matches(encode(objDescription),".*[Vv]ersatile.*")]

	[h:weaponStats=setStrProp("","versatile",versatile)]
	[h:weaponStats=setStrProp(weaponStats,"offHand",offHand)]

	[h:findId=strfind(objDescription,'(?<!!)\\[(.*?)\\]\\([Rr][Oo][Ll]{2}\\s"(.*?)"\\)')]



	
	[h:repeat=getFindCount(findId)]
	[h:repeat=if(repeat>1,1,repeat)]
	[h:repeat=repeat+versatile]
	[h:repeat=if(equiped==0,0,repeat)]
	[h:noWeapons=noWeapons+repeat]

<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=function.Capitalize(name)]


	[h:nameDisplay=if(customName=="" || customName==0,CapitalName,customName)]
	
	[h:nameLink=macrolink(nameDisplay,"Args Dialog@Lib:Character","","prop=Equipment;index="+roll.count+";name="+name+";customName="+customName+";identified="+identified+";description=;tokenName="+tokenName)]


	[h:weaponStats=setStrProp(weaponStats,"nameLink",nameLink)]

	
	[r,count(repeat,""),code:{
		[h:newEntry=roll.count]


		[r:if(newEntry==0,"<tr>","")]
		
		[r:if(newEntry==0,"<td bgcolor=#DCDCDC valign=middle style='margin:0px; padding:0px'>","")]

		<font size=2>
		[r:if(newEntry==0,nameLink,"")]



		[h:rangedAtk=matches(encode(objDescription),".*[Rr]anged\\+[Ww]eapon.*")]
		[h:finesseAtk=matches(encode(objDescription),".*[Ff]inesse\\..*")]

		[h:weaponStats=setStrProp(weaponStats,"range",if(rangedAtk==1,"Ranged Weapon","Melee Weapon"))]


		[h:bonusId=strfind(object,"([+-]\\d+)\\s.{0,10}?attack")]
		[h,if(getFindCount(bonusId)==0):magicBonus=0;magicBonus=getGroup(bonusId,1,1)]



		[h:matchDescription=objDescription]
		[h:matchDescription=add(name,matchDescription)]
		[h:matchDescription=lower(replace(matchDescription,"\\s",""))]
		[h:matchString=lower(getStrProp(getLibProperty("Weapon Proficiency","Lib:"+tokenName),"value"))]
		[h:matchString=replace(matchString,"\\.","")]
		[h:matchString=replace(matchString,"(?<![Hh])and",",")]
		[h:matchString=replace(matchString,",\\s*,",",")]
		[h:matchString=replace(matchString,"\\s","")]

		[h:isProf=0]
		[h,count(listcount(matchString)):isProf=add(isProf,matches(matchDescription,".*"+substring(listget(matchString,roll.count),1,length(listget(matchString,roll.count))-2)+".*"))]

		[h,if(matches(name,".*[Mm]artial [Aa]rts.*")==1):isProf=1]


		[h:atkMod=if(finesseAtk==1,max(strMod,dexMod),if(rangedAtk==1,dexMod,strMod))+magicBonus]

		[h:atkMod=if(isProf>0,atkMod+profBonus+bonusAtk,atkMod+bonusAtk)]

		[h,if(ammo=="" || ammo==0):
		atklink=macroLink(if(atkMod<0,atkMod,"+"+atkMod),"d20 Roller@Lib:Character","","text="+name+";value=+"+if(atkMod<0,atkMod,"+"+atkMod)+";tokenName="+tokenName+";color=red;name="+name+";customName="+customName+";group=Equipment");
		atkLink=macroLink(if(atkMod<0,atkMod,"+"+atkMod),"Ammo Attack@Lib:Character","","text="+name+";value=+"+if(atkMod<0,atkMod,"+"+atkMod)+";tokenName="+tokenName+";color=red;ammo="+ammo+";name="+name+";customName="+customName+";group=Equipment")]


		[h:weaponStats=setStrProp(weaponStats,"atklink",atklink)]

		[r:if(newEntry==0,"<td bgcolor=#DCDCDC align=center valign=middle style='margin:0px; padding:0px'>","")]
		


		[r:if(newEntry==0,atklink,"")][r,if(newEntry==0):if(isProf==0,"<span title='not proficient'><font size=2>*</span>","")]

		[h:weaponStats=setStrProp(weaponStats,"isProf",isProf)]

		[r:if(newEntry==0,"<td bgcolor=#DCDCDC align=right valign=middle style='margin:0px; padding:0px'>","")]

	
		
		[h:group1=getGroup(findId,newEntry+1,1)]	
		[h:group2=getGroup(findId,newEntry+1,2)+if(bonusDmg=="" || bonusDmg==0,"","+"+bonusDmg)]	

		[h:group2=replace(group2,"\\s","")]

		[h:modId=strfind(group2,"\\d*d\\d+[+-]*(.*?)[+-]*\\d*d\\d+|\\d*d\\d+[+-]*(.*)\$")]
		[h:currentMod=getGroup(modId,1,1)+getGroup(modId,1,2)]

		[h:totalMod=currentMod)]
		[h:offHandMod=replace(currentMod,"[a-zA-Z|\\s]","")]

		[h:evalMod=evalMacro("[macro('Find Mod@Lib:Character'):'tokenName='+tokenName+';currentMod='+totalMod]")]
		[h:evalOff=evalMacro("[macro('Find Mod@Lib:Character'):'tokenName='+tokenName+';currentMod='+offHandMod]")]

		[h:group2mod=encode(group2)]
		[h:currentMod=encode(currentMod)]
		[h:group2mod=replace(group2mod,currentMod,evalMod)]
		[h:group2mod=decode(group2mod)]
		[h:group2mod=replace(group2mod,"\\+\$","")]
		[h:group2mod=replace(group2mod,"\\+0","")]
		[h:group2mod=replace(group2mod,"\\+-","-")]

		[h:group2Off=encode(group2)]
		[h:currentOff=encode(currentMod)]
		[h:group2Off=replace(group2Off,currentMod,evalOff)]
		[h:group2Off=decode(group2Off)]
		[h:group2Off=replace(group2Off,"\\+\$","")]
		[h:group2Off=replace(group2Off,"\\+0","")]
		[h:group2Off=replace(group2Off,"\\+-","-")]

		[h:dmglink=macroLink(group2mod,"Dice Roller@Lib:Character","","text="+group1+";value="+group2+";tokenName="+tokenName+";name="+name+";customName="+customName+";group=Equipment")]
		
		[h:dmglink2=macroLink(group2Off,"Dice Roller@Lib:Character","","text="+group1+";value="+group2Off+";tokenName="+tokenName+";name="+name+";customName="+customName+";group=Equipment")]

		[h,if(newEntry==0):weaponStats=setStrProp(weaponStats,"dmglink",dmglink);""]

		[h,if(newEntry==0):weaponStats=setStrProp(weaponStats,"dmglink2",dmglink2);weaponStats=setStrProp(weaponStats,"dmglink2",dmglink)]




		<font size=2>

		[r:if(repeat>1,if(newEntry==0,dmglink,if(offHand==1,"","<br> (<span title='two handed'>"+dmglink+"</span>)")),dmglink+if(offHand==1,"<br><span title='off hand attack'>"+dmglink2+"*</span>",""))]


		
	}]

	[h,if(equiped==0):"";WeaponObj=json.set(WeaponObj,name,json.fromStrProp(weaponStats))]
}]

[h:weaponStats=setStrProp("","nameLink","Unarmed Strike")]

[h:weaponStats=setStrProp(weaponStats,"versatile",0)]
[h:weaponStats=setStrProp(weaponStats,"offHand",0)]
[h:weaponStats=setStrProp(weaponStats,"isProf",1)]
[h:weaponStats=setStrProp(weaponStats,"range","Melee")]

[h:atkLink=macroLink(if(profBonus+strMod<0,eval(string(profBonus+strMod)),"+"+eval(string(profBonus+strMod))),"d20 Roller@Lib:Character","","text=Unarmed Strike;value=+"+if(profBonus+strMod<0,eval(string(profBonus+strMod)),"+"+eval(string(profBonus+strMod)))+";tokenName="+tokenName+";color=red")]

[h:weaponStats=setStrProp(weaponStats,"atklink",atkLink)]

[h:dmgLink=macroLink(1+strMod,"Dice Roller@Lib:Character","","text=1 + your Strength modifier;value=1+str;tokenName="+tokenName)]

[h:weaponStats=setStrProp(weaponStats,"dmglink",dmgLink)]

[h:CustomAtk=getLibProperty("Attacks","Lib:"+tokenName)]
[h:CustomAtk=listcount(json.fields(CustomAtk))]

[h,if(noWeapons==0 || noWeapons==""):noWeapons=if(CustomAtk==0,0,1);""]
[h,if(noWeapons==0 || noWeapons==""):WeaponObj=json.set(WeaponObj,"Unarmed Strike",json.fromStrProp(weaponStats));""]


</table>

[h:setLibProperty("Weapons",WeaponObj,"Lib:"+tokenName)]

[h,if(isFrameVisible(tokenName+" - Character Sheet")==1),code:{
[macro("Macro Frame@Lib:Character"):"macro=Character Sheet;tokenName="+tokenName]
};{}]