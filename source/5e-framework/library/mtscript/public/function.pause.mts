[h:value=""]
[h,count(argCount(0)),code:{
	[h:currentArg=arg(roll.count)]
	[h:value=value+currentArg+"<br>"]
}]

[h:res=input("var|<html><h2>Pause</h2>"+value+"</html>||label|span=true")]
[h:abort(res)]