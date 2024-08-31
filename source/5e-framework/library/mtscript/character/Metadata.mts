[h:group=getStrProp(macro.args,"prop")]
[h:name=getStrProp(macro.args,"name")]
[h:index=getStrProp(macro.args,"index")]
[h:source=getStrProp(macro.args,"source")]
[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:description=decode(getStrProp(macro.args,"description"))]
[h:originalToken=tokenName]
[h:originalGroup=group]



[h:id=findToken(tokenName)]

[h,if(id==""):"";switchToken(id)]


<!---------------------EQUIPMENT------------------------>
[h,if(group=="Equipment"),code:{
[h:currentObj=json.get(getLibProperty("Equipment","Lib:"+tokenName),name)]
[h:isProf=json.get(currentObj,"isProf")]
[h:Quantity=json.get(currentObj,"Quantity")]
[h:ammo=json.get(currentObj,"ammo")]
[h:Equiped=json.get(currentObj,"Equiped")]
[h:offHand=json.get(currentObj,"offHand")]
[h:customName=json.get(currentObj,"customName")]
[h:bonusAtk=json.get(currentObj,"bonusAtk")]
[h:bonusDmg=json.get(currentObj,"bonusDmg")]
[h:identified=json.get(currentObj,"identified")]

[h:originalQuantity=Quantity]

[h:permissions=getLibProperty("PlayerPermission", function.getNamespace())]
[h:identify=getStrProp(permissions,"identify")]
[h,if(isGM()==1):identify=1]

[h:res=input("var|<html><h3>Equipment Settings||label|span=true",
"Equiped|"+Equiped+"|Equiped|check",
"offHand|"+offHand+"|Off Hand|check",
"Quantity|"+Quantity+"|Quantity|text|width=6",
"ammo|"+ammo+"|Ammunition Type|text|width=12",
"customName|"+customName+"|Custom Name|text|width=12",
"bonusAtk|"+bonusAtk+"|Bonus Attack|text|width=6",
"bonusDmg|"+bonusDmg+"|Bonus Damage|text|width=6",
if(identify==1,"identified|"+identified+"|Identified|check",""))]
[h:abort(res)]

[h,if(isNumber(Quantity)==1):"";Quantity=eval(Quantity)]

[h,if(isNumber(Quantity)==0):res=input("var|Quantity must be a number||label|span=true");""]
[h:abort(res)]

[macro("character/Get Equipment Info@this"):"group="+group+";name="+name]
[h:equipInfo=macro.return]

[h:object=json.fromStrProp(equipInfo+";Quantity="+Quantity+";ammo="+ammo+";Equiped="+Equiped+";offHand="+offHand+";customName="+customName+";bonusAtk="+bonusAtk+";bonusDmg="+bonusDmg+";identified="+identified)]

[h:quantityChange=number(Quantity-originalQuantity)]

[h,if(quantityChange==0):"";broadcast(tokenName+if(quantityChange<0," lost<font color=red>"," got<font color=green>")+" <b>"+if(customName=="" || customName==0,name,customName+" ("+name+")")+"</b></font>"+if(originalQuantity==Quantity,""," x"+if(quantityChange<0,quantityChange*-1,quantityChange))+".")]
}]


<!---------------------FEATS------------------------>
[h,if(group=="Feats"),code:{


[h:source=json.get(getLibProperty("Feats","Lib:"+tokenName),name)]

[h:sourceList="Race,Class,Background,Feat,Other"]
[h:source=listfind(sourceList,source)]

[h:res=input("var|<html><h3>Feature Settings||label|span=true",
"source|"+sourceList+"|Source|list|value=string select="+source)]
[h:abort(res)]



[h:object=source]
[h:objectLib=json.fromStrProp(description)]

[h:identified=""]
[h:CustomName=""]
}]


<!---------------------ADDITIONAL FEATS------------------------>
[h,if(group=="AdditionalFeats"),code:{


[h:source=json.get(getLibProperty("AdditionalFeats","Lib:"+tokenName),name)]

[h:sourceList="Race,Class,Background,Feat,Other"]
[h:source=listfind(sourceList,source)]

[h:res=input("var|<html><h3>Feature Settings||label|span=true",
"source|"+sourceList+"|Source|list|value=string select="+source)]
[h:abort(res)]



[h:object=source]
[h:objectLib=json.fromStrProp("description="+description)]

[h:identified=""]
[h:CustomName=""]
}]


