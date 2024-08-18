[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:description=getStrProp(macro.args,"description")]
[h:share=getStrProp(macro.args,"share")]

[frame("Shared", "width=350; height=500; temporary=0;"):{

<link rel="stylesheet" type="text/css" href="D&D@Lib:Campaign">

[h:permissions=getLibProperty("PlayerPermission","Lib:Character")]
[h:closeShared=getStrProp(permissions,"closeShared")]
[h,if(isGM()==1):closeShared=1]

[r,if(closeShared==1),code:{

<p class='topbar'>

[r:macroLink("Close Shared","Close Shared@Lib:Campaign")]

</p>
};{}]

<h1 style="padding-bottom:0px;margin-bottom:0px;">

[r:tokenName]

</h1>


[macro("Markdown@Lib:Bestiary"):macro.args]

}]