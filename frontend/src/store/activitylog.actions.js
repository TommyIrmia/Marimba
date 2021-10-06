import { activityService } from "../services/activity-log.service";

export function loadActivities() {
    return async (dispatch) => {
        try {
            const activities = await activityService.query()
            dispatch({
                type: 'SET_ACTIVITIES',
                activities
            })
        } catch (err) {
            console.log('from activity actions - can not load activities', err);
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
            console.log('from activity actions - can not add activities', err)
        }
    }
}