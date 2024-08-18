[h:attributeList=getLibProperty("Attributes", "Lib:Character")]
[h:skillList=getLibProperty("Skills", "Lib:Character")]



[h:outputPC=getLibProperty("PC Output", "Lib:Character")]
[h:outputGM=getLibProperty("GM Output", "Lib:Character")]


[h:output=if(isGM()==1,outputGM,outputPC)]

[h:start=getLibProperty("Start","Lib:Campaign")]

[h:tokenName=macro.args]

[h:id=findToken(tokenName)]

[h,if(id==""):"";switchToken(id)]

<table style="margin:0px;padding:0px">
<tr><td style="margin:0px;padding:0px">

<h3 style="padding: 0px;margin: 0px">[r,token(tokenName):tokenName=getLibProperty("LibName","Lib:"+tokenName)]</h3>







[h:classes=getLibProperty("Class&Level","Lib:"+tokenName)]
[h:totalLevel=0]
[h,if(json.type(classes)=="UNKNOWN"),code:{
	[h:classList=setLibProperty("Class&Level","{}","Lib:"+tokenName)]
	[h:repeat=0]
};{
	[h:classList=json.fields(classes)]	
	[h:repeat=listcount(classList)]
}]
[r,count(repeat,""),code:{

	[h:name=listget(classList,roll.count)]
	[h:object=json.get(classes,name)]
	[h:class=json.get(object,"name")]
	[h:level=json.get(object,"level")]
	[h:subclass=json.get(object,"subclass")]

	[h:totalLevel=totalLevel+level]
	

}]

[h:profBonus=ceil(totalLevel/4)+1]



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





<!-----------------RACE------------------->
[h:race=getLibProperty("Race","Lib:"+tokenName)]

[h:value=getStrProp(string(race),"value")]
[h:text=getStrProp(string(race),"text")]
<i>
[h:size=getSize(findToken("Lib:"+tokenName,start),start)]
[r:if(value=="",size+" humanoid",size+" humanoid ("+value+")")],

<!-----------------ALIGNMENT------------------->
[h:alignment=getLibProperty("Alignment","Lib:"+tokenName)]

[h:value=getStrProp(string(alignment),"value")]
[h:text=getStrProp(string(alignment),"text")]

[h:value=if(value==0,"",value)]

[r:if(value=="","alignment",value)]

</i>

<td width=0% align=right valign=top style="margin:0px;padding:0px">


[r:"<img src='"+getTokenImage(50,"Lib:"+tokenName,start)+"'>"]


</table>


<hr noshade>

<table>
<tr>
<td style="margin:0px;padding:0px">

<!-----------------AC------------------->
[h:AC=if(getLibProperty("AC","Lib:"+tokenName)=="",0,getLibProperty("AC","Lib:"+tokenName))]

[h:value=getStrProp(string(AC),"value")]
[h:text=getStrProp(string(AC),"text")]

[h:value=if(value=="",0,value)]

<b>
Armor Class
</b>
[r:totalValue=eval(string(value))]

[r:if(text=="" || text==0,"","("+text+")")]


<!-----------------HP------------------->
[h:CurrentHP=getLibProperty("Current Hit Points","Lib:"+tokenName)]
[h:TotalHP=getLibProperty("Total Hit Points","Lib:"+tokenName)]
[h:TempHP=getLibProperty("Temporary Hit Points","Lib:"+tokenName)]

[h:CurrentHP=if(CurrentHP=="",TotalHP,CurrentHP)]
<br>
	<b>	 
[r,if(TotalHP==""),code:{
	Hit Points
	};{
	[h:setLibProperty("HP",CurrentHP+"/"+TotalHP+if(TempHP<0," ("+TempHP+")",""),"Lib:"+tokenName)]
	
	Hit Points
	</b>
	[r:CurrentHP+"/"+TotalHP]
}]

