import { socketService } from "../services/socket.service"

export function setPlayer(player) {
    return (dispatch) => {
        dispatch({
            type: 'SET_PLAYER',
            player
        })
        console.log('Player is set!')
    }
}

export function loadTracksToPlayer(tracks, stationId) {
    return (dispatch) => {
        if (!tracks.length) return

        console.log('Loaded tracks to player', tracks, stationId)
        dispatch({
            type: 'SET_TRACKS_TO_PLAYER',
            tracks
        })

        // console.log('setting station id to mediaplayer actions', stationId);
        if (!stationId) return
        dispatch({
            type: 'SET_PLAYING_STATION_ID',
            stationId
        })
    }
}

export function setSongIdx(idx) {
    return (dispatch) => {
        console.log('Song idx is set', idx)
        dispatch({
            type: 'SET_SONG',
            currSongIdx: idx
        })
    }
}

export function onTogglePlay(isPlaying) {
    return (dispatch) => {
        dispatch({
            type: 'TOGGLE_ISPLAYING',
            isPlaying
        })
        // console.log('Toggles isPlaying', isPlaying)
    }
}

export function onPlayTrack(idx) {
    return (dispatch) => {
        console.log('idx', idx)
        dispatch({
            type: 'SET_SONG',
            currSongIdx: idx
        })
    }
}

export function setCurrDuration(duration) {
    return (dispatch) => {
        dispatch({
            type: 'SET_DURATION',
            currDuration: duration
        })
    }
}

export function updateIsLikedSong(currLikedTrack) {
    return (dispatch) => {
        dispatch({ type: 'SET_IS_LIKED', currLikedTrack })
    }

}

