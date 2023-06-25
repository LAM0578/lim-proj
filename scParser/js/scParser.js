

class scParserError extends Error {
    constructor(desc) {
        super(desc);
        this.name = "scParserError";
    }
}

class parseItem {
    constructor(name, cont) {
        this.typename = name;
        this.contents = cont;
    }

    print() {
        console.log(`[${this.typename}]${this.contents}`);
    }
}

const emptyChars = [' ', '\t', '\n', '\r']
const numberChars = '1234567890'.split('')
const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')
const lowerChars = "abcdefghijklmnopqrstuvwxyz".split('')
const upperHexChars = "ABCDEF".split('')
const lowerHexChars = "abcdef".split('')

function isNumber(char, isHex = false) {
    // var o = char.charCodeAt(0);
    if (numberChars.includes(char) || char === ".") {
        return true;
    }
    else if (isHex && (upperHexChars.includes(char) ||
        lowerHexChars.includes(char))) {
        return true;
    }
    return false;
}

function isCharAllowInName(char) {
    if (upperChars.includes(char) || lowerChars.includes(char)) {
        return true;
    }
    else if (numberChars.includes(char)) {
        return true;
    }
    else if ([':', '_', '<', '>', '*', '$'].includes(char)) {
        return true;
    }
    return false;
}

function parseCode(text) {
    var l = text.length;
    var result = []
    var p = 0;
    while (p < l) {
        var x = text[p];
        if (emptyChars.includes(x)) {
            p++;
            continue;
        }
        else if (x === '/') {
            if (text[p + 1] === '/') {
                var i = p + 2;
                while (i < l && text[i] === '\n') {
                    i++;
                }
                p = i;
                continue;
            }
            else if (text[p + 1] === '*') {
                var i = text.indexOf('*/', p + 2);
                if (i === -1) {
                    throw new scParserError("格式错误：未找到注释尾");
                }
                p = i + 2;
                continue;
            }
        }
        else if (x === '-') {
            if (p + 1 < l) {
                if (text[p + 1] === '>') {
                    result.push(new parseItem("arrow", "->"));
                    p += 2;
                    continue;
                }
                else if (isNumber(text[p + 1])) {
                    p++;
                    var b = 10;
                    if (x === '0' && p + 1 < l && text[p + 1] === 'x') {
                        b = 16;
                        p += 2;
                    }
                    var i = p;
                    while (i < l) {
                        if (isNumber(text[i], b === 16)) {
                            i++;
                            continue;
                        }
                        break;
                    }
                    var name = text.substring(p, i);
                    if (name.indexOf(".") !== -1) {
                        if (name[0] === '.') {
                            name = "0" + name;
                        }
                        if (name[name.length - 1] === '.') {
                            name = name + "0";
                        }
                        result.push(new parseItem("float", float.parse(name).negate()));
                    }
                    else {
                        result.push(new parseItem("int", int.parse(name, b).negate()));
                    }
                    p = i;
                    continue;
                }
            }
        }
        else if (isNumber(x)) {
            var b = 10;
            if (x === '0' && (p + 1 < l) && text[p + 1] === 'x') {
                b = 16;
                p += 2;
            }
            var i = p;
            while (i < l) {
                if (isNumber(text[i], b === 16)) {
                    i++;
                    continue;
                }
                break;
            }
            var name = text.substring(p, i);
            if (name.indexOf(".") !== -1) {
                if (name[0] === '.') {
                    name = "0" + name;
                }
                if (name[name.length - 1] === '.') {
                    name = name + "0";
                }
                result.push(new parseItem("float", new float(parseFloat(name))));
            }
            else {
                result.push(new parseItem("int", new int(parseInt(name, b))));
            }
            p = i;
            continue;
        }
        else if (x === ':') {
            result.push(new parseItem("colon", x));
            p++;
            continue;
        }
        else if (x === '"') {
            var i = p + 1;
            for (; i < l; i++) {
                if (i + 1 < l && text[i] == '\\' && text[i + 1] == '"') {
                    i++;
                    continue;
                }
                if (text[i] === '"') {
                    break;
                }
            }
            // var name = eval(text.substring(p, i + 1));
            var name = text.substring(p, i + 1);
            name = name.substring(1, name.length - 1);
            result.push(new parseItem("name", name));
            p = i + 1;
            continue;
        }
        else if (isCharAllowInName(x)) {
            if (x === 'R' && text[p + 1] === '"' && text[p + 2] === '(') {
                for (var i = p + 3; i < l; i++) {
                    if (text.substring(i, i + 2) === ')"') break;
                }
                var name = text.substring(p + 3, i);
                result.push(parseItem("name", name));
                p = i + 2;
                continue;
            }
            var i = p;
            while (i < l) {
                if (isCharAllowInName(text[i])) {
                    if (text[i] != ':') i++;
                    else if (text[i + 1] === ':') i += 2;
                    else break;
                } else break;
            }
            var name = text.substring(p, i);
            if (name.length === 2 && ['x', 'w', 'f'].includes(name[0]) && numberChars.includes(name[1])) {
                result.push(new parseItem("var", name));
            } else if (name.length === 3 && ['x', 'w', 'f'].includes(name[0]) && numberChars.includes(name[1]) && numberChars.includes(name[2])) {
                result.push(new parseItem("var", name));
            } else if (name.length === 3 && name[0] === 'a' && ['x', 'w', 'f'].includes(name[1]) && numberChars.includes(name[2])) {
                result.push(new parseItem("var", name));
            } else if (name.length === 4 && name[0] === 'a' && ['x', 'w', 'f'].includes(name[1]) && numberChars.includes(name[2]) && numberChars.includes(name[3])) {
                result.push(new parseItem("var", name));
            } else if (name === "true") {
                result.push(new parseItem("bool", true));
            } else if (name === "false") {
                result.push(new parseItem("bool", false));
            } else {
                result.push(new parseItem("name", name));
            }
            p = i;
            continue;
        }
        else if (x === '=') {
            if (text[p + 1] === '=') {
                result.push(new parseItem("dequal", x));
                p += 2;
            } else {
                result.push(new parseItem("equal", x));
                p++;
            }
            continue;
        }
        else if (x === '(') {
            result.push(new parseItem("lbracket", x));
            p++;
            continue;
        }
        else if (x === ')') {
            result.push(new parseItem("rbracket", x));
            p++;
            continue;
        }
        else if (x === '[') {
            result.push(new parseItem("larray", x));
            p++;
            continue;
        }
        else if (x === ']') {
            result.push(new parseItem("rarray", x));
            p++;
            continue;
        }
        else if (x === '{') {
            result.push(new parseItem("lbrace", x));
            p++;
            continue;
        }
        else if (x === '}') {
            result.push(new parseItem("rbrace", x));
            p++;
            continue;
        }
        else if (x === ',') {
            result.push(new parseItem("comma", x));
            p++;
            continue;
        }
        else if (x === ';') {
            result.push(new parseItem("semi", x));
            p++;
            continue;
        }
        result.push(new parseItem("undefined", x));
        break;
    }
    return result;
}

