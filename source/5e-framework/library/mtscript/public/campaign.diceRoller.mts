[h:diceRoll=arg(0)]
[h:color="Black"]

[h:text=getMacroName()]
[h:output=function.getOutput()]

[r,if(output=="all"),code:{
	[macro("campaign/Dice Roller@this"):"text="+text+";color="+color+";value="+diceRoll]
};{
	[h:link=macroLinkText("campaign/Dice Roller@this","self","text="+text+";color="+color+";value="+diceRoll)]
	[h:execLink(link,0,"self")]
}]