<br>
<!-----------------SPEED------------------->
[h:Spd=if(getLibProperty("Speed","Lib:"+tokenName)=="","",getLibProperty("Speed","Lib:"+tokenName))]

[h:value=getStrProp(string(Spd),"value")]
[h:text=getStrProp(string(Spd),"text")]

[h:value=if(value=="","",value)]





<b>Speed</b>

[r:value+if(text=="" || text==0,"",", "+text)]




<td width=0% align=center valign=top style="margin:0px;padding:0px">
<!-----------------INITIATIVE------------------->
[h:init=getLibProperty("Initiative","Lib:"+tokenName)]

[h:value=dex+getStrProp(string(init),"value")]
[h:text=getStrProp(string(init),"text")]

[r:macroLink(if(value>0,"+"+value,value)+"<br><font size=2><b>INIT</b>","d20 Roller@Lib:Character","","text=Initiative"+if(text=="" || text==0,""," | "+text)+";value=+"+if(value<0,value,"+"+value)+";tokenName="+tokenName+";color=blue")]




</table>






<hr noshade>


<table>
<tr>
<!-----------------Attributes------------------->

[r,count(listcount(attributeList),""),code:{

	[h:attribute=listget(attributeList,roll.count)]
	[h:subStr=substring(lower(attribute),0,3)]
<td style="margin:0px; padding:0px;">

	<table>
	<tr>
	<td style="margin:0px; padding:0px;" align=center>
	


	[h:prop=getLibProperty(attribute,"Lib:"+tokenName)]
	
	[h:propValue=getStrProp(string(prop),"value")]
	[h:text=getStrProp(string(prop),"text")]
	
	[h:propValue=if(propValue=="",0,propValue)]
	
	[h:evalAtr=number(eval(string(propValue)))]

	[h:mod=getStrProp(AtrProps,subStr)]
	[h:modlink=macroLink(evalAtr+" ("+if(mod<0,mod,"+"+mod)+")","d20 Roller@Lib:Character","","text="+attribute+" check;value="+subStr+";tokenName="+tokenName+";color=0099cc")]


	<b>[r:substring(upper(attribute),0,3)]</b>
	
	<tr>
	<td style="margin:0px; padding:0px;" align=center>
	
	[r:modlink]





	
	</table>



}]
</table>
<hr noshade>
<b>Saving Throws</b>

<!-----------------Set Saves if empty------------------->

[h:SaveObject=getLibProperty("SavingTrows","Lib:"+tokenName)]
[h:array=json.fromList(attributeList)]
[h:object=""]
[h,if(json.type(SaveObject)=="UNKNOWN"),count(listcount(attributeList),"<br><br>"),code:{

	[h:currentAtr=listget(attributeList,roll.count)]
	[h:object=json.set(object,"name",currentAtr)]
	[h:object=json.set(object,"prof",0)]
	[h:object=json.set(object,"other",0)]
	[h:array=json.set(array,roll.count,object)]

};{}]

[h,if(json.type(SaveObject)=="UNKNOWN"),code:{

	[h:setProperty("SavingTrows",array)]
	[h:SaveObject=array]

};{}]



<!-----------------Saves------------------->
[h:firstItem=0]
[h:repeat=listcount(json.fields(SaveObject))]
[r,count(repeat,""),code:{
	
	
	[h:object=json.get(SaveObject,roll.count)]
	[h:name=json.get(object,"name")]
	[h:prof=json.get(object,"prof")]
	[h:other=json.get(object,"other")]
	[h:profDisplay=if(prof==0,"O",if(prof==1,"<b>X","<b>E"))]

	[h:atrValue=getStrProp(getLibProperty(name,"Lib:"+tokenName),"value")]
	[h:atrValue=if(atrValue=="",0,atrValue)]
	[h,if(isNumber(atrValue)==0):atrValue=eval(atrValue);""]
	[h:mod=if(isNumber(atrValue)==0,0,atrValue)]
	[h:mod=floor(mod/2-5)]
	[h:bonusDisplay=mod+(profBonus*prof)+other]

	[h,if(roll.count==0):last=0;last=json.get(SaveObject,roll.count-1)]
	[h,if(roll.count==0):"";last=json.get(object,"prof")]
	[r:if(last==0,"",",")]
	
	[r:if(prof==0,"",substring(name,0,3))]

	[r:if(prof==0,"",macroLink(if(bonusDisplay<0,bonusDisplay,"+"+bonusDisplay),"d20 Roller@Lib:Character","","text="+name+" save;value=+"+if(bonusDisplay<0,bonusDisplay,"+"+bonusDisplay)+if(other==0,"",if(other<0,other,"+"+other))+";id="+id+";tokenName="+tokenName+";color=ff9900"))]
	

	[r:if(prof==0,"",if(other==0,"",if(other>0,"+","-")))]



}]
<br>
<b>Skills</b>




