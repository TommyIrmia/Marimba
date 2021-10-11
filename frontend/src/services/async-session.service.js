
export const asyncSessionService = {
    query,
    get,
    put,
    save,
}

function query(entityType, delay = 0) {
    var entities = JSON.parse(sessionStorage.getItem(entityType)) || []
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(entities)
        }, delay)
    })
}

function get(entityType, entityId) {
    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
        .catch(err => null)
}

function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            save(entityType, entities)
            return updatedEntity
        })
}

function save(entityType, entities) {
    sessionStorage.setItem(entityType, JSON.stringify(entities))
}

