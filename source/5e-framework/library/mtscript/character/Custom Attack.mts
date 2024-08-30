[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:profBonus=getStrProp(macro.args,"profBonus")]
[h:name=getStrProp(macro.args,"name")]

[h:originalName=name]

[h:id=findToken(tokenName)]
[h,if(id==""):"";switchToken(id)]

[h:AttacksObj=getLibProperty("Attacks","Lib:"+tokenName)]

[h,if(name==""):obj="{}";obj=json.get(AttacksObj,name)]

[h:atkMod=json.get(obj,"atkMod")]
[h:atkDmg=json.get(obj,"atkDmg")]
[h:atkDmg1=json.get(obj,"atkDmg1")]
[h:atkDmg2=json.get(obj,"atkDmg2")]
[h:versatile=json.get(obj,"versatile")]
[h:offHand=json.get(obj,"offHand")]
[h:otherType=json.get(obj,"otherType")]
[h:isProf=json.get(obj,"isProf")]
[h:range=json.get(obj,"range")]
[h:ammo=json.get(obj,"ammo")]
[h:dmgType=json.get(obj,"dmgType")]


[h,if(atkMod==""):atkMod="str";""]
[h,if(atkDmg1=="" || atkDmg1==0):atkDmg1="1d4+str";""]
[h,if(dmgType=="" || dmgType==0):dmgType="Slashing";""]




[h:res=input("name|"+if(name=="","Attack",name)+"|Name",
"atkMod|"+atkMod+"|<html>Attack Roll Formula <span title='<html><table><tr><td>No attack<td>-<tr><td>Strength<td>str<tr><td>Dexterity<td>dex<tr><td>other bonuses<td>-1,1,2,etc</table></html>'>(<b>?</b>)</span></html>",
"isProf|"+if(isProf=="",1,isProf)+"|<html>Is Proficient <span title='adds proficiency bonus to attack rolls'>(<b>?</b>)</span></html>|check",
"atkDmg1|"+if(atkDmg1=="",1,atkDmg1)+"|<html>Primary Damage Formula <span title='base damage, 1 handed attack, etc...'>(<b>?</b>)</span></html>",
"atkDmg2|"+if(atkDmg2=="" || atkDmg2=="","-",atkDmg2)+"|<html>Secondary Damage Formula <span title='two handed attack, off hand attack, secondary effect, etc...'>(<b>?</b>)</span></html>",
"dmg2Type|none,Versatile,Off Hand,Other|<html>Secondary Damage Type <span title='Source of the secondary damage'>(<b>?</b>)</span></html>|radio|select="+if(versatile==1,1,if(offHand==1,2,if(otherType==1,3,0))),
"range|Melee Weapon,Ranged Weapon,Melee Spell,Ranged Spell|<html>Attack type <span title='Defines the attack type'>(<b>?</b>)</span></html>|list|value=string select="+listfind("Melee,Ranged",range),
"ammo|"+ammo+"|<html>Ammunition Type <span title='Defines ammunition to consume'>(<b>?</b>)</span></html>",
"dmgType|"+dmgType+"|<html>Damage Type <span title='Defines the damage type for the attack'>(<b>?</b>)</span></html>",
"remove|0|<html>Remove Attack <span title='Permanently remove the attack from this character'>(<b>?</b>)</span></html>|Check")]
[h:abort(res)]

[h:name=lower(name)]

[h:obj=json.set("","atkMod",atkMod)]
[h:obj=json.set(obj,"atkDmg1",atkDmg1)]
[h:obj=json.set(obj,"atkDmg2",atkDmg2)]
[h:obj=json.set(obj,"versatile",if(dmg2Type==1,1,0))]
[h:obj=json.set(obj,"offHand",if(dmg2Type==2,1,0))]
[h:obj=json.set(obj,"otherType",if(dmg2Type==3,1,0))]
[h:obj=json.set(obj,"isProf",isProf)]
[h:obj=json.set(obj,"range",range)]
[h:obj=json.set(obj,"ammo",ammo)]
[h:obj=json.set(obj,"dmgType",dmgType)]


