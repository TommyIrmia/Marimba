

const initialState = {
    tracks: [],
}

export function tracksReducer(state = initialState, action) {
    let tracks;
    switch (action.type) {
        case 'SET_TRACKS':
            tracks = action.tracks
            return { ...state, tracks }
        case 'REMOVE_TRACK':
            tracks = state.tracks.filter(track => track.id !== action.trackId)
            return { ...state, tracks }
        case 'ADD_TRACK':
            tracks = [...state.tracks, action.track]
            return { ...state, tracks }
        default:
    }

    return state;

}