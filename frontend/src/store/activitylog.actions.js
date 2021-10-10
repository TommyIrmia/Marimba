import { activityService } from "../services/activity-log.service";

export function loadActivities() {
    return async (dispatch) => {
        try {
            let activities = await activityService.query()
            activities = activities.reverse();
            const unRead = activities.filter(activity => !activity.isRead)
            dispatch({
                type: 'SET_ACTIVITIES',
                activities,
                unRead: unRead.length
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

export function onReadActivity(activity) {
    return async (dispatch) => {
        try {
            const activityToUpdate = { ...activity, isRead: true }
            dispatch({
                type: 'READ_ACTIVITY',
                activity: activityToUpdate
            })
            activityService.updateActivity(activityToUpdate);
        } catch (err) {
            throw err
        }
    }
}