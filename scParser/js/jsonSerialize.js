
const mIndentLevel = 2

function repeatStr(char, count) {
    var r = ''
    for (let i = 0; i < count; i++) {
        r += char;
    }
    return r;
}

function serialize(obj, indentLevel) {
    var indent = '';
    var nl = '';
    var nextIndentLevel = indentLevel <= 0 ? 0 : indentLevel + mIndentLevel;
    if (indentLevel > 0) {
        nl = '\n';
        indent = repeatStr(' ', indentLevel);
    }
    if (obj === null || obj === undefined) {
        return 'null';
    } else if (typeof obj === 'string') {
        return '"' + obj.replace('"', '\"') + '"';
    } else if (obj instanceof int || obj instanceof float) {
        return obj.toString();
    } else if (typeof obj === 'number' || typeof obj === 'boolean') {
        return obj.toString();
    } else if (Array.isArray(obj)) {
        var array = obj.map(function (item) {
            // var nt = indentLevel
            return serialize(item, nextIndentLevel);
        });
        return '[' + nl + indent + array.join(',' + nl + indent) + nl + repeatStr(' ', indentLevel - mIndentLevel) + ']';
    } else if (typeof obj === 'object') {
        var properties = [];
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                var value = serialize(obj[prop], nextIndentLevel);
                properties.push(indent + '"' + prop + '": ' + value);
            }
        }
        return '{' + nl + properties.join(',' + nl) + nl + repeatStr(' ', indentLevel - mIndentLevel) + '}';
    }
}