function getVarFromParsed(parsed, i) {
    var result = {};
    if (parsed[i].contents[0] === 'a') {
        result["type"] = parsed[i].contents[1] + "arg";
        result["location"] = parseInt(parsed[i].contents.substring(2));
    }
    else {
        result["type"] = parsed[i].contents[0] + "var";
        result["location"] = parseInt(parsed[i].contents.substring(1));
    }
    if (result["location"] >= 32) {
        throw new scParserError("变量错误：变量编号最大为31");
    }
    return result;
}

function getListFromParsed(parsed, i, result, endwith) {
    var j = i + 1;
    var commaFlag = false;
    while (parsed[j].typename !== endwith) {
        if (!commaFlag) {
            commaFlag = true;
            if (parsed[j].typename === "var") {
                result.push(getVarFromParsed(parsed, j));
            }
            else if (
                parsed[j].typename === "float" ||
                parsed[j].typename === "int" ||
                parsed[j].typename === "name" ||
                parsed[j].typename === "bool"
            ) {
                result.push(parsed[j].contents);
            }
            else if (parsed[j].typename === "larray") {
                var array = [];
                j = getListFromParsed(parsed, j, array, "rarray");
                result.push(array);
            }
        } else if (parsed[j].typename === "comma") {
            commaFlag = false;
        }
        j++;
    }
    return j;
}

