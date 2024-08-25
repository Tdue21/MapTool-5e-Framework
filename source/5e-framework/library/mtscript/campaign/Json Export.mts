[h:lib=getStrProp(macro.args,"lib")]
[h:value=getStrProp(macro.args,"value")]

[h:json1=getLibProperty(value,lib)]

[h:path=getLibProperty("Path","Lib:Campaign")]

[h:res=input("var|Path must exist||label|span=true",
	"path|"+path+"|File Path",
	"name|"+value+"|File Name")]
[h:abort(res)]

[h:setLibProperty("Path",path,"Lib:Campaign")]

[h:exportData(path+"/"+name+".json",json1,0)]