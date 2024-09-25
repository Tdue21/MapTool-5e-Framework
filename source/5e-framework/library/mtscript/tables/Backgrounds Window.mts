[h:bgPropList=getLibProperty("Backgrounds",function.getNamespace())]

[h:bgList=""]
[h,count(countStrProp(bgPropList)):bgList=listappend(bgList,indexKeyStrProp(bgPropList,roll.count))]

[h,if(macro.args==""),code:{


	
	[h:res=input("background|"+bgList+"|Background|list|value=string")]
	[h:abort(res)]
};{

	[h:background=macro.args]

}]


[dialog5("Background", "width=750; height=600; temporary=1; noframe=0; input=1"):{

<link rel="stylesheet" type="text/css" href="[r:function.getCss('D&D')]">

<title>[r:background]</title>



<table>
<tr><td width=150 valign=top>

[h:bgList=getLibProperty("Backgrounds",function.getNamespace())]

[r,count(listcount(bgList),""),code:{

	[h:currentBG=listget(bgList,roll.count)]
	
	[r,if(background==currentBG):"<b>"]
	[r:macroLink(currentBG,"tables/Backgrounds Window@this","",currentBG)]<br>
	[r,if(background==currentBG):"</b>"]
}]


[h:featProps=getLibProperty("Feats",function.getNamespace())]



<td>


<!--------------------------Feature------------------------------->
[h:background=lower(background)]

[h:CapitalName=function.Capitalize(background)]

[h:object=json.get(featProps,background)]
[h,if(json.type(object)=="UNKNOWN"):description="";description=json.get(object,"description")]
<h1>[r:CapitalName]<font size=3>
	[r:macrolink("Edit", "character/Change Form@this", "","prop=Feats;source=;name="+background+";description=;tokenName=Lib:Campaign")] |
[r:macrolink("Move", "character/Move@this", "","tokenName=Lib:Compendium;description=;name="+background+";prop=Feats")]</h1>
[macro("campaign/Markdown@this"):"tokenName=Lib:Tables;description="+encode(description)+";source=Background;name="+background+";group=Feats"]




}]