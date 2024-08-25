[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:multiplier=getStrProp(macro.args,"multiplier")]
[h:id=findToken(tokenName)]
[h:switchToken(id)]

[r,macro("Dice Roller@Lib:Character"):macro.args]


[h:startingGP=macro.return*multiplier]


[h:currentmoney=getProperty("Currency")]
[h:gp=getStrProp(currentmoney,"GP")]
[h:gp=if(gp=="",0,gp)]
[h:currentmoney=setStrProp(currentmoney,"GP",gp+startingGP)]
[h:setProperty("Currency",currentmoney)]