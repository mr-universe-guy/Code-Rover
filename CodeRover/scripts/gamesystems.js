import {Game} from '../gameapp.js';
//the base game object. game objects can form trees of child/parents
//game objects have controls that define their behavior
export class GameObject{
    static objectid = 0;
    posx = 0;
    posy = 0;
    parent;
    children = new Set();
    controls = [];
    
    constructor(name){
        this.name = name;
        this.id = ++GameObject.objectid;
    }
    
    addChild(child){
        this.children.add(child);
        child.parent = this;
    }
    
    removeChild(child){
        if(!this.children.has(child)){
            console.log(child+" is not a child of "+parent);
            return;
        }
        this.children.delete(child);
        child.stop();
    }
    
    removeFromParent(){
        this.parent.removeChild(this);
    }
    
    start(){
        
    }
    
    stop(){
        this.controls.forEach(cont => {
            cont.stop();
        });
        this.children.forEach(child => {
            child.stop();
        });
    }
    
    addControl(control){
        this.controls.push(control);
        control.gameobject = this;
    }
    
    update(delta){
        for(const control of this.controls){
            if(!control.started){
                control.setStarted(true);
            }
            control.update(delta);
        }
        for(const child of this.children){
            child.update(delta)
        }
    }
}

export class Drawable extends GameObject{
    constructor(name){
        super(name);
    }
    onDraw(stage, delta){}
}

export class DrawableSprite extends Drawable{
    sprite;
    staged = false;
    
    constructor(name, sprite){
        super(name);
        this.sprite = sprite;
    }
    
    onDraw(stage, delta){
        if(!this.staged){
            stage.addChild(this.sprite);
            this.staged = true;
        }
        this.sprite.x = this.posx;
        this.sprite.y = this.posy;
    }
}

export class Control{
    started = false;
    gameobject;
    
    constructor(){}
    update(delta){}
    start(){}
    stop(){}
    
    setStarted(started){
        if(started == this.started) {return;}
        if(started){
            this.started = true;
            this.start();
        } else{
            this.started = false;
            this.stop();
        }
    }
}

export class TimerControl extends Control{
    event;
    duration;
    continuous;
    
    constructor(duration, continuous, event){
        this.duration = duration;
        this.continuous = continuous;
        this.event = event;
    }
    
    update(delta){
        
    }
}

class GameSystem{
    game;
    isStarted = false;
    constructor(){}
    onStart(){}
    onStop(){}
    update(delta){}
    
    onAttached(game){
        this.game = game;
    }
}