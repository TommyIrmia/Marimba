
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
        .catch(err => null)
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
            entities.splice(idx, 1, updatedEntity)
            save(entityType, entities)
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
    // console.log('entityType FROM SAVE!', entityType)
    localStorage.setItem(entityType, JSON.stringify(entities))
}
