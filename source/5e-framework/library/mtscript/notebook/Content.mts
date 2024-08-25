[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:chapter=getStrProp(macro.args,"key")]
[h:description=getStrProp(macro.args,"description")]
[h:share=getStrProp(macro.args,"share")]
[h:name=replace(tokenName,"^Lib:","")]

[frame5(if(share==1,"Shared",name), "width=500; height=500; temporary=0;"):{
	[h:settingsObject=getLibProperty("Settings",tokenName)]
	[h:theme=json.get(settingsObject,"theme")]
	<title>[r:name+" - "+chapter]</title>
	<link rel="stylesheet" type="text/css" href="[r:function.getCss(theme)]"><body>

	[h:permissions=getLibProperty("PlayerPermission",function.getNamespace())]
	[h:closeShared=getStrProp(permissions,"closeShared")]
	[h,if(isGM()==1):closeShared=1]
	
	[r,if(share==1),code:{
		[r,if(closeShared==1):"<p  class='topbar'>"+macroLink("Close Shared","campaign/Close Shared@this")+"</p>"]	
	};{
		[h:object=getLibProperty("Value",tokenName)]
		[h:fields=json.fields(object)]
		[h:fields=listsort(fields,"N")]
		[h:next=listget(fields,listfind(fields,chapter)+1)]
		[h:prev=listget(fields,listfind(fields,chapter)-1)]
		[h:jsonNext=json.get(object,next)]
		[h:jsonPrev=json.get(object,prev)]
	
		<p class='topbar'>
	
		[r:macroLink("Edit","notebook/Change Form@this","","name="+chapter+";description="+encode(description)+";tokenName="+tokenName)]&nbsp;
		[r:macroLink("Settings","notebook/Settings@this","","name="+chapter+";description="+encode(description)+";tokenName="+tokenName)]&nbsp;

		[h:permissions=getLibProperty("PlayerPermission",function.getNamespace())]
		[h:sharePlayer=getStrProp(permissions,"share")]
		[h,if(isGM()==1):sharePlayer=1]
		
		[r,if(sharePlayer==1):macroLink("Share","notebook/Share@this","","share=1;key="+chapter+";description="+description+";tokenName="+tokenName)]&nbsp;
		[r,count(10,""):"&nbsp;"]
		[r,if(listfind(fields,chapter)-1==-1):"<font color=silver>&lt;&lt;&lt;</font>";macroLink("&lt;&lt;&lt;","notebook/Content@this","","key="+prev+";description="+encode(jsonPrev)+";tokenName="+tokenName)]&nbsp;
		[r:macroLink("Index","Notebook@"+tokenName)]&nbsp;
		[r,if(listfind(fields,chapter)+1==listcount(fields)):"<font color=silver>>>></font>";macroLink(">>>","notebook/Content@this","","key="+next+";description="+encode(jsonNext)+";tokenName="+tokenName)]
		
		</p>
	}]
	[macro("notebook/Markdown@this"):"tokenName="+tokenName+";description="+description]
}]