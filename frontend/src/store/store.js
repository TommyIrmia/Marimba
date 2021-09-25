

import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

import { stationReducer } from './station.reducer.js'
import { tracksReducer } from './tracks.reducer.js'
import { mediaPlayerReducer } from './mediaplayer.reducer.js'

const rootReducer = combineReducers({
    stationModule: stationReducer,
    tracksModule: tracksReducer,
    mediaPlayerModule: mediaPlayerReducer,
})



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
