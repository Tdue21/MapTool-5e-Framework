[h:res=input('var|Are you sure you want to delete "'+macro.args+'" from the Bestiary?||label|span=true')]
[h:abort(res)]

[h:BestiaryObj=getLibProperty("Bestiary",function.getNamespace())]

[h:BestiaryObj=json.remove(BestiaryObj,macro.args)]

[h:setLibProperty("Bestiary",BestiaryObj,function.getNamespace())]

[macro("bestiary/Manage@this"):""]