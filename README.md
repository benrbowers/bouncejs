# BounceJS - Bouncy Balls with JavaScript
A 2D, circles-only physics engine for adding interactive balls to a webpage.
Check out this [demo](https://www.benbowers.net/bouncejs/demo/index.html)

## Usage
BounceJS draws on an html canvas, so the first thing you will want to do is place a canvas wherever it is that you want bouncyballs.
```
<canvas id="bouncejs-canvas"></canvas>
```

Now you can pass that canvas to an instance of the `Engine` class along with the background color. Notice that the width and height are defined manually. This is necessary for the engine to pick up the width and height.
```
import { Engine } from './bouncejs/Engine.js';

const canvas = document.getElementById('bouncejs-canvas');
canvas.width = 500;
canvas.height = 500;

const engine = new Engine(canvas, 'white');
```

Now that the engine is instantiated, you can add balls to it and start it.
```
import { Engine } from './bouncejs/Engine.js';
import { Ball } from './bouncejs/Ball.js';

const canvas = document.getElementById('bouncejs-canvas');
canvas.width = 500;
canvas.height = 500;

const engine = new Engine(canvas, 'white');

const smallFastRedBall = new Ball();
ball.radius = 50;
ball.color = 'red';
ball.position.x = Math.random() * canvas.width; // Random position
ball.position.y = Math.random() * canvas.height;
ball.velocity.x = 150; // The unit for velocity is pixels/second
ball.velocity.y = 150;
engine.add(smallFastRedBall);

const bigSlowBlueBall = new Ball();
ball.radius = 150;
ball.color = 'blue';
ball.position.x = Math.random() * canvas.width; // Random position
ball.position.y = Math.random() * canvas.height;
ball.velocity.x = 50; // The unit for velocity is pixels/second
ball.velocity.y = 50;
engine.add(bigSlowBlueBall);

engine.start(); // Start the engine
```

The canvas you put on your page should now have 2 balls bouncing around inside.
