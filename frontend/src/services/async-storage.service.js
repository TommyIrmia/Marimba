
export const asyncStorageService = {
    get,
    save,
    resetStorage
}

async function query(entityType, delay = 0) {
    var entities = await JSON.parse(localStorage.getItem(entityType))
    return entities
}

function get(entityType, entityId) {
    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
        .catch(err => null)
}

async function save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function resetStorage(entityType) {
    localStorage.removeItem(entityType)
}