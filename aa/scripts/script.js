const url = "http://aa.huoyan1231.org/files/version";

var container = document.getElementById("DownloadContainer");
var refreshButton = document.getElementById("RefreshButton");

function setInfo(data) {
    // Unpack datas from json data
    var version = data.version;
    var buildDate = data.buildDate;
    var dayVersion = data.dayVersion;
    var url = atob(data.downloadUrl);

    // Build display version
    var displayVersion = `v${floor(version/1000)}.${fformat(version/10,1)}`
    var splits = buildDate.split("/");
    var year = splits[0];
    var month = dformat(splits[1], 2);
    var day = dformat(splits[2], 2);
    displayVersion += ` b${year}${month}${day}${dformat(dayVersion, 2)}`;

    container.innerHTML = `
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

if (getCookie("aa-version") !== "") {
    setInfo(JSON.parse(getCookie("aa-version")));
}
else {
    getVersionAndSetCoockie();
}

refreshButton.addEventListener("click", function() {
    getVersionAndSetCoockie();
}, false);