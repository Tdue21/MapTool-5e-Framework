[h:info=getInfo("client")]
[h:libtokens=json.get(info,"library tokens")]
[h:libList=json.fields(libtokens)]

[h:list=libList]
[h,count(listcount(libList)),code:{

	[h:currentLib=listget(libList,roll.count)]
	[h:settingsProp=getLibProperty("Settings",currentLib)]
	[h,if(json.type(settingsProp)=="UNKNOWN"):fields="";fields=json.fields(settingsProp)]
	[h,if(listfind(fields,"theme")>=0):"";list=listdelete(list,listfind(list,currentLib))]

}]



[h:ListNotesPC=""]
[h:maps=getAllMapNames()]
[h:ListNotesGM=list]
[h,count(listcount(maps)),code:{

	[h:map=listget(maps,roll.count)]
	[h:ownedtokens=getOwnedNames(getPlayerName(),",",map)]
	
	[h,count(listcount(ownedtokens)),code:{
	
		[h:currentOwned=listget(ownedtokens,roll.count)]
		[h:find=listfind(list,currentOwned)]
		[h,if(find==-1):"";ListNotesPC=listappend(ListNotesPC,currentOwned)]
	}]
}]

[h:ListNotes=if(isGM()==1,ListNotesGM,ListNotesPC)]

[h:ListNotes=listsort(ListNotes,"N")]

[h:height=125+listcount(ListNotes)*40]
[h:height=if(height>600,600,height)]


[dialog("Notebooks", "width=235; height="+height+"; temporary=1; noframe=0; input=1"):{

<link rel="stylesheet" type="text/css" href="GitHub@Lib:Campaign">

<table>
<tr>
<td align=left>



[h:processorLink=macroLinkText("Menu process@Lib:Campaign","")]
<form action="[r:processorLink]" method="json">


<b>Create
<br>

<input type="submit" name="NewNotebook" value="<html><table width=150><tr><td aligin=center style='margin:0px;padding:0px'>New Notebook</table></html>">
<br>

Read
<br>

[r,count(listcount(ListNotes),""),code:{

	[h:currentNote=listget(ListNotes,roll.count)]

	[h:visible=if(listfind(ListNotesPC,currentNote)==-1,0,1)]
	[h,if(visible==0):body="<body bgcolor=silver>";body=""]

	[h:CurrentName=replace(currentNote,"^Lib:","")]
	
	[h:settings=getLibProperty("Settings",currentNote)]
	[h:label=json.get(settings,"label")]
	[h:label=if(label=="" || label=="none","<td width=5 style='margin:1px;margin-right:2px'>","<td width=5 style='border:1px solid black;background-color:"+ label+";margin-right:2px'>")]
	
	<input type="submit" name="[r:currentNote]" value="<html>[r:body]<table width=150><tr>[r:label]<td aligin=center style='margin:0px;padding:0px;'>[r:CurrentName]</table></html>">
	<br>
	

}]

<input type="hidden" name="NoteList" value="[r:encode(ListNotes)]">

</table>


}]