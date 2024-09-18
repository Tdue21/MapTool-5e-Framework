[h:broadcast("Conditions: <br><pre>" + json.indent(macro.args, 4) + "</pre>")]

[h,if(macro.args==""),code:{
	[h:tokenName=token.name]
	[h:res=input("condition|Clear Conditions,Dead,Dying,Blinded,Charmed,Deafened,Frightened,Grappled,Incapacitated,Invisible,Paralyzed,Petrified,Poisoned,Prone,Restrained,Stunned,Unconscious,Exhaustion|Select Condition|list|value=string")]
	[h:abort(res)]
};{
	[h:tokenName=json.get(macro.args,"tokenName")]
	[h:id=findToken(tokenName)]
	[h,if(id==""):"";switchToken(id)]
	[h:condition=json.get(macro.args,"condition")]
}]

[h,if(condition=="Clear Conditions"),code:{
	[h:halo = if(getState("Player") == 1, "Player",
			  	if(getState("Ally")   == 1, "Ally",
			  		if(getState("Enemy")  == 1, "Enemy",
			  			if(getState("Neutral")== 1, "Neutral", 
							"Exhaustion"))))]

	[h:setAllStates(0)]	
	[h:if(halo == "", "", setState(halo, 1, token.name))]
	[h: setState("Exhaustion", 0)]
};{}]

[h,if(condition=="Dead"),code:{
	[h: setState("Dying",0)]
	[h: setState("Dead", if(getState("Dead")==0,1,0))]
};{}]

[h,if(condition=="Dying"),code:{
	[h: setState("Dead",0)]
	[h: setState("Dying", if(getState("Dying")==0,1,0))]
};{}]

[h,if(condition=="Blinded"),code:{
	[h: setState("Blinded", if(getState("Blinded")==0,1,0))]
};{}]

[h,if(condition=="Charmed"),code:{
	[h: setState("Charmed", if(getState("Charmed")==0,1,0))]
};{}]

[h,if(condition=="Deafened"),code:{
	[h: setState("Deafened", if(getState("Deafened")==0,1,0))]
};{}]

[h:exhaustion=0]
[h,if(condition=="Exhaustion"),code:{
	[h: res=input("Exhaustion|0,1,2,3,4,5,6|Exhaustion Level|list")]
	[h:abort(res)]
	[h: level=6]
	[r, count(6,""), code: {
		[h: prefix="Exhaustion "]
		[h: disable=prefix+level]
		[h: setState(disable, 0)]
		[h: level=level-1]
	}]
	[h: setState(prefix+exhaustion, 1)]
	[h: setState("Exhaustion", 0)]
};{}]

[h,if(condition=="Frightened"),code:{
	[h: setState("Frightened", if(getState("Frightened")==0,1,0))]
};{}]

[h,if(condition=="Grappled"),code:{
	[h: setState("Grappled", if(getState("Grappled")==0,1,0))]
};{}]

[h,if(condition=="Incapacitated"),code:{
	
	[h: setState("Incapacitated", if(getState("Incapacitated")==0,1,0))]

	
	};{}]

[h,if(condition=="Invisible"),code:{
	
	[h: setState("Invisible", if(getState("Invisible")==0,1,0))]


	
	};{}]

[h,if(condition=="Paralyzed"),code:{
	
	[h: setState("Paralyzed", if(getState("Paralyzed")==0,1,0))]


	
	};{}]

[h,if(condition=="Petrified"),code:{
	
	[h: setState("Petrified", if(getState("Petrified")==0,1,0))]


	
	};{}]

[h,if(condition=="Poisoned"),code:{
	
	[h: setState("Poisoned", if(getState("Poisoned")==0,1,0))]


	
	};{}]

[h,if(condition=="Prone"),code:{
	
	[h: setState("Prone", if(getState("Prone")==0,1,0))]


	
	};{}]

[h,if(condition=="Restrained"),code:{
	
	[h: setState("Restrained", if(getState("Restrained")==0,1,0))]


	
	};{}]

[h,if(condition=="Stunned"),code:{
	
	[h: setState("Stunned", if(getState("Stunned")==0,1,0))]

	
	};{}]

[h,if(condition=="Unconscious"),code:{
	
	[h: setState("Unconscious", if(getState("Unconscious")==0,1,0))]


	
	};{}]



[h:conditionflavor=if(condition=="Exhaustion",if(exhaustion==6," dead from Exhaustion (lvl 6)",if(exhaustion==0,"Exhausted","Exhausted (lvl "+exhaustion+")")),condition)]

[h:condition=if(condition=="Exhaustion","Exhaustion "+exhaustion,condition)]


[r,if(condition=="Clear Conditions"):"";if(getState(condition)==1,tokenName+" is "+conditionflavor+".",if(condition=="Exhaustion",conditionflavor,tokenName+" is no longer "+conditionflavor+"."))]


[h,if(isFrameVisible(tokenName+" - Character Sheet")==1),code:{
[macro("character/Macro Frame@this"):"macro=Character Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Statblock")==1),code:{
[h:library=if(getPropertyType(id)=="NPC","Bestiary","Character")]
[macro("\l/Macro Frame@this"+library):if(getPropertyType(id)=="NPC",tokenName,"macro=Statblock;tokenName="+tokenName)]
};{}]
[h,if(isDialogVisible("Manage Party")==1),code:{
[macro("character/Manage Party@this"):""]
};{}]
[h,if(isFrameVisible(tokenName)==1),code:{
[macro("bestiary/Macro Frame@this"):tokenName]
};{}]
[h,if(isOverlayRegistered("Initiative")==1),code:{
[macro("overlay/Initiative Overlay@this"):"output=all"]
};{}]