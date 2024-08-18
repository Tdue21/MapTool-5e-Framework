[h:group=getStrProp(macro.args,"prop")]
[h:tokenName=getStrProp(macro.args,"tokenName")]


[h:id=findToken(tokenName)]
[h:switchToken(id)]

[h:Output=getLibProperty("PC Output", "Lib:Character")]

[h:inputList=getLibProperty(group,"Lib:Compendium")]

[h:inputList=json.fields(inputList)]

[h:inputList=listSort(inputList,"N")]

[h:Property=getProperty(group)]

[h,if(json.type(Property)=="UNKNOWN"):currentList="";currentList=json.fields(Property)]


[h,count(listcount(currentList)),code:{

	[h:currentItem=listget(currentList,roll.count)]
	[h:delete=listfind(inputList,currentItem)]
	[h:inputList=listdelete(inputList,delete)]

}]



[h:res=input("tab0 | Add Single || TAB","item|Add New,"+inputList+"|"+group+"|list|value=string","tab1 | Add from list || TAB","list|||text|span=true width=30","tab2 | Get List || TAB","var|"+currentList+"|list")]
[h:abort(res)]
	
[h,if(list==0 || list==""),code:{

	[h,if(item=="Add New"),code:{

		[macro("Change Form@Lib:Character"):"prop="+group+";index=new;name=new;description=new;tokenName="+tokenName]
	
	
	};{

		[macro("Get Spell Level@Lib:Character"):"group="+group+";name="+item]
		[h:level=macro.return]
		[macro("Get Equipment Info@Lib:Character"):"group="+group+";name="+item]
		[h:equipInfo=macro.return]
	
		[h:Property=json.set(Property,item,json.fromStrProp(equipInfo+";Quantity=1;Equiped=1;offHand=0;identified=1"))]

		[h:setProperty(group,Property)]

	}]




};{




	[h,count(listcount(list)),code:{
	
		[h:currentItem=lower(listget(list,roll.count))]

		[macro("Get Spell Level@Lib:Character"):"group="+group+";name="+currentItem]
		[h:level=macro.return]

		[macro("Get Equipment Info@Lib:Character"):"group="+group+";name="+currentItem]
		[h:equipInfo=macro.return]

		[h:Property=json.set(Property,currentItem,json.fromStrProp(equipInfo+";Quantity=1;Equiped=1;offHand=0;identified=1"))]

		[h:setProperty(group,Property)]

		[h,if(item=="Add New"):"";broadcast(tokenName+" added <b><font color=green>"+item+"</font></b>"+if(group=="Equipment"," x1","")+".",Output)]
	
	}]

}]




[h,if(isFrameVisible(tokenName+" - Character Sheet")==1),code:{
[macro("Macro Frame@Lib:Character"):"macro=Character Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Spellcasting Sheet")==1),code:{
[macro("Macro Frame@Lib:Character"):"macro=Spellcasting Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Description Sheet")==1),code:{
[macro("Macro Frame@Lib:Character"):"macro=Description Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Statblock")==1),code:{
[macro("Macro Frame@Lib:Character"):"macro=Statblock;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Pin Notes")==1),code:{
[macro("Macro Frame@Lib:Character"):"macro=Pin Notes;tokenName="+tokenName]
};{}]
[h,if(isDialogVisible("Manage Party")==1),code:{
[h:closeDialog("Manage Party")]
[macro("Manage Party@Lib:Character"):"tokenName="+tokenName]
};{}]
[h,if(isDialogVisible("Manage")==1),code:{
[macro("Pin Notes@Lib:Character"):"tokenName="+tokenName]
};{}]