[h:tokenName=macro.args]



[h:display=getLibProperty("Display","Lib:Campaign")]
[h:StatblockFrame=getStrProp(display,"StatblockFrame")]

[h,switch(StatblockFrame):
case "1":frameName="NPC - Statblock";
case "2":frameName="Statblock";
default:frameName=tokenName+" - Statblock"]



[frame5(frameName, "width=350; height=500; temporary=0;"):{

<link rel="stylesheet" type="text/css" href="[r:function.getCss('GitHub')]">

[macro("bestiary/Statblock@this"):tokenName]

}]