<!---------------------Replace Atk----------------------->
[h:atkMod=evalMacro("[macro('character/Find Mod@this'):'tokenName='+tokenName+';currentMod='+atkMod]")]
[h,if(isProf==0 && atkMod=="-" || atkMod==""):"";atkMod=atkMod+if(isProf==1,profBonus,0)]
[h,if(atkMod=="-" || atkMod==""):atklink="-";atklink=macroLink(if(atkMod<0,atkMod,"+"+atkMod),if(ammo=="" || ammo==0,"character/d20 Roller@this","character/Ammo Attack@this"),"","text="+name+";value=+"+if(atkMod<0,atkMod,"+"+atkMod)+";tokenName="+tokenName+";color="+if(matches(range,".*Spell")==0,"red","8a61ae")+if(ammo=="" || ammo==0,"",";ammo="+ammo))]



<!---------------------Replace DMG 1----------------------->

[h:modId=strfind(atkDmg1,"\\d*d\\d+[+-]*(.*?)[+-]*\\d*d\\d+|\\d*d\\d+[+-]*(.*)\$")]
[h,if(getFindCount(modId)>=1):currentMod=getGroup(modId,1,1)+getGroup(modId,1,2);currentMod=atkDmg1]
[h:totalMod=currentMod)]
[h:evalMod=evalMacro("[macro('character/Find Mod@this'):'tokenName='+tokenName+';currentMod='+totalMod]")]
[h:group2mod=encode(atkDmg1)]
[h:currentMod=encode(currentMod)]
[h:group2mod=replace(group2mod,currentMod,evalMod)]
[h:group2mod=decode(group2mod)]
[h:group2mod=replace(group2mod,"\\+\$","")]
[h:group2mod=replace(group2mod,"\\+0","")]
[h:group2mod=replace(group2mod,"\\+-","-")]



[h:dmglink=macroLink(group2mod,"character/Dice Roller@this","","text="+atkDmg1+" "+listget(dmgType,0)+";value="+atkDmg1+";tokenName="+tokenName)]




<!---------------------Replace DMG 2----------------------->

[h:modId=strfind(atkDmg2,"\\d*d\\d+[+-]*(.*?)[+-]*\\d*d\\d+|\\d*d\\d+[+-]*(.*)\$")]
[h,if(getFindCount(modId)>=1):currentMod=getGroup(modId,1,1)+getGroup(modId,1,2);currentMod=atkDmg2]
[h:totalMod=currentMod)]
[h:evalMod=evalMacro("[macro('character/Find Mod@this'):'tokenName='+tokenName+';currentMod='+totalMod]")]
[h:group2mod=encode(atkDmg2)]
[h:currentMod=encode(currentMod)]
[h:group2mod=replace(group2mod,currentMod,evalMod)]
[h:group2mod=decode(group2mod)]
[h:group2mod=replace(group2mod,"\\+\$","")]
[h:group2mod=replace(group2mod,"\\+0","")]
[h:group2mod=replace(group2mod,"\\+-","-")]

[h:dmglink2=macroLink(group2mod,"character/Dice Roller@this","","text="+atkDmg2+" "+if(listcount(dmgType)>1,listget(dmgType,1),listget(dmgType,0))+";value="+atkDmg2+";tokenName="+tokenName)]


<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=function.Capitalize(name)]


[r:nameLink=macroLink(CapitalName,"character/Custom Attack@this","","profBonus="+profBonus+";tokenName="+tokenName+";name="+name)]

[h:obj=json.set(obj,"nameLink",nameLink)]
[h:obj=json.set(obj,"atklink",atklink)]
[h:obj=json.set(obj,"dmglink",dmglink)]
[h:obj=json.set(obj,"dmglink2",dmglink2)]

[h:AttacksObj=json.set(AttacksObj,name,obj)]
[h,if(remove==1):AttacksObj=json.remove(AttacksObj,name);""]
[h,if(originalName!=name):AttacksObj=json.remove(AttacksObj,originalName);""]

[h:setLibProperty("Attacks",AttacksObj,"Lib:"+tokenName)]

[h,if(isFrameVisible(tokenName+" - Character Sheet")==1),code:{
[macro("character/Macro Frame@this"):"macro=Character Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Statblock")==1),code:{
[macro("character/Macro Frame@this"):"macro=Statblock;tokenName="+tokenName]
};{}]