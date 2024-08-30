[h:class=getStrProp(macro.args,"class")]
[h:subclass=getStrProp(macro.args,"subclass")]

<title>
	[r:name=if(subclass=="",class,subclass)]
</title>

[h:classesObj=getLibProperty("Classes",function.getNamespace())]
[h:classObj=json.get(classesObj,class)]

<table>
<tr><td width=150 valign=top>
	[h:classlist=json.fields(classesObj)]
	[h:classlist=listSort(classlist,"a")]
	<table style="margin:0px;padding:0px">
	[r,count(listcount(classlist),""),code:{
		<tr>
		<td style="margin:0px;padding:0px;margin-top:5px;">
		[h:currentClass=listget(classlist,roll.count)]
		<!---------------------------CAPITALIZE----------------------------->
		[h:CapitalName=function.Capitalize(currentClass)]
		[r,if(name==currentClass):"<b>"]
		[r:macroLink(CapitalName,"tables/Class Window@this","","class="+currentClass)]
		[r,if(name==currentClass):"</b>"]
		<br>
		[h:CurrentClassObj=json.get(classesObj,currentClass)]
		[h:subclassList=json.toList(json.get(CurrentClassObj,"subclass"))]

		[r,count(listcount(subclassList),""),code:{
			[h:currentSubclass=listget(subclassList,roll.count)]
			<!---------------------------CAPITALIZE----------------------------->
			[h:CapitalName=function.Capitalize(currentSubclass)]
			[r,if(name==currentSubclass):"<b>"]
			[r:macroLink(CapitalName,"tables/Class Window@this","","class="+currentClass+";subclass="+currentSubclass)]
			[r,if(name==currentSubclass):"</b>"]
			<br>	
		}]
	}]
	</table>
<td>
	[h,if(subclass==""):"";classObj=json.get(classObj,"subclass")]
	[h,if(subclass==""):"";classObj=json.get(classObj,subclass)]
	[h:level1=json.get(classObj,"level1")]
	[h:level2=json.get(classObj,"level2")]
	[h:level3=json.get(classObj,"level3")]
	[h:level4=json.get(classObj,"level4")]
	[h:level5=json.get(classObj,"level5")]
	[h:level6=json.get(classObj,"level6")]
	[h:level7=json.get(classObj,"level7")]
	[h:level8=json.get(classObj,"level8")]
	[h:level9=json.get(classObj,"level9")]
	[h:level10=json.get(classObj,"level10")]
	[h:level11=json.get(classObj,"level11")]
	[h:level12=json.get(classObj,"level12")]
	[h:level13=json.get(classObj,"level13")]
	[h:level14=json.get(classObj,"level14")]
	[h:level15=json.get(classObj,"level15")]
	[h:level16=json.get(classObj,"level16")]
	[h:level17=json.get(classObj,"level17")]
	[h:level18=json.get(classObj,"level18")]
	[h:level19=json.get(classObj,"level19")]
	[h:level20=json.get(classObj,"level20")]

	[h:features=""]
	[h,if(level1==""):"";features=listappend(features,level1)]
	[h,if(level2==""):"";features=listappend(features,level2)]
	[h,if(level3==""):"";features=listappend(features,level3)]
	[h,if(level4==""):"";features=listappend(features,level4)]
	[h,if(level5==""):"";features=listappend(features,level5)]
	[h,if(level6==""):"";features=listappend(features,level6)]
	[h,if(level7==""):"";features=listappend(features,level7)]
	[h,if(level8==""):"";features=listappend(features,level8)]
	[h,if(level9==""):"";features=listappend(features,level9)]
	[h,if(level10==""):"";features=listappend(features,level10)]
	[h,if(level11==""):"";features=listappend(features,level11)]
	[h,if(level12==""):"";features=listappend(features,level12)]
	[h,if(level13==""):"";features=listappend(features,level13)]
	[h,if(level14==""):"";features=listappend(features,level14)]
	[h,if(level15==""):"";features=listappend(features,level15)]
	[h,if(level16==""):"";features=listappend(features,level16)]
	[h,if(level17==""):"";features=listappend(features,level17)]
	[h,if(level18==""):"";features=listappend(features,level18)]
	[h,if(level19==""):"";features=listappend(features,level19)]
	[h,if(level20==""):"";features=listappend(features,level20)]

	[h:id=strfind(features,"\\(choose \\d+,(.*?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:features=replace(features,"\\(choose \\d+,(.*?)\\)",group1,1)]
	}]

	<!---------------------------CAPITALIZE----------------------------->
	[h:CapitalName=capitalize(name)]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)Of(?=\\s)","of")]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)A(?=n?\\s)","a")]
	[h:CapitalName=replace(CapitalName,"(?<=\\s)Th(?=(?:e|at|ose)\\s)","th")]
	[h:CapitalName=replace(CapitalName,"'S(?=\\s)","'s")]

	[h:featProps=getLibProperty("Feats", function.getNamespace())]
	[h:addFeatProps=getLibProperty("AdditionalFeats", function.getNamespace())]

	<!--------------------------CLASS------------------------------->
	[h:description=json.get(featProps,name)]
	[h,if(json.type(description)=="UNKNOWN"):description="";description=json.get(description,"description")]
	<h1>[r:CapitalName]</h1>

	<p>
		As a [r:name], you gain the following class features.
	</p>

	[r,count(listcount(features),""),code:{
		[h:name=listget(features,roll.count)]
		<!---------------------------CAPITALIZE----------------------------->
		[h:CapitalName=function.Capitalize(name)]
		<!--------------------------Feature------------------------------->
		[h:isAddFeat=matches(name,".*:.*")]
		[h:description=json.get(if(isAddFeat==1,addFeatProps,featProps),name)]
		[h,if(json.type(description)=="UNKNOWN"):description="";description=json.get(description,"description")]
		[r:if(isAddFeat==1,"<h4>","<h3>")]
		[r,if(isAddFeat==1):replace(CapitalName,".*?:","");CapitalName]
		<font size=3>
		[r:macroLink("Edit","character/Change Form@this","","prop="+if(isAddFeat==1,"AdditionalFeats","Feats")+";source=;name="+name+";description=;tokenName=Lib:Campaign")] |
		[r:macrolink("Move","character/Move@this","","tokenName=Lib:Compendium;description=;name="+name+";prop="+if(isAddFeat==1,"AdditionalFeats","Feats"))]
		[r:if(isAddFeat==1,"</h4>","</h3>")]
		[macro("campaign/Markdown@this"):"tokenName=Lib:Tables;description="+encode(description)+";source=Class;name="+name+";group=Feats"]
	}]