const initialState = {
    stations: [],
    bgc: '#181818',
    stationName: ''
}

export function stationReducer(state = initialState, action) {
    let stations;
    switch (action.type) {
        case 'SET_BGC':
            return { ...state, bgc: action.bgc }
        case 'SET_NAME':
            return { ...state, stationName: action.stationName }
        case 'SET_STATIONS':
            stations = action.stations
            console.log('here', stations);
            return { ...state, stations }
        case 'REMOVE_STATION':
            stations = state.stations.filter(station => station._id !== action.stationId)
            return { ...state, stations }
        case 'ADD_STATION':
            stations = [...state.stations, action.station]
            return { ...state, stations }
        case 'UPDATE_STATION':
            stations = state.stations.map(station => (station._id === action.station._id) ? action.station : station)
            return { ...state, stations }
        default:
            return state;
    }

}
