[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:name=getStrProp(macro.args,"name")]
[h:originalName=name]

[h:id=findToken(tokenName)]
[h,if(id==""):"";switchToken(id)]

[h:resourcesObj=getLibProperty("Resources","Lib:"+tokenName)]

[h,if(json.type(resourcesObj)=="UNKNOWN"):resourcesObj="{}";""]

[h,if(name=="NEW RESOURCE"),code:{

	[h:currentObj=""]
	[h:name=""]
	[h:value=""]
	[h:total=""]
	[h:reset=2]

};{


	[h:currentObj=json.get(resourcesObj,name)]
	[h:value=json.get(currentObj,"value")]
	[h:total=json.get(currentObj,"total")]
	[h:reset=json.get(currentObj,"reset")]

}]

[h:name=function.Capitalize(name)]
[h:res=input("name|"+name+"|Name","value|"+value+"|Value","total|"+total+"|Total","reset|Short Rest,Long Rest,Other|Reset at|list|select="+reset,"delete|0|Remove Resource|Check")]
[h:abort(res)]
[h:name=lower(name)]

[h,if(isNumber(value)==1):"";value=eval(value)]
[h,if(isNumber(total)==1):"";total=eval(total)]

[h:objectValue=json.fromStrProp("value="+value+";total="+total+";reset="+reset)]

[h:resourcesObj=json.set(resourcesObj,name,objectValue)]

[h,if(name==originalName):"";resourcesObj=json.remove(resourcesObj,originalName)]

[h,if(delete==1):resourcesObj=json.remove(resourcesObj,name);""]

[h:setLibProperty("Resources",resourcesObj,"Lib:"+tokenName)]

[h,if(isFrameVisible(tokenName+" - Character Sheet")==1),code:{
[macro("character/Macro Frame@this"):"macro=Character Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Statblock")==1),code:{
[macro("character/Macro Frame@this"):"macro=Statblock;tokenName="+tokenName]
};{}]