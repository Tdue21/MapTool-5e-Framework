[h:info=getInfo("client")]



[dialog5("About", "width=300; height=250; temporary=1; noframe=0; input=1"):{

<link rel="stylesheet" type="text/css" href="GitHub@Lib:Campaign">


<body bgcolor=white>

<h4>About</h4>

<p>

<b>MapTool Version:</b> [r:json.get(info,"version")]

<br>

<b>Framework Version:</b> [r:getLibProperty("libversion","Lib:Campaign")]

</p>


<p>

<a href="https://github.com/rtakehara/5e-Framework">Check for Latest Version</a>
<br>
<a href="https://github.com/rtakehara/5e-Framework/issues/new/choose">Report a bug</a>

</p>

}]