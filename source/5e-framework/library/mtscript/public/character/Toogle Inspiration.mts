[h:tokenName=macro.args]


[h:id=findToken(tokenName)]
[h,if(id==""):"";switchToken(id)]


[h:inspiration=getLibProperty("Inspiration","Lib:"+tokenName)]
[h:inspiration=if(inspiration==1,0,1)]
[h:setLibProperty("Inspiration",inspiration,"Lib:"+tokenName)]

[h,if(isFrameVisible(tokenName+" - Character Sheet")==1),code:{
[macro("Macro Frame@Lib:Character"):"macro=Character Sheet;tokenName="+tokenName]
};{}]
