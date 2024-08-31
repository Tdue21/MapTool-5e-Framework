[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:map=getStrProp(macro.args,"map")]

[h:currentMap=getCurrentMapName()]

[h,if(currentMap==map):"";setCurrentMap(map)]



[overlay("Shared", "width=750; height=500; temporary=0;"):{


[r:'

<style>
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
p	{font-size: 12}
a	{font-size: 12;text-decoration: none}
td	{font-size: 12}
li	{font-size: 12}
th	{font-size: 12}
h1	{font-size: 26;margin:0px;padding:0px;}
h2	{font-size: 24;margin:0px;padding:0px;}
h3	{font-size: 22;margin:0px;padding:0px;}
h4	{font-size: 20;margin:0px;padding:0px;}
h5	{font-size: 18;margin:0px;padding:0px;}
h6	{font-size: 14;margin:0px;padding:0px;}

table	{
	width:100%
	}

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

<div class="background">
</div>
<div class="footer">

<div class="float">[r:macrolink("X", "overlay/closeOverlay@this")"","Shared")]</div>






[macro("character/Statblock Viewer@this"):tokenName]

}]
</div>

[h,if(currentMap==map):"";setCurrentMap(currentMap)]

