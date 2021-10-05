

import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

import { stationReducer } from './station.reducer.js'
import { mediaPlayerReducer } from './mediaplayer.reducer.js'
import { activityLogReducer } from './activitylog.reducer.js'
import { userReducer } from './user.reducer.js'

const rootReducer = combineReducers({
    stationModule: stationReducer,
    mediaPlayerModule: mediaPlayerReducer,
    activityLogModule: activityLogReducer,
    userModule: userReducer,
})



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
