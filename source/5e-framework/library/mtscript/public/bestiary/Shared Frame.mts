[h:tokenName=macro.args]

[frame5("Shared", "width=350; height=500; temporary=0;"):{

<link rel="stylesheet" type="text/css" href="GitHub@Lib:Campaign">

[h:permissions=getLibProperty("PlayerPermission","Lib:Character")]
[h:closeShared=getStrProp(permissions,"closeShared")]
[h,if(isGM()==1):closeShared=1]

[r,if(closeShared==1),code:{

<p class='topbar'>

[r:macroLink("Close Shared","Close Shared@Lib:Campaign")]

</p>
};{}]

[macro("Viewer@Lib:Bestiary"):tokenName]

}]