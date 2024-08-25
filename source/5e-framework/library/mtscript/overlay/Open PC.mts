[h:sheet=getStrProp(macro.args,"Sheet")]
[h:ListPC=getStrProp(macro.args,"ListPC")]

[h:ListPC=replace(ListPC,"^Lib:","")]
[h:ListPC=replace(ListPC,",.*?Lib:",",")]

[h,if(listcount(ListPC)==1),code:{

	[h:tokenName=ListPC]
	

};{

	[h:res=input("tokenName|"+ListPC+"|Select Character|list|value=string")]
	[h:abort(res)]

}]

[macro("Macro Frame@Lib:Character"):"macro="+sheet+";tokenName="+tokenName]