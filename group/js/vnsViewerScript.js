const space = "\u200B ";
const questions = [
    `特殊效果 (洞烛紫色文本) 的语法`,
    `注音 (ruby) 的语法 (有两种, 列出一种即可)`,
    `wait 0.3 clear 中的 clear 代表什么?`,
    `过渡 (transition) 的语法`,
    `show 指令中图片可用的混合模式有哪些?`,
    `特殊效果是否可以与注音 (ruby) 一起使用?`,
    `play "lephon_story.ogg" 0 loop 72221:143331 中 72221:143331 代表什么?`
]

const isFireFox = navigator.userAgent.toLowerCase().includes('firefox');
const isAppleWebKit = navigator.userAgent.toLowerCase().includes('applewebkit');

function checkNumericInput(input) {
    var regex = /^[0-9]+$/;
    return regex.test(input);
}

function pseudoRandomRange(seed, min, max) {
    min = BigInt(min);
    max = BigInt(max);

    seed = BigInt(seed);
    
    const a = BigInt(1664525);
    const c = BigInt(1013904223);
    const m = BigInt(2) ** BigInt(32);
    
    seed = (a * seed + c) % m;


    const range = max - min + BigInt(1);
    const randomNumber = min + (seed % range);

    return randomNumber;
}

function getQuestion(qqNumber) {
    qqNumber = qqNumber.trim();
    if (qqNumber === '') {
        return "请在上方的输入框中输入您的QQ号。"
    }
    
    if (!checkNumericInput(qqNumber)) {
        return "您输入的QQ号有误，请检查是否包含其他非数字字符。";
    }

    let qqNum = BigInt(parseInt(qqNumber));
    if (qqNum < 10000) {
        return "请输入正确的QQ号。";
    }

    let index = pseudoRandomRange(qqNum, 0, questions.length - 1);
    
    return "请在入群答案中回答以下问题:\n\n" + questions[index];
}

const qqNumberInput = document.getElementById("qqNumberInput");
const getQuestionButton = document.getElementById("getQuestionButton");
const copyQQGroupNumber = document.getElementById("copyQQGroupNumber");
const backToMainPageButton = document.getElementById("backToMainPage");

const questionResultDiv = document.getElementById("questionResultDiv");
const questionResult = document.getElementById("questionResult");

let questionResultTimeout;

function toNumber(str) {
    return parseFloat(str.replace("px", ""));
}

function measureSize() {
    var p = document.createElement("p");

    p.style.cssText = window.getComputedStyle(questionResult);
    p.style.width = "auto";
    p.style.height = "auto";

    p.innerText = questionResult.innerText;

    questionResultDiv.appendChild(p);

    let textWidth = p.clientWidth;
    let textHeight = p.clientHeight;

    questionResultDiv.removeChild(p);

    return {
        width: textWidth,
        height: textHeight
    };
}

function getLastSize() {
    let w = toNumber(questionResult.style.width);
    let h = toNumber(questionResult.style.height);
    if (isNaN(w) || isNaN(h)) {
        let size = measureSize();
        w = size.width;
        h = size.height;
    }
    return {
        width: w,
        height: h
    };
}

function copyText(text, toastMessage) {
    var tempInput = document.createElement("textarea");
    tempInput.value = text;

    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    
    showToast(toastMessage);
}

function setResultText(text) {
    if (text === undefined || questionResult === undefined) return;

    questionResult.classList.add("onChange");

    clearTimeout(questionResultTimeout);
    questionResultTimeout = setTimeout(() => {
        questionResult.innerText = text;
        
        let lastSize = getLastSize();
        let size = measureSize();

        let newHeightSmaller = (size.height < lastSize.height)

        if (newHeightSmaller && size.height < 50) {
            questionResult.style = `--scaleEasing: cubic-bezier(0.22, 1, 0.36, 1);`
        }
        else {
            let s = ((size.height - lastSize.height) / 250.0);
            if (newHeightSmaller) {
                s = -s * 0.5;
            }
            let heightEaseScale = Math.min(
                2,
                2 * Math.max(0.625, Math.min(s, 1))
            );
            questionResult.style = `--scaleEasing: cubic-bezier(.6,${heightEaseScale},.6,1);`
        }

        
        questionResult.style.width = size.width + "px";
        questionResult.style.height = size.height + "px";

        questionResult.classList.remove("onChange");
    }, 350);
}

getQuestionButton.addEventListener("click", () => {
    setResultText(getQuestion(qqNumberInput.value));
});

qqNumberInput.addEventListener("keydown", () => {
    if (event.keyCode === 13) {
        getQuestionButton.click();
    }
});

copyQQGroupNumber.addEventListener("click", () => {
    copyText("1019038651", "已复制QQ群号");
});

// backToMainPageButton.addEventListener("click", () => {
//     window.open("../aa", "_self");
// })

window.onload = () => {
    setResultText("请在上方的输入框中输入您的QQ号，您的问题将会在这里出现。");
}

document.body.style = "height: 100vh;";