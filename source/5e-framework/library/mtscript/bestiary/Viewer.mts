[h:tokenName=macro.args]
[h:BestiaryObj=getLibProperty("Bestiary", function.getNamespace())]
[h:object=json.get(BestiaryObj,lower(tokenName))]
[h,if(json.type(object)=="UNKNOWN"):object="{}"]

[h:macroName="bestiary/Change Property@this"]
[h:args="name="+tokenName+";json="+object+";tokenName=;key="]
[h:output= function.getOutput())]

<!----------------------LOAD SETTINGS----------------------->
[h:settings=decode(json.get(object,"settings"))]

<!----------------------LOAD FEATS----------------------->
[h:group="feats"]
[h:CurrentObject=json.get(object,group)]
[h,if(json.type(CurrentObject)=="UNKNOWN"):CurrentObject="{}"]

[h:currentItem="Features"]
[h:currentDescription=json.get(CurrentObject,currentItem)]

[h:featureLink=macrolink("Features", "bestiary/Action Type@this", "","group="+group+";name="+currentItem+";tokenName="+tokenName+";object="+object)]

<!----------------------LOAD VARIANT----------------------->
[h:show=getStrProp(settings,"variant")]
[h,if(show==1),code:{
	[h:group="variant"]
	[h:CurrentObject=json.get(object,group)]
	[h,if(json.type(CurrentObject)=="UNKNOWN"):CurrentObject="{}"]
	
	[h:currentItem="Variant Rules"]
	[h:currentDescription=json.get(CurrentObject,currentItem)]
	
	[h:variantLink=macrolink("Variant", "bestiary/Change Form@this", "","group="+group+";name="+currentItem+";tokenName="+tokenName+";description="+currentDescription)]
};{}]

<table style="margin:0px;padding:0px">
	<tr>
		<td style="margin:0px;padding:0px">
		<!-----------------NAME------------------->
		[h:crName=json.get(object,"name")]
		<h3 style="padding: 0px;margin: 0px">[r:crName]</h3>

		<!-----------------CREATURE------------------->
<i>
[h:size=getStrProp(settings,"size")]
[h:type=json.get(object,"type")]
[r:if(type=="",size,size+" "+type)],

[h:alignment=json.get(object,"alignment")]
[r:if(alignment=="","alignment",alignment)]</i>


<td width=0% align=right valign=top style="margin:0px;padding:0px">


[h:assetField=json.get(object,"asset")]

[h,if(assetField==""):assProps="";assProps=getAssetProperties(assetField)]
[h,if(json.type(assProps)=="UNKNOWN"):assStatus="";assStatus=json.get(assProps,"status")]

[r,if(assStatus=="" || assStatus=="broken"):"";"<img src='"+assetField+"-50'></img>"]

</table>


<hr noshade>

<table>
<tr>
<td style="margin:0px;padding:0px">
<!-----------------COMBAT------------------->
[h:AC=json.get(object,"ac")]
<b>[r:"Armor Class"]</b> [r:AC]
<br>
[h:hp=json.get(object,"hp")]
<b>[r:"Hit Points"]</b>

[h:findId=strfind(hp,"\\((.*)\\)")]

[r,count(getFindCount(findId)),code:{
	[h:group1=getGroup(findId,roll.count+1,1)]
	[h:hpRollLink=group1]
	[h:hp=replace(hp,"\\((.*)\\)","("+hpRollLink+")",1)]
}]

[r:hp]

<br>
[h:speed=json.get(object,"speed")]
<b>[r:"Speed"]</b> [r:speed]

<td width=0% align=center valign=top style="margin:0px;padding:0px">

<!-----------------INITIATIVE------------------->
[h:dex=json.get(object,"dex")]
[h,if(isNumber(dex)==1):dex=floor(dex/2-5);dex=-5]

[r:if(dex<=0,dex,"+"+dex)]<br><font size=2><b>INIT</b>


</table>



<hr noshade>

<!-----------------ATTRIBUTES------------------->
<table>
<tr>

[h:atrList="str,dex,con,int,wis,cha"]

[r,count(listcount(atrList),""),code:{

	<td align=center valign=top width=[r:100/6]%>
	
	[h:atr=listget(atrList,roll.count)]
	[h:val=json.get(object,atr)]
	[h,if(isNumber(val)==1):mod=floor(val/2-5);mod=-5]
	[h:modtext=if(mod<0," ("+mod+")"," (+"+mod+")")]
	<b>[r:upper(atr)]</b>
	<br>
	[r:val+modtext]


}]

</table>


<hr noshade>


[h:save=json.get(object,"save")]
[h:show=if(save=="" || save==0,0,1)]
<b>[r,if(show==1):"Saving Throw"]</b>
[r,if(show==1),count(listcount(save),""),code:{

	[r:if(roll.count==0,"",",")]
	[h:currentItem=listget(save,roll.count)]
	[r:text=replace(currentItem,"\\s[+-]?\\d*"," ")]
	[h:mod=replace(currentItem,text,"")]
	[r:if(mod<0,mod,"+"+mod)]

};{}]

