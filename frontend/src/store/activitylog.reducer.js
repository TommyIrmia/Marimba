import { socketService } from "../services/socket.service";
const initialState = {
    activities: [],
    unRead: 0
}

export function activityLogReducer(state = initialState, action) {
    let activities;
    switch (action.type) {
        case 'SET_ACTIVITIES':
            activities = action.activities
            return { ...state, activities, unRead: action.unRead }
        case 'ADD_ACTIVITY':
            socketService.emit('newActivity', action.activity);
            activities = [action.activity, ...state.activities]
            return { ...state, activities }
        case 'READ_ACTIVITY':
            activities = state.activities.map(activity => activity._id === action.activity._id ? action.activity : activity)
            return { ...state, activities }
        default:
            return state;
    }
}