<!-----------------Set Skills if empty------------------->
[h:SkillObject=getLibProperty("Skills","Lib:"+tokenName)]
[h:array=json.fromList(skillList,";")]
[h:object=""]
[h,if(json.type(SkillObject)=="UNKNOWN"),count(countStrProp(skillList),"<br><br>"),code:{

	[h:skillName=indexKeyStrProp(skillList,roll.count)]
	[h:skillAttribute=indexValueStrProp(skillList,roll.count)]
	[h:object=json.set(object,"name",skillName)]
	[h:object=json.set(object,"prof",0)]
	[h:object=json.set(object,"attribute",skillAttribute)]
	[h:object=json.set(object,"other",0)]
	[r:array=json.set(array,roll.count,object)]

	

};{}]

[h,if(json.type(SkillObject)=="UNKNOWN"),code:{

	[h:setProperty("Skills",array)]
	[h:SkillObject=array]

};{}]


<!-----------------Skills------------------->

[h:modList=""]
[h:repeat=listcount(json.fields(SkillObject))]
[r,count(repeat,""),code:{

	[h:object=json.get(SkillObject,roll.count)]
	[h:skillName=json.get(object,"name")]
	[h:prof=json.get(object,"prof")]
	[h:other=json.get(object,"other")]
	[h:half=json.get(object,"half")]
	[h:half=if(half=="",0,half)]
	[h:skillAttribute=json.get(object,"attribute")]
	[h:atrValue=getStrProp(getLibProperty(skillAttribute,"Lib:"+tokenName),"value")]
	[h:atrValue=if(atrValue=="",0,atrValue)]
	[h,if(isNumber(atrValue)==0):atrValue=eval(atrValue);""]
	[h:mod=if(isNumber(atrValue)==0,0,atrValue)]
	[h:mod=floor(mod/2-5)]
	
	[h:bonus=if(prof==0,if(half==1,floor(profBonus/2),if(half==2,ceil(profBonus/2),profBonus*prof)),profBonus*prof)]
	
	[h:skillBonus=mod+bonus]
	[h:atr=upper(substring(skillAttribute,0,3),1)]
	[h:bonusDisplay=number(skillBonus+other)]
	[h:profDisplay=if(prof==0,if(half==0,"O","J"),if(prof==1,"<b>X","<b>E"))]


	[h,if(roll.count==0):last=0;last=json.get(SkillObject,roll.count-1)]
	[h,if(roll.count==0):"";last=json.get(object,"prof")]
	[r:if(last==0,"",",")]

	[r:if(prof==0,"",skillName)]

	[r:if(prof==0,"",macroLink(if(bonusDisplay<0,bonusDisplay,"+"+bonusDisplay),"d20 Roller@Lib:Character","","text="+atr+" ("+skillName+");value=+"+if(skillBonus<0,skillBonus,"+"+skillBonus)+if(other==0,"",if(other<0,other,"+"+other))+";id="+id+";tokenName="+tokenName+";color=0099cc"))]


	[h:atr=if(skillAttribute==getStrProp(skillList,skillName),atr,"<font color=red>"+atr+"</font>")]


	[r:if(prof==0,"",if(other==0,"",if(other>0,"+","-")))]


	[h:modList=listappend(modList,bonusDisplay)]


}]
<br>

