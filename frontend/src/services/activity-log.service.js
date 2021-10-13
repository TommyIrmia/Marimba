import { httpService } from "./http.service.js"
import { userService } from "./user.service.js"

export const activityService = {
    query,
    addActivity,
    updateActivity,
}

async function query() {
    try {
        let activities = await httpService.get('activity')
        activities = activities.reverse()
        return activities.slice(0, 31)
    } catch (err) {
        throw err
    }
}

async function addActivity(type, stationInfo, trackName) {
    const user = userService.getLoggedinUser()
    try {
        const activity = {
            type,
            stationInfo,
            createdBy: {
                _id: user._id,
                fullname: user.fullname,
                imgUrl: user.imgUrl
            },
            createdAt: Date.now(),
            trackName
        }
        return await httpService.post('activity', activity);
    } catch (err) {
        throw err
    }
}

async function updateActivity(activity) {
    try {
        await httpService.put('activity', activity)
    } catch (err) {
        throw err
    }
}
