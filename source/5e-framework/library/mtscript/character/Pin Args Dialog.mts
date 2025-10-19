
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
	
	
	[macro("character/Change Form@this"):macro.args]
	
	
};{
	
	[dialog5(if(share==1,"",tokenName+" - ")+CapitalName, "width=450; height="+if(identified==0,200,height)+"; temporary=0; noframe=0; input=1"):{
	
		<link rel="stylesheet" type="text/css" href="[r:function.getCss('D&D')]">

		[r,if(identified==0):"<title>"+if(share==1,"",tokenName+" - ")+"Unidentified Item</title>";""]
		
		[r,if(share==1):"";"<p class='topbar'>"]
		
		
		[h:permissions=getLibProperty("PlayerPermission", function.getNamespace())]
		[h:edit=getStrProp(permissions,"edit")]
		[h:sharePlayer=getStrProp(permissions,"share")]
		[h,if(isGM()==1):edit=1]
		[h,if(isGM()==1):sharePlayer=1]
		
		[r,if(share==1 || edit==0):"";macrolink("Edit", "character/Change Form@this", "",macro.args)+" &nbsp;"]
		[r,if(share==1):"";macrolink("Remove", "character/Pin Delete@this", "",macro.args)+" &nbsp;"]
		[r,if(share==1 || tokenName==function.getNamespace()):"";macrolink("Settings", "character/Pin Metadata@this", "",macro.args)+" &nbsp;"]
		[r,if(share==1):"";macrolink("Move", "character/Pin Move@this", "",macro.args)+" &nbsp;"]
		
		[r,if(share==1 || sharePlayer==0):"";macrolink("Share", "character/Share@this", "",macro.args+";share=1")+" &nbsp;"]
		
		
		
		
		[r,if(share==1):"";"</p>"]
		
		<h1 style="padding-bottom:0px;margin-bottom:0px;">
		
		[r,if(identified==0 && isGM()==0):
		if(customName=="" || customName==0,CapitalName,customName);
		if(customName=="" || customName==0,CapitalName+if(identified==0,"<font size=5> (Unidentified)</font>",""),customName+"<font size=5> ("+CapitalName+if(identified==0," - Unidentified","")+")</font>")]
		
		</h1>

		[h,if(identified==0 && isGM()==0):description="*Unidentified item*";""]

		
		[macro("campaign/Markdown@this"):"tokenName="+tokenName+";description="+description+";source="+source+";name="+name+";group="+group]

		[r,if(sources==""):"";"<p><b>Sources: </b>"+sources+"</p>"]
	
	}]


}]
