//Class representing a 2 dimensional vector
export class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get magnitude() {
        return Math.sqrt(Math.pow(x, 2) * Math.pow(y, 2));
    }

    scalarMult(scalar) {
        newX *= scalar;
        newY *= scalar;

        return new Vector2(newX, newY);
    }

    scalarDiv(scalar) {
        newX /= scalar;
        newY /= scalar;

        return new Vector2(newX, newY);
    }

    dot(vector) {
        
    }

    get direction() {
        arctan = Math.atan(this.y / this.x); //The inverse tangnet of y / x

        if (this.x == 0) {
            if (this.y == 0) {
                return null;
            }//End if
            else if (this.y > 0) {
                return Math.PI / 2;
            }//End else if
            else {
                return 3 * Math.PI / 2;
            }//End else
        }//End if

        else if (this.y == 0) {
            if (x > 0) {
                return 0.0;
            }//End if
            else {
                return Math.PI;
            }//End else
        }//End else if

        else if (this.x < 0) {
            return Math.PI + arctan;
        }//End else

        else if (y > 0) {
            return arctan;
        }//End else if

        else {
            return 2 * Math.PI + arctan;
        }//End else
    }//End direction()
}