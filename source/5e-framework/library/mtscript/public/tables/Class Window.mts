[h:classesObj=getLibProperty("Classes", function.getNamespace())]
[h:classlist=json.fields(classesObj)]

[h,if(macro.args==""),code:{
	[h:res=input("class|"+classlist+"|Class|list|value=string")]
	[h:abort(res)]
};{
	[h:class=getStrProp(macro.args,"class")]
	[h:subclass=getStrProp(macro.args,"subclass")]
}]

[dialog("Class", "width=750; height=600; temporary=1; noframe=0; input=1"):{
	<link rel="stylesheet" type="text/css" href="[r:function.getCss('D&D.css')]">
	[macro("tables/Class Features@this"):"class="+class+";subclass="+subclass]
}]