<!---------------------------Special Defenses----------------------------->
[h:rules=getLibProperty("Value","Lib:Rules")]
[h:defObj=getLibProperty("Defenses","Lib:"+tokenName)]

[h,if(json.type(defObj)=="OBJECT"),code:{

	
	[h:resistance=lower(json.get(defObj,"resistance"))]
	[h:immunity=lower(json.get(defObj,"immunity"))]
	[h:vulnerability=lower(json.get(defObj,"vulnerability"))]
	[h:condition=lower(json.get(defObj,"condition"))]

	[h,count(listcount(condition)),code:{
	
		[h:currentCondition=listget(condition,roll.count)]
		[h:ConditionText=json.get(rules,capitalize(currentCondition))]
		[h,if(ConditionText!=""):currentCondition=macroLink(currentCondition,"Content@Lib:Notebook","","key="+capitalize(currentCondition)+";description="+encode(ConditionText)+";tokenName=Lib:Rules")]
		[h,if(ConditionText!=""):condition=listReplace(condition,roll.count,currentCondition)]
	
	}]
	

	[h:resText="<b>Damage Resistances</b> "+resistance]
	[h:immText="<b>Damage Immunities</b> "+immunity]
	[h:vulText="<b>Damage Vulnerabilities </b>"+vulnerability]
	[h:conText="<b>Condition Immunities </b>"+condition]


};{

	[h:resistance=""]
	[h:immunity=""]
	[h:vulnerability=""]
	[h:condition=""]
}]

[r,if(resistance==0 || resistance==""):"";resText+"<br>"]
[r,if(immunity==0 || immunity==""):"";immText+"<br>"]
[r,if(vulnerability==0 || vulnerability==""):"";vulText+"<br>"]
[r,if(condition==0 || condition==""):"";conText+"<br>"]

<b>Senses</b>
[h:sight=getSightType("Lib:"+tokenName,start)]
[h:darkvision=matches(sight,"Darkvision")]
[r:if(darkvision==1,"darkvision 60 ft.,","")]
[h:SuperiorDV=matches(sight,"Superior Darkvision")]
[r:if(SuperiorDV==1,"darkvision 120 ft.,","")]

passive Perception [r:getLibProperty("Passive Perception","Lib:"+tokenName)]

<br>
[h:LanguageProf=getLibProperty("Language Proficiency","Lib:"+tokenName)]
[h:value=getStrProp(string(LanguageProf),"value")]
[h:text=getStrProp(string(LanguageProf),"text")]
<b>Languages</b> [r:value]

<hr noshade>

<p>
<!-----------------FEATS------------------->
[h:object="Feats"]

[h:obj=getLibProperty(object,"Lib:"+tokenName)]
[h,if(json.type(obj)=="UNKNOWN"):objList="";objList=json.fields(obj)]
[h,if(json.type(obj)=="UNKNOWN"):repeat=0;repeat=listcount(json.fields(obj))]




[h,if(json.type(obj)=="UNKNOWN"):objList="";objList=json.fields(obj)]
[h,if(json.type(obj)=="UNKNOWN"):repeat=0;repeat=listcount(json.fields(obj))]

<b>Features.</b>

[r,count(repeat,","),code:{

	[h:objName=listGet(objList,roll.count)]
	[h:source=json.get(obj,objName)]

<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=function.Capitalize(objName)]

	[r:macrolink(if(CapitalName=="","Untitled",CapitalName),"Args Dialog@Lib:Character","","prop="+object+";index="+roll.count+";name="+objName+";description=;tokenName="+tokenName)]


}][r:if(repeat==0,"",".")]

</p>
<!-----------------ADDITIONAL FEATURES------------------->
[h:object="AdditionalFeats"]

