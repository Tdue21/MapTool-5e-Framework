[h:toggle=getStrProp(macro.args,"toggle")]
[h:id=getStrProp(macro.args,"id")]
[h:macroGroups=getStrProp(macro.args,"macroGroups")]

[h,if(toggle==""):toggle=1]

[overlay("Selected Macros"):{

[h: link = macroLinkText("overlay/OverlaySelected@this", "none","toggle="+toggle+";macroGroups="+macroGroups)]
<link rel="onChangeSelection" type="macro" href="[r:link]">


[h,if(id==""):id=getSelected();""]

[r, macro("overlay/selectedToken@this"):"id="+id+";toggle="+toggle+";macroGroups="+macroGroups]

}]