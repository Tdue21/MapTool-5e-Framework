[h:tokenName=json.get(macro.args,"Pin")]

[h:args=if(tokenName=="Select Pin","","tokenName="+tokenName)]
[macro("Pin Notes@Lib:Character"):args]