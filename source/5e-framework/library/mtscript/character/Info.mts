[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:share=getStrProp(macro.args,"share")]




[h:value=getLibProperty("OtherNotes","Lib:"+tokenName)]


[h:Backstory=json.get(value,"Backstory")]
[h:Allies=json.get(value,"Allies")]
[h:Treasure=json.get(value,"Treasure")]

[h:size=length(Backstory+Allies+Treasure)]
[r,if(Allies==""):size=size+100]
[r,if(Treasure==""):size=size+100]

[h:height=if(size>1000,650,if(size>400,450,if(size>100,300,200)))]

[dialog5(tokenName+" - Info", "width=450; height="+height+"; temporary=0; noframe=0; input=1"):{

<link rel="stylesheet" type="text/css" href="[r:function.getCss('D&D')]">


[h:permissions=getLibProperty("PlayerPermission","Lib:Character")]
[h:edit=getStrProp(permissions,"edit")]
[h:sharePlayer=getStrProp(permissions,"share")]
[h,if(isGM()==1):edit=1]
[h,if(isGM()==1):sharePlayer=1]



[r,if(share==1):"";"<p class='topbar'>"]

[h:args=setStrProp(macro.args,"tokenName","Lib:Compendium")]

[r,if(share==1 || edit==0):"";macrolink("Backstory","Change Textfield Form@Lib:Character","","prop=OtherNotes;name=Backstory;description="+Backstory+";tokenName="+tokenName)+" &nbsp;"]
[r,if(share==1 || edit==0):"";macrolink("Allies","Change Textfield Form@Lib:Character","","prop=OtherNotes;name=Allies;description="+Allies+";tokenName="+tokenName)+" &nbsp;"]
[r,if(share==1 || edit==0):"";macrolink("Treasure","Change Textfield Form@Lib:Character","","prop=OtherNotes;name=Treasure;description="+Treasure+";tokenName="+tokenName)+" &nbsp;"]
[r,if(share==1 || sharePlayer==0):"";macrolink("Share","Share Info@Lib:Character","","share=1;description="+Backstory+";tokenName="+tokenName+";allies="+Allies+";treasure="+Treasure)+" &nbsp;"]


[r,if(share==1):"";"</p>"]

<h1 style="padding-bottom:0px;margin-bottom:0px;">

[r:TokenName]

</h1>

[macro("Markdown@Lib:Character"):"tokenName="+tokenName+";description="+encode(Backstory)]

[r,if(Allies==""),code:{};{
	

	<h4 style="padding-bottom:0px;margin-bottom:0px;">
	
	Allies & Organizations
	
	</h4>
	
	[macro("Markdown@Lib:Character"):"tokenName="+tokenName+";description="+encode(Allies)]

}]

[r,if(Treasure==""),code:{};{

	<h4 style="padding-bottom:0px;margin-bottom:0px;">
	
	Treasure
	
	</h4>
	
	[macro("Markdown@Lib:Character"):"tokenName="+tokenName+";description="+encode(Treasure)]

}]



}]


