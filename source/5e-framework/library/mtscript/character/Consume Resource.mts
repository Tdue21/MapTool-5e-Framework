[h:prop=getStrProp(macro.args,"prop")]
[h:name=getStrProp(macro.args,"name")]
[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:resource=getStrProp(macro.args,"resource")]

[h:output= function.getOutput())]
[h:resourcesObj=getLibProperty("Resources","Lib:"+tokenName)]

[h:currentResource=json.get(resourcesObj,resource)]
[h:currentValue=json.get(currentResource,"value")]

[h:currentResource=json.set(currentResource,"value",currentValue+1)]
[h:resourcesObj=json.set(resourcesObj,resource,currentResource)]
[h:setLibProperty("Resources",resourcesObj,"Lib:"+tokenName)]

[h:broadcast("<font style='text-decoration:none'>"+tokenName+" used <b>"+macroLink(function.Capitalize(name),"character/Args Dialog@this","","prop="+prop+";name="+name+";tokenName="+tokenName)+"</b>.",Output)]

[h,if(isFrameVisible(tokenName+" - Character Sheet")==1),code:{
[macro("character/Macro Frame@this"):"macro=Character Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Statblock")==1),code:{
[macro("character/Macro Frame@this"):"macro=Statblock;tokenName="+tokenName]
};{}]