[h:text=getStrProp(macro.args,"text")]
[h:diceRoll=getStrProp(macro.args,"value")]
[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:group=getStrProp(macro.args,"group")]
[h:name=getStrProp(macro.args,"name")]
[h:customName=getStrProp(macro.args,"customName")]


[h:iscrit=if(text=="Critical Hit!",1,0)]

[h:id=findToken(tokenName)]
[h,if(id==""):"";switchToken(id)]

[h:output= function.getOutput())]
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





<table style="border:1px solid [r:if(iscrit==1,'cca300','Black')];margin: 0px; padding: 0px" width=200>
	<tr>
	<td align=left style="margin: 0px; padding: 0px" bgcolor=[r:if(iscrit==1,"cca300","Black")]>
	<font color=White size=[r:if(length(text)>=35,2,3)]><b>
	[r,if(length(text)>=35):substring(text,0,35)+"...";text]
	<tr>
	<td align=left style="margin: 0px; padding: 0px">
<table style="margin: 0px; padding: 0px">
	<tr>


[h:HigherLevel=matches(diceRoll,".*slot\\d.*")]
[h,if(HigherLevel==1),code:{
	[h:baseLevel=replace(diceRoll,".*slot","")]
	[h:baseLevel=replace(baseLevel,"\\D.*\$","")]
	[h:Slots=""]
	[h:Slots=if(baseLevel<=1,listappend(Slots,1),Slots)]
	[h:Slots=if(baseLevel<=2,listappend(Slots,2),Slots)]
	[h:Slots=if(baseLevel<=3,listappend(Slots,3),Slots)]
	[h:Slots=if(baseLevel<=4,listappend(Slots,4),Slots)]
	[h:Slots=if(baseLevel<=5,listappend(Slots,5),Slots)]
	[h:Slots=if(baseLevel<=6,listappend(Slots,6),Slots)]
	[h:Slots=if(baseLevel<=7,listappend(Slots,7),Slots)]
	[h:Slots=if(baseLevel<=8,listappend(Slots,8),Slots)]
	[h:Slots=if(baseLevel<=9,listappend(Slots,9),Slots)]
	[h:res=input("slot|"+Slots+"|Select Higher Level|list|value=string")]
	[h:abort(res)]
	[h:UsedSlot=slot-baseLevel]
	
	[h:slotId=strfind(diceRoll,"(\\d+)d(\\d+).?[Ss]lot\\d")]
	[h,count(getFindCount(slotId)),code:{	
		[h:dices=getGroup(slotId,roll.count+1,1)]
		[h:sides=getGroup(slotId,roll.count+1,2)]
		[h:dices=number(dices*UsedSlot)]
		[h,if(dices==0):diceRoll=replace(diceRoll,"(\\d+)d(\\d+).?[Ss]lot\\d","",1);diceRoll=replace(diceRoll,"(\\d+)d(\\d+).?[Ss]lot\\d",dices+"d"+sides,1)]
		[h:diceRoll=replace(diceRoll,"\\+\\+","+")]
		[h:diceRoll=replace(diceRoll,"\\+\$","")]
		[h,if(diceRoll==""):abort(0),""]
	}]
};{}]

