[h:findRound=getInitiativeRound() - 1]

[h,if(getCurrentInitiative() == 0),code:{
    [setInitiativeRound(findRound)]
    [setCurrentInitiative(initiativeSize() - 1)]
};{
    [setCurrentInitiative(getCurrentInitiative() - 1)]
}]