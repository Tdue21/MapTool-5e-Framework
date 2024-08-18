[h:id=macro.args]

[h,if(id==""):id=findToken(token.name)]

[h:owner=isOwner(getPlayerName(),id)]

[h,if(owner==1 || isGM()==1),code:{};{

	[h:broadcast("<font color=red><b>You don't own "+token.name+"</b></font>","self")]
	[h:abort(0)]

}]

[h:gameplay=getLibProperty("Gameplay","Lib:Campaign")]
[h:interactDistance=getStrProp(gameplay,"interactDistance")]

[h:server=getInfo("server")]
[h:metric=json.get(server,"movement metric")]

[h:objects=getTokenNames(",","{'layer':'Object','range':{'token':'"+id+"','upto':"+interactDistance+",'metric':'"+metric+"','distancePerCell':1}}")]

[h:assetList=""]
[h:interactList=""]
[h,count(listcount(objects)),code:{

	[h:objName=listget(objects,roll.count)]
	[h:objId=findToken(objName)]
	[h:macros=getMacros(",",objId)]
	[h:findInteract=listfind(macros,"Interact")]
	[h,token(objName):assetId=getTokenImage()]
	[h,if(findInteract==-1 || getVisible(objId)==0):"";assetList=listappend(assetList,assetId)]
	[h,if(findInteract==-1 || getVisible(objId)==0):"";interactList=listappend(interactList,objId)]

}]


[h,if(listcount(assetList)>1):res=input("target|"+assetList+"|Target|list|icon=true");target=0]
[h,if(listcount(assetList)>1):abort(res)]
[h,if(listcount(assetList)==0):broadcast("<font color=red><b>Nothing to interact</b></font>","self")]

[h:objName=listget(interactList,target)]

[h:objId=findToken(objName)]

[h,if(objId==""):abort(0);""]

[h:link=macroLinkText("Interact@Token","",objId,objId)]
[h:execLink(link)]


