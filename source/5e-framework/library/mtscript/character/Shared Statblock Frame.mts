[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:map=getStrProp(macro.args,"map")]

[h:currentMap=getCurrentMapName()]

[h,if(currentMap==map):"";setCurrentMap(map)]



[token(tokenName),frame("Shared", "width=750; height=500; temporary=0;"):{



<link rel="stylesheet" type="text/css" href="[r:function.getCss('GitHub')]">

[h:permissions=getLibProperty("PlayerPermission","Lib:Character")]
[h:closeShared=getStrProp(permissions,"closeShared")]
[h,if(isGM()==1):closeShared=1]

[r,if(closeShared==1),code:{

<p class='topbar'>

[r:macroLink("Close Shared","Close Shared@Lib:Campaign")]

</p>
};{}]

[macro("Statblock Viewer@Lib:Character"):tokenName]

}]


[h,if(currentMap==map):"";setCurrentMap(currentMap)]