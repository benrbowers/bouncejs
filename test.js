import { Vector2 } from './Vector2.js';
import { Ball } from './Ball.js';
import { Engine } from './Engine.js';

var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight / 2;
var gravity = 300;
var gravityOn = true;
var engine = new Engine(canvas, '#1E1E1E', 0);

engine.onMouseDown = function (event) {
    console.log('press');
    this.mouseHeld = true;

    this.physObjects.forEach(ball => {
        if (ball.position.distance(this.mousePos) < ball.radius) {
            this.selectedObject = ball;
        }
    });
};

for (var theta = 0; theta < 2 * Math.PI; theta += 2 * Math.PI / 10) {
    var ball = new Ball(50, 'blue');
    ball.position = new Vector2(375 + 300 * Math.cos(theta), 375 + 300 * Math.sin(theta));
    
    var dir = new Vector2(Math.cos(theta), Math.sin(theta));
    ball.velocity = dir.scalarMult(100);
    ball.gravity = 300;
    ball.drag = 0.1;
    engine.add(ball);
}

engine.start();

var check = document.querySelector('input');
check.checked = true;

var switchGravity = function() {
    console.log('check');
    if (gravityOn) {
        engine.physObjects.forEach(ball => {
            ball.gravity = 0;
        });
        check.checked = false;
        gravityOn = false;
    } else {
        engine.physObjects.forEach(ball => {
            ball.gravity = gravity;
        });
        check.checked = true;
        gravityOn = true;
    }
}

check.onclick = switchGravity;