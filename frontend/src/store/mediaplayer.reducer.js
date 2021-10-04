

const initialState = {
    player: null,
    isPlaying: false,
    currSongIdx: 0,
    currDuration: 0,
    currentTracks: [],
    stationId: '',
    currLikedTrack: {}
}

export function mediaPlayerReducer(state = initialState, action) {
    let currentTracks;
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
        case 'UPDATE_CURR_TRACK':
            currentTracks = state.currentTracks.map(track => (track.id === action.track.id) ? action.track : { ...track, isPlaying: false })
            return { ...state, currentTracks }
        case 'SET_PLAYING_STATION_ID':
            return { ...state, stationId: action.stationId }
        case 'SET_IS_LIKED':
            return { ...state, currLikedTrack: action.currLikedTrack }
        default:
            return state;
    }


}