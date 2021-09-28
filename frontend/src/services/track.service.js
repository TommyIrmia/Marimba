
import { asyncStorageService } from './async-storage.service.js'
import { stationService } from './station.service.js';

const STORAGE_KEY = 'track'

export const trackService = {
    query,
}
//     getById,
//     // add,
//     remove,
//     getIdxById,
//     update
// }



async function query(stationId, filterBy) {
    console.log('filterBy', filterBy);
    if (!filterBy) return stationService.getById(stationId)

    const { title, sort } = filterBy

    let { tracks } = await stationService.getById(stationId)
    if (title) {
        tracks = tracks.filter(track => track.title.toLowerCase().includes(title.toLowerCase()))
    }
    if (sort === 'Title') {
        tracks.sort((a, b) => a.title.localeCompare(b.title))
    }
    if (sort === 'Date added') {
        tracks.sort((a, b) => a.addedAt > b.addedAt ? -1 : 1)
    }
    if (sort === 'Duration') {
        tracks.sort((a, b) => a.duration < b.duration ? -1 : 1)
    }
    return tracks
}

// async function getIdxById(trackId) {
//     return await asyncStorageService.getIdx(STORAGE_KEY, trackId)
// }

// function getById(trackId) {
//     return asyncStorageService.get(STORAGE_KEY, trackId)
// }
// function remove(trackId) {
//     // return Promise.reject('Not now!');
//     return asyncStorageService.remove(STORAGE_KEY, trackId)
// }
// // function add(track) {
// //     return stationService.post(STORAGE_KEY, track)
// // }

// function update(track) {
//     return asyncStorageService.put(STORAGE_KEY, track)
// }

// // function _saveTracksToStorage() {
// //     asyncStorageService.save(STORAGE_KEY, initialTracks)
// }
