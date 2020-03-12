import { Vector2 } from './Vector2.js';
import { Ball } from './Ball.js';

var canvas2D = document.querySelector('canvas').getContext('2d');
var date = new Date();
var speed = 0.01;

var ball = new Ball(30, 'red');
ball.position = new Vector2(50, 50);
ball.draw(canvas2D);

ball.position = new Vector2(100, 100);
ball.color = 'blue';
ball.draw(canvas2D);

