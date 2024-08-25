[h:ouputArg = if(argCount() > 0, arg(0), "")]

[h:namespace = function.getNamespace()]
[h:outputPC  = getLibProperty("PC Output", namespace)]
[h:outputGM  = getLibProperty("GM Output", namespace)]

[h,switch(outputArg):
    case "PC": output = outputPC;
    case "GM": output = outputGM;
    default  : output = if(isGM()==1, outputGM, outputPC)
]
[r:output]