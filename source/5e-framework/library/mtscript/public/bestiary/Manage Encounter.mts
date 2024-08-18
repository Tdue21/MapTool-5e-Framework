[dialog("Manage", "width=580; height=400; temporary=0; noframe=0; input=1"):{

<link rel="stylesheet" type="text/css" href="GitHub@Lib:Campaign">

[h:pinName=getStrProp(macro.args,"tokenName")]
[h:reload=getStrProp(macro.args,"reload")]


<title>[r:pinName]</title>

[h,if(reload==1):closeDialog("Manage Encounter")]

[h,if(pinName=="Select Pin"):pinName=""]

[h,if(pinName==""),code:{

	
	[h,if(getLibProperty("Map","Lib:Bestiary")==getCurrentMapName() && getLibProperty("Encounter","Lib:Bestiary")!="" && reload!=1):idList=getLibProperty("Encounter","Lib:Bestiary");idList=getSelected()]

};{

	
	[h:id=findToken(pinName)]
	[h:switchToken(id)]

	[h:idList=getProperty("Encounter")]
	
}]

[h:repeat=listcount(idList)]

[h,count(repeat),code:{

	[h:tokenID=listget(idList,roll.count)]
	[h,if(tokenID==""):Stats="";Stats=getProperty("Stats",tokenID)]
	[h,if(json.type(Stats)=="UNKNOWN" || json.fields(Stats)==""):repeat=repeat-1;""]
	[h,if(json.type(Stats)=="UNKNOWN" || json.fields(Stats)==""):idList=listdelete(idList,roll.count);""]
}]

[h,if(repeat==0):"";setLibProperty("Encounter",idList,"Lib:Bestiary")]
[h:setLibProperty("Map",getCurrentMapName(),"Lib:Bestiary")]


[h:outputPC=getLibProperty("PC Output", "Lib:Character")]
[h:outputGM=getLibProperty("GM Output", "Lib:Character")]

[h:output=if(isGM()==1,outputGM,outputPC)]

[h:height=220+repeat*25]
[h:height=if(height>600,600,height)]

<p class='topbar'>

<span title="Open the party manager">[r:macrolink("Party","Manage Party@Lib:Character","","tokenName="+pinName)]</span>&nbsp;
<span title="Open the encounter manager">[r:macrolink("Encounter","Manage Encounter@Lib:Bestiary","","tokenName="+pinName+";reload=1")]</span>&nbsp;
<span title="Open the current loaded Pin ([r:pinName])">[r:macroLink("Pin","Pin Notes@Lib:Character","","tokenName="+pinName)]</span>&nbsp;
</p>

<table>
<tr>
<td>

<b><font size=5>
Encounter
</b>

<font size=3>

<span title="Load selected tokens into the encounter manager">[r:macroLink("Add","Manage Encounter@Lib:Bestiary","","reload=1")]</span> | 
<span title="Select loaded tokens">[r:macroLink("Select","SelectList@Lib:Bestiary","",idList)]</span> | [r:macroLink("Bestiary","Creature Window@Lib:Tables","")] |
	[r:macroLink("Show/Hide All","Show Hide All@Lib:Campaign","","idList="+idList+";pinName="+pinName)]


<td align=right>

<!------------------------------------------------------------------->
[h: processorLink = macroLinkText("Encounter process@Lib:Bestiary","")]
<form action="[r:processorLink]" method="json">



[h:Pins=getTokens(",","{'pc':1,'owned':'none'}")]
[h:repeatPin=listcount(Pins)]

<input type="submit" name="Save" value="Save">&nbsp;
<input type="submit" name="Load" value="Load">&nbsp;

<select name="Pin" size="1">
<option [r:if(pinName=="","selected='selected'","")]>Select Pin</option>
[r,count(repeatPin,""),code:{
	[h:pinID=listget(Pins,roll.count)]
	[h:CurrentPin=getName(pinID)]		
	<option [r:if(pinName==CurrentPin,"selected='selected'","")]>[r:CurrentPin]</option>	
}]


<input type="hidden" name="idList" value="[r:idList]">
<!------------------------------------------------------------------->


</table>



	<table>
	<tr>
	<td width=15>


	
	<th align=left>
	Name
	<th align=center>
	HP
	<th align=center width=50>
	ATK
	<th align=center>
	Damage
	<th align=right width=0%>
	CR
	[h:class="odd"]
	[h:currentTotal=0]
	[h:maxTotal=0]
	[h:CRTotal=0]
	[h:XPTotal=0]
	[r,count(repeat,""),code:{

		<tr [r:if(class=="even",""," class=bg")]>
		[h:class=if(class=="odd","even","odd")]
	
		[h:currentId=listget(idList,roll.count)]
		[h:switchToken(currentId)]
		[h:name=getName(currentId)]
		[h:CName=getProperty("CreatureName",currentId)]
		[h,if(CName!=""):Bestiary=getLibProperty("Bestiary","Lib:Compendium")]
		[h,if(CName!=""):Stats=json.get(Bestiary,CName);Stats=getProperty("Stats",currentId)]
		[h:hp=getProperty("Hit Points",currentId)]

		<td>

		[r:macroLink(if(getVisible(currentId)==1,"X","O"),"Show Hide All@Lib:Campaign","","idList="+currentId+";pinName="+pinName,currentId)]

		<th valign=top align=left>

		[r:macroLink(name,"Statblock@Token","",name,currentId)]


		<td valign=top align=center>

		[h:current=listget(hp,0,"/")]
		[h,if(isNumber(current)==0):current=0]
		[h,if(listcount(hp,"/")==0):max=0;max=listget(hp,1,"/")]
		[h,if(isNumber(max)==0):max=0]
		[h:currentTotal=currentTotal+current]
		[h:maxTotal=maxTotal+max]
	
		[r:macroLink(hp,"Damage@Lib:Bestiary",output,"value="+hp+";tokenName="+name+";pinName="+pinName)]

		<td align=center>

		[h:actions=json.get(Stats,"actions")]
		[h:actions=encode(json.get(actions,"Actions"))]
		[macro("Isolate Dice Rolls@Lib:Bestiary"):"tokenName="+name+";value="+actions]

		<td align=right>
		[r:CRXP=json.get(Stats,"challenge")]
		[h:CR=replace(CRXP,"(\\d+/+\\d*).*","\$1")]
		[h,if(isNumber(CR)==0):CR=eval(CR)]
		[h,if(isNumber(CR)==0):CR=0]
		[h:CRTotal=CRTotal+CR]
		[h:XP=replace(CRXP,".*\\(([\\d,.]+)\\s.*","\$1")]
		[h:XP=replace(XP,"\\D","")]
		[h,if(isNumber(XP)==0):CR=0]
		[h:XPTotal=XPTotal+XP]
		
	}]
	
	<tr>

	<td>
	<th align=left>
	Total
	<td align=center>
	[r:currentTotal]/[r:maxTotal]
	<td colspan=3 align=right>

	
	
	[r:ceil(CRTotal)] ([r: strformat("%,d", XPTotal)] XP)
	</table>



}]