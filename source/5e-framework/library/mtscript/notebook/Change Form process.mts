[h:delete=json.get(macro.args,"delete")]
[h:cancel=json.get(macro.args,"cancel")]
[h:cancel=if(cancel=="cancel",0,1)]
[h:abort(cancel)]

[h:name=json.get(macro.args,"title")]
[h:description=json.get(macro.args,"value")]
[h:featName=json.get(macro.args,"name")]
[h:tokenName=json.get(macro.args,"tokenName")]
[h:description=replace(description,"\\s*\$","")]
[h:LibName=replace(tokenName,"^Lib:","")]

[h:object=getLibProperty("Value",tokenName)]
[h,if(json.type(object)=="UNKNOWN"):object="{}";""]

[h:object=json.remove(object,featName)]
[h,if(delete=="delete"),code:{
	[h:closeFrame(LibName)]
};{
	[h:name=if(name=="","New Note",name)]
	[h:object=json.set(object,name,description)]
}]

[h:setLibProperty("Value",object,tokenName)]
[h,if(isFrameVisible("Compendium")==1),code:{
	[macro("notebook/Index@this"):tokenName]
};{}]

[h,if(isFrameVisible(LibName)==1),code:{
[macro("notebook/Content@this"):"key="+name+";description="+encode(description)+";tokenName="+tokenName]
};{}]