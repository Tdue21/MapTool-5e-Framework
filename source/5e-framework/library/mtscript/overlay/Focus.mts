[h:id=getStrProp(macro.args,"id")]

[h:id=findToken(id)]

[h,if(id==""):abort(0);""]

[h:selectTokens(id)]
[h:goto(id)]

