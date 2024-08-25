
[h:area=getViewArea(1)]

[h:startX=getStrProp(area,"startX","0",",")]
[h:startY=getStrProp(area,"startY","0",",")]
[h:endX=getStrProp(area,"endX","0",",")]
[h:endY=getStrProp(area,"endY","0",",")]


[h:setViewArea(startX,startY,endX,endY,1,isGM())]

[h:setMapVisible(1)]