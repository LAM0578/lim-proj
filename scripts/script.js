
function version2text(version) {
    return `${Math.floor(version / 100)}.${(version % 100) / 10}.${version % 10}`
}

function getArcCoverMakerLinks(version) {
    let ver = version2text(version);
    return {
        release: `https://github.com/LAM0578/ArcaeaCoverMaker/releases/download/v${ver}/Arcaea-Cover-Maker_Skia-Sharp_v${ver}.zip`,
        source_zip: `https://github.com/LAM0578/ArcaeaCoverMaker/archive/refs/tags/v${ver}.zip`,
        source_targz: `https://github.com/LAM0578/ArcaeaCoverMaker/archive/refs/tags/v${ver}.tar.gz`
    }
}

function getArcCoverMakerFileNames(version) {
    let ver = version2text(version);
    return {
        release: `Arcaea-Cover-Maker_Skia-Sharp_v${ver}.zip`,
        source_zip: `Source Code (zip)`,
        source_targz: `Source Code (tar.gz)`
    }
}

let lastest = document.getElementById("lasestVersionContainer");
let other = document.getElementById("otherReleasesContainer");
const versions = [
    100, 110, 120, 130
];

let lastedRelease = versions[versions.length - 1];
let otherReleases = versions.slice(0, versions.length - 1);

function createTitle(text) {
    let child = document.createElement("p");
    child.id = "smallTitle";
    child.innerText = text;
    return child;
}

function createItem(version) {
    function createHref(text, url, isFolder) {
        let child = document.createElement("a");
        child.href = url;
        let img = document.createElement("img");
        img.className = "github";
        img.width = "16";
        img.height = "16";
        img.src = isFolder ? "mdi/folder_zip_FILL0_wght400_GRAD0_opsz48.svg" : "mdi/deployed_code_FILL0_wght400_GRAD0_opsz48.svg";
        img.style = "margin-right: 10px;";
        child.appendChild(img);
        child.innerHTML += text;
        container.appendChild(document.createElement("br"));
        return child;
    }

    let ver = version2text(version);
    let links = getArcCoverMakerLinks(version);
    let fileNames = getArcCoverMakerFileNames(version);
    let container = document.createElement("p");
    container.style = "line-height: 2;font-size: 17.5;overflow: hidden;";
    container.id = `arcCoverMaker${ver}`;

    container.appendChild(createHref(fileNames.release, links.release, false));
    container.appendChild(createHref(fileNames.source_zip, links.source_zip, true));
    container.appendChild(createHref(fileNames.source_targz, links.source_targz, true));

    return container;
}

function appendItem(parent, version, isFirst) {
    let ver = version2text(version);
    let smallLabel = document.createElement("p");
    smallLabel.id = "smallLabel";
    smallLabel.innerText = `v${ver}`;
    if (!isFirst) {
        smallLabel.style = "margin-top: -8px;";
    }
    parent.appendChild(smallLabel);
    parent.appendChild(createItem(version));
}

appendItem(lastest, lastedRelease, true);
for (let i = otherReleases.length - 1; i >= 0; i--) {
    const e = otherReleases[i];
    appendItem(other, e, i == 0);
}
