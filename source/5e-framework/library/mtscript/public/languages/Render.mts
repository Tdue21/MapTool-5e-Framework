[h:text=json.get(macro.args,"text")]
[h:language=json.get(macro.args,"language")]
[h:width=json.get(macro.args,"width")]

[h:script="Common"]
[h:LanguageList=getLibProperty("Languages","Lib:Languages")]
[h:script=getStrProp(LanguageList,language)]

[h:id=strfind(text,"([\\w\\d\\s])|(.)")]
[h:translated=""]
[r,count(getFindCount(id),""),code:{

	[h:group1=getGroup(id,roll.count+1,1)]
	[h:group2=getGroup(id,roll.count+1,2)]


	[h,switch(lower(group1)):
	case "a":asset=tableImage(script,101);
	case "b":asset=tableImage(script,102);
	case "c":asset=tableImage(script,103);
	case "d":asset=tableImage(script,104);
	case "e":asset=tableImage(script,105);
	case "f":asset=tableImage(script,106);
	case "g":asset=tableImage(script,107);
	case "h":asset=tableImage(script,108);
	case "i":asset=tableImage(script,109);
	case "j":asset=tableImage(script,110);
	case "k":asset=tableImage(script,111);
	case "l":asset=tableImage(script,112);
	case "m":asset=tableImage(script,113);
	case "n":asset=tableImage(script,114);
	case "o":asset=tableImage(script,115);
	case "p":asset=tableImage(script,116);
	case "q":asset=tableImage(script,117);
	case "r":asset=tableImage(script,118);
	case "s":asset=tableImage(script,119);
	case "t":asset=tableImage(script,120);
	case "u":asset=tableImage(script,121);
	case "v":asset=tableImage(script,122);
	case "w":asset=tableImage(script,123);
	case "x":asset=tableImage(script,124);
	case "y":asset=tableImage(script,125);
	case "z":asset=tableImage(script,126);
	case "1":asset=tableImage(script,1);
	case "2":asset=tableImage(script,2);
	case "3":asset=tableImage(script,3);
	case "4":asset=tableImage(script,4);
	case "5":asset=tableImage(script,5);
	case "6":asset=tableImage(script,6);
	case "7":asset=tableImage(script,7);
	case "8":asset=tableImage(script,8);
	case "9":asset=tableImage(script,9);
	case "0":asset=tableImage(script,0);
	default:asset=""]
	
	[h,if(group1==" "):translated=translated+if(group2==" ","&nbsp;&nbsp;&nbsp;",group2);translated=translated+"<img src='"+asset+"'>"]
	
}]
[h:translated=replace(translated,"^.*?<","<")]



<!------------------RENDER------------------>
[h:tokenName=getImpersonatedName(1)]
[h,if(findToken(tokenName)==""):imgAsset="";imgAsset=getTokenImage()]
[h,if(tokenName==""):name=getPlayerName();name=tokenName]
[h:broadcastText='

<table cellpadding="0">
	<tr>
		
		'+
		if(imgAsset=="",'<td valign="top" width="46" style="padding-right: 5px">','<td valign="top" width="40" style="padding-right: 5px"><img src="'+imgAsset+'-40">')
		+'
		</td>
		<td valign="top" style="padding-left: 5px; margin-right: 5px; border-left-color: silver; border-left-style: solid; border-left-width: 3px">
		<b>'+name+':</b><font size=5>
		'+translated+'

']



[h:link=macroLinkText("Broadcast@Lib:Languages","","text="+encode(text)+";language="+language+";translated="+encode(translated)+";broadcastText="+encode(broadcastText)+";tokenName="+tokenName)]
[h:execLink(link,0,"all")]

[macro("Chat Frame@Lib:Languages"):"width="+width+";language="+language]