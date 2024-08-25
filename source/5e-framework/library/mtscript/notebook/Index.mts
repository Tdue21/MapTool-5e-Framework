[h,if(macro.args==""),code:{
	[h:name=replace(token.name,"^Lib:","")]
	[h:tokenName=token.name]
};{
	[h:name=replace(macro.args,"^Lib:","")]
	[h:tokenName=macro.args]
}]

[frame5("Compendium", "width=150; height=500; temporary=0;"):{

	[h:settingsObject=getLibProperty("Settings",tokenName)]

	[h,if(json.type(settingsObject)=="UNKNOWN"):settingsObject='{"theme":"GitHub"}';""]
	[h:setLibProperty("Settings",settingsObject,tokenName)]
	[h:theme=json.get(settingsObject,"theme")]
	[h:ChaNumber=json.get(settingsObject,"ChaNumber")]

	<link rel="stylesheet" type="text/css" href="lib://[r:function.getNamespace()]/css/GitHub.css">
	
	<h3 style="padding-bottom:0px;margin-bottom:8px">
<img src="asset://aed6269a99576e707a8b2e5081a11fed">&nbsp;
[r:macroLink("<font size=6>Compendium","tables/Tables List@this")]
</h3>

[macro("campaign/Search Results@this"):macro.args+";window=Tables List"]

<h5>[r:replace(tokenName,"^Lib:","")]</h5>

	[h:object=getLibProperty("Value",tokenName)]
	[h:fields=json.fields(object)]

	[h:fields=listsort(fields,"N")]
<p>
	[r,count(listcount(fields),""),code:{


		[h:chapter=listget(fields,roll.count)]

		[h,if(ChaNumber==0):chapterName=replace(chapter,"^.*?\\d.*?\\s","");chapterName=chapter]
	
		[h:jsonValue=json.get(object,chapter)]
		
		[r:macroLink(if(chapter=="","-",chapterName),"notebook/Content@this","","key="+chapter+";description="+encode(jsonValue)+";tokenName="+tokenName)]
		<br>
	
	}]
	
	[r:macroLink("+","notebook/Change Form@this","","name=new;description=;tokenName="+tokenName)]
</p>

}]