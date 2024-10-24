
export class Collider{
    constructor(){
    }
    isColliding(other){
        return false;
    }
}

export class BoxCollider extends Collider{
constructor(width, height){
        super();
        this.width = width;
        this.height = height;
    }
}