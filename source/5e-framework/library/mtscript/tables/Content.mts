<h3 style="padding-bottom:0px;margin-bottom:8px">
	<img src="lib://[r:function.getNamespace()]/assets/icons/library.png">&nbsp;
	[r:macroLink("Compendium","tables/Tables List@this")]
</h3>

[macro("campaign/Search Results@this"):macro.args+";window=Tables List"]

[r,if(macro.args==""),code:{
	[macro("tables/Tables Render@this"):""]
};{}]