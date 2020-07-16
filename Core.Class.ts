export var Weapons:Map<String,GameWeapon> = new Map();
export var WeaponsWarhead:Map<String,GameWeaponWarhead> = new Map();
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
    UnderAttack(Weapon:String,Attacker:GameObjectRoot){
        Weapons.get(Weapon).Warhead.Attack(this,Weapons.get(Weapon),Attacker);
    }
    constructor(Loader:GameObjectRoot){
        const that  = Loader;
        //定义 that 为 Loader
        this.Health = new Number(that.Health);
        this.Cost   = new Number(that.Cost);
        this.Name   = new String(that.Name);
        this.Size   = new Number(that.Size);
    }
}
export class GameObject{
    Root:GameObjectRoot;
    Owner:GamePlayer;
    Location:GameLocation;
    constructor(Root:GameObjectRoot,Owner:GamePlayer){
        this.Root = new GameObjectRoot(Root);
        this.Root.Bind = this;
        this.Owner = Owner;
        this.Location = this.Owner.Factorys.get(this.Root.Type.valueOf())[0].Location;
        this.Location.Units[this.Location.Units.length] = this;
        this.Location.UsedSize = this.Location.UsedSize.valueOf() + this.Root.Size.valueOf();
    }
}
export class GameWeapon{
    Hurt:Number;
    Warhead:GameWeaponWarhead;
    constructor(Loader:{Hurt:Number,Warhead:String}){
        const that = Loader;
        this.Hurt = that.Hurt;
        this.Warhead = WeaponsWarhead.get(that.Warhead);
    }
}
export class GameWeaponWarhead{
    Attack(GOR:GameObjectRoot,GW:GameWeapon,ATT:GameObjectRoot):void{
        // 真的就默认武器呗
        GOR.Health = GOR.Health.valueOf() - GW.Hurt.valueOf();
    };
    constructor(Attack:((GOR:GameObjectRoot,GW:GameWeapon,ATT:GameObjectRoot)=>void)){
        this.Attack = Attack;
    }
}