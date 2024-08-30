[h:name=getStrProp(macro.args,"name")]
[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:share=getStrProp(macro.args,"share")]



<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=function.Capitalize(name)]


[h:id=findToken(tokenName)]



[h,if(id==""),code:{
	
	[h:compendium=getLibProperty("Bestiary","Lib:Compendium")]
	[h:object=json.get(compendium,lower(tokenName))]
	
};{

	[h:switchToken(id)]

	[h:object=getProperty("Stats")]

}]

[h:description=json.get(object,"info")]


[h,if(json.type(description)=="UNKNOWN"):description="";description=json.get(description,"Info")]

[h:size=length(description)]
[h:height=if(size>1000,650,if(size>400,450,if(size>100,300,200)))]

[dialog5(CapitalName+" - Info", "width=450; height="+height+"; temporary=0; noframe=0; input=1"):{

<link rel="stylesheet" type="text/css" href="[r:function.getCss('D&D')]">


[h:permissions=getLibProperty("PlayerPermission","Lib:Character")]
[h:edit=getStrProp(permissions,"edit")]
[h:sharePlayer=getStrProp(permissions,"share")]
[h,if(isGM()==1):edit=1]
[h,if(isGM()==1):sharePlayer=1]



[r,if(share==1):"";"<p class='topbar'>"]

[h:args=setStrProp(macro.args,"tokenName","Lib:Compendium")]

[r,if(share==1 || edit==0):"";macrolink("Edit", "bestiary/Change Form@this")"","group=info;name=Info;tokenName="+tokenName+";description="+description)+" &nbsp;"]
[r,if(share==1 || sharePlayer==0):"";macrolink("Share", "bestiary/Share Info@this")"","share=1;description="+description+";tokenName="+tokenName)+" &nbsp;"]


[r,if(share==1):"";"</p>"]

<h1 style="padding-bottom:0px;margin-bottom:0px;">

[r:function.Capitalize(TokenName)]

</h1>



[macro("bestiary/Markdown@this"):"tokenName="+tokenName+";description="+encode(description)+";name="+name]


}]

