import { socketService } from "../services/socket.service";
const initialState = {
    activities: [],
    unRead: 0
}

export function activityLogReducer(state = initialState, action) {
    let activities;
    let unRead;
    switch (action.type) {
        case 'SET_ACTIVITIES':
            activities = action.activities
            return { ...state, activities }
        case 'REMOVE_ACTIVITY':
            activities = state.activities.filter(activity => activity.id !== activity.trackId)
            return { ...state, activities }
        case 'ADD_ACTIVITY':
            socketService.emit('newActivity', action.activity);
            activities = [action.activity, ...state.activities]
            return { ...state, activities }
        default:
            return state;
        case 'GET_UNREAD':
            unRead = action.unRead;
            return { ...state, unRead }
    }
}

