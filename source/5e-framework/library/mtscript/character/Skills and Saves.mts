[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:roll=getStrProp(macro.args,"Roll")]
[h:profBonus=getStrProp(macro.args,"profBonus")]
[h:randomBonus=getStrProp(macro.args,"randomBonus")]

[h:id=findToken(tokenName)]
[h,if(id==""):"";switchToken(id)]

[h:SaveObject=getLibProperty("SavingTrows","Lib:"+tokenName)]
[h:SkillObject=getLibProperty("Skills","Lib:"+tokenName)]

[h,if(roll=="Save"):rollObj=SaveObject;rollObj=SkillObject]

[h:fields=json.fields(rollObj)]

[h:list=""]
[h,count(listcount(fields)),code:{

	[h:currentValue=json.get(rollObj,roll.count)]
	[h:name=json.get(currentValue,"name")]
	[h:prof=json.get(currentValue,"prof")]
	[h:att=json.get(currentValue,"attribute")]
	[h,if(roll=="Save"):list=listappend(list,"<html>"+if(prof==0,"","<b>")+name+"</b></html>");list=listappend(list,"<html>"+if(prof==0,"","<b>")+name+"</b> <font color=gray>("+substring(att,0,3)+")</font></html>")]

}]

[h:res=input("index|-,"+list+"|"+roll+"|radio|span=true")]
[h:abort(res)]
[h:abort(index)]
[h:index=index-1]

[h:currentValue=json.get(rollObj,index)]

[h:name=json.get(currentValue,"name")]
[h:prof=json.get(currentValue,"prof")]
[h:half=json.get(currentValue,"half")]
[h:half=if(half=="",0,half)]
[h:other=json.get(currentValue,"other")]
[h:skillAttribute=json.get(currentValue,if(roll=="Save","name","attribute"))]
[h:atrValue=getStrProp(getLibProperty(skillAttribute,"Lib:"+tokenName),"value")]
[h:atrValue=if(atrValue=="",0,atrValue)]
[h,if(isNumber(atrValue)==0):atrValue=eval(atrValue);""]
[h:mod=if(isNumber(atrValue)==0,0,atrValue)]
[h:mod=floor(mod/2-5)]

[h:bonus=if(prof==0,if(half==1,floor(profBonus/2),if(half==2,ceil(profBonus/2),profBonus*prof)),profBonus*prof)]

[h:skillBonus=mod+bonus]
[h,if(roll=="Save"):atr="";atr=upper(substring(skillAttribute,0,3),1)]
[h:bonusDisplay=number(skillBonus+other)]

[h:color=if(roll=="Save","ff9900","0099cc")]
[h:text=if(roll=="Save",name+" save",atr+" ("+name+")")]

[macro("character/d20 Roller@this"):"text="+text+";value=+"+if(bonusDisplay<0,bonusDisplay,"+"+bonusDisplay)+if(randomBonus==0 || randomBonus=="","","++"+randomBonus)+";id=;tokenName="+tokenName+";color="+color]

