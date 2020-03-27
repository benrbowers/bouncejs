import { Ball } from "./Ball.js";
import { Vector2 } from "./Vector2.js";

/**
 * Physics engine that handles physics objects
 */
export class Engine {
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
        this.timeStamp = 0;
        this.elapsedTime = 0;
    }

    start() {
        //Check collisions with other balls
        this.physObjects.forEach(ball1 => {
            this.physObjects.forEach(ball2 => {
                var dist = ball1.position.distance(ball2.position);

                if (dist < ball1.radius + ball2.radius && ball1 !== ball2) {
                    console.log('Collision');

                    //Handle overlap
                    var overlap = (ball1.radius + ball2.radius - dist) / 2;
                    
                    ball1.position.x -= overlap / dist * (ball2.position.x - ball1.position.x);
                    ball1.position.y -= overlap / dist * (ball2.position.y - ball1.position.y);
                    ball2.position.x -= overlap / dist * (ball1.position.x - ball2.position.x);
                    ball2.position.y -= overlap / dist * (ball1.position.y - ball2.position.y);

                    
                    //Distance between centers of the circles
                    var centerDistance = ball1.position.distance(ball2.position);

                    //Normal unit vector
                    var normal = new Vector2((ball2.position.x - ball1.position.x), (ball2.position.x - ball1.position.x));
                    normal = normal.scalarDiv(centerDistance);

                    //Tangnet unit vector
                    var tangent = new Vector2(-normal.y, normal.x);

                    var v1 = new Vector2(ball1.velocity.dot(normal), ball1.velocity.dot(tangent));
                    var v2 = new Vector2(ball2.velocity.dot(normal), ball2.velocity.dot(tangent));
                    var m1 = ball1.mass;
                    var m2 = ball2.mass;

                    var v1x = (((m1 - m2) * v1.x) + (2 * m2 * v2.x)) / (m1 + m2);
                    var v2x = (((m2 - m1) * v2.x) + (2 * m1 * v1.x)) / (m1 + m2);

                    v1.x = v1x;
                    v2.x = v2x;

                    //Update ball velocities
                    ball1.velocity.x = tangent.x * v1.y + normal.x * v1.x;
                    ball1.velocity.y = tangent.y * v1.y + normal.y * v1.x;
                    ball2.velocity.x = tangent.x * v2.y + normal.x * v2.x;
                    ball2.velocity.y = tangent.y * v2.y + normal.y * v2.x;

                }//end if
            });//end forEach
        });//end forEach

        //Check collisions with walls (borders of canvas)
        this.physObjects.forEach(ball => {
            if (ball.position.x - ball.radius < 0) {
                ball.position.x += ball.radius - ball.position.x;
                ball.velocity.x = - ball.velocity.x;
            }//end if

            if (ball.position.x + ball.radius > this.width) {
                ball.position.x -= ball.radius - (this.width - ball.position.x);
                ball.velocity.x = - ball.velocity.x;
            }//end if

            if (ball.position.y - ball.radius < 0) {
                ball.position.y += ball.radius - ball.position.y;
                ball.velocity.y = - ball.velocity.y;
            }//end if

            if (ball.position.y + ball.radius > this.height) {
                ball.position.y -= ball.radius - (this.height - ball.position.y);
                ball.velocity.y = - ball.velocity.y;
            }//end if
        });//end forEach

        //Time since last update
        if (this.timeStamp != 0) {
            this.elapsedTime = Date.now() - this.timeStamp;
        }
        this.timeStamp = Date.now();

        //Update positions of balls
        this.physObjects.forEach(ball => {
            ball.position.x += ball.velocity.x * this.elapsedTime;
            ball.position.y += ball.velocity.y * this.elapsedTime;
        });

        this.canvas.fillStyle = this.backgrndColor;
        this.canvas.fillRect(0, 0, this.width, this.height);
        //Draw the balls
        this.physObjects.forEach(ball => {
            ball.draw(this.canvas);
        })
        requestAnimationFrame(this.start.bind(this));
    }//end start()

    /**
     * Adds another object to the engine
     * @param {Ball} physObject 
     */
    add(physObject) {
        this.physObjects.push(physObject);
        physObject.draw(this.canvas);
    }
}//end Engine