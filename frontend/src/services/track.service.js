
import { storageService } from './async-storage.service.js'
var initialTracks =
    [
        {
            "id": "A_MjCqQoLLA",
            "title": "Hey Jude",
            "artist": "Beatels",
            "url": "youtube/song.mp4",
            "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
            "addedBy": 'Naama'
        },
        {
            "id": "m2uTFF_3MaA",
            "title": "Yellow Submarine",
            "artist": "Beatels",
            "url": "youtube/song.mp4",
            "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
            "addedBy": 'Tomer'
        },
        {
            "id": 'kTJczUoc26U',
            "title": 'STAY (Official Video)',
            "artist": "The Kid LAROI, Justin Bieber",
            "url": "youtube/song.mp4",
            "imgUrl": 'https://i.ytimg.com/vi/kTJczUoc26U/default.jpg',
            "addedBy": 'Tomer'
        },
        {
            "id": "tQ0yjYUFKAE",
            "title": "Peaches ft. Daniel Caesar, Giveon",
            "artist": "Justin Bieber",
            "url": "youtube/song.mp4",
            "imgUrl": "https://i.ytimg.com/vi/tQ0yjYUFKAE/default.jpg",
            "addedBy": 'Tomer'
        },
        {
            "id": 'kffacxfA7G4',
            "title": 'Baby (Official Music Video) ft. Ludacris',
            "artist": "Justin Bieber",
            "url": "youtube/song.mp4",
            "imgUrl": 'https://i.ytimg.com/vi/kffacxfA7G4/default.jpg',
            "addedBy": 'Tomer'
        }
    ]

const STORAGE_KEY = 'track'

export const trackService = {
    query,
    getById,
    add,
    remove,
    getIdxById
}


function query() {
    const tracks = storageService.query(STORAGE_KEY).then(tracks => {
        if (tracks.length) return tracks
        else {
            _saveTracksToStorage()
            return initialTracks
        }

    })

    return tracks

}
async function getIdxById(trackId) {
    const idx = await storageService.getIdx(STORAGE_KEY, trackId)
    return idx
}

function getById(trackId) {
    return storageService.get(STORAGE_KEY, trackId)
}
function remove(trackId) {
    // return Promise.reject('Not now!');
    return storageService.remove(STORAGE_KEY, trackId)
}
function add(track) {
    return storageService.post(STORAGE_KEY, track)
}

function _saveTracksToStorage() {
    storageService.save(STORAGE_KEY, initialTracks)
}