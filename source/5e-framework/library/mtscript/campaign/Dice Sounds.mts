[h:output=function.getOutput())]

[h,if(output=="none"),code:{};{
    <!--------------------------------DICE SOUNDS---------------------------------->
    [h:clipList=getLibProperty("Audio",function.getNamespace())]
    [h:clipCount=listcount(clipList)]
    [h:songUrl=listget(clipList,roll(1,clipCount)-1)]
    [macro("campaign/playClip@this"):songUrl]
}]