[h:idList=getSelected()]

[h,if(isGM()==1),code:{

	[h:res=input("var|Roll initiative for all selected tokens?||Label|span=true",
	"pc|0|PCs|check",
	"npc|1|NPCs|check")]
	[h:abort(res)]
};{
	[h:owned=getTokenNames(",","{'pc':1,'owned':'self'}")]
	[h:res=input("tokenName|"+owned+"|Roll initiative for|List|value=string")]
	[h:abort(res)]
	[h:idList=findToken(tokenName)]
	[h:pc=1]
	[h:npc=0]
}]

[h,count(listcount(idList)),code:{

[h:id=listget(idList,roll.count)]
[h:switchToken(id)]

	[h,if(pc==1 && isPC()==1),code:{

		[h:tokenName=getName(id)]

		[h:classes=getLibProperty("Class&Level","Lib:"+tokenName)]
		[h:totalLevel=0]
		[h:repeat=0]
		[h:classList=""]
		[h,if(json.type(classes)=="UNKNOWN"):classList=setLibProperty("Class&Level","{}","Lib:"+tokenName);classList=json.fields(classes)]
		[h:repeat=listcount(classList)]
		
		[h,count(repeat,""):totalLevel=totalLevel+json.get(json.get(classes,listget(classList,roll.count)),"level")]
		
			
		[h:profBonus=ceil(totalLevel/4)+1]

		[h:dexValue=getLibProperty("Dexterity","Lib:"+tokenName)]
		[h:dex=getStrProp(dexValue,"Value")]
		[h,if(dex==""):dex=0;""]
		[h,if(isNumber(dex)==1):"";dex=eval(dex)]
		[h,if(isNumber(dex)==1):dex=floor(dex/2-5);dex=-5]


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
	
		[h,macro("d20 Roller@Lib:Character"):"text=Initiative"+if(text=="" || text==0,""," | "+text)+";value=+"+if(init<0,init,"+"+init)+";tokenName="+tokenName+";color=blue"]
		
	};{}]
	
	[h,if(npc==1 && isNPC()==1),code:{
	
		[h:object=getProperty("Stats")]
		[h:dex=json.get(object,"dex")]
		[h,if(isNumber(dex)==1):dex=floor(dex/2-5);dex=-5]
	
		[h,macro("d20 Roller@Lib:Bestiary"):"text=Initiative;value=+"+if(dex<0,dex,"+"+dex)+";tokenName="+token.name+";color=blue"]
	
	};{}]



}]