[h:lib=getStrProp(macro.args,"lib")]
[h:macroName=getStrProp(macro.args,"macroName")]

[h:list="Level 0,Level 1,Level 2,Level 3,Level 4,Level 5,Level 6,Level 7,Level 8,Level 9"]



[h:res=input("var|Must be a JSON object||label|span=true",
	"json2||Merge spells with")]
[h:abort(res)]

[h,if(json.type(json2)=="OBJECT"),code:{

	[h,count(listcount(list)),code:{
	
		[h:currentItem=listget(list,roll.count)]
		[h:currentJson1=getLibProperty(currentItem,lib)]
		[h,if(json.type(currentJson1)=="UNKNOWN"):currentJson1="{}";""]
		
		[h:currentJson2=json.get(json2,currentItem)]
		[h,if(json.type(currentJson2)=="UNKNOWN"):currentJson2="{}";""]

		[h:merged=json.merge(currentJson1,currentJson2)]
		
		[h:setLibProperty(currentItem,merged,lib)]
	
	}]

};{

	[h:abort(0)]

}]

[macro(macroName+"@"+lib):""]