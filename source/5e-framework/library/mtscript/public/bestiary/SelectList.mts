[h:deselectTokens()]
[h,count(listcount(macro.args)):selectTokens(listget(macro.args,roll.count),1)]
[h,if(listcount(macro.args)==0):abort(0)]
[h:goto(listget(macro.args,0))]

