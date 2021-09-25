export const sessionService = {
    load: loadFromSession,
    save: saveToSession,
}

function loadFromSession(key) {
    var val = sessionStorage.getItem(key)
    return (val) ? JSON.parse(val) : null;
}

function saveToSession(key, val) {
    sessionStorage[key] = JSON.stringify(val);
}