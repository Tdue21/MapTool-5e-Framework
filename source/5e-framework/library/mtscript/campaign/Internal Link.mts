[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:group0=getStrProp(macro.args,"group0")]

<!---------Internal Links---------->
[h:id=strfind(group0,"(?<!!)\\[([\\s\\w\\d'-/\\(\\)\\.,;]*?)\\]"+"\\(([Ss]pells?|[Ii]tems?|[Ee]quipment|[Ff]eats?|[Aa]dditional\\s?[Ff]eats?|[Nn][Pp][Cc]|[Tt]oken|[Pp]in|[Nn]ote|[Mm]ap|[Pp][Cc])"+'(?:\\s?"(.*?)"\\)|.*?\\))')]

	[h:group1=getGroup(id,1,1)]
	[h:group1=replace(group1,"PLUSPLACEHOLDER","+")]
	[h:group2=getGroup(id,1,2)]
	[h:group3=getGroup(id,1,3)]
	[h:ContentName=if(group3=="",group1,group3)]

	[h:group2=replace(group2,"[Ss]pell.*","spells")]
	[h:group2=replace(group2,"[Ii]tem.*","equipment")]

	[h:group2=replace(group2,"[Ff]eat.*","feats")]
	[h:group2=replace(group2,"[Aa]dditional\\s?[Ff]eats?","AdditionalFeats")]

	[h:group2=replace(group2,"[Pp]in","token")]

	[h,switch(group2),code:

	case "map":{
		[h:objLink=macroLinkText("campaign/Select Map process@this","",ContentName)]
	};
	case "note":{
		[h:note=replace(group3,".*@","")]
		[h:chapter=replace(group3,"@.*","")]
		[h:note=if(matches(note,"^Lib:.*")==1,note,"Lib:"+note)]
		[h:object=getLibProperty("Value",note)]
		[h:jsonValue=json.get(object,chapter)]
		[h:objLink=macroLinkText("notebook/Content@this","","key="+chapter+";description="+encode(jsonValue)+";tokenName="+note)]	
	};
	case "npc":{
		<!---------NPC STATBLOCK---------->
		[h:objLink=macroLinkText("bestiary/Viewer Frame@this","",lower(ContentName))]	
	};
	case "pc":{
		<!---------PC STATBLOCK---------->	
		[h:objLink=macroLinkText("character/Macro Frame@this","","macro=Statblock;tokenName="+ContentName)]
		Waterskin
	};
	case "token":{
		<!---------TOKEN ON MAP---------->
		[h:map=getCurrentMapName()]
		[h,if(group2=="token"):objLink=macroLinkText("character/Focus Token@this","","map="+map+";tokenName="+ContentName)]
	
	};
	default:{
		[h:tokenId=findToken(tokenName)]
		[h,if(tokenId==""):proptype="";proptype=getPropertyType(tokenId)]
		[h,switch(proptype):
			case "Basic"   : library = "character";
			case "Props"   : library = "character";
			case "NPC"     : library = "bestiary";
			case "Notebook": library = "notebook";
			default        : library = "campaign"
		]
		<!---------CONTENT POPUP---------->
		[h:group3=replace(group3,'"',"")]
		[h:Object=getLibProperty(group2,function.getNamespace())]
		[h:objLink=macroLinkText(library + "/Args Dialog@this","","prop="+group2+";source=;name="+lower(ContentName)+";description=;tokenName="+tokenName)]
	
	}]


[h:execLink(objLink)]