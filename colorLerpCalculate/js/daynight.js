
const body = document.body;

function setDayNight() {
    if (body.classList.contains("night")) {
        body.classList.remove("night");
    }
    else {
        body.classList.add("night");
    }
}

if (window.matchMedia && 
    window.matchMedia('(prefers-color-scheme: dark)').matches ||
    parseBool(getCookie("nightMode"))) {
    setDayNight();
}