[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:description=getStrProp(macro.args,"description")]
[h:allies=getStrProp(macro.args,"allies")]
[h:treasure=getStrProp(macro.args,"treasure")]
[h:share=getStrProp(macro.args,"share")]

[frame5("Shared", "width=350; height=500; temporary=0;"):{

<link rel="stylesheet" type="text/css" href="[r:function.getCss('D&D')]">

[h:permissions=getLibProperty("PlayerPermission","Lib:Character")]
[h:closeShared=getStrProp(permissions,"closeShared")]
[h,if(isGM()==1):closeShared=1]

[r,if(closeShared==1),code:{

<p class='topbar'>

[r:macroLink("Close Shared","Close Shared@Lib:Campaign")]

</p>
};{}]

<h1 style="padding-bottom:0px;margin-bottom:0px;">

[r:TokenName]

</h1>

[macro("Markdown@Lib:Character"):"tokenName="+tokenName+";description="+encode(description)]

[r,if(allies==""),code:{};{
	

	<h4 style="padding-bottom:0px;margin-bottom:0px;">
	
	Allies & Organizations
	
	</h4>
	
	[macro("Markdown@Lib:Character"):"tokenName="+tokenName+";description="+encode(allies)]

}]

[r,if(treasure==""),code:{};{

	<h4 style="padding-bottom:0px;margin-bottom:0px;">
	
	Treasure
	
	</h4>
	
	[macro("Markdown@Lib:Character"):"tokenName="+tokenName+";description="+encode(treasure)]

}]

}]