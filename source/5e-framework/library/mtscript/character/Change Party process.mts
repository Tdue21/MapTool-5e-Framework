[h:pin=json.get(macro.args,"pin")]
[h:NPCs=json.get(macro.args,"NPCs")]
[h:totalXP=json.get(macro.args,"XPvalue")]
[h:partySize=json.get(macro.args,"partySize")]
[h:totalPP=json.get(macro.args,"PP")]
[h:totalGP=json.get(macro.args,"GP")]
[h:totalEP=json.get(macro.args,"EP")]
[h:totalSP=json.get(macro.args,"SP")]
[h:totalCP=json.get(macro.args,"CP")]
[h:TokenList=json.get(macro.args,"TokenList")]
[h:distribute=json.get(macro.args,"distribute")]

[h:output=getLibProperty("PC Output", "Lib:Character")]

<!-----------------------Experience------------------------->

[h:totalXP=if(totalXP=="",0,totalXP)]

[h:divideBy=partySize+NPCs]
[h:individualXP=floor(totalXP/divideBy)]
[h:UsedXP=individualXP*divideBy]

[h,if(pin==""):currentNotes="";currentNotes=getNotes(findToken(pin))]

[h:notes=""]
[h,count(listcount(TokenList),"<br>"),code:{

	[h:CurrentPC=listget(TokenList,roll.count)]
	[h:tokenName=getLibProperty("LibName",currentPC)]
	[h:propXP=getLibProperty("XP","Lib:"+tokenName)]
	[h:XPvalue=getStrProp(string(propXP),"value")]
	[h:text=getStrProp(propXP,"text")]
	[h:XPvalue=if(XPvalue=="",0,XPvalue)]
	[h:XPvalue=XPvalue+individualXP]

	[h,if(individualXP==0):"";notes=notes+"
- **"+tokenName+"** got **Experience Points** x"+individualXP]

	[h:propXP=setStrProp(propXP,"value",XPvalue)]
	[h:propXP=setStrProp(propXP,"text",text)]
	[h:setLibProperty("XP",propXP,"Lib:"+tokenName)]

}]

[h,if(pin==""),code:{};{

[h:propXP=getProperty("XP",pin)]
[h:XPvalue=getStrProp(string(propXP),"value")]
[h:text=getStrProp(propXP,"text")]
[h:XPvalue=if(XPvalue=="",0,XPvalue)]

[h:propXP=setStrProp(propXP,"value",XPvalue-UsedXP)]
[h:propXP=setStrProp(propXP,"text",text)]
[h,if(distribute=="Distribute XP"):setProperty("XP",propXP,pin);""]

}]

<!-----------------------Currency------------------------->

[h:totalPP=if(totalPP=="",0,totalPP)]
[h:totalGP=if(totalGP=="",0,totalGP)]
[h:totalEP=if(totalEP=="",0,totalEP)]
[h:totalSP=if(totalSP=="",0,totalSP)]
[h:totalCP=if(totalCP=="",0,totalCP)]


[h:individualPP=floor(totalPP/partySize)]
[h:changePP=individualPP*partySize]

[h:individualGP=floor(totalGP/partySize)]
[h:changeGP=individualGP*partySize]

[h:individualEP=floor(totalEP/partySize)]
[h:changeEP=individualEP*partySize]

[h:individualSP=floor(totalSP/partySize)]
[h:changeSP=individualSP*partySize]

[h:individualCP=floor(totalCP/partySize)]
[h:changeCP=individualCP*partySize]







[h:broadcastOutput=""]
[r,count(listcount(TokenList),"<br>"),code:{

	[h:CurrentPC=listget(TokenList,roll.count)]
	[h:tokenName=getLibProperty("LibName",currentPC)]
	[h:tokenCurrency=getLibProperty("Currency","Lib:"+tokenName)]

	[h:broadcastOutput=broadcastOutput+"<b>"+tokenName+"</b>:<br>"]
	[h,if(individualPP==0):"";broadcastOutput=broadcastOutput+"PP: <font color="+if(individualPP>0,"green>+","red")+individualPP+"</font><br>"]
	
	[h,if(individualGP==0):"";broadcastOutput=broadcastOutput+"GP: <font color="+if(individualGP>0,"green>+","red")+individualGP+"</font><br>"]
	
	[h,if(individualEP==0):"";broadcastOutput=broadcastOutput+"EP: <font color="+if(individualEP>0,"green>+","red")+individualEP+"</font><br>"]
	
	[h,if(individualSP==0):"";broadcastOutput=broadcastOutput+"SP: <font color="+if(individualSP>0,"green>+","red")+individualSP+"</font><br>"]
	
	[h,if(individualCP==0):"";broadcastOutput=broadcastOutput+"CP: <font color="+if(individualCP>0,"green>+","red")+individualCP+"</font><br>"]

	[h,if(individualPP==0):"";notes=notes+"
- **"+tokenName+"** got **Platinum Pieces** x"+individualPP]
	[h,if(individualGP==0):"";notes=notes+"
- **"+tokenName+"** got **Gold Pieces** x"+individualGP]
	[h,if(individualEP==0):"";notes=notes+"
- **"+tokenName+"** got **Electrum Pieces** x"+individualEP]
	[h,if(individualSP==0):"";notes=notes+"
- **"+tokenName+"** got **Silver Pieces** x"+individualSP]
	[h,if(individualCP==0):"";notes=notes+"
- **"+tokenName+"** got **Copper Pieces** x"+individualCP]
	
	[h:PP=getStrProp(tokenCurrency,"PP")]
	[h:PP=if(PP=="",0,PP)]
	[h:PP=PP+individualPP]
	[h:tokenCurrency=setStrProp(tokenCurrency,"PP",PP)]

	[h:GP=getStrProp(tokenCurrency,"GP")]
	[h:GP=if(GP=="",0,GP)]
	[h:GP=GP+individualGP]
	[h:tokenCurrency=setStrProp(tokenCurrency,"GP",GP)]

	[h:EP=getStrProp(tokenCurrency,"EP")]
	[h:EP=if(EP=="",0,EP)]
	[h:EP=EP+individualEP]
	[h:tokenCurrency=setStrProp(tokenCurrency,"EP",EP)]

	[h:SP=getStrProp(tokenCurrency,"SP")]
	[h:SP=if(SP=="",0,SP)]
	[h:SP=SP+individualSP]
	[h:tokenCurrency=setStrProp(tokenCurrency,"SP",SP)]

	[h:CP=getStrProp(tokenCurrency,"CP")]
	[h:CP=if(CP=="",0,CP)]
	[h:CP=CP+individualCP]
	[h:tokenCurrency=setStrProp(tokenCurrency,"CP",CP)]
	
	[h:setLibProperty("Currency",tokenCurrency,"Lib:"+tokenName)]

}]
[h:notes=currentNotes+notes]
[h,if(pin==""):"";setNotes(notes,findToken(pin))]

[h:res=individualPP+individualGP+individualEP+individualSP+individualCP]

[h,if(res==0):"";broadcast(broadcastOutput,output)]

[h,if(pin==""),code:{};{

[h:pinCurrency=getProperty("Currency",pin)]

[h:PP=getStrProp(pinCurrency,"PP")]
[h:PP=if(PP=="",0,PP)]
[h:pinCurrency=setStrProp(pinCurrency,"PP",totalPP-changePP)]

[h:GP=getStrProp(pinCurrency,"GP")]
[h:GP=if(GP=="",0,GP)]
[h:pinCurrency=setStrProp(pinCurrency,"GP",totalGP-changeGP)]

[h:EP=getStrProp(pinCurrency,"EP")]
[h:EP=if(EP=="",0,EP)]
[h:pinCurrency=setStrProp(pinCurrency,"EP",totalEP-changeEP)]

[h:SP=getStrProp(pinCurrency,"SP")]
[h:SP=if(SP=="",0,SP)]
[h:pinCurrency=setStrProp(pinCurrency,"SP",totalSP-changeSP)]

[h:CP=getStrProp(pinCurrency,"CP")]
[h:CP=if(CP=="",0,CP)]
[h:pinCurrency=setStrProp(pinCurrency,"CP",totalCP-changeCP)]

[h,if(distribute=="Distribute Treasure"):setProperty("Currency",pinCurrency,pin)]

}]

[h:args=if(pin=="Select Pin","","tokenName="+pin)]

[macro("character/Manage Party@this"):args]

[h,if(isFrameVisible(pin+" - Pin Notes")==1),code:{
[macro("character/Macro Frame@this"):"macro=Pin Notes;tokenName="+pin]
};{}]