"use strict";
// 这是一个测试
// test0:关于攻击的测试
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const GameCoreClass = __importStar(require("./Core.Class"));
const GameCoreInit = __importStar(require("./Core.Init"));
var A1Tank = new GameCoreClass.GameObjectRoot(GameCoreInit.GameObjectRoots.get("A1坦克"));
var A2Tank = new GameCoreClass.GameObjectRoot(GameCoreInit.GameObjectRoots.get("A2坦克"));
var Player1 = new GameCoreClass.GamePlayer();
var Player2 = new GameCoreClass.GamePlayer();
var A1 = new GameCoreClass.GameObject(A1Tank, Player1);
var A2 = new GameCoreClass.GameObject(A2Tank, Player2);
var T = 0;
while ((A1.Root.Health > 0)) {
    var T = T + 1;
    A1.Attack(A2);
    Player2.Units.forEach((v) => {
        v.Attack(A1);
    });
}