[h:obj=getLibProperty(object,"Lib:"+tokenName)]
[h,if(json.type(obj)=="UNKNOWN"):objList="";objList=json.fields(obj)]
[h,if(json.type(obj)=="UNKNOWN"):repeat=0;repeat=listcount(json.fields(obj))]



[h,if(json.type(obj)=="UNKNOWN"):objList="";objList=json.fields(obj)]
[h,if(json.type(obj)=="UNKNOWN"):repeat=0;repeat=listcount(json.fields(obj))]

[r,if(repeat==0):"";"<p><b>Additional Features.</b>"]

[r,count(repeat,","),code:{

	[h:objName=listGet(objList,roll.count)]

<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=function.Capitalize(objName)]


	[r:macrolink(if(CapitalName=="","Untitled",CapitalName),"Args Dialog@Lib:Character","","prop="+object+";index="+roll.count+";name="+objName+";description=;tokenName="+tokenName)]


}][r,if(repeat==0):"";".</p>"]


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

<!-----------------DC------------------->
[h:listDC=""]
[h,count(listcount(spellAtributeList," /")),code:{

	[h:spellmod=listget(spellAtributeList,roll.count,"/")]
	[h:atrVar=lower(substring(spellmod,0,3))]
	[h:atrVar=eval(atrVar)]
	[h:spellDC=8+profBonus+atrVar]
	

	[r:linkDC=macroLink(spellDC,"Dice Roller@Lib:Character","","text=Spell Save DC;value="+spellDC+";tokenName="+tokenName)]

	[h:listDC=listappend(listDC,linkDC," /")]
}]

<!-----------------ATK BONUS------------------->


[h:atkList=""]
[h,count(listcount(spellAtributeList," /")," /"),code:{

	[h:spellmod=listget(spellAtributeList,roll.count,"/")]
	[h:atrVar=lower(substring(spellmod,0,3))]
	[h:atrVar=eval(atrVar)]
	[h:spellAtk=profBonus+atrVar]
	
	[h:atkList=listappend(atkList,macroLink(if(spellAtk<0,spellAtk,"+"+spellAtk),"d20 Roller@Lib:Character","","text="+substring(listget(spellAtributeList,roll.count," /"),0,3)+" Spell Attack;value=+"+if(spellAtk<0,spellAtk,"+"+spellAtk)+";tokenName="+tokenName+";color=8a61ae")," /")]
}]

[h:ordinal=if(SpellcasterLevel==1,"st",if(SpellcasterLevel==2,"nd",if(SpellcasterLevel==3,"rd","th")))]

[r,if(SpellcasterLevel==0),code:{};{
<p style="margin-top: 3px; margin-bottom: 6px">

	<b>Spellcasting.</b> [r:tokenName] is a [r:SpellcasterLevel][r:ordinal] level spellcaster. Its spellcasting ability is [r:spellAtributeList] (spell save DC <span title='Display DC'>[r:listDC]</span>, <span title='Roll Spell Attack'>[r:atkList]</span> to hit with spell attacks). [r:tokenName] has the following [r:spellClassList] spells available:

</p>
}]
<!-----------------SPELLS------------------->
[h:object="Spells"]

[h:obj=getLibProperty(object,"Lib:"+tokenName)]
[h,if(json.type(obj)=="UNKNOWN"):objList="";objList=json.fields(obj)]
[h,if(json.type(obj)=="UNKNOWN"):repeat=0;repeat=listcount(json.fields(obj))]


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

[h:level0=listSort(level0,"N")]

[h:repeat=listcount(level0)]


[r,if(repeat==0):"";"<p>Cantrips (at will):"]


[r,count(repeat,","),code:{
	[h:objName=listGet(level0,roll.count)]
	[r:macrolink(objName,"Args Dialog@Lib:Character","","prop=Spells;source="+object+";name="+objName+";description=;tokenName="+tokenName)]
}]

	
[r,if(repeat==0):"";"</p>"]

