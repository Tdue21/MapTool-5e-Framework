[h:creature=getStrProp(macro.args,"creature")]
[h:prop=getStrProp(macro.args,"prop")]

[h:res=input("creature|"+creature+"|Name",
"prop|"+decode(prop)+"|Stats")]
[h:abort(res)]

[h:name=creature]
[h:creature=lower(creature)]

[h:BestiaryObj=getLibProperty("Bestiary","Lib:Compendium")]

[h:creatureObj=json.get(BestiaryObj,creature)]

[h:type=json.type(creatureObj)]


[h,if(type=="OBJECT"),code:{

	[h:res=input("var|"+creature+" already exists.||label|span=true",
	"replace|Replace with new creature,Keep original unchanged|Replace?|radio|span=true")]
	[h:abort(res)]

	[h:prop=if(replace==1,creatureObj,prop)]
};{}]

[h,if(json.type(prop)=="UNKNOWN"):prop='{"name":"'+name+'"}']

[h:BestiaryObj=json.set(BestiaryObj,creature,prop)]

[h:setLibProperty("Bestiary",BestiaryObj,"Lib:Compendium")]


[h:macro.return="creature="+creature+";prop="+prop]


[h,if(isDialogVisible("Manage Bestiary")==1),code:{
[macro("Manage@Lib:Bestiary"):""]
};{}]