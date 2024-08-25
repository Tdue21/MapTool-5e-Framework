[h:output=arg(0)]
[h,if(output=="ask"),code:{
	[h:lastOutput=getLibProperty("lastOutput", function.getNamespace())]
	[h:outputList="all,self,gm,gm-self"]
	[h:res=input("output|"+outputList+"|Output|List|value=string select="+listfind(outputList,lastOutput))]
	[h:setLibProperty("lastOutput",output, function.getNamespace())]
	[h,if(output=="ask"):output="self"]
};{}]
[r:output]