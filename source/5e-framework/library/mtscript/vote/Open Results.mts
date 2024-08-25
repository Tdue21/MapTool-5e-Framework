[h:Value=getLibProperty("Value","Lib:Vote")]

[h:options=getStrProp(Value,"options")]

[h:optionsCount=listcount(options)]

[h:height=160+optionsCount*60]

[dialog5("Vote", "width=270; height="+height+"; temporary=1; noframe=0; input=1"):{

<body bgcolor=white>


<p bgcolor=white style="border-bottom: 1px solid gray;padding:0px;margin:0px;font-family:sans;font-size:10px">
<font style="text-decoration:none">[r:macroLink("Post","Broadcast Results@Lib:Vote","")]
</p>


[macro("Results@Lib:Vote"):""]


}]