[h:group=getStrProp(macro.args,"prop")]
[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:name=getStrProp(macro.args,"name")]





[h:res=input("var|Delete "+name+" from the Library?||label|span=true")]
[h:abort(res)]



[h:currentProp=getLibProperty(group,"Lib:Compendium")]
[h:newProp=json.remove(currentProp,name)]
[h:setLibProperty(group,newProp,"Lib:Compendium")]


[h,if(isDialogVisible("Manage Additional Feats")==1),code:{
[macro("character/Manage Additional Feats@this"):""]
};{}]
[h,if(isDialogVisible("Manage Feats")==1),code:{
[macro("character/Manage Feats@this"):""]
};{}]
[h,if(isDialogVisible("Manage Equipment")==1),code:{
[macro("character/Manage Equipment@this"):""]
};{}]
[h,if(isDialogVisible("Manage Spells")==1),code:{
[macro("character/Manage Spells@this"):""]
};{}]