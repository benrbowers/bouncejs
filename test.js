import { Vector2 } from './Vector2.js';
import { Ball } from './Ball.js';
import { Engine } from './Engine.js';

var canvas = document.querySelector('canvas');

var ball = new Ball(30, 'red');
ball.position = new Vector2(50, 50);
ball.velocity = new Vector2(5, 5);
ball.draw(canvas.getContext('2d'));

var engine = new Engine(canvas, 'pink');
engine.add(ball);
engine.start();
