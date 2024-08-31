[h:lib=getStrProp(macro.args,"lib")]
[h:value=getStrProp(macro.args,"value")]

[h:json1=getLibProperty(value,lib)]

[h:path=getLibProperty("Path", function.getNamespace())]

[h:res=input("var|Path must exist||label|span=true",
	"path|"+path+"|File Path",
	"name|"+value+"|File Name")]
[h:abort(res)]

[h:setLibProperty("Path", path, function.getNamespace())]

[h:exportData(path+"/"+name+".json",json1,0)]