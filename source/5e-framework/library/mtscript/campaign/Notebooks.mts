[h:info=getInfo("client")]
[h:libtokens=json.get(info,"library tokens")]
[h:libList=json.fields(libtokens)]

[h:list=libList]
[h,foreach(currentLib, libList, ""), code: {
	[h:settingsProp=getLibProperty("Settings",currentLib)]
	[h,if(json.type(settingsProp)=="UNKNOWN"): fields=""; fields=json.fields(settingsProp)]
	[h,if(listfind(fields,"theme")>=0): ""; list=listdelete(list,listfind(list,currentLib))]
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

[h:height=150 + listcount(ListNotes) * 50]
[h:height=if(height>600,600,height)]

[dialog5("Notebooks", "width=250; height="+height+"; temporary=1; noframe=0; input=1"):{
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="[r:function.getCss('GitHub')]">
	<link rel="stylesheet" type="text/css" href="[r:function.getCss('menus')]">
</head>
<body>
	[h:processorLink=macroLinkText("campaign/MenuProcess@this","")]
	<form class="stackmenu" action="[r:processorLink]" method="json">
		<h4>Create</h4>
		<button type="submit" name="Notebook" value="NewNotebook">New Notebook</button>
		<h4>Read</h4>
		[r,foreach(currentNote, ListNotes, ""), code: {
			[h:visible = if(listfind(ListNotesPC,currentNote)==-1, 0, 1)]
			[h,if(visible==0):body="<body bgcolor=silver>";body=""]
			[h:CurrentName=replace(currentNote,"^Lib:","")]
			[h:settings=getLibProperty("Settings",currentNote)]
			[h:label=json.get(settings,"label")]
			
			<button type="submit" name="Notebook" value="[r:currentNote]">
				<span class="accent" style="background-color: [r:label]">&nbsp;</span>
				<span>[r:CurrentName]</span>
			</button>
		}]
		<input type="hidden" name="Action" value="Notebook">
		<input type="hidden" name="NoteList" value="[r:encode(ListNotes)]">
	</form>
</body>
</html>
}]