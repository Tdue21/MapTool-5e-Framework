[h:output=arg(0)]



[h,if(output=="ask"),code:{

	[h:lastOutput=getLibProperty("lastOutput","Lib:Campaign")]
	[h:outputList="all,self,gm,gm-self"]
	
	[h:res=input("output|"+outputList+"|Output|List|value=string select="+listfind(outputList,lastOutput))]

	
	[h:setLibProperty("lastOutput",output,"Lib:Campaign")]
	[h,if(output=="ask"):output="self"]
	

};{}]

[r:output]