[h:tokenName=macro.args]
[h:id=findToken(tokenName)]
[h:switchToken(id)]

[h:name=getProperty("CreatureName")]

[h,if(name==""):object=getProperty("Stats");object=json.get(getLibProperty("Bestiary","Lib:Compendium"),name)]

[h,if(json.type(object)=="UNKNOWN"):object="{}"]

[h:setProperty("Stats",object)]

[h:macroName="bestiary/Change Property@this"]
[h:args="name="+name+";json="+object+";tokenName="+token.name+";key="]
[h:output= function.getOutput())]

<!----------------------LOAD SETTINGS----------------------->
[h:settings=decode(json.get(object,"settings"))]




<!----------------------LOAD FEATS----------------------->
[h:group="feats"]
[h:CurrentObject=json.get(object,group)]
[h,if(json.type(CurrentObject)=="UNKNOWN"):CurrentObject="{}"]

[h:currentItem="Features"]
[h:currentDescription=json.get(CurrentObject,currentItem)]

[h:featureLink=macrolink("Features", "bestiary/Action Type@this")"","group="+group+";name="+currentItem+";tokenName="+tokenName+";object="+object)]


<!-----------------MENU------------------->

<p class='topbar'>
[r,if(isGM()==1):macrolink("Edit", "bestiary/Edit Creature@this")"none","creature="+name+";prop="+object)+"&nbsp;";""]
[r:macrolink("Settings", "bestiary/Edit@this")"","json="+encode(object)+";tokenName="+tokenName+";name="+name)] &nbsp;
[r:featureLink] &nbsp;
[r:macrolink("Info", "bestiary/Info@this")"","name="+name+";tokenName="+tokenName)] &nbsp;


[h:permissions=getLibProperty("PlayerPermission","Lib:Character")]
[h:sharePlayer=getStrProp(permissions,"share")]
[h,if(isGM()==1):sharePlayer=1]

[r,if(sharePlayer==1):macrolink("Share", "bestiary/Share@this")"none",json.get(object,"name"))]
</p>

<table style="margin:0px;padding:0px">
<tr><td style="margin:0px;padding:0px">
<!-----------------NAME------------------->
[h:crName=json.get(object,"name")]
[h:match1=matches(replace(lower(token.name),"\\s*\\d*",""),".*"+replace(lower(crName),"\\s*\\d*","")+".*")]
[h:match2=matches(lower(crName),".*"+replace(lower(token.name),"\\s*\\d*","")+".*")]
<h3 style="padding: 0px;margin: 0px">[r:macroLink(token.name+if(match1+match2>0,""," ("+crName+")"),macroName,"none",args+"name")]</h3>


<!-----------------CREATURE------------------->
<i>
[h:size=getSize()]
[h:type=json.get(object,"type")]
[r:macroLink(if(type=="",size,size+" "+type),macroName,"none",args+"type")],

[h:alignment=json.get(object,"alignment")]
[r:macroLink(if(alignment=="","alignment",alignment),macroName,"none",args+"alignment")]</i>


<td width=0% align=right valign=top style="margin:0px;padding:0px">

[r:"<img src='"+getTokenImage(50)+"'></img>"]

</table>


<hr noshade>

<table>
<tr>
<td style="margin:0px;padding:0px">
<!-----------------COMBAT------------------->
[h:AC=json.get(object,"ac")]
[h:setProperty("Armor Class",AC)]
<b>[r:macroLink("Armor Class",macroName,"none",args+"ac")]</b> [r:AC]
<br>
[h:hp=json.get(object,"hp")]
<b>[r:macroLink("Hit Points",macroName,"none",args+"hp")]</b>

[h:findId=strfind(hp,"\\((.*)\\)")]

[r,count(getFindCount(findId)),code:{
	[h:group1=getGroup(findId,roll.count+1,1)]
	[h:hpRollLink=macroLink(group1,"bestiary/Dice Roller@this","","text=HP Roll;value="+group1+";tokenName="+tokenName)]
	[h:hp=replace(hp,"\\((.*)\\)","("+hpRollLink+")",1)]
}]

[r:hp] |
[h:currentHP=getProperty("Hit Points")]
[r:macroLink(if(currentHP=="","+",currentHP),"bestiary/Damage@this",output,"value="+currentHP+";tokenName="+tokenName)]
<br>
[h:speed=json.get(object,"speed")]
<b>[r:macroLink("Speed",macroName,"none",args+"speed")]</b> [r:speed]

<td width=0% align=center valign=top style="margin:0px;padding:0px">

<!-----------------INITIATIVE------------------->
[h:dex=json.get(object,"dex")]
[h,if(isNumber(dex)==1):dex=floor(dex/2-5);dex=-5]

