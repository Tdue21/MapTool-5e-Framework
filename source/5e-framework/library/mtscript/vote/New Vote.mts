[h:res=input("name|Are you back from break?","options|Yes, No")]
[h:abort(res)]

[h:setLibProperty("Value","","Lib:Vote")]

[h:link=macroLinkText("vote/Vote exec@this","","options="+options+";name="+name)]
[h:execLink(link,1,"not-gm")]