import { PhysObject } from "./PhysObject.js";

/**A ball shaped physics object */
export class Ball extends PhysObject {
    /**
     * Creates a Ball
     * @param {number} radius   The radius, in pixels, of the ball being created.
     * @param {String} color    CSS color value for the ball.
     */
    constructor(radius, color) {
        super();
        this.radius = radius;
        this.color = color;
    }

    /**
     * Draws this ball on a canvas.
     * @param {HTMLCanvasElement} canvas - 2D canvas context for drawing ball.
     */
    draw(canvas) {
        let canvas2D = canvas.getContext('2d');
        canvas2D.beginPath();
        canvas2D.fillStyle = this.color;
        canvas2D.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        canvas2D.fill();
    }
}