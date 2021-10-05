
export const asyncStorageService = {
    query,
    get,
    post,
    put,
    remove,
    save,
    getIdx
}

async function query(entityType, delay = 0) {
    var entities = await JSON.parse(localStorage.getItem(entityType))
    return entities
    // return new Promise((resolve, reject) => {
    //     // setTimeout(() => {
    //         resolve(entities)
    //     // }, delay)
    // })
}


function get(entityType, entityId) {
    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
}

async function getIdx(entityType, entityId) {
    const entities = await query(entityType)
    const idx = entities.findIndex(entity => {
        return entity.id === entityId
    })
    return idx
}

function post(entityType, newEntity) {
    // newEntity._id = _makeId()
    return query(entityType)
        .then(entities => {
            if (entityType === 'activites') entities.unshift(newEntity)
            else entities.push(newEntity)
            save(entityType, entities)
            return newEntity
        })
}

function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            console.log('from storage', idx);
            entities.splice(idx, 1, updatedEntity)
            console.log('from storage', entities);
            save(entityType, entities)
            console.log('from storage', updatedEntity);
            return updatedEntity
        })
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity.id === entityId)
            entities.splice(idx, 1)
            save(entityType, entities)
        })
}


async function save(entityType, entities) {
    console.log('entityType FROM SAVE!', entityType)
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}