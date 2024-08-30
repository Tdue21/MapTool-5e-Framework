[h:text=getStrProp(macro.args,"text")]
[h:diceRoll=getStrProp(macro.args,"value")]
[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:color=getStrProp(macro.args,"color")]
[h:group=getStrProp(macro.args,"group")]
[h:name=getStrProp(macro.args,"name")]
[h:customName=getStrProp(macro.args,"customName")]

[h:id=findToken(tokenName)]
[h,if(id==""):"";switchToken(id)]

[h:output=function.getOutput()]

[h:classes=getLibProperty("Class&Level","Lib:"+tokenName)]

[h:classProps=""]
[h,if(json.type(classes)=="UNKNOWN"),code:{
	[h:classList=setLibProperty("Class&Level","{}","Lib:"+tokenName)]
	[h:repeat=0]
};{
	[h:classList=json.fields(classes)]	
	[h:repeat=listcount(classList)]
}]
[h,count(repeat,""),code:{
	[h:className=listget(classList,roll.count)]
	[h:object=json.get(classes,className)]
	[h:level=json.get(object,"level")]
	[h:classProps=setStrProp(classProps,className,level)]
}]


[h:attributeList=getLibProperty("Attributes","Lib:"+tokenName)]
[h:atrList=""]

[h,count(listCount(attributeList)),code:{

	[h:atr=listget(attributeList,roll.count)]
	[h:atrList=listappend(atrList,substring(lower(atr),0,3))]

}]

[h:gameplay=getLibProperty("Gameplay","Lib:Campaign")]
[h:autoInit=getStrProp(gameplay,"autosetInitiative")]

[h,if(autoInit==1 && matches(text,"Initiative.*")==1),code:{

	[h:value=getLibProperty("Initiative","Lib:"+tokenName)]
	[h:adv=getStrProp(string(value),"adv")]
	
	[h:res=1]
	[h,switch(adv):
	case "0":roll=0;
	case "1":roll=1;
	case "2":roll=2;
	case "3":res=input("var|<html><h3>"+tokenName+" initiative||label|span=true","roll|Normal Roll,Advantage,Disadvantage|Roll|radio|span=true");
	default:roll=0)]
	[h:abort(res)]
};{}]

[h:roll1=1d20]
[h:roll2=1d20]
<!--------------------------------DICE SOUNDS---------------------------------->
[macro("campaign/Dice Sounds@this"):""]
[macro("campaign/Dice Sounds@this"):""]


[h:img=tableImage("BlankDice",20)]

[h:color=if(color=="death",if(roll1>=10,"green","red"),color)]

<table style="border:1px solid [r:color];" width=200>
	<tr>
		<td colspan=4 bgcolor=[r:color]>
		<font color=white><b>[r:text]:</b> ([r:roll1]/[r:roll2])
	<tr>
		<td style="padding-top: 5px" align=center valign=middle width=25%>


		<table>
			<tr><td width=32 height=32 align=center valign=middle background=[r:img] style="background-repeat: no-repeat;background-position: center; padding-left:4px; padding-bottom:5px">
			<font color=[r:if(roll1==1,"ff5b5b",if(roll1==20,"3cff00","white"))] size=4><b>
			
			[r:roll1]


		</table>

		
		<td align=center valign=middle width=25%>
		<font size=4 color=gray><b>

[h:formula=""]


[h:advRoll=if(roll1>roll2,roll1,roll2)]
[h:disadvRoll=if(roll1<roll2,roll1,roll2)]




