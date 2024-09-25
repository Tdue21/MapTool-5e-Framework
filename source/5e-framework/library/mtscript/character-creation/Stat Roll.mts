[h:img=tableImage("BlankDice",6, 48)]

[h:html='<table style="background-color: #e8e8e8; border:1px solid #666;margin: 0px; padding: 0px; width:200px" cellpadding=0 cellspacing=0>
<tr>
	<td style="margin: 0px; padding: 0px; text-align:center; background-color:#666; border-bottom: 1px solid #666">
		<h2 style="color:white;font-weight:bold">Stat Roll</h2>
	</td>
</tr>
<tr>
	<td style="margin: 0px; padding: 0px">
		<table style="width:200px; margin:0px; padding: 0px" cellpadding=0 cellspacing=0>']


[r,count(6,""),code:{
	[h:html=html+'<tr style="margin-bottom:4px">']
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

	[r,count(4,""),code:{
		[h:dice=listget(diceList,roll.count)]
		[h:fontColor=if(dice==6,"3cff00",if(dice==1,"ff5b5b","white"))]
		[h:dropped=if(roll.count==3,"<s>","")]
		[h:html=html+strformat('
			<td width=48 height=48 align=center valign=middle background="%{img}" style="background-repeat: no-repeat;background-position: center; margin-right:2px;">
				<font color=%{fontColor} size=4><b>%{dropped}%{dice}
			</td>
		')]
	}]

	[h:diceTotal=listget(diceList,0)+listget(diceList,1)+listget(diceList,2)]
	[h:html=html+strformat('
		<td align=center valign=middle style="border:1px solid silver;margin: 0px; padding: 0px;margin-bottom:4px;padding-bottom:4px">
			<font size=5 color=red><b>%{diceTotal}
		</td>')]
	[h:html=html+"</tr>"]
}]

[h:html=html+'</td></tr></table>']
[h:broadcast(html)]
