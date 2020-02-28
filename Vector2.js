//Class representing a 2 dimensional vector
class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get magnitude() {
        return Math.sqrt(Math.pow(x, 2) * Math.pow(y, 2));
    }

    get direction() {
        
    }
}