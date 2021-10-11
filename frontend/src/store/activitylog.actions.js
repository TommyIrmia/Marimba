import { activityService } from "../services/activity-log.service";
import { userService } from "../services/user.service";

export function loadActivities() {
    return async (dispatch) => {
        try {
            const user = userService.getLoggedinUser()
            let activities = await activityService.query()
            const unRead = activities.filter(activity => !activity.isRead && activity.createdBy._id !== user._id)
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
            activity.isRead = true
            dispatch({
                type: 'READ_ACTIVITY',
                activity
            })
            activityService.updateActivity(activity);
        } catch (err) {
            throw err
        }
    }
}