// 这是一个测试

import * as GameCoreClass from "./Core.Class"
import * as GameCoreInit from "./Core.Init";

var A1Tank = new GameCoreClass.GameObjectRoot(GameCoreInit.GameObjectRoots.get("A1坦克"));
var Player = new GameCoreClass.GamePlayer();

var A1_1 = new GameCoreClass.GameObject(A1Tank,Player);
var A1_2 = new GameCoreClass.GameObject(A1Tank,Player);

var T = 0;
while((A1_1.Root.Health>0)&&(A1_2.Root.Health>0)){
    var T = T + 1;
    A1_1.Attack(A1_2);
    A1_2.Attack(A1_1);
    console.log(`[${T}] [1]:${Math.round(A1_1.Root.Health.valueOf())} [2]:${Math.round(A1_2.Root.Health.valueOf())}`)
}