

const initialState = {
    tracks: [],
}

export function tracksReducer(state = initialState, action) {
    let tracks;
    switch (action.type) {
        case 'SET_TRACKS':
            tracks = action.tracks.map(track => {
                track.isPlaying = false
                return track
            })
            return { ...state, tracks }
        case 'REMOVE_TRACK':
            tracks = state.tracks.filter(track => track.id !== action.trackId)
            return { ...state, tracks }
        case 'ADD_TRACK':
            tracks = [...state.tracks, action.track]
            return { ...state, tracks }
        case 'UPDATE_TRACK':
            tracks = state.tracks.map(track => (track.id === action.track.id) ? action.track : { ...track, isPlaying: false })
            console.log('tracks after update', tracks);
            return { ...state, tracks }
        default:
    }

    return state;

}