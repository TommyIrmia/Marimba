
export function setPlayer(player) {
    return (dispatch) => {
        dispatch({
            type: 'SET_PLAYER',
            player
        })
    }
}

export function loadTracksToPlayer(tracks, stationId) {
    return (dispatch) => {
        if (!tracks.length) return
        dispatch({
            type: 'SET_TRACKS_TO_PLAYER',
            tracks
        })
        if (!stationId) return
        dispatch({
            type: 'SET_PLAYING_STATION_ID',
            stationId
        })
    }
}

export function setSongIdx(idx) {
    return (dispatch) => {
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
    }
}

export function onPlayTrack(idx) {
    return (dispatch) => {
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
        dispatch({
            type: 'SET_IS_LIKED',
            currLikedTrack
        })
    }
}

