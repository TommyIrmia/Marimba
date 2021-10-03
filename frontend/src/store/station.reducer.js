const initialState = {
    bgc: '#181818',
    stationName: '',
    station_Id: '',
    tracks: [],
}

export function stationReducer(state = initialState, action) {
    let tracks;
    switch (action.type) {
        case 'SET_BGC':
            return { ...state, bgc: action.bgc }
        case 'SET_NAME':
            return { ...state, stationName: action.stationName }
        case 'SET_TRACKS':
            tracks = action.tracks
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
        case 'SET_STATION_ID':
            return { ...state, station_Id: action.station_Id }
        default:
            return state;
    }

    // case 'SET_STATIONS':
    //     stations = action.stations
    //     console.log('here', stations);
    //     return { ...state, stations }
    // case 'REMOVE_STATION':
    //     stations = state.stations.filter(station => station._id !== action.stationId)
    //     return { ...state, stations }
    // case 'ADD_STATION':
    //     stations = [...state.stations, action.station]
    //     return { ...state, stations }
    // case 'UPDATE_STATION':
    //     stations = state.stations.map(station => (station._id === action.station._id) ? action.station : station)
    //     return { ...state, stations }
    // default:
}

