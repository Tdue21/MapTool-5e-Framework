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
	
		[h:objLink=macroLinkText("Select Map process@Lib:Campaign","",ContentName)]
	
	};
	case "note":{
	
			[h:note=replace(group3,".*@","")]
		[h:chapter=replace(group3,"@.*","")]

		[h:note=if(matches(note,"^Lib:.*")==1,note,"Lib:"+note)]
		
		[h:object=getLibProperty("Value",note)]
[h:jsonValue=json.get(object,chapter)]
[h:objLink=macroLinkText("Content@Lib:Notebook","","key="+chapter+";description="+encode(jsonValue)+";tokenName="+note)]
	
	};
	case "npc":{
	
	<!---------NPC STATBLOCK---------->
		[h:objLink=macroLinkText("Viewer Frame@Lib:Bestiary","",lower(ContentName))]
	
	};

	case "pc":{

		<!---------PC STATBLOCK---------->	
		[h:objLink=macroLinkText("Macro Frame@Lib:Character","","macro=Statblock;tokenName="+ContentName)]
		Waterskin
		};
	
	case "token":{
	
		<!---------TOKEN ON MAP---------->
		[h:map=getCurrentMapName()]
		[h,if(group2=="token"):objLink=macroLinkText("Focus Token@Lib:Character","","map="+map+";tokenName="+ContentName)]
	
	};
	default:{
	
	[h:tokenId=findToken(tokenName)]
	[h,if(tokenId==""):proptype="";proptype=getPropertyType(tokenId)]
	
	[h,switch(proptype):
	case "Basic":library="Lib:Character";
	case "Props":library="Lib:Character";
	case "NPC":library="Lib:Bestiary";
	case "Notebook":library="Lib:Notebook";
	default:library="Lib:Campaign"]
	<!---------CONTENT POPUP---------->
		[h:group3=replace(group3,'"',"")]
		[h:Object=getLibProperty(group2,"Lib:Compendium")]
		[h:objLink=macroLinkText("Args Dialog@"+library,"","prop="+group2+";source=;name="+lower(ContentName)+";description=;tokenName="+tokenName)]
	
	}]


[h:execLink(objLink)]