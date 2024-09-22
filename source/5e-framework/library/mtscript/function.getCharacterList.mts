[h:info=getInfo("client")]
[h:libtokens=json.get(info,"library tokens")]
[h:libList=json.fields(libtokens)]

[h:list=libList]
[h,count(listcount(libList)),code:{
    [h:currentLib=listget(libList,roll.count)]
    [h:settingsProp=getLibProperty("LibName",currentLib)]
    [h,if(settingsProp==""):list=listdelete(list,listfind(list,currentLib));""]
}]
[h:ListPC=""]
[h:maps=getAllMapNames()]
[h,if(isGM()==1),count(listcount(maps)),code:{
    [h:ListPC=list]
};{
    [h:map=listget(maps,roll.count)]
    [h:ownedtokens=getOwnedNames(getPlayerName(),",",map)]
    [h,count(listcount(ownedtokens)),code:{
        [h:currentOwned=listget(ownedtokens,roll.count)]
        [h:find=listfind(list,currentOwned)]
        [h,if(find==-1):"";ListPC=listappend(ListPC,currentOwned)]
    }]
}]
[h:ListPC=listsort(ListPC,"N")]
[h:macro.return = ListPC]