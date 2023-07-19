
const body = document.body;
const backgroundImage = document.getElementById("backgroundImage");

function setDayNight() {
    if (body.classList.contains("night")) {
        body.classList.remove("night");
    }
    else {
        body.classList.add("night");
    }

    if (backgroundImage.classList.contains("night")) {
        backgroundImage.classList.remove("night");
    }
    else {
        backgroundImage.classList.add("night");
    }
}

if (window.matchMedia && 
    window.matchMedia('(prefers-color-scheme: dark)').matches ||
    parseBool(getCookie("nightMode"))) {
    setDayNight();
    window.isNightMode = true;
}