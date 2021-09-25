
export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    save
}

function query(entityType, delay = 1200) {
    var entities = JSON.parse(localStorage.getItem(entityType)) ||  [
        {
            "id": "A_MjCqQoLLA",
            "title": "Hey Jude- Beatels",
            "url": "youtube/song.mp4",
            "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
            "addedBy": 'Naama',
            "addedAt":1607110465663
        },
        {
            "id": "m2uTFF_3MaA",
            "title": "Yellow Submarine- Beatels",
            "url": "youtube/song.mp4",
            "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
            "addedBy": 'Tomer',
            "addedAt":1607110465663
        },
        {
            "id": 'kTJczUoc26U',
            "title": 'The Kid LAROI, Justin Bieber - STAY (Official Video)',
            "url": "youtube/song.mp4",
            "imgUrl": 'https://i.ytimg.com/vi/kTJczUoc26U/default.jpg',
            "addedBy": 'Tomer',
            "addedAt":1607110465663
        },
        {
            "id": "tQ0yjYUFKAE",
            "title": "Justin Bieber - Peaches ft. Daniel Caesar, Giveon",
            "url": "youtube/song.mp4",
            "imgUrl": "https://i.ytimg.com/vi/tQ0yjYUFKAE/default.jpg",
            "addedBy": 'Tomer',
            "addedAt":1607110465663
        },
        {
            "id": 'kffacxfA7G4',
            "title": 'Justin Bieber - Baby (Official Music Video) ft. Ludacris',
            "url": "youtube/song.mp4",
            "imgUrl": 'https://i.ytimg.com/vi/kffacxfA7G4/default.jpg',
            "addedBy": 'tommy',
            "addedAt":1607110465663
        }
    ]

    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
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
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            save(entityType, entities)
            return updatedEntity
        })
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
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