[h:tokenName=getStrProp(macro.args,"tokenName")]



[h:res=input("name|"+tokenName+"|Name")]
[h:abort(res)]
[h,if(tokenName==name):abort(0)]

[h:start=getLibProperty("Start","Lib:Campaign")]
[h:id=findToken("Lib:"+tokenName,start)]
[h:setName("Lib:"+name,id,start)]
[h:setLibProperty("LibName",name,"Lib:"+name)]

[h:id=findToken(tokenName)]
[h,if(id==""):"";setName(name,id)]


[h,if(isFrameVisible(tokenName+" - Character Sheet")==1),code:{
[h:closeFrame(tokenName+" - Character Sheet")]
[macro("character/Macro Frame@this"):"macro=Character Sheet;tokenName="+name]
};{}]
[h,if(isFrameVisible(tokenName+" - Spellcasting Sheet")==1),code:{
[h:closeFrame(tokenName+" - Spellcasting Sheet")]
[macro("character/Macro Frame@this"):"macro=Spellcasting Sheet;tokenName="+name]
};{}]
[h,if(isFrameVisible(tokenName+" - Description Sheet")==1),code:{
[h:closeFrame(tokenName+" - Description Sheet")]
[macro("character/Macro Frame@this"):"macro=Description Sheet;tokenName="+name]
};{}]
[h,if(isFrameVisible(tokenName+" - Statblock")==1),code:{
[h:closeFrame(tokenName+" - Statblock")]
[macro("character/Macro Frame@this"):"macro=Statblock;tokenName="+name]
};{}]