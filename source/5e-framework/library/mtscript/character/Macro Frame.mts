[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:macroName=getStrProp(macro.args,"macro")]



[h,if(macroName=="Statblock"),code:{

	[h:display=getLibProperty("Display","Lib:Campaign")]
	[h:StatblockFrame=getStrProp(display,"StatblockFrame")]

	[h,switch(StatblockFrame):
	case "1":frameName="PC - Statblock";
	case "2":frameName="Statblock";
	default:frameName=tokenName+" - "+macroName]

};{

	[h:frameName=tokenName+" - "+macroName]

}]

[token(tokenName),frame(frameName,"width="+if(macroName=="Statblock",350,750)+"; height=500; temporary=0;"):{

<link rel="stylesheet" type="text/css" href="GitHub@Lib:Campaign">

[macro(macroName+"@Lib:Character"):"tokenName="+tokenName]

}]