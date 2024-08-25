[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:profBonus=getStrProp(macro.args,"profBonus")]
[h:level=getStrProp(macro.args,"level")]
[h:list=getStrProp(macro.args,"list")]

[h:id=findToken(tokenName)]
[h,if(id==""):"";switchToken(id)]

[h:output= function.getOutput())]

[h:SlotsValue=getLibProperty("Slots","Lib:"+tokenName)]
[h:value=getStrProp(SlotsValue,"value"+level)]
[h:total=getStrProp(SlotsValue,"total"+level)]
[h:value=if(value=="",0,value)]
[h:total=if(total=="",0,total)]
[h:available=total-value]




[h,switch(level):
	case 1:lvltext="1st";
	case 2:lvltext="2nd";
	case 3:lvltext="3rd";
	default:lvltext=level+"th";
]




[h:obj=getLibProperty("Spells","Lib:"+tokenName)]

[h:list=listSort(list,"N")]

[h:repeat=listcount(list)]

[h:preplist=""]
[h,count(repeat,","),code:{
	[h:objName=listGet(list,roll.count)]
	[h:objData=json.get(obj,objName)]
	[h:prep=json.get(objData,"prep")]
	[h,if(prep==1):preplist=listappend(preplist,objName);""]
}]

[h:preplist=listSort(preplist,"N")]



[h:repeat=listcount(preplist)]

[r,if(repeat==0),code:{};{

<p>

[r:lvltext] level (<span title='Edit Spell Slots'>[r:macroLink(available+if(available==1," slot"," slots"),"Change Slots@Lib:Character","","level="+level+";tokenName="+tokenName)]</span>):

[r,count(repeat,","),code:{
	[h:objName=listGet(preplist,roll.count)]
	[h:objData=json.get(obj,objName)]
	[h:source=json.get(objData,"source")]
	[r:macrolink(objName,"Args Dialog@Lib:Character","","prop=Spells;source="+source+";name="+objName+";description=;tokenName="+tokenName)]
}]
</p>

}]

