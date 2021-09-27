
export const asyncStorageService = {
    query,
    get,
    post,
    put,
    remove,
    save,
    getIdx
}

function query(entityType, delay = 400) {
    var entities = JSON.parse(localStorage.getItem(entityType)) ||  [
        {
            "id": "A_MjCqQoLLA",
            "title": "Hey Jude - Beatels",
            "url": "youtube/song.mp4",
            "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
            "addedBy": 'Naama',
            "addedAt":1607110465663,
            "isPlaying" : false,
            "duration":'8:10'
        },
        {
            "id": "m2uTFF_3MaA",
            "title": "Yellow Submarine - Beatels",
            "url": "youtube/song.mp4",
            "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
            "addedBy": 'Tomer',
            "addedAt":1607110465663,
            "isPlaying" : false,
            "duration":'2:46'
        },
        {
            "id": 'kTJczUoc26U',
            "title": 'The Kid LAROI, Justin Bieber - STAY (Official Video)',
            "url": "youtube/song.mp4",
            "imgUrl": 'https://i.ytimg.com/vi/kTJczUoc26U/mqdefault.jpg',
            "addedBy": 'Tomer',
            "addedAt":1607110465663,
            "isPlaying" : false,
            "duration":'2:38'
        },
        {
            "id": "tQ0yjYUFKAE",
            "title": "Justin Bieber - Peaches ft. Daniel Caesar, Giveon",
            "url": "youtube/song.mp4",
            "imgUrl": "https://i.ytimg.com/vi/tQ0yjYUFKAE/mqdefault.jpg",
            "addedBy": 'Tomer',
            "addedAt":1607110465663,
            "isPlaying" : false,
            "duration":'3:18'
        },
        {
            "id": 'kffacxfA7G4',
            "title": 'Justin Bieber - Baby (Official Music Video) ft. Ludacris',
            "url": "youtube/song.mp4",
            "imgUrl": 'https://i.ytimg.com/vi/kffacxfA7G4/mqdefault.jpg',
            "addedBy": 'tommy',
            "addedAt":1607110465663,
            "isPlaying" : false,
            "duration":'3:40'
        }
    ]

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // reject('OOOOPs')
            resolve(entities)
        }, delay)
    })
    // return Promise.resolve(entities)
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
    newEntity._id = _makeId()
    return query(entityType)
        .then(entities => {
            entities.push(newEntity)
            save(entityType, entities)
            return newEntity
        })
}

function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity.id === updatedEntity.id)
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


function save(entityType, entities) {
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