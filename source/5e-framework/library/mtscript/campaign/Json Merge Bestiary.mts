
[h:res=input("var|Paste the content from an exported JSON file||label|span=true",
	"json2||Merge Bestiary with")]
[h:abort(res)]

[h,if(json.type(json2)=="OBJECT"),code:{

	[h:fields=json.fields(json2)]

	[h,count(listcount(fields)),code:{
	
		[h:currentItem=listget(fields,roll.count)]

		[h:value=json.get(json2,currentItem)]
		
		[h:setLibProperty(currentItem, value, function.getNamespace())]
	
	}]

};{

	[h:abort(0)]

}]

[macro("bestiary/Manage@this"):""]