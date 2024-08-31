[h:item=getStrProp(macro.args,"item")]
[h:name=getStrProp(macro.args,"name")]
[h:tokenName=getStrProp(macro.args,"tokenName")]

[h:id=findToken(tokenName)]
[h,if(id==""):"";switchToken(id)]

[h:equip=getLibProperty("Equipment","Lib:"+tokenName)]
[h:equipProps=json.get(equip,item)]
[h:Quantity=json.get(equipProps,"Quantity")]

[h:res=input("var|"+name+"||label|span=true","newQuantity|"+Quantity+"|Quantity")]
[h:abort(res)]

[h,if(isNumber(newQuantity)==1):"";newQuantity=eval(newQuantity)]

[h:quantityChange=newQuantity-Quantity]

[h,if(quantityChange==0):"";broadcast(tokenName+if(quantityChange<0," lost<font color=red>"," got<font color=green>")+" <b>"+if(lower(name)==lower(item),item,name+" ("+item+")")+"</b></font>"+if(Quantity==newQuantity,""," x"+if(quantityChange<0,quantityChange*-1,quantityChange))+".")]

[h:equipProps=json.set(equipProps,"Quantity",newQuantity)]
[h:equip=json.set(equip,item,equipProps)]
[h:setLibProperty("Equipment",equip,"Lib:"+tokenName)]

[h,if(isFrameVisible(tokenName+" - Character Sheet")==1),code:{
[macro("character/Macro Frame@this"):"macro=Character Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Statblock")==1),code:{
[macro("character/Macro Frame@this"):"macro=Statblock;tokenName="+tokenName]
};{}]