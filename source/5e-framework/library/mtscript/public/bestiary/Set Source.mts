
[h:allProps=getPropertyNames()]

[h:res=input("sourceList|SRD|Sources (delimited by commas)",
"var|This action will replace all sources for the custom ones. Proceed?||label|span=true")]
[h:abort(res)]

[h:usedProps=allProps]
[h:usedProps=listdelete(usedProps,listfind(usedProps,"libversion"))]

[h,count(listcount(allProps),"<br>"),code:{

	<b>[r:currentProp=listget(allProps,roll.count)]</b>:
	[r:empty=isPropertyEmpty(currentProp)]
	[h,if(empty==1):usedProps=listdelete(usedProps,listfind(usedProps,currentProp))]


}]
[h:usedProps=listDelete(usedProps,listFind(usedProps,"List"))]

[h,count(listcount(usedProps)),code:{

	[h:currentProp=listget(usedProps,roll.count)]

	[h:currentObj=getProperty(currentProp)]
	[h,if(json.type(currentObj)=="UNKNOWN"):sources="";sources=json.toList(json.get(currentObj,"sources"))]

	[h:currentObj=json.set(currentObj,"sources",json.fromList(sourceList))]
	[h:setProperty(currentProp,currentObj)]

}]