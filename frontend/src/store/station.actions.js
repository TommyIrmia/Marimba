import { activityService } from "../services/activity-log.service.js";
import { stationService } from "../services/station.service.js";



export function loadTracks(stationId, filterBy) {
    // console.log('loading tracks in station', stationId);
    return async (dispatch) => {
        try {
            let tracks;
            if (!stationId) tracks = []
            else tracks = await stationService.loadTracks(stationId, filterBy)
            dispatch({
                type: 'SET_TRACKS',
                tracks,
                currStationId: stationId
            })
        } catch (err) {
            throw err
        }
    }
}

export function onUpdateTracks(tracks, stationId) {
    return async (dispatch) => {
        try {
            console.log('from update', stationId);
            dispatch({
                type: 'UPDATE_TRACKS',
                tracks,
                currStationId: stationId
            })
            await stationService.updateTracks(tracks, stationId)
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
                trackId,
                currStationId: stationId
            })

            const activityToAdd = await activityService.addActivity('remove track', { name, bgc, id: stationId }, trackName)
            dispatch({
                type: 'ADD_ACTIVITY',
                activity: activityToAdd
            })
            
            const unRead = await activityService.getUnreadCount()
            dispatch({
                type: 'GET_UNREAD',
                unRead: unRead
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
            // console.log('From track actions - Added track', track)
            dispatch({
                type: 'ADD_TRACK',
                track,
                currStationId: stationId
            })

            const activityToAdd = await activityService.addActivity('add track', { name, bgc, id: stationId }, trackName)
            dispatch({
                type: 'ADD_ACTIVITY',
                activity: activityToAdd
            })

            const unRead = await activityService.getUnreadCount()
            dispatch({
                type: 'GET_UNREAD',
                unRead: unRead
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
            dispatch({
                type: 'UPDATE_CURR_TRACK',
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
            dispatch({
                type: 'SET_BGC_AND_NAME',
                bgc,
                stationName
            })
        } catch (err) {
            throw err
        }
    }
}

export function updateTracksInStore(tracks) {
    return dispatch => {
        dispatch({
            type: 'SET_TRACKS',
            tracks
        })
    }
}

export function setLikesCount(likesCount) {
    return dispatch => {
        console.log('from actions', likesCount);
        dispatch({ type: 'SET_LIKES_COUNT', likesCount })
    }
}