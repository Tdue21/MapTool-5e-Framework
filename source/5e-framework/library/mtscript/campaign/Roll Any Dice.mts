<!----------List PC Libs----------->
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
[h,count(listcount(maps)),code:{

	[h:map=listget(maps,roll.count)]
	[h:ownedtokens=getOwnedNames(getPlayerName(),",",map)]
	
	[h,count(listcount(ownedtokens)),code:{
	
		[h:currentOwned=listget(ownedtokens,roll.count)]
		[h:find=listfind(list,currentOwned)]
		[h,if(find==-1):"";ListPC=listappend(ListPC,currentOwned)]
	}]
}]
[h:ListPC=listsort(ListPC,"N")]
<!----------End of List PC Libs----------->
[h:tokenList=replace(ListPC,"Lib:","")]

[h,if(isGM()==1):tokenList=listappend(replace(list,"Lib:",""),getTokenNames(",","{'propertyType':'NPC'}"))]

[h:selected=replace(getSelectedNames(),"Lib:","")]


[h:res=input("tokenName|"+tokenList+"|Token|List|value=string select="+listfind(tokenList,selected),
"rolltype|Dice Formula,Skill Check,Ability Check,Saving Trow,Initiative,Weapon Attack,Spell Attack|Roll Type|List",
"randomBonus|0|Bonus|Text|width=9")]
[h:abort(res)]

[h:find=listfind(replace(list,"Lib:",""),tokenName)]


[macro(""+if(find==-1,"Bestiary","Character/Roll Any Dice@this")):"tokenName="+tokenName+";rolltype="+rolltype+";randomBonus="+randomBonus]

