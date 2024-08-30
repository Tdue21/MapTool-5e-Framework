[h:tokenName=getStrProp(macro.args,"tokenName")]

[h:id=findToken(tokenName)]
[h,if(id==""):abort(0);switchToken(id)]

[h:concentrationSpell=getLibProperty("Concentration","Lib:"+tokenName)]

[h:res=input("var|"+concentrationSpell+"|Current concentration spell|label",
"concentrationSpell|Spell|New concentration spell",
"break|0|Remove Concentration|check")]
[h:abort(res)]

[h:setState("Concentration",if(break==1,0,1))]
[h,if(break==1):concentrationSpell=""]

[h:setLibProperty("Concentration",concentrationSpell,"Lib:"+tokenName)]

[h,if(isPC()==1),code:{
	[h:Buffs=getLibProperty("Buffs","Lib:"+tokenName)]
	[h,if(json.type(Buffs)=="UNKNOWN"):"";Buffs=json.remove(Buffs,"concentration")]
	[h:setLibProperty("Buffs",Buffs,"Lib:"+tokenName)]
};{}]

[r,if(getState("Concentration")==1):tokenName+" is concentrating on "+concentrationSpell+".";""]



[h,if(isFrameVisible(tokenName+" - Character Sheet")==1),code:{
[macro("character/Macro Frame@this"):"macro=Character Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Statblock")==1),code:{
[macro("character/Macro Frame@this"):"macro=Statblock;tokenName="+tokenName]
};{}]