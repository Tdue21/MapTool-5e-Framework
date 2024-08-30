[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:rolltype=getStrProp(macro.args,"rolltype")]
[h:randomBonus=getStrProp(macro.args,"randomBonus")]

[h:attributeList=getLibProperty("Attributes", function.getNamespace())]

[h:classes=getLibProperty("Class&Level","Lib:"+tokenName)]
[h:totalLevel=0]
[h,if(json.type(classes)=="UNKNOWN"),code:{
	[h:classList=setLibProperty("Class&Level","{}","Lib:"+tokenName)]
	[h:repeat=0]
};{
	[h:classList=json.fields(classes)]	
	[h:repeat=listcount(classList)]
}]

[h,count(repeat,""),code:{

	[h:name=listget(classList,roll.count)]
	[h:object=json.get(classes,name)]
	[h:class=json.get(object,"name")]
	[h:level=json.get(object,"level")]
	[h:subclass=json.get(object,"subclass")]

	[h:totalLevel=totalLevel+level]
	

}]

[h:profBonus=ceil(totalLevel/4)+1]

[h:AtrProps=""]
[h,count(listcount(attributeList),""),code:{
	[h:attribute=listget(attributeList,roll.count)]
	[h:value=getLibProperty(attribute,"Lib:"+tokenName)]
	[h:value=getStrProp(value,"value")]
	[h:value=if(value=="",0,value)]
	[h,if(isNumber(value)==0):value=eval(value);value]
	[h:mod=floor(number(eval(string(value)))/2-5)]
	[h:AtrProps=setStrProp(AtrProps,substring(lower(attribute),0,3),mod)]
}]
[h:varsFromStrProp(AtrProps)]


