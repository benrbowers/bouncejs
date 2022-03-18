import { Vector2 } from './Vector2.js';
import { Ball } from './Ball.js';
import { Engine } from './Engine.js';

let canvas = document.querySelector('canvas');
canvas.height = window.innerHeight / 2;
canvas.width = window.innerWidth * 2 / 3;

let engine = new Engine(canvas, '#121212');
engine.start();

/**
 * Toggles a given toggle switch
 * @param {HTMLDivElement} toggleSwitch 
 */
function toggle() {
    let toggleSwitch = this;
    let slider = toggleSwitch.children[0];
    let label = toggleSwitch.parentElement.children[0];

    console.log(window.getComputedStyle(slider).width);
    if (window.getComputedStyle(slider).right == '0px') {
        let sliderContainerWidth = parseInt(window.getComputedStyle(toggleSwitch).width.split('px')[0]);
        let sliderWidth = parseInt(window.getComputedStyle(slider).width.split('px')[0]);
        let sliderMargin = parseInt(window.getComputedStyle(slider).marginRight.split('px')[0]);

        slider.style.right = (sliderContainerWidth - (sliderWidth + sliderMargin * 2)) + 'px';
        slider.parentNode.style.backgroundColor = 'gray';

        label.textContent = 'Collisions: OFF'

        engine.physObjects.forEach((ball) => {
            ball.collidesWithObjects = false;
        });
    } else {
        slider.style.right = '0px';
        slider.parentNode.style.backgroundColor = 'royalblue';

        label.textContent = 'Collisions: ON'

        engine.physObjects.forEach((ball) => {
            ball.collidesWithObjects = true;
        });
    }
}

/**
 * Updates the value from an html slider
 * @param {HTMLInputElement} slider 
 */
function updateSlider() {
    let slider = this;
    let vec = new Vector2(5, 6);
    console.log(vec.x);
    let value = parseInt(slider.value);
    let label = slider.parentElement.children[0];
    let labelText = label.textContent.split(' ')[0];

    if (labelText == 'Drag:') {
        value = (value / 100).toFixed(2);
    }

    label.textContent = labelText + ' ' + value;

    if (labelText == 'Gravity:') {
        engine.physObjects.forEach((ball) => {
            ball.gravity = parseFloat(value);
        })
    } else if (labelText == 'Drag:') {
        engine.physObjects.forEach((ball) => {
            ball.drag = parseFloat(value);
        })
    }
}

function addBall() {
    let inputs = document.querySelectorAll('.ball-creator input');
    let ball = new Ball();

    let check = new Option().style;
    let color = inputs[0].value.toLowerCase();
    check.color = color;

    if (color == '') {
        alert('Please enter a color. (red, blue, #000000, etc.)');
    } else if (check.color == color) {

        ball.color = color;
        ball.radius = parseInt(inputs[1].value);
        ball.velocity.x = parseInt(inputs[2].value);
        ball.velocity.y = parseInt(inputs[3].value);
        ball.position.x = Math.random() * canvas.width;
        ball.position.y = Math.random() * canvas.height;

        engine.add(ball);
    } else {
        alert('\"' + inputs[0].value + '\" is not a valid CSS color.')
    }
}

let sliders = document.querySelectorAll('.slider');
sliders.forEach((slider) => {
    slider.onmousemove = updateSlider;
    slider.ontouchmove = updateSlider;
    slider.onmousemove(); //Set value on page load
})

let toggleSwitch = document.querySelector('.toggle');
toggleSwitch.onmousedown = toggle;
toggleSwitch.ontouchmove = toggle;

let addButton = document.querySelector('.add-button');
addButton.onclick = addBall;