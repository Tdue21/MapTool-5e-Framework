[h:remove=json.remove(macro.args,"submit")]

[h:remove=json.fields(remove)]

[h:res=input("var|Are you sure you want to remove "+remove+" from the Framework?||label|span=true",
"var|It is recomended to make a backup of your content first.||label|span=true")]
[h:abort(res)]


[macro("bestiary/Remove Source@this"):remove]

[macro("character/Remove Source@this"):remove]