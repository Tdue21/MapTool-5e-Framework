[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:name=getStrProp(macro.args,"name")]
[h:description=decode(getStrProp(macro.args,"description"))]

[h:LibName=replace(tokenName,"^Lib:","")]

[h:settingsObject=getLibProperty("Settings",tokenName)]

[h:theme=json.get(settingsObject,"theme")]
[h:label=json.get(settingsObject,"label")]
[h:ChaNumber=json.get(settingsObject,"ChaNumber")]

[h:if(ChaNumber=="",1,ChaNumber)]

[r:list="MapTool,GitHub,D&D,MT Dark"]
[r:labelListRender="
<html><table><tr><td width=1px style='border: solid 1px black'><td>none</html>,
<html><table><tr><td bgcolor=red width=2px><td>red</html>,
<html><table><tr><td bgcolor=green width=2px><td>green</html>,
<html><table><tr><td bgcolor=blue width=2px><td>blue</html>,
<html><table><tr><td bgcolor=yellow width=2px><td>yellow</html>,
<html><table><tr><td bgcolor=orange width=2px><td>orange</html>,
<html><table><tr><td bgcolor=purple width=2px><td>purple</html>,
<html><table><tr><td bgcolor=gray width=2px><td>gray</html>
"]

[h:labelList="none,red,green,blue,yellow,orange,purple,gray"]

[h:res=input("theme|"+list+"|Theme|list|value=string select="+listfind(list,theme),
"label|"+labelListRender+"|Label|list|select="+listfind(labelList,label),
"ChaNumber|"+ChaNumber+"|Display chapter number|check")]
[h:abort(res)]

[h:label=listget(labelList,label)]

[h:settingsObject=json.set(settingsObject,"theme",theme)]
[h:settingsObject=json.set(settingsObject,"label",label)]
[h:settingsObject=json.set(settingsObject,"ChaNumber",ChaNumber)]

[h:setLibProperty("Settings",settingsObject,tokenName)]

[h,if(isFrameVisible("Compendium")==1),code:{
[macro("Index@lib:Notebook"):tokenName]
};{}]
[h,if(isFrameVisible(LibName)==1),code:{
[macro("Content@lib:Notebook"):"key="+name+";description="+description+";tokenName="+tokenName]
};{}]