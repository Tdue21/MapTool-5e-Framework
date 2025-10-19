<!-- *********************************************************************** -->
<!-- *********************************************************************** -->
<!-- **                                                                   ** -->
<!-- **                           onInit                                  ** -->
<!-- **                                                                   ** -->
<!-- *********************************************************************** -->
<!-- *********************************************************************** -->
[h:library = "dovesoft.dnd5e"]

<!-- ********** Defining Functions ********** -->
[h,macro("overlay/Loading@this"):"Defining Functions"]
[h,macro("registerFunctions@this"):""]

<!-- ********** Loading Audio Clips ********** -->
[h,macro("overlay/Loading@this"):"Loading Audio Clips"]
[h:loadAudio=getLibProperty("loadAudio", library)]
[h,if(loadAudio==1),code:{
    [h:clipList=getLibProperty("Audio",library)]
    [h,foreach(clip, clipList, ""), code: {
	    [h:playClip(clip,1,0)]
    }]
    [h:doorClip=getLibProperty("Door",library)]
    [h:playClip(doorClip,1,0)]
};{}]

<!-- ********** Loading Welcome message ********** -->
[h,macro("overlay/Loading@this"):"Loading Welcome message"]

[h:resources="<a href='https://dnd.wizards.com/articles/features/basicrules'>dnd.wizards.com</a>"]
[h:customMSG=getLibProperty("Welcome",library)]

[h,macro("campaign/Markdown@this"):"description="+customMSG]

[h:customMSG=replace(macro.return,"<a href=","<font color=#4183C4 style='text-decoration:none'><a href=")]
[h:customMSG=replace(customMSG,"</a>","</a></font>")]
[h:customMSG=replace(customMSG,"<code>","<font color=maroon><code>")]
[h:customMSG=replace(customMSG,"</code>","</code></font>")]
[h:customMSG=replace(customMSG,"<ul>","<ul style='margin-left:15px;margin-bottom:0px'>")]
[h:customMSG=replace(customMSG,"<ol>","<ol style='margin-left:15px;margin-bottom:0px'>")]

[h:libInfo = library.getInfo(library)]
[h:libVersion = json.get(libInfo, "version")]

[h:"<!-- -->"]

[h:html='<div style="font-family: sans-serif; color: #111111; background-color: #f6f8fa; ' + 
'border: 3px solid #ABB3A1; border-left: 1px solid #ABB3A1; border-top: 1px solid #ABB3A1; margin: 5px; padding: 5px;">
<h1 style="border-bottom: 1px solid #ABB3A1; font-size: 12px;margin:0px;margin-top:3px">Welcome, '+getPlayerName()+'!</h1>
<p>'+customMSG+'</p>
<p><i>Framework Version: '+libVersion+'</i></p>
</div>
']
[h:broadcast(html,"self")]

<!-- ********** Loading Interface Overlay ********** -->
[h,macro("overlay/Loading@this"):"Loading Interface Overlay"]

[h,macro("overlay/OverlayMiniMenu@this"):""]
[h,macro("overlay/OverlaySelected@this"):""]
[h,macro("overlay/Weather@this"):getLibProperty("Weather",library)]
[h,macro("tables/Tables List@this"):""]

[h:closeOverlay("loading")]

[h:link=macroLinkText("deferredCalls@this")]
[h:execLink(link,1,"self")]
