[h:res=input("var|Do you want to clear initiative?||Label|span=true",
	"keep|"+KeepPlayers+"|Keep PCs|check")]
[h:abort(res)]

[h:setInitiativeRound(-1)]
[h:setCurrentInitiative(-1)]

[h,if(keep==1),code:{
	[h: removeAllNPCsFromInitiative()]
};{
	[h:removeAllFromInitiative()]
}]