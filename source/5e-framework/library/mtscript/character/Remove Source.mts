[h:id=findToken(function.getNamespace())]
[h:switchToken(id)]

[h:obj=getLibProperty("Equipment", function.getNamespace())]

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
	[h,if(remove==0):"";setLibProperty("Equipment", obj, function.getNamespace())]

}]

[h:obj=getLibProperty("Feats", function.getNamespace())]

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
	[h,if(remove==0):"";setLibProperty("Feats", obj, function.getNamespace())]

}]

[h:obj=getLibProperty("AdditionalFeats", function.getNamespace())]

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
	[h,if(remove==0):"";setLibProperty("AdditionalFeats", obj, function.getNamespace())]

}]

[h:obj=getLibProperty("Spells", function.getNamespace())]

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
	[h,if(remove==0):"";setLibProperty("Spells", obj, function.getNamespace())]

}]

[h,if(isDialogVisible("Settings")==1),code:{
[macro("campaign/Campaign Settings@this"):""]
};{}]