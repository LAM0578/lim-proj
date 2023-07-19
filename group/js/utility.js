
function changeElementStyleStatus(element, name) {
    if (element.classList.contains(name)) {
        element.classList.remove(name);
    }
    else {
        element.classList.add(name);
    }
}
