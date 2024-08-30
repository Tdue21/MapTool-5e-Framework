[h:command=getStrProp(macro.args,"command")]
[h:output=getStrProp(macro.args,"output")]

[h:gameplay=getLibProperty("Gameplay","Lib:Campaign")]
[h:rerollInit=getStrProp(gameplay,"rerollInit")]

[h:initiativeList=getInitiativeList()]
[h:current=json.get(initiativeList,"current")]

[h:tokenList=json.get(initiativeList,"tokens")]

[h:max=listcount(json.fields(tokenList))]


[h,if(rerollInit==1 && command=="Next" && current==max-1),code:{

	[macro("overlay/Reroll Initiative@this"):""]
	[h:round=json.get(initiativeList,"round")]
	[h:setInitiativeRound(round+1)]
	[h:setCurrentInitiative(0)]
	

};{

	[h,if(command=="Next"):nextInitiative()]
	[h,if(command=="Previous"):function.previousInitiative()]

}]





[h,if(command=="Reset"),code:{

[h:res=input("var|Are you sure you want to reset rounds to zero?||Label|span=true")]
[h:abort(res)]

[h:setInitiativeRound(-1)]
[h:setCurrentInitiative(-1)]

};{}]


[h,if(command=="Focus"):selectTokens(id)]

[h:link=macroLinkText("overlay/Initiative Render@this","",macro.args)]

[h:execLink(link,1,output)]