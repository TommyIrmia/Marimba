

const initialState = {
    player: null,
    isPlaying: false,
    currSongIdx: 0,
    currDuration: 0,
    currentTracks: [],
    stationId: ''
}

export function mediaPlayerReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_PLAYER':
            return { ...state, player: action.player }
        case 'SET_SONG':
            return { ...state, currSongIdx: action.currSongIdx }
        case 'TOGGLE_ISPLAYING':
            return { ...state, isPlaying: action.isPlaying }
        case 'SET_DURATION':
            return { ...state, currDuration: action.currDuration }
        case 'SET_TRACKS_TO_PLAYER':
            return { ...state, currentTracks: action.tracks }
        case 'SET_STATION_ID':
            return { ...state, stationId: action.stationId }
        default:
            return state;
    }


}