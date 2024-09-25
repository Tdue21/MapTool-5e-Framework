[h:tokenName=macro.args]

[h:BestiaryObj=getLibProperty("Bestiary", function.getNamespace())]

[h:object=json.get(BestiaryObj,macro.args)]

[dialog5(tokenName, "width=350; height=500; temporary=1; noframe=0; input=1"):{

<link rel="stylesheet" type="text/css" href="[r:function.getCss('GitHub')]">

<p class='topbar'>

[r,if(isGM()==1):macrolink("Edit", "bestiary/Edit Creature@this")"none","creature="+tokenName+";prop="+object)+"&nbsp;";""]

[h:gameplay=getLibProperty("Gameplay" ,function.getNamespace())]
[h:rollNPC=getStrProp(gameplay,"rollNPC")]

[h:output= function.getOutput())]
[h,if(rollNPC==1):outputNPC=function.getOutput();outputNPC="none"]
[r:macrolink("Make Token", "bestiary/Quick Monster@this")outputNPC,tokenName)]&nbsp;

[r:macrolink("Info", "bestiary/Info@this", "","name=;tokenName="+tokenName)] &nbsp;

[h:permissions=getLibProperty("PlayerPermission", function.getNamespace())]
[h:sharePlayer=getStrProp(permissions,"share")]
[h,if(isGM()==1):sharePlayer=1]

[r,if(sharePlayer==1):macrolink("Share", "bestiary/Share@this")"none",tokenName)]
</p>

[macro("bestiary/Viewer@this"):tokenName]

}]