import { Ball } from './Ball.js';
import { Vector2 } from './Vector2.js';

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
	 *
	 */
	constructor(
		canvas,
		backgrndColor,
		borderWidth = 0,
		physObjects = new Array(0)
	) {
		canvas.style.borderWidth = borderWidth + 'px';

		this.canvas = canvas;
		this.canvas2D = this.canvas.getContext('2d');
		this.backgrndColor = backgrndColor;
		this.borderWidth = borderWidth;
		this.physObjects = physObjects;
		this.width = canvas.width;
		this.height = canvas.height;
		this.timeStamp = 0;
		this.elapsedTime = 0;
		this.mouseTimeStamp = 0;
		this.mouseElapsedTime = 0;
		this.selectedObject = null;
		this.mouseHeld = false;
		this.mousePos = new Vector2();
		this.mouseVel = new Vector2();

		this.onObjectPress = function () {};
		this.onObjectRelease = function () {};
		this.whileObjectHeld = function () {};

		canvas.width = canvas.height * (canvas.clientWidth / canvas.clientHeight); //Ensure correct aspect ratio of canvas

		//canvas.onmouseup = this.onMouseUp.bind(this);
		window.addEventListener('mouseup', this.onMouseUp.bind(this));
		//canvas.onmousedown = this.onMouseDown.bind(this);
		window.addEventListener('mousedown', this.onMouseDown.bind(this));
		//canvas.onmousemove = this.onMouseMove.bind(this);
		window.addEventListener('mousemove', this.onMouseMove.bind(this));
		//canvas.ontouchstart = this.onTouchStart.bind(this);
		window.addEventListener('touchstart', this.onTouchStart.bind(this));
		//canvas.ontouchend = this.onMouseUp.bind(this);
		window.addEventListener('touchend', this.onMouseUp.bind(this));
		//canvas.ontouchmove = this.onTouchMove.bind(this);
		window.addEventListener('touchmove', this.onTouchMove.bind(this));
	}

	onMouseMove(event) {
		var rect = this.canvas.getBoundingClientRect();

		var oldMousePos = new Vector2(this.mousePos.x, this.mousePos.y);

		this.mousePos.x = event.pageX - rect.left;
		this.mousePos.y = event.pageY - rect.top;

		//Time since last mouse movement
		if (this.mouseTimeStamp != 0) {
			this.mouseElapsedTime = (Date.now() - this.mouseTimeStamp) / 1000;
			//console.log('elapsed time: ' + this.mouseElapsedTime);
		}
		this.mouseTimeStamp = Date.now();

		this.mouseVel = this.mousePos
			.subtract(oldMousePos)
			.scalarDiv(this.mouseElapsedTime);

		if (this.selectedObject != null) {
			//Clear text highlight
			var sel = window.getSelection
				? window.getSelection()
				: document.selection;
			if (sel) {
				if (sel.removeAllRanges) {
					sel.removeAllRanges();
				} else if (sel.empty) {
					sel.empty();
				}
			}
		}
	}

	/**
	 * Allows user to add functionality to onMouseMove
	 * @param {Function} userFunction
	 */
	setOnMouseMove(userFunction) {
		let move = this.onMouseMove.bind(this);
		this.canvas.onmousemove = function (event) {
			move(event);
			userFunction();
		};
	}

	onMouseDown() {
		console.log('press');
		this.mouseHeld = true;

		this.physObjects.forEach((ball) => {
			if (ball.position.distance(this.mousePos) < ball.radius) {
				this.selectedObject = ball;
				this.onObjectPress();
			}
		});
	}

	/**
	 * Allows user to add functionality to onMouseDown
	 * @param {Function} userFunction
	 */
	setOnMouseDown(userFunction) {
		let down = this.onMouseDown.bind(this);
		this.canvas.onmousedown = function () {
			down();
			userFunction();
		};
	}

	onMouseUp() {
		console.log('release');
		this.mouseHeld = false;

		if (this.selectedObject !== null) {
			this.onObjectRelease();
			this.selectedObject = null;
		}
	}

	/**
	 * Allows user to add functionality to onMouseUp
	 * @param {Function} userFunction
	 */
	setOnMouseUp(userFunction) {
		let up = this.onMouseUp.bind(this);
		this.canvas.onmouseup = function () {
			up();
			userFunction();
		};
	}

	onTouchMove(event) {
		var rect = this.canvas.getBoundingClientRect();

		var oldMousePos = new Vector2(this.mousePos.x, this.mousePos.y);

		this.mousePos.x = event.touches[0].pageX - rect.left;
		this.mousePos.y = event.touches[0].pageY - rect.top;
		console.log(this.mousePos.x);

		//Time since last mouse movement
		if (this.mouseTimeStamp != 0) {
			this.mouseElapsedTime = (Date.now() - this.mouseTimeStamp) / 1000;
		}
		this.mouseTimeStamp = Date.now();

		this.mouseVel = this.mousePos
			.subtract(oldMousePos)
			.scalarDiv(this.mouseElapsedTime);
	}

	/**
	 * Allows user to add functionality to onTouchMove
	 * @param {Function} userFunction
	 */
	setOnTouchMove(userFunction) {
		let move = this.onTouchMove.bind(this);
		this.canvas.ontouchmove = function (event) {
			move(event);
			userFunction();
		};
	}

	onTouchStart(event) {
		console.log('press');
		this.mouseHeld = true;

		var rect = this.canvas.getBoundingClientRect();

		this.mousePos.x = event.touches[0].pageX - rect.left;
		this.mousePos.y = event.touches[0].pageY - rect.top;
		console.log(this.mousePos.y);

		this.physObjects.forEach((ball) => {
			if (ball.position.distance(this.mousePos) < ball.radius) {
				this.selectedObject = ball;
				this.onObjectPress();
			}
		});
	}

	/**
	 * Allows user to add functionality to onTouchStart
	 * @param {Function} userFunction
	 */
	setOnTouchStart(userFunction) {
		let touchStart = this.onTouchStart.bind(this);
		this.canvas.ontouchmove = function (event) {
			touchStart(event);
			userFunction();
		};
	}

	/**
	 * Sets onObjectPress to the specified function
	 * @param {Function} userFunction
	 */
	setOnObjectPress(userFunction) {
		this.onObjectPress = userFunction;
	}

	/**
	 * Sets onObjectRelease to the specified function
	 * @param {Function} userFunction
	 */
	setOnObjectRelease(userFunction) {
		this.onObjectRelease = userFunction;
	}

	/**
	 * Sets whileObjectHeld to the specified function
	 * @param {Function} userFunction
	 */
	setWhileObjectHeld(userFunction) {
		this.whileObjectHeld = userFunction;
	}

	start() {
		if (this.mouseHeld) {
			if (this.selectedObject !== null) {
				this.whileObjectHeld();
			}
		}

		// Check collisions with other balls
		this.physObjects.forEach((ball1) => {
			if (ball1.collidesWithObjects) {
				this.physObjects.forEach((ball2) => {
					if (ball2.collidesWithObjects) {
						var dist = ball1.position.distance(ball2.position);

						if (ball1 !== ball2 && dist < ball1.radius + ball2.radius) {
							//console.log('Collision');

							// Handle overlap
							var overlap = (ball1.radius + ball2.radius - dist) / 2;

							ball1.position.x -=
								(overlap / dist) * (ball2.position.x - ball1.position.x);
							ball1.position.y -=
								(overlap / dist) * (ball2.position.y - ball1.position.y);
							ball2.position.x -=
								(overlap / dist) * (ball1.position.x - ball2.position.x);
							ball2.position.y -=
								(overlap / dist) * (ball1.position.y - ball2.position.y);

							// Distance between centers of the circles
							var centerDistance = ball1.position.distance(ball2.position);

							// Normal unit vector
							var normal = new Vector2(
								ball2.position.x - ball1.position.x,
								ball2.position.y - ball1.position.y
							);
							normal = normal.scalarDiv(centerDistance);

							// Tangnet unit vector
							var tangent = new Vector2(-normal.y, normal.x);

							// Get velocities in new coordinates by dotting with the normal and tangent
							var v1 = new Vector2(
								ball1.velocity.dot(normal),
								ball1.velocity.dot(tangent)
							);
							var v2 = new Vector2(
								ball2.velocity.dot(normal),
								ball2.velocity.dot(tangent)
							);
							var m1 = ball1.mass;
							var m2 = ball2.mass;

							// Calculate the new normal velocities using 1D conservation of momentum
							var v1x = ((m1 - m2) * v1.x + 2 * m2 * v2.x) / (m1 + m2);
							var v2x = ((m2 - m1) * v2.x + 2 * m1 * v1.x) / (m1 + m2);
							v1.x = v1x;
							v2.x = v2x;

							// x and y axes from the perspective of the new coordinates
							var xAxis = new Vector2(normal.x, -normal.y);
							var yAxis = new Vector2(-tangent.x, tangent.y);

							// Update ball velocities
							ball1.velocity.x = v1.dot(xAxis);
							ball1.velocity.y = v1.dot(yAxis);
							ball2.velocity.x = v2.dot(xAxis);
							ball2.velocity.y = v2.dot(yAxis);

							ball1.onObjectCollison();
							ball2.onObjectCollison();

							// javidx9 way to Update ball velocities
							// ball1.velocity.x = tangent.x * v1.y + normal.x * v1.x;
							// ball1.velocity.y = tangent.y * v1.y + normal.y * v1.x;
							// ball2.velocity.x = tangent.x * v2.y + normal.x * v2.x;
							// ball2.velocity.y = tangent.y * v2.y + normal.y * v2.x;
						} // end if
					} // end if
				}); // end forEach
			} // end if
		}); // end forEach

		// Check collisions with walls (borders of canvas)
		this.physObjects.forEach((ball) => {
			if (ball.collidesWithWalls) {
				if (ball.position.x - ball.radius < 0) {
					ball.position.x += ball.radius - ball.position.x;
					ball.velocity.x = -ball.velocity.x;
					ball.onWallCollision();
				} // end if

				if (ball.position.x + ball.radius > this.width) {
					ball.position.x -= ball.radius - (this.width - ball.position.x);
					ball.velocity.x = -ball.velocity.x;
					ball.onWallCollision();
				} //end if

				if (ball.position.y - ball.radius < 0) {
					ball.position.y += ball.radius - ball.position.y;
					ball.velocity.y = -ball.velocity.y;
					ball.onWallCollision();
				} //end if

				if (ball.position.y + ball.radius > this.height) {
					ball.position.y -= ball.radius - (this.height - ball.position.y);
					ball.velocity.y = -ball.velocity.y;
					ball.onWallCollision();
				} //end if
			} //end if
		}); //end forEach

		//Time since last update
		if (this.timeStamp != 0) {
			this.elapsedTime = (Date.now() - this.timeStamp) / 1000;
			//console.log('elapsed time: ' + this.elapsedTime);
		}
		this.timeStamp = Date.now();

		//Update physics of balls
		this.physObjects.forEach((ball) => {
			ball.position.x += ball.velocity.x * this.elapsedTime;
			ball.position.y += ball.velocity.y * this.elapsedTime;

			ball.acceleration.x = ball.drag * -ball.velocity.x;
			ball.acceleration.y = ball.drag * -ball.velocity.y;

			ball.velocity.x += ball.acceleration.x * this.elapsedTime;
			ball.velocity.y +=
				(ball.acceleration.y + ball.gravity) * this.elapsedTime;

			if (ball.velocity.magnitude < 1) {
				ball.velocity = new Vector2(0, 0);
			}
		});

		this.canvas2D.fillStyle = this.backgrndColor;
		this.canvas2D.fillRect(0, 0, this.width, this.height);

		//Draw the balls
		this.physObjects.forEach((ball) => {
			ball.draw(this.canvas);
		});
		requestAnimationFrame(this.start.bind(this));
	} //end start()

	/**
	 *
	 * @param {Function} userFunction
	 */
	setOnFrame(userFunction) {
		let oldStart = this.start.bind(this);
		this.start = function () {
			oldStart();
			userFunction();
		};
	}

	/**
	 * Adds another object to the engine
	 * @param {Ball} ball
	 */
	add(ball) {
		this.physObjects.push(ball);
		ball.draw(this.canvas);
	}
} //end Engine