function getFunctionList(parsed, isCondList) {
    var l = parsed.length;
    var start = 0;
    var result = [];
    var separator = isCondList ? "comma" : "semi";
    var i = 0;
    while (i < l) {
        let doReturn = false;
        let doFunc = false;
        let funcDict = {};
        i = start;
        while (i < l) {
            if (parsed[i].typename === "equal") {
                if (!doReturn) {
                    doReturn = true;
                    if (parsed[i - 1].typename === "var") {
                        funcDict["return"] = getVarFromParsed(parsed, i - 1);
                        i++;
                        continue;
                    }
                    else {
                        throw new scParserError("格式错误：等号左边应为变量");
                    }
                }
                else {
                    throw new scParserError("格式错误：一条语句中最多包含一个等号");
                }
            }
            else if (parsed[i].typename === "lbracket") {
                if (!doFunc) {
                    doFunc = true;
                    let argList = [];
                    if (parsed[i - 1].typename === "name") {
                        let funcName = parsed[i - 1].contents;
                        funcDict["name"] = funcName;

                        if (funcName === "if") {
                            let v = 1;
                            let j = i + 1;
                            for (; j < l; j++) {
                                if (parsed[j].typename === "lbracket") v++;
                                else if (parsed[j].typename === "rbracket") v--;
                                if (v === 0) break;
                            }
                            if (v !== 0) {
                                throw new scParserError("格式错误：条件语句格式错误");
                            }

                            if (parsed[j - 1].typename === "var") {
                                argList.push(getVarFromParsed(parsed, j - 1));
                            }

                            funcDict["cond"] = getFunctionList(parsed.slice(i + 1, j - 1), true);

                            if (parsed[j + 1].typename !== "lbrace") {
                                throw new scParserError("格式错误：缺少左花括号");
                            }

                            v = 1;
                            let k = j + 2;
                            for (; k < l; k++) {
                                if (parsed[k].typename === "lbrace") v++;
                                else if (parsed[k].typename === "rbrace") v--;
                                if (v === 0) break;
                            }
                            if (v !== 0) {
                                throw new scParserError("格式错误：缺少右花括号");
                            }

                            funcDict["then"] = getFunctionList(parsed.slice(j + 2, k), false);

                            if (k + 1 < l && parsed[k + 1].contents === "else") {
                                if (parsed[k + 2].typename !== "lbrace") {
                                    throw new scParserError("格式错误：缺少左花括号");
                                }

                                v = 1;
                                let m = k + 3;
                                for (; m < l; m++) {
                                    if (parsed[m].typename === "lbrace") v++;
                                    else if (parsed[m].typename === "rbrace") v--;
                                    if (v === 0) break;
                                }
                                if (v !== 0) {
                                    throw new scParserError("格式错误：缺少右花括号");
                                }

                                funcDict["else"] = getFunctionList(parsed.slice(k + 3, m), false);
                                k = m;
                            }
                            else {
                                funcDict["else"] = [];
                            }
                            funcDict["args"] = argList;
                            i = k + 1;
                            break;
                        }
                        else if (funcName === "while") {
                            let v = 1;
                            let j = i + 1;
                            for (; j < l; j++) {
                                if (parsed[j].typename === "lbracket") v++;
                                else if (parsed[j].typename === "rbracket") v--;
                                if (v === 0) break;
                            }
                            if (v !== 0) {
                                throw new scParserError("格式错误：条件语句格式错误");
                            }

                            if (parsed[j - 1].typename === "var") {
                                argList.push(getVarFromParsed(parsed, j - 1));
                            }

                            funcDict["cond"] = getFunctionList(parsed.slice(i + 1, j - 1), true);

                            if (parsed[j + 1].typename !== "lbrace") {
                                throw new scParserError("格式错误：缺少左花括号");
                            }

                            v = 1;
                            let k = j + 2;
                            for (; k < l; k++) {
                                if (parsed[k].typename === "lbrace") v++;
                                else if (parsed[k].typename === "rbrace") v--;
                                if (v === 0) break;
                            }
                            if (v !== 0) {
                                throw new scParserError("格式错误：缺少右花括号");
                            }

                            funcDict["then"] = getFunctionList(parsed.slice(j + 2, k), false);
                            funcDict["args"] = argList;
                            i = k + 1;
                            break;
                        }
                        else if (funcName === "for") {
                            funcDict["name"] = "foreach";

                            if (parsed[i + 3].typename === "name") {
                                argList.push(parsed[i + 3].contents);
                            }
                            else if (parsed[i + 3].typename === "var") {
                                argList.push(getVarFromParsed(parsed, i + 3));
                            }
                            else {
                                throw new scParserError("格式错误：for第二个参数的类型错误");
                            }

                            if (parsed[i + 2].typename !== "colon") {
                                throw new scParserError("格式错误：for需要冒号");
                            }
                            else if (parsed[i + 1].typename === "var") {
                                argList.push(getVarFromParsed(parsed, i + 1));
                            }
                            else {
                                throw new scParserError("格式错误：for第一个参数的类型错误");
                            }

                            if (parsed[i + 4].typename !== "rbracket") {
                                throw new scParserError("格式错误：for只能有两个参数");
                            }
                            if (parsed[i + 5].typename !== "lbrace") {
                                throw new scParserError("格式错误：for缺少花括号");
                            }

                            let v = 1;
                            let j = i + 6;
                            for (; j < l; j++) {
                                if (parsed[j].typename === "lbrace") v++;
                                else if (parsed[j].typename === "rbrace") v--;
                                if (v === 0) break;
                            }

                            funcDict["then"] = getFunctionList(parsed.slice(i + 6, j), false);
                            funcDict["args"] = argList;
                            i = j + 1;
                            break;
                        }
                        else if (funcName === "foreach") {
                            if (parsed[i + 1].typename === "name") {
                                argList.push(parsed[i + 1].contents);
                            }
                            else if (parsed[i + 1].typename === "var") {
                                argList.push(getVarFromParsed(parsed, i + 1));
                            }
                            else {
                                throw new scParserError("格式错误：foreach第一个参数的类型错误");
                            }

                            if (parsed[i + 2].typename !== "comma") {
                                throw new scParserError("格式错误：foreach需要两个参数");
                            }
                            else if (parsed[i + 3].typename === "var") {
                                argList.push(getVarFromParsed(parsed, i + 3));
                            }
                            else {
                                throw new scParserError("格式错误：foreach第二个参数的类型错误");
                            }

                            if (parsed[i + 4].typename !== "rbracket") {
                                throw new scParserError("格式错误：for只能有两个参数");
                            }
                            if (parsed[i + 5].typename !== "lbrace") {
                                throw new scParserError("格式错误：for缺少花括号");
                            }

                            let v = 1;
                            let j = i + 6;
                            for (; j < l; j++) {
                                if (parsed[j].typename === "lbrace") v++;
                                else if (parsed[j].typename === "rbrace") v--;
                                if (v === 0) break;
                            }

                            funcDict["then"] = getFunctionList(parsed.slice(i + 6, j), false);
                            funcDict["args"] = argList;
                            i = j + 1;
                            break;
                        }
                        else {
                            if (i >= 3 && parsed[i - 2].typename === "arrow") {
                                if (parsed[i - 3].typename === "name") {
                                    argList.push(parsed[i - 3].contents);
                                }
                                else if (parsed[i - 3].typename === "var") {
                                    argList.push(getVarFromParsed(parsed, i - 3));
                                }
                                else {
                                    throw new scParserError("格式错误：箭头格式错误");
                                }
                            }
                            funcDict["args"] = argList;
                            i = getListFromParsed(parsed, i, argList, "rbracket");
                        }
                    }
                    else {
                        throw new scParserError("格式错误：未找到函数名");
                    }
                }
                else {
                    throw new scParserError("格式错误：一条语句中只能执行一个函数");
                }
            }
            else if (parsed[i].typename === separator) {
                break;
            }
            i++;
        }
        result.push(funcDict);
        i++;
        start = i;
    }
    return result;
}

