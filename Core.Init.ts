import * as GameCoreClass from "./Core.Class";
import * as fs from "fs";


export var GameObjectRoots:Map<string,GameCoreClass.GameObjectRoot> = new Map();
export var RulesSourceData = JSON.parse(fs.readFileSync("./Rules.json").toString());
export var RulesSourceDataOfGameObjectRoots = RulesSourceData["GameObject"] as Map<string,GameCoreClass.GameObjectRoot>
export var RulesSourceDataOfGameWeapons = RulesSourceData["Weapons"] as Map<string,GameCoreClass.GameWeapon>;

Object.keys(RulesSourceDataOfGameObjectRoots).forEach((v)=>{
    GameObjectRoots.set(v,new GameCoreClass.GameObjectRoot(RulesSourceDataOfGameObjectRoots[v]))
});
// 弹头是代码里面写好的
GameCoreClass.WeaponsWarhead.set("Standard",new GameCoreClass.GameWeaponWarhead((GOR,GW,ATT)=>{
    // 标准武器弹头
    // 被攻击.血量 = 被攻击.血量 - 武器.伤害 * 随机(0.5,1.5)
    GOR.Health = GOR.Health.valueOf() - GW.Hurt.valueOf() * ( Math.random() + 0.5);
}));

GameCoreClass.WeaponsWarhead.set("Spawner",new GameCoreClass.GameWeaponWarhead((GOR,GW,ATT)=>{
    // 生成武器
    var SpawnGameObjectRoot = GameObjectRoots.get(GW.Spawner_SpawnGameObjectRoot.valueOf());
    var Spawn = new GameCoreClass.GameObject(SpawnGameObjectRoot,ATT.Bind.Owner);
}));

GameCoreClass.WeaponsWarhead.set("Kill",new GameCoreClass.GameWeaponWarhead((GOR,GW,ATT)=>{
    // 一击毙命
    GOR.Bind.Broken = true;
}));

Object.keys(RulesSourceDataOfGameWeapons).forEach((v)=>{
    GameCoreClass.Weapons.set(v,new GameCoreClass.GameWeapon(RulesSourceDataOfGameWeapons[v.valueOf()]));
});