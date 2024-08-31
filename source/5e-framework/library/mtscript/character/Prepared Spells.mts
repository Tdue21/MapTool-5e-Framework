[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:CharacterSpells=getLibProperty("Spells","Lib:"+tokenName)]

[dialog5(tokenName+" - Prepared Spells", "width=400; height=550; temporary=1; input=1; noframe=0"): {
	
	<link rel="stylesheet" type="text/css" href="[r:function.getCss('GitHub')]">	
	[h: processorLink = macroLinkText("character/Prepared Spells process@this", "")]
	<form action="[r:processorLink]" method="json">
	
	<input type="submit" name="button" value="Save">[r,count(2,""):"&nbsp;"]
	<input type="submit" name="cancel" value="Cancel">[r,count(10,""):"&nbsp;"]<br>

	[h,if(json.type(CharacterSpells)=="OBJECT"):tempspellList=json.fields(CharacterSpells);tempspellList=""]

	[h:spellList=""]
	[h,count(listcount(tempspellList)),code:{

		[h:currentSpell=listget(tempspellList,roll.count)]
		[h:spellObj=json.get(CharacterSpells,currentSpell)]
		[h:level=json.get(spellObj,"level")]
		[h,if(level>0):spellList=listappend(spellList,currentSpell)]
	
	}]

	[h:SpellArray=json.fromList(spellList)]
	[h,count(listcount(spellList)),code:{
	
		[h:currentSpell=listget(spellList,roll.count)]
		[h:spellObj=json.get(CharacterSpells,currentSpell)]
		[h:prep=json.get(spellObj,"prep")]
		[h:SpellLevel=json.get(spellObj,"level")]
		[h:source=json.get(spellObj,"source")]

		[h:spellObj=json.set("","name",currentSpell)]
		[h:spellObj=json.set(spellObj,"prep",prep)]
		[h:spellObj=json.set(spellObj,"level",SpellLevel)]
		[h:spellObj=json.set(spellObj,"source",source)]

		[h,if(SpellLevel>0):SpellArray=json.set(SpellArray,roll.count,spellObj)]
	
	}]

	<input type="radio" name="All" value=-1 checked="checked"><label for="All">Prepare selected</label><br>
	<input type="radio" name="All" value=1><label for="All">Prepare all</label><br>
	<input type="radio" name="All" value=0><label for="All">Prepare none</label>
	
	
	[h:SpellArray=json.sort(SpellArray,"A","level","name")]

	[h:repeat=listcount(json.fields(SpellArray))]

	[h:currentLevel="0"]
	[r,count(repeat,"<br>"),code:{

		[h:spellObj=json.get(SpellArray,roll.count)]
		[h:name=json.get(spellObj,"name")]
		[h:prep=json.get(spellObj,"prep")]
		[h:level=json.get(spellObj,"level")]
		[h:source=json.get(spellObj,"source")]

		[r,if(currentLevel!=level):"<h5>Level "+level+"</h5>"]
		[h,if(currentLevel!=level):currentLevel=level]

		

		<input type="checkbox" name="[r:name]" value=1 [r,if(prep==1):"checked='checked'"]><label for="vehicle1"><b>[r:macrolink(function.Capitalize(name),"character/Args Dialog@this","","prop=Spells;name="+name+";description=;tokenName="+tokenName)]</b></label> [r,if(source!=""):"("+function.Capitalize(source)+")"]
		
	
	}]
	
	<input type="hidden" name="tokenName" value="[r:tokenName]">

	</form>

}]