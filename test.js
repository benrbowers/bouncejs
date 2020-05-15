import { Vector2 } from './Vector2.js';
import { Ball } from './Ball.js';
import { Engine } from './Engine.js';

var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight / 2;
var gravity = 300;
var gravityOn = true;
var engine = new Engine(canvas, '#1E1E1E', 0);

for (var theta = 0; theta < 2 * Math.PI; theta += 2 * Math.PI / 10) {
    var ball = new Ball(50, 'blue');
    ball.position = new Vector2(375 + 300 * Math.cos(theta), 375 + 300 * Math.sin(theta));
    
    var dir = new Vector2(Math.cos(theta), Math.sin(theta));
    ball.velocity = dir.scalarMult(100);
    ball.gravity = 300;
    ball.drag = 0.1;
    engine.add(ball);
}

engine.setOnObjectRelease(function () {
    if (engine.selectedObject !== null) {

        //Time since last mouse movement
        if (engine.mouseTimeStamp != 0) {
            engine.mouseElapsedTime = (Date.now() - engine.mouseTimeStamp) / 1000;
        }

        if (engine.mouseElapsedTime < 0.03) { //Ensure a recent velocity is used
            engine.selectedObject.velocity = new Vector2(engine.mouseVel.x, engine.mouseVel.y);
        } else {
            engine.selectedObject.velocity = new Vector2(0, 0);
        }
    }
});

engine.setOnObjectPress(function () {
    console.log('Object Pressed')
});

engine.setWhileObjectHeld(function() {
    engine.selectedObject.velocity.x = 0;
    engine.selectedObject.velocity.y = 0;

    engine.selectedObject.position.x = this.mousePos.x;
    engine.selectedObject.position.y = this.mousePos.y;
});

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