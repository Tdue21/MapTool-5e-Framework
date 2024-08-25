[h:targets=getSelected()]

[h,if(listCount(targets)==2):res=1;res=input("var|Select exactly two tokens and try again.||label|span=true")]
[h:abort(res)]

[h:target1=listget(targets,0)]
[h:target2=listget(targets,1)]

[h:distance=getDistance(target1,1,target2)]



[h:input("var|<html><table><tr><td align=center><img src='"+replace(getTokenImage(50,target1),":","&#58;")+"'></img><br>"+getName(target1)+"<td valign=top><h1>"+distance+" ft.</h1><td align=center><img src='"+replace(getTokenImage(50,target2),":","&#58;")+"'></img><br>"+getName(target2)+"</html>||label|span=true")]

