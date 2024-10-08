[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:chapter=getStrProp(macro.args,"key")]
[h:description=getStrProp(macro.args,"description")]
[h:share=getStrProp(macro.args,"share")]

[h:size=length(description)]

[h:name=replace(tokenName,"^Lib:","")]

[overlay("Shared","zorder=5;"):{

[h:fontSize=if(size>3500,10,15)]

[r:'

<style>
.footerBIG	{
	position: absolute;
	text-align: left;
	background-color: white;
	max-width: 50%;
	top: 0;
	left: 50%;
	margin-right: -50%;
	transform: translate(-50%, 0);
	padding: 10px;
	border-style: solid;
	border-width: 2px;
	border-color: black;
	}
.footer	{
	position: absolute;
	text-align: left;
	background-color: white;
	max-width: 50%;
	top: 50%;
	left: 50%;
	margin-right: -50%;
	transform: translate(-50%, -50%);
	padding: 15px;
	border-style: solid;
	border-width: 2px;
	border-color: black;
	}
p	{font-size: '+fontSize+'}
a	{font-size: '+fontSize+';text-decoration: none}
td	{font-size: '+fontSize+'}
li	{font-size: '+fontSize+';}
th	{font-size: '+fontSize+'}
h1	{font-size: '+number(fontSize*2)+';margin:0px;padding:0px;}
h2	{font-size: '+number(fontSize*1.8)+';margin:0px;padding:0px;}
h3	{font-size: '+number(fontSize*1.5)+';margin:0px;padding:0px;}
h4	{font-size: '+number(fontSize*1.3)+';margin:0px;padding:0px;}
h5	{font-size: '+number(fontSize*1.2)+';margin:0px;padding:0px;}
h6	{font-size: '+fontSize+';margin:0px;padding:0px;}

.float	{
	float: right
	}

.background	{
	background-color: black;
	opacity: 0.7;
	width: 100%;
	height: 100%;
	}

</style>
']
<body>

[h:class=if(size>3500,'footerBIG','footer')]

<div class="background">
</div>
<div class="[r:class]">

	[h:settingsObject=getLibProperty("Settings",tokenName)]
	[h:theme=json.get(settingsObject,"theme")]

<div class="float">[r:macrolink("X", "overlay/closeOverlay@this", "","Shared")]</div>
	
	


	
	[macro("notebook/Markdown@this"):"tokenName="+tokenName+";description="+description]

}]