[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:subclass=getStrProp(macro.args,"subclass")]
[h:class=getStrProp(macro.args,"class")]

[h:id=findToken(tokenName)]
[h:switchToken(id)]

[h:classes=getLibProperty("Classes", function.getNamespace())]

[h:AllClassObj=json.get(classes,class)]


[h:level=""]

[h:ClassObj=getProperty("Class&Level")]
[h,if(json.type(ClassObj)=="UNKNOWN" || json.fields(ClassObj)==""),code:{};{

	[h:classList=json.fields(ClassObj)]
	[h:match=listFind(classList,class)]
	[h:currentClassObj=json.get(ClassObj,class)]
	[h,if(json.type(currentClassObj)=="UNKNOWN"):level=0;level=json.get(currentClassObj,"level")]
	[h,if(json.type(currentClassObj)=="UNKNOWN"):subclass=0;subclass=json.get(currentClassObj,"subclass")]

}]
<!-----------------LEVEL 1------------------->
[r,if(level==1),code:{


};{}]

<!-----------------LEVEL 6------------------->
[r,if(level==6),code:{



};{}]


<!-----------------LEVEL 14------------------->
[r,if(level==14),code:{



};{}]



<!-----------------LEVEL 18------------------->
[r,if(level==18),code:{



};{}]



<!-----------------FIX CASE----------------------->
[h:props="Feats,AdditionalFeats,Equipment,Spells"]

[h,count(listcount(props)),code:{

	[h:prop=listget(props,roll.count)]

	[h:jsonProp=getProperty(prop)]
	
	[h:fields=json.fields(jsonProp)]
	
	[h,count(listcount(fields)),code:{
	
		[h:objName=listget(fields,roll.count)]
		[h:currentObj=json.get(jsonProp,objName)]
		[r:checkCase=matches(objName,".*[A-Z]+.*")]
		[h,if(checkCase==1):jsonProp=json.set(jsonProp,lower(objName),currentObj)]
		[h,if(checkCase==1):jsonProp=json.remove(jsonProp,objName)]
	}]
	
	[h:setProperty(prop,jsonProp)]

}]

