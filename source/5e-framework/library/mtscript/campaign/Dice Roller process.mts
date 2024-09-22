[h,if(macro.args == ""),code:{
	[h:diceRoll = function.getDiceRoll()]
	[h:text     = "Custom Dice Roll"]
	[h:color    = "Black"]
};{
	[h:diceRoll = getStrProp(macro.args,"value")]
	[h:text     = getStrProp(macro.args,"text")]
	[h:color    = getStrProp(macro.args,"color")]
}]

[h:iscrit = if(text=="Critical Hit!",1,0)]
[h:abort(if(diceRoll=="" || diceRoll==0, 0, 1))]
[h:output     = function.getOutput()]
[h:classProps = ""]
[h:atrList    = ""]

[h,if(length(text) >= 35), code: {
	[h:fontSize = "12px"]
	[h:text     = substring(text, 0, 35) + "..."]
};{
	[h:fontSize = "14px")]
}]

[h:html=strformat('
<div style="text-align:left; margin: 0px; padding: 5px; border:1px solid black; border-bottom:none; background-color:%{color};color:white;font-size:14pt; width:90%;">
	<b>%{text}</b>
</div>
<table style="border:1px solid %{color}; border-top:none; margin: 0px; padding: 0px; width:90%;background-color:white">
<tr>
	<td align="left" style="margin: 0px; padding: 0px">
		<table style="margin: 0px; padding: 0px">
		<tr>
')]		

[h:diceRoll = function.getHigherLevel(diceRoll)]	
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

	[h:'<!-- broadcast("<pre>" + json.indent(json.set("{}",
			"diceRoll", diceRoll, "id", id, "group1", group1,
			"group2", group2, "group3", group3, "group4", group4,
			"dices", dices), 4) + "</pre>")-->']

	<!--------------------------------DICE SOUNDS---------------------------------->
	[h,if(group3==100),code:{
		[macro("campaign/Dice Sounds@this"):""]
	};{}]

	[h:firstRoll=roll.count]
	
	[r,if(isNumber(group3)==1),count(dices,""),code:{
		<!--------------------------------DICE SOUNDS---------------------------------->
		[macro("campaign/Dice Sounds@this"):""]

		[r:if(roll.count==0,"","")]
		[h:dice=roll(1,group3)]
		[h:dice=if(group1=="-",dice*-1,if(firstRoll==0,"","+")+dice)]
		[h:formula=add(formula,dice)]

		[r:html = html + if(row>=5,"<tr>","")]
		[h:row=if(row>=5,0,row)]
		[h:row=row+1]

		[h,if(group3==100):img=tableImage("BlankDice",10);img=tableImage("BlankDice",group3)]
		[h: fontColor=if(dice==group3,"3cff00",if(dice==1,"ff5b5b","white"))]
		[h,if(group3==100):droll = if(floor(dice/10)==10,"00",floor(dice/10)); droll = if(group3==10,if(dice==10,0,dice),dice)]
		[h:html = html + strformat('

		<td style="padding-top: 5px; margin: 0px; padding: 0px" align=center valign=middle width=52>
		<table>
			<tr><td width=48 height=48 align=center valign=middle background=%{img}-48 style="background-repeat: no-repeat;background-position: center; padding-left:4px; padding-bottom:5px;">
			<font color=%{fontColor} size=4><b>%{droll}</b></font>
			</td></tr>			
		</table>')]

		[r,if(group3==100):html = html + "<td width=52><table><tr><td width=48 height=48 align=center valign=middle background="+img+"-48 style='background-repeat: no-repeat;background-position: center; padding-left:4px; padding-bottom:5px;'><font color="+if(dice==group3,"3cff00",if(dice==1,"ff5b5b","white"))+" size=4><b>"+substring(dice,length(dice)-1,length(dice))+"</table>";""]
		[h,if(group3==100):row=row+1;""]	
	};{}]

	[h,if(isNumber(group3)==1):critFormula=critFormula+"+"+group2+"d"+group3]

	[r,if(isNumber(group4)==1),code:{
		[h:html=html + '
		<td align=center valign=middle style="margin: 0px; padding: 0px">
		<font size=4 color=gray><b>']
		[r:html=html + group1+group4]
		[h:lvl=0]
		[h:formula=add(formula,number(group1+group4))]
	};{
		[h:lvl=getStrProp(classProps,group4)]
	}]

	[h,if(lvl==""):lvl=0;""]
	[h:lvl=if(group1=="-",lvl*-1,lvl)]
	[h:formula=add(formula,lvl)]
	[h:html = html + if(lvl<0,"",if(lvl==0,"",if(firstRoll==0,"","")))+if(lvl==0,"","<td align=center valign=middle width=0% style='margin: 0px; padding: 0px'><font size=4 color=gray><b>"+if(lvl<0,lvl,"+"+lvl))]

	[h:countMax=listcount(group4,"|")]
	[h:countMax=if(countMax==0,1,countMax)]
	[h,count(countMax):index=listfind(atrList,listget(group4,roll.count,"|"))]
	[h:maxValue=""]

	[h:atrValue=listget(listsort(maxValue,"N-"),0)]
	[h,if(index==-1):mod=0;mod=floor(number(atrValue)/2)-5]

	[h:mod=if(group1=="-",mod*-1,mod)]
	[h:formula=add(formula,mod)]

	[h:html = html + if(mod<0,"",if(mod==0,"",if(firstRoll==0,"","")))+if(mod==0,"","<td align=center valign=middle width=0% style='margin: 0px; padding: 0px'><font size=4 color=gray><b>"+if(mod<0,mod,"+"+mod))]
}]
		
[h:macro.return=formula]
[h:crit=critFormula+"+"+formula]
[h:critText = if(iscrit!=1 , macroLink("[roll crit]", "campaign/Dice Roller@this", "", "text=Critical Hit!;value="+crit+";color=cca300"), "")]

[h:html = html + strformat('
</table>
<table width=100% style="margin: 0px; padding: 0px; border-style: solid ; border-width:1px 0px 0px 0px; border-color:%{color}">	
<tr>
<td style="margin: 0px; padding: 0px">
<font size=4 color=red style="text-decoration:none"><b>')]

[h:html=html + macroLink(formula,"character/Take Damage@this","",formula)]
[h:html=html + strformat('
</b>
<font size=3 color=gray>
(%{diceRoll})
</table>
</table>
<font color=gray size=2 style="text-decoration:none">
%{critText}')]

[h:html = html + if(output!="all", macroLink("[Share Result]","character/ShareRoll@this","all",formula), "")]
[r:broadcast(html)]