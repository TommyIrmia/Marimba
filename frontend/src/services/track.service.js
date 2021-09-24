
import { storageService } from './async-storage.service.js'
var initialTracks =
    [
        {
            "id": "A_MjCqQoLLA",
            "title": "Hey Jude- Beatels",
            "url": "youtube/song.mp4",
            "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
            "addedBy": 'Naama'
        },
        {
            "id": "m2uTFF_3MaA",
            "title": "Yellow Submarine- Beatels",
            "url": "youtube/song.mp4",
            "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
            "addedBy": 'Tomer'
        }
    ]

const STORAGE_KEY = 'track'

export const trackService = {
    query,
    getById,
    add,
    remove
}


function query() {
    const tracks = storageService.query(STORAGE_KEY).then(tracks => {
        if (tracks.length) return tracks
        else {
            _saveTracksToStorage()
            return initialTracks
        }

    })
    return Promise.resolve(tracks)
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