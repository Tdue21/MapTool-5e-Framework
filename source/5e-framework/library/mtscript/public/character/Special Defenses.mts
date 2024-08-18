[h:name=getStrProp(macro.args,"name")]
[h:tokenName=getStrProp(macro.args,"tokenName")]

[h:id=findToken(tokenName)]

[h,if(id==""):"";switchToken(id)]

[h:defObj=getLibProperty("Defenses","Lib:"+tokenName)]

[h,if(json.type(defObj)=="UNKNOWN"):defObj="{}"]

[h:resistance=json.get(defObj,"resistance")]
[h:immunity=json.get(defObj,"immunity")]
[h:vulnerability=json.get(defObj,"vulnerability")]
[h:condition=json.get(defObj,"condition")]


[h:res=input("resistance|"+resistance+"|Damage Resistances",
"immunity|"+immunity+"|Damage Immunities",
"vulnerability|"+vulnerability+"|Damage Vulnerabilities",
"condition|"+condition+"|Condition Immunities")]
[h:abort(res)]

[h:defObj=json.set(defObj,"resistance",resistance)]
[h:defObj=json.set(defObj,"immunity",immunity)]
[h:defObj=json.set(defObj,"vulnerability",vulnerability)]
[h:defObj=json.set(defObj,"condition",condition)]

[h:setLibProperty("Defenses",defObj,"Lib:"+tokenName)]


[h,if(isFrameVisible(tokenName+" - Description Sheet")==1),code:{
[macro("Macro Frame@Lib:Character"):"macro=Description Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Statblock")==1),code:{
[macro("Macro Frame@Lib:Character"):"macro=Statblock;tokenName="+tokenName]
};{}]