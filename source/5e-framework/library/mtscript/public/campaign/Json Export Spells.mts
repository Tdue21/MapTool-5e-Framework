[h:lib=getStrProp(macro.args,"lib")]

[h:list="Level 0,Level 1,Level 2,Level 3,Level 4,Level 5,Level 6,Level 7,Level 8,Level 9"]

[h:spells="{}"]
[h,count(listcount(list)),code:{

	[h:currentItem=listget(list,roll.count)]
	[h:currentSpellObject=getLibProperty(currentItem,lib)]
	[h:spells=json.set(spells,currentItem,currentSpellObject)]

}]


[h:path=getLibProperty("Path","Lib:Campaign")]

[h:res=input("var|Path must exist||label|span=true",
	"path|"+path+"|File Path",
	"name|Spells|File Name")]
[h:abort(res)]

[h:setLibProperty("Path",path,"Lib:Campaign")]

[h:exportData(path+"/"+name+".json",spells,0)]