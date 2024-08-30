[h:width=getStrProp(macro.args,"width")]
[h:language=getStrProp(macro.args,"language")]
[h,if(width==""):width=10]
[h,if(language==""):language="Common"]

[h:LanguageStrList=getLibProperty("Languages","Lib:Languages")]
[h:LanguageList=""]
[r,count(countStrProp(LanguageStrList),""),code:{

	[h:LanguageList=listappend(LanguageList,indexKeyStrProp(LanguageStrList,roll.count))]

}]

<!----------List PC Libs----------->
[h:info=getInfo("client")]
[h:libtokens=json.get(info,"library tokens")]
[h:libList=json.fields(libtokens)]

[h:list=libList]
[h,count(listcount(libList)),code:{
	[h:currentLib=listget(libList,roll.count)]
	[h:settingsProp=getLibProperty("LibName",currentLib)]
	[h,if(settingsProp==""):list=listdelete(list,listfind(list,currentLib));""]
}]
[h:ListPC=""]
[h:maps=getAllMapNames()]
[h,if(isGM()==1),count(listcount(maps)),code:{
[h:ListPC=list]
};{

	[h:map=listget(maps,roll.count)]
	[h:ownedtokens=getOwnedNames(getPlayerName(),",",map)]
	
	[h,count(listcount(ownedtokens)),code:{
	
		[h:currentOwned=listget(ownedtokens,roll.count)]
		[h:find=listfind(list,currentOwned)]
		[h,if(find==-1):"";ListPC=listappend(ListPC,currentOwned)]
	}]
}]
[r:ListPC=listsort(ListPC,"N")]
<!----------End of List PC Libs----------->

[h:rcount=0]
[h:displayList=""]
[h,count(listcount(ListPC)),code:{

	
	[h:currentPC=listget(ListPC,rcount)]
	[h:rcount=rcount+1]

	[h:PCLanguages=getLibProperty("Languages",currentPC)]
	[h,count(listcount(PCLanguages)),code:{
	
		[h:currentLanguage=listget(PCLanguages,roll.count)]
		[h:match=matches(lower(LanguageList),".*"+lower(currentLanguage)+".*")]
		[h:repeated=matches(lower(displayList),".*"+lower(currentLanguage)+".*")]
		[h,if(match==1 && repeated==0):displayList=listappend(displayList,currentLanguage)]
	}]

}]
[h,if(isGM()==1):displayList=LanguageList]

[frame5("Fantasy Script"):{

<link rel="stylesheet" type="text/css" href="[r:function.getCss('GitHub')]">
	[h: processorLink = macroLinkText("languages/Render@this", "")]

<form action="[r:processorLink]" method="json">

	


	
	[r:macrolink("&lt;", "languages/Chat Frame@this")"","width="+number(width-1)+";language="+language)]
	[r:macrolink(">", "languages/Chat Frame@this")"","width="+number(width+1)+";language="+language)]
	<input type="text" name="text" value="" size="[r:width]">
	
	&nbsp;
	<input type="submit" name="button" value="OK">
	&nbsp;

	<select name="language">

	
	[r,count(listcount(displayList),""),code:{
	
		[h:CurrentLanguage=listget(displayList,roll.count)]
		<option [r,if(language==CurrentLanguage):"selected='selected'"]>[r:CurrentLanguage]</option>
	
	}]
	</select>

	<input type="hidden" name="width" value="[r:width]">
</form>

}]

