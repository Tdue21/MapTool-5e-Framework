[h:tokenName=getStrProp(macro.args,"tokenName")]

[h:id=findToken(tokenName)]
[h:switchToken(id)]

[h:group="Equipment"]

[h:Property=getProperty(group)]

[h,if(json.type(Property)=="UNKNOWN"):Property="{}";""]

[h:item=getStrProp(macro.args,"item")]
[h:Quantity=getStrProp(macro.args,"Quantity")]
[h:customName=getStrProp(macro.args,"customName")]

[h:item=lower(item)]

[macro("Get Equipment Info@Lib:Character"):"group="+group+";name="+item]
[h:equipInfo=macro.return]

[h:currentObj=json.get(Property,item)]
[h,if(json.type(currentObj)=="UNKNOWN"):oldQuantity=0;oldQuantity=json.get(currentObj,"Quantity")]
[h:oldQuantity=if(oldQuantity=="",0,oldQuantity)]
[h:Property=json.set(Property,item,json.fromStrProp(equipInfo+";Quantity="+number(oldQuantity+Quantity)+";Equiped=1;offHand=0;customName="+customName))]

[h:setProperty(group,Property)]