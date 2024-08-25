[h:group=getStrProp(macro.args,"prop")]
[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:name=getStrProp(macro.args,"name")]





[h:res=input("var|Delete "+name+" from the Library?||label|span=true")]
[h:abort(res)]



[h:currentProp=getLibProperty(group,"Lib:Compendium")]
[h:newProp=json.remove(currentProp,name)]
[h:setLibProperty(group,newProp,"Lib:Compendium")]


[h,if(isDialogVisible("Manage Additional Feats")==1),code:{
[macro("Manage Additional Feats@Lib:Character"):""]
};{}]
[h,if(isDialogVisible("Manage Feats")==1),code:{
[macro("Manage Feats@Lib:Character"):""]
};{}]
[h,if(isDialogVisible("Manage Equipment")==1),code:{
[macro("Manage Equipment@Lib:Character"):""]
};{}]
[h,if(isDialogVisible("Manage Spells")==1),code:{
[macro("Manage Spells@Lib:Character"):""]
};{}]