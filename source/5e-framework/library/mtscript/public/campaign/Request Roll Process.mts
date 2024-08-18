[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:roll=getStrProp(macro.args,"roll")]
[h:diceRoll=getStrProp(macro.args,"diceRoll")]
[h:color=getStrProp(macro.args,"color")]
[h:text=getStrProp(macro.args,"text")]
[h:player=getStrProp(macro.args,"player")]
[h:message=getStrProp(macro.args,"message")]


[h:id=findToken(tokenName)]
[h,if(id==""):"";switchToken(id)]

[h,if(id==""):propType="";propType=getPropertyType(id)]

[h,if(propType=="NPC"),code:{

	[h:stats=getProperty("stats")]

	<!------------------Switch----------------->
	
	[h:input1="var|Your GM requests a roll from "+tokenName+":||label|span=true"]
	[h:input2=if(message==0 || message=="","","var|<html><b>"+player+" says</b>: "+message+"</html>||label|span=true")]
	
	[h:rollType=substring(roll,0,if(indexOf(roll,":")==-1,length(roll),indexOf(roll,":")))]
	
	[h,switch(rollType),code:
	case "Initiative":{
	
		<!-----------------INITIATIVE------------------->

		[h:rollName="Initiative"]
		
		[h:res=input(input1,"var|<html><h1>"+rollName+"</h1></html>||label|span=true",input2)]
		[h:abort(res)]
		
		[h:dex=json.get(stats,"dex")]
		[h,if(isNumber(dex)==1):dex=floor(dex/2-5);dex=-5]
		
		[macro("d20 Roller@Lib:Bestiary"):"text=Initiative;value=+"+if(dex<0,dex,"+"+dex)+";tokenName="+tokenName+";color=blue")]
	
	};
	case "Death Save":{
	
		<!------------------Death Save----------------->
		[h:rollName="Death Save"]
		
		[h:res=input(input1,"var|<html><h1>"+rollName+"</h1></html>||label|span=true",input2)]
		[h:abort(res)]
	
		[macro("d20 Roller@Lib:Bestiary"):"text="+tokenName+" - Death Save;value=;tokenName="+tokenName+";color=death"]
	
	};
	case "Skill":{

		[h:atr=replace(roll,"^.*?:\\s","")]

		[h:skills=getLibProperty("Skills","Lib:Character")]
	
		[h:skillName=replace(roll,"^.*?:\\s","")]
	
		[h:skill=json.get(stats,"skill")]
		[h:skill=replace(skill,"\\s*[+-]\\s*","=")]
		[h:skill=getStrProp(skill,skillName,"",",")]
		
		[h:atr=lower(substring(getStrProp(skills,skillName),0,3))]
	
		[h:atrValue=json.get(stats,atr)]
	
		[h,if(isNumber(atrValue)==0):atrValue=eval(atrValue);""]
		[h:mod=floor(number(eval(string(atrValue)))/2-5)]
		[h,if(skill==""):mod=mod;mod=skill]

		[h:rollName=getStrProp(skills,skillName)+" ("+skillName+")"]

		[h:res=input(input1,"var|<html><h1>"+rollName+"</h1></html>||label|span=true",input2)]
		[h:abort(res)]

		[macro("d20 Roller@Lib:Bestiary"):";text="+tokenName+" - "+skillName+";value=+"+if(mod<0,mod,"+"+mod)+";tokenName="+tokenName+";color="+color]
	
	};
	case "Save":{

		[h:atr=replace(roll,"^.*?:\\s","")]

		[h:rollName=atr+" saving throw"]

		[h:atr=lower(substring(atr,0,3))]

		[h:res=input(input1,"var|<html><h1>"+rollName+"</h1></html>||label|span=true",input2)]
		[h:abort(res)]
	
		[h:save=json.get(stats,"save")]
		[h:save=replace(save,"\\s*[+-]\\s*","=")]
		[h:save=getStrProp(save,atr,"",",")]
	
		[h:atrValue=json.get(stats,atr)]
	
		[h,if(isNumber(atrValue)==0):atrValue=eval(atrValue);""]
		[h:mod=floor(number(eval(string(atrValue)))/2-5)]
		[h,if(save==""):mod=mod;mod=save]

		[macro("d20 Roller@Lib:Bestiary"):";text="+tokenName+" - "+upper(atr,1)+";value=+"+if(mod<0,mod,"+"+mod)+";tokenName="+tokenName+";color="+color]
	
	};
	case "Ability":{

		[h:atr=replace(roll,"^.*?:\\s","")]

		[h:rollName=atr+" check"]

		[h:atr=lower(substring(atr,0,3))]

		[h:res=input(input1,"var|<html><h1>"+rollName+"</h1></html>||label|span=true",input2)]
		[h:abort(res)]
	
		[h:atrValue=json.get(stats,atr)]
	
		[h,if(isNumber(atrValue)==0):atrValue=eval(atrValue);""]
		[h:mod=floor(number(eval(string(atrValue)))/2-5)]

		[macro("d20 Roller@Lib:Bestiary"):";text="+tokenName+" - "+upper(atr,1)+";value=+"+if(mod<0,mod,"+"+mod)+";tokenName="+tokenName+";color="+color]
	
	};
	default:{
	<!------------------Dice Roller----------------->
	
		[h:rollName=diceRoll]
	
		[h:res=input(input1,"var|<html><h1>"+rollName+"</h1></html>||label|span=true",input2)]
		[h:abort(res)]
	
		[macro("Dice Roller@Lib:Bestiary"):"text="+tokenName+" - Dice Roll;value="+diceRoll+";id=;tokenName="+tokenName+";color="+color]
	
	}]


};{
	
	<!------------------Proficiency Bonus----------------->
	
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
	
	<!------------------Set Vars----------------->
	[h:attributeList=getLibProperty("Attributes", "Lib:Character")]
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
	
	
	
	<!------------------Switch----------------->
	
	[h:input1="var|Your GM requests a roll from "+tokenName+":||label|span=true"]
	[h:input2=if(message==0 || message=="","","var|<html><b>"+player+" says</b>: "+message+"</html>||label|span=true")]
	
	[h:rollType=substring(roll,0,if(indexOf(roll,":")==-1,length(roll),indexOf(roll,":")))]
	
	[h,switch(rollType),code:
	case "Initiative":{
	<!------------------Initiative----------------->
		[h:rollName="Initiative"]
		
		[h:res=input(input1,"var|<html><h1>"+rollName+"</h1></html>||label|span=true",input2)]
		[h:abort(res)]
	
	
		
		[h:value=getLibProperty("Initiative","Lib:"+tokenName)]
	
		[h:init=getStrProp(string(value),"value")]
		[h,if(isNumber(init)==1):"";init=0]
		
		[h:dexValue=getLibProperty("Dexterity","Lib:"+tokenName)]
		[h:prof=getStrProp(string(dexValue),"prof")]
		
		[h,switch(prof):
		case "0":bonus=0;
		case "1":bonus=floor(profBonus/2);
		case "2":bonus=ceil(profBonus/2);
		case "3":bonus=profBonus;
		case "4":bonus=profBonus*2;
		default:bonus=0]
	
		[h:mod=getStrProp(AtrProps,"dex")]
	
		[h:init=number(init+bonus+mod)]
		
		[macro("d20 Roller@Lib:Character"):"text=Initiative"+if(text=="" || text==0,""," | "+text)+";value=+"+if(init<0,init,"+"+init)+";tokenName="+tokenName+";color=blue")]
	
	};
	case "Death Save":{
	<!------------------Death Save----------------->
		[h:rollName="Death Save"]
		
		[h:res=input(input1,"var|<html><h1>"+rollName+"</h1></html>||label|span=true",input2)]
		[h:abort(res)]
	
		[macro("d20 Roller@Lib:Character"):"text=Death Save;value=;tokenName="+tokenName+";color=death"]
	
	};
	case "Skill":{
	<!------------------Skill----------------->
	
		[h:skill=replace(roll,"^.*?:\\s","")]
	
		[h:SkillObject=getLibProperty("Skills","Lib:"+tokenName)]
		[h:fields=json.fields(SkillObject)]
	
		[h:skillList=""]
		[h,count(listcount(fields)):skillList=listappend(skillList,json.get(json.get(SkillObject,roll.count),"name"))]
	
		[h:index=listfind(skillList,skill)]
		[h:obj=json.get(SkillObject,index)]
		[h:attribute=json.get(obj,"attribute")]
		[h:prof=json.get(obj,"prof")]
		[h:half=json.get(obj,"half")]
		[h:other=json.get(obj,"other")]
		
		[h:bonus=if(prof==0,if(half==1,floor(profBonus/2),if(half==2,ceil(profBonus/2),profBonus*prof)),profBonus*prof)]
	
		[h:rollName=attribute+" ("+skill+")"]
	
		[h:mod=getStrProp(AtrProps,substring(attribute,0,3))]
	
		[h:bonusDisplay=mod+bonus+other]
	
		[h:res=input(input1,"var|<html><h1>"+rollName+"</h1></html>||label|span=true",input2)]
		[h:abort(res)]
	
		[macro("d20 Roller@Lib:Character"):"text="+upper(substring(attribute,0,3),1)+" ("+skill+")"+";value=+"+if(bonusDisplay<0,bonusDisplay,"+"+bonusDisplay)+";id=;tokenName="+tokenName+";color="+color]
	
	};
	case "Save":{
	
	<!------------------Save----------------->
	
		[h:save=replace(roll,"^.*?:\\s","")]
	
		[h:SaveObject=getLibProperty("SavingTrows","Lib:"+tokenName)]
		[h:fields=json.fields(SaveObject)]
	
		[h:SaveList=""]
		[h,count(listcount(fields)):SaveList=listappend(SaveList,json.get(json.get(SaveObject,roll.count),"name"))]
	
		[h:index=listfind(SaveList,save)]
		[h:obj=json.get(SaveObject,index)]
		[h:prof=json.get(obj,"prof")]
		[h:other=json.get(obj,"other")]
		
		[h:bonus=profBonus*prof]
	
		[h:rollName=save+" saving throw"]
	
		[h:mod=getStrProp(AtrProps,substring(save,0,3))]
	
		[h:bonusDisplay=mod+bonus+other]
	
		[h:res=input(input1,"var|<html><h1>"+rollName+"</h1></html>||label|span=true",input2)]
		[h:abort(res)]
	
		[macro("d20 Roller@Lib:Character"):"text="+save+" save;value=+"+if(bonusDisplay<0,bonusDisplay,"+"+bonusDisplay)+";id=;tokenName="+tokenName+";color="+color]
	
	};
	case "Ability":{
	
	<!------------------Ability----------------->
	
		[h:atr=replace(roll,"^.*?:\\s","")]
	
		[h:mod=getStrProp(AtrProps,substring(atr,0,3))]
	
		[h:atrValue=getLibProperty(atr,"Lib:"+tokenName)]
		[h:prof=getStrProp(string(atrValue),"prof")]
		[h:other=getStrProp(string(atrValue),"bonus")]
	
		[h,switch(prof):
		case "0":bonus=0;
		case "1":bonus=floor(profBonus/2);
		case "2":bonus=ceil(profBonus/2);
		case "3":bonus=profBonus;
		case "4":bonus=profBonus*2;
		default:bonus=0]
	
		[h:rollName=atr+" check"]
	
		[h:bonusDisplay=mod+bonus+other]
	
		[h:res=input(input1,"var|<html><h1>"+rollName+"</h1></html>||label|span=true",input2)]
		[h:abort(res)]
	
		[macro("d20 Roller@Lib:Character"):"text="+rollName+";value=+"+if(bonusDisplay<0,bonusDisplay,"+"+bonusDisplay)+";id=;tokenName="+tokenName+";color="+color]
	
	};
	default:{
	<!------------------Dice Roller----------------->
	
		[h:rollName=diceRoll]
	
		[h:res=input(input1,"var|<html><h1>"+rollName+"</h1></html>||label|span=true",input2)]
		[h:abort(res)]
	
		[macro("Dice Roller@Lib:Character"):"text="+tokenName+" - Dice Roll;value="+diceRoll+";id=;tokenName="+tokenName+";color="+color]
	
	}]

}]