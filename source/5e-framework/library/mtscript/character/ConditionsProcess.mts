[h:broadcast("ConditionsProcess: <br><pre>" + json.indent(macro.args, 4) + "</pre>")]

[h:State = json.get(macro.args, "State")]
[h:selectedTokens=getSelected()]

[h, foreach(currentId, selectedTokens, ""), code: {
	[h:tokenName=getName(currentId)]
	[h:args = json.set("{}", "tokenName", tokenName, "condition", State)]

	[h,if(State == "Concentration"), code: {
		[h:lib = if(getPropertyType(currentId)=="NPC", "bestiary", "character")]
		[h:link = macroLinkText(lib + "/Concentration@this", "", args)]
	};{
		[h:link = macroLinkText("character/Conditions@this", "", args)]
	}]
	[h:execLink(link, 1)]
}]

[macro("character/Conditions Menu@this"):""]
