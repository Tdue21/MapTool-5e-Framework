[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:id=findToken(tokenName)]
[h:originalToken=TokenName]

[h:currency=getLibProperty("Currency","Lib:"+tokenName)]
[h:PP=getStrProp(currency,"PP")]
[h:GP=getStrProp(currency,"GP")]
[h:EP=getStrProp(currency,"EP")]
[h:SP=getStrProp(currency,"SP")]
[h:CP=getStrProp(currency,"CP")]


<!----------List PC Libs----------->
[h:info=getInfo("client")]
[h:libtokens=json.get(info,"library tokens")]
[h:libList=json.fields(libtokens)]

[h:list=libList]
[h,count(listcount(libList)),code:{
	[h:currentLib=listget(libList,roll.count)]
	[h:settingsProp=getLibProperty("LibName",currentLib)]
	[h,if(settingsProp==""):list=listdelete(list,listfind(list,currentLib));""]
}]
[h:ListPC=""]
[h:maps=getAllMapNames()]
[h,count(listcount(maps)),code:{
[h:ListPC=list]
}]
[h:tokenList=listsort(ListPC,"N")]
<!----------End of List PC Libs----------->


[h:find=listFind(tokenList,"Lib:"+tokenName)]

[h:res=input("var|Trade||label|span=true",
"target|"+tokenList+"|Send to|list|value=string select="+find,
"tradePP||Platinum ("+PP+")|text|width=8",
"tradeGP||Gold ("+GP+")|text|width=8",
"tradeEP||Electrum ("+EP+")|text|width=8",
"tradeSP||Silver ("+SP+")|text|width=8",
"tradeCP||Copper ("+CP+")|text|width=8")]
[h:abort(res)]

[h:tradePP=if(tradePP>PP,PP,tradePP)]
[h:tradeGP=if(tradePP>GP,GP,tradeGP)]
[h:tradeEP=if(tradePP>EP,EP,tradeEP)]
[h:tradeSP=if(tradePP>SP,SP,tradeSP)]
[h:tradeCP=if(tradePP>CP,CP,tradeCP)]

[h:currency=setStrProp(currency,"PP",PP-tradePP)]
[h:currency=setStrProp(currency,"GP",GP-tradeGP)]
[h:currency=setStrProp(currency,"EP",EP-tradeEP)]
[h:currency=setStrProp(currency,"SP",SP-tradeSP)]
[h:currency=setStrProp(currency,"CP",CP-tradeCP)]

[h:setLibProperty("Currency",currency,"Lib:"+tokenName)]


[h:tokenName=target]

[h:currency=getLibProperty("Currency",tokenName)]
[h:PP=getStrProp(currency,"PP")]
[h:GP=getStrProp(currency,"GP")]
[h:EP=getStrProp(currency,"EP")]
[h:SP=getStrProp(currency,"SP")]
[h:CP=getStrProp(currency,"CP")]


[h:currency=setStrProp(currency,"PP",PP+tradePP)]
[h:currency=setStrProp(currency,"GP",GP+tradeGP)]
[h:currency=setStrProp(currency,"EP",EP+tradeEP)]
[h:currency=setStrProp(currency,"SP",SP+tradeSP)]
[h:currency=setStrProp(currency,"CP",CP+tradeCP)]




[h:setLibProperty("Currency",currency,tokenName)]

[h,if(matches(originalToken,"^Lib:.*")==1):originalToken=replace(originalToken,"^Lib:","");""]
[h,if(matches(tokenName,"^Lib:.*")==1):tokenName=replace(tokenName,"^Lib:","");""]





<font color=red><b>[r:originalToken]</b></font>
>>>
<font color=green><b>[r:tokenName]</b></font>
[r,if(tradePP==0):"";"<br>PP: "+tradePP]
[r,if(tradeGP==0):"";"<br>GP: "+tradeGP]
[r,if(tradeEP==0):"";"<br>EP: "+tradeEP]
[r,if(tradeGP==0):"";"<br>SP: "+tradeSP]
[r,if(tradeCP==0):"";"<br>CP: "+tradeCP]



[h,if(isFrameVisible(originalToken+" - Character Sheet")==1),code:{
[macro("character/Macro Frame@this"):"macro=Character Sheet;tokenName="+originalToken]
};{}]
[h,if(isFrameVisible(tokenName+" - Character Sheet")==1),code:{
[macro("character/Macro Frame@this"):"macro=Character Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(originalToken+" - Pin Notes")==1),code:{
[macro("character/Macro Frame@this"):"macro=Pin Notes;tokenName="+originalToken]
};{}]