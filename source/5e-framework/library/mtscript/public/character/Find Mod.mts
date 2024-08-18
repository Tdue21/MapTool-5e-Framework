[h:diceRoll=getStrProp(macro.args,"currentMod")]
[h:tokenName=getStrProp(macro.args,"tokenName")]


[h:id=findToken(tokenName)]
[h,if(id==""):"";switchToken(id)]


[h:classes=getLibProperty("Class&Level","Lib:"+tokenName)]

[h:classprops=""]
[h,if(json.type(classes)=="UNKNOWN"),code:{
	[h:classList=setLibProperty("Class&Level","{}","Lib:"+tokenName)]
	[h:repeat=0]
};{
	[h:classList=json.fields(classes)]	
	[h:repeat=listcount(classList)]
}]
[h,count(repeat,""),code:{
	[h:name=listget(classList,roll.count)]
	[h:object=json.get(classes,name)]
	[h:level=json.get(object,"level")]
	[h:classprops=setStrProp(classprops,name,level)]
}]





[h:attributeList=getLibProperty("Attributes","Lib:"+tokenName)]
[h:atrList=""]

[h,count(listCount(attributeList)),code:{

	[h:atr=listget(attributeList,roll.count)]
	[h:atrList=listappend(atrList,substring(lower(atr),0,3))]

}]



[h:formula=""]
[h:id=strfind(diceRoll,"([-+]?)(?:(\\d+)d(\\d+)|([0-9A-Za-z|]+))")]
[r,count(getFindCount(id),""),code:{
	[h:group1=getGroup(id,roll.count+1,1)]
	[h:group2=getGroup(id,roll.count+1,2)]
	[h:group3=getGroup(id,roll.count+1,3)]
	[h:group4=getGroup(id,roll.count+1,4)]


	[h:firstRoll=roll.count]

	[h,if(isNumber(group4)==1),code:{
		
		[h:lvl=0]
		[h:group1+group4]
		[h:formula=add(formula,number(group1+group4))]
	
	};{
		[h:lvl=getStrProp(classprops,group4)]	
	}]

	[h:formula=add(formula,lvl)]

	[h,if(lvl==""):lvl=0;""]
	[h:if(lvl<0,"",if(lvl==0,"",if(firstRoll==0,"","+")))+if(lvl==0,"",lvl)]


	[h:countMax=listcount(group4,"|")]
	[h:countMax=if(countMax==0,1,countMax)]
	[h,count(countMax):index=listfind(atrList,listget(group4,roll.count,"|"))]
	[h:maxValue=""]
	[h,count(countMax):maxValue=listappend(maxValue,getStrProp(getLibProperty(listget(attributeList,listfind(atrList,listget(group4,roll.count,"|"))),"Lib:"+tokenName),"value"))]
	[h:atrValue=listget(listsort(maxValue,"N-"),0)]
	[h,if(atrValue==""):"";atrValue=eval(string(atrValue))]
	[h,if(index==-1):mod=0;mod=floor(number(atrValue)/2)-5]


	[h:formula=add(formula,number(group1+mod))]

}]

[r:formula]