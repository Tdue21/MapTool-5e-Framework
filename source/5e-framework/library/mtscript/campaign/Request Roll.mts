[h:attributeList=getLibProperty("Attributes", function.getNamespace())]
[h:save=""]
[h,count(listcount(attributeList)),code:{
	[h:currentAtr=listget(attributeList,roll.count)]
	[h:save=listAppend(save,"Save: "+currentAtr)]
}]

[h:ability=""]
[h,count(listcount(attributeList)),code:{
	[h:currentAtr=listget(attributeList,roll.count)]
	[h:ability=listAppend(ability,"Ability: "+currentAtr)]
}]

[h:skillList=getLibProperty("Skills", function.getNamespace())]
[h:skill=""]
[h,count(countStrProp(skillList)),code:{
	[h:currentSkill=indexKeyStrProp(skillList,roll.count)]
	[h:skill=listAppend(skill,"Skill: "+currentSkill)]
}]

[h:rollList="Initiative,Death Save,Dice Roller,-----------------------------,"+ability+",-----------------------------,"+save+",-----------------------------,"+skill]


[h:idList=getSelected()]
[h:NameList=getSelectedNames()]

[h:input1="targets|"+NameList+"|Targets|label"]

[h,if(listcount(idList)==0),code:{

	[h:PlayerList=getAllPlayerNames()]
	[h:input1="targets|"+PlayerList+"|Player|list|value=string"]

};{}]


[h:res=input("var|<html><h3>Request Roll</h3></html>||label|span=true",input1,"roll|"+rollList+"|Roll|list|value=string","message||Message")]
[h:abort(res)]
[h,if(roll=="-----------------------------"):abort(0)]

[h,if(listcount(idList)==0),code:{

	[json=json.fromList(targets)]
	[h:idList=getTokens(",","{'owned':"+json+"}")]

};{}]


[h,if(roll=="Dice Roller"),code:{

	[h:res=input(
	"dfour|0|D4",
	"dsix|0|D6",
	"deight|0|D8",
	"dten|0|D10",
	"dtwelve|0|D12",
	"dtwenty|0|D20",
	"dhundred|0|D100",
	"bonus||Bonus")]
	[h:abort(res)]

	[h,if(dfour==""):dfour=0]
	[h,if(dsix==""):dsix=0]
	[h,if(deight==""):deight=0]
	[h,if(dten==""):dten=0]
	[h,if(dtwelve==""):dtwelve=0]
	[h,if(dtwenty==""):dtwenty=0]
	[h,if(dhundred==""):dhundred=0]
	[h,if(bonus==""):bonus=0]

	[h:diceRoll="+"+dfour+"d4"+"+"+dsix+"d6"+"+"+deight+"d8"+"+"+dten+"d10"+"+"+dtwelve+"d12"+"+"+dtwenty+"d20"+"+"+dhundred+"d100"+"+"+bonus]

	[h:diceRoll=replace(diceRoll,"\\+0d\\d+","")]

	[h:diceRoll=replace(diceRoll,"\\++","+")]

	[h:diceRoll=replace(diceRoll,"\\+0\$","")]

	[h:diceRoll=replace(diceRoll,"^\\+","")]

	[h:text="Custom Dice Roll"]
	[h:color="Black"]

};{

	[h:diceRoll=""]
	[h,if(matches(roll,"Skill.*")==1):color="0099cc"]
	[h,if(matches(roll,"Save.*")==1):color="ff9900"]
	[h,if(matches(roll,"Ability.*")==1):color="0099cc"]
	[h,if(roll=="Initiative"):color="blue"]
	[h,if(roll=="Death Save"):color=""]
	[h:text=""]

}]

[h,count(listcount(idList)),code:{

	[h:currentId=listget(idList,roll.count)]
	[h:tokenName=getName(currentId)]
	[h:owners=getOwners(",",currentId)]
	[h,if(owners==""):owners="GM"]
	
	[h:link=macroLinkText("campaign/Request Roll Process@this","","tokenName="+tokenName+";roll="+roll+";diceRoll="+diceRoll+";color="+color+";text="+text+";player="+getPlayerName()+";message="+message)]
	[h:execLink(link,0,owners)]

}]