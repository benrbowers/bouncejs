import { PhysObject } from "./PhysObject";

/**
 * Physics engine that handles physics objects
 */
class Engine {
    /**
     * Creates engine
     * @param {CanvasRenderingContext2D} canvas        - Canvas to draw objects on.
     * @param {Array}                    physObjects   - Array of physics objects in the engine.
     * @param {String}                   backgrndColor - CSS color value.
     */
    constructor(canvas, physObjects, backgrndColor) {
        this.canvas = canvas;
        this.physObjects = physObjects;
        this.backgrndColor = backgrndColor;
    }

    start() {
        for (var i = 0; i < this.physObjects.length; i++) {
            for(var j = 0; j < this.physObjects.length; j++) {
                var ball1 = this.physObjects[i];
                var ball2 = this.physObjects[j];
                var dist = ball1.position.distance(ball2.position);

                if (dist < ball1.radius + ball2.radius) {
                    var m1 = ball1.mass;
                    var m2 = ball2.mass;
                    var v1 = ball1.velocity;
                    var v2 = ball2.velocity;

                    var 
                }
            }
        }
    }
}