[macro("Spell List@Lib:Character"):"profBonus="+profBonus+";level=1;list="+level1+";tokenName="+tokenName]
[macro("Spell List@Lib:Character"):"profBonus="+profBonus+";level=2;list="+level2+";tokenName="+tokenName]
[macro("Spell List@Lib:Character"):"profBonus="+profBonus+";level=3;list="+level3+";tokenName="+tokenName]
[macro("Spell List@Lib:Character"):"profBonus="+profBonus+";level=4;list="+level4+";tokenName="+tokenName]
[macro("Spell List@Lib:Character"):"profBonus="+profBonus+";level=5;list="+level5+";tokenName="+tokenName]
[macro("Spell List@Lib:Character"):"profBonus="+profBonus+";level=6;list="+level6+";tokenName="+tokenName]
[macro("Spell List@Lib:Character"):"profBonus="+profBonus+";level=7;list="+level7+";tokenName="+tokenName]
[macro("Spell List@Lib:Character"):"profBonus="+profBonus+";level=8;list="+level8+";tokenName="+tokenName]
[macro("Spell List@Lib:Character"):"profBonus="+profBonus+";level=9;list="+level9+";tokenName="+tokenName]

<h5 style="border-bottom: 2px solid">Actions</h5>


<!-----------------Attacks------------------->


[h:WeaponStats=getLibProperty("Weapons","Lib:"+tokenName)]
[h,if(json.type(WeaponStats)=="UNKNOWN"):WeaponStats="{}";""]

[h:CustomAtk=getLibProperty("Attacks","Lib:"+tokenName)]
[h,if(json.type(CustomAtk)=="UNKNOWN"):CustomAtk="{}";""]

[h:WeaponStats=json.merge(WeaponStats,CustomAtk)]

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
	[h:range=json.get(obj,"range")]

	[h:nameLink=replace(nameLink,"</a>",".</a>")]
	[h:atklink=replace(atklink,"OUTPUTPLACEHOLDER",output)]
	[h:dmglink=replace(dmglink,"OUTPUTPLACEHOLDER",output)]
	[h:dmglink2=replace(dmglink2,"OUTPUTPLACEHOLDER",output)]

	<p>

	<b><i>[r:nameLink]</b></i>

	<i>[r:range] Attack:</i>

	[r:atklink] to hit, one target.

	Hit: [r:dmglink] damage.

	[r,if(versatile==1):"Or "+dmglink2+" damage if used with both hands.";""]

	[r,if(offHand==1):"Or "+dmglink2+" damage if using as a secondary weapon.";""]

	[r,if(otherType==1):"Or "+dmglink2+" damage for other effects.";""]


	</p>
}]


<h5 style="border-bottom: 2px solid">Resources</h5>


[h:resourcesObj=getLibProperty("Resources","Lib:"+tokenName)]


[h,if(json.type(resourcesObj)=="UNKNOWN"):resourcesObj="{}";""]

[h:resourceList=json.fields(resourcesObj)]

<table>
<tr><td valign=top>
<table>

[r,count(listcount(resourceList),""),code:{

	[r:if(ceil(listcount(resourceList)/2)==roll.count,"</table><td valign=top><table>","")]
	<tr><td style="margin:0px;padding:0px">

	[h:name=listget(resourceList,roll.count)]
	[h:currentObj=json.get(resourcesObj,name)]
	[h:value=json.get(currentObj,"value")]
	[h:total=json.get(currentObj,"total")]
	[h:reset=json.get(currentObj,"reset")]
	
	<b><i>[r:name+"."]</b></i>
	
	[r:value][r:if(total==0 || total=="","","/"+total)]

}]
</table>
</table>





<!-----------------Reaction------------------->
<p style="margin-top: 3px; margin-bottom: 6px">
<b><i>Reaction.</b></i>
[r,if(id==""):"";if(getState("Reaction Used")==0,"Available","Used")]


