import { Ball } from "./Ball.js";
import { Vector2 } from "./Vector2.js";

/**
 * Physics engine that handles physics objects
 */
class Engine {
    /**
     * Creates engine
     * @param {HTMLCanvasElement} canvas        - Canvas to draw objects on.
     * @param {number}            width         - Width of canvas.
     * @param {number}            height        - Height of canvas.
     * @param {String}            backgrndColor - CSS color value.
     * @param {Array.<Ball>}      physObjects   - Array of physics objects in the engine.
     */
    constructor(canvas, backgrndColor, physObjects = new Array(0)) {
        this.canvas = canvas.getContext('2d');
        this.backgrndColor = backgrndColor;
        this.physObjects = physObjects;
        this.width = canvas.width;
        this.height = canvas.height;
    }

    start() {
        this.canvas.fillStyle = this.backgrndColor;
        this.canvas.fillRect(0, 0)
        for (var i = 0; i < this.physObjects.length; i++) {
            var ball = this.physObjects[i];
            ball.draw(this.canvas);

            for (var j = 0; j < this.physObjects.length; j++) {
                var ball1 = this.physObjects[i];
                var ball2 = this.physObjects[j];
                var dist = ball1.position.distance(ball2.position);

                if (dist < ball1.radius + ball2.radius && ball1 != ball2) {
                    var m1 = ball1.mass;
                    var m2 = ball2.mass;
                    var v1 = ball1.velocity;
                    var v2 = ball2.velocity;

                    //Distance between centers of the circles
                    var centerDistance = Math.sqrt((ball1.position.x - ball2.position.x) ** 2 + (ball1.position.y - ball2.position.y) ** 2);

                    //Normal unit vector
                    var normal = new Vector2((ball2.position.x - ball1.position.x), (ball2.position.x - ball1.position.x));
                    normal = normal.scalarDiv(centerDistance);

                    //Tangnet unit vector
                    var tangent = new Vector2(-normal.y, normal.x);
                    tangent


                    ball1.velocity.x = (((m1 - m2) / (m1 + m2)) * v1.x) + (((2 * m2) / (m1 + m2)) * v2.x);
                    ball1.velocity.y = (((m1 - m2) / (m1 + m2)) * v1.y) + (((2 * m2) / (m1 + m2)) * v2.y);
                    ball2.velocity.x = (((m2 - m1) / (m1 + m2)) * v2.x) + (((2 * m1) / (m1 + m2)) * v1.x);
                    ball2.velocity.y = (((m2 - m1) / (m1 + m2)) * v2.y) + (((2 * m1) / (m1 + m2)) * v1.y);
                }//end if
            }//end for

            if (ball.position.x - ball.radius < 0) {
                ball.velocity.x = - ball.velocity.x;
            }//end if

            if (ball.position.x + ball.radius > this.width) {
                ball.velocity.x = - ball.velocity.x;
            }//end if

            if (ball.position.y - ball.radius < 0) {
                ball.velocity.y = - ball.velocity.y;
            }//end if

            if (ball.position.y + ball.radius > this.height) {
                ball.velocity.y = - ball.velocity.y;
            }//end if
        }//end for
    }//end start()
}//end Engine