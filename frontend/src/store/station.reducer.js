import { socketService } from "../services/socket.service";

const initialState = {
    bgc: '#181818',
    stationName: '',
    currStationId: '',
    tracks: [],
    likesCount: '',
}

export function stationReducer(state = initialState, action) {
    let tracks;
    switch (action.type) {
        case 'SET_BGC_AND_NAME':
            return { ...state, bgc: action.bgc, stationName: action.stationName }
        case 'SET_TRACKS':
            tracks = action.tracks
            return { ...state, tracks, currStationId: action.currStationId }
        case 'UPDATE_TRACKS':
            tracks = action.tracks
            socketService.emit('changeTracks', { stationId: action.currStationId, tracks });
            return { ...state, tracks }
        case 'REMOVE_TRACK':
            tracks = state.tracks.filter(track => track.id !== action.trackId)
            socketService.emit('changeTracks', { stationId: action.currStationId, tracks });
            return { ...state, tracks }
        case 'ADD_TRACK':
            tracks = [...state.tracks, action.track]
            socketService.emit('changeTracks', { stationId: action.currStationId, tracks });
            return { ...state, tracks }
        case 'UPDATE_TRACK':
            tracks = state.tracks.map(track => (track.id === action.track.id) ? action.track : { ...track, isPlaying: false })
            return { ...state, tracks }
        case 'SET_LIKES_COUNT':
            return { ...state, likesCount: action.likesCount }
        case 'UPDATE_LIKES_COUNT':
            return { ...state, likesCount: state.likesCount + action.diff }
        default:
            return state;
    }
}

