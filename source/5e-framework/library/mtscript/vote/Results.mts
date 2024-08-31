[h:value=getLibProperty("VoteResult", function.getNamespace())]
[h:results=decode(getStrProp(value,"results"))]

<h2>Vote Results</h2>
<b>[r:getStrProp(value,"name")]</b> [h:choiceList=getStrProp(value,"options")]
<br>
<br>
[h:voteCount=countStrProp(results)]
[h:playersCount=listcount(getAllPlayerNames())-1]
[r,if(voteCount<playersCount),code:{
  <b>Results are Incomplete</b>
  <br>
  <br>
};{}]

[h:ResultsList=""]
[h,count(voteCount),code:{
  [h:entry=indexValueStrProp(results,roll.count)]
	[h:ResultsList=listappend(ResultsList,entry)]
}]

[r,count(listcount(choiceList),"<br>"),code:{
	<b>[r:choice=listget(choiceList,roll.count)]</b>:

	[r:resultValue=listContains(ResultsList,choice)] [r:if(resultValue==1,"vote","votes")]
	([r:resultPercent=floor(100/voteCount*resultValue)]%)

  [h: MaxLen=70)]
  [h: MaxValue=100]
  [h: VoteValue=resultPercent)]
  [h: Color="blue"]
  [h: Len=max(min(round(VoteValue*MaxLen/MaxValue+0.4999),MaxLen),0)]

  <table>
    <tr>
      <td style="background-color: [r:Color]">
        <span title="{Value}/{MaxValue}">[c(Len, ""),r: "&nbsp;"]</span>
      </td>
      [if(MaxLen-Len>0), code: {
        <td style="background-color: silver">
          <span title="{Value}/{MaxValue}">[c(MaxLen-Len,""),r: "&nbsp;"]</span>
        </td>
      };{}]
    </tr>
  </table>
}]