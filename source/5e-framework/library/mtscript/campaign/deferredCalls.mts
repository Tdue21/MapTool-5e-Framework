[h:goto(0,0)]

[h:setZoom(1)]

[h:start=getLibProperty("Start", function.getNamespace())]
[h:setCurrentMap(start)]

[h:broadcast("deferredCalls done")]