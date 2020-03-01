import { Vector2 } from 'Vector2.js';

/**
 * @typedef {Object} vector2
 * @property {number} x The x component of the vector.
 * @property {number} y The y component of the vector.
 */

//Class representing physical object that can be affected by forces
export class PhysObject {
    /**
     * Create PhysObject
     * @param {vector2}  position    Position of the object in pixels. Defaults to (0.0, 0.0).
     * @param {vector2} velocity     Velocity of the object. Defaults to (0.0, 0.0).
     * @param {number}  gravity      Acceleration of the object due to gravity. Defaults to 0.0.
     * @param {vector2} acceleration Acceleration of the object. Defaults to (0, 0).
     * @param {number}  mass         Mass of the object. Defaults to 1.0.
     */
    constructor(position = new Vector2(0,0), velocity = new Vector2(0,0),
    acceleration = new Vector2(0,0), gravity = 0, mass = 1) {
        this.position = position;
        this.gravity = gravity;
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.mass = mass;
    }

    /**
    * Applies a force to the object. The "force" will remain until an equal and opposite
    * force is applied or the acceleration is manually changed.
    * @param {Vector2} force Vector2 representing the force to be applied.
    */
    applyForce(force) {
        this.acceleration = this.acceleration.add(force.scalarDiv(this.mass));
    }
}