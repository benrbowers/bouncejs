import { Ball } from '../Ball.js';

const canvas2D = document.querySelector('canvas').getContext('2d');

var ball = new Ball(30, 'red');
ball.position.x = 150;
ball.position.y = 150;

ball.draw(canvas2D);
