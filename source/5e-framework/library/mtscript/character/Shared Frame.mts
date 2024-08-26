[h:group=getStrProp(macro.args,"prop")]
[h:name=getStrProp(macro.args,"name")]
[h:customName=getStrProp(macro.args,"customName")]
[h:identified=getStrProp(macro.args,"identified")]
[h:index=getStrProp(macro.args,"index")]
[h:source=getStrProp(macro.args,"source")]
[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:description=getStrProp(macro.args,"description")]
[h:share=getStrProp(macro.args,"share")]


<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=function.Capitalize(name)]

[h,if(description==""),code:{
	[h:compendium=getLibProperty(group,function.getNamespace())]
	[h:item=json.get(compendium,lower(name))]
	[h,if(json.type(item)=="UNKNOWN"):description="";description=encode(json.get(item,"description"))]
	[h,if(json.type(item)=="UNKNOWN"):sources="";sources=json.toList(json.get(item,"sources"))]
};{
	[h:compendium=getLibProperty(group,function.getNamespace())]
	[h:item=json.get(compendium,name)]
	[h,if(json.type(item)=="UNKNOWN"):sources="";sources=json.toList(json.get(item,"sources"))]
}]

[h:size=length(description)]
[h:height=if(size>1000,650,if(size>400,450,if(size>100,300,200)))]
[h,if(name=="new"),code:{
	[macro("character/Change Form@this	"):macro.args]
};{
	[token(tokenName),
		frame5("Shared", "width=750; height=500; temporary=0;"):{

<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="[r:function.getCss('D&D')]">
</head>
<body>
	[h:permissions=getLibProperty("PlayerPermission",function.getNamespace())]
	[h:edit=getStrProp(permissions,"edit")]
	[h:closeShared=getStrProp(permissions,"closeShared")]
	[h,if(isGM()==1):closeShared=1]
	[h,if(isGM()==1):edit=1]
	[r,if(share==1 && closeShared==1):"<p class='topbar'>"+ macroLink("Close Shared","campaign/Close Shared@this")+"</p>";""]

	[r,if(share==1 || edit==0):"";macrolink("Edit","character/Change Form@this","",macro.args)+" &nbsp;"]
	[r,if(share==1):"";macrolink("Move","character/Move@this","",macro.args)+" &nbsp;"]
	[r,if(share==1):"";macrolink("Share","character/Share@this","",macro.args+";share=1")+" &nbsp;"]
	[r,if(share==1 || tokenName=="Lib:Character"):"";macrolink("Data","character/Metadata@this","",macro.args)+" &nbsp;"]
	[r,if(share==1):"";macrolink("Delete","character/Delete@this","",macro.args)]

	[r,if(share==1):"";"</p>"]

	[r,if(customName=="" && CapitalName==""):"";"<h1 style='padding-bottom:0px;margin-bottom:0px;'>"+if(identified==0,if(customName=="" || customName==0,CapitalName,customName),if(customName=="" || customName==0,CapitalName,customName+"<font size=6> ("+CapitalName+if(identified==0," - Unidentified","")+")</font>"))+"</h1>"]
	[h,if(identified==0):description="*Unidentified item*";""]

	[macro("campaign/Markdown@this"):"tokenName="+tokenName+";description="+description+";source="+source+";name="+name+";group="+group]
</body>
</html>	
	}]
}]