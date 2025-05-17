const url = "https://aa.huoyan1231.org:445/files/version";

const downloadContainer = document.getElementById("DownloadContainer");
const refreshButton = document.getElementById("RefreshButton");
const body = document.body;
const mainContainer = document.querySelector(".MainContainer")
const buttonContainer = document.getElementById("ButtonContainer");

function setInfo(data) {
    
    var version = data.version;
    var buildDate = data.buildDate;
    var dayVersion = data.dayVersion;
    var url = atob(data.downloadUrl);

    
    var displayVersion = `v${floor(version/1000)}.${fformat(version/10,1)}`
    var splits = buildDate.split("/");
    var year = splits[0];
    var month = dformat(splits[1], 2);
    var day = dformat(splits[2], 2);
    displayVersion += ` b${year}${month}${day}${dformat(dayVersion, 2)}`;

    downloadContainer.innerHTML = `
    <a href="${url}" class="ContainerButtonText" id="URLContainer">
        ${displayVersion}
    </a>`;
}

function getVersionAndSetCoockie() {
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        setInfo(data);
        setCookie("aa-version", JSON.stringify(data), 0.5);
    })
}

function updateScale() {
    const screenWidth = window.innerWidth;
    var targetWidth = 350;
    
    if (screenWidth < targetWidth) {
        var scale = screenWidth / targetWidth;
        scale = Math.max(scale, 0.5) * 0.95;
        body.style.left = `${(0.95 - scale) * -50}%`;
        body.style.scale = scale;
    }
    else {
        body.style = "";
    }

    targetWidth = 700;
    if (screenWidth > targetWidth) {
        var scale = screenWidth / targetWidth;
        scale -= 1;
        scale = Math.min(scale, 0.1);
        mainContainer.style.top = `calc(100vh * ${scale})`
    }
    else {
        mainContainer.style = "";
    }
}

if (getCookie("aa-version") !== "") {
    setInfo(JSON.parse(getCookie("aa-version")));
}
else {
    getVersionAndSetCoockie();
}

refreshButton.addEventListener("click", function() {
    getVersionAndSetCoockie();
}, false);
buttonContainer.addEventListener("click", function(){
    buttonContainer.style.opacity = 1;
});


window.addEventListener('resize', updateScale);
updateScale();