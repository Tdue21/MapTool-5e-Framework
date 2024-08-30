[h:iconList="asset://0b21e8af0c7e51d2876cef4cd79da722,asset://c4a499da1e97010b2ff20dcdb4e2054f,asset://8bd5d42f6f7dca7057a86f790ceecb3c,asset://d214a2592e7dcc526be2c5e11c14b52b,asset://85382ae371d18220e98fccc16221326a,asset://87f4e9bfa4f1f3db250b57b3599fa4e9,asset://931c72c41be77a3b317cc6627c959f94,asset://741ecc9e6639bf092f55440f1ddbe9f9"]

[h:res=input("var|<html><h2>Create New Character</h2></html>||Label|span=true",
"name|"+getPlayerName()+"|<html>Token Name<span title='Use only letters, numbers and spaces, can be changed later'> (<b>?</b>)</span></html>",
"image|"+iconList+"|<html>Token Image<span title='This can be changed later'> (<b>?</b>)</span></html>|List|icon=true value=string","wizard|1|<html>Launch setup wizard<span title='Can be accessed later from the player menu'> (<b>?</b>)</span></html>|check")]
[h:abort(res)]

[h:start=getLibProperty("Start", function.getNamespace())]
[h:setCurrentMap(start)]

[h:id=findToken("Monster","00.DM")]
[h:newId=copyToken(id,1,"00.DM",'{"name":"'+name+'","x":0,"y":0}')]

[h:switchToken(newId)]
[h:setOwner(getPlayerName())]
[h:setSize("Medium")]
[h:setPC()]
[h:setPropertyType("Basic")]
[h:setTerrainModifier("{'terrainModifier': 2.0, 'terrainModifierOperation': 'MULTIPLY'}")]
[h:setTokenImage(image)]
[h:selectTokens(newId)]
[h:setProperty("Current Hit Points",1)]
[h:setProperty("Total Hit Points",1)]
[h:setProperty("HP","1/1")]



[macro("character-creation/Create Macros@this"):"id="+newId]



[h,if(wizard==1),code:{

[macro("character-creation/Character Creation Wizard@this"):"{'route':'New'}"]

}]

[macro("tables/Tables List@this"):""]

[h:macro.return=name]