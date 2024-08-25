[h:name=getStrProp(macro.args,"name")]
[h:size=getStrProp(macro.args,"size")]

[h:assetId=getTokenImage("",name,"02.Handouts")]

[h:description="[![full size]("+assetId+"="+size+")](share)"]


[dialog5("Image", "width=530; height=570; temporary=1; noframe=0; input=1"):{

<link rel="stylesheet" type="text/css" href="GitHub@Lib:Campaign">

[h:permissions=getLibProperty("PlayerPermission","Lib:Character")]
[h:edit=getStrProp(permissions,"edit")]
[h:sharePlayer=getStrProp(permissions,"share")]
[h,if(isGM()==1):sharePlayer=1]

[r,if(sharePlayer==1),code:{
<p class='topbar'>

[r:macrolink("Share","Share@Lib:Character","","description="+encode(description)+";share=1")]

</p>
};{}]

[h:resize=if(size=="",495,"")]

<table style="margin:0px; padding:0px">
<tr><td align=center valign=middle style="margin:0px; padding:0px">
[r:macrolink("<img src="+if(size=="",assetId,assetId+"-"+size)+">","Image Popup@Lib:Campaign","","name="+name+";size="+resize)]
</table>



}]