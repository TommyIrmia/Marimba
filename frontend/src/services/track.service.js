
import { asyncStorageService } from './async-storage.service.js'


const STORAGE_KEY = 'track'

export const trackService = {
    query,
    getById,
    add,
    remove
}


function query(filterBy) {
    console.log('filterBy', filterBy);
    if (!filterBy) return storageService.query(STORAGE_KEY)

    const { title, sort } = filterBy

    return storageService.query(STORAGE_KEY)
        .then(tracks => {
            if (title) {
                tracks = tracks.filter(track => {
                    return track.title.toLowerCase().includes(title.toLowerCase());
                })
            }
            if (sort === 'Title') {
                tracks = tracks.sort((a, b) => {
                    var titleB = b.title.toLowerCase();
                    var titleA = a.title.toLowerCase();
                    return titleB > titleA ? -1 : 1;
                })
            }
            if (sort === 'Date added') {
                tracks = tracks.sort((a, b) => {
                    return a.addedAt > b.addedAt ? -1 : 1;
                })
            }
            return tracks
        })


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

// function _saveTracksToStorage() {
//     storageService.save(STORAGE_KEY, initialTracks)
// }
