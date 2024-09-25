[h:var=macro.args]


[r,overlay("Shared", "width=750; height=500; temporary=0;"):{


[r:'

<style>
.footer	{
	position: absolute;
	text-align: left;
	max-width: 50%;
	top: 50%;
	left: 50%;
	margin-right: -50%;
	transform: translate(-50%, -50%);
	padding: 15px;

	
	}


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

a	{
	color: white;
	text-decoration: none
	}

img	{
    width:100%;
    max-width:600px;
	}

</style>
']

<div class="background">
</div>
<div class="footer">

<div class="float">[r:macrolink("X", "overlay/closeOverlay@this", "","Shared")]</div>

<a href='[r:macroLinkText("overlay/closeOverlay@this","","Shared")]'>
<img src=[r:var]></a>

}]
</div>