<!---------------------SPELLS------------------------>
[h,if(group=="Spells"),code:{





<!-----------------SPELLCASTING CLASS------------------->
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
	[h:className=listget(classList,roll.count)]
	[h:object=json.get(classes,className)]
	[h:class=json.get(object,"name")]
	[h:level=json.get(object,"level")]
	[h:totalLevel=totalLevel+level]	
	[h:spellAtr=json.get(object,"spellcasting")]
	[h,if(spellAtr=="-"):"";spellClassList=listappend(spellClassList,className)]


}]






[h:obj=json.get(getLibProperty(group,"Lib:"+tokenName),name)]

[h:prep=json.get(obj,"prep")]
[h:source=json.get(obj,"source")]
[h:customAtr=json.get(obj,"customAtr")]
[h:bonusAtk=json.get(obj,"bonusAtk")]
[h:bonusDmg=json.get(obj,"bonusDmg")]

[macro("character/Get Spell Level@this"):"group="+group+";name="+name]
[h:level=macro.return]

[h:sourceList=spellClassList+",Race,Item,Other"]
[h:source=listfind(sourceList,source)]

[h:atrList="Default,"+getLibProperty("Attributes", function.getNamespace())]
[h:res=input("var|<html><h3>Spell Settings||label|span=true",
"prep|"+prep+"|Prepared|check",
"source|"+sourceList+"|Source|list|value=string select="+source,
"customAtr|"+atrList+"|Custom Attribute|list|value=string select="+listfind(atrList,customAtr),
"bonusDmg|"+bonusDmg+"|Bonus to rolls|text|width=6"
)]
[h:abort(res)]

[h:customAtr=if(customAtr=="Default",0,customAtr)]
[h:object=json.fromStrProp("level="+level+";prep="+prep+";source="+source+";customAtr="+customAtr+";bonusDmg="+bonusDmg)]



[h:identified=""]
[h:CustomName=""]
}]




[h:currentProp=getLibProperty(group,"Lib:"+tokenName)]
[h:newProp=json.set(currentProp,name,object)]
[h:setLibProperty(group,newProp,"Lib:"+tokenName)]




[h:id=findToken(originalToken)]
[h,if(id==""):"";switchToken(id)]

[h:currentProp=getLibProperty(originalGroup,"Lib:"+tokenName)]
[h:newProp=json.remove(currentProp,index)]
[h:setLibProperty(group,newProp,"Lib:"+tokenName)]


<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=capitalize(name)]
[h:CapitalName=replace(CapitalName,"(?<=\\s)Of(?=\\s)","of")]
[h:CapitalName=replace(CapitalName,"(?<=\\s)A(?=n?\\s)","a")]
[h:CapitalName=replace(CapitalName,"(?<=\\s)Th(?=(?:e|at|ose)\\s)","th")]
[h:CapitalName=replace(CapitalName,"'S(?=\\s)","'s")]


[h,if(isDialogVisible(tokenName+" - "+CapitalName)==1),code:{
[macro("character/Args Dialog@this"):"prop="+group+";index="+index+";source="+source+";name="+name+";description=;tokenName="+tokenName+";customName="+customName+";identified="+identified]
};{}]
[h,if(isFrameVisible(tokenName+" - Character Sheet")==1),code:{
[macro("character/Macro Frame@this"):"macro=Character Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(originalToken+" - Character Sheet")==1 && originalToken!=tokenName),code:{
[macro("character/Macro Frame@this"):"macro=Character Sheet;tokenName="+originalToken]
};{}]
[h,if(isFrameVisible(tokenName+" - Spellcasting Sheet")==1),code:{
[macro("character/Macro Frame@this"):"macro=Spellcasting Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(originalToken+" - Spellcasting Sheet")==1 && originalToken!=tokenName),code:{
[macro("character/Macro Frame@this"):"macro=Spellcasting Sheet;tokenName="+originalToken]
};{}]
[h,if(isFrameVisible(tokenName+" - Description Sheet")==1),code:{
[macro("character/Macro Frame@this"):"macro=Description Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(originalToken+" - Description Sheet")==1 && originalToken!=tokenName),code:{
[macro("character/Macro Frame@this"):"macro=Description Sheet;tokenName="+originalToken]
};{}]
[h,if(isFrameVisible(tokenName+" - Statblock")==1),code:{
[macro("character/Macro Frame@this"):"macro=Statblock;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(originalToken+" - Statblock")==1),code:{
[macro("character/Macro Frame@this"):"macro=Statblock;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(originalToken+" - Pin Notes")==1),code:{
[macro("character/Macro Frame@this"):"macro=Pin Notes;tokenName="+originalToken]
};{}]