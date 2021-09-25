

const initialState = {
    player: null,
    isPlaying: false,
    currSongIdx: 0,
}

export function mediaPlayerReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_PLAYER':
            return { ...state, player: action.player }
        case 'SET_SONG':
            return { ...state, currSongIdx: action.currSongIdx }
        case 'TOGGLE_ISPLAYING':
            return { ...state, isPlaying: action.isPlaying }
        default:
    }

    return state;

}