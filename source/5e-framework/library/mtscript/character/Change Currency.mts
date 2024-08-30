[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:id=findToken(tokenName)]
[h,if(id==""):"";switchToken(id)]


[h:currency=getLibProperty("Currency","Lib:"+tokenName)]
[h:PP=getStrProp(currency,"PP")]
[h:GP=getStrProp(currency,"GP")]
[h:EP=getStrProp(currency,"EP")]
[h:SP=getStrProp(currency,"SP")]
[h:CP=getStrProp(currency,"CP")]

[h:originalPP=if(PP=="",0,PP)]
[h:originalGP=if(GP=="",0,GP)]
[h:originalEP=if(EP=="",0,EP)]
[h:originalSP=if(SP=="",0,SP)]
[h:originalCP=if(CP=="",0,CP)]

[h:currencyValue=getLibProperty("Currency","Lib:Character")]
[h:PPW=getStrProp(currencyValue,"PP")]
[h:GPW=getStrProp(currencyValue,"GP")]
[h:EPW=getStrProp(currencyValue,"EP")]
[h:SPW=getStrProp(currencyValue,"SP")]
[h:CPW=getStrProp(currencyValue,"CP")]
[h:weight=getStrProp(currencyValue,"weight")]

[h:coinWeight=if(isNumber(PP)==1,PP,0)+if(isNumber(GP)==1,GP,0)+if(isNumber(EP)==1,EP,0)+if(isNumber(SP)==1,SP,0)+if(isNumber(CP)==1,CP,0)]

[h:coinWeight=coinWeight*weight]

[h:res=input("var|Currency||label|span=true",
"PP|"+PP+"|<html><span title='Worth *"+PPW+"'>Platinum</span></html>|text|width=8",
"GP|"+GP+"|<html><span title='Worth *"+GPW+"'>Gold</span></html>|text|width=8",
"EP|"+EP+"|<html><span title='Worth *"+EPW+"'>Electrum</span></html>|text|width=8",
"SP|"+SP+"|<html><span title='Worth *"+SPW+"'>Silver</span></html>|text|width=8",
"CP|"+CP+"|<html><span title='Worth *"+CPW+"'>Copper</span></html>|text|width=8",
"weight|"+coinWeight+" lbs.|<html><span title='"+weight+" lbs. each coin'>Weight</span></html>|label")]
[h:abort(res)]

[h,if(isNumber(PP)==1):"";PP=eval(PP)]
[h,if(isNumber(GP)==1):"";GP=eval(GP)]
[h,if(isNumber(EP)==1):"";EP=eval(EP)]
[h,if(isNumber(SP)==1):"";SP=eval(SP)]
[h,if(isNumber(CP)==1):"";CP=eval(CP)]

[h:currency=setStrProp(currency,"PP",PP)]
[h:currency=setStrProp(currency,"GP",GP)]
[h:currency=setStrProp(currency,"EP",EP)]
[h:currency=setStrProp(currency,"SP",SP)]
[h:currency=setStrProp(currency,"CP",CP)]

[h:setLibProperty("Currency",currency,"Lib:"+tokenName)]


[h:BroadcastOutput="<b>"+tokenName+"</b>:"]

[h:BroadcastOutput=BroadcastOutput+if(originalPP==PP,"","<br>PP: "+PP+" ("+if(originalPP>PP,"<font color=red><b>"+number(PP-originalPP),"<font color=green><b>+"+number(PP-originalPP))+"</b></font>)")]

[h:BroadcastOutput=BroadcastOutput+if(originalGP==GP,"","<br>GP: "+GP+" ("+if(originalGP>GP,"<font color=red><b>"+number(GP-originalGP),"<font color=green><b>+"+number(GP-originalGP))+"</b></font>)")]

[h:BroadcastOutput=BroadcastOutput+if(originalEP==EP,"","<br>EP: "+EP+" ("+if(originalEP>EP,"<font color=red><b>"+number(EP-originalEP),"<font color=green><b>+"+number(EP-originalEP))+"</b></font>)")]

[h:BroadcastOutput=BroadcastOutput+if(originalSP==SP,"","<br>SP: "+SP+" ("+if(originalSP>SP,"<font color=red><b>"+number(SP-originalSP),"<font color=green><b>+"+number(SP-originalSP))+"</b></font>)")]

[r:BroadcastOutput=BroadcastOutput+if(originalCP==CP,"","<br>CP: "+CP+" ("+if(originalCP>CP,"<font color=red><b>"+number(CP-originalCP),"<font color=green><b>+"+number(CP-originalCP))+"</b></font>)")]




[h,if(isFrameVisible(tokenName+" - Character Sheet")==1),code:{
[macro("character/Macro Frame@this"):"macro=Character Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Pin Notes")==1),code:{
[macro("character/Macro Frame@this"):"macro=Pin Notes;tokenName="+tokenName]
};{}]
[h,if(isDialogVisible("Manage Party")==1),code:{
[macro("character/Manage Party@this"):""]
};{}]