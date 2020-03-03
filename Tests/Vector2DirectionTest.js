import { Vector2 } from '../Vector2.js';

var vector = new Vector2(1, 0);
console.log(vector.direction * 180 / Math.PI);//0

vector.y = 1;
console.log(vector.direction * 180 / Math.PI);//45

vector.x = 0;
console.log(vector.direction * 180 / Math.PI);//90

vector.x = -1;
console.log(vector.direction * 180 / Math.PI);//135

vector.y = 0;
console.log(vector.direction * 180 / Math.PI);//180

vector.y = -1;
console.log(vector.direction * 180 / Math.PI);//225

vector.x = 0;
console.log(vector.direction * 180 / Math.PI);//270

vector.x = 1;
console.log(vector.direction * 180 / Math.PI);//315

vector.y = 0;
vector.x = 0;
console.log(vector.direction * 180 / Math.PI);