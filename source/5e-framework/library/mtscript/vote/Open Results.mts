[h:Value=getLibProperty("VoteResult", function.getNamespace())]

[h:options=getStrProp(Value,"options")]
[h:optionsCount=listcount(options)]
[h:height=160+optionsCount*60]

[dialog5("Vote", "width=270; height="+height+"; temporary=1; noframe=0; input=1"):{
<!DOCTYPE html>
<html>
<body style="background-color:white">
    <p bgcolor=white style="background-color:white;border-bottom: 1px solid gray;padding:0px;margin:0px;font-family:sans;font-size:10px">
        [r:macrolink("Post", "vote/Broadcast Results@this", "")]
    </p>
</body>
</html>

[macro("vote/Results@this"):""]
}]