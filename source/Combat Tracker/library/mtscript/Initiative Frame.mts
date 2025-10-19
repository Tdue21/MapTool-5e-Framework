[h:initList = getInitiativeList()]
[h:round = json.get(initList, "round")]
[h:current = Number(json.get(initList, "current"))]
[h:initTokens = json.get(initList, "tokens")]

[h,if(current == -1),code: {
	[h:curToken = "{}"]
	[h:selectedToken = ""]
};{
	[h:curToken = json.get(initTokens, current)]
	[h:selectedToken = json.get(curToken, "tokenId")]
}]

[h:js = ""]
[h:focusTokenId = if(json.contains(macro.args, "current"), json.get(macro.args, "current"), "")]
[h,if(focusTokenId != ""), code: {
	[h:js = strformat('
		let element;
		window.addEventListener("load", function() {
			element = window.document.getElementById("%{focusTokenId}");
			element.focus({ preventScroll: false, focusVisible: true});
			element.selectionStart = 0;
			element.selectionEnd = 0;
		});
	')]
};{}]

[h:onChangeLink = macroLinkText("TokenChanged@this", "")]
[h:onSelectLink = macroLinkText("Initiative Frame@this"  , "", json.set("{}", "event", "onChangeSelection"))]
[h:refreshLink  = macroLinkText("Process Initiative@this", "", json.set("{}", "action", "refresh"))]
[h:resetLink    = macroLinkText("Process Initiative@this", "", json.set("{}", "action", "clear"))]
[h:rollLink     = macroLinkText("Process Initiative@this", "", json.set("{}", "action", "roll"))]
[h:sortaLink    = macroLinkText("Process Initiative@this", "", json.set("{}", "action", "sorta"))]
[h:sortdLink    = macroLinkText("Process Initiative@this", "", json.set("{}", "action", "sortd"))]
[h:prevLink     = macroLinkText("Process Initiative@this", "", json.set("{}", "action", "prev"))]
[h:nextLink     = macroLinkText("Process Initiative@this", "", json.set("{}", "action", "next"))]

[frame5("Combat Tracker", "Title=Combat Tracker; Width=300; Height=600; Temporary=1"): {

<!DOCTYPE html>

<head>
	<link rel="onChangeToken" type="macro" href="[r:onChangeLink]">
	<link rel="onChangeSelection" type="macro" href="[r:onSelectLink]">

	<link rel="stylesheet" type="text/css" href="lib://dovesoft.combatTracker/css/initiative.css?cachelib=false">
</head>

<body>
	<div class="topbar">
		[if(isGM() == 1), code: {
		<a href="[r:refreshLink]">
			<span title="Refresh combat tracker">
				<img src="lib://dovesoft.combattracker/assets/icons/refresh.png">
			</span>
		</a>

		<a href="[r:resetLink]">
			<span title="Clear initiative and reset round counter.">
				<img src="lib://dovesoft.combattracker/assets/icons/clear.png">
			</span>
		</a>

		<a href="[r:rollLink]">
			<span title="Roll initiative for selected tokens.">
				<img src="lib://dovesoft.combattracker/assets/icons/dice2.png">
			</span>
		</a>

		<span class="separator">&nbsp;</span>

		<a href="[r:sortaLink]">
			<span title="Sort ascending (reverse order)">
				<img src="lib://dovesoft.combattracker/assets/icons/ascending.png">
			</span>
		</a>

		<a href="[r:sortdLink]">
			<span title="Sort descending (normal order)">
				<img src="lib://dovesoft.combattracker/assets/icons/descending.png">
			</span>
		</a>

		<span class="separator">&nbsp;</span>

		<a href="[r:prevLink]">
			<span title="Move initiative to previous token">
				<img src="lib://dovesoft.combattracker/assets/icons/prev.png">
			</span>
		</a>

		<a href='[r:nextLink]'>
			<span title="Move initiative to next token">
				<img src="lib://dovesoft.combattracker/assets/icons/next.png">
			</span>
		</a>

		<span class="separator">&nbsp;</span>
		};{}]
		<span class="round"><b>Round:</b> [r:round]</span>
	</div>

	<div class="container">
		<div class="initList">

[r,foreach(init, initTokens, ""), code: {	
					
	[h:tokenId = json.get(init, "tokenId")]
	[h:tokenInit = json.get(init, "initiative")]
	[h:tokenName = getName(tokenId)]
	[h:tokenImage = getTokenImage(48, tokenId)]
	[h:isPlayer = getState("Player", tokenId)]
	[h:isAlly = getState("Ally", tokenId)]
	[h:isEnemy = getState("Enemy", tokenId)]
	[h:isNeutral = getState("Neutral", tokenId)]
	[h:color = ""]

	[h,if(isPlayer || isPC(tokenId)) : color = "blue"]
	[h,if(isEnemy || isNPC(tokenId)): color = "red"]
	[h,if(isAlly) : color = "green"]
	[h,if(isNeutral) : color = "yellow"]

	[h,macro("GetTokenHealth@this"):json.set("{}", "tokenId", tokenId, "tokenName", tokenName)]
	[h:tokenHealth = macro.return]

	[h,if(tokenInit == "null"): tokenInit = ""]
	[h:selected = if(tokenId == selectedToken, "selected", "")]

	<form action='[r:macroLinkText("Process Initiative@this", "")]' method="json" style="margin:0px;padding:0px">
		<div [r,if(selected !="" ):"id='selected'";""] class=" initToken [r:color] [r:selected]">
			<input type="hidden" name="action" value="enter">
			<input type="hidden" name="tokenId" value="[r:tokenId]">
			<input id="[r:tokenId]" type="number" class="init" name="value" value="[r:tokenInit]"
				onfocusout="setTokenInit">

			<div class="health">
				[macro("CalcHealthBar@this"):json.set("", "tokenId", tokenId, "tokenName", tokenName, "tokenHealth", tokenHealth)]
			</div>

			<a href='[r:macroLinkText("Focus@Lib:Overlay", "", "id=" + tokenId)]' tabindex="-1">
				<span title='[r:tokenName + " (" + tokenInit + ")"]'><img src="[r:tokenImage]"></span>
			</a>

			<span style="padding:5px">[r:tokenName]</span>
		</div>
	</form>
}]
		</div>
	</div>	

	<script>[r:js]</script>
</body>
</html>
}]