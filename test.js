import { Vector2 } from './Vector2.js';
import { Ball } from './Ball.js';
import { Engine } from './Engine.js';

var canvas = document.querySelector('canvas');

var ball = new Ball(30, 'red');
ball.position = new Vector2(50, 50);
ball.velocity = new Vector2(0.1, 0.2);

var ball2 = new Ball(30, 'blue');
ball2.position = new Vector2(100, 100);
ball2.velocity = new Vector2(0.2, 0.1);

var engine = new Engine(canvas, 'white');
engine.add(ball);
engine.add(ball2);
for (var i = 0; i < 10; i++) {
    var ball = new Ball(i * 10, 'green')
    ball.velocity = new Vector2(i * 0.1, -i * 10);
    engine.add(ball);
}
engine.start();
