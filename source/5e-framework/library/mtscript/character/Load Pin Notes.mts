[h:tokenName=json.get(macro.args,"Pin")]

[h:args=if(tokenName=="Select Pin","","tokenName="+tokenName)]
[macro("character/Pin Notes@this"):args]