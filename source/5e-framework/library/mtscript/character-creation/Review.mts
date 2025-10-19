[h:tokenName=json.get(macro.args,"tokenName")]
[h:id=findToken(tokenName)]
[h:switchToken(id)]

[macro("character-creation/Set Spell Slots@this"):"tokenName="+tokenName]

[h:submit=json.get(macro.args,"submit")]
[h,if(submit=="Skip"),code:{};{
	[macro("character-creation/Apply Details@this"):macro.args]
}]

<div class="content">
	<h1>Review</h1>

	<p>
	This Wizard completed setting <b>[r:tokenName]'s</b> Abilities, Race, Background and Class, 
	description and personality, some details may still be missing but you can edit manually 
	any time, have fun playing the game.
	</p>

	<p>
	Click <b>Finish</b> to close the Wizard.
	</p>

</div>

<input type="hidden" name="tokenName" value="[r:tokenName]">
<input type="hidden" name="window" value="Review">

<div class="buttons">
	<button type="submit" name="submit" value="Back">&lt; Back</button>
	<button type="submit" name="submit" value="Finish">Finish</button>
</div>

