//A 2 dimensional vector
export class Vector2 {
    /**
     * Create Vector2
     * @param {number} x    The x component of the vector.
     * @param {number} y    The y component of the vector.
     */
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    /**
     * The magnitude of the vector.
     */
    get magnitude() {
        return Math.sqrt((this.x ** 2) + (this.y ** 2));
    }

    /**
     * Multiplies this vector by a scalar and returns the resultant vector. This vector is not changed.
     * @param   {number}  scalar   The scalar to be multiplied by.
     * @returns {Vector2}          The new vector.
     */
    scalarMult(scalar) {
        var newX = this.x * scalar;
        var newY = this.y * scalar;

        return new Vector2(newX, newY);
    }

    /**
     * Divides this vector by a scalar and returns the resultant vector. This vector is not changed.
     * @param   {number}   scalar   The scalar to be divided by.
     * @returns {Vector2}           The resultant vector.
     */
    scalarDiv(scalar) {
        var newX = this.x / scalar;
        var newY = this.y / scalar;

        return new Vector2(newX, newY);
    }

    /**
     * Returns the dot product of this vector and another vector. This vector is not changed.
     * @param   {Vector2} vector   The other vector.
     * @returns {number}           The resultant scalar value.
     */
    dot(vector) {
        return (this.x * vector.x) + (this.y * vector.y);
    }

    /**
     * Returns the cross product of this vector and another vector. This vector is not changed.
     * @param   {Vector2} vector   The other vector.
     * @returns {Vector2}          The resultant vector.
     */
    cross(vector) {
        var newX = this.x * vector.y;
        var newY = -(this.y * vector.x);

        return new Vector2(newX, newY);
    }

    /**
     * Adds another vector to this vector and returns the resultant vector. This vector is not changed.
     * @param   {Vector2} vector   The other vector.
     * @returns {Vector2}          The resultant vector.
     */
    add(vector) {
        var newX = this.x + vector.x;
        var newY = this.y + vector.y;

        return new Vector2(newX, newY);
    }

    /**
     * Subtracts another vector from this vector and returns the resultant vector. This vector is not changed.
     * @param   {Vector2} vector   The other vector.
     * @returns {Vector2}          The resultant vector.
     */
    subtract(vector) {
        var newX = this.x - vector.x;
        var newY = this.y - vector.y;

        return new Vector2(newX, newY);
    }

    /**
     * The direction of the vector in radians measured counter-clockwise from the positive x-axis.
     */
    get direction() {
        var arctan = Math.atan(this.y / this.x); // The inverse tangnet of y / x

        if (this.x == 0) {
            if (this.y == 0) {
                return null;
            }// End if
            else if (this.y > 0) {
                return Math.PI / 2;
            }// End else if
            else {
                return 3 * Math.PI / 2;
            }// End else
        }// End if

        else if (this.y == 0) {
            if (this.x > 0) {
                return 0.0;
            }// End if
            else {
                return Math.PI;
            }// End else
        }// End else if

        else if (this.x < 0) {
            return Math.PI + arctan;
        }// End else

        else if (this.y > 0) {
            return arctan;
        }// End else if

        else {
            return 2 * Math.PI + arctan;
        }// End else
    }// End direction()

    /**
     * The unit vector defined by this vector (i.e., a vector with the same direction and a magnitude of 1.0)
     */
    get unit() {
        return this.scalarDiv(this.magnitude);
    }

    /**
     * Returns the distance between the end of this vector and another vector.
     * @param   {Vector2} vector - The other vector.
     * @returns {number}         The distance.
     */
    distance(vector) {
        var x1 = this.x;
        var x2 = vector.x;
        var y1 = this.y;
        var y2 = vector.y;

        var dist = Math.sqrt(((x1 - x2) ** 2) + ((y1 - y2) ** 2));
        return dist;
    }
}//End Vector2