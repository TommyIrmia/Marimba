export const sessionService = {
    load: loadFromSession,
    save: saveToSession,
}

saveToSession('initial',true)

function loadFromSession(key) {
    var val = sessionStorage.getItem(key)
    return (val) ? JSON.parse(val) : null;
}

function saveToSession(key, val) {
    sessionStorage[key] = JSON.stringify(val);
}