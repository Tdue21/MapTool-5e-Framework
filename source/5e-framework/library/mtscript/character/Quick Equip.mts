[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:object=getStrProp(macro.args,"object")]
[h:name=getStrProp(macro.args,"name")]

[h:id=findToken(tokenName)]
[h,if(id==""):"";switchToken(id)]


[h:prop=getLibProperty("Equipment","Lib:"+tokenName)]

[h:isEquip=json.get(object,"Equiped")]

[h:Equip=if(isEquip==1,0,1)]

[h:object=json.set(object,"Equiped",Equip)]

[h:prop=json.set(prop,name,object)]

[h:setLibProperty("Equipment",prop,"Lib:"+tokenName)]


[h,if(isFrameVisible(tokenName+" - Character Sheet")==1),code:{
[macro("character/Macro Frame@this"):"macro=Character Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Statblock")==1),code:{
[macro("character/Macro Frame@this"):"macro=Statblock;tokenName="+tokenName]
};{}]