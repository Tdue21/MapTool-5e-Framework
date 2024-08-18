[h:group2=macro.args]

<!-------------------HANDOUTS------------------->
[h:outputHandouts=""]
[h:handoutTokens=getTokenNames(",","{'npc':1,'visible':1,'layer':'Object','mapName':'02.Handouts'}")]
[r,count(listcount(handoutTokens),""),code:{

	[h:currentHandout=listget(handoutTokens,roll.count)]
	[h:match=matches(lower(replace(currentHandout,"[\\s'-]","")),".*"+lower(replace(group2,"[\\s'-]",""))+".*")]

	[h,if(match==1):outputHandouts=listappend(outputHandouts,currentHandout)]
}]


[h,if(matches(group2,"[\\w\\s]*")==1),code:{

	[h:handoutName=listget(outputHandouts,0)]
	[h:group2=getTokenImage("",handoutName,"02.Handouts")]
	
};{}]

[h:macro.return=group2]