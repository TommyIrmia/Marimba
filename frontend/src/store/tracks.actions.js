import { stationService } from "../services/station.service.js";
import { trackService } from "../services/track.service.js";

export function loadTracks(stationId, filterBy) {
    return async (dispatch) => {
        try {
            const station = await trackService.query(stationId, filterBy)
            console.log('Tracks from actions:', station.tracks)
            dispatch({
                type: 'SET_TRACKS',
                tracks: station.tracks
            })
        } catch (err) {
            console.log('From actions - Cannot load tracks', err)
        }
    }
}


export function onRemoveTrack(trackId, stationId) {
    return async (dispatch) => {
        try {
            await stationService.removeTrackFromStation(trackId, stationId)
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

export function onAddTrack(track, stationId) {
    return async (dispatch) => {
        try {
            await stationService.addTrackToStation(track, stationId)
            console.log('Added track', track)
            dispatch({
                type: 'ADD_TRACK',
                track
            })
        } catch (err) {
            console.error('From actions - Can not add track', track)
        }
    }
}

export function onUpdateTrack(track) {
    return async (dispatch) => {
        try {
            // const savedTrack = await trackService.update(track)
            dispatch({
                type: 'UPDATE_TRACK',
                track
            })
        } catch (err) {
            console.error('Can not update track', err)
        }
    }
}