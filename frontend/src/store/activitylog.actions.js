import { activityService } from "../services/activity-log.service";

export function loadActivities() {
    return async (dispatch) => {
        try {
            let activities = await activityService.query()
            activities = activities.reverse();
            dispatch({
                type: 'SET_ACTIVITIES',
                activities
            })
        } catch (err) {
            throw err
        }
    }
}

export function addActivity(type, stationInfo) {
    return async (dispatch) => {
        try {
            const activityToAdd = await activityService.addActivity(type, stationInfo)
            dispatch({
                type: 'ADD_ACTIVITY',
                activity: activityToAdd
            })
        } catch (err) {
            throw err
        }
    }
}

export function getUnRead() {
    return async (dispatch) => {
        try {
            const unRead = await activityService.getUnreadCount()
            dispatch({
                type: 'GET_UNREAD',
                unRead: unRead
            })
        } catch (err) {
            throw err
        }
    }
}