const space = "\u200B ";
const questions = [
  `愚人节曲目《HIVEMIND INTERLINKED》中的大小键实际为什么note？`,  `请给出Arc的x坐标换算为世界坐标的公式。`,  `请给出Arc的y坐标换算为世界坐标的公式。`,  `当某首曲子分数为9900000时，最终的单曲潜力值与该谱面的定数的差为？`,  `Camera语句首次出现的谱面是？`,  `截止至当前最新版本，OVER和STEP最高的（在全部属性拉满的情况下）搭档是？`,  `请问TimingPointDensityFactor是做什么的？（它在"-"前出现，非事件语句）`,  `在没有启用enwidenlanes类型的scenecontrol事件并且某个地面轨道note位于0/5轨，请问该note是否能被判定？`,  `请问曲目《Last | Moment》和《Last | Eternity》本质上是同一首曲目id的曲目吗？`,  `请描述Beyond谱面的y=1时的范围。`,  `请简要描述Arc高度指示器的触发条件。（高度指示器并非手指按下时的白线）`,  `请列出4.0.0新加入的scenecontrol事件的类型。`,  `请描述目前已有的 Arc 类型。（Arc类型在此处并非Arc缓动类型）`,  `请问以下谱面片段是否为合法aff（以本体是否能正常读取为准）？
    如果为非法aff，请直接回答理由及现象。
    
    AudioOffset:0
    -
    timing(0,100.,4.);
    arc(0,10000,0.,0.,s,1.,1.,0,none,true)[at(0)];
    timinggroup(){
    ​ ​ timing(0,100.,4.);
    ​ ​ (0,.5);
    };
    `,  `请问以下语句是否有误（以本体是否能正常读取为准）？
    如有误，请直接回答理由及现象。

    timing(0,100.00,0.00);
    `,  `请指出以下谱面片段所存在的的问题。（只需要回答问题即可，不需要指出具体语句）

    AudioOffset:0
    -
    timing(0,100.00,4.00);
    timing(250,50.00,4.00);
    arc(0,500,0.0,0.0,s,1.0,1.0,0,none,false);
    arc(0,500,1.0,1.0,s,1.0,1.0,1,none,false);
    `,  `当一条Arc的持续时间为1并且该Arc上只有一个ArcTap时，该Arc是否会被隐藏？`,  `Arc的长度根据什么计算的？`,  `
    请问以下谱面片段是否为合法aff（以本体是否能正常读取为准）？
    
    AudioOffset:0
    -
    timing(0,100.00,4.00);
    (0,1);
    timinggroup(){
    ​ ​ timing(0,100.00,0.00);
    ​ ​ hold(0,1000,4);
    };
    `,  `描述缓动类型为b的Arc的缓动名称`,  `描述缓动类型为si的Arc的缓动名称`,  `描述缓动类型为so的Arc的缓动名称`,  `SkyInput常规状态下的世界y坐标`
]

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

const questionResultDiv = document.getElementById("questionResultDiv");
const questionResult = document.getElementById("questionResult");

let questionResultTimeout;

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
        
        let size = measureSize();

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
    copyText("783477064", "已复制QQ群号");
});

window.onload = () => {
    setResultText("请在上方的输入框中输入您的QQ号，您的问题将会在这里出现。");
}

// console.log(questions.length)
// console.log()
// for (let i = 0; i < 20; i++) {
//     console.log(pseudoRandomRange(i, 0, questions.length - 1))
// }