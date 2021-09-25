import { trackService } from "../services/track.service.js"


export function setPlayer(player) {
    return async (dispatch) => {
        try {
            dispatch({
                type: 'SET_PLAYER',
                player
            })
            console.log('Player is set!')
        } catch (err) {
            console.log('From actions - Can not set player', err)
        }
    }
}

export function setSongIdx(idx) {
    return async (dispatch) => {
        try {
            dispatch({
                type: 'SET_SONG',
                currSongIdx: idx
            })
            console.log('Song idx is set', idx)
        } catch (err) {
            console.log('From actions - Can not set song idx', err)
        }
    }
}

export function onTogglePlay(isPlaying) {
    return async (dispatch) => {
        try {
            dispatch({
                type: 'TOGGLE_ISPLAYING',
                isPlaying
            })
            console.log('Toggles isPlaying', isPlaying)
        } catch (err) {
            console.log('From actions - Can not toggle isPlaying')
        }
    }
}

export function onPlayTrack(trackId) {
    return async (dispatch) => {
        try {
            console.log('from actions', trackId);
            const idx = await trackService.getIdxById(trackId)
            console.log('Track idx is set', idx)
            dispatch({
                type: 'SET_SONG',
                currSongIdx: idx
            })
        } catch (err) {
            console.log('From actions - Can not set song idx', err)
        }
    }
}