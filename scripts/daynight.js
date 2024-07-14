
const names = [
    'box',
    'topstyle',
    'idlabel',
    'smalltitle',
    'github',
    'datnightbtnstyle',
    'bodystyle',
    'scrollbar-container',
    'dayicon',
    'nighticon',
    'x-icon'
]

const elementItems = []
for (const name of names) {
    elementItems.push(document.getElementsByClassName(name))
}

let isNightMode = true;
function setDayNight() {
    for (const elements of elementItems) {
        for (i = 0; i < elements.length; i++) {
            elements.item(i).classList.toggle('day-mode');
        }
    }
    isNightMode = !isNightMode;
    setCookie("nightMode", isNightMode, 365);
}

const modeBtn = document.getElementById("DayNightBtn");
modeBtn.addEventListener('click', () => {
    setDayNight();
})

function preload() {
    if (window.matchMedia) {
        if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            setDayNight();
            setCookie("nightMode", false, 365);
        }
        else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setCookie("nightMode", true, 365);
        }
    }
    
    var style = document.querySelector("style");
    style.innerHTML += '* { -webkit-text-size-adjust: none; transition: 0.25s cubic-bezier(0.215, 0.610, 0.355, 1); }';
}

preload()