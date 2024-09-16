<h1>Character Setup</h1>

<p style="margin-top: 10px; margin-bottom: 10px">

Select in the list below the <b>Token</b> to setup, the list shows only <b>PC tokens</b>, if a token is not shown, be sure it is set as PC token and you are the token's owner.

</p>


<tr>
<td valign=bottom style="padding:0px;margin=0px;margin-left:10px">


[h: processorLink=macroLinkText("character-creation/CharacterCreationWizard@this","")]
<form action="[r:processorLink]" method="json">

<!----------List PC Libs----------->
[h:info=getInfo("client")]
[h:libtokens=json.get(info,"library tokens")]
[h:libList=json.fields(libtokens)]

[h:list=libList]
[h,count(listcount(libList)),code:{
	[h:currentLib=listget(libList,roll.count)]
	[h:settingsProp=getLibProperty("LibName",currentLib)]
	[h,if(settingsProp==""):list=listdelete(list,listfind(list,currentLib));""]
}]
[h:ListPC=""]
[h:maps=getAllMapNames()]
[h,if(isGM()==1),count(listcount(maps)),code:{
[h:ListPC=list]
};{

	[h:map=listget(maps,roll.count)]
	[h:ownedtokens=getOwnedNames(getPlayerName(),",",map)]
	
	[h,count(listcount(ownedtokens)),code:{
	
		[h:currentOwned=listget(ownedtokens,roll.count)]
		[h:find=listfind(list,currentOwned)]
		[h,if(find==-1):"";ListPC=listappend(ListPC,currentOwned)]
	}]
}]
[h:ListPC=listsort(ListPC,"N")]


<!----------End of List PC Libs----------->



<select name="tokenName" size="14">

[r,count(listcount(listPC),""),code:{

<option[r:if(roll.count==0," selected='selected'","")]>[r:listget(ListPC,roll.count)]</option>

}]

</select>




<p style="margin-top: 10px;margin-bottom: 10px;margin-left:10px">

Click <b>Next</b> to continue.

</p>

<input type="hidden" name="window" value="Setup">


<div class="div" style="padding-left: 250px;padding-top: 13px;padding-bottom: 12px;margin:0px;" bgcolor=#D8D8D8>
<input type="submit" name="submit" value="< Back">&nbsp;
<input type="submit" name="submit" value="Next >">
</div>


