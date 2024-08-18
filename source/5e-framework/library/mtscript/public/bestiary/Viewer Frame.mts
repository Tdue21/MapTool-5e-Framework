[h:tokenName=macro.args]

[h:BestiaryObj=getLibProperty("Bestiary","Lib:Compendium")]

[h:object=json.get(BestiaryObj,macro.args)]

[dialog(tokenName, "width=350; height=500; temporary=1; noframe=0; input=1"):{

<link rel="stylesheet" type="text/css" href="GitHub@Lib:Campaign">

<p class='topbar'>

[r,if(isGM()==1):macroLink("Edit","Edit Creature@Lib:Bestiary","none","creature="+tokenName+";prop="+object)+"&nbsp;";""]

[h:outputPC=getLibProperty("PC Output","Lib:Character")]
[h:outputGM=getLibProperty("GM Output","Lib:Character")]

[h:gameplay=getLibProperty("Gameplay","Lib:Campaign")]
[h:rollNPC=getStrProp(gameplay,"rollNPC")]

[h,if(rollNPC==1):outputNPC=if(isGM()==1,outputGM,outputPC);outputNPC="none"]
[r:macroLink("Make Token","Quick Monster@Lib:Bestiary",outputNPC,tokenName)]&nbsp;

[r:macroLink("Info","Info@Lib:Bestiary","","name=;tokenName="+tokenName)] &nbsp;

[h:permissions=getLibProperty("PlayerPermission","Lib:Character")]
[h:sharePlayer=getStrProp(permissions,"share")]
[h,if(isGM()==1):sharePlayer=1]

[r,if(sharePlayer==1):macroLink("Share","Share@Lib:Bestiary","none",tokenName)]
</p>

[macro("Viewer@Lib:Bestiary"):tokenName]

}]