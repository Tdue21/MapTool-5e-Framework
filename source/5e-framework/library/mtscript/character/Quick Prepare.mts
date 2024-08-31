[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:object=getStrProp(macro.args,"object")]
[h:level=getStrProp(macro.args,"level")]
[h:name=getStrProp(macro.args,"name")]

[h:id=findToken(tokenName)]
[h,if(id==""):"";switchToken(id)]


[h:prop=getLibProperty("Spells","Lib:"+tokenName)]

[h:isPrep=json.get(object,"prep")]

[h:Prepared=if(isPrep==1,0,1)]

[h:object=json.set(object,"prep",Prepared)]

[h:prop=json.set(prop,name,object)]

[h:setLibProperty("Spells",prop,"Lib:"+tokenName)]



[h,if(isFrameVisible(tokenName+" - Character Sheet")==1),code:{
[macro("character/Macro Frame@this"):"macro=Character Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Spellcasting Sheet")==1),code:{
[macro("character/Macro Frame@this"):"macro=Spellcasting Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Statblock")==1),code:{
[macro("character/Macro Frame@this"):"macro=Statblock;tokenName="+tokenName]
};{}]