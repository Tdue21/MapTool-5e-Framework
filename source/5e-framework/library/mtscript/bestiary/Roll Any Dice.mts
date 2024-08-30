[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:rolltype=getStrProp(macro.args,"rolltype")]
[h:randomBonus=getStrProp(macro.args,"randomBonus")]

[h:id=findToken(tokenName)]
[h:switchToken(id)]

[h:name=getProperty("CreatureName")]

[h,if(name==""):object=getProperty("Stats");object=json.get(getLibProperty("Bestiary","Lib:Compendium"),name)]

[h:cr=json.get(object,"challenge")]
[h,if(cr==""):challenge="";challenge=substring(cr,0,indexOf(cr," "))]
[h,if(matches(challenge,".*/.*")==1):numericCR=eval(challenge);numericCR=challenge]
[h,if(isNumber(numericCR)==1):"";numericCR=1]
[h:profBonus=ceil(numericCR/4)+1]

[h,if(json.type(object)=="UNKNOWN"):object="{}"]

[h:setProperty("Stats",object)]

[h:macroName="bestiary/Change Property@this"]
[h:args="name="+name+";json="+object+";tokenName="+token.name+";key="]

[h,switch(rolltype),code:
case "1":{

	[macro("bestiary/Skills and Saves@this"):args+"skill"]

};
case "2":{

	[h:attributes="Strength,Dexterity,Constitution,Intelligence,Wisdom,Charisma"]

	[h:res=input("index|"+attributes+"|Attribute|radio|span=true")]
	[h:abort(res)]
	[h:attribute=listget(attributes,index)]
	[h:atr=lower(substring(attribute,0,3))]
	[h:val=json.get(object,atr)]
	[h,if(isNumber(val)==1):mod=floor(val/2-5);mod=-5]

	[macro("bestiary/d20 Roller@this"):"text="+attribute+" check;value=+"+if(mod<0,mod,"+"+mod)+if(randomBonus==0 || randomBonus=="","","++"+randomBonus)+";tokenName="+tokenName+";color=0099cc"]

};
case "3":{

	[macro("bestiary/Skills and Saves@this"):args+"save"]
};
case "4":{

	<!-----------------INITIATIVE------------------->
	[h:dex=json.get(object,"dex")]
	[h,if(isNumber(dex)==1):dex=floor(dex/2-5);dex=-5]

	[h:init=dex]
	

	[h,macro("bestiary/d20 Roller@this"):"text=Initiative;value=+"+if(init<0,init,"+"+init)+if(randomBonus==0 || randomBonus=="","","++"+randomBonus)+";tokenName="+tokenName+";color=blue"]

};
case "5":{

	[h:attributes="Strength,Dexterity,Constitution,Intelligence,Wisdom,Charisma"]

	[h:res=input("atkName|Weapon|Attack","index|"+attributes+"|Attribute|List|select=0","prof|"+profBonus+"|Proficiency")]
	[h:abort(res)]


	[h:attribute=listget(attributes,index)]
	[h:atr=lower(substring(attribute,0,3))]
	[h:val=json.get(object,atr)]
	[h,if(isNumber(val)==1):mod=floor(val/2-5);mod=-5]
	[h:mod=mod+prof]

	[h,macro("bestiary/d20 Roller@this"):"text="+capitalize(atkName)+" Attack;value=++"+mod+if(randomBonus==0 || randomBonus=="","","++"+randomBonus)+";tokenName="+tokenName+";color=red"]

};
case "6":{
	[h:attributes="Strength,Dexterity,Constitution,Intelligence,Wisdom,Charisma"]

	[h:res=input("index|"+attributes+"|Attribute|List|select=3","prof|2|Proficiency")]
	[h:abort(res)]


	[h:attribute=listget(attributes,index)]
	[h:atr=lower(substring(attribute,0,3))]
	[h:val=json.get(object,atr)]
	[h,if(isNumber(val)==1):mod=floor(val/2-5);mod=-5]
	[h:mod=mod+prof]

	[h,macro("bestiary/d20 Roller@this"):"text="+capitalize(atr)+" Spell Attack;value=++"+mod+if(randomBonus==0 || randomBonus=="","","++"+randomBonus)+";tokenName="+tokenName+";color=8a61ae"]

};
default:{

	[h:res=input(
	"dfour|0|D4",
	"dsix|0|D6",
	"deight|0|D8",
	"dten|0|D10",
	"dtwelve|0|D12",
	"dtwenty|0|D20",
	"dhundred|0|D100",
	"bonus|"+randomBonus+"|Bonus")]
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


	[h,macro("bestiary/Dice Roller@this"):"text=Custom Dice Roll;value="+diceRoll+";tokenName="+tokenName+";color=Black"]

}]



