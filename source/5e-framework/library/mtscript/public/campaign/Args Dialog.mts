
[h:group=getStrProp(macro.args,"prop")]
[h:name=getStrProp(macro.args,"name")]
[h:customName=getStrProp(macro.args,"customName")]
[h:index=getStrProp(macro.args,"index")]
[h:source=getStrProp(macro.args,"source")]
[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:description=getStrProp(macro.args,"description")]
[h:share=getStrProp(macro.args,"share")]

<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=function.Capitalize(name)]

[h,if(description==""),code:{
	[h:compendium=getLibProperty(group,"Lib:Compendium")]
	[h:item=json.get(compendium,lower(name))]
	[h,if(json.type(item)=="UNKNOWN"):description="";description=encode(json.get(item,"description"))]

	[h,if(json.type(item)=="UNKNOWN"):sources="";sources=json.toList(json.get(item,"sources"))]
};{

	[h:compendium=getLibProperty(group,"Lib:Compendium")]
	[h:item=json.get(compendium,name)]
	[h,if(json.type(item)=="UNKNOWN"):sources="";sources=json.toList(json.get(item,"sources"))]

}]

[h:size=length(description)]
[h:height=if(size>1000,650,if(size>400,450,if(size>100,300,200)))]


[h,if(name=="new"),code:{


[macro("Change Form@Lib:Character"):macro.args]


};{

[dialog(if(share==1,"",tokenName+" - ")+CapitalName, "width=450; height="+height+"; temporary=0; noframe=0; input=1"):{

<link rel="stylesheet" type="text/css" href="lib://[r:function.getNamespace()]/css/D&D.css">


[h:permissions=getLibProperty("PlayerPermission","Lib:Character")]
[h:edit=getStrProp(permissions,"edit")]
[h:sharePlayer=getStrProp(permissions,"share")]
[h,if(isGM()==1):edit=1]
[h,if(isGM()==1):sharePlayer=1]

[r,if(share==1):"";"<p class='topbar'>"]
[r,if(share==1 || edit==0):"";macrolink("Edit","Change Form@Lib:Character","",macro.args)+" &nbsp;"]
[r,if(share==1):"";macrolink("Move","Move@Lib:Character","",macro.args)+" &nbsp;"]
[r,if(share==1 || sharePlayer==0):"";macrolink("Share","Share@Lib:Character","",macro.args+";share=1")+" &nbsp;"]



[r,if(share==1):"";"</p>"]

<h1 style="padding-bottom:0px;margin-bottom:0px;">

[r:if(customName=="" || customName==0,CapitalName,customName+" ("+CapitalName+")")]

</h1>



[macro("Markdown@Lib:Campaign"):"tokenName="+tokenName+";description="+description+";source="+source+";name="+name+";group="+group]

[r,if(sources==""):"";"<p><b>Sources: </b>"+sources+"</p>"]

}]


}]
