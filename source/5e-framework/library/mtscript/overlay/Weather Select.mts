[h:res=input("var|<html><h3>Weather</h3></html>||label|span=true",
"color|Clear,Cloudy,Night,Sunset,Mist,Noon,Dawn,Dusk,Desert,Moonlight,Starlight,Twilight|Color|list",
"pattern|none,Rain,Snow,Blood Rain,Falling Leaves,Falling Petals,Fog,Rain Overhead,Smoke|Pattern|list",
"effects|0|Lightning|check")]
[h:abort(res)]

[h:args=color+","+pattern+","+effects]

[h:setLibProperty("Weather",args,"Lib:Campaign")]

[h:link=macroLinkText("overlay/Weather@this","",args)]

[h:execLink(link,0,"all")]