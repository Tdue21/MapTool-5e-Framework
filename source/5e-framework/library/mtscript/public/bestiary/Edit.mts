[h:object=decode(getStrProp(macro.args,"json"))]
[h:name=getStrProp(macro.args,"name")]
[h:tokenName=getStrProp(macro.args,"tokenName")]

[h:id=findToken(tokenName)]
[h:switchToken(id)]

[h:save=json.get(object,"save")]
[h:save=replace(save,"SEMICOLONPLACEHOLDER",";")]

[h:skill=json.get(object,"skill")]
[h:skill=replace(skill,"SEMICOLONPLACEHOLDER",";")]

[h:skill=json.get(object,"skill")]
[h:skill=replace(skill,"SEMICOLONPLACEHOLDER",";")]

[h:DamageVulnerabilities=json.get(object,"DamageVulnerabilities")]
[h:DamageVulnerabilities=replace(DamageVulnerabilities,"SEMICOLONPLACEHOLDER",";")]

[h:DamageResistences=json.get(object,"DamageResistences")]
[h:DamageResistences=replace(DamageResistences,"SEMICOLONPLACEHOLDER",";")]

[h:DamageImmunities=json.get(object,"DamageImmunities")]
[h:DamageImmunities=replace(DamageImmunities,"SEMICOLONPLACEHOLDER",";")]

[h:ConditionImmunities=json.get(object,"ConditionImmunities")]
[h:ConditionImmunities=replace(ConditionImmunities,"SEMICOLONPLACEHOLDER",";")]

[h:settings=json.get(object,"settings")]
[h:settings=decode(settings))]

[h:size=getStrProp(settings,"size")]
[h:spellcasting=getStrProp(settings,"spellcasting")]
[h:initAdv=getStrProp(settings,"initAdv")]
[h:sources=json.toList(json.get(object,"sources"))]
[h:asset=json.get(object,"asset")]

[h,if(isNumber(initAdv)==0):initAdv=0]

[r:currentAsset=getTokenImage()]

[h:instanceOriginal=if(getProperty("CreatureName")=="",1,0)]

[h:sizeList="Fine,Diminute,Tiny,Small,Medium,Large,Huge,Gargantuan,Colossal"]
[h:atributeList="-,str,dex,con,int,wis,cha"]




[h:res=input(
	"var|<html><h3>Creature Settings||label|span=true",
	"instance|"+instanceOriginal+"|Instance Creature|check",
	"size|"+sizeList+"|Default Size|list|value=string select="+listfind(sizeList,size),
	"asset|"+asset+","+currentAsset+"|Token|list|value=string icon=true select=0",
	"spellcasting|"+atributeList+"|Spellcasting|list|value=string select="+listfind(atributeList,spellcasting),
	"save|"+save+"|Saving Throw",
	"skill|"+skill+"|Skills",
	"DamageVulnerabilities|"+DamageVulnerabilities+"|Damage Vulnerabilities",
	"DamageResistences|"+DamageResistences+"|Damage Resistences",
	"DamageImmunities|"+DamageImmunities+"|Damage Immunities",
	"ConditionImmunities|"+ConditionImmunities+"|Condition Immunities",
	"initAdv|Normal Roll,Advantage,Disadvantage,Always ask|Roll initiative with|list|select="+initAdv,
	"sources|"+sources+"|Sources|text|width=10"
)]
[h:abort(res)]

[h:settings=setStrProp(settings,"size",size)]
[h:settings=setStrProp(settings,"spellcasting",spellcasting)]
[h:settings=setStrProp(settings,"initAdv",initAdv)]
[h:object=json.set(object,"sources",json.fromList(sources))]
[h:object=json.set(object,"asset",asset)]

[h:object=json.set(object,"settings",encode(settings))]

[h:save=replace(save,";","SEMICOLONPLACEHOLDER")]
[h:object=json.set(object,"save",save)]

[h:skill=replace(skill,";","SEMICOLONPLACEHOLDER")]
[h:object=json.set(object,"skill",skill)]

[h:DamageVulnerabilities=replace(DamageVulnerabilities,";","SEMICOLONPLACEHOLDER")]
[h:object=json.set(object,"DamageVulnerabilities",DamageVulnerabilities)]

[h:DamageResistences=replace(DamageResistences,";","SEMICOLONPLACEHOLDER")]
[h:object=json.set(object,"DamageResistences",DamageResistences)]

[h:DamageImmunities=replace(DamageImmunities,";","SEMICOLONPLACEHOLDER")]
[h:object=json.set(object,"DamageImmunities",DamageImmunities)]

[h:ConditionImmunities=replace(ConditionImmunities,";","SEMICOLONPLACEHOLDER")]
[h:object=json.set(object,"ConditionImmunities",ConditionImmunities)]



[h,if(instance==0),code:{

	[h,if(instanceOriginal==instance),code:{};{
	
		[r:setProperty("CreatureName",lower(json.get(object,"name")))]
		[macro("Edit Creature@Lib:Bestiary"):"creature="+json.get(object,"name")+";prop="+encode(object)]
	
	}]


};{

	[r:setProperty("CreatureName","")]
	[r:setProperty("Stats",object)]
	

}]


[h,if(name==""),code:{

	[h:setProperty("Stats",object)]

};{

	[h:BestiaryObj=getLibProperty("Bestiary","Lib:Compendium")]
	[h:BestiaryObj=json.set(BestiaryObj,name,object)]
	[h:setLibProperty("Bestiary",BestiaryObj,"Lib:Compendium")]

}]

[macro("Macro Frame@Lib:Bestiary"):tokenName]