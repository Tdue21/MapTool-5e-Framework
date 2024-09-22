[h:img=tableImage("BlankDice",6)]
[h:html='<table style="border:1px solid silver;margin: 0px; padding: 0px; width:200px">
<tr><td style="margin: 0px; padding: 0px; text-align:left; background-color:silver">
	<font color=white><b>Stat Roll</b></font>
<tr><td style="margin: 0px; padding: 0px; text-align: left">']	

[r,count(6,""),code:{
	[h:dice1=1d6]
	[h:dice2=1d6]
	[h:dice3=1d6]
	[h:dice4=1d6]
	<!--------------------------------DICE SOUNDS---------------------------------->
	[macro("campaign/Dice Sounds@this"):""]
	[macro("campaign/Dice Sounds@this"):""]
	[macro("campaign/Dice Sounds@this"):""]
	[macro("campaign/Dice Sounds@this"):""]
	[h:diceList=listsort(dice1+","+dice2+","+dice3+","+dice4,"N-")]

	[h:html=html+'<table style="width:200px"><tr>']

	[r,count(4,""),code:{
		[h:dice=listget(diceList,roll.count)]
		[h:fontColor=if(dice==6,"3cff00",if(dice==1,"ff5b5b","white"))]
		[h:dropped=if(roll.count==3,"<s>","")]
		[h:html=html+strformat('
		<td width=35>
		<table>
			<tr><td width=32 height=32 align=center valign=middle background=[r:img] style="background-repeat: no-repeat;background-position: center; padding-left:4px; padding-bottom:5px;">
			<font color=%{fontColor} size=4><b>%{dropped}%{dice}
		</table>
		')]
	}]

	[h:dices=listget(diceList,0)+listget(diceList,1)+listget(diceList,2)]
		[h:html=html+strformat('
		<td align=center valign=middle style="border:1px solid silver;margin: 0px; padding: 0px;margin-bottom:4px;padding-bottom:4px">
			<font size=5 color=red><b>%{dices}
	</table>')]
}]
[h:html=html+'</table>']
[h:broadcast(html)]