function setParsedCodeToJson(parsed) {
    var length = parsed.length;
    var start = 3;
    var end = length;
    var scList = [];
    while (start < length) {
        var dic = {};
        if (parsed[start - 3].typename === "name" && parsed[start - 2].typename === "name") {
            if (parsed[start - 3].contents === "function") {
                dic["executeType"] = "function";
                var timing = parsed[start - 2].contents;
                if (timing === "instant" || timing === "preload" || timing === "always") {
                    dic["executeTiming"] = timing;
                } else {
                    throw new scParserError("格式错误：请指定 [preload/instant/always] 当中的一种");
                }
                if (parsed[start - 1].typename === "lbracket" && parsed[start].typename === "rbracket") {
                    start += 2;
                } else if (parsed[start - 1].typename != "lbrace") {
                    throw new scParserError("格式错误：函数体必须用花括号包裹");
                }
                var v = 1;
                for (var i = start; i < length; i++) {
                    if (parsed[i].typename === "lbrace") {
                        v += 1;
                    } else if (parsed[i].typename === "rbrace") {
                        v -= 1;
                    }
                    if (v === 0) {
                        break;
                    }
                }
                end = i;
                dic["function"] = getFunctionList(parsed.slice(start, end), false);
            } else {
                throw new scParserError("格式错误：使用\"function\"声明一段函数");
            }
        } else {
            return;
            // throw new scParserError("格式错误：使用\"function [preload/instant/always]\"声明一段函数");
        }
        scList.push(dic);
        start = end + 4;
    }
    var scDict = { "scenecontrol": scList };
    // return JSON.stringify(scDict, ' ', 2);
    return serialize(scDict, mIndentLevel);
}

const rawText = document.getElementById("raw")
const parseBtn = document.getElementById("parse")
const resText = document.getElementById("result")
const copyBtn = document.getElementById("copy")

var copyContent = ""

parseBtn.addEventListener("click", () => {
    var raw = rawText.value;
    // code.forEach(element => {
    //     element.print();
    // });
    try {
        if (raw.trim().length === 0) {
            showWarningToast("待解析内容为空或空白");
            return;
        }
        code = parseCode(raw);
        let result = setParsedCodeToJson(code);
        if (result === undefined) {
            throw new scParserError("解析结果未定义");
        }
        resText.textContent = result;
        showToast("已解析, 请查看下面的解析结果");
    } catch (error) {
        showErrorToast(error.message);
        throw error;
    }
    copyContent = resText.value;
})

copyBtn.addEventListener("click", () => {
    if (copyContent === "") {
        showWarningToast("解析结果为空或空白");
        return;
    }
    var tempInput = document.createElement("textarea");
    tempInput.value = copyContent;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    showToast("Copied");
})

