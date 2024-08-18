[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:id=findToken(tokenName)]
[h,if(id==""):"";switchToken(id)]

[h:sizeMod=getLibProperty("sizeMod","Lib:"+tokenName)]

[input("sizeMod|Tiny,Small,Medium,Large,Huge|Size modifier|List|value=string select="+listfind("Tiny,Small,Medium,Large,Huge",sizeMod))]

[h:setLibProperty("sizeMod",sizeMod,"Lib:"+tokenName)]


[h,if(isFrameVisible(tokenName+" - Character Sheet")==1),code:{
[macro("Macro Frame@Lib:Character"):"macro=Character Sheet;tokenName="+tokenName]
};{}]