[h:tokenName=macro.args]
[h:id=findToken(tokenName)]
[h:switchToken(id)]


<!-----------------Race------------------->
[h:setProperty("Race","value=Hill Dwarf;text=")]

<!-----------------Constitution------------------->
[h:atr=getProperty("Constitution")]
[h:value=getStrProp(atr,"value")]

[h:value=if(value=="",0,value)]

[h:atr=setStrProp(atr,"value",string(value+"+2"))]
[h:atr=setStrProp(atr,"text","+2 racial")]

[h:setProperty("Constitution",atr)]

<!-----------------Wisdom------------------->
[h:atr=getProperty("Wisdom")]
[h:value=getStrProp(atr,"value")]

[h:value=if(value=="",0,value)]

[h:atr=setStrProp(atr,"value",string(value+"+1"))]
[h:atr=setStrProp(atr,"text","+1 racial")]

[h:setProperty("Wisdom",atr)]


<!-----------------Speed------------------->
[h:atr=getProperty("Speed")]
[h:value=getStrProp(atr,"value")]

[h:atr=setStrProp(atr,"value","25 ft.")]

[h:setProperty("Speed",atr)]

<!-----------------Size------------------->
[h:setSize("Medium")]
<!-----------------Sight------------------->
[h:setSightType("Darkvision")]

<!-----------------Languages------------------->
[h:atr=getProperty("Language Proficiency")]
[h:value=getStrProp(atr,"value")]

[h:languages=getLibProperty("Languages","Lib:Character Creation")]

[h:language1="Common"]
[h:language2="Dwarvish"]
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

<!-----------------Weapons------------------->
[h:atr=getProperty("Weapon Proficiency")]
[h:value=getStrProp(atr,"value")]

[h:Weapons="battleaxe,handaxe,light hammer,warhammer"]

[h,count(listcount(Weapons),""),code:{
	[h:CurrentItem=listget(Weapons,roll.count)]
	[h,if(listfind(value,CurrentItem)==-1):value=listappend(value,CurrentItem)]
}]

[h:atr=setStrProp(atr,"value",value)]
[h:setProperty("Weapon Proficiency",atr)]


<!-----------------Tools------------------->
[h:atr=getProperty("Tool Proficiency")]
[h:value=getStrProp(atr,"value")]

[h:toolList="smith's tools, brewer's supplies, mason's tools"]


[h,count(listcount(value),""),code:{
	[h:item=listget(value,roll.count)]
	[h:itemFind=listfind(toolList,item)]
	[h,if(itemFind==-1):"";toolList=listdelete(toolList,listfind(toolList,item))]
}]

[h:res=input("lang|Tool Proficiency||label|span=true",
"tool|"+toolList+"|Tools|list|value=string")]
[h:abort(res)]

[h,if(listfind(value,tool)==-1):value=listappend(value,tool)]

[h:atr=setStrProp(atr,"value",value)]

[h:setProperty("Tool Proficiency",atr)]




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

