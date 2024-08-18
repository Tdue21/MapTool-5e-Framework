[h:Pin=json.get(macro.args,"Pin")]
[h:idList=json.get(macro.args,"idList")]
[h:Load=json.get(macro.args,"Load")]
[h:Save=json.get(macro.args,"Save")]
[h:Party=json.get(macro.args,"Party")]

[h:pinId=findToken(Pin)]

[h,if(pinId==""):"";switchToken(pinId)]

[h,if(pinId==""):PinIdList=0;PinIdList=getProperty("Encounter")]

[h,if(listcount(PinIdList)>0 && Load==""):res=input("var|Override current encounter?||Label|span=true");""]
[h,if(listcount(PinIdList)>0 && Load==""):abort(res);""]

[h,if(Load!=""):idList=PinIdList;""]

[h,if(Save!=""):setProperty("Encounter",idList);""]

[macro("Manage Encounter@Lib:Bestiary"):"tokenName="+Pin]