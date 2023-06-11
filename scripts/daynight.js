
const names = [
    'box',
    'topstyle',
    'idlabel',
    'smalltitle',
    'github',
    'datnightbtnstyle',
    'bodystyle',
    'scrollbar-content',
    'dayicon',
    'nighticon'
]

const elementItems = []
for (const name of names) {
    elementItems.push(document.getElementsByClassName(name))
}

function setDayNight() {
    for (const elements of elementItems) {
        for (i = 0; i < elements.length; i++) {
            elements.item(i).classList.toggle('day-mode');
        }
    }
}

const modeBtn = document.getElementById("DayNightBtn");
modeBtn.addEventListener('click', () => {
    setDayNight();
})

function preload() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        setDayNight();
    }
    
    var style = document.querySelector("style")
    style.innerHTML += '* { transition-duration: 0.25s; transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1); }'
}

preload()