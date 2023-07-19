
const toastDiv = document.querySelector('.toast')
const toastMessage = document.querySelector('#toastMessage')

let toastTimeout;

let showToastInternal = function (msg) {
    toastMessage.innerHTML = msg;
    let delay = toastDiv.clientWidth * toastDiv.clientHeight / 10;

    // console.log(delay);
    toastDiv.classList.add('show');
    
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toastDiv.classList.remove('show');
    }, Math.max(delay, 1500));
}

let getTopStyleHtml = function (col, msg) {
    return `<label style="color:${col};font-weight:bold;">${msg}</label><br><hr>`;
}

/**
 * Show message
 * @param {String} msg Message
*/
function showToast(msg) {
    showToastInternal(msg);
}

/**
 * Show error message
 * @param {String} msg Error message
*/
function showErrorToast(msg) {
    showToastInternal(`${getTopStyleHtml('#ff2244', 'Error')}${msg}`);
}

/**
 * Show warning message
 * @param {String} msg Warning message
*/
function showWarningToast(msg) {
    showToastInternal(`${getTopStyleHtml('#ff8800', 'Warning')}${msg}`);
}

/**
 * Show message toast (with top)
 * @param {String} msg Message
*/
function showMessageToast(msg) {
    showToastInternal(`${getTopStyleHtml(
        window.isNightMode ? '#d0d0d0' : '#303030', 'Message')}${msg}`);
}