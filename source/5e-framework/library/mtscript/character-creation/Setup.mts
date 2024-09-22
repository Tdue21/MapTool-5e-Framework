<div class="content">

	<h1>Character Setup</h1>

	<p>Select in the list below the <b>Token</b> to setup, the list shows only 
	<b>PC tokens</b>, if a token is not shown, be sure it is set as PC token and
	you are the token&apos;s owner.</p>

	<select name="tokenName" size="14">
		[h:ListPC=function.listCharacters()]
		[r,count(listcount(listPC),""),code:{
			<option[r:if(roll.count==0," selected='selected'","")]>[r:listget(ListPC,roll.count)]</option>
		}]
	</select>

	<p>Click <b>Next</b> to continue.</p>
</div>

<div class="buttons">
	<input type="hidden" name="window" value="Setup">
	<button type="submit" name="submit" value="Back">&lt; Back</button>
	<button type="submit" name="submit" value="Next">Next &gt;</button>
</div>


