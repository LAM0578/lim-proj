

function floor(x) {
    return Math.floor(x);
}

// Like "dX" in C#
function dformat(x, n) {
    if (typeof x === "string") {
        x = parseInt(x);
    }
    return x.toString().padStart(n, '0');
}

// Like "fX" in C#
function fformat(x, n) {
    if (typeof x === "string") {
        x = parseFloat(x);
    }
    return x.toFixed(n);
}