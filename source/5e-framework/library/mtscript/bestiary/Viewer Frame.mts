[h:tokenName=macro.args]

[h:BestiaryObj=getLibProperty("Bestiary","Lib:Compendium")]

[h:object=json.get(BestiaryObj,macro.args)]

[dialog5(tokenName, "width=350; height=500; temporary=1; noframe=0; input=1"):{

<link rel="stylesheet" type="text/css" href="[r:function.getCss('GitHub')]">

<p class='topbar'>

[r,if(isGM()==1):macroLink("Edit","Edit Creature@Lib:Bestiary","none","creature="+tokenName+";prop="+object)+"&nbsp;";""]

[h:gameplay=getLibProperty("Gameplay" ,function.getNamespace())]
[h:rollNPC=getStrProp(gameplay,"rollNPC")]

[h:output= function.getOutput())]
[h,if(rollNPC==1):outputNPC=function.getOutput();outputNPC="none"]
[r:macroLink("Make Token","Quick Monster@Lib:Bestiary",outputNPC,tokenName)]&nbsp;

[r:macroLink("Info","Info@Lib:Bestiary","","name=;tokenName="+tokenName)] &nbsp;

[h:permissions=getLibProperty("PlayerPermission","Lib:Character")]
[h:sharePlayer=getStrProp(permissions,"share")]
[h,if(isGM()==1):sharePlayer=1]

[r,if(sharePlayer==1):macroLink("Share","Share@Lib:Bestiary","none",tokenName)]
</p>

[macro("Viewer@Lib:Bestiary"):tokenName]

}]