[h:options=getStrProp(macro.args,"options")]
[h:name=getStrProp(macro.args,"name")]

[h:res=input("var|"+name+"||label|span=true","choice|"+options+"|"+name+"|radio|span=true value=string")]
[h:abort(res)]

[h:player=getPlayerName()]
[h:value=getLibProperty("VoteResult", function.getNamespace())]

[h:results=decode(getStrProp(value,"results"))]
[h:results=setStrProp(results,player,choice)]

[h:totalVotes=countStrProp(results)]
[h:playersCount=listcount(getAllPlayerNames())-1]

[h:broadcast("<b>"+if(playersCount-totalVotes==0,"Got all votes.",number(playersCount-totalVotes)+if(totalVotes==1," vote"," votes")+" remaining.")+"</b> ("+name+")","gm")]

[h:value=setStrProp(value,"results",encode(results))]

[h:value=setStrProp(value,"name",name)]

[h:value=setStrProp(value,"options",options)]

[h:setLibProperty("VoteResult", value, function.getNamespace())]

