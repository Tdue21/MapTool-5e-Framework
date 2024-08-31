[h:object=getStrProp(macro.args,"json")]
[h:name=getStrProp(macro.args,"name")]
[h:tokenName=getStrProp(macro.args,"tokenName")]

[h:id=findToken(tokenName)]
[h:switchToken(id)]

[h:atributes="str,dex,con,int,wis,cha"]

[h:str=json.get(object,"str")]
[h:dex=json.get(object,"dex")]
[h:con=json.get(object,"con")]
[h:int=json.get(object,"int")]
[h:wis=json.get(object,"wis")]
[h:cha=json.get(object,"cha")]

[h:res=input("str|"+str+"|STR",
"dex|"+dex+"|DEX",
"con|"+con+"|CON",
"int|"+int+"|INT",
"wis|"+wis+"|WIS",
"cha|"+cha+"|CHA")]
[h:abort(res)]

[h:object=json.set(object,"str",str)]
[h:object=json.set(object,"dex",dex)]
[h:object=json.set(object,"con",con)]
[h:object=json.set(object,"int",int)]
[h:object=json.set(object,"wis",wis)]
[h:object=json.set(object,"cha",cha)]

[h,if(name==""),code:{

	[h:setProperty("Stats",object)]

};{

	[h:BestiaryObj=getLibProperty("Bestiary",function.getNamespace())]
	[h:BestiaryObj=json.set(BestiaryObj,name,object)]
	[h:setLibProperty("Bestiary",BestiaryObj,function.getNamespace())]

}]

[macro("bestiary/Macro Frame@this"):tokenName]