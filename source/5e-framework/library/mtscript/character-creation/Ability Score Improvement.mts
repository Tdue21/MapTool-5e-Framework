[h:tokenName=getStrProp(macro.args,"tokenName")]

[h:id=findToken(tokenName)]
[h:switchToken(id)]

<!-----------------Attributes------------------->
[h:attributeList=getLibProperty("Attributes", function.getNamespace())]


[h:res=input("var|Choose two (you can choose the same)||label|span=true",
"atr1|"+attributeList+"|+1|list|value=string",
"atr2|"+attributeList+"|+1|list|value=string",
"var|or choose a feat||label|span=true",
"feat|0|Feat|check")]
[h:abort(res)]





[h:atr=getProperty(atr1)]
[h:value=getStrProp(atr,"value")]
[h:text=getStrProp(atr,"text")]
[h:value=if(value=="",0,value)]
[h:atr=setStrProp(atr,"value",string(value+if(atr1==atr2,"+2","+1")))]
[h:atr=setStrProp(atr,"text",text+if(atr1==atr2,"+2","+1")+" improvement")]
[h,if(feat==0):setProperty(atr1,atr);""]

[h,if(atr1!=atr2),code:{

	[h:atr=getProperty(atr2)]
	[h:value=getStrProp(atr,"value")]
	[h:text=getStrProp(atr,"text")]
	[h:value=if(value=="",0,value)]
	[h:atr=setStrProp(atr,"value",string(value+"+1"))]
	[h:atr=setStrProp(atr,text+"text","+1"+" improvement")]
	[h,if(feat==0):setProperty(atr2,atr);""]

};{}]



	<!-----------------Feat------------------->
[h:featList=getLibProperty("Feats", function.getNamespace())]

[h:group="Feats"]
[h:inputList=getLibProperty(group,"Lib:Character")]
[h:inputList=json.fields(inputList)]
[h:inputList=listSort(inputList,"N")]
[h:Property=getProperty(group)]

[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]

[h,count(listcount(currentList)),code:{
	[h:currentItem=listget(currentList,roll.count)]
	[h:delete=listfind(inputList,currentItem)]
	[h:inputList=listdelete(inputList,delete)]
}]
[h:item=""]
[h,if(feat==1):res=input("item|Add New,"+featList+"|"+group+"|list|value=string");""]
[h,if(feat==1):abort(res);""]

[h,if(item=="Add New"),code:{
[macro("character/Change Form@this"):"prop="+group+";index=new;name=new;description=new;tokenName="+tokenName]
};{
	[h:Property=json.set(Property,item,"Feat")]
	[h,if(feat==1):setProperty(group,Property)]
}]
