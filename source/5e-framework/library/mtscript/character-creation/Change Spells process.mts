[h:class=json.get(macro.args,"class")]
[h:level0=json.get(macro.args,"level 0")]
[h:level1=json.get(macro.args,"level 1")]
[h:level2=json.get(macro.args,"level 2")]
[h:level3=json.get(macro.args,"level 3")]
[h:level4=json.get(macro.args,"level 4")]
[h:level5=json.get(macro.args,"level 5")]
[h:level6=json.get(macro.args,"level 6")]
[h:level7=json.get(macro.args,"level 7")]
[h:level8=json.get(macro.args,"level 8")]
[h:level9=json.get(macro.args,"level 9")]
[h:hitDice=json.get(macro.args,"hitDice")]
[h:cancel=json.get(macro.args,"cancel")]
[h:cancel=if(cancel=="cancel",0,1)]
[h:abort(cancel)]

[h:spellObj='{"Level 0":"","Level 1":"","Level 2":"","Level 3":"","Level 4":"","Level 5":"","Level 6":"","Level 7":"","Level 8":"","Level 9":""}']


[h:level0=json.fromList(level0)]
[h:level1=json.fromList(level1)]
[h:level2=json.fromList(level2)]
[h:level3=json.fromList(level3)]
[h:level4=json.fromList(level4)]
[h:level5=json.fromList(level5)]
[h:level6=json.fromList(level6)]
[h:level7=json.fromList(level7)]
[h:level8=json.fromList(level8)]
[h:level9=json.fromList(level9)]

[h:spellObj=json.set(spellObj,"Level 0",level0)]
[h:spellObj=json.set(spellObj,"Level 1",level1)]
[h:spellObj=json.set(spellObj,"Level 2",level2)]
[h:spellObj=json.set(spellObj,"Level 3",level3)]
[h:spellObj=json.set(spellObj,"Level 4",level4)]
[h:spellObj=json.set(spellObj,"Level 5",level5)]
[h:spellObj=json.set(spellObj,"Level 6",level6)]
[h:spellObj=json.set(spellObj,"Level 7",level7)]
[h:spellObj=json.set(spellObj,"Level 8",level8)]
[h:spellObj=json.set(spellObj,"Level 9",level9)]


[h:setLibProperty(class,spellObj,function.getNamespace())]


[h,if(isDialogVisible("Spells")==1),code:{
[macro("tables/Spells Window@this"):class]
};{}]