[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:map=getStrProp(macro.args,"map")]

[h:currentMap=getCurrentMapName()]

[h,if(currentMap==map):"";setCurrentMap(map)]



[token(tokenName),frame5("Shared", "width=750; height=500; temporary=0;"):{



<link rel="stylesheet" type="text/css" href="[r:function.getCss('GitHub')]">

[h:permissions=getLibProperty("PlayerPermission", function.getNamespace())]
[h:closeShared=getStrProp(permissions,"closeShared")]
[h,if(isGM()==1):closeShared=1]

[r,if(closeShared==1),code:{

<p class='topbar'>

[r:macroLink("Close Shared","campaign/Close Shared@this")]

</p>
};{}]

[macro("character/Statblock Viewer@this"):tokenName]

}]


[h,if(currentMap==map):"";setCurrentMap(currentMap)]