[h:cancel=json.get(macro.args,"cancel")]
[h:tokenName=json.get(macro.args,"tokenName")]
[h:all=json.get(macro.args,"All")]

[h:abort(if(cancel=="",1,0))]

[h:preparedSpells=json.remove(macro.args,"All")]
[h:preparedSpells=json.remove(preparedSpells,"tokenName")]
[h:preparedSpells=json.remove(preparedSpells,"cancel")]
[h:preparedSpells=json.remove(preparedSpells,"button")]


[h:CharacterSpells=getLibProperty("Spells","Lib:"+tokenName)]

[h:nameList=json.fields(CharacterSpells)]
[h,count(listcount(nameList)),code:{

	[h:currentSpell=listget(nameList,roll.count)]

	[h:spellObj=json.get(CharacterSpells,currentSpell)]
	[h:spellObj=json.set(spellObj,"prep",if(all==1,1,0))]
	[h:CharacterSpells=json.set(CharacterSpells,currentSpell,spellObj)]

}]


[h,switch(all),code:
case 0:
{

	[h:res=input("var|Are you sure you want to remove all prepared spells?||label|span=true")]
	[h:abort(res)]
	[h:setLibProperty("Spells",CharacterSpells,"Lib:"+tokenName)]
};
case 1:
{

	[h:res=input("var|Are you sure you want to prepare all spells?||label|span=true")]
	[h:abort(res)]
	[h:setLibProperty("Spells",CharacterSpells,"Lib:"+tokenName)]
	
};
default:
{

	[h:nameList=json.fields(preparedSpells)]

	[h:res=input("<html>"+replace(nameList,",","<br>")+"</html>|Prepare "+listcount(nameList)+" spell"+if(listcount(nameList)==1,"","s")+"?||label|span=true")]
	[h:abort(res)]


	[h,count(listcount(nameList)),code:{

		[h:currentSpell=listget(nameList,roll.count)]

		[h:spellObj=json.get(CharacterSpells,currentSpell)]
		[h:spellObj=json.set(spellObj,"prep",1)]
		[h:CharacterSpells=json.set(CharacterSpells,currentSpell,spellObj)]
	
	}]

	[h:setLibProperty("Spells",CharacterSpells,"Lib:"+tokenName)]
	
}]


[h,if(isFrameVisible(tokenName+" - Character Sheet")==1),code:{
[macro("character/Macro Frame@this"):"macro=Character Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Spellcasting Sheet")==1),code:{
[macro("character/Macro Frame@this"):"macro=Spellcasting Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Statblock")==1),code:{
[macro("character/Macro Frame@this"):"macro=Statblock;tokenName="+tokenName]
};{}]