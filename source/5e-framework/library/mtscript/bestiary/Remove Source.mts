[h:id=findToken("Lib:Character")]
[h:switchToken(id)]

[h:obj=getLibProperty("Bestiary", function.getNamespace())]

[h:fields=json.fields(obj)]

[h,count(listcount(fields)),code:{
	[h:objName=listget(fields,roll.count)]
	[h:currentObj=json.get(obj,objName)]
	[h:sources=json.toList(json.get(currentObj,"sources"))]

	[h:remove=1]
	[h,count(listcount(sources)),code:{
	
		[h:currentSource=listget(sources,roll.count)]
		[h:find=listfind(macro.args,currentSource)]
		

		[h:remove=if(find<0,0,if(remove==0,0,1))]

	
	}]

	[h,if(sources==""):remove=if(listfind(macro.args,"NULL")==-1,0,1)]

	[h,if(remove==0):"";obj=json.remove(obj,objName)]
	[h,if(remove==0):"";setLibProperty("Bestiary", obj, function.getNamespace())]

}]

