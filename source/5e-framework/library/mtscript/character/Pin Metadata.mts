[h:group=getStrProp(macro.args,"prop")]
[h:name=getStrProp(macro.args,"name")]
[h:index=getStrProp(macro.args,"index")]
[h:source=getStrProp(macro.args,"source")]
[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:description=decode(getStrProp(macro.args,"description"))]
[h:originalToken=tokenName]
[h:originalGroup=group]



[h:id=findToken(tokenName)]

[h:switchToken(id)]


<!---------------------EQUIPMENT------------------------>
[h,if(group=="Equipment"),code:{
[h:currentObj=json.get(getProperty("Equipment"),name)]
[h:isProf=json.get(currentObj,"isProf")]
[h:Quantity=json.get(currentObj,"Quantity")]
[h:Equiped=json.get(currentObj,"Equiped")]
[h:offHand=json.get(currentObj,"offHand")]
[h:customName=json.get(currentObj,"customName")]
[h:bonusAtk=json.get(currentObj,"bonusAtk")]
[h:bonusDmg=json.get(currentObj,"bonusDmg")]
[h:identified=json.get(currentObj,"identified")]

[h:originalQuantity=Quantity]

[h:permissions=getLibProperty("PlayerPermission","Lib:Character")]
[h:identify=getStrProp(permissions,"identify")]
[h,if(isGM()==1):identify=1]

[h:res=input("var|<html><h3>Equipment Settings||label|span=true",
"Equiped|"+Equiped+"|Equiped|check",
"offHand|"+offHand+"|Off Hand|check",
"Quantity|"+Quantity+"|Quantity|text|width=6",
"customName|"+customName+"|Custom Name|text|width=12",
"bonusAtk|"+bonusAtk+"|Bonus Attack|text|width=6",
"bonusDmg|"+bonusDmg+"|Bonus Damage|text|width=6",
if(identify==1,"identified|"+identified+"|Identified|check",""))]
[h:abort(res)]

[h,if(isNumber(Quantity)==1):"";Quantity=eval(Quantity)]

[h,if(isNumber(Quantity)==0):res=input("var|Quantity must be a number||label|span=true");""]
[h:abort(res)]

[macro("Get Equipment Info@Lib:Character"):"group="+group+";name="+name]
[h:equipInfo=macro.return]

[h:object=json.fromStrProp(equipInfo+";Quantity="+Quantity+";Equiped="+Equiped+";offHand="+offHand+";customName="+customName+";bonusAtk="+bonusAtk+";bonusDmg="+bonusDmg+";identified="+identified)]

[h:quantityChange=number(Quantity-originalQuantity)]


}]



[h:currentProp=getProperty(group)]
[h:newProp=json.set(currentProp,name,object)]
[h:setProperty(group,newProp)]




[h:id=findToken(originalToken)]
[h,if(id==""):"";switchToken(id)]

[h:currentProp=getProperty(originalGroup)]
[h:newProp=json.remove(currentProp,index)]
[h:setProperty(group,newProp)]


<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=capitalize(name)]
[h:CapitalName=replace(CapitalName,"(?<=\\s)Of(?=\\s)","of")]
[h:CapitalName=replace(CapitalName,"(?<=\\s)A(?=n?\\s)","a")]
[h:CapitalName=replace(CapitalName,"(?<=\\s)Th(?=(?:e|at|ose)\\s)","th")]
[h:CapitalName=replace(CapitalName,"'S(?=\\s)","'s")]


[h,if(isDialogVisible(tokenName+" - "+CapitalName)==1),code:{
[macro("Pin Args Dialog@Lib:Character"):"prop="+group+";index="+index+";source="+source+";name="+name+";description=;tokenName="+tokenName+";customName="+customName+";identified="+identified]
};{}]


[h,if(isDialogVisible("Manage")==1),code:{
[macro("Pin Notes@Lib:Character"):"tokenName="+originalToken]
};{}]