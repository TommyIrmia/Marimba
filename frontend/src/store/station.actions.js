import { activityService } from "../services/activity-log.service.js";
import { stationService } from "../services/station.service.js";



export function loadTracks(stationId, filterBy) {
    console.log('loading tracks in station', stationId);
    return async (dispatch) => {
        try {
            let tracks;
            if (!stationId) tracks = []
            else tracks = await stationService.loadTracks(stationId, filterBy)
            dispatch({
                type: 'SET_TRACKS',
                tracks
            })
            if (stationId) {
                dispatch({
                    type: 'SET_STATION_ID',
                    station_Id: stationId
                })
            }
        } catch (err) {
            throw err
        }
    }
}

export function onUpdateTracks(tracks, stationId) {
    return async (dispatch) => {
        try {
            stationService.updateTracks(tracks, stationId)
            dispatch({
                type: 'SET_TRACKS',
                tracks
            })
        } catch (err) {
            throw err
        }
    }
}

export function onRemoveTrack(trackId, stationId, trackName, bgc, name) {
    return async (dispatch) => {
        try {
            await stationService.removeTrackFromStation(trackId, stationId)
            dispatch({
                type: 'REMOVE_TRACK',
                trackId
            })

            const activityToAdd = await activityService.addActivity('remove track', { name, bgc, id: stationId }, trackName)
            dispatch({
                type: 'ADD_ACTIVITY',
                activity: activityToAdd
            })
        } catch (err) {
            throw err
        }
    }
}


export function onAddTrack(track, stationId, trackName, bgc, name) {
    return async (dispatch) => {
        try {
            await stationService.addTrackToStation(track, stationId)
            console.log('From track actions - Added track', track)
            dispatch({
                type: 'ADD_TRACK',
                track
            })

            const activityToAdd = await activityService.addActivity('add track', { name, bgc, id: stationId }, trackName)
            dispatch({
                type: 'ADD_ACTIVITY',
                activity: activityToAdd
            })

        } catch (err) {
            throw err
        }
    }
}

export function onUpdateTrack(track) {
    return async (dispatch) => {
        try {
            dispatch({
                type: 'UPDATE_TRACK',
                track
            })
        } catch (err) {
            throw err
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
            throw err
        }
    }
}