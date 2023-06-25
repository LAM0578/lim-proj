
/**
 * Custom int class for serialze
 */
class int {
    /**
     * Custom int class for serialze
     * @param {number} v Number
     */
    constructor(v) {
        this.value = v;
    }

    /**
     * Parse the string to the int and return a new custom int class
     * @param {String} v The string
     * @param {Number} radix The base of the number
     * @returns A new custom int class of the parsed number
     */
    static parse(v, radix) {
        let p = parseInt(v, radix);
        if (isNaN(p)) {
            throw new Error(`Illegal value: ${v}`);
        }
        let r = new int(p);
        return r;
    }

    /**
    * this.value + other
    * @param {number} other Other object
    * @returns {int} The result of this.value + other
    */
    add(other) {
        return new int(this.value + (typeof other === "number" ? other : other.value));
    }

    /**
    * this.value - other
    * @param {number} other Other object
    * @returns {int} The result of this.value - other
    */
    subtract(other) {
        return new int(this.value - (typeof other === "number" ? other : other.value));
    }

    /**
    * this.value * other
    * @param {number} other Other object
    * @returns {int} The result of this.value * other
    */
    multiply(other) {
        return new int(this.value * (typeof other === "number" ? other : other.value));
    }

    /**
    * this.value / other
    * @param {number} other Other object
    * @returns {int} The result of this.value / other
    */
    divide(other) {
        return new int(this.value / (typeof other === "number" ? other : other.value));
    }

    /**
    * this.value % other
    * @param {number} other Other object
    * @returns {int} The result of this.value % other
    */
    modulo(other) {
        return new int(this.value % (typeof other === "number" ? other : other.value));
    }

    /**
    * this.value == other
    * @param {number} other Other object
    * @returns {int} The result of this.value == other
    */
    equals(other) {
        return new int(this.value == (typeof other === "number" ? other : other.value));
    }

    /**
    * this.value != other
    * @param {number} other Other object
    * @returns {int} The result of this.value != other
    */
    notEquals(other) {
        return new int(this.value != (typeof other === "number" ? other : other.value));
    }

    /**
    * this.value === other
    * @param {number} other Other object
    * @returns {int} The result of this.value === other
    */
    strictEquals(other) {
        return new int(this.value === (typeof other === "number" ? other : other.value));
    }

    /**
    * this.value !== other
    * @param {number} other Other object
    * @returns {int} The result of this.value !== other
    */
    strictNotEquals(other) {
        return new int(this.value !== (typeof other === "number" ? other : other.value));
    }

    /**
    * this.value > other
    * @param {number} other Other object
    * @returns {int} The result of this.value > other
    */
    greaterThen(other) {
        return new int(this.value > (typeof other === "number" ? other : other.value));
    }

    /**
    * this.value < other
    * @param {number} other Other object
    * @returns {int} The result of this.value < other
    */
    lessThen(other) {
        return new int(this.value < (typeof other === "number" ? other : other.value));
    }

    /**
    * this.value >= other
    * @param {number} other Other object
    * @returns {int} The result of this.value >= other
    */
    greaterThenOrEqual(other) {
        return new int(this.value >= (typeof other === "number" ? other : other.value));
    }

    /**
    * this.value <= other
    * @param {number} other Other object
    * @returns {int} The result of this.value <= other
    */
    lessThenOrEqual(other) {
        return new int(this.value <= (typeof other === "number" ? other : other.value));
    }

    /**
    * this.value && other
    * @param {number} other Other object
    * @returns {int} The result of this.value && other
    */
    logicalAnd(other) {
        return new int(this.value && (typeof other === "number" ? other : other.value));
    }

    /**
    * this.value || other
    * @param {number} other Other object
    * @returns {int} The result of this.value || other
    */
    logicalOr(other) {
        return new int(this.value || (typeof other === "number" ? other : other.value));
    }

    /**
    * +this.value
    * @returns The result of + this.value
    */
    valueOf() {
        return new int(+this.value);
    }

    /**
    * -this.value
    * @returns The result of - this.value
    */
    negate() {
        return new int(-this.value);
    }

    toString() {
        return this.value.toFixed(0);
    }
}