[h:id=strfind(diceRoll,"([-+]?)(?:(\\d+)d(\\d+)|([0-9A-Za-z|]+))")]
[r,count(getFindCount(id),""),code:{
	[h:group1=getGroup(id,roll.count+1,1)]
	[h:group2=getGroup(id,roll.count+1,2)]
	[h:group3=getGroup(id,roll.count+1,3)]
	[h:group4=getGroup(id,roll.count+1,4)]

	[h:dices=if(group2=="",1,group2)]
	[h:group2=if(isNumber(group2)==1,group2,0)]

	[h:firstRoll=roll.count]
	[r,if(isNumber(group3)==1),count(dices,""),code:{

		[r:if(roll.count==0,"","+")]
		[h:dice=roll(1,group3)]
		[r:dice=if(group1=="-",dice*-1,if(firstRoll==0,"","+")+dice)]
		[h:formula=add(formula,dice)]
		
	};{}]

	[r,if(isNumber(group4)==1),code:{
		
		[h:lvl=0]
		[r:group1+group4]
		[h:formula=add(formula,number(group1+group4))]
	
	};{
		[h:lvl=getStrProp(classProps,group4)]
		
	}]
	[h:formula=add(formula,lvl)]

	[h,if(lvl==""):lvl=0;""]
	[r:if(lvl<0,"",if(lvl==0,"",if(firstRoll==0,"","+")))+if(lvl==0,"",lvl)]


[h:countMax=listcount(group4,"|")]
[h:countMax=if(countMax==0,1,countMax)]
[h,count(countMax):index=listfind(atrList,listget(group4,roll.count,"|"))]
[h:maxValue=""]
[h,count(countMax):maxValue=listappend(maxValue,getStrProp(getLibProperty(listget(attributeList,listfind(atrList,listget(group4,roll.count,"|"))),"Lib:"+tokenName),"value"))]
[h:atrValue=listget(listsort(maxValue,"N-"),0)]
[h,if(atrValue==""):"";atrValue=eval(string(atrValue))]
[h,if(index==-1):mod=0;mod=floor(number(atrValue)/2)-5]

	[h:formula=add(formula,mod)]

	[r:if(mod<0,"",if(mod==0,"","+"))+if(mod==0,"",mod)]
}]


[h:formulaNormal=add(formula,roll1)]



		<td align=center valign=middle width=25%>
		<font size=4 color=[r:color]><b>


		[r:formulaNormal]
		
		<td valign=middle width=25%>
		<font size=2 color=gray>Adv:
		
		[r:adv=add(formula,advRoll)]

		
		<br>
		<font size=2 color=gray>Dis:
		
		[r:dis=add(formula,disadvRoll)]
		
		
		
</table>

[h:macro.return="normal="+formulaNormal+";adv="+adv+";dis="+dis]

<font color=gray size=2 style="text-decoration:none">




[r,if(autoInit==1 && matches(text,"Initiative.*")==1),code:{

	[h,macro("character/Set Initiative@this"):"tokenName="+tokenName+";value="+if(roll==0,formulaNormal,if(roll==1,adv,dis))]

};{

	[r,if(isGM()==1):if(matches(text,"Initiative.*")==1,macrolink("[Set initiative]", "character/Set Initiative@this")"","tokenName="+tokenName+";value="+formulaNormal),"")]
	[r,if(isGM()==1):if(matches(text,"Initiative.*")==1,macrolink("[Adv]", "character/Set Initiative@this")"","tokenName="+tokenName+";value="+adv),"")]
	[r,if(isGM()==1):if(matches(text,"Initiative.*")==1,macrolink("[Dis]", "character/Set Initiative@this")"","tokenName="+tokenName+";value="+dis),"")]
	[r,if(isGM()==1):if(matches(text,"Initiative.*")==1 && output!="all","<br>","")]

}]

[r,if(output!="all"):macrolink("[Share Result]", "character/ShareRoll@this")"all",formulaNormal)]
[r,if(output!="all"):macrolink("[Adv]", "character/ShareRoll@this")"all",adv)]
[r,if(output!="all"):macrolink("[Dis]", "character/ShareRoll@this")"all",dis)]

[r,if(name==""):"";macrolink("[info]", "character/Args Dialog@this")"","prop="+group+";name="+name+";customName="+customName+";tokenName="+tokenName)]