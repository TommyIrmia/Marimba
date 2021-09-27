
import { asyncStorageService } from './async-storage.service.js'

const STORAGE_KEY = 'track'

export const trackService = {
    query,
    getById,
    add,
    remove,
    getIdxById,
    update
}


function query(filterBy) {
    console.log('filterBy', filterBy);
    if (!filterBy) return asyncStorageService.query(STORAGE_KEY)

    const { title, sort } = filterBy

    return asyncStorageService.query(STORAGE_KEY)
        .then(tracks => {
            if (title) {
                tracks = tracks.filter(track => {
                    return track.title.toLowerCase().includes(title.toLowerCase());
                })
            }
            if (sort === 'Title') {
                return tracks.sort((a, b) => a.title.localeCompare(b.title))
            }
            if (sort === 'Date added') {
                tracks = tracks.sort((a, b) => {
                    return a.addedAt > b.addedAt ? -1 : 1;
                })
            }
            if (sort === 'Duration') {
                tracks = tracks.sort((a, b) => {
                    return a.duration < b.duration ? -1 : 1;
                })
            }
            return tracks
        })
}

async function getIdxById(trackId) {
    const idx = await asyncStorageService.getIdx(STORAGE_KEY, trackId)
    return idx
}

function getById(trackId) {
    return asyncStorageService.get(STORAGE_KEY, trackId)
}
function remove(trackId) {
    // return Promise.reject('Not now!');
    return asyncStorageService.remove(STORAGE_KEY, trackId)
}
function add(track) {
    return asyncStorageService.post(STORAGE_KEY, track)
}

function update(track) {
    return asyncStorageService.put(STORAGE_KEY, track)
}

// function _saveTracksToStorage() {
//     asyncStorageService.save(STORAGE_KEY, initialTracks)
// }
