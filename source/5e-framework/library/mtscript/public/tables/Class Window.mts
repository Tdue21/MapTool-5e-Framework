[h:classesObj=getLibProperty("Classes","Lib:Character Creation")]
[h:classlist=json.fields(classesObj)]

[h,if(macro.args==""),code:{


	
	[h:res=input("class|"+classlist+"|Class|list|value=string")]
	[h:abort(res)]
};{

	[h:class=getStrProp(macro.args,"class")]
	[h:subclass=getStrProp(macro.args,"subclass")]

}]


[dialog("Class", "width=750; height=600; temporary=1; noframe=0; input=1"):{

<link rel="stylesheet" type="text/css" href="D&D@Lib:Campaign">



[macro("Class Features@Lib:Tables"):"class="+class+";subclass="+subclass]


}]