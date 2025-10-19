[h:gmOutput=getLibProperty("GM Output", function.getNamespace())]

[h:setLibProperty("GM Output", if(gmOutput=="All", function.getNamespace()),function.getNamespace())]

[h,macro("overlay/OverlayMiniMenu@this"):""]