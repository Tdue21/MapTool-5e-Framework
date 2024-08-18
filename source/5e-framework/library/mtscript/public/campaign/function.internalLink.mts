[h:entry=arg(0)]
[h:tokenName=arg(1)]



<!---------Internal Links---------->
[h:id=strfind(entry,"(?<!!)\\[([\\s\\w\\d'-/\\(\\)\\.,;]*?)\\]"+"\\((?![Hh][Tt][Tt][Pp])([\\w\\s\\d]*)"+'(?:\\s?"(.*?)"\\)|.*?\\))')]
[h,count(getFindCount(id)),code:{
	[h:group0=getGroup(id,roll.count+1,0)]
	[h:group1=getGroup(id,roll.count+1,1)]
	[h:group1=replace(group1,"PLUSPLACEHOLDER","+")]
	[h:group2=getGroup(id,roll.count+1,2)]
	[h:group3=getGroup(id,roll.count+1,3)]
	[h:ContentName=if(group3=="" || group3==0,group1,group3)]

	[h:title=replace(lower(group2),"\\s*\$","")]
	[h,switch(title):
	case "npc":title="NPC";
	case "pc":title="PC";
	default:title=capitalize(title)]

	[h:objLink=macroLink('<span title="'+title+": "+function.Capitalize(ContentName)+'">'+group1+"</span>","Internal Link@Lib:Campaign","","group0="+group0+";tokenName="+tokenName)]
	
	[h:entry=replace(entry,"(?<!!)\\[([\\s\\w\\d'-/\\(\\)\\.,;]*?)\\]"+"\\(((?![Hh][Tt][Tt][Pp])[\\w\\s\\d]*)"+'(?:\\s?"(.*?)"\\)|.*?\\))',objLink,1)]
}]

[r:entry]