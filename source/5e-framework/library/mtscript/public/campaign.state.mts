[h:res=input("state|Player,Ally,Enemy,Neutral|Choose|list|value=string")]
[h:abort(res)]

[h:setState("Player" , state == "Player" )]
[h:setState("Ally"   , state == "Ally"   )]
[h:setState("Enemy"  , state == "Enemy"  )]
[h:setState("Neutral", state == "Neutral")]
