import * as GameCoreClass from "./Core.Class";
import * as fs from "fs";


export var GameObjectRoots:Map<String,GameCoreClass.GameObjectRoot> = new Map();
export var RulesSourceData = JSON.parse(fs.readFileSync("./Rules.json").toString());
export var RulesSourceDataOfGameObjectRoots = RulesSourceData["GameObject"] as Map<String,GameCoreClass.GameObjectRoot>
export var RulesSourceDataOfGameWeapons = RulesSourceData["Weapons"] as Map<String,GameCoreClass.GameWeapon>;

Object.keys(RulesSourceDataOfGameObjectRoots).forEach((v)=>{
    GameObjectRoots.set(v,new GameCoreClass.GameObjectRoot(RulesSourceDataOfGameObjectRoots[v]))
});
// 弹头是代码里面写好的
GameCoreClass.WeaponsWarhead.set("Standard",new GameCoreClass.GameWeaponWarhead((GOR,GW,ATT)=>{
    // 标准武器弹头
    // 被攻击.血量 = 被攻击.血量 - 武器.伤害 * 随机(0.5,1.5)
    GOR.Health = GOR.Health.valueOf() - GW.Hurt.valueOf() * ( Math.random() + 0.5);
}));

Object.keys(RulesSourceDataOfGameWeapons).forEach((v)=>{
    GameCoreClass.Weapons.set(v,new GameCoreClass.GameWeapon({Hurt:new Number(RulesSourceDataOfGameWeapons[v].Hurt),Warhead:new String(RulesSourceDataOfGameWeapons[v].Warhead)}));
});