[h,switch(rolltype),code:
case "1":{

	[macro("character/Skills and Saves@this"):"Roll=Skill;randomBonus="+randomBonus+";tokenName="+tokenName+";profBonus="+profBonus]

};
case "2":{

	[h:res=input("index|-,"+attributeList+"|Attribute|radio|span=true")]
	[h:abort(res)]
	[h:abort(index)]
	[h:index=index-1]
	[h:attribute=listget(attributeList,index)]
	[h:str=substring(lower(attribute),0,3)]
	[h:prop=getLibProperty(attribute,"Lib:"+tokenName)]
	[h:propValue=getStrProp(string(prop),"value")]
	[h:prof=getStrProp(string(prop),"prof")]
	[h:other=getStrProp(string(prop),"bonus")]

	[h,if(isNumber(other)==1):"";other=0]

	[h,switch(prof):
	case "0":bonus=0;
	case "1":bonus=floor(profBonus/2);
	case "2":bonus=ceil(profBonus/2);
	case "3":bonus=profBonus;
	case "4":bonus=profBonus*2;
	default:bonus=0]

	[h:bonus=bonus+other]
	
	[h:propValue=if(propValue=="",0,propValue)]
	
	[h:evalAtr=number(eval(string(propValue)))]

	[h:mod=getStrProp(AtrProps,str)]

	[h:bonusDisplay=mod+bonus]

	[macro("character/d20 Roller@this"):"text="+attribute+" check;value=+"+if(bonusDisplay<0,bonusDisplay,"+"+bonusDisplay)+if(randomBonus==0 || randomBonus=="","","++"+randomBonus)+";tokenName="+tokenName+";color=0099cc"]

};
case "3":{

	[macro("character/Skills and Saves@this"):"Roll=Save;randomBonus="+randomBonus+";tokenName="+tokenName+";profBonus="+profBonus]

};
case "4":{

	[h:dexValue=dex]

	[h:value=getLibProperty("Initiative","Lib:"+tokenName)]
	
	[h:init=dex+getStrProp(string(value),"value")]
	[h:text=getStrProp(string(init),"text")]
	
	[h:prof=getStrProp(string(dexValue),"prof")]
	
	[h,switch(prof):
	case "0":bonus=0;
	case "1":bonus=floor(profBonus/2);
	case "2":bonus=ceil(profBonus/2);
	case "3":bonus=profBonus;
	case "4":bonus=profBonus*2;
	default:bonus=0]
	
	[h:init=init+bonus]

	[h,macro("character/d20 Roller@this"):"text=Initiative"+if(text=="" || text==0,""," | "+text)+";value=+"+if(init<0,init,"+"+init)+if(randomBonus==0 || randomBonus=="","","++"+randomBonus)+";tokenName="+tokenName+";color=blue"]

};
case "5":{

	[h:res=input("atkName|Weapon|Attack","atr|"+attributeList+"|Attribute|List|select=0","isProf|1|Proficient|Check")]
	[h:abort(res)]

	[h,switch(atr):
	case "1":mod=dex;
	case "2":mod=con;
	case "3":mod=int;
	case "4":mod=wis;
	case "5":mod=cha;
	default:mod=str
	]

	[mod=mod+if(isProf==1,profBonus,0)]

	[h,macro("character/d20 Roller@this"):"text="+capitalize(atkName)+" Attack;value=++"+mod+if(randomBonus==0 || randomBonus=="","","++"+randomBonus)+";tokenName="+tokenName+";color=red"]

};
case "6":{

[h:spellcasting=""]
[h:classes=getLibProperty("Class&Level","Lib:"+tokenName)]
[h:totalLevel=0]
[h,if(json.type(classes)=="UNKNOWN"),code:{
	[h:classList=setLibProperty("Class&Level","{}","Lib:"+tokenName)]
	[h:repeat=0]
};{
	[h:classList=json.fields(classes)]	
	[h:repeat=listcount(classList)]
}]
[h:spellClassList=""]
	[r,count(repeat,""),code:{
	
		[h:name=listget(classList,roll.count)]
		[h:object=json.get(classes,name)]
		[h:class=json.get(object,"name")]
		[h:level=json.get(object,"level")]
	
	
		[h:totalLevel=totalLevel+level]
	<!-----------------SPELLCASTING CLASS------------------->	
		[h:spellAtr=json.get(object,"spellcasting")]
		
		[h,if(spellAtr=="-"):"";spellClassList=listappend(spellClassList,name," /")]
	
	
	
	}]

	
	[h:spellAtributeList=""]
	[h,count(listcount(spellClassList," /")),code:{
	
		[h:spellClass=listget(spellClassList,roll.count,"/")]
		[h:spellObj=json.get(classes,spellClass)]
		[h:spellAtribute=json.get(spellObj,"spellcasting")]
		[h:spellAtributeList=listappend(spellAtributeList,spellAtribute," /")]
		[h:isDuplicate=listcontains(spellAtributeList,spellAtribute," /")]
		[h:listLocation=listfind(spellAtributeList,spellAtribute," /")]
		[h,if(isDuplicate==1):"";spellAtributeList=listdelete(spellAtributeList,listLocation," /")]
	
	}]

	[h:res=input("atr|"+attributeList+"|Attribute|List|select="+listfind(attributeList,listget(spellAtributeList,0)))]
	[h:abort(res)]

	[h,switch(atr):
	case "1":mod=dex;
	case "2":mod=con;
	case "3":mod=int;
	case "4":mod=wis;
	case "5":mod=cha;
	default:mod=str
	]

	[h:atrName=capitalize(substring(listget(attributeList,atr),0,3))]

	[h,macro("character/d20 Roller@this"):"text="+atrName+" Spell Attack;value=++"+mod+if(randomBonus==0 || randomBonus=="","","++"+randomBonus)+";tokenName="+tokenName+";color=8a61ae"]

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


	[h,macro("character/Dice Roller@this"):"text=Custom Dice Roll;value="+diceRoll+";tokenName="+tokenName+";color=Black"]

}]



