[h:tokenName="Lib:Compendium"]





[h:spellLevel="Spells"]

[h:itemObject=getLibProperty(spellLevel,function.getNamespace())]

[h:itemList=json.fields(itemObject)]

[h:itemList=listSort(itemList,"N")]

[h:Initial=""]

[r,count(listcount(itemList),""),code:{



	[h:name=listget(itemList,roll.count)]

<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=function.Capitalize(name)]


	[h:currentObj=json.get(itemObject,name)]

	[h:SpellInitial=substring(name,0,1)]
	[r,if(Initial==SpellInitial):"";"</li><h3>"+upper(SpellInitial)+"</h3>"]
	[h:Initial=SpellInitial]
	
	<li>[r:macroLink(CapitalName,"character/Args Dialog@this","","prop="+spellLevel+";name="+name+";description=;tokenName=Compendium")]

	

}]




