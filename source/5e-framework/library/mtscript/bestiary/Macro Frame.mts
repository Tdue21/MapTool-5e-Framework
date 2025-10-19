<!-- This is the frame for a token statblock -->

[h:tokenName=macro.args]

[h:display=getLibProperty("Display", function.getNamespace())]
[h:StatblockFrame=getStrProp(display,"StatblockFrame")]

[h,switch(StatblockFrame):
case "1":frameName="NPC - Statblock";
case "2":frameName="Statblock";
default:frameName=tokenName+" - Statblock"]



[frame5(frameName, "width=350; height=500; temporary=1;"):{

<link rel="stylesheet" type="text/css" href="[r:function.getCss('D&D')]">

[macro("bestiary/Statblock@this"):tokenName]

}]