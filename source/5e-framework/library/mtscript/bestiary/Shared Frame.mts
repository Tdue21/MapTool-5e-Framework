[h:tokenName=macro.args]

[frame5("Shared", "width=350; height=500; temporary=0;"):{

<link rel="stylesheet" type="text/css" href="[r:function.getCss('GitHub')]">

[h:permissions=getLibProperty("PlayerPermission", function.getNamespace())]
[h:closeShared=getStrProp(permissions,"closeShared")]
[h,if(isGM()==1):closeShared=1]

[r,if(closeShared==1),code:{

<p class='topbar'>

[r:macroLink("Close Shared","campaign/Close Shared@this")]

</p>
};{}]

[macro("bestiary/Viewer@this"):tokenName]

}]