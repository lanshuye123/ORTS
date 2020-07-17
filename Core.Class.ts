import * as fs from "fs";

export var Weapons:Map<string,GameWeapon> = new Map();
export var WeaponsWarhead:Map<string,GameWeaponWarhead> = new Map();
export class GameBlock{
    X:Number;//X = this * 100
    Y:Number;//Y = this * 100
    Locations:Array<Array<GameLocation>>
}
export var GameBlocks:Map<Number,Map<Number,GameBlock>> = new Map();
export class GameLocation{
    Type:String;
    UsedSize:Number;
    Units:Array<GameObject>;
}
export class GamePlayer{
    Language:GameLanguage;
    Money:Number;
    Factorys:Map<String,Array<GameObject>>;
    Units:Array<GameObject>;
    constructor(){
        this.Language = new GameLanguage("zh_cn");
        this.Money = 13000;
        this.Factorys = new Map();
        this.Units = [];
    }
}
export class GameLanguage{
    /** The Language That the Player is using.*/
    Language:String;
    Pack:Object;
    Get(Source:String):String{
        var Result =  this.Pack[Source.toString()];
        if(Result){
            return new String(Result);
        }else{
            return new String(Source);
        }
    }
    constructor(Language:String){
        this.Language = Language;
        this.Pack = fs.readFileSync(`./Language.${this.Language}.json`);
    }
}
export class GameObjectRoot{
    /** The Default Health Of The GameObject*/
    Health:Number;
    /** The Cost Of Building This GameObject*/
    Cost:Number;
    /** The Name Of The GameObject */
    Name:String;
    Type:String;
    Bind:GameObject;
    Size:Number;
    Weapon:String;
    BuildAble?:Boolean;
    UnderAttack(Weapon:String,Attacker:GameObjectRoot){
        if(this.Bind.Broken){return;}
        Weapons.get(Weapon.valueOf()).Warhead.Attack(this,Weapons.get(Weapon.valueOf()),Attacker);
        if(this.Health !> 0){
            this.Bind.Broken = true;
        }
    }
    constructor(Loader:GameObjectRoot){
        const that     = Loader;
        //定义 that 为 Loader
        this.Health    = new Number(that.Health);
        this.Cost      = new Number(that.Cost);
        this.Name      = new String(that.Name);
        this.Size      = new Number(that.Size);
        this.Weapon    = new String(that.Weapon);
        this.Type      = new String(that.Type);
        this.BuildAble = new Boolean(that.BuildAble);
    }
}
export class GameObject{
    Root:GameObjectRoot;
    Owner:GamePlayer;
    Location:GameLocation;
    Broken:Boolean;
    Health:Number;
    Leven:Number;
    constructor(Root:GameObjectRoot,Owner:GamePlayer){
        this.Root = new GameObjectRoot(Root);
        this.Root.Bind = this;
        this.Health = this.Root.Health;
        this.Leven = 1;
        this.Owner = Owner;
        this.Owner.Money = this.Owner.Money.valueOf() - this.Root.Cost.valueOf();
        this.Owner.Units[this.Owner.Units.length] = this;
        this.Broken = false;
        if(this.Root.Type.valueOf() != "Building"){
            // this.Location = this.Owner.Factorys.get(this.Root.Type.valueOf())[0].Location;
        }
        // this.Location.Units[this.Location.Units.length] = this;
        // this.Location.UsedSize = this.Location.UsedSize.valueOf() + this.Root.Size.valueOf();
    };
    Attack(that:GameObject){
        if(this.Broken){return;}
        that.Root.UnderAttack(this.Root.Weapon,this.Root)
    }
}
export class GameWeapon{
    Hurt:Number;
    Warhead:GameWeaponWarhead;
    Spawner_SpawnGameObjectRoot?:String;
    constructor(Loader:GameWeapon){
        const that = Loader;
        this.Hurt = that.Hurt;
        this.Warhead = WeaponsWarhead.get(((that.Warhead as unknown) as String).valueOf());
        this.Spawner_SpawnGameObjectRoot = that.Spawner_SpawnGameObjectRoot;
    }
}
export class GameWeaponWarhead{
    Attack(GOR:GameObjectRoot,GW:GameWeapon,ATT:GameObjectRoot):void{
        // 真的就Empty呗;
        return;
    };
    constructor(Attack:((GOR:GameObjectRoot,GW:GameWeapon,ATT:GameObjectRoot)=>void)){
        this.Attack = Attack;
    }
}