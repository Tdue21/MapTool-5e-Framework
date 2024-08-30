[h:tokenName=macro.args]

[h:id=findToken(tokenName)]

[h:classes=getLibProperty("Class&Level","Lib:"+tokenName)]

[h:totalHitDice=""]
[h,if(json.type(classes)=="UNKNOWN"),code:{
	[h:classList=setLibProperty("Class&Level","{}","Lib:"+tokenName)]
	[h:repeat=0]
};{
	[h:classList=json.fields(classes)]	
	[h:repeat=listcount(classList)]
}]
[h,count(repeat),code:{	
	[h:name=listget(classList,roll.count)]
	[h:object=json.get(classes,name)]
	[h:level=json.get(object,"level")]
	[h:hitDice=json.get(object,"hitDice")]
	[h:currenthitDice=getStrProp(totalHitDice,hitDice)]
	[h:totalHitDice=setStrProp(totalHitDice,hitDice,currenthitDice+level)]
}]

[h:output= function.getOutput())]
[h:res=input("rest|Short Rest,Long Rest,Full Rest|Resting|List")]
[h:abort(res)]

[h,switch(rest),code:
case "0":{

	<!----------------------Resources----------------------->
	[h:resourcesObj=getLibProperty("Resources","Lib:"+tokenName)]
	[h:fields=json.fields(resourcesObj)]
	[h,count(listcount(fields)),code:{
	
		[h:currentResource=listget(fields,roll.count)]
		[h:obj=json.get(resourcesObj,currentResource)]
		[h:reset=json.get(obj,"reset")]
		[h,if(reset==0):obj=json.set(obj,"value",0)]
		[h:resourcesObj=json.set(resourcesObj,currentResource,obj)]

	
	}]
	[h:resourcesObj=setLibProperty("Resources",resourcesObj,"Lib:"+tokenName)]


	[h:broadcast("<b>"+tokenName+"</b> took a <b>short rest</b>."),output)]
	[h:broadcast("You recovered: <ul><li><b>Short rest</b> resources</ul>","self")]

};
case "1":{

	<!----------------------Resources----------------------->
	[h:resourcesObj=getLibProperty("Resources","Lib:"+tokenName)]
	[h:fields=json.fields(resourcesObj)]
	[h,count(listcount(fields)),code:{
	
		[h:currentResource=listget(fields,roll.count)]
		[h:obj=json.get(resourcesObj,currentResource)]
		[h:reset=json.get(obj,"reset")]
		[h,if(reset==0 || reset==1):obj=json.set(obj,"value",0)]
		[h:resourcesObj=json.set(resourcesObj,currentResource,obj)]
	}]
	[h:resourcesObj=setLibProperty("Resources",resourcesObj,"Lib:"+tokenName)]

	<!----------------------Spell Slots----------------------->
	[h:SpellSlots=getLibProperty("Slots","Lib:"+tokenName)]
	[h,count(9),code:{
	
		[h:SpellSlots=setStrProp(SpellSlots,"value"+number(roll.count+1),0,";")]
	
	}]
	[h:setLibProperty("Slots",SpellSlots,"Lib:"+tokenName)]

	<!----------------------Hit Dice----------------------->

	[h:HitDice=getLibProperty("Hit Dice","Lib:"+tokenName)]
	[h,count(countStrProp(totalHitDice)),code:{
	
		[h:key=indexKeyStrProp(totalHitDice,roll.count)]
		[h:max=indexValueStrProp(totalHitDice,roll.count)]
		[h:value=if(getStrProp(HitDice,key)=="",0,getStrProp(HitDice,key))]
		[h:recover=if(floor(max/2)==0,1,floor(max/2))]
		[h:current=if(value-recover<0,0,value-recover)]
		[h:HitDice=setStrProp(HitDice,key,current)]

	}]
	[h:setLibProperty("Hit Dice",HitDice,"Lib:"+tokenName)]

	<!----------------------Exhaustion----------------------->
	[h,if(getState("Exhaustion 1",id)==1),code:{
		[h:setState("Exhaustion 1",0,id)]
	}]
	[h,if(getState("Exhaustion 2",id)==1),code:{
		[h:setState("Exhaustion 2",0,id)]
		[h:setState("Exhaustion 1",1,id)]
	}]
	[h,if(getState("Exhaustion 3",id)==1),code:{
		[h:setState("Exhaustion 3",0,id)]
		[h:setState("Exhaustion 2",1,id)]
	}]
	[h,if(getState("Exhaustion 4",id)==1),code:{
		[h:setState("Exhaustion 4",0,id)]
		[h:setState("Exhaustion 3",1,id)]
	}]
	[h,if(getState("Exhaustion 5",id)==1),code:{
		[h:setState("Exhaustion 5",0,id)]
		[h:setState("Exhaustion 4",1,id)]
	}]

	<!----------------------HP----------------------->
	[h:total=getLibProperty("Total Hit Points","Lib:"+tokenName)]
	[h:temp=getLibProperty("Temporary Hit Points","Lib:"+tokenName)]
	[h:current=getLibProperty("Current Hit Points","Lib:"+tokenName)]
	[h:setLibProperty("Current Hit Points",total,"Lib:"+tokenName)]
	[h,if(isNumber(total)==0):total=1]
	[h,if(isNumber(current)==0):current=1]

	[h:heal=total-current]
	[h,if(heal==0):healText="";healText="<font color=green><b>"+tokenName+"</b> recovered <b>"+heal+"</b> HP<br>"]
	[h:text="Current HP: <b>"+total+"</b>/<b>"+total+"</b> "+if(temp==0 || temp=="","","(<b>"+temp+"</b>)")]
	[h,if(total==0):total=1]
	[h:broadcast(healText+text+execMacro('[macro("character/HP Bar@this"):"MaxLen=65;MaxValue='+total+';Value='+total+';Color=Green"]'),output)]

	[h,token(id):setBar("Health", total/total)]
	[h,token(id):setBarVisible("Health",0)]

	<!----------------------Text----------------------->
	[h:broadcast("<b>"+tokenName+"</b> took a <b>long rest</b>."),output)]
	[h:broadcast("You recovered: <ul><li><b>Short rest</b> resources<li><b>Long rest</b> resources<li><b>All</b> spell slots<li><b>All</b> Hit Points<li><b>Half</b> of it's hit dice<li><b>One</b> exaustion level</ul>","self")]
};
default:{

	<!----------------------Resources----------------------->
	[h:resourcesObj=getLibProperty("Resources","Lib:"+tokenName)]
	[h:fields=json.fields(resourcesObj)]
	[h,count(listcount(fields)),code:{
	
		[h:currentResource=listget(fields,roll.count)]
		[h:obj=json.get(resourcesObj,currentResource)]
		[h:reset=json.get(obj,"reset")]
		[h:obj=json.set(obj,"value",0)]
		[h:resourcesObj=json.set(resourcesObj,currentResource,obj)]

	
	}]
	[h:resourcesObj=setLibProperty("Resources",resourcesObj,"Lib:"+tokenName)]

	<!----------------------Spell Slots----------------------->
	[h:SpellSlots=getLibProperty("Slots","Lib:"+tokenName)]
	[h,count(9),code:{
	
		[h:SpellSlots=setStrProp(SpellSlots,"value"+number(roll.count+1),0,";")]
	
	}]
	[h:setLibProperty("Slots",SpellSlots,"Lib:"+tokenName)]

	<!----------------------Hit Dice----------------------->
	[h:totalHitDice=""]
	[h,if(json.type(classes)=="UNKNOWN"),code:{
		[h:classList=setLibProperty("Class&Level","{}","Lib:"+tokenName)]
		[h:repeat=0]
	};{
		[h:classList=json.fields(classes)]	
		[h:repeat=listcount(classList)]
	}]
	[h,count(repeat),code:{	
		[h:name=listget(classList,roll.count)]
		[h:object=json.get(classes,name)]
		[h:level=json.get(object,"level")]
		[h:hitDice=json.get(object,"hitDice")]
		[h:currenthitDice=getStrProp(totalHitDice,hitDice)]
		[h:totalHitDice=setStrProp(totalHitDice,hitDice,currenthitDice+level)]
	}]
	[h:HitDice=getLibProperty("Hit Dice","Lib:"+tokenName)]
	[h,count(countStrProp(totalHitDice)),code:{
	
		[h:key=indexKeyStrProp(totalHitDice,roll.count)]
		[h:max=indexValueStrProp(totalHitDice,roll.count)]
		[h:value=getStrProp(HitDice,key)]
		[h:recover=max]
		[h:current=if(value-recover<0,0,value-recover)]
		[h:HitDice=setStrProp(HitDice,key,current)]

	}]
	[h:setLibProperty("Hit Dice",HitDice,"Lib:"+tokenName)]

	<!----------------------Exhaustion----------------------->
	[h,if(getState("Exhaustion 1",id)==1),code:{
		[h:setState("Exhaustion 1",0,id)]
	}]
	[h,if(getState("Exhaustion 2",id)==1),code:{
		[h:setState("Exhaustion 2",0,id)]
	}]
	[h,if(getState("Exhaustion 3",id)==1),code:{
		[h:setState("Exhaustion 3",0,id)]
	}]
	[h,if(getState("Exhaustion 4",id)==1),code:{
		[h:setState("Exhaustion 4",0,id)]
	}]
	[h,if(getState("Exhaustion 5",id)==1),code:{
		[h:setState("Exhaustion 5",0,id)]
	}]

	<!----------------------HP----------------------->
	[h:total=getLibProperty("Total Hit Points","Lib:"+tokenName)]
	[h:temp=getLibProperty("Temporary Hit Points","Lib:"+tokenName)]
	[h:current=getLibProperty("Current Hit Points","Lib:"+tokenName)]
	[h:setLibProperty("Current Hit Points",total,"Lib:"+tokenName)]
	[h,if(isNumber(total)==0):total=1]
	[h,if(isNumber(current)==0):current=1]

	[h:heal=total-current]
	[h,if(heal==0):healText="";healText="<font color=green><b>"+tokenName+"</b> recovered <b>"+heal+"</b> HP<br>"]
	[h:text="Current HP: <b>"+total+"</b>/<b>"+total+"</b> "+if(temp==0 || temp=="","","(<b>"+temp+"</b>)")]
	[h,if(total==0):total=1]
	[h:broadcast(healText+text+execMacro('[macro("character/HP Bar@this"):"MaxLen=65;MaxValue='+total+';Value='+total+';Color=Green"]'),output)]

	[h,token(id):setBar("Health", total/total)]
	[h,token(id):setBarVisible("Health",0)]

	[h:broadcast("<b>"+tokenName+"</b> took a <b>full rest</b>."),output)]
	[h:broadcast("You recovered: <ul><li><b>All</b> resources<li><b>All</b> spell slots<li><b>All</b> Hit Points<li><b>All</b> of it's hit dice<li><b>All</b> exaustion levels</ul>","self")]

}]


[h,if(isFrameVisible(tokenName+" - Character Sheet")==1),code:{
[macro("character/Macro Frame@this"):"macro=Character Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Spellcasting Sheet")==1),code:{
[macro("character/Macro Frame@this"):"macro=Spellcasting Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Description Sheet")==1),code:{
[macro("character/Macro Frame@this"):"macro=Description Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Statblock")==1),code:{
[macro("character/Macro Frame@this"):"macro=Statblock;tokenName="+tokenName]
};{}]