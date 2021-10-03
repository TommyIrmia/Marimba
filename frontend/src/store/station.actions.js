import { stationService } from "../services/station.service.js";



export function loadTracks(stationId, filterBy) {
    return async (dispatch) => {
        try {
            let tracks;
            if (!stationId) tracks = []
            else tracks = await stationService.loadTracks(stationId, filterBy)
            console.log('Tracks from actions:', tracks)
            dispatch({
                type: 'SET_TRACKS',
                tracks
            })
            if (stationId) {
                console.log('setting station id to tracks actions', stationId);
                dispatch({
                    type: 'SET_STATION_ID',
                    station_Id: stationId
                })
            }
        } catch (err) {
            console.log('From actions - Cannot load tracks', err)
        }
    }
}

export function onUpdateTracks(tracks, stationId) {
    return async (dispatch) => {
        try {
            await stationService.updateTracks(tracks, stationId)
            console.log('From track actions - Updated tracks', tracks)
            dispatch({
                type: 'SET_TRACKS',
                tracks
            })
        } catch (err) {
            console.log('Can not update tracks!', err)
        }
    }
}

export function onRemoveTrack(trackId, stationId) {
    return async (dispatch) => {
        try {
            await stationService.removeTrackFromStation(trackId, stationId)
            console.log('From track actions - Deleted track Succesfully!');
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
            console.log('From track actions - Added track', track)
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

export function setBgcAndName(bgc, stationName) {
    return async (dispatch) => {
        try {
            console.log('set bgc color and name to', bgc, stationName)
            dispatch({
                type: 'SET_BGC',
                bgc
            })
            dispatch({
                type: 'SET_NAME',
                stationName
            })
        } catch (err) {
            console.log('Can not load stations', err)
        }
    }
}