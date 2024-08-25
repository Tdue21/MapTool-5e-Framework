[h:info=getInfo("client")]
[h:libtokens=json.get(info,"library tokens")]
[h:libList=json.fields(libtokens)]
[h:list=libList]

[h,foreach(currentLib, libList, ""),code:{
	[h:settingsProp=getLibProperty("Settings",currentLib)]
	[h,if(json.type(settingsProp)=="UNKNOWN"):fields="";fields=json.fields(settingsProp)]
	[h,if(listfind(fields,"theme")>=0):"";list=listdelete(list,listfind(list,currentLib))]
}]

[h:ListNotesPC=""]
[h:maps=getAllMapNames()]
[h:ListNotesGM=list]
[h,foreach(map, maps),code:{
    [h:ownedtokens=getOwnedNames(getPlayerName(),",",map)]
	[h,foreach(currentOwned, ownedtokens, ""),code:{
		[h:find=listfind(list,currentOwned)]
		[h,if(find==-1):"";ListNotesPC=listappend(ListNotesPC,currentOwned)]
	}]
}]

[h:ListNotes=if(isGM()==1,ListNotesGM,ListNotesPC)]
[h:ListNotes=listsort(ListNotes,"N")]
[r:json.append("", ListNotes, ListNotesPC)]