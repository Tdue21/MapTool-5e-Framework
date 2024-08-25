[h:idList=getSelected()]
[h:id=listget(idList,0)]
[h,if(id==""):abort(0)]
[h:switchToken(id)]

[h:res=input("name|off,Candle - 5,Lamp - 15,Hooded Lantern - 30,Torch - 20,Everburning - 20,Sunrod - 30|Light Source|list|value=string")]
[h:abort(res)]


[h,if(name=="off"):clearLights();setLight("D20", name, 1)]