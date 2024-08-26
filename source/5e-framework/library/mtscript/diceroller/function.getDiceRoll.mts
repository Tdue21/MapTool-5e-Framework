[h:res=input(
    "dfour|0|D4",
    "dsix|0|D6",
    "deight|0|D8",
    "dten|0|D10",
    "dtwelve|0|D12",
    "dtwenty|0|D20",
    "dhundred|0|D100",
    "bonus||Bonus")]
[h:abort(res)]

[h,if(dfour==""):dfour=0]
[h,if(dsix==""):dsix=0]
[h,if(deight==""):deight=0]
[h,if(dten==""):dten=0]
[h,if(dtwelve==""):dtwelve=0]
[h,if(dtwenty==""):dtwenty=0]
[h,if(dhundred==""):dhundred=0]
[h,if(bonus==""):bonus=0]

[h:diceRoll="+"+dfour+"d4"+"+"+dsix+"d6"+"+"+deight+"d8"+"+"+dten+"d10"+"+"+dtwelve+"d12"+"+"+dtwenty+"d20"+"+"+dhundred+"d100"+"+"+bonus]
[h:diceRoll=replace(diceRoll,"\\+0d\\d+","")]
[h:diceRoll=replace(diceRoll,"\\++","+")]
[h:diceRoll=replace(diceRoll,"\\+0\$","")]
[h:diceRoll=replace(diceRoll,"^\\+","")]
[r:diceRoll]