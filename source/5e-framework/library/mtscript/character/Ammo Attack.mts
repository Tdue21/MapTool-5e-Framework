[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:text=getStrProp(macro.args,"text")]
[h:ammo=getStrProp(macro.args,"ammo")]

[h:id=findToken(tokenName)]
[h,if(id==""):"";switchToken(id)]

[h:equip=getLibProperty("Equipment","Lib:"+tokenName)]


[h,if(listcount(ammo)==1),code:{};{

	[h:res=input("ammo|"+ammo+"|Select ammo|list|value=string")]
	[h,if(res==0):ammo=listget(ammo,0)]

}]

[h:ammo=lower(ammo)]

[h,if(text==ammo),code:{
	[h:res=input("action|Throw,Hit|"+ammo+"|radio")]
	[h:abort(res)]
};{
	[h:action=0]
}]

[h:equipProps=json.get(equip,ammo)]
[h:equipJsonType=json.type(equipProps)]
[h,if(equipJsonType=="UNKNOWN"),code:{
	[h:Quantity=0]
	[h:customName=""]
};{
	[h:Quantity=json.get(equipProps,"Quantity")]
	[h:customName=json.get(equipProps,"customName")]
}]
[h,if(isNumber(Quantity)==1):"";Quantity=1]

[h:newQuantity=Quantity-1]

[h,if(newQuantity<0):res=input("var|Out of "+ammo+"s, Continue?||label|span=true")]
[h,if(newQuantity<0):abort(res)]

[h:quantityChange=newQuantity-Quantity]

[h:equipProps=json.set(equipProps,"Quantity",newQuantity)]
[h:equip=json.set(equip,ammo,equipProps)]
[h,if(equipJsonType=="UNKNOWN" || action==1):"";setLibProperty("Equipment",equip,"Lib:"+tokenName)]

[macro("character/d20 Roller@this"):macro.args]

[h,if(customName=="" || customName==0):link=macroLink(ammo,"character/Args Dialog@this","","prop=Equipment;name="+ammo+";customName="+customName+";tokenName="+tokenName);link=macroLink(customName+" ("+ammo+")","character/Args Dialog@this","","prop=Equipment;name="+ammo+";customName="+customName+";tokenName="+tokenName)]

[h,if(quantityChange==0 || equipJsonType=="UNKNOWN" || action==1):"";broadcast(tokenName+if(quantityChange<0," lost<font color=red>"," got<font color=green>")+" <b style='text-decoration:none'>"+link+"</b></font>"+if(Quantity==newQuantity,""," x"+if(quantityChange<0,quantityChange*-1,quantityChange))+".")]

[h,if(isFrameVisible(tokenName+" - Character Sheet")==1),code:{
[macro("character/Macro Frame@this"):"macro=Character Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Statblock")==1),code:{
[macro("character/Macro Frame@this"):"macro=Statblock;tokenName="+tokenName]
};{}]