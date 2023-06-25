

function parseBool(bol) {
    var idx = ['false', 'true'].indexOf(bol.toLowerCase());
    return idx > 0;
}

function setCookie(name, val, exd) {
    var d = new Date();
    d.setTime(d.getTime() + exd * 24 * 60 * 60 * 1000);

    var ex = `expires=${d.toUTCString()}`;
    document.cookie = `${name}=${val}; ${ex}`;
}

function getCookie(name) {
    var n = `${name}=`;
    var cl = document.cookie.split(';');

    for (const i of cl) {
        var c = i.trim();
        if (c.indexOf(n) === 0) {
            return c.substring(n.length, c.length);
        }
    }

    return "";
}