[r:macroLink(if(dex<=0,dex,"+"+dex)+"<br><font size=2><b>INIT</b>","bestiary/d20 Roller@this","","text=Initiative;value=+"+if(dex<0,dex,"+"+dex)+";tokenName="+token.name+";color=blue")]


</table>



<hr noshade>

<!-----------------ATTRIBUTES------------------->
<table>
<tr>

[h:attributes="str,dex,con,int,wis,cha"]

[r,count(listcount(attributes),""),code:{

	<td align=center valign=top width=[r:100/6]%>
	
	[h:atr=listget(attributes,roll.count)]
	[h:val=json.get(object,atr)]
	[h,if(isNumber(val)==1):mod=floor(val/2-5);mod=-5]
	[h:modtext=if(mod<0," ("+mod+")"," (+"+mod+")")]
	<b>[r:macroLink(upper(atr),"bestiary/Change Attributes@this","none","name="+name+";tokenName="+tokenName+";json="+object)]</b>
	<br>
	[r:macroLink(val+modtext,"bestiary/d20 Roller@this","","text="+upper(atr,1)+";value="+modtext+";tokenName="+token.name+";color=0099cc")]


}]

</table>


<hr noshade>

[h:save=json.get(object,"save")]
[h:show=if(save=="" || save==0,0,1)]
<b>[r,if(show==1):macrolink("Saving Throw", "bestiary/Skills and Saves@this")"",args+"save")]</b>
[r,if(show==1),count(listcount(save),""),code:{

	[r:if(roll.count==0,"",",")]
	[h:currentItem=listget(save,roll.count)]
	[r:text=replace(currentItem,"\\s[+-]?\\d*"," ")]
	[h:mod=replace(currentItem,text,"")]
	[r:macroLink(if(mod<0,mod,"+"+mod),"bestiary/d20 Roller@this","","text="+text+";value=("+if(mod<0,mod,"+"+mod)+");tokenName="+token.name+";color=ff9900")]

};{}]

[r,if(show==1):"<br>"]



[h:skill=json.get(object,"skill")]
[h:show=if(skill=="" || skill==0,0,1)]
<b>[r,if(show==1):macrolink("Skills", "bestiary/Skills and Saves@this")"",args+"skill")]</b>
[r,if(show==1),count(listcount(skill),""),code:{

	[r:if(roll.count==0,"",",")]
	[h:currentItem=listget(skill,roll.count)]
	[r:text=replace(currentItem,"\\s[+-]?\\d*"," ")]
	[h:mod=replace(currentItem,text,"")]
	[r:macroLink(if(mod<0,mod,"+"+mod),"bestiary/d20 Roller@this","","text="+text+";value=("+if(mod<0,mod,"+"+mod)+");tokenName="+token.name+";color=0099cc")]

};{}]

[r,if(show==1):"<br>"]

[h:DamageVulnerabilities=json.get(object,"DamageVulnerabilities")]
[h:show=if(DamageVulnerabilities=="" || DamageVulnerabilities==0,0,1)]
[h:DamageVulnerabilities=replace(DamageVulnerabilities,"SEMICOLONPLACEHOLDER",";")]
<b>[r,if(show==1):macroLink("Damage Vulnerabilities",macroName,"none",args+"DamageVulnerabilities")]</b>
[r,if(show==1):DamageVulnerabilities]
[r,if(show==1):"<br>"]


[h:DamageResistences=json.get(object,"DamageResistences")]
[h:show=if(DamageResistences=="" || DamageResistences==0,0,1)]
[h:DamageResistences=replace(DamageResistences,"SEMICOLONPLACEHOLDER",";")]
<b>[r,if(show==1):macroLink("Damage Resistences",macroName,"none",args+"DamageResistences")]</b>
[r,if(show==1):DamageResistences]
[r,if(show==1):"<br>"]


[h:DamageImmunities=json.get(object,"DamageImmunities")]
[h:show=if(DamageImmunities=="" || DamageImmunities==0,0,1)]
[h:DamageImmunities=replace(DamageImmunities,"SEMICOLONPLACEHOLDER",";")]
<b>[r,if(show==1):macroLink("Damage Immunities",macroName,"none",args+"DamageImmunities")]</b>
[r,if(show==1):DamageImmunities]
[r,if(show==1):"<br>"]

[h:ConditionImmunities=json.get(object,"ConditionImmunities")]
[h:show=if(ConditionImmunities=="" || ConditionImmunities==0,0,1)]
[h:ConditionImmunities=replace(ConditionImmunities,"SEMICOLONPLACEHOLDER",";")]
<b>[r,if(show==1):macroLink("Condition Immunities",macroName,"none",args+"ConditionImmunities")]</b>
[r,if(show==1):ConditionImmunities]
[r,if(show==1):"<br>"]