[h:formula=""]
[h:row=0]
[h:critFormula=""]
[h:id=strfind(diceRoll,"([-+]?)(?:(\\d+)d(\\d+)|([0-9A-Za-z|]+))")]
[r,count(getFindCount(id),""),code:{
	[h:group1=getGroup(id,roll.count+1,1)]
	[h:group2=getGroup(id,roll.count+1,2)]
	[h:group3=getGroup(id,roll.count+1,3)]
	[h:group4=getGroup(id,roll.count+1,4)]



	[h:dices=if(group2=="",1,group2)]
	[h:group2=if(isNumber(group2)==1,group2,0)]

<!--------------------------------DICE SOUNDS---------------------------------->
[h,if(group3==100),code:{
	[macro("campaign/Dice Sounds@this"):""]
};{}]


	[h:firstRoll=roll.count]
	[r,if(isNumber(group3)==1),count(dices,""),code:{


<!--------------------------------DICE SOUNDS---------------------------------->
[macro("campaign/Dice Sounds@this"):""]

		[h:dice=roll(1,group3)]
		[h:dice=if(group1=="-",dice*-1,if(firstRoll==0,"","+")+dice)]
		[h:formula=add(formula,dice)]


[r:if(row>=5,"<tr>","")]
[h:row=if(row>=5,0,row)]
[h:row=row+1]
<td style="padding-top: 5px; margin: 0px; padding: 0px" align=center valign=middle width=35>
[h,if(group3==100):img=tableImage("BlankDice",10);img=tableImage("BlankDice",group3)]

		<table>
			<tr><td width=32 height=32 align=center valign=middle background=[r:img] style="background-repeat: no-repeat;background-position: center; padding-left:4px; padding-bottom:5px;">
			<font color=[r:if(dice==group3,"3cff00",if(dice==1,"ff5b5b","white"))] size=4><b>
			[r,if(group3==100):if(floor(dice/10)==10,"00",floor(dice/10));if(group3==10,if(dice==10,0,dice),dice)]
		</table>



[r,if(group3==100):"<td><table><tr><td width=32 height=32 align=center valign=middle background="+img+" style='background-repeat: no-repeat;background-position: center; padding-left:4px; padding-bottom:5px;'><font color="+if(dice==group3,"3cff00",if(dice==1,"ff5b5b","white"))+" size=4><b>"+substring(dice,length(dice)-1,length(dice))+"</table>";""]
[h,if(group3==100):row=row+1;""]

	
		
	};{}]
	[h,if(isNumber(group3)==1):critFormula=critFormula+"+"+group2+"d"+group3]

	[r,if(isNumber(group4)==1),code:{

		<td align=center valign=middle style="margin: 0px; padding: 0px">
		<font size=4 color=gray><b>[r:group1+group4]
		
		[h:lvl=0]
		
		[h:formula=add(formula,number(group1+group4))]
	
	};{
		[h:lvl=getStrProp(classProps,group4)]
		
	}]
	


	[h,if(lvl==""):lvl=0;""]

		[h:lvl=if(group1=="-",lvl*-1,lvl)]
	[h:formula=add(formula,lvl)]

	[r:if(lvl<0,"",if(lvl==0,"",if(firstRoll==0,"","")))+if(lvl==0,"","<td align=center valign=middle width=0% style='margin: 0px; padding: 0px'><font size=4 color=gray><b>"+if(lvl<0,lvl,"+"+lvl))]


[h:countMax=listcount(group4,"|")]
[h:countMax=if(countMax==0,1,countMax)]
[h,count(countMax):index=listfind(atrList,listget(group4,roll.count,"|"))]
[h:maxValue=""]
[h,count(countMax):maxValue=listappend(maxValue,getStrProp(getLibProperty(listget(attributeList,listfind(atrList,listget(group4,roll.count,"|"))),"Lib:"+tokenName),"value"))]
[h:atrValue=listget(listsort(maxValue,"N-"),0)]
[h,if(atrValue==""):"";atrValue=eval(string(atrValue))]
[h,if(index==-1):mod=0;mod=floor(number(atrValue)/2)-5]

	[h:mod=if(group1=="-",mod*-1,mod)]
	[h:formula=add(formula,mod)]

	[r:if(mod<0,"",if(mod==0,"",if(firstRoll==0,"","")))+if(mod==0,"","<td align=center valign=middle width=0% style='margin: 0px; padding: 0px'><font size=4 color=gray><b>"+if(mod<0,mod,"+"+mod))]
}]


		
</table>


<table width=100% style="margin: 0px; padding: 0px; border-style: solid ; border-width:1px 0px 0px 0px; border-color:[r:if(iscrit==1,'cca300','Black')]">	
<tr>
<td style="margin: 0px; padding: 0px">
<font size=4 color=red style="text-decoration:none"><b>

[r:macroLink(formula,"character/Take Damage@this","",formula)]

</b>
<font size=3 color=gray>

([r:diceRoll])

[h:macro.return=formula]
		
</table>

</table>
[h:crit=critFormula+"+"+formula]
<font color=gray size=2 style="text-decoration:none">
[r,if(iscrit!=1):macrolink("[roll crit]", "character/Dice Roller@this", "","group="+group+";name="+name+";customName="+customName+";text=Critical Hit!;value="+crit+";tokenName="+tokenName),1)]

[r,if(output!="all"):macrolink("[Share Result]", "character/ShareRoll@this")"all",formula)]

[r,if(name==""):"";macrolink("[info]", "character/Args Dialog@this", "","prop="+group+";name="+name+";customName="+customName+";tokenName="+tokenName)]