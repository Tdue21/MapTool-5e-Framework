[h:output=getStrProp(macro.args,"output")]
[h:dices=getStrProp(macro.args,"dices")]
[h:sides=getStrProp(macro.args,"sides")]
[h:con=getStrProp(macro.args,"conMod")]
[h:tokenName=getStrProp(macro.args,"tokenName")]

[h:HitDice=getLibProperty("Hit Dice","Lib:"+tokenName)]

[h:dicesCurrent=getStrProp(HitDice,"d"+sides)]

[h:res=input("var|<html><h3>Hit Dice: "+dices+"d"+sides+" ("+number(dices-dicesCurrent)+" remaining)</h3></html>||label|span=true","spend|1|Spend Dices|text|width=4","bonus||Bonus|text|width=4")]
[h:abort(res)]

[h:formula=if(isNumber(spend)==1,spend+"d"+sides,"1d"+sides)]
[h,if(isNumber(spend)==1):con=con*spend;""]

[h:link=macroLinkText("Dice Roller@Lib:Character","","text=Rest;value="+formula+if(bonus=="" || bonus==0,"","+"+bonus)+"+"+con+";tokenName="+tokenName)]

[r:execLink(link,0)]



[h:dicesCurrent=dicesCurrent+if(isNumber(spend)==1,spend,1)]

[h:HitDice=setStrProp(HitDice,"d"+sides,dicesCurrent)]
[h:setLibProperty("Hit Dice",HitDice,"Lib:"+tokenName)]


[h,if(isFrameVisible(tokenName+" - Character Sheet")==1),code:{
[macro("Macro Frame@Lib:Character"):"macro=Character Sheet;tokenName="+tokenName]
};{}]