[h:senses=json.get(object,"senses")]
<b>[r:macroLink("Senses",macroName,"none",args+"senses")]</b> [r:senses]
<br>
[h:languages=json.get(object,"languages")]
<b>[r:macroLink("Languages",macroName,"none",args+"languages")]</b> [r:languages]
<br>
[h:challenge=json.get(object,"challenge"))]
<b>[r:macroLink("Challenge",macroName,"none",args+"challenge")]</b> [r:challenge]
<br>

[r:if(currentDescription=="","","<hr noshade>")]

<!-----------------FEATS------------------->



[h:group="feats"]
[h:CurrentObject=json.get(object,group)]
[h,if(json.type(CurrentObject)=="UNKNOWN"):CurrentObject="{}"]


[h:currentItem="Features"]
[h:currentDescription=json.get(CurrentObject,currentItem)]

[h:featureLink="Features"]

[macro("bestiary/Markdown@this"):"link="+featureLink+";tokenName="+tokenName+";description="+encode(currentDescription)]




<!-----------------ACTIONS------------------->


[h:group="actions"]
[h:CurrentObject=json.get(object,group)]
[h,if(json.type(CurrentObject)=="UNKNOWN"):CurrentObject="{}"]
[h:fields=json.fields(CurrentObject)]
[r,count(listcount(fields),""),code:{

	[h:currentItem=listget(fields,roll.count)]
	[h:currentDescription=json.get(CurrentObject,currentItem)]

	<h5 style="border-bottom: 2px solid">
	[r:link=macroLink(capitalize(currentItem),"bestiary/Change Form@this","","group="+group+";name="+currentItem+";tokenName="+tokenName+";description="+currentDescription)]
	</h5>
	
	[macro("bestiary/Markdown@this"):"link="+link+";tokenName="+tokenName+";description="+encode(currentDescription)]
}]

<!-----------------RESOURCES------------------->
<h5 style="border-bottom: 2px solid">
[r:macrolink("Resources", "bestiary/Change Resource@this")"","name=NEW RESOURCE;tokenName="+tokenName)]
</h5>



<!-----------------RESOURCES------------------->


[h:resourcesObj=getProperty("Resources")]
[h,if(json.type(resourcesObj)=="UNKNOWN"):resourcesObj="{}";""]

[h:resourceList=json.fields(resourcesObj)]
[h:resourceList=listSort(resourceList,"N")]

<table>
<tr><td valign=top>
<table>

[h:repeat=listcount(resourceList)]
[r,count(repeat,""),code:{

	[r:if(ceil(repeat/2)==roll.count,"</table><td valign=top><table>","")]
	<tr><td style="margin:0px;padding:0px">
	
	[h:name=listget(resourceList,roll.count)]
	[h:currentObj=json.get(resourcesObj,name)]
	[h:value=json.get(currentObj,"value")]
	[h:total=json.get(currentObj,"total")]

	<b><i>[r:macroLink(name+".","bestiary/Change Resource@this","","name="+name+";tokenName="+tokenName)]</i></b>
	[r:value][r:if(total==0 || total=="","","/"+total)]
}]
</table>
</table>




<p style="margin-top: 3px; margin-bottom: 6px">
<!-----------------REACTION------------------->
<b><i>[r:macrolink("Reaction.", "bestiary/Reaction@this")Output,"tokenName="+tokenName)]</b></i>
[r:if(getState("Reaction Used")==0,"Available","Used")]

</p>


<p style="margin-top: 3px; margin-bottom: 6px">
<!-----------------BUFFS------------------->

<b><i>[r:macrolink("Buffs.", "bestiary/Buffs@this")Output,"",tokenName)]</b></i>

[h:buffs=getProperty("Buffs")]

[r,if(json.type(buffs)=="UNKNOWN"),code:{};{


[h:buffsList=json.fields(buffs)]

[h:concentration=json.get(buffs,"concentration")]

[h,if(json.type(concentration)=="UNKNOWN"):concentration="";concentration=json.get(concentration,"name")]

[r:listreplace(buffsList,listfind(buffsList,"concentration"),concentration+"*")]

}]

<p style="margin-top: 3px; margin-bottom: 6px">
<!-----------------CONDITIONS------------------->
<b><i>[r:macrolink("Conditions.", "character/Conditions Menu@this")"","tokenName="+tokenName)]</b></i>

[r:function.GetConditions()]





[r,if(isGM()==1),code:{
	<!-----------------GM NOTES------------------->

	[h:key="GM Notes"]
	
	[h:description=getGMNotes()]
	<h5 style="border-bottom: 2px solid">
	[r:macrolink("GM Notes", "bestiary/Change Form@this")"","group=GMNotes;name="+key+";description="+description+";tokenName="+tokenName)]
	</h5>
	
	[macro("bestiary/Markdown@this"):"tokenName="+tokenName+";description="+encode(description)]
	

	

};{}]


<p>
<b>Sources:</b> [r:json.toList(json.get(object,"sources"))]
</p>