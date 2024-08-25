[h:object=getStrProp(macro.args,"json")]
[h:key=getStrProp(macro.args,"key")]
[h:name=getStrProp(macro.args,"name")]
[h:tokenName=getStrProp(macro.args,"tokenName")]

[h:attributeList=getLibProperty("Attributes","Lib:Character")]
[h:skillList=getLibProperty("Skills","Lib:Character")]

[h:skill=""]
[h,count(countStrProp(skillList)),code:{
	[h:currentSkill=indexKeyStrProp(skillList,roll.count)]
	[h:skill=listAppend(skill,currentSkill)]
}]

[h:res=input("test|-,"+if(key=="save",attributeList,skill)+"|"+upper(key,1)+"|radio|value=string span=true")]
[h:abort(res)]
[h,if(test=="-"):abort(0)]

[h,if(key=="save"),code:{

	[h:atr=lower(substring(test,0,3))]
	
	[h:save=json.get(object,"save")]
	[h:save=replace(save,"\\s*[+-]\\s*","=")]
	[h:save=getStrProp(save,atr,"",",")]
	
	[h:atrValue=json.get(object,atr)]
	
	[h,if(isNumber(atrValue)==0):atrValue=eval(atrValue);""]
	[h:mod=floor(number(eval(string(atrValue)))/2-5)]
	[h,if(save==""):mod=mod;mod=save]

	[h:text=upper(atr,1)]
	[h:color="ff9900"]

};{

	[h:skill=json.get(object,"skill")]
	[h:skill=replace(skill,"\\s*[+-]\\s*","=")]
	[h:skill=getStrProp(skill,test,"",",")]

	[h:atr=getStrProp(skillList,test)]
	[h:atr=lower(substring(atr,0,3))]

	[h:atrValue=json.get(object,atr)]
	
	[h,if(isNumber(atrValue)==0):atrValue=eval(atrValue);""]
	[h:mod=floor(number(eval(string(atrValue)))/2-5)]
	[h,if(skill==""):mod=mod;mod=skill]

	[h:text=test]
	[h:color="0099cc"]

}]



[macro("d20 Roller@Lib:Bestiary"):";text="+text+";value=+"+if(mod<0,mod,"+"+mod)+";tokenName="+tokenName+";color="+color]

