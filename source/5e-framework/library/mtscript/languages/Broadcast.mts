[h:text=decode(getStrProp(macro.args,"text"))]
[h:language=getStrProp(macro.args,"language")]
[h:translated=decode(getStrProp(macro.args,"translated"))]
[h:broadcastText=decode(getStrProp(macro.args,"broadcastText"))]
[h:tokenName=getStrProp(macro.args,"tokenName")]





<!------------------Translation------------------>

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

[h:understoodby="<b>Understood by:</b> "]
[h:PCListUnderstood=""]
[h:match=0]
[h,count(listCount(ListPC)),code:{

	[h:PCName=listget(ListPC,roll.count)]
	[h:value=getLibProperty("Languages",PCName)]
	[h,if(match==0):match=matches(lower(value),".*"+lower(language)+".*")]
	[h:match2=matches(lower(value),".*"+lower(language)+".*")]
	[h,if(match2==1):PCListUnderstood=listappend(PCListUnderstood,replace(PCName,"^Lib:",""))]
	

}]
[h,if(match==1):text="<table style='border:1px solid gray;'><tr><td><font size=3 color=gray><b>"+language+":</b> "+text+"<br>"+understoodby+PCListUnderstood+"</td></tr></table></td></tr></table>";text=if(isGM()==1,"<table style='border:1px solid gray;'><tr><td><font size=3 color=gray><b>"+language+":</b> "+text+"<br>","")+"</td></tr></table></td></tr></table>"]

[h:broadcast(broadcastText+text,"self")]
