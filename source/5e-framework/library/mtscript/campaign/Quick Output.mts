[h:gmOutput=getLibProperty("GM Output", function.getNamespace())]

[h:setLibProperty("GM Output", if(gmOutput=="All", function.getNamespace()),"Lib:Character")]

[h,macro("overlay/OverlayMiniMenu@this"):""]