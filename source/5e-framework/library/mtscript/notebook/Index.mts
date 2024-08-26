[h,if(macro.args==""),code:{
	[h:name=replace(token.name,"^Lib:","")]
	[h:tokenName=token.name]
};{
	[h:name=replace(macro.args,"^Lib:","")]
	[h:tokenName=macro.args]
}]

[frame5(name + " - Index", "width=150; height=500; temporary=0;"):{

	[h:settingsObject=getLibProperty("Settings",tokenName)]

	[h,if(json.type(settingsObject)=="UNKNOWN"):settingsObject='{"theme":"GitHub"}';""]
	[h:setLibProperty("Settings",settingsObject,tokenName)]
	[h:theme=json.get(settingsObject,"theme")]
	[h:ChaNumber=json.get(settingsObject,"ChaNumber")]

	<link rel="stylesheet" type="text/css" href="[r:function.getCss('common')]">	
	<link rel="stylesheet" type="text/css" href="[r:function.getCss('GitHub')]">	
	
	<h3 style="padding-bottom:0px;margin-bottom:8px">
		<img src="lib://[r:function.getNamespace()]/assets/icons/library.png">&nbsp;
		[r:macroLink("Compendium","tables/Tables List@this")]
	</h3>

	<h3>[r:replace(tokenName,"^Lib:","")]</h3>

	[h:object=getLibProperty("Value",tokenName)]
	[h:fields=json.fields(object)]
	[h:fields=listsort(fields,"N")]

	<ul style="list-style-type:none; margin:0px; padding:0px;">
		[r,count(listcount(fields),""),code:{
			<li>
			[h:chapter=listget(fields,roll.count)]
			[h,if(ChaNumber==0):chapterName=replace(chapter,"^.*?\\d.*?\\s","");chapterName=chapter]
			[h:jsonValue=json.get(object,chapter)]
			[r:macroLink(if(chapter=="","-",chapterName),"notebook/Content@this","","key="+chapter+";description="+encode(jsonValue)+";tokenName="+tokenName)]
			</li>	
		}]
		[r:macroLink("+","notebook/Change Form@this","","name=new;description=;tokenName="+tokenName)]
	</p>
}]