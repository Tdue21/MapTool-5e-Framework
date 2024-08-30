[h:id=findToken("Lib:Bestiary")]
[h:switchToken(id)]

[h:allProps=getPropertyNames()]

[h:usedProps=allProps]
[h:usedProps=listdelete(usedProps,listfind(usedProps,"libversion"))]

[h,count(listcount(allProps),"<br>"),code:{

	<b>[r:currentProp=listget(allProps,roll.count)]</b>:
	[r:empty=isPropertyEmpty(currentProp)]
	[h,if(empty==1):usedProps=listdelete(usedProps,listfind(usedProps,currentProp))]


}]

[h:usedProps=listsort(usedProps,"A")]
[h:usedProps=listDelete(usedProps,listFind(usedProps,"List"))]

[h:json1="{}"]
[r,count(listcount(usedProps),"<br><br>"),code:{

	[h:currentName=listget(usedProps,roll.count)]
	[h:currentJson=getLibProperty(currentName,"Lib:Bestiary")]
	[h:json1=json.set(json1,currentName,currentJson)]

}]

[h:path=getLibProperty("Path", function.getNamespace())]

[h:res=input("var|Path must exist||label|span=true",
	"path|"+path+"|File Path",
	"name|Bestiary|File Name")]
[h:abort(res)]

[h:setLibProperty("Path", path, function.getNamespace())]

[h:exportData(path+"/"+name+".json",json1,0)]