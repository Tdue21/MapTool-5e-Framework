
<h3 style="padding-bottom:0px;margin-bottom:8px">
<img src="asset://aed6269a99576e707a8b2e5081a11fed">&nbsp;
[r:macroLink("<font size=6>Compendium","tables/Tables List@this")]
</h3>


[macro("campaign/Search Results@this"):macro.args+";window=Tables List"]

[r,if(macro.args==""),code:{
	[macro("tables/Tables Render@this"):""]
};{}]