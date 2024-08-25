[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:macro=getStrProp(macro.args,"macro")]

[h:list="Statblock,Character Sheet,Description Sheet,Spellcasting Sheet"]


[h:res=input("item|"+list+"|Page|radio|value=string select="+listfind(list,macro))]
[h:abort(res)]


[macro("Macro Frame@Lib:Character"):"macro="+item+";tokenName="+tokenName]