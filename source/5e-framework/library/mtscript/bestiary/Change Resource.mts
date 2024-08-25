[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:name=getStrProp(macro.args,"name")]
[h:originalName=name]

[h:id=findToken(tokenName)]
[h:switchToken(id)]

[h:resourcesObj=getProperty("Resources")]

[h,if(json.type(resourcesObj)=="UNKNOWN"):resourcesObj="{}";""]

[h,if(name=="NEW RESOURCE"),code:{

	[h:currentObj=""]
	[h:name=""]
	[h:value=""]
	[h:total=""]

};{


	[h:currentObj=json.get(resourcesObj,name)]
	[h:value=json.get(currentObj,"value")]
	[h:total=json.get(currentObj,"total")]


}]


[h:res=input("name|"+name+"|Name","value|"+value+"|Value","total|"+total+"|Total","delete|0|Remove Resource|Check")]
[h:abort(res)]

[h,if(isNumber(value)==1):"";value=eval(value)]
[h,if(isNumber(total)==1):"";total=eval(total)]

[h:objectValue=json.fromStrProp("value="+value+";total="+total)]

[h:resourcesObj=json.set(resourcesObj,name,objectValue)]

[h,if(name==originalName):"";resourcesObj=json.remove(resourcesObj,originalName)]

[h,if(delete==1):resourcesObj=json.remove(resourcesObj,name);""]

[h:setProperty("Resources",resourcesObj)]

[macro("Macro Frame@Lib:Bestiary"):tokenName]