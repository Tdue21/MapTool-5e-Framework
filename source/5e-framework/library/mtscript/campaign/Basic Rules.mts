[h:rules=getLibProperty("RulesURL","Lib:Campaign")]




[h:urlpreview=replace(substring(rules,0,if(length(rules)<50,length(rules),50)),"https?://","")+if(length(rules)<50,"","...")]




[h:broadcast("<table style='border:2px solid black;'><tr><td align=center><font size=7 face=serif style='text-decoration:none' color=maroon><a href='"+rules+"'>Open Rules</a></font><tr><td valign=top height=30><hr noshade><font size=2 color=black><b>"+urlpreview,"self")]