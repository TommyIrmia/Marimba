import { trackService } from "../services/track.service.js";

export function loadTracks() {
    return async (dispatch) => {
        try {
            const tracks = await trackService.query()
            console.log('Tracks from actions:', tracks)
            dispatch({
                type: 'SET_TRACKS',
                tracks
            })
        } catch (err) {
            console.log('From actions - Cannot load tracks', err)
        }
    }
}

export function onRemoveTrack(trackId) {
    return async (dispatch) => {
        try {
            await trackService.remove(trackId)
            console.log('Deleted track Succesfully!');
            dispatch({
                type: 'REMOVE_TRACK',
                trackId
            })
        } catch (err) {
            console.log('From actions - Cannot remove track', err)
        }
    }
}

export function onAddTrack(track) {
    return async (dispatch) => {
        try {
            const trackToAdd = await trackService.add(track)
            console.log('Added track', trackToAdd)
            dispatch({
                type: 'ADD_TRACK',
                track: trackToAdd
            })
        } catch (err) {
            console.error('From actions - Can not add track', track)
        }
    }
}


