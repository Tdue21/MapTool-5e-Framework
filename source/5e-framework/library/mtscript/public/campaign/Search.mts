[h:output=decode(getStrProp(macro.args,"output"))]
[h:results=getStrProp(macro.args,"results")]
[h:results=if(isNumber(results)==1,results,0)]

[h:headers=0]
[h,count(listcount(output,";")),code:{
	[h:currentKey=indexValueStrProp(output,roll.count)]
	[h,if(currentKey!=""):headers=headers+1]
}]

[h:height=93+results*18+headers*45]
[h:height=if(height>500,500,height)]

[dialog5("Search", "width=450; height="+height+"; temporary=1; input=1; noframe=0"):{
	<link rel="stylesheet" type="text/css" href="lib://[r:function.getNamespace()]/css/GitHub.css">
	<body>
	[macro("campaign/Search Results@this"):macro.args+";window=Search"]
}]