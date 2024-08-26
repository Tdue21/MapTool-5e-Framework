[h:group=getStrProp(macro.args,"prop")]
[h:name=getStrProp(macro.args,"name")]
[h:customName=getStrProp(macro.args,"customName")]
[h:identified=getStrProp(macro.args,"identified")]
[h:index=getStrProp(macro.args,"index")]
[h:source=getStrProp(macro.args,"source")]
[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:description=getStrProp(macro.args,"description")]
[h:share=getStrProp(macro.args,"share")]

<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=function.Capitalize(name)]

[h,if(description==""),code:{
	[h:compendium=getLibProperty(group,function.getNamespace())]
	[h:item=json.get(compendium,lower(name))]
	[h,if(json.type(item)=="UNKNOWN"):description="";description=encode(json.get(item,"description"))]
	[h,if(json.type(item)=="UNKNOWN"):sources="";sources=json.toList(json.get(item,"sources"))]
};{
	[h:compendium=getLibProperty(group,function.getNamespace())]
	[h:item=json.get(compendium,name)]
	[h,if(json.type(item)=="UNKNOWN"):sources="";sources=json.toList(json.get(item,"sources"))]
}]

[h:size=length(description)]
[h:height=if(size>1000,650,if(size>400,450,if(size>100,300,200)))]

[overlay("Shared","zorder=5;"):{
[h:fontSize=if(size>4000,10,15)]

<!DOCTYPE html>
<html>
<head>
[r:'<style>
.footerBIG	{
	position: absolute;
	text-align: left;
	background-color: white;
	max-width: 50%;
	top: 0;
	left: 50%;
	margin-right: -50%;
	transform: translate(-50%, 0);
	padding: 10px;
	border-style: solid;
	border-width: 2px;
	border-color: black;
	}
.footer	{
	position: absolute;
	text-align: left;
	background-color: white;
	max-width: 50%;
	top: 50%;
	left: 50%;
	margin-right: -50%;
	transform: translate(-50%, -50%);
	padding: 15px;
	border-style: solid;
	border-width: 2px;
	border-color: black;
	}
p	{font-size: '+fontSize+'}
a	{font-size: '+fontSize+';text-decoration: none}
td	{font-size: '+fontSize+'}
li	{font-size: '+fontSize+';}
th	{font-size: '+fontSize+'}
h1	{font-size: '+number(fontSize*2)+';margin:0px;padding:0px;}
h2	{font-size: '+number(fontSize*1.8)+';margin:0px;padding:0px;}
h3	{font-size: '+number(fontSize*1.5)+';margin:0px;padding:0px;}
h4	{font-size: '+number(fontSize*1.3)+';margin:0px;padding:0px;}
h5	{font-size: '+number(fontSize*1.2)+';margin:0px;padding:0px;}
h6	{font-size: '+fontSize+';margin:0px;padding:0px;}

.float	{
	float: right
	}

.background	{
	background-color: black;
	opacity: 0.7;
	width: 100%;
	height: 100%;
	}

img	{
    width:100%;
    max-width:600px;
	}

</style>
']
</head>
<body>
	[h:class=if(size>4000,'footerBIG','footer')]
	<div class="background">
	</div>
	<div class="[r:class]">
		<div class="float">[r:macroLink("X","overlay/closeOverlay@this","","Shared")]</div>
		[r,if(customName=="" && CapitalName==""):"";"<h1>"+if(identified==0,if(customName=="" || customName==0,CapitalName,customName),if(customName=="" || customName==0,CapitalName,customName+" ("+CapitalName+if(identified==0," - Unidentified","")+")</font>"))+"</h1>"]
		[h,if(identified==0):description="*Unidentified item*";""]

		[macro("campaign/Markdown@this"):"tokenName="+tokenName+";description="+description+";source="+source+";name="+name+";group="+group]
	</div>
</body>
</html>
}]




