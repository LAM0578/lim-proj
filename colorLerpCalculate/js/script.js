
const colorLeftInput = document.getElementById("colorLeft");
const colorRightInput = document.getElementById("colorRight");

const colorLeftPicker = document.getElementById("colorLeftPicker");
const colorRightPicker = document.getElementById("colorRightPicker");

const colorDisplayLeft = document.getElementById("colorDisplayLeft");
const colorDisplayRight = document.getElementById("colorDisplayRight");

const lerpSlider = document.getElementById("lerpSlider");
const progressInput = document.getElementById("progressInput");

const resultDisplay = document.getElementById("resultDisplay");
const resultValueButton = document.getElementById("resultValueButton");

let colorLeft = new color(0xff, 0x00, 0x00);
let colorRight = new color(0x00, 0x00, 0xff);

let progress = 0;
let progressInputFoucs = false;
const progressScale = 1000.0;

let setProgress = (p) => {
    var ps = progressInputFoucs ? // progress string
        new float(p / progressScale).toString() : // foucs in
        `${(progress * (100 / progressScale)).toFixed(1)}%`; //foucs out
    progressInput.value = ps;
};

colorLeftInput.addEventListener("input", updateInputColor);
colorLeftInput.addEventListener("focusout", () => colorLeftInput.value = colorLeft.toString());
colorRightInput.addEventListener("input", updateInputColor);
colorRightInput.addEventListener("focusout", () => colorRightInput.value = colorRight.toString());

colorLeftPicker.addEventListener("input", updatePickerColor);
colorRightPicker.addEventListener("input", updatePickerColor);

lerpSlider.addEventListener("input", updateSlider);
progressInput.addEventListener("focusin", () => {
    progressInputFoucs = true;
    setProgress(progress);
});
progressInput.addEventListener("focusout", () => {
    progressInputFoucs = false;
    setProgress(progress);
});
progressInput.addEventListener("input", onProgressInputChange);

resultValueButton.addEventListener("click", () => {
    var tempInput = document.createElement("textarea");
    tempInput.value = resultValueButton.textContent;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
});

let checkColorVaild = (raw) => {
    var c = color.parse(raw);
    return { 'value': c, 'vaild': c !== undefined };
}

let checkColorString = (hex) => hex[0] !== '#' ? `#${hex}` : hex;

function updateInputColor() {
    var lcv = checkColorVaild(colorLeftInput.value); // left color vaild
    var rcv = checkColorVaild(colorRightInput.value); // right color vaild

    if (lcv["vaild"]) {
        colorLeft = lcv["value"];
        let lcs = lcv["value"].toString(); // left color string
        colorLeftPicker.value = lcs;
        colorDisplayLeft.style = `background-color:${lcs}`;
    }

    if (rcv["vaild"]) {
        colorRight = rcv["value"];
        let rcs = rcv["value"].toString(); // right color string
        colorRightPicker.value = rcs;
        colorDisplayRight.style = `background-color:${rcs}`;
    }

    onColorChange();
}

function updatePickerColor() {
    colorLeftInput.value = colorLeftPicker.value;
    colorRightInput.value = colorRightPicker.value;

    colorDisplayLeft.style = `background-color:${colorLeftPicker.value}`;
    colorDisplayRight.style = `background-color:${colorRightPicker.value}`;

    colorLeft = color.parse(colorLeftPicker.value);
    colorRight = color.parse(colorRightPicker.value);

    onColorChange();
}

function updateSlider() {
    var p = parseFloat(lerpSlider.value); // progress
    var c = color.lerp(colorLeft, colorRight, p / progressScale);
    if (c !== undefined) {
        setResultColor(c);
    }
    progress = p;
    setProgress(p);
}

function onProgressInputChange() {
    var p = parseFloat(progressInput.value); // progress
    if (p !== undefined && !isNaN(p)) {
        p = Math.max(Math.min(p, 1), 0);
        lerpSlider.value = `${Math.floor(p * progressScale)}`;
        progress = Math.floor(p * progressScale);
        
        var c = color.lerp(colorLeft, colorRight, p);
        if (c !== undefined) {
            setResultColor(c);
        }
    }
}

function onColorChange() {
    var c = color.lerp(colorLeft, colorRight, progress / progressScale);
    setResultColor(c);
}

function setResultColor(c) {
    if (c === undefined) return;
    resultDisplay.style = `background-color:${c.toString()}`;
    resultValueButton.textContent = c.toString();
}