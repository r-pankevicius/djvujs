export function loadFile(url, progressHandler) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = 'arraybuffer';
        xhr.onload = (e) => {
            if (xhr.status && xhr.status !== 200) { // при загрузке файла status === 0
                return reject({
                    header: `Response status code: ${xhr.status}`,
                    message: `Response status text: ${xhr.statusText}`
                });
            }
            resolve(xhr);
        };

        xhr.onerror = (e) => {
            console.error("DjVu.js Viewer load file error: \n", e);
            reject({
                header: "Web request error",
                message: "An error occurred, the file wasn't loaded. The error object is printed to the browser console."
            })
        }

        xhr.onprogress = progressHandler;
        xhr.send();
    });
}

export function createGetObjectByState(state) {
    var get = {};
    for (const key in state) {
        get[key] = state => state[key];
    }
    return get;
}

export function composeHighOrderGet(statePartToGetMap) {
    var newGet = {};
    Object.keys(statePartToGetMap).forEach(statePart => {
        const innerGet = statePartToGetMap[statePart];
        for (const key in innerGet) {
            newGet[key] = state => innerGet[key](state[statePart]);
        }
    });
    return newGet;
}

export const inExtension = !!(document.querySelector('input#djvu_js_extension_main_page')
    && window.chrome && window.chrome.runtime && window.chrome.runtime.id);
export const isChromeExtension = inExtension && !/Firefox/.test(navigator.userAgent);