[r,if(show==1):"<br>"]



[h:skill=json.get(object,"skill")]
[h:show=if(skill=="" || skill==0,0,1)]
<b>[r,if(show==1):"Skills"]</b>
[r,if(show==1),count(listcount(skill),""),code:{

	[r:if(roll.count==0,"",",")]
	[h:currentItem=listget(skill,roll.count)]
	[r:text=replace(currentItem,"\\s[+-]?\\d*"," ")]
	[h:mod=replace(currentItem,text,"")]
	[r:if(mod<0,mod,"+"+mod)]

};{}]

[r,if(show==1):"<br>"]

[h:DamageVulnerabilities=json.get(object,"DamageVulnerabilities")]
[h:show=if(DamageVulnerabilities=="" || DamageVulnerabilities==0,0,1)]
[h:DamageVulnerabilities=replace(DamageVulnerabilities,"SEMICOLONPLACEHOLDER",";")]
<b>[r,if(show==1):"Damage Vulnerabilities"]</b>
[r,if(show==1):DamageVulnerabilities]
[r,if(show==1):"<br>"]


[h:DamageResistences=json.get(object,"DamageResistences")]
[h:show=if(DamageResistences=="" || DamageResistences==0,0,1)]
[h:DamageResistences=replace(DamageResistences,"SEMICOLONPLACEHOLDER",";")]
<b>[r,if(show==1):"Damage Resistences"]</b>
[r,if(show==1):DamageResistences]
[r,if(show==1):"<br>"]


[h:DamageImmunities=json.get(object,"DamageImmunities")]
[h:show=if(DamageImmunities=="" || DamageImmunities==0,0,1)]
[h:DamageImmunities=replace(DamageImmunities,"SEMICOLONPLACEHOLDER",";")]
<b>[r,if(show==1):"Damage Immunities"]</b>
[r,if(show==1):DamageImmunities]
[r,if(show==1):"<br>"]

[h:ConditionImmunities=json.get(object,"ConditionImmunities")]
[h:show=if(ConditionImmunities=="" || ConditionImmunities==0,0,1)]
[h:ConditionImmunities=replace(ConditionImmunities,"SEMICOLONPLACEHOLDER",";")]
<b>[r,if(show==1):"Condition Immunities"]</b>
[r,if(show==1):ConditionImmunities]
[r,if(show==1):"<br>"]

[h:senses=json.get(object,"senses")]
<b>[r:"Senses"]</b> [r:senses]
<br>
[h:languages=json.get(object,"languages")]
<b>[r:"Languages"]</b> [r:languages]
<br>
[h:challenge=json.get(object,"challenge"))]
<b>[r:"Challenge"]</b> [r:challenge]
<br>

[r:if(currentDescription=="","","<hr noshade>")]

<!-----------------FEATS------------------->



[h:group="feats"]
[h:CurrentObject=json.get(object,group)]
[h,if(json.type(CurrentObject)=="UNKNOWN"):CurrentObject="{}"]


[h:currentItem="Features"]
[h:currentDescription=json.get(CurrentObject,currentItem)]
[h:currentDescription=replace(currentDescription,"SEMICOLONPLACEHOLDER",";")]

[h:featureLink="Features"]

[macro("campaign/Markdown@this"):"link="+featureLink+";tokenName="+tokenName+";description="+encode(currentDescription)]




<!-----------------ACTIONS------------------->


[h:group="actions"]
[h:CurrentObject=json.get(object,group)]
[h,if(json.type(CurrentObject)=="UNKNOWN"):CurrentObject="{}"]
[h:fields=json.fields(CurrentObject)]
[r,count(listcount(fields),""),code:{

	[h:currentItem=listget(fields,roll.count)]
	[h:currentDescription=json.get(CurrentObject,currentItem)]
	[h:currentDescription=replace(currentDescription,"SEMICOLONPLACEHOLDER",";")]
	
	<h5 style="border-bottom: 2px solid">
	[r:link=capitalize(currentItem)]
	</h5>
	
	[macro("campaign/Markdown@this"):"link="+link+";tokenName="+tokenName+";description="+encode(currentDescription)]
	
}]






<!-----------------VARIANT------------------->
[h:show=getStrProp(settings,"variant")]

[r,if(show==1),code:{

	<div>

	[h:group="variant"]
	[h:CurrentObject=json.get(object,group)]
	[h,if(json.type(CurrentObject)=="UNKNOWN"):CurrentObject="{}"]
	
	
	[h:currentItem="Variant Rules"]
	[h:currentDescription=json.get(CurrentObject,currentItem)]
	[h:currentDescription=replace(currentDescription,"SEMICOLONPLACEHOLDER",";")]
	
	[h:variantLink="Variant"]
	
	[macro("campaign/Markdown@this"):"link="+featureLink+";tokenName="+tokenName+";description="+encode(currentDescription)]

	</div>

};{}]

<p>
<b>Sources:</b> [r:json.toList(json.get(object,"sources"))]
</p>