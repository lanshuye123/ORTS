import * as GameCoreClass from "./Core.Class";
import * as fs from "fs";
var GameObjectRoots:Map<String,GameCoreClass.GameObjectRoot> = new Map();
var RulesSourceData = JSON.parse(fs.readFileSync("./Rules.json").toString());
var RulesSourceDataOfGameObjectRoots = RulesSourceData["GameObject"] as Map<String,GameCoreClass.GameObjectRoot>
RulesSourceDataOfGameObjectRoots.forEach((v,k)=>{
    GameObjectRoots.set(k,new GameCoreClass.GameObjectRoot(v))
});
// 弹头是代码里面写好的
GameCoreClass.WeaponsWarhead.set("Standard",new GameCoreClass.GameWeaponWarhead((GOR,GW,ATT)=>{
    // 标准武器弹头
    // 被攻击.血量 = 被攻击.血量 - 武器.伤害 * 随机(0.5,1.5)
    GOR.Health = GOR.Health.valueOf() - GW.Hurt.valueOf() * ( Math.random() + 0.5);
}));

var RulesSourceDataOfGameWeapons = RulesSourceData["Weapons"] as Map<String,GameCoreClass.GameWeapon>;
RulesSourceDataOfGameWeapons.forEach((v,k)=>{
    GameCoreClass.Weapons.set(k,new GameCoreClass.GameWeapon({Hurt:new Number(v.Hurt),Warhead:new String(v.Warhead)}));
});