[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:name=getStrProp(macro.args,"name")]
[h,if(tokenName==""):tokenName=macro.args]
[h:id=findToken(tokenName)]
[h:switchToken(id)]

[h,if(name==""):name="Race Name"]

[h:res=input("name|"+name+"|Race Name",
"str|0|Strength Bonus",
"dex|0|Dexterity Bonus",
"con|0|Constitution Bonus",
"int|0|Intelligence Bonus",
"wis|0|Wisdom Bonus",
"cha|0|Charisma Bonus",
"size|Tiny,Small,Medium,Large,Huge|Size|List|value=String select=2",
"languages|Common|Languages",
"landSpd|30|Land speed",
"flySpd|0|Fly speed",
"swimSpd|0|Swim speed",
"climbSpd|0|Climb speed",
"burrowSpd|0|Burrow speed",
"sight|Normal,Darkvision,Superior Darkvision|Sight|List|value=string")]
[h:abort(res)]

<!-----------------Race------------------->
[h:setProperty("Race","value="+name)]



<!-----------------Strength------------------->
[h:atr=getProperty("Strength")]
[h:value=getStrProp(atr,"value")]

[h:value=if(value=="",0,value)]

[h:atr=setStrProp(atr,"value",string(value+"+"+str))]
[h:atr=setStrProp(atr,"text","+"+str+" racial")]

[h:setProperty("Strength",atr)]

<!-----------------Dexterity------------------->
[h:atr=getProperty("Dexterity")]
[h:value=getStrProp(atr,"value")]

[h:value=if(value=="",0,value)]

[h:atr=setStrProp(atr,"value",string(value+"+"+dex))]
[h:atr=setStrProp(atr,"text","+"+dex+" racial")]

[h:setProperty("Dexterity",atr)]

<!-----------------Constitution------------------->
[h:atr=getProperty("Constitution")]
[h:value=getStrProp(atr,"value")]

[h:value=if(value=="",0,value)]

[h:atr=setStrProp(atr,"value",string(value+"+"+con))]
[h:atr=setStrProp(atr,"text","+"+con+" racial")]

[h:setProperty("Constitution",atr)]

<!-----------------Intelligence------------------->
[h:atr=getProperty("Intelligence")]
[h:value=getStrProp(atr,"value")]

[h:value=if(value=="",0,value)]

[h:atr=setStrProp(atr,"value",string(value+"+"+int))]
[h:atr=setStrProp(atr,"text","+"+int+" racial")]

[h:setProperty("Intelligence",atr)]

<!-----------------Wisdom------------------->
[h:atr=getProperty("Wisdom")]
[h:value=getStrProp(atr,"value")]

[h:value=if(value=="",0,value)]

[h:atr=setStrProp(atr,"value",string(value+"+"+wis))]
[h:atr=setStrProp(atr,"text","+"+wis+" racial")]

[h:setProperty("Wisdom",atr)]

<!-----------------Charisma------------------->
[h:atr=getProperty("Charisma")]
[h:value=getStrProp(atr,"value")]

[h:value=if(value=="",0,value)]

[h:atr=setStrProp(atr,"value",string(value+"+"+cha))]
[h:atr=setStrProp(atr,"text","+"+cha+" racial")]

[h:setProperty("Charisma",atr)]

<!-----------------Speed------------------->
[h:atr=getProperty("Speed")]
[h:value=getStrProp(atr,"value")]

[h:atr=setStrProp(atr,"value",landSpd)]

[h:text=""]
[h,if(flySpd==0 || flySpd==""):"";text=listappend(text,"Fly "+flySpd)]
[h,if(swimSpd==0 || swimSpd==""):"";text=listappend(text,"Swim "+swimSpd)]
[h,if(climbSpd==0 || climbSpd==""):"";text=listappend(text,"Climb "+climbSpd)]
[h,if(burrowSpd==0 || burrowSpd==""):"";text=listappend(text,"Burrow "+burrowSpd)]
[h,if(listcount(text)==0):"";atr=setStrProp(atr,"text",text)]

[h:setProperty("Speed",atr)]

<!-----------------Size------------------->
[h:setSize(size)]
<!-----------------Sight------------------->
[h:setSightType(sight)]

<!-----------------Languages------------------->
[h:atr=getProperty("Language Proficiency")]
[h:value=getStrProp(atr,"value")]

[h:atr=setStrProp(atr,"value",languages)]

[h:setProperty("Language Proficiency",atr)]




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
[h:macro.return=name]