/**
 * Custom float class for serialze
 */
class float {
    /**
     * Custom float class for serialze
     * @param {number} v Number
     */
    constructor(v) {
        this.value = v;
    }

    /**
     * Parse the string to the float and return a new custom float class
     * @param {String} v The string
     * @returns A new custom float class of the parsed number
     */
    static parse(v) {
        let p = parseFloat(v);
        if (isNaN(p)) {
            throw new Error(`Illegal value: ${v}`);
        }
        let r = new float(p);
        return r;
    }

    /**
    * this.value + other
    * @param {number} other Other object
    * @returns {float} The result of this.value + other
    */
    add(other) {
        return new float(this.value + (typeof other === "number" ? other : other.value));
    }

    /**
    * this.value - other
    * @param {number} other Other object
    * @returns {float} The result of this.value - other
    */
    subtract(other) {
        return new float(this.value - (typeof other === "number" ? other : other.value));
    }

    /**
    * this.value * other
    * @param {number} other Other object
    * @returns {float} The result of this.value * other
    */
    multiply(other) {
        return new float(this.value * (typeof other === "number" ? other : other.value));
    }

    /**
    * this.value / other
    * @param {number} other Other object
    * @returns {float} The result of this.value / other
    */
    divide(other) {
        return new float(this.value / (typeof other === "number" ? other : other.value));
    }

    /**
    * this.value % other
    * @param {number} other Other object
    * @returns {float} The result of this.value % other
    */
    modulo(other) {
        return new float(this.value % (typeof other === "number" ? other : other.value));
    }

    /**
    * this.value == other
    * @param {number} other Other object
    * @returns {float} The result of this.value == other
    */
    equals(other) {
        return new float(this.value == (typeof other === "number" ? other : other.value));
    }

    /**
    * this.value != other
    * @param {number} other Other object
    * @returns {float} The result of this.value != other
    */
    notEquals(other) {
        return new float(this.value != (typeof other === "number" ? other : other.value));
    }

    /**
    * this.value === other
    * @param {number} other Other object
    * @returns {float} The result of this.value === other
    */
    strictEquals(other) {
        return new float(this.value === (typeof other === "number" ? other : other.value));
    }

    /**
    * this.value !== other
    * @param {number} other Other object
    * @returns {float} The result of this.value !== other
    */
    strictNotEquals(other) {
        return new float(this.value !== (typeof other === "number" ? other : other.value));
    }

    /**
    * this.value > other
    * @param {number} other Other object
    * @returns {float} The result of this.value > other
    */
    greaterThen(other) {
        return new float(this.value > (typeof other === "number" ? other : other.value));
    }

    /**
    * this.value < other
    * @param {number} other Other object
    * @returns {float} The result of this.value < other
    */
    lessThen(other) {
        return new float(this.value < (typeof other === "number" ? other : other.value));
    }

    /**
    * this.value >= other
    * @param {number} other Other object
    * @returns {float} The result of this.value >= other
    */
    greaterThenOrEqual(other) {
        return new float(this.value >= (typeof other === "number" ? other : other.value));
    }

    /**
    * this.value <= other
    * @param {number} other Other object
    * @returns {float} The result of this.value <= other
    */
    lessThenOrEqual(other) {
        return new float(this.value <= (typeof other === "number" ? other : other.value));
    }

    /**
    * this.value && other
    * @param {number} other Other object
    * @returns {float} The result of this.value && other
    */
    logicalAnd(other) {
        return new float(this.value && (typeof other === "number" ? other : other.value));
    }

    /**
    * this.value || other
    * @param {number} other Other object
    * @returns {float} The result of this.value || other
    */
    logicalOr(other) {
        return new float(this.value || (typeof other === "number" ? other : other.value));
    }

    /**
    * +this.value
    * @returns The result of + this.value
    */
    valueOf() {
        return new float(+this.value);
    }

    /**
    * -this.value
    * @returns The result of - this.value
    */
    negate() {
        return new float(-this.value);
    }

    toString() {
        let dig = this.value.toString().split('.')[1];
        let ret = this.value.toFixed(Math.max(dig ? dig.length : 0, 1));
        return ret;
    }
}
