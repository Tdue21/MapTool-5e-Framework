[h:AddFeats=getLibProperty("AdditionalFeats","Lib:Compendium")]
[h:addFeatList=json.fields(AddFeats)]

[h:OtherObj="{}"]
[h:id=strfind(addFeatList,"(?!,)(.*?):(.*?)(?=,|\$)")]
[h,count(getFindCount(id)),code:{

	[h:group1=getGroup(id,roll.count+1,1)]
	[h:group2=getGroup(id,roll.count+1,2)]
	[h:currentOption=json.get(OtherObj,group1)]
	[h:currentOption=listappend(currentOption,group2)]
	[h:OtherObj=json.set(OtherObj,group1,currentOption)]

}]
[h:fields=json.fields(OtherObj)]


[h,if(macro.args==""),code:{


	
	[h:res=input("feat|"+fields+"|Feature Type|list|value=string")]
	[h:abort(res)]
};{

	[h:feat=macro.args]

}]

[h:currentList=json.get(OtherObj,feat)]


<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=function.Capitalize(feat)]

[dialog5("Options", "width=750; height=600; temporary=1; noframe=0; input=1"):{

	<link rel="stylesheet" type="text/css" href="[r:function.getCss('D&D')]">

	<title>[r:CapitalName]</title>

<table>
<tr><td width=150 valign=top>

[r,count(listcount(fields),"<br>"),code:{

	[h:currentOption=listget(fields,roll.count)]

	<!---------------------------CAPITALIZE----------------------------->
	[h:CapitalNameCurrent=function.Capitalize(currentOption)]
	
	[r,if(feat==currentOption):"<b>"]
	[r:macroLink(CapitalNameCurrent,"tables/Options Window@this","",currentOption)]
	[r,if(feat==currentOption):"</b>"]
}]

<td>

	<h1>[r:CapitalName]</h1>



	[r,count(listcount(currentList),""),code:{
	
		[h:currentFeature=listget(currentList,roll.count)]

		<!---------------------------CAPITALIZE----------------------------->
		[h:CapitalName=function.Capitalize(currentFeature)]


		<h4>[r:CapitalName]
		<font size=3>
	[r:macrolink("Edit", "character/Change Form@this")"","prop=AdditionalFeats;source=;name="+feat+": "+currentFeature+";description=;tokenName=Lib:Campaign")] |
	[r:macrolink("Move", "character/Move@this")"","tokenName=Lib:Compendium;description=;name="+feat+": "+currentFeature+";prop=AdditionalFeats")]</h4>

		[h:currentObj=json.get(AddFeats,feat+": "+currentFeature)]
		[h:description=json.get(currentObj,"description")]

		[macro("campaign/Markdown@this"):"tokenName=Lib:Tables;description="+encode(description)+";source=Class;name="+currentFeature+";group=AdditionalFeats"]
		
	
	}]

}]