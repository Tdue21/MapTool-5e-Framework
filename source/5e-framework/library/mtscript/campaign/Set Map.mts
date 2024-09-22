[h:area   = getViewArea(1, "json")]
[h:startX = if(json.contains(area, "startX") == 1, json.get(area,"startX"), 0)]
[h:startY = if(json.contains(area, "startY") == 1, json.get(area,"startY"), 0)]
[h:endX   = if(json.contains(area, "endX"  ) == 1, json.get(area,"endX"  ), 0)]
[h:endY   = if(json.contains(area, "endY"  ) == 1, json.get(area,"endY"  ), 0)]

[h:setViewArea(startX, startY, endX, endY, 1, isGM())]
[h:setMapVisible(1)]