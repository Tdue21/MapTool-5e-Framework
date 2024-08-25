[h:output= function.getOutput())]

[h,if(macro.args==""),code:{

	[h:tableList=getTableNames()]
	[h:tableblacklist=getLibProperty("blacklist","Lib:Campaign")]
	[h,count(listcount(tableblacklist)):tableList=listdelete(tableList,listfind(tableList,listget(tableblacklist,roll.count)))]
	
	[h:playerTableList=""]
	[h,count(listcount(tableList)),code:{
	
		[h:currentTable=listget(tableList,roll.count)]
		
		[h:playerVisible=getTableAccess(currentTable)]
	
		[h,if(playerVisible==1):playerTableList=listappend(playerTableList,currentTable)]
	
	}]
	
	[h:res=input("table|"+if(isGM()==1,tableList,playerTableList)+"|Choose a Table|list|value=string")]
	[h:abort(res)]
	

};{

	[h:table=macro.args]
	

}]
[h:currentTable=table]

[h:roll=getTableRoll(currentTable)]

[h:rollFormula=replace(roll,"^d","1d")]

[h:rollFormula=replace(rollFormula,"d","*")]

[h:results=eval(rollFormula)]

<table>
<tr>
<th>

[h,if(matches(roll,"^d.*")==1):roll=1+roll]

[r:macroLink(roll,"Roll Table@Lib:Tables",output,"text="+table+";value="+roll+";tokenName=Lib:Character")]


<th colspan=2>
[r:currentTable]

[h:odd=1]

[h:value=""]
[h:asset=""]
[r,count(results,""),code:{
	
	[h:entry=getTableEntry(currentTable,roll.count+1)]
	[h:currentValue=json.get(entry,"value")]
	[h:currentAsset=json.get(entry,"assetid")]
	
	[h,if(currentValue==value && currentAsset==asset):show=0;show=1]

	[h:value=currentValue]
	[h:asset=currentAsset]

	[r,if(show==1):"<tr class="+if(odd==1,"bg","")+"><td>"]
	[h,if(show==1):odd=if(odd==1,0,1)]
	
	[h:min=json.get(entry,"min")]
	[h:max=json.get(entry,"max")]
	
	[r,if(show==1):if(min==max,min,min+"-"+max)]
	

	[r,if(show==1):"<td>"]
	[h:asset=json.get(entry,"assetid")]
	[r,if(show==1 && asset!=""):"<img src="+asset+">"]

	[r,if(show==1):"<td>"]
	[r,if(show==1):value]


}]