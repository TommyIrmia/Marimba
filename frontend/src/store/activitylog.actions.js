import { activityService } from "../services/activity-log.service";

export function loadActivities() {
    return async (dispatch) => {
        try {
            const activities = await activityService.query()
            console.log('Got activities from actions', activities)
            dispatch({
                type: 'SET_ACTIVITIES',
                activities
            })
        } catch (err) {
            console.log('from activity actions - can not load activities', err);
        }
    }
}

export function addActivity(activity) {
    return async (dispatch) => {
        try {
            const activityToAdd = await activityService.addActivity(activity)
            console.log('Added activity from actions', activityToAdd)
            dispatch({
                type: 'ADD_ACTIVITY',
                activity: activityToAdd
            })
        } catch (err) {
            console.log('from activity actions - can not add activities', err)
        }
    }
}