<!-----------------BUFFS------------------->
<p style="margin-top: 3px; margin-bottom: 6px">
<b><i>Buffs.</b></i>

[h:buffs=getLibProperty("Buffs","Lib:"+tokenName)]

[r,if(json.type(buffs)=="UNKNOWN"),code:{};{


[h:buffsList=json.fields(buffs)]

[h:concentration=json.get(buffs,"concentration")]

[h,if(json.type(concentration)=="UNKNOWN"):concentration="";concentration=json.get(concentration,"name")]

[r:listreplace(buffsList,listfind(buffsList,"concentration"),concentration+"*")]

}]

<p style="margin-top: 3px; margin-bottom: 6px">
<!-----------------CONDITIONS------------------->
<b><i>Conditions.</b></i>
[r,if(id==""),code:{};{
[h:conditionList=""]
[h,if(getState("Dead")==1):conditionList=listappend(conditionList,"Dead");""]
[h,if(getState("Dying")==1):conditionList=listappend(conditionList,"Dying");""]
[h,if(getState("Blinded")==1):conditionList=listappend(conditionList,"Blinded");""]
[h,if(getState("Charmed")==1):conditionList=listappend(conditionList,"Charmed");""]
[h,if(getState("Deafened")==1):conditionList=listappend(conditionList,"Deafened");""]

[h,if(getState("Exhaustion 1")==1):conditionList=listappend(conditionList,"Exhaustion 1");""]
[h,if(getState("Exhaustion 2")==1):conditionList=listappend(conditionList,"Exhaustion 2");""]
[h,if(getState("Exhaustion 3")==1):conditionList=listappend(conditionList,"Exhaustion 3");""]
[h,if(getState("Exhaustion 4")==1):conditionList=listappend(conditionList,"Exhaustion 4");""]
[h,if(getState("Exhaustion 5")==1):conditionList=listappend(conditionList,"Exhaustion 5");""]
[h,if(getState("Exhaustion 6")==1):conditionList=listappend(conditionList,"Exhaustion 6");""]

[h,if(getState("Frightened")==1):conditionList=listappend(conditionList,"Frightened");""]
[h,if(getState("Grappled")==1):conditionList=listappend(conditionList,"Grappled");""]
[h,if(getState("Incapacitated")==1):conditionList=listappend(conditionList,"Incapacitated");""]
[h,if(getState("Invisible")==1):conditionList=listappend(conditionList,"Invisible");""]
[h,if(getState("Paralyzed")==1):conditionList=listappend(conditionList,"Paralyzed");""]
[h,if(getState("Petrified")==1):conditionList=listappend(conditionList,"Petrified");""]
[h,if(getState("Prone")==1):conditionList=listappend(conditionList,"Prone");""]
[h,if(getState("Restrained")==1):conditionList=listappend(conditionList,"Restrained");""]
[h,if(getState("Stunned")==1):conditionList=listappend(conditionList,"Stunned");""]
[h,if(getState("Unconscious")==1):conditionList=listappend(conditionList,"Unconscious");""]

[r:conditionList]
}]

<!-----------------NOTES------------------->


[h:key="Notes"]

[h,token("Lib:"+tokenName):description=getNotes("Lib:"+tokenName,start)]

<h5 style="border-bottom: 2px solid">
Notes
</h5>

[macro("Markdown@Lib:Character"):"tokenName="+tokenName+";description="+encode(description)]






[r,if(isGM()==1),code:{
	<!-----------------GM NOTES------------------->

	[h:key="GM Notes"]
	
	[h,token("Lib:"+tokenName):description=getGMNotes("Lib:"+tokenName,start)]
	<h5 style="border-bottom: 2px solid">
	[r:macroLink("GM Notes","Change Form@Lib:Character","","prop=GMNotes;name="+key+";description="+description+";tokenName="+tokenName)]
	</h5>
	
	[macro("Markdown@Lib:Character"):"tokenName="+tokenName+";description="+encode(description)]
	

	

};{}]



