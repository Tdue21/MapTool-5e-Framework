[h:tokenName=macro.args]
[h:id=findToken(tokenName)]
[h:switchToken(id)]


<!-----------------Race------------------->
[h:res=input("var|Black,Blue,Brass,Bronze,Copper,Gold,Green,Red,Silver,White|Ancestry|list|value=string")]
[h:abort(res)]
[h:setProperty("Race","value=Dragonborn;text="+var)]


<!-----------------Strength------------------->
[h:atr=getProperty("Strength")]
[h:value=getStrProp(atr,"value")]

[h:value=if(value=="",0,value)]

[h:atr=setStrProp(atr,"value",string(value+"+2"))]
[h:atr=setStrProp(atr,"text","+2 racial")]

[h:setProperty("Strength",atr)]

<!-----------------Charisma------------------->
[h:atr=getProperty("Charisma")]
[h:value=getStrProp(atr,"value")]

[h:value=if(value=="",0,value)]

[h:atr=setStrProp(atr,"value",string(value+"+1"))]
[h:atr=setStrProp(atr,"text","+1 racial")]

[h:setProperty("Charisma",atr)]



<!-----------------Speed------------------->
[h:atr=getProperty("Speed")]
[h:value=getStrProp(atr,"value")]

[h:atr=setStrProp(atr,"value","30 ft.")]

[h:setProperty("Speed",atr)]

<!-----------------Size------------------->
[h:setSize("Medium")]
<!-----------------Sight------------------->
[h:setSightType("Normal")]

<!-----------------Languages------------------->
[h:atr=getProperty("Language Proficiency")]
[h:value=getStrProp(atr,"value")]

[h:languages=getLibProperty("Languages", function.getNamespace())]

[h:language1="Common"]
[h:language2="Draconic"]
[h:languages=listdelete(languages,listfind(languages,language1))]
[h:languages=listdelete(languages,listfind(languages,language2))]

[h,count(listcount(value),""),code:{
	[h:item=listget(value,roll.count)]
	[h:itemFind=listfind(languages,item)]
	[h,if(itemFind==-1):"";languages=listdelete(languages,listfind(languages,item))]
}]

[h,if(listfind(value,language1)==-1):value=listappend(value,language1)]
[h,if(listfind(value,language2)==-1):value=listappend(value,language2)]

[h:atr=setStrProp(atr,"value",value)]

[h:setProperty("Language Proficiency",atr)]


<!-----------------Resources------------------->
[h:resourcesObj=getProperty("Resources")]
[h,if(json.type(resourcesObj)=="UNKNOWN"):resourcesObj="{}";""]

[h:resourcesObj=json.set(resourcesObj,"breath weapon",json.fromStrProp("value=0;total=1;reset=0"))]

[h:setProperty("Resources",resourcesObj)]




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

[h:macro.return=""]