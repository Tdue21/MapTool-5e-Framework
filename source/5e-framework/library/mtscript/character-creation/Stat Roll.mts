[h:img=tableImage("BlankDice",6)]

<table style="border:1px solid silver;margin: 0px; padding: 0px" width=200>
	<tr>
	<td align=left style="margin: 0px; padding: 0px" bgcolor=silver>
<font color=white><b>Stat Roll
	<tr>
	<td align=left style="margin: 0px; padding: 0px">
	
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

<table width=200>
<tr>

[r,count(4,""),code:{
	[h:dice=listget(diceList,roll.count)]
	<td width=35>
		<table>
			<tr><td width=32 height=32 align=center valign=middle background=[r:img] style="background-repeat: no-repeat;background-position: center; padding-left:4px; padding-bottom:5px;">
			<font color=[r:if(dice==6,"3cff00",if(dice==1,"ff5b5b","white"))] size=4><b>[r:if(roll.count==3,"<s>","")]
			[r:dice]
		</table>

}]

<td align=center valign=middle style="border:1px solid silver;margin: 0px; padding: 0px;margin-bottom:4px;padding-bottom:4px">
		<font size=5 color=red><b>[r:listget(diceList,0)+listget(diceList,1)+listget(diceList,2)]
</table>



}]

</table>
