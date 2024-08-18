[h:currentClass=macro.args]

[h,if(currentClass==""),code:{
	
	[h:spellLists=getLibProperty("Spell Lists","Lib:Character Creation")]
	[h:spellLists=listsort(spellLists,"A")]
	
	[h:res=input("currentClass|"+spellLists+"|Select Spellcasting Class|list|value=string")]
	[h:abort(res)]

};{}]


	<table>
	<tr><td width=25% valign=top>


	[h:spellCount=0]
	[h:spellCountTotal=0]

	<h3>[r:currentClass] Spells</h3>

	[h:SpellObject=getLibProperty(currentClass,"Lib:Character Creation")]

	[h:fieldsList=json.fields(SpellObject)]


	[h,count(listcount(fieldsList),""),code:{
	
		[h:currentLevel=listget(fieldsList,roll.count)]
		[h:spellCountTotal=spellCountTotal+listcount(json.toList(json.get(SpellObject,currentLevel)))]

	}]



	[r,count(listcount(fieldsList),""),code:{
	
		[h:currentLevel=listget(fieldsList,roll.count)]

		[h:levelList=json.get(SpellObject,currentLevel)]
		[h:levelList=json.toList(levelList)]

		[h:spellCount=macro.return]	
		
		[macro("Level Spells@Lib:Tables"):"levelList="+levelList+";prop="+currentLevel+";spellCount="+spellCount+";spellCountTotal="+spellCountTotal]

		
		
	}]

	</table>




