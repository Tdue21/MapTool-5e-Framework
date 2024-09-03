[h,if(isGM()==1),code:{
	[h:tokens=getTokens()]
	[h: selectTokens(tokens,1,",")]
	[h: exposeFOW()]
	[h: deselectTokens()]
};{
	[macro("campaign/Roll Any Dice@this"):""]
}]

