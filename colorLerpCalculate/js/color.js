
class color {
    constructor(r, g, b) {
        this.r = Math.abs(Math.floor(r) % 256);
        this.g = Math.abs(Math.floor(g) % 256);
        this.b = Math.abs(Math.floor(b) % 256);
    }

    /**
     * Parse the string hex color to a new color object.
     * 
     * eg. parse("#ff0000"), parse("ff0000")
     * 
     * @param {String} hex The string hex color
     * @returns Return a new color object if parse success, overwise return undefinded.
     */
    static parse(hex) {
        if (hex.length > 0 && hex[0] == '#') {
            hex = hex.substring(1);
        }
        if (hex.length < 6) {
            return;
        }

        let isUndefOrNaN = (obj) => obj === undefined || isNaN(obj);
    
        var r = parseInt(hex.substring(0, 2), 16);
        var g = parseInt(hex.substring(2, 4), 16);
        var b = parseInt(hex.substring(4, 6), 16);

        if (
            isUndefOrNaN(r) ||
            isUndefOrNaN(g) ||
            isUndefOrNaN(b)
        ) {
            return;
        }

        return new color(r, g, b);
    }

    /**
     * Calculate the color between the color a and the color b by the progress.
     * @param {color} a The color a
     * @param {color} b The color b
     * @param {Number} p The progress
     * @returns The color between the color a and the color b.
     */
    static lerp(a, b, p) {
        let l = (_a, _b) => _a * (1 - p) + _b * p;
        return new color(
            l(a.r, b.r),
            l(a.g, b.g),
            l(a.b, b.b)
        );
    }

    /**
     * Return a string hex color of this color object.
     * @returns A string hex color of this color object.
     */
    toString() {
        let hexNum = (n) => n.toString(16).padStart(2, '0');
        return `#${hexNum(this.r)}${hexNum(this.g)}${hexNum(this.b)}`;
    }
}