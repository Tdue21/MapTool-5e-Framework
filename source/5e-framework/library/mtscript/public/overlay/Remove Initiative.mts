[h:gameplay=getLibProperty("Gameplay","Lib:Campaign")]
[h:KeepPlayers=getStrProp(gameplay,"KeepPlayers")]

[h:res=input("var|Do you want to clear initiative?||Label|span=true",
"keep|"+KeepPlayers+"|Keep PCs|check")]
[h:abort(res)]


[h:setInitiativeRound(-1)]
[h:setCurrentInitiative(-1)]

[h:link=macroLinkText("Initiative Render@Lib:Overlay","",macro.args)]

[h:execLink(link,0,"all")]




[h,if(keep==1),code:{

[h: removeAllNPCsFromInitiative()]

[h,if(isOverlayRegistered("Initiative")==1),code:{
[macro("Initiative Overlay@Lib:Overlay"):"output=all"]
};{}]

};{

[h:removeAllFromInitiative()]

[h:link=macroLinkText("closeOverlay@Lib:Overlay","","Initiative")]

[h:execLink(link,0,"all")]

}]