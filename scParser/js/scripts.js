
const body = document.body;
var isNightMode = false;

function setDayNight() {
    if (body.classList.contains("night")) {
        body.classList.remove("night");
    }
    else {
        body.classList.add("night");
    }
    window.isNightMode = body.classList.contains("night");
}

if (window.matchMedia && 
    window.matchMedia('(prefers-color-scheme: dark)').matches ||
    parseBool(getCookie("nightMode"))) {
    setDayNight();
}

const ligBtn = document.getElementById("ligatures");
const textarea = document.getElementById("raw");

function setLigatures() {
    if (textarea.classList.contains("lig")) {
        textarea.classList.remove("lig");
    }
    else {
        textarea.classList.add("lig");
    }
    var isLig = textarea.classList.contains("lig");
    ligBtn.textContent = isLig ? "Disable Ligatures" : "Enable Ligatures";
    // ligBtn.textContent = isLig ? "禁用连字" : "启用连字";
    setCookie("enableLigtures", isLig, 365);
}

if (getCookie("enableLigtures") == "") {
    setCookie("enableLigtures", false, 365);
}
else if (parseBool(getCookie("enableLigtures"))) {
    setLigatures();
}

// console.log(getCookie("enableLigtures"));

ligBtn.addEventListener("click", () => setLigatures());

// document.cookie = null;
// console.log(document.cookie);
