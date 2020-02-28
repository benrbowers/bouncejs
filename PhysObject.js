//Class representing physical object that can be affected by forces
class PhysObject {
    /*
     * Create PhysObject
     * @param {Vector2} position     Position of the object in pixels.
     * @param {number}  gravity      Acceleration of the object due to gravity.
     * @param {Vector2} velocity     Velocity of the object.
     * @param {Vector2} acceleration Acceleration of the object.
     * @param {number}  mass         Mass of the object.
     */
    constructor(position, gravity = 9.8, velocity, acceleration, mass = 1) {
        this.position = position;
        this.gravity = gravity;
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.mass = mass;
    }

    applyForce(force) {
        
    }
}