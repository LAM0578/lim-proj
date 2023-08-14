const space = "\u200B ";
const questions = [
    "Arcade是什么，以及您当前的潜力值。", // Arcade是Arcaea可视化制谱器之一，我的ptt为12.66
    "Camera语句中为持续时间的参数为第几个？", // 第九个 (camera(时间,位移X,位移Y,位移Z,旋转X,旋转Y,旋转Z,缓动类型,持续时间))
    "当某首曲子分数为9900000时，最终的单曲潜力值与该谱面的定数的差为？", // 1.5
    "Flick物件中有哪些参数为定义该物件位置的？（请回答参数位置即可）", // 第二个，第三个 (flick(时间,位置X,位置Y,向量X,向量Y))
    "Camera语句首次出现的谱面是？", // Ignotus Afterburn [FTR]
    "截止至当前最新版本，OVER和STEP最高的（在全部属性拉满的情况下）搭档是？", // 光 (Fatalis)
    "请问TimingPointDensityFactor是做什么的？（它在\"-\"前出现，非事件语句）", // 控制LongNote物件的密度
    "官方谱面目前出现的最低黑线高度为？", // -0.2
    "请给出Arc的x坐标换算为世界坐标的公式。", // -850 * x + 425
    "请说明在使用trackdisplay类型的scenecontrol事件时，轨道的透明度是如何计算的。（可以使用公式说明）", // 透明度 % 256
    "在没有启用enwidenlanes类型的scenecontrol事件并且某个地面轨道note位于0/5轨，请问该note是否能被判定？", // 不能
    "请问曲目《Last | Moment》和《Last | Eternity》本质上是同一首曲目id的曲目吗？", // 不是
    "请描述Beyond谱面的y=1的范围。", // (-0.25,1), (1.25,1)
    "请简要描述Arc高度指示器的触发条件。", // Arc开头与结尾的y不同
    "请列出4.0.0新加入的scenecontrol事件的类型。", // enwidencamera, enwidenlanes
    `请问以下谱面片段是否为合法aff（以本体是否能正常读取为准）？
    如果为非法aff，请直接回答理由及现象。
    
    AudioOffset:0
    -
    timing(0,100.,4.);
    arc(0,10000,.,.,s,1.,1.,0,none,true)[at(0)];
    timinggroup(){
    ${space}${space}timing(0,100.,4.);
    ${space}${space}(0,.5);
    };
    `, // 是
    `请问以下语句是否有误（以本体是否能正常读取为准）？
    如有误，请直接回答理由及现象。

    timing(0,100.00,0.00);
    `, // 节拍不能为0，会导致游戏闪退
    `请指出以下谱面片段所存在的的问题。（只需要回答问题即可，不需要指出具体语句）

    AudioOffset:0
    -
    timing(0,100.00,4.00);
    timing(250,50.00,4.00);
    arc(0,500,0.0,0.0,s,1.0,1.0,0,none,false);
    arc(0,500,1.0,1.0,s,1.0,1.0,1,none,false);
    `, // 跨越timing
];

function checkNumericInput(input) {
    var regex = /^[0-9]+$/;
    return regex.test(input);
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

    let n = BigInt(questions.length);
    let v0 = qqNum / n;
    let index = ((((n ^ qqNum) + v0) << 3n) * v0) % n;
    
    return questions[index];
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
