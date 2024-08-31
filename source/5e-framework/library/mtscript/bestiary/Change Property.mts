[h:object=getStrProp(macro.args,"json")]
[h:key=getStrProp(macro.args,"key")]
[h:name=getStrProp(macro.args,"name")]
[h:tokenName=getStrProp(macro.args,"tokenName")]

[h:id=findToken(tokenName)]
[h:switchToken(id)]

[h:value=json.get(object,key)]

[h:value=replace(value,"SEMICOLONPLACEHOLDER",";")]

[h:res=input("value|"+value+"|"+key)]
[h:abort(res)]

[h:value=replace(value,";","SEMICOLONPLACEHOLDER")]

[h:object=json.set(object,key,value)]

[h,if(name==""),code:{

	[h:setProperty("Stats",object)]

};{

	[h:BestiaryObj=getLibProperty("Bestiary",function.getNamespace())]
	[h:BestiaryObj=json.set(BestiaryObj,name,object)]
	[h:setLibProperty("Bestiary",BestiaryObj,function.getNamespace())]

}]

[macro("bestiary/Macro Frame@this"):tokenName]