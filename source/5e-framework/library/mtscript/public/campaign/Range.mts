[h:idList=getSelected()]
[h:id=listget(idList,0)]
[h,if(id==""):abort(0)]
[h:switchToken(id)]

[h:res=input("range|off,5 square,10 square,5,10,15,20,25,30,40,60,80,100,120,150|Range|list|value=string",
"maxRange|off,15,20,30,60,100,120,160,320,400,600|Max Range|list|value=string")]
[h:abort(res)]

[h:clearLights()]

[h,if(range=="off"),code:{

	[h,if(maxRange=="off"):"";setLight("Max Range", maxRange, 1)]

};{

	[h:setLight("Max Range", maxRange, 1)]

}]



[h,if(maxRange=="off"),code:{

	[h,if(range=="off"):"";setLight("Range", range, 1)]

};{

	[h:setLight("Range", range, 1)]

}]
