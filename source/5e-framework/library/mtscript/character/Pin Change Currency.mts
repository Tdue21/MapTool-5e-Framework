[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:id=findToken(tokenName)]
[h:switchToken(id)]



[h:currency=getProperty("Currency")]
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

[h:res=input("var|Currency||label|span=true",
"PP|"+PP+"|Platinum|text|width=8",
"GP|"+GP+"|Gold|text|width=8",
"EP|"+EP+"|Electrum|text|width=8",
"SP|"+SP+"|Silver|text|width=8",
"CP|"+CP+"|Copper|text|width=8")]
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

[h:setProperty("Currency",currency)]

[h:BroadcastOutput=if(originalPP==PP,"","<br>PP: "+PP+" ("+if(originalPP>PP,"<font color=red><b>"+number(PP-originalPP),"<font color=green><b>+"+number(PP-originalPP))+"</b></font>)")]

[h:BroadcastOutput=BroadcastOutput+if(originalGP==GP,"","<br>GP: "+GP+" ("+if(originalGP>GP,"<font color=red><b>"+number(GP-originalGP),"<font color=green><b>+"+number(GP-originalGP))+"</b></font>)")]

[h:BroadcastOutput=BroadcastOutput+if(originalEP==EP,"","<br>EP: "+EP+" ("+if(originalEP>EP,"<font color=red><b>"+number(EP-originalEP),"<font color=green><b>+"+number(EP-originalEP))+"</b></font>)")]

[h:BroadcastOutput=BroadcastOutput+if(originalSP==SP,"","<br>SP: "+SP+" ("+if(originalSP>SP,"<font color=red><b>"+number(SP-originalSP),"<font color=green><b>+"+number(SP-originalSP))+"</b></font>)")]

[r:BroadcastOutput=BroadcastOutput+if(originalCP==CP,"","<br>CP: "+CP+" ("+if(originalCP>CP,"<font color=red><b>"+number(CP-originalCP),"<font color=green><b>+"+number(CP-originalCP))+"</b></font>)")]


[h:BroadcastOutput=replace(BroadcastOutput,"^<br>","")]



[h,if(isFrameVisible(tokenName+" - Pin Notes")==1),code:{
[macro("character/Macro Frame@this"):"macro=Pin Notes;tokenName="+tokenName]
};{}]
[h,if(isDialogVisible("Manage Party")==1),code:{
[macro("character/Manage Party@this"):""]
};{}]
[h,if(isDialogVisible("Manage")==1),code:{
[macro("character/Pin Notes@this"):"tokenName="+tokenName]
};{}]
[h,if(isDialogVisible("Manage")==1),code:{
[macro("character/Pin Notes@this"):"tokenName="+tokenName]
};{}]