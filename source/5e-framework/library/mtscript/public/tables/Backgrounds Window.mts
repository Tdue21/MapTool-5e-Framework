[h:bgPropList=getLibProperty("Backgrounds","Lib:Character Creation")]

[h:bgList=""]
[h,count(countStrProp(bgPropList)):bgList=listappend(bgList,indexKeyStrProp(bgPropList,roll.count))]

[h,if(macro.args==""),code:{


	
	[h:res=input("background|"+bgList+"|Background|list|value=string")]
	[h:abort(res)]
};{

	[h:background=macro.args]

}]


[dialog("Background", "width=750; height=600; temporary=1; noframe=0; input=1"):{

<link rel="stylesheet" type="text/css" href="D&D@Lib:Campaign">

<title>[r:background]</title>



<table>
<tr><td width=150 valign=top>

[h:bgList=getLibProperty("Backgrounds","Lib:Character Creation")]

[r,count(listcount(bgList),""),code:{

	[h:currentBG=listget(bgList,roll.count)]
	
	[r,if(background==currentBG):"<b>"]
	[r:macroLink(currentBG,"Backgrounds Window@Lib:Tables","",currentBG)]<br>
	[r,if(background==currentBG):"</b>"]
}]


[h:featProps=getLibProperty("Feats","Lib:Compendium")]



<td>


<!--------------------------Feature------------------------------->
[h:background=lower(background)]

[h:CapitalName=function.Capitalize(background)]

[h:object=json.get(featProps,background)]
[h,if(json.type(object)=="UNKNOWN"):description="";description=json.get(object,"description")]
<h1>[r:CapitalName]<font size=3>
	[r:macroLink("Edit","Change Form@Lib:Character","","prop=Feats;source=;name="+background+";description=;tokenName=Lib:Campaign")] |
[r:macrolink("Move","Move@Lib:Character","","tokenName=Lib:Compendium;description=;name="+background+";prop=Feats")]</h1>
[macro("Markdown@Lib:Campaign"):"tokenName=Lib:Tables;description="+encode(description)+";source=Background;name="+background+";group=Feats"]




}]