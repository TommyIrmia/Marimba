import { httpService } from "./http.service.js"
import { userService } from "./user.service.js"

export const activityService = {
    query,
    addActivity,
    read
}



async function query() {
    try {
        let activites = await httpService.get('activity')
        return activites
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
        console.log('positing to http service');
        return await httpService.post('activity', activity);
    } catch (err) {
        throw err
    }
}

async function read(activity) {
    console.log('reading activity');
    activity = { ...activity, isRead: true }
    await httpService.put('activity', activity)
}

// async function removeActivity(activityId) {
//     try {
//         return await asyncStorageService.put(STORAGE_KEY, activityId)
//     } catch (err) {
//         throw err
//     }
// }

// async function _saveActivitiesToStorage(activities) {
//     try {
//         await asyncStorageService.save(STORAGE_KEY, activities)
//     } catch (err) {
//         throw err
//     }
// }