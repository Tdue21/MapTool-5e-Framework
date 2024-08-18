[h:tokenName=getStrProp(macro.args,"tokenName")]

[h:itemObject=getLibProperty("Feats","Lib:Compendium")]

[h:itemList=json.fields(itemObject)]

[h:itemList=listSort(itemList,"N")]

<table>

[h:odd=1]
[r,count(listcount(itemList),""),code:{

	[h:name=listget(itemList,roll.count)]

<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=capitalize(name)]
[h:CapitalName=replace(CapitalName,"(?<=\\s)Of(?=\\s)","of")]
[h:CapitalName=replace(CapitalName,"(?<=\\s)A(?=n?\\s)","a")]
[h:CapitalName=replace(CapitalName,"(?<=\\s)Th(?=(?:e|at|ose)\\s)","th")]
[h:CapitalName=replace(CapitalName,"'S(?=\\s)","'s")]

	
	[h:currentObj=json.get(itemObject,name)]

	<tr class=[r:if(odd==1,"bg","")]>
	[h:odd=if(odd==1,0,1)]
	<td>
	
	[r:macroLink(CapitalName,"Args Dialog@Lib:Character","","prop=Feats;name="+name+";description=;tokenName=Compendium")]
	<td width=0% align=right>

	[r:json.toList(json.get(currentObj,"sources"))]
	
	<font size=2 color=red>[r:macroLink("X","Delete Source@Lib:Character","","prop=Feats;name="+name+";tokenName="+tokenName)]</font>
	
}]
</table>

[r:macrolink("+","Args Dialog@Lib:Character","","prop=Feats;index=new;name=new;description=new;tokenName="+tokenName)]