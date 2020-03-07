import { Vector2 } from './Vector2.js';
import { Ball } from './Ball.js';

var canvas2D = document.querySelector('canvas').getContext('2d');
var date = new Date();
var speed = 0.01;

var ball = new Ball(30, 'red');
ball.position = new Vector2(150, 150);
var i = 0;

function start() {
    canvas2D.fillStyle = 'white';
    canvas2D.fillRect(0, 0, 300, 300);

    ball.position.y = 100 * Math.sin(i += 0.1) + 150;
    console.log(Date.now());
    ball.draw(canvas2D);

    requestAnimationFrame(start);
}

start();
