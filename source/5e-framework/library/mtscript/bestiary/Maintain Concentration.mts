[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:dmg=getStrProp(macro.args,"dmg")]

[h:id=findToken(tokenName)]
[h,if(id==""):abort(0);switchToken(id)]

[h:stats=getProperty("stats")]

[h:save=json.get(stats,"save")]

[h:value=0]
[h:hasSave=0]
[h,count(listcount(save)),code:{

	[h:currentSave=listget(save,roll.count)]
	[h:match=matches(currentSave,".*[Cc][Oo][Nn].*")]
	[h,if(match==1):value=replace(currentSave,"\\D|[+-]","");""]
	[h,if(match==1):hasSave=1;""]

}]

[h:con=json.get(stats,"con")]
[h,if(isNumber(con)==1):con=floor(con/2-5);con=-5]

[h,if(hasSave==1):"";value=con]


[macro("d20 Roller@Lib:Bestiary"):"text=Con;value=++"+value+";tokenName="+tokenName+";color=ff9900")]

