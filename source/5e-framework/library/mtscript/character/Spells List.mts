[h:tokenName=getStrProp(macro.args,"tokenName")]





[h:spellLevel="Spells"]

[h:itemObject=getLibProperty(spellLevel,"Lib:Compendium")]

[h:itemList=json.fields(itemObject)]

[h:itemList=listSort(itemList,"N")]

<table>

[h:odd=1]
[r,count(listcount(itemList),""),code:{



	[h:name=listget(itemList,roll.count)]


<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=function.Capitalize(name)]


	[h:currentObj=json.get(itemObject,name)]

	<tr class=[r:if(odd==1,"bg","")]>
	[h:odd=if(odd==1,0,1)]
	<td>
	
	[r:macroLink(CapitalName,"character/Args Dialog@this","","prop="+spellLevel+";name="+name+";description=;tokenName=Compendium")]
	<td width=0% align=right>

	[r:json.toList(json.get(currentObj,"sources"))]
	
	<font size=2 color=red>[r:macrolink("X", "character/Delete Source@this", "","prop="+spellLevel+";name="+name+";tokenName="+tokenName)]</font>
	
}]
</table>


[r:macrolink("+", "character/Args Dialog@this", "","prop="+spellLevel+";index=new;name=new;description=new;tokenName